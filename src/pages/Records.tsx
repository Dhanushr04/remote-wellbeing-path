
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search, Calendar, User, Activity } from "lucide-react";

const Records = () => {
  const medicalRecords = [
    {
      id: 1,
      title: "Annual Physical Examination",
      doctor: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      type: "Physical Exam",
      status: "Complete",
      summary: "Overall health assessment shows good general condition. Blood pressure within normal range."
    },
    {
      id: 2,
      title: "Blood Work Analysis",
      doctor: "Dr. Michael Chen",
      date: "March 12, 2024",
      type: "Lab Results",
      status: "Review Needed",
      summary: "Complete blood count and metabolic panel. Some values require follow-up discussion."
    },
    {
      id: 3,
      title: "Chest X-Ray",
      doctor: "Dr. Emily Rodriguez",
      date: "March 8, 2024",
      type: "Imaging",
      status: "Complete",
      summary: "Chest X-ray shows clear lung fields with no acute abnormalities detected."
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      status: "Active",
      refills: 5
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Michael Chen",
      date: "February 20, 2024",
      status: "Active",
      refills: 3
    }
  ];

  const vitals = [
    {
      date: "March 15, 2024",
      bloodPressure: "118/76",
      heartRate: "72",
      weight: "165 lbs",
      temperature: "98.6°F"
    },
    {
      date: "February 20, 2024",
      bloodPressure: "120/78",
      heartRate: "75",
      weight: "167 lbs",
      temperature: "98.4°F"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Records</h1>
          <p className="text-gray-600">Access and manage your complete health information</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search records, prescriptions, or test results..." 
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          </TabsList>

          {/* Medical Records Tab */}
          <TabsContent value="records">
            <div className="grid gap-4">
              {medicalRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{record.title}</CardTitle>
                          <CardDescription className="mt-1">
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{record.doctor}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{record.date}</span>
                              </div>
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={record.status === 'Complete' ? 'default' : 'destructive'}>
                          {record.status}
                        </Badge>
                        <Badge variant="outline">{record.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{record.summary}</p>
                    <div className="flex space-x-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions">
            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{prescription.medication}</CardTitle>
                        <CardDescription className="mt-1">
                          <div className="flex items-center space-x-4 text-sm">
                            <span>{prescription.dosage} - {prescription.frequency}</span>
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{prescription.prescribedBy}</span>
                            </div>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={prescription.status === 'Active' ? 'default' : 'secondary'}>
                          {prescription.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Prescribed:</span>
                        <p className="text-gray-600">{prescription.date}</p>
                      </div>
                      <div>
                        <span className="font-medium">Refills Left:</span>
                        <p className="text-gray-600">{prescription.refills}</p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex space-x-2">
                          <Button size="sm">Request Refill</Button>
                          <Button size="sm" variant="outline">Contact Pharmacy</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals">
            <div className="grid gap-4">
              {vitals.map((vital, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-green-600" />
                        <span>Vital Signs</span>
                      </CardTitle>
                      <Badge variant="outline">{vital.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{vital.bloodPressure}</div>
                        <div className="text-sm text-gray-600">Blood Pressure</div>
                        <div className="text-xs text-gray-500">mmHg</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{vital.heartRate}</div>
                        <div className="text-sm text-gray-600">Heart Rate</div>
                        <div className="text-xs text-gray-500">bpm</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{vital.weight}</div>
                        <div className="text-sm text-gray-600">Weight</div>
                        <div className="text-xs text-gray-500">lbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{vital.temperature}</div>
                        <div className="text-sm text-gray-600">Temperature</div>
                        <div className="text-xs text-gray-500">°F</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Records;
