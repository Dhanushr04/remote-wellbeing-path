
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Calendar, Video, Search } from "lucide-react";

const DoctorsList = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 127,
      experience: "15+ years",
      location: "New York, NY",
      availableToday: true,
      consultationFee: 150,
      image: "/placeholder.svg",
      languages: ["English", "Spanish"],
      education: "Harvard Medical School"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      rating: 4.8,
      reviews: 94,
      experience: "12+ years",
      location: "Los Angeles, CA",
      availableToday: true,
      consultationFee: 120,
      image: "/placeholder.svg",
      languages: ["English", "Mandarin"],
      education: "Stanford University"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      rating: 4.9,
      reviews: 156,
      experience: "18+ years",
      location: "Chicago, IL",
      availableToday: false,
      consultationFee: 130,
      image: "/placeholder.svg",
      languages: ["English", "Spanish"],
      education: "Johns Hopkins University"
    },
    {
      id: 4,
      name: "Dr. David Wilson",
      specialty: "Psychiatrist",
      rating: 4.7,
      reviews: 88,
      experience: "10+ years",
      location: "Seattle, WA",
      availableToday: true,
      consultationFee: 180,
      image: "/placeholder.svg",
      languages: ["English"],
      education: "Yale University"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <p className="text-gray-600">Connect with qualified healthcare professionals</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by doctor name or specialty..." 
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="psychiatry">Psychiatry</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doctors</SelectItem>
                  <SelectItem value="today">Available Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="grid gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={doctor.image} />
                      <AvatarFallback className="text-lg">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                        </div>
                        {doctor.availableToday && (
                          <Badge className="bg-green-100 text-green-800">Available Today</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-gray-600">({doctor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Experience:</span> {doctor.experience}
                        </div>
                        <div>
                          <span className="font-medium">Education:</span> {doctor.education}
                        </div>
                        <div>
                          <span className="font-medium">Languages:</span> {doctor.languages.join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Consultation Fee:</span> ${doctor.consultationFee}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col space-y-3 lg:w-48">
                    <Button className="w-full">
                      <Video className="mr-2 h-4 w-4" />
                      Video Consult
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Later
                    </Button>
                    <Button variant="ghost" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Doctors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
