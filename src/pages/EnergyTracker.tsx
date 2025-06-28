
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnergyDashboard from "@/components/EnergyDashboard";
import ApplianceManager from "@/components/ApplianceManager";
import EnergyTips from "@/components/EnergyTips";
import UsageHistory from "@/components/UsageHistory";

const EnergyTracker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🌱 Eco Energy Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor, analyze, and reduce your home energy consumption
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              📊 Dashboard
            </TabsTrigger>
            <TabsTrigger value="appliances" className="flex items-center gap-2">
              🏠 Appliances
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              📈 History
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              💡 Eco Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <EnergyDashboard />
          </TabsContent>

          <TabsContent value="appliances">
            <ApplianceManager />
          </TabsContent>

          <TabsContent value="history">
            <UsageHistory />
          </TabsContent>

          <TabsContent value="tips">
            <EnergyTips />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnergyTracker;
