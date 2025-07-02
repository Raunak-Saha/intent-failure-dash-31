import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTable from './DataTable';
import InsightCards from './InsightCards';
import SharedFilters from './SharedFilters';
import IntentDrilldown from './IntentDrilldown';

// Enhanced intent data with updated column names to match Feedback Records
const intentData = [
  {
    "Intent Type": "Find Topic",
    "Number of Utterances": "97",
    "Unique Customers": "23",
    "Unique Tenants": "8",
    "Weekly Visits (75th Percentile)": "156",
    "SAT %": "91.1%",
    "Number of SATs": "88",
    "Average Citations": "0.73",
    "DSAT Count": "6",
    "Turn 0": "1",
    "Avg Turn %": "75.1%",
    "CiQ %": "82.4%",
    "Completeness Intent %": "77.3%"
  },
  {
    "Intent Type": "Find Attachment",
    "Number of Utterances": "76",
    "Unique Customers": "19",
    "Unique Tenants": "6",
    "Weekly Visits (75th Percentile)": "124",
    "SAT %": "83.5%",
    "Number of SATs": "63",
    "Average Citations": "1.46",
    "DSAT Count": "9",
    "Turn 0": "0",
    "Avg Turn %": "68.4%",
    "CiQ %": "59.0%",
    "Completeness Intent %": "82.5%"
  },
  {
    "Intent Type": "Find Time Range",
    "Number of Utterances": "65",
    "Unique Customers": "17",
    "Unique Tenants": "5",
    "Weekly Visits (75th Percentile)": "89",
    "SAT %": "84.7%",
    "Number of SATs": "55",
    "Average Citations": "2.96",
    "DSAT Count": "9",
    "Turn 0": "1",
    "Avg Turn %": "87.2%",
    "CiQ %": "73.1%",
    "Completeness Intent %": "72.9%"
  },
  {
    "Intent Type": "Find Person",
    "Number of Utterances": "54",
    "Unique Customers": "15",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "67",
    "SAT %": "94%",
    "Number of SATs": "51",
    "Average Citations": "1.08",
    "DSAT Count": "6",
    "Turn 0": "1",
    "Avg Turn %": "78.3%",
    "CiQ %": "54.0%",
    "Completeness Intent %": "56.3%"
  },
  {
    "Intent Type": "Find Status",
    "Number of Utterances": "19",
    "Unique Customers": "8",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "25",
    "SAT %": "88.7%",
    "Number of SATs": "17",
    "Average Citations": "2.05",
    "DSAT Count": "8",
    "Turn 0": "0",
    "Avg Turn %": "61.5%",
    "CiQ %": "80.7%",
    "Completeness Intent %": "72.5%"
  }
];

// Updated intentFailureTypes with removed failure types
const intentFailureTypes = {
  "Find Topic": [
    {
      "Failure Type": "Incomplete results",
      "Number of Utterances": "25",
      "Unique Customers": "8",
      "Unique Tenants": "3",
      "Weekly Visits (75th Percentile)": "42",
      "SAT %": "65.2%",
      "Number of SATs": "16",
      "Average Citations": "0.5",
      "DSAT Count": "4"
    },
    {
      "Failure Type": "Irrelevant Results",
      "Number of Utterances": "18",
      "Unique Customers": "6",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "28",
      "SAT %": "58.3%",
      "Number of SATs": "10",
      "Average Citations": "0.3",
      "DSAT Count": "3"
    },
    {
      "Failure Type": "Staleness",
      "Number of Utterances": "15",
      "Unique Customers": "5",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "22",
      "SAT %": "72.1%",
      "Number of SATs": "11",
      "Average Citations": "0.4",
      "DSAT Count": "2"
    },
    {
      "Failure Type": "Keyword Matching Issue",
      "Number of Utterances": "12",
      "Unique Customers": "4",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "18",
      "SAT %": "68.5%",
      "Number of SATs": "8",
      "Average Citations": "0.2",
      "DSAT Count": "1"
    },
    {
      "Failure Type": "Missing important context",
      "Number of Utterances": "10",
      "Unique Customers": "3",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "15",
      "SAT %": "70.0%",
      "Number of SATs": "7",
      "Average Citations": "0.3",
      "DSAT Count": "2"
    }
  ],
  "Find Attachment": [
    {
      "Failure Type": "Incomplete results",
      "Number of Utterances": "22",
      "Unique Customers": "7",
      "Unique Tenants": "3",
      "Weekly Visits (75th Percentile)": "35",
      "SAT %": "61.4%",
      "Number of SATs": "13",
      "Average Citations": "1.2",
      "DSAT Count": "5"
    },
    {
      "Failure Type": "Staleness",
      "Number of Utterances": "19",
      "Unique Customers": "6",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "31",
      "SAT %": "75.8%",
      "Number of SATs": "14",
      "Average Citations": "1.5",
      "DSAT Count": "3"
    },
    {
      "Failure Type": "Incorrect attachment filter",
      "Number of Utterances": "14",
      "Unique Customers": "4",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "20",
      "SAT %": "69.2%",
      "Number of SATs": "10",
      "Average Citations": "1.1",
      "DSAT Count": "2"
    }
  ],
  "Find Time Range": [
    {
      "Failure Type": "Incorrect date filter",
      "Number of Utterances": "20",
      "Unique Customers": "6",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "28",
      "SAT %": "70.5%",
      "Number of SATs": "14",
      "Average Citations": "2.1",
      "DSAT Count": "4"
    },
    {
      "Failure Type": "Incomplete results",
      "Number of Utterances": "16",
      "Unique Customers": "5",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "23",
      "SAT %": "78.3%",
      "Number of SATs": "12",
      "Average Citations": "2.8",
      "DSAT Count": "3"
    },
    {
      "Failure Type": "Staleness",
      "Number of Utterances": "11",
      "Unique Customers": "3",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "16",
      "SAT %": "82.1%",
      "Number of SATs": "9",
      "Average Citations": "3.2",
      "DSAT Count": "2"
    }
  ],
  "Find Person": [
    {
      "Failure Type": "Incorrect sender filter",
      "Number of Utterances": "18",
      "Unique Customers": "5",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "24",
      "SAT %": "88.9%",
      "Number of SATs": "16",
      "Average Citations": "0.9",
      "DSAT Count": "3"
    },
    {
      "Failure Type": "Incorrect recipient filter",
      "Number of Utterances": "14",
      "Unique Customers": "4",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "19",
      "SAT %": "85.7%",
      "Number of SATs": "12",
      "Average Citations": "1.1",
      "DSAT Count": "2"
    },
    {
      "Failure Type": "Incomplete results",
      "Number of Utterances": "10",
      "Unique Customers": "3",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "14",
      "SAT %": "90.0%",
      "Number of SATs": "9",
      "Average Citations": "1.2",
      "DSAT Count": "1"
    }
  ],
  "Find Status": [
    {
      "Failure Type": "Incomplete results",
      "Number of Utterances": "8",
      "Unique Customers": "3",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "12",
      "SAT %": "75.0%",
      "Number of SATs": "6",
      "Average Citations": "1.8",
      "DSAT Count": "3"
    },
    {
      "Failure Type": "Irrelevant Results",
      "Number of Utterances": "6",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "8",
      "SAT %": "83.3%",
      "Number of SATs": "5",
      "Average Citations": "2.2",
      "DSAT Count": "2"
    }
  ]
};

const failureTypesData = [
  {
    "Failure Type": "Incomplete results",
    "Intent Type": "Multiple",
    "DSAT Count": 6
  },
  {
    "Failure Type": "Staleness",
    "Intent Type": "Multiple", 
    "DSAT Count": 6
  },
  {
    "Failure Type": "Keyword Matching Issue",
    "Intent Type": "Find Topic",
    "DSAT Count": 4
  },
  {
    "Failure Type": "External Emails",
    "Intent Type": "Find recent emails",
    "DSAT Count": 5
  },
  {
    "Failure Type": "Missing explainability",
    "Intent Type": "Multiple",
    "DSAT Count": 4
  },
  {
    "Failure Type": "Person Scoping Issue",
    "Intent Type": "Multiple",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Irrelevant emails",
    "Intent Type": "Multiple",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Duplicate",
    "Intent Type": "Multiple",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Task Scoping Issue",
    "Intent Type": "Multiple",
    "DSAT Count": 3
  },
  {
    "Failure Type": "Missing important context",
    "Intent Type": "Multiple",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Missing important emails",
    "Intent Type": "Multiple",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Email Scoping Issue",
    "Intent Type": "Multiple",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Inaccurate Count of results",
    "Intent Type": "Multiple",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Memorization",
    "Intent Type": "Find last email",
    "DSAT Count": 2
  },
  {
    "Failure Type": "Apology",
    "Intent Type": "Find emails by date range",
    "DSAT Count": 1
  },
  {
    "Failure Type": "Folder Scoping Issue",
    "Intent Type": "Multiple",
    "DSAT Count": 1
  }
];

const highlightInsights = [
  {
    id: "emerging_intent",
    label: "New Emerging Intent",
    value: "Find Status (19 utterances)",
    style: "accent" as const
  },
  {
    id: "failure_up",
    label: "Failures Trending ↑",
    value: "Staleness (+15%), Incomplete results (+8%)",
    style: "negative" as const
  },
  {
    "id": "failure_down",
    "label": "Failures Trending ↓",
    "value": "Keyword Matching Issue (-5%), Person Scoping Issue (-3%)",
    style: "positive" as const
  },
  {
    id: "emerging_failure",
    label: "New Emerging Failure",
    value: "Email Scoping Issue (2 occurrences)",
    style: "accent" as const
  }
];

interface HighlightsPageProps {
  onNavigateToTab: (tab: string, intentType?: string, failureType?: string) => void;
}

const HighlightsPage = ({ onNavigateToTab }: HighlightsPageProps) => {
  const [selectedIntentType, setSelectedIntentType] = useState<string | null>(null);
  const [showIntentDrilldown, setShowIntentDrilldown] = useState(true); // Changed to true by default
  const [expandedIntents, setExpandedIntents] = useState<Set<string>>(new Set());

  const handleIntentTableClick = () => {
    onNavigateToTab('intents');
  };

  const handleFailureTableClick = () => {
    onNavigateToTab('failures');
  };

  const handleIntentRowClick = (row: any) => {
    const intentType = row["Intent Type"];
    // Toggle expanded state
    const newExpanded = new Set(expandedIntents);
    if (newExpanded.has(intentType)) {
      newExpanded.delete(intentType);
    } else {
      newExpanded.add(intentType);
    }
    setExpandedIntents(newExpanded);
  };

  const handleFailureRowClick = (row: any) => {
    // Navigate to feedback records with failure type filter
    const failureType = row["Failure Type"];
    onNavigateToTab('feedback-records', undefined, failureType);
  };

  const handleFailureTypeClick = (intentType: string, failureType: string) => {
    // Navigate to feedback records with filters applied
    onNavigateToTab('feedback-records', intentType, failureType);
  };

  const handleCloseDrilldown = () => {
    setSelectedIntentType(null);
    setShowIntentDrilldown(false);
    setExpandedIntents(new Set());
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

  const renderIntentDrilldownTable = () => {
    const columns = intentData.length > 0 ? Object.keys(intentData[0]) : [];
    
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
            {intentData.map((intent, intentIndex) => {
              const intentType = intent["Intent Type"];
              const isExpanded = expandedIntents.has(intentType);
              const failureTypes = intentFailureTypes[intentType] || [];
              
              return (
                <React.Fragment key={intentIndex}>
                  {/* Main intent row */}
                  <TableRow className="hover:bg-gray-50 cursor-pointer" onClick={() => handleIntentRowClick(intent)}>
                    {columns.map((column, colIndex) => (
                      <TableCell 
                        key={column}
                        className={`${
                          typeof intent[column] === 'number' ? 'text-right font-mono' : ''
                        } ${
                          column === 'Intent Type' ? 'font-medium' : ''
                        }`}
                      >
                        {column === 'Intent Type' ? (
                          <div className="flex items-center space-x-2">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            <span className="text-blue-600 hover:underline">{intent[column]}</span>
                          </div>
                        ) : (
                          formatCellValue(intent[column])
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {/* Expanded failure types */}
                  {isExpanded && failureTypes.map((failure, failureIndex) => (
                    <TableRow 
                      key={`${intentIndex}-${failureIndex}`} 
                      className="bg-gray-25 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleFailureTypeClick(intentType, failure["Failure Type"])}
                    >
                      {columns.map((column) => (
                        <TableCell 
                          key={column}
                          className={`${
                            typeof failure[column] === 'number' ? 'text-right font-mono' : ''
                          } pl-8`}
                        >
                          {column === 'Intent Type' ? (
                            <span className="text-blue-600 hover:underline text-sm italic">↳ {failure["Failure Type"]}</span>
                          ) : (
                            formatCellValue(failure[column] || '')
                          )}
                        </TableCell>
                      ))}
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

  return (
    <div className="space-y-6">
      <SharedFilters />
      
      {selectedIntentType && !showIntentDrilldown ? (
        <IntentDrilldown 
          selectedIntentType={selectedIntentType} 
          onClose={handleCloseDrilldown}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="cursor-pointer hover:text-blue-600" onClick={handleIntentTableClick}>
                        Top 5 Intent Types
                      </CardTitle>
                    </div>
                    <Badge variant="outline">{intentData.length} intents</Badge>
                  </div>
                  <CardDescription>
                    Intent types with expandable failure patterns. Click on Intent Type to expand/collapse failure details. Click on failure types to view filtered feedback records.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                      Showing {intentData.length} intent types with expandable failure details
                      • Click on Intent Type to expand/collapse failure patterns
                      • Click on failure types to view filtered feedback records
                    </div>
                    {renderIntentDrilldownTable()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between cursor-pointer hover:text-blue-600" onClick={handleFailureTableClick}>
                    Top Failure Types
                    <Badge variant="destructive">{failureTypesData.length} failure patterns</Badge>
                  </CardTitle>
                  <CardDescription>
                    Categorized failure types with dissatisfaction impact (Click to view details or click on a row to view feedback records)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable 
                    data={failureTypesData}
                    title="Failure Analysis Overview"
                    defaultSort={["DSAT Count", "desc"]}
                    onRowClick={handleFailureRowClick}
                    clickableColumn="Failure Type"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights & Trends</CardTitle>
                <CardDescription>
                  Critical patterns and emerging trends across intents and failures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InsightCards insights={highlightInsights} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default HighlightsPage;
