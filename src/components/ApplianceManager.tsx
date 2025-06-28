
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const ApplianceManager = () => {
  const [appliances, setAppliances] = useState([
    { id: 1, name: "Living Room AC", power: 1200, isOn: true, room: "Living Room", efficiency: "A+" },
    { id: 2, name: "Kitchen Refrigerator", power: 150, isOn: true, room: "Kitchen", efficiency: "A++" },
    { id: 3, name: "Bedroom TV", power: 85, isOn: false, room: "Bedroom", efficiency: "A" },
    { id: 4, name: "Water Heater", power: 3000, isOn: true, room: "Utility", efficiency: "B+" },
    { id: 5, name: "LED Lights", power: 45, isOn: true, room: "All Rooms", efficiency: "A++" },
  ]);

  const [newAppliance, setNewAppliance] = useState({
    name: "",
    power: "",
    room: "",
    efficiency: "A"
  });

  const toggleAppliance = (id: number) => {
    setAppliances(prev => 
      prev.map(appliance => 
        appliance.id === id 
          ? { ...appliance, isOn: !appliance.isOn }
          : appliance
      )
    );
  };

  const addAppliance = () => {
    if (newAppliance.name && newAppliance.power) {
      setAppliances(prev => [...prev, {
        id: Date.now(),
        name: newAppliance.name,
        power: parseInt(newAppliance.power),
        isOn: false,
        room: newAppliance.room || "Unknown",
        efficiency: newAppliance.efficiency
      }]);
      setNewAppliance({ name: "", power: "", room: "", efficiency: "A" });
    }
  };

  const totalPower = appliances
    .filter(appliance => appliance.isOn)
    .reduce((sum, appliance) => sum + appliance.power, 0);

  const getEfficiencyColor = (efficiency: string) => {
    const colors: { [key: string]: string } = {
      "A++": "bg-green-500",
      "A+": "bg-green-400",
      "A": "bg-blue-400",
      "B+": "bg-yellow-400",
      "B": "bg-orange-400",
      "C": "bg-red-400"
    };
    return colors[efficiency] || "bg-gray-400";
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏠 Smart Home Overview
          </CardTitle>
          <CardDescription>
            Monitor and control your home appliances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{appliances.length}</div>
              <div className="text-sm text-gray-600">Total Devices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {appliances.filter(a => a.isOn).length}
              </div>
              <div className="text-sm text-gray-600">Active Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalPower}W</div>
              <div className="text-sm text-gray-600">Current Usage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${(totalPower * 0.12 / 1000 * 24).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Daily Cost</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appliance List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Connected Appliances</h3>
          {appliances.map((appliance) => (
            <Card key={appliance.id} className={`transition-all duration-200 ${
              appliance.isOn ? 'border-green-200 bg-green-50' : 'border-gray-200'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-lg">{appliance.name}</h4>
                      <Badge 
                        className={`text-white ${getEfficiencyColor(appliance.efficiency)}`}
                      >
                        {appliance.efficiency}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{appliance.room}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-500">
                        ⚡ {appliance.power}W
                      </span>
                      <span className="text-sm text-gray-500">
                        💰 ${(appliance.power * 0.12 / 1000 * 24).toFixed(2)}/day
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={appliance.isOn}
                      onCheckedChange={() => toggleAppliance(appliance.id)}
                    />
                    <div className={`w-3 h-3 rounded-full ${
                      appliance.isOn ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Appliance */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Appliance</CardTitle>
              <CardDescription>
                Register a new device to track its energy consumption
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Appliance Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Kitchen Microwave"
                  value={newAppliance.name}
                  onChange={(e) => setNewAppliance(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="power">Power Consumption (W)</Label>
                <Input
                  id="power"
                  type="number"
                  placeholder="e.g., 800"
                  value={newAppliance.power}
                  onChange={(e) => setNewAppliance(prev => ({ ...prev, power: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  placeholder="e.g., Kitchen"
                  value={newAppliance.room}
                  onChange={(e) => setNewAppliance(prev => ({ ...prev, room: e.target.value }))}
                />
              </div>
              <Button onClick={addAppliance} className="w-full">
                Add Appliance
              </Button>
            </CardContent>
          </Card>

          {/* Energy Efficiency Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Efficiency Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span className="text-sm">A++ Most Efficient</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-400"></div>
                <span className="text-sm">A+ Very Efficient</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-blue-400"></div>
                <span className="text-sm">A Efficient</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-yellow-400"></div>
                <span className="text-sm">B+ Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-orange-400"></div>
                <span className="text-sm">B Less Efficient</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApplianceManager;
