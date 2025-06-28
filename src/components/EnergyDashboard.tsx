
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const EnergyDashboard = () => {
  const currentUsage = 2.4; // kWh
  const dailyGoal = 15; // kWh
  const monthlyUsage = 320; // kWh
  const monthlySavings = 45; // dollars

  const todayData = [
    { time: '00:00', usage: 1.2 },
    { time: '06:00', usage: 2.1 },
    { time: '12:00', usage: 3.8 },
    { time: '18:00', usage: 4.2 },
    { time: '24:00', usage: 2.4 },
  ];

  const applianceData = [
    { name: 'HVAC', value: 40, color: '#ff6b6b' },
    { name: 'Water Heater', value: 20, color: '#4ecdc4' },
    { name: 'Lighting', value: 15, color: '#45b7d1' },
    { name: 'Electronics', value: 15, color: '#96ceb4' },
    { name: 'Other', value: 10, color: '#ffd93d' },
  ];

  const progressPercentage = (currentUsage / dailyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Current Usage */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-800">Current Usage</CardTitle>
          <CardDescription>Real-time consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-900">{currentUsage} kWh</div>
          <div className="mt-2">
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-green-700 mt-1">
              {progressPercentage.toFixed(1)}% of daily goal
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Savings */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-800">Monthly Savings</CardTitle>
          <CardDescription>Cost reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-900">${monthlySavings}</div>
          <Badge variant="secondary" className="mt-2 bg-blue-200 text-blue-800">
            12% reduction
          </Badge>
        </CardContent>
      </Card>

      {/* Eco Score */}
      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-emerald-800">Eco Score</CardTitle>
          <CardDescription>Efficiency rating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-emerald-900">87/100</div>
          <Badge variant="secondary" className="mt-2 bg-emerald-200 text-emerald-800">
            Excellent
          </Badge>
        </CardContent>
      </Card>

      {/* Carbon Footprint */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-orange-800">CO₂ Avoided</CardTitle>
          <CardDescription>This month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-orange-900">24 kg</div>
          <p className="text-sm text-orange-700 mt-1">🌱 Great impact!</p>
        </CardContent>
      </Card>

      {/* Today's Usage Chart */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Today's Usage Pattern</CardTitle>
          <CardDescription>Energy consumption throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={todayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Appliance Breakdown */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Energy Breakdown by Appliance</CardTitle>
          <CardDescription>Current consumption distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applianceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {applianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyDashboard;
