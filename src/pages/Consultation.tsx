
import { useSearchParams } from "react-router-dom";
import RealTimeVideoConsultation from "@/components/RealTimeVideoConsultation";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

const Consultation = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('appointment');
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">Please log in to join the consultation.</p>
            <Button onClick={() => window.location.href = '/auth'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!appointmentId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <Calendar className="h-5 w-5 mr-2" />
              No Appointment Selected
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Please select an appointment to start the consultation.
            </p>
            <div className="space-y-2">
              <Button onClick={() => window.location.href = '/appointments'} className="w-full">
                View My Appointments
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/dashboard'} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <RealTimeVideoConsultation appointmentId={appointmentId} />;
};

export default Consultation;
