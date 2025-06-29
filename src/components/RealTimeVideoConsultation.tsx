import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  FileText, 
  Share, 
  Settings,
  Monitor,
  PhoneOff,
  Send,
  Users,
  Calendar,
  Clock
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

interface VideoConsultationProps {
  appointmentId?: string;
}

const RealTimeVideoConsultation = ({ appointmentId }: VideoConsultationProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [sessionTime, setSessionTime] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [appointment, setAppointment] = useState<any>(null);
  
  const channelRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (!user || !appointmentId) return;

    // Fetch appointment details
    const fetchAppointment = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctor_id(id, name, email, role),
          patient:patient_id(id, name, email, role)
        `)
        .eq('id', appointmentId)
        .single();

      if (error) {
        console.error('Error fetching appointment:', error);
        toast({
          title: "Error",
          description: "Failed to load appointment details",
          variant: "destructive"
        });
        return;
      }

      setAppointment(data);
      setParticipants([data.doctor, data.patient]);
    };

    fetchAppointment();

    // Set up real-time channel for the consultation
    const channelName = `consultation_${appointmentId}`;
    channelRef.current = supabase.channel(channelName, {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    // Handle presence changes
    channelRef.current
      .on('presence', { event: 'sync' }, () => {
        const state = channelRef.current.presenceState();
        console.log('Presence sync:', state);
        setIsConnected(Object.keys(state).length > 1);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }: any) => {
        console.log('User joined:', key, newPresences);
        toast({
          title: "User Joined",
          description: `${newPresences[0]?.name || 'Someone'} joined the consultation`,
        });
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }: any) => {
        console.log('User left:', key, leftPresences);
        toast({
          title: "User Left", 
          description: `${leftPresences[0]?.name || 'Someone'} left the consultation`,
        });
      })
      .on('broadcast', { event: 'message' }, ({ payload }: any) => {
        setMessages(prev => [...prev, {
          id: payload.id,
          user_id: payload.user_id,
          message: payload.message,
          created_at: payload.created_at,
          user: payload.user
        }]);
      })
      .on('broadcast', { event: 'video-control' }, ({ payload }: any) => {
        console.log('Video control:', payload);
        // Handle remote video/audio controls
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

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [user, appointmentId, toast]);

  const sendMessage = async () => {
    if (!message.trim() || !user || !channelRef.current) return;

    const messageData = {
      id: `msg_${Date.now()}`,
      user_id: user.id,
      message: message.trim(),
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

    setMessage("");
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'video-control',
        payload: {
          user_id: user?.id,
          action: 'toggle-video',
          enabled: !isVideoOn
        }
      });
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (channelRef.current) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'video-control',
        payload: {
          user_id: user?.id,
          action: 'toggle-audio',
          enabled: !isAudioOn
        }
      });
    }
  };

  const endCall = async () => {
    if (channelRef.current) {
      await channelRef.current.untrack();
      supabase.removeChannel(channelRef.current);
    }
    
    // Update appointment status
    if (appointmentId && user?.role === 'doctor') {
      await supabase
        .from('appointments')
        .update({ status: 'completed' })
        .eq('id', appointmentId);
    }
    
    toast({
      title: "Call Ended",
      description: "The consultation has been ended successfully",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user || !appointment) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading consultation...</p>
        </div>
      </div>
    );
  }

  const otherParticipant = user.role === 'doctor' ? appointment.patient : appointment.doctor;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 text-white">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{otherParticipant?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{otherParticipant?.name}</h1>
              <p className="text-gray-300 capitalize">{otherParticipant?.role}</p>
            </div>
            <Badge className={isConnected ? "bg-green-600" : "bg-yellow-600"}>
              {isConnected ? "Connected" : "Waiting..."}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Clock className="h-4 w-4" />
              <span>Session Time: {formatTime(sessionTime)}</span>
            </div>
            <Button variant="destructive" size="sm" onClick={endCall}>
              <PhoneOff className="h-4 w-4 mr-2" />
              End Call
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 h-[calc(100vh-120px)]">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Other Participant's Video */}
            <Card className="bg-gray-800 border-gray-700 h-3/4">
              <CardContent className="p-0 h-full relative">
                <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl">
                        {otherParticipant?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-2">{otherParticipant?.name}</h3>
                    <Badge className={isConnected ? "bg-green-600" : "bg-gray-600"}>
                      {isConnected ? "Video Connected" : "Connecting..."}
                    </Badge>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/70 text-white">
                    {otherParticipant?.name}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Your Video (Picture-in-Picture) */}
            <Card className="bg-gray-800 border-gray-700 h-1/4">
              <CardContent className="p-0 h-full relative">
                <div className="w-full h-full bg-gray-600 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarFallback>{user.name?.charAt(0) || 'You'}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">You ({user.role})</span>
                  </div>
                </div>
                
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {!isVideoOn && (
                    <Badge variant="destructive" className="text-xs">
                      <VideoOff className="h-3 w-3" />
                    </Badge>
                  )}
                  {!isAudioOn && (
                    <Badge variant="destructive" className="text-xs">
                      <MicOff className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Participants Panel */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Participants ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center space-x-2 text-white">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {participant.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{participant.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {participant.role}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat Panel */}
            <Card className="bg-gray-800 border-gray-700 flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Real-time Chat</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowChat(!showChat)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-64">
                <div className="flex flex-col h-full">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.user_id === user.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.user_id === user.id 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-600 text-white'
                        }`}>
                          <p className="text-xs opacity-70 mb-1">
                            {msg.user.name} • {new Date(msg.created_at).toLocaleTimeString()}
                          </p>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-600">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 bg-gray-700 border-gray-600 text-white"
                      />
                      <Button size="sm" onClick={sendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Share Documents
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Monitor className="h-4 w-4 mr-2" />
                  Screen Share
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" />
                  Record Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Control Bar */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant={isAudioOn ? "default" : "destructive"}
                  size="lg"
                  className="rounded-full w-12 h-12"
                  onClick={toggleAudio}
                >
                  {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant={isVideoOn ? "default" : "destructive"}
                  size="lg"
                  className="rounded-full w-12 h-12"
                  onClick={toggleVideo}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12"
                  onClick={() => setShowChat(!showChat)}
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-full w-12 h-12"
                  onClick={endCall}
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealTimeVideoConsultation;
