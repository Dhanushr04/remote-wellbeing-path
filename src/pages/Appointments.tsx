
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import AppointmentsList from "@/components/AppointmentsList";

const Appointments = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
          <p className="text-gray-600">Schedule and manage your healthcare appointments</p>
        </div>

        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="schedule">Schedule New</TabsTrigger>
            <TabsTrigger value="manage">My Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule">
            <AppointmentScheduler />
          </TabsContent>
          
          <TabsContent value="manage">
            <AppointmentsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Appointments;
