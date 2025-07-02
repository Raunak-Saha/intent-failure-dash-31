import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import DataTable from './DataTable';
import InsightCards from './InsightCards';
import SharedFilters from './SharedFilters';

const retentionData = [
  {
    "Cohort": "new user: 120",
    "Week 0": "120",
    "Week 1": "55%",
    "Week 2": "42%",
    "Week 3": "33%",
    "Week 4": "29%",
    "Week 5": "24%",
    "Week 6": "20%",
    "Week 7": "17%",
    "Week 8": "15%",
    "Week 9": "12%"
  },
  {
    "Cohort": "new user: 95",
    "Week 0": "95",
    "Week 1": "60%",
    "Week 2": "45%",
    "Week 3": "39%",
    "Week 4": "34%",
    "Week 5": "30%",
    "Week 6": "25%",
    "Week 7": "21%",
    "Week 8": "18%",
    "Week 9": "15%"
  },
  {
    "Cohort": "new user: 130",
    "Week 0": "130",
    "Week 1": "50%",
    "Week 2": "38%",
    "Week 3": "31%",
    "Week 4": "26%",
    "Week 5": "22%",
    "Week 6": "18%",
    "Week 7": "14%",
    "Week 8": "12%",
    "Week 9": "10%"
  },
  {
    "Cohort": "new user: 85",
    "Week 0": "85",
    "Week 1": "62%",
    "Week 2": "49%",
    "Week 3": "40%",
    "Week 4": "35%",
    "Week 5": "31%",
    "Week 6": "28%",
    "Week 7": "25%",
    "Week 8": "22%",
    "Week 9": "20%"
  }
];

const retentionInsights = [
  {
    id: "most_tried",
    label: "Intents New Users Try Most",
    value: "130 users (largest cohort), 120 users, 95 users",
    style: "highlight" as const
  },
  {
    id: "best_retention",
    label: "Intent Driving Most WoW Retention",
    value: "62% (85-user cohort)",
    style: "positive" as const
  },
  {
    id: "low_week4",
    label: "Low Retention at Week 4 (<30%)",
    value: "130-user cohort (26%), 120-user cohort (29%)",
    style: "negative" as const
  },
  {
    id: "high_week4",
    label: "High Retention at Week 4 (≥30%)",
    value: "85-user cohort (35%), 95-user cohort (34%)",
    style: "positive" as const
  }
];

const actionOptions = [
  "FIND",
  "CHECK",
  "LIST",
  "Question: Help",
  "Question: Analyse",
  "SUMMARIZE",
  "CREATE",
  "REVIEW",
  "Re-Write",
  "Delete",
  "SEND",
  "Flag",
  "Move",
  "Mark",
  "Activity"
];

const subjectModifierOptions = [
  "<TEXT>",
  "<FILE>",
  "<PERSON>",
  "<Multiperson>",
  "<URL>",
  "<COMPANY>",
  "<PROJECT>",
  "<DEPARTMENT>",
  "<ROLE>",
  "Topic",
  "Relationship",
  "Unread",
  "Subject",
  "Category",
  "<DATE>",
  "<TIME>",
  "<DATERANGE>",
  "<Last>",
  "<Recent>",
  "Attachment",
  "Attachment type",
  "External",
  "Shared/Delegate",
  "Delegate"
];

const RetentionInsightsPage = () => {
  const [selectedAction, setSelectedAction] = useState<string>("all");
  const [selectedSubjectModifier, setSelectedSubjectModifier] = useState<string>("all");

  return (
    <div className="space-y-6">
      <SharedFilters />
      
      {/* Retention-specific filters */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Filters</CardTitle>
          <CardDescription>
            Filter retention data by actions and subject modifiers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="action-select">Actions</Label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger id="action-select">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {actionOptions.map((action) => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject-modifier-select">Subject Modifiers</Label>
              <Select value={selectedSubjectModifier} onValueChange={setSelectedSubjectModifier}>
                <SelectTrigger id="subject-modifier-select">
                  <SelectValue placeholder="Select a subject modifier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subject Modifiers</SelectItem>
                  {subjectModifierOptions.map((modifier) => (
                    <SelectItem key={modifier} value={modifier}>
                      {modifier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {(selectedAction !== "all" || selectedSubjectModifier !== "all") && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedAction !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Action: {selectedAction}
                  <button
                    onClick={() => setSelectedAction("all")}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedSubjectModifier !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Subject: {selectedSubjectModifier}
                  <button
                    onClick={() => setSelectedSubjectModifier("all")}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Extended Retention Table (Weeks 0–9)
                <Badge variant="outline">4 cohorts</Badge>
              </CardTitle>
              <CardDescription>
                User retention patterns across different cohort sizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={retentionData}
                title="Retention Analysis Overview"
                defaultSort={["Week 0", "desc"]}
                frozenColumns={1}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retention & Cohort Insights</CardTitle>
              <CardDescription>
                User engagement patterns and retention drivers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InsightCards insights={retentionInsights} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RetentionInsightsPage;
