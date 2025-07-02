
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const trendData = [
  {
    period: "Week 1",
    "Incomplete results": 8,
    "Staleness": 6,
    "Keyword Matching Issue": 3,
    "Person Scoping Issue": 2,
    "Missing important context": 1,
    "Email Scoping Issue": 1
  },
  {
    period: "Week 2",
    "Incomplete results": 9,
    "Staleness": 7,
    "Keyword Matching Issue": 4,
    "Person Scoping Issue": 3,
    "Missing important context": 2,
    "Email Scoping Issue": 2
  },
  {
    period: "Week 3",
    "Incomplete results": 7,
    "Staleness": 8,
    "Keyword Matching Issue": 5,
    "Person Scoping Issue": 2,
    "Missing important context": 3,
    "Email Scoping Issue": 1
  },
  {
    period: "Week 4",
    "Incomplete results": 10,
    "Staleness": 9,
    "Keyword Matching Issue": 4,
    "Person Scoping Issue": 4,
    "Missing important context": 2,
    "Email Scoping Issue": 3
  }
];

const FailureTrendChart = () => {
  const [timePeriod, setTimePeriod] = useState("weekly");

  const colors = [
    "#ef4444",
    "#f97316", 
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#8b5cf6"
  ];

  const failureTypes = Object.keys(trendData[0]).filter(key => key !== "period");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Failure Type Trends</CardTitle>
            <CardDescription>
              DSAT count trends over time by failure type
            </CardDescription>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-period-select">Time Period</Label>
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger id="time-period-select" className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Legend />
              {failureTypes.map((failureType, index) => (
                <Line
                  key={failureType}
                  type="monotone"
                  dataKey={failureType}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FailureTrendChart;
