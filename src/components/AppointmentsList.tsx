
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, Phone, User, X } from "lucide-react";
import { supabaseApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AppointmentsList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: supabaseApi.appointments.getAll,
  });

  const cancelAppointmentMutation = useMutation({
    mutationFn: supabaseApi.appointments.cancel,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Appointment cancelled successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to cancel appointment",
        variant: "destructive",
      });
    },
  });

  const startConsultationMutation = useMutation({
    mutationFn: supabaseApi.consultations.start,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Consultation started",
      });
      navigate('/consultation');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to start consultation",
        variant: "destructive",
      });
    },
  });

  const handleCancelAppointment = (appointmentId: string) => {
    cancelAppointmentMutation.mutate(appointmentId);
  };

  const handleStartConsultation = (appointmentId: string) => {
    startConsultationMutation.mutate(appointmentId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'in-person': return <User className="h-4 w-4" />;
      default: return <Video className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading appointments...</div>
        </CardContent>
      </Card>
    );
  }

  const upcomingAppointments = appointments?.filter(
    (apt: any) => apt.status === 'scheduled' && new Date(apt.scheduled_at) > new Date()
  ) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Appointments</CardTitle>
        <CardDescription>Manage your upcoming and past appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No upcoming appointments
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment: any) => {
              const isPatient = user?.id === appointment.patient_id;
              const otherUser = isPatient ? appointment.doctor : appointment.patient;
              const scheduledDate = new Date(appointment.scheduled_at);
              const isToday = scheduledDate.toDateString() === new Date().toDateString();
              const canStart = isToday && scheduledDate.getTime() <= new Date().getTime() + 15 * 60 * 1000; // 15 minutes before

              return (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {otherUser?.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {isPatient ? `Dr. ${otherUser?.name}` : otherUser?.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{scheduledDate.toLocaleDateString()}</span>
                        <Clock className="h-4 w-4" />
                        <span>{scheduledDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(appointment.type)}
                      <span className="text-sm capitalize">{appointment.type}</span>
                    </div>
                    {canStart && (
                      <Button 
                        size="sm" 
                        onClick={() => handleStartConsultation(appointment.id)}
                        disabled={startConsultationMutation.isPending}
                      >
                        Start
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCancelAppointment(appointment.id)}
                      disabled={cancelAppointmentMutation.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
