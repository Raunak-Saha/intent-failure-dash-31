import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTable from './DataTable';
import InsightCards from './InsightCards';
import SharedFilters from './SharedFilters';
import FailureTrendChart from './FailureTrendChart';
import FailureDrilldown from './FailureDrilldown';

const failureTypesData = [
  {
    "Failure Type": "Person Scoping Issue",
    "Intent Type": "Multiple",
    "DSAT Count": 5
  },
  {
    "Failure Type": "Incomplete results",
    "Intent Type": "Multiple",
    "DSAT Count": 7
  },
  {
    "Failure Type": "Keyword Matching Issue",
    "Intent Type": "Find Topic",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Missing important context",
    "Intent Type": "Multiple",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Staleness",
    "Intent Type": "Multiple",
    "DSAT Count": 10
  },
  {
    "Failure Type": "Missing important emails",
    "Intent Type": "Multiple",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Duplicate",
    "Intent Type": "Multiple",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Email Scoping Issue",
    "Intent Type": "Multiple",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Irrelevant emails",
    "Intent Type": "Multiple",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Inaccurate Count of results",
    "Intent Type": "Multiple",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Missing explainability",
    "Intent Type": "Multiple",
    "DSAT Count": 5
  },
  {
    "Failure Type": "Apology",
    "Intent Type": "Find emails by date range",
    "DSAT Count": 1
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
    "Failure Type": "Task Scoping Issue",
    "Intent Type": "Multiple",
    "DSAT Count": 5
  },
  {
    "Failure Type": "Folder Scoping Issue",
    "Intent Type": "Multiple",
    "DSAT Count": 5
  }
];

// Detailed breakdown for "Multiple" intent types
const failureTypeIntentBreakdown = {
  "Person Scoping Issue": [
    { "Intent Type": "Find Person", "DSAT Count": 3 },
    { "Intent Type": "Find Topic", "DSAT Count": 2 }
  ],
  "Incomplete results": [
    { "Intent Type": "Find Topic", "DSAT Count": 2 },
    { "Intent Type": "Find Attachment", "DSAT Count": 2 },
    { "Intent Type": "Find Person", "DSAT Count": 1 },
    { "Intent Type": "Find Time Range", "DSAT Count": 1 },
    { "Intent Type": "Find Status", "DSAT Count": 1 }
  ],
  "Missing important context": [
    { "Intent Type": "Find Topic", "DSAT Count": 2 },
    { "Intent Type": "Find Person", "DSAT Count": 1 }
  ],
  "Staleness": [
    { "Intent Type": "Find Topic", "DSAT Count": 3 },
    { "Intent Type": "Find Attachment", "DSAT Count": 3 },
    { "Intent Type": "Find Time Range", "DSAT Count": 2 },
    { "Intent Type": "Find Person", "DSAT Count": 2 }
  ],
  "Missing important emails": [
    { "Intent Type": "Find Topic", "DSAT Count": 2 },
    { "Intent Type": "Find Attachment", "DSAT Count": 1 }
  ],
  "Duplicate": [
    { "Intent Type": "Find Topic", "DSAT Count": 2 },
    { "Intent Type": "Find Attachment", "DSAT Count": 1 },
    { "Intent Type": "Find Person", "DSAT Count": 1 }
  ],
  "Email Scoping Issue": [
    { "Intent Type": "Find Topic", "DSAT Count": 2 },
    { "Intent Type": "Find Person", "DSAT Count": 2 }
  ],
  "Irrelevant emails": [
    { "Intent Type": "Find Topic", "DSAT Count": 2 },
    { "Intent Type": "Find Status", "DSAT Count": 1 },
    { "Intent Type": "Find Person", "DSAT Count": 1 }
  ],
  "Inaccurate Count of results": [
    { "Intent Type": "Find Topic", "DSAT Count": 2 },
    { "Intent Type": "Find Status", "DSAT Count": 1 }
  ],
  "Missing explainability": [
    { "Intent Type": "Find Topic", "DSAT Count": 2 },
    { "Intent Type": "Find Person", "DSAT Count": 2 },
    { "Intent Type": "Find Status", "DSAT Count": 1 }
  ],
  "Task Scoping Issue": [
    { "Intent Type": "Find Topic", "DSAT Count": 3 },
    { "Intent Type": "Find Person", "DSAT Count": 2 }
  ],
  "Folder Scoping Issue": [
    { "Intent Type": "Find Topic", "DSAT Count": 3 },
    { "Intent Type": "Find Person", "DSAT Count": 2 }
  ]
};

const failureInsights = [
  {
    id: "top_failures",
    label: "Top 3 Failure Types",
    value: "Staleness (10), Incomplete results (7), Person Scoping Issue (5)",
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
    value: "Email Scoping Issue (4 occurrences)",
    style: "accent" as const
  }
];

interface FailureInsightsPageProps {
  onNavigateToTab?: (tab: string, intentType?: string, failureType?: string) => void;
}

const FailureInsightsPage = ({ onNavigateToTab }: FailureInsightsPageProps) => {
  const [selectedFailureType, setSelectedFailureType] = useState<string | null>(null);
  const [selectedFailureFilter, setSelectedFailureFilter] = useState<string>("all");
  const [expandedFailureTypes, setExpandedFailureTypes] = useState<Set<string>>(new Set());

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

  const handleFailureRowClick = (row: any) => {
    // Navigate to feedback records with failure type filter
    const failureType = row["Failure Type"];
    if (onNavigateToTab) {
      onNavigateToTab('feedback-records', undefined, failureType);
    }
  };

  const handleFailureIntentTypeClick = (row: any) => {
    const failureType = row["Failure Type"];
    const intentType = row["Intent Type"];
    
    if (intentType === "Multiple") {
      // Toggle expanded state for failure types with multiple intents
      const newExpanded = new Set(expandedFailureTypes);
      if (newExpanded.has(failureType)) {
        newExpanded.delete(failureType);
      } else {
        newExpanded.add(failureType);
      }
      setExpandedFailureTypes(newExpanded);
    } else {
      // Navigate to feedback records with filters applied
      if (onNavigateToTab) {
        onNavigateToTab('feedback-records', intentType, failureType);
      }
    }
  };

  const handleFailureTypeIntentClick = (intentType: string, failureType: string) => {
    // Navigate to feedback records with filters applied
    if (onNavigateToTab) {
      onNavigateToTab('feedback-records', intentType, failureType);
    }
  };

  const formatCellValue = (value: any) => {
    if (typeof value === 'number') {
      if (value < 1 && value > 0) {
        return `${(value * 100).toFixed(1)}%`;
      }
      return value % 1 === 0 ? value.toString() : value.toFixed(2);
    }
    return String(value);
  };

  const renderFailureTypesTable = () => {
    const columns = failureTypesData.length > 0 ? Object.keys(failureTypesData[0]) : [];
    
    return (
      <div className="rounded-md border bg-white overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {columns.map((column) => (
                <TableHead key={column} className="font-semibold">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFailureData.map((failure, failureIndex) => {
              const failureType = failure["Failure Type"];
              const intentType = failure["Intent Type"];
              const isExpanded = expandedFailureTypes.has(failureType);
              const intentBreakdown = failureTypeIntentBreakdown[failureType] || [];
              
              return (
                <React.Fragment key={failureIndex}>
                  {/* Main failure row */}
                  <TableRow className="hover:bg-gray-50 cursor-pointer">
                    <TableCell 
                      className="font-medium cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={() => handleFailureRowClick(failure)}
                    >
                      {failure["Failure Type"]}
                    </TableCell>
                    <TableCell 
                      className="cursor-pointer"
                      onClick={() => handleFailureIntentTypeClick(failure)}
                    >
                      {intentType === "Multiple" ? (
                        <div className="flex items-center space-x-2">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          <span className="text-blue-600 hover:underline">{intentType}</span>
                        </div>
                      ) : (
                        <span className="text-blue-600 hover:underline">{intentType}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCellValue(failure["DSAT Count"])}
                    </TableCell>
                  </TableRow>
                  
                  {/* Expanded intent breakdown for "Multiple" types */}
                  {isExpanded && intentType === "Multiple" && intentBreakdown.map((intent, intentIndex) => (
                    <TableRow 
                      key={`${failureIndex}-${intentIndex}`} 
                      className="bg-gray-25 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleFailureTypeIntentClick(intent["Intent Type"], failureType)}
                    >
                      <TableCell className="pl-8 text-sm italic text-gray-600">
                        ↳ {failureType}
                      </TableCell>
                      <TableCell className="pl-8">
                        <span className="text-blue-600 hover:underline text-sm">{intent["Intent Type"]}</span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {formatCellValue(intent["DSAT Count"])}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
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
                  All failure types
                  <Badge variant="destructive">{filteredFailureData.length} failure patterns</Badge>
                </CardTitle>
                <CardDescription>
                  Categorized failure types with dissatisfaction impact. Click on "Multiple" intent types to expand breakdown. Click on failure types to view feedback records.
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
                
                <div className="space-y-4">
                  <div className="text-sm text-gray-500">
                    • Click on Failure Type to view filtered feedback records
                    • Click on "Multiple" intent types to expand/collapse intent breakdown
                    • Click on specific intent types to view filtered feedback records
                  </div>
                  {renderFailureTypesTable()}
                </div>
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
