
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  user_id: string;
  message: string;
  created_at: string;
  user: {
    name: string;
    role: string;
  };
}

interface UseConsultationProps {
  appointmentId: string;
}

export const useConsultation = ({ appointmentId }: UseConsultationProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [appointment, setAppointment] = useState<any>(null);
  
  const channelRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  const initializeConsultation = async () => {
    if (!user || !appointmentId) return;

    try {
      // Fetch appointment details
      const { data: appointmentData, error: appointmentError } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctor_id(id, name, email, role),
          patient:patient_id(id, name, email, role)
        `)
        .eq('id', appointmentId)
        .single();

      if (appointmentError) throw appointmentError;

      setAppointment(appointmentData);
      setParticipants([appointmentData.doctor, appointmentData.patient]);

      // Start or get existing consultation
      const { data: consultationData, error: consultationError } = await supabase
        .from('consultations')
        .select('*')
        .eq('appointment_id', appointmentId)
        .maybeSingle();

      if (consultationError) throw consultationError;

      if (!consultationData && user.role === 'doctor') {
        // Start new consultation
        const { error: createError } = await supabase
          .from('consultations')
          .insert({
            appointment_id: appointmentId,
            status: 'active'
          });

        if (createError) throw createError;
      }

    } catch (error) {
      console.error('Error initializing consultation:', error);
      toast({
        title: "Error",
        description: "Failed to initialize consultation",
        variant: "destructive"
      });
    }
  };

  const setupRealtimeChannel = () => {
    if (!user || !appointmentId) return;

    const channelName = `consultation_${appointmentId}`;
    channelRef.current = supabase.channel(channelName, {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channelRef.current
      .on('presence', { event: 'sync' }, () => {
        const state = channelRef.current.presenceState();
        const connectedUsers = Object.keys(state);
        setIsConnected(connectedUsers.length > 1);
        
        // Update participants with presence info
        const activeParticipants = participants.map(p => ({
          ...p,
          isOnline: connectedUsers.includes(p.id)
        }));
        setParticipants(activeParticipants);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }: any) => {
        console.log('User joined:', key, newPresences);
        const joiningUser = newPresences[0];
        if (joiningUser && joiningUser.user_id !== user.id) {
          toast({
            title: "User Joined",
            description: `${joiningUser.name || 'Someone'} joined the consultation`,
          });
        }
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }: any) => {
        console.log('User left:', key, leftPresences);
        const leavingUser = leftPresences[0];
        if (leavingUser && leavingUser.user_id !== user.id) {
          toast({
            title: "User Left", 
            description: `${leavingUser.name || 'Someone'} left the consultation`,
          });
        }
      })
      .on('broadcast', { event: 'message' }, ({ payload }: any) => {
        setMessages(prev => [...prev, payload]);
      })
      .on('broadcast', { event: 'video-control' }, ({ payload }: any) => {
        console.log('Video control received:', payload);
        // Handle remote video/audio control changes
      })
      .on('broadcast', { event: 'file-share' }, ({ payload }: any) => {
        console.log('File shared:', payload);
        toast({
          title: "File Shared",
          description: `${payload.user_name} shared a file: ${payload.filename}`,
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channelRef.current.track({
            user_id: user.id,
            name: user.name,
            role: user.role,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Start session timer
    intervalRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !user || !channelRef.current) return;

    const messageData = {
      id: `msg_${Date.now()}_${user.id}`,
      user_id: user.id,
      message: messageText.trim(),
      created_at: new Date().toISOString(),
      user: {
        name: user.name,
        role: user.role
      }
    };

    await channelRef.current.send({
      type: 'broadcast',
      event: 'message',
      payload: messageData
    });

    return messageData;
  };

  const sendVideoControl = async (action: string, enabled: boolean) => {
    if (!channelRef.current || !user) return;

    await channelRef.current.send({
      type: 'broadcast',
      event: 'video-control',
      payload: {
        user_id: user.id,
        user_name: user.name,
        action,
        enabled,
        timestamp: new Date().toISOString()
      }
    });
  };

  const shareFile = async (file: File) => {
    if (!channelRef.current || !user) return;

    // In a real implementation, you'd upload the file to storage first
    await channelRef.current.send({
      type: 'broadcast',
      event: 'file-share',
      payload: {
        user_id: user.id,
        user_name: user.name,
        filename: file.name,
        filesize: file.size,
        timestamp: new Date().toISOString()
      }
    });
  };

  const endConsultation = async () => {
    try {
      if (channelRef.current) {
        await channelRef.current.untrack();
        supabase.removeChannel(channelRef.current);
      }
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Update consultation status if doctor
      if (user?.role === 'doctor' && appointmentId) {
        await supabase
          .from('consultations')
          .update({ 
            status: 'completed',
            ended_at: new Date().toISOString()
          })
          .eq('appointment_id', appointmentId);
      }
    } catch (error) {
      console.error('Error ending consultation:', error);
    }
  };

  useEffect(() => {
    initializeConsultation();
    setupRealtimeChannel();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [user, appointmentId]);

  return {
    messages,
    participants,
    isConnected,
    sessionTime,
    appointment,
    sendMessage,
    sendVideoControl,
    shareFile,
    endConsultation
  };
};
