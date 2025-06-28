
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabaseApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const AppointmentScheduler = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>("");
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [notes, setNotes] = useState<string>("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: doctors, isLoading: loadingDoctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: supabaseApi.profiles.getDoctors,
  });

  const createAppointmentMutation = useMutation({
    mutationFn: supabaseApi.appointments.create,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Appointment scheduled successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      // Reset form
      setSelectedDoctor("");
      setAppointmentDate("");
      setAppointmentTime("");
      setAppointmentType('video');
      setNotes("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to schedule appointment",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const scheduledAt = new Date(`${appointmentDate}T${appointmentTime}`).toISOString();
    
    createAppointmentMutation.mutate({
      doctor_id: selectedDoctor,
      scheduled_at: scheduledAt,
      type: appointmentType,
      notes: notes || undefined,
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Schedule Appointment</span>
        </CardTitle>
        <CardDescription>
          Book a consultation with a healthcare provider
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {loadingDoctors ? (
                  <SelectItem value="loading" disabled>Loading doctors...</SelectItem>
                ) : (
                  doctors?.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type</Label>
            <Select value={appointmentType} onValueChange={(value: 'video' | 'phone' | 'in-person') => setAppointmentType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific concerns or information..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={createAppointmentMutation.isPending}
          >
            {createAppointmentMutation.isPending ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduler;
