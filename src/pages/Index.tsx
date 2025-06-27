import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Shield, Clock, Users, Heart, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TeleMed</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
              <Link to="/doctors" className="text-gray-600 hover:text-blue-600 transition-colors">Find Doctors</Link>
              <Link to="/records" className="text-gray-600 hover:text-blue-600 transition-colors">Medical Records</Link>
              <Link to="/auth">
                <Button variant="outline" className="mr-2">Login</Button>
              </Link>
              <Link to="/auth">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Quality Healthcare at Your Fingertips
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Healthcare
            <span className="text-blue-600"> Anywhere</span>,
            <br />
            <span className="text-green-600">Anytime</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with licensed healthcare professionals instantly. Get medical consultations, 
            prescriptions, and follow-up care from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Video className="mr-2 h-5 w-5" />
                Start Consultation
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose TeleMed?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience healthcare reimagined with our cutting-edge telemedicine platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>HD Video Consultations</CardTitle>
                <CardDescription>
                  Crystal clear video calls with healthcare professionals using secure, HIPAA-compliant technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>24/7 Availability</CardTitle>
                <CardDescription>
                  Access healthcare professionals around the clock, including emergency consultations and urgent care
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your medical information is protected with enterprise-grade security and full HIPAA compliance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Easy Scheduling</CardTitle>
                <CardDescription>
                  Book appointments instantly or schedule for later with our intuitive calendar system
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Specialist Network</CardTitle>
                <CardDescription>
                  Access to hundreds of specialists across all medical fields, from cardiology to dermatology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Digital Prescriptions</CardTitle>
                <CardDescription>
                  Receive prescriptions digitally and have them sent directly to your preferred pharmacy
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Healthcare Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients who trust TeleMed for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Phone className="mr-2 h-5 w-5" />
                Talk to a Doctor Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">TeleMed</span>
              </div>
              <p className="text-gray-400">
                Connecting patients with healthcare professionals through innovative telemedicine solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Video Consultations</li>
                <li>Prescription Services</li>
                <li>Specialist Referrals</li>
                <li>Mental Health Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Emergency</h3>
              <p className="text-gray-400 mb-2">
                For medical emergencies, call 911 immediately.
              </p>
              <Button variant="destructive" size="sm">
                Emergency Services
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TeleMed. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
