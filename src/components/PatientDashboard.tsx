
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, FileText, Bell, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabaseApi } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const { data: appointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: supabaseApi.appointments.getAll,
  });

  const upcomingAppointments = appointments?.filter(
    (apt: any) => apt.status === 'scheduled' && new Date(apt.scheduled_at) > new Date()
  )?.slice(0, 2) || [];

  const recentRecords = [
    {
      id: 1,
      title: "Annual Physical Exam",
      doctor: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      status: "Completed"
    },
    {
      id: 2,
      title: "Blood Work Results",
      doctor: "Dr. Michael Chen",
      date: "March 12, 2024",
      status: "Review Needed"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's your health overview for today</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Button 
            className="h-20 flex-col bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/consultation')}
          >
            <Video className="h-6 w-6 mb-2" />
            Start Consultation
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => navigate('/appointments')}
          >
            <Calendar className="h-6 w-6 mb-2" />
            Book Appointment
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col"
            onClick={() => navigate('/records')}
          >
            <FileText className="h-6 w-6 mb-2" />
            View Records
          </Button>
          <Button variant="outline" className="h-20 flex-col">
            <Bell className="h-6 w-6 mb-2" />
            Notifications
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </div>
                <Button size="sm" onClick={() => navigate('/appointments')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      No upcoming appointments
                    </div>
                  ) : (
                    upcomingAppointments.map((appointment: any) => {
                      const scheduledDate = new Date(appointment.scheduled_at);
                      return (
                        <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {appointment.doctor?.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Dr. {appointment.doctor?.name}</h3>
                              <p className="text-sm text-gray-600">Healthcare Provider</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {scheduledDate.toLocaleDateString()} at {scheduledDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="capitalize">{appointment.type}</Badge>
                            <Button size="sm">Join Call</Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Medical Records */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Medical Records</CardTitle>
                <CardDescription>Your latest health information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.title}</h3>
                          <p className="text-sm text-gray-600">{record.doctor}</p>
                          <p className="text-sm text-gray-500">{record.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={record.status === 'Completed' ? 'default' : 'destructive'}>
                          {record.status}
                        </Badge>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Checkup</span>
                    <span className="text-sm text-gray-600">March 15, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Blood Pressure</span>
                    <Badge variant="secondary">Normal</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Weight</span>
                    <span className="text-sm text-gray-600">165 lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">BMI</span>
                    <Badge variant="secondary">23.2</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{appointments?.length || 0}</div>
                    <div className="text-sm text-gray-600">Consultations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600">Prescriptions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-gray-600">Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">2</div>
                    <div className="text-sm text-gray-600">Specialists</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="destructive" className="w-full">
                    Call 911
                  </Button>
                  <Button variant="outline" className="w-full">
                    Poison Control
                  </Button>
                  <Button variant="outline" className="w-full">
                    Mental Health Crisis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
