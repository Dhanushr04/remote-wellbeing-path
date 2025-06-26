
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
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
  PhoneOff
} from "lucide-react";
import { useState } from "react";

const VideoConsultation = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  const chatMessages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      message: "Hello! How are you feeling today?",
      time: "2:01 PM",
      isDoctor: true
    },
    {
      id: 2,
      sender: "You",
      message: "Hi Doctor, I've been having some chest discomfort.",
      time: "2:02 PM",
      isDoctor: false
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      message: "I see. Can you describe the type of discomfort?",
      time: "2:02 PM",
      isDoctor: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 text-white">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Dr. Sarah Johnson</h1>
              <p className="text-gray-300">Cardiologist</p>
            </div>
            <Badge className="bg-green-600">Connected</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Session Time: 12:34</span>
            <Button variant="destructive" size="sm">
              <PhoneOff className="h-4 w-4 mr-2" />
              End Call
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 h-[calc(100vh-120px)]">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Doctor's Video */}
            <Card className="bg-gray-800 border-gray-700 h-3/4">
              <CardContent className="p-0 h-full relative">
                <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl">SJ</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-2">Dr. Sarah Johnson</h3>
                    <Badge className="bg-green-600">Video Connected</Badge>
                  </div>
                </div>
                
                {/* Doctor's name overlay */}
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/70 text-white">
                    Dr. Sarah Johnson
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Patient's Video (Picture-in-Picture) */}
            <Card className="bg-gray-800 border-gray-700 h-1/4">
              <CardContent className="p-0 h-full relative">
                <div className="w-full h-full bg-gray-600 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">You</span>
                  </div>
                </div>
                
                {/* Mute indicators */}
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
            {/* Chat Panel */}
            <Card className="bg-gray-800 border-gray-700 h-2/3">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Chat</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setShowChat(!showChat)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="flex flex-col h-full">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isDoctor ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.isDoctor 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-600 text-white'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-600">
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 bg-gray-700 border-gray-600 text-white resize-none"
                        rows={2}
                      />
                      <Button size="sm" className="self-end">
                        Send
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
                  onClick={() => setIsAudioOn(!isAudioOn)}
                >
                  {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant={isVideoOn ? "default" : "destructive"}
                  size="lg"
                  className="rounded-full w-12 h-12"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full w-12 h-12"
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
                >
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;
