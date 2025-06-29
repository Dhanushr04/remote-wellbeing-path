
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Video, Phone, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabaseApi } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

const AppointmentsList = () => {
  const { user } = useAuth();
  
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => supabaseApi.appointments.getAll(),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-green-500';
      case 'completed':
        return 'bg-gray-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'in-person':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const canJoinConsultation = (appointment: any) => {
    const now = new Date();
    const scheduledTime = new Date(appointment.scheduled_at);
    const timeDiff = Math.abs(now.getTime() - scheduledTime.getTime());
    const minutesDiff = Math.ceil(timeDiff / (1000 * 60));
    
    // Allow joining 15 minutes before or after scheduled time
    return minutesDiff <= 15 && appointment.status !== 'cancelled' && appointment.status !== 'completed';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!appointments || appointments.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments scheduled</h3>
          <p className="text-gray-600 mb-4">You don't have any appointments yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment: any) => {
        const otherParticipant = user?.role === 'doctor' ? appointment.patient : appointment.doctor;
        const canJoin = canJoinConsultation(appointment);
        
        return (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(appointment.type)}
                    <Badge className={`${getStatusColor(appointment.status)} text-white`}>
                      {appointment.status}
                    </Badge>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <h3 className="font-semibold text-gray-900">
                        {otherParticipant?.name || 'Unknown'}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {otherParticipant?.role || 'Unknown'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(appointment.scheduled_at), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{format(new Date(appointment.scheduled_at), 'hh:mm a')}</span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Notes:</strong> {appointment.notes}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {appointment.type === 'video' && canJoin && (
                    <Button 
                      onClick={() => window.location.href = `/consultation?appointment=${appointment.id}`}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join Call
                    </Button>
                  )}
                  
                  {appointment.type === 'phone' && canJoin && (
                    <Button 
                      onClick={() => window.location.href = `/consultation?appointment=${appointment.id}`}
                      variant="outline"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Join Call
                    </Button>
                  )}
                  
                  {appointment.status === 'scheduled' && !canJoin && (
                    <Badge variant="outline" className="text-xs">
                      Starts {format(new Date(appointment.scheduled_at), 'hh:mm a')}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AppointmentsList;
