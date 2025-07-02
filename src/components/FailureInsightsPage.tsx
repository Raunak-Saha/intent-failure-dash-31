
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import DataTable from './DataTable';
import InsightCards from './InsightCards';
import SharedFilters from './SharedFilters';
import FailureTrendChart from './FailureTrendChart';
import FailureDrilldown from './FailureDrilldown';

const failureTypesData = [
  {
    "Failure Type": "Person Scoping Issue",
    "Intent Type": "Find emails from Person",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Incomplete results",
    "Intent Type": "Find emails from Person",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Keyword Matching Issue",
    "Intent Type": "Find emails about a Topic",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Missing important context",
    "Intent Type": "Find emails about a Topic",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Staleness",
    "Intent Type": "Find emails with files",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Missing important emails",
    "Intent Type": "Find emails based on multiple people",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Incomplete results",
    "Intent Type": "Find emails with URLs",
    "DSAT Count": 5
  },
  {
    "Failure Type": "Duplicate",
    "Intent Type": "Find emails from a company",
    "DSAT Count": 1
  },
  {
    "Failure Type": "Staleness",
    "Intent Type": "Find emails about a Project",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Email Scoping Issue",
    "Intent Type": "Find email with Subject",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Irrelevant emails",
    "Intent Type": "Find emails based on relationships",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Inaccurate Count of results",
    "Intent Type": "Find emails based on Roles",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Missing explainability",
    "Intent Type": "Find unread emails",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Apology",
    "Intent Type": "Find emails by date range",
    "DSAT Count": 1
  },
  {
    "Failure Type": "Duplicate",
    "Intent Type": "Find emails by date",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Memorization",
    "Intent Type": "Find last email",
    "DSAT Count": 2
  },
  {
    "Failure Type": "External Emails",
    "Intent Type": "Find recent emails",
    "DSAT Count": 5
  },
  {
    "Failure Type": "Person Scoping Issue",
    "Intent Type": "Find emails with Task",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Task Scoping Issue",
    "Intent Type": "Find emails pending Action Item",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Folder Scoping Issue",
    "Intent Type": "Find emails with Unanswered question",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Email Scoping Issue",
    "Intent Type": "Find emails pending reply",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Staleness",
    "Intent Type": "Find emails with follow up",
    "DSAT Count": 3
  }
];

const failureInsights = [
  {
    id: "top_failures",
    label: "Top 3 Failure Types",
    value: "Incomplete results (7), Staleness (7), Keyword Matching Issue (4)",
    style: "highlight" as const
  },
  {
    id: "failure_up",
    label: "Failures Trending ↑",
    value: "Staleness (+15%), Incomplete results (+8%)",
    style: "negative" as const
  },
  {
    id: "failure_down",
    label: "Failures Trending ↓",
    value: "Keyword Matching Issue (-5%), Person Scoping Issue (-3%)",
    style: "positive" as const
  },
  {
    id: "emerging_failure",
    label: "New Emerging Failure",
    value: "Email Scoping Issue (2 occurrences)",
    style: "accent" as const
  }
];

const FailureInsightsPage = () => {
  const [selectedFailureType, setSelectedFailureType] = useState<string | null>(null);
  const [selectedFailureFilter, setSelectedFailureFilter] = useState<string>("all");

  // Get unique failure types and their counts
  const failureTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    failureTypesData.forEach(item => {
      counts[item["Failure Type"]] = (counts[item["Failure Type"]] || 0) + 1;
    });
    return counts;
  }, []);

  const failureTypes = Object.keys(failureTypeCounts);

  // Filter data based on selected failure type
  const filteredFailureData = useMemo(() => {
    if (selectedFailureFilter === "all") {
      return failureTypesData;
    }
    return failureTypesData.filter(item => item["Failure Type"] === selectedFailureFilter);
  }, [selectedFailureFilter]);

  const handleFailureTypeClick = (row: any) => {
    setSelectedFailureType(row["Failure Type"]);
  };

  const handleBackToOverview = () => {
    setSelectedFailureType(null);
  };

  if (selectedFailureType) {
    return (
      <FailureDrilldown 
        selectedFailureType={selectedFailureType}
        onBack={handleBackToOverview}
      />
    );
  }

  return (
    <div className="space-y-6">
      <SharedFilters />
      
      <div className="grid grid-cols-1 gap-6">
        <FailureTrendChart />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Top Failure Types
                  <Badge variant="destructive">{filteredFailureData.length} failure patterns</Badge>
                </CardTitle>
                <CardDescription>
                  Categorized failure types with dissatisfaction impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="failure-filter" className="text-sm font-medium">
                    Filter by Failure Type:
                  </Label>
                  <Select value={selectedFailureFilter} onValueChange={setSelectedFailureFilter}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select failure type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Failure Types ({failureTypesData.length})</SelectItem>
                      {failureTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type} ({failureTypeCounts[type]})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <DataTable 
                  data={filteredFailureData}
                  title="Failure Analysis Overview"
                  defaultSort={["DSAT Count", "desc"]}
                  onRowClick={handleFailureTypeClick}
                  clickableColumn="Failure Type"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Failure Type Insights</CardTitle>
                <CardDescription>
                  Critical failure patterns and improvement opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InsightCards insights={failureInsights} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureInsightsPage;
