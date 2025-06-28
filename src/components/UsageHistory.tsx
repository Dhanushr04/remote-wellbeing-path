
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";

const UsageHistory = () => {
  const [timeRange, setTimeRange] = useState("week");

  const weeklyData = [
    { day: "Mon", usage: 12.5, cost: 1.88, temperature: 22 },
    { day: "Tue", usage: 14.2, cost: 2.13, temperature: 24 },
    { day: "Wed", usage: 11.8, cost: 1.77, temperature: 21 },
    { day: "Thu", usage: 13.1, cost: 1.97, temperature: 23 },
    { day: "Fri", usage: 15.4, cost: 2.31, temperature: 25 },
    { day: "Sat", usage: 18.7, cost: 2.81, temperature: 26 },
    { day: "Sun", usage: 16.3, cost: 2.45, temperature: 24 },
  ];

  const monthlyData = [
    { month: "Jan", usage: 420, cost: 63, savings: 0 },
    { month: "Feb", usage: 380, cost: 57, savings: 8 },
    { month: "Mar", usage: 350, cost: 52.5, savings: 15 },
    { month: "Apr", usage: 320, cost: 48, savings: 22 },
    { month: "May", usage: 310, cost: 46.5, savings: 28 },
    { month: "Jun", usage: 340, cost: 51, savings: 18 },
  ];

  const hourlyData = [
    { hour: "00", usage: 0.8 }, { hour: "01", usage: 0.7 }, { hour: "02", usage: 0.6 },
    { hour: "03", usage: 0.5 }, { hour: "04", usage: 0.6 }, { hour: "05", usage: 0.8 },
    { hour: "06", usage: 1.2 }, { hour: "07", usage: 2.1 }, { hour: "08", usage: 2.8 },
    { hour: "09", usage: 2.2 }, { hour: "10", usage: 1.8 }, { hour: "11", usage: 1.9 },
    { hour: "12", usage: 2.4 }, { hour: "13", usage: 2.1 }, { hour: "14", usage: 1.9 },
    { hour: "15", usage: 2.0 }, { hour: "16", usage: 2.3 }, { hour: "17", usage: 2.8 },
    { hour: "18", usage: 3.2 }, { hour: "19", usage: 3.8 }, { hour: "20", usage: 3.5 },
    { hour: "21", usage: 2.9 }, { hour: "22", usage: 2.1 }, { hour: "23", usage: 1.4 },
  ];

  const insights = [
    {
      icon: "📈",
      title: "Peak Usage Time",
      value: "7:00 PM - 9:00 PM",
      description: "Your highest consumption period",
      type: "info"
    },
    {
      icon: "💰",
      title: "Best Saving Day",
      value: "Wednesday",
      description: "11.8 kWh - 18% below average",
      type: "success"
    },
    {
      icon: "⚡",
      title: "Energy Trend",
      value: "↓ 12% This Month",
      description: "Great improvement from last month",
      type: "success"
    },
    {
      icon: "🌡️",
      title: "Weather Impact",
      value: "High Correlation",
      description: "Usage increases 15% per degree above 24°C",
      type: "warning"
    }
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case "success": return "border-green-200 bg-green-50";
      case "warning": return "border-yellow-200 bg-yellow-50";
      case "info": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Usage History & Analytics
          </CardTitle>
          <CardDescription>
            Detailed analysis of your energy consumption patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">320 kWh</div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$48</div>
              <div className="text-sm text-gray-600">Monthly Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12%</div>
              <div className="text-sm text-gray-600">Savings vs Last Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2.1 kg</div>
              <div className="text-sm text-gray-600">CO₂ per day</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Range Tabs */}
      <Tabs defaultValue="week" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="day">24 Hours</TabsTrigger>
          <TabsTrigger value="week">7 Days</TabsTrigger>
          <TabsTrigger value="month">6 Months</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Hourly Usage</CardTitle>
              <CardDescription>Energy consumption throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#8884d8" 
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Usage Trend</CardTitle>
                <CardDescription>Energy consumption by day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#22c55e" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Costs</CardTitle>
                <CardDescription>Cost breakdown by day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cost" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends & Savings</CardTitle>
              <CardDescription>6-month energy usage and savings comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="usage" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="Usage (kWh)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    name="Savings ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">🔍 Smart Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <Card key={index} className={getInsightColor(insight.type)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                    <p className="font-bold text-lg mt-1">{insight.value}</p>
                    <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>📄 Export & Reports</CardTitle>
          <CardDescription>Download your usage data and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              📊 Download CSV Data
            </Button>
            <Button variant="outline">
              📈 Monthly Report (PDF)
            </Button>
            <Button variant="outline">
              🌍 Carbon Footprint Report
            </Button>
            <Button variant="outline">
              💰 Savings Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsageHistory;
