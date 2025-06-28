
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const EnergyTips = () => {
  const tips = [
    {
      id: 1,
      category: "Heating & Cooling",
      title: "Optimize Your Thermostat",
      description: "Set your thermostat 7-10°F lower when you're away from home. This can save up to 10% on your energy bill.",
      impact: "High",
      savings: "$120/year",
      difficulty: "Easy",
      completed: false,
      icon: "🌡️"
    },
    {
      id: 2,
      category: "Lighting",
      title: "Switch to LED Bulbs",
      description: "Replace incandescent bulbs with LED lights. They use 75% less energy and last 25 times longer.",
      impact: "Medium",
      savings: "$45/year",
      difficulty: "Easy",
      completed: true,
      icon: "💡"
    },
    {
      id: 3,
      category: "Water Heating",
      title: "Lower Water Heater Temperature",
      description: "Set your water heater to 120°F instead of 140°F. This prevents scalding and saves energy.",
      impact: "Medium",
      savings: "$60/year",
      difficulty: "Easy",
      completed: false,
      icon: "🚿"
    },
    {
      id: 4,
      category: "Appliances",
      title: "Unplug Electronics When Not in Use",
      description: "Many devices consume power even when turned off. Unplug or use smart power strips.",
      impact: "Low",
      savings: "$25/year",
      difficulty: "Easy",
      completed: false,
      icon: "🔌"
    },
    {
      id: 5,
      category: "Insulation",
      title: "Seal Air Leaks",
      description: "Use weatherstripping and caulk to seal gaps around windows and doors.",
      impact: "High",
      savings: "$200/year",
      difficulty: "Medium",
      completed: false,
      icon: "🏠"
    },
    {
      id: 6,
      category: "Smart Home",
      title: "Install Smart Power Strips",
      description: "Smart power strips automatically cut power to devices in standby mode.",
      impact: "Medium",
      savings: "$50/year",
      difficulty: "Easy",
      completed: false,
      icon: "🔌"
    }
  ];

  const challenges = [
    {
      title: "30-Day Energy Challenge",
      description: "Reduce your energy consumption by 15% this month",
      progress: 65,
      reward: "$25 utility credit",
      daysLeft: 12
    },
    {
      title: "Peak Hour Hero",
      description: "Avoid using high-energy appliances during peak hours for a week",
      progress: 28,
      reward: "Eco Champion Badge",
      daysLeft: 5
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💡 Energy Saving Tips & Challenges
          </CardTitle>
          <CardDescription>
            Discover personalized tips to reduce your energy consumption and environmental impact
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Active Challenges */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">🏆 Active Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge, index) => (
            <Card key={index} className="border-2 border-dashed border-blue-300 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-white">
                      🎁 {challenge.reward}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {challenge.daysLeft} days left
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Energy Saving Tips */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">📋 Personalized Energy Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip) => (
            <Card 
              key={tip.id} 
              className={`transition-all duration-200 ${
                tip.completed 
                  ? 'border-green-200 bg-green-50 opacity-75' 
                  : 'hover:shadow-md'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <CardTitle className="text-lg leading-tight">
                        {tip.title}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                  </div>
                  {tip.completed && (
                    <Badge className="bg-green-500 text-white">✓ Done</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{tip.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className={getImpactColor(tip.impact)}>
                    Impact: {tip.impact}
                  </Badge>
                  <Badge className={getDifficultyColor(tip.difficulty)}>
                    {tip.difficulty}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-semibold text-green-600">
                      💰 {tip.savings}
                    </span>
                    <span className="text-gray-500"> potential savings</span>
                  </div>
                </div>
                
                {!tip.completed && (
                  <Button size="sm" className="w-full">
                    Start This Tip
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Quick Actions</CardTitle>
          <CardDescription>
            Simple changes you can make right now
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <span className="text-2xl">📱</span>
              <span className="text-sm">Schedule Smart Thermostat</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <span className="text-2xl">🔍</span>
              <span className="text-sm">Energy Audit</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-sm">Calculate Carbon Footprint</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyTips;
