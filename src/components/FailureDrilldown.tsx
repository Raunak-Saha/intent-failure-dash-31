
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ChevronDown, MessageSquare, Calendar, User, Building, Filter, ExternalLink } from 'lucide-react';
import { useState, useMemo } from 'react';

interface FailureDrilldownProps {
  selectedFailureType: string | null;
  onBack: () => void;
}

interface FilterState {
  intentType: string;
  usageType: string;
  organization: string;
  timeRange: string;
}

const mockDrilldownData = [
  {
    id: 1,
    intentType: "Find from time range",
    feedbackType: "Negative",
    userUtterance: "Find emails from last week about project planning",
    userFeedback: "It's missing important emails from my manager about the project timeline. The results are incomplete.",
    feedbackDate: "2025-01-15",
    userFeedbackCount: 12,
    usageType: "Power user",
    organization: "TechCorp Inc",
    orgFeedbackCount: 45
  },
  {
    id: 2,
    intentType: "Find from Person",
    feedbackType: "Negative",
    userUtterance: "Find emails from my manager",
    userFeedback: "Wrong answer to how many emails did I receive this week",
    feedbackDate: "2025-01-14",
    userFeedbackCount: 8,
    usageType: "Medium usage",
    organization: "Innovation Labs",
    orgFeedbackCount: 23
  },
  {
    id: 3,
    intentType: "Find on topic",
    feedbackType: "Negative",
    userUtterance: "Find emails about quarterly reviews",
    userFeedback: "The search results don't include emails with 'Q4 review' or 'performance evaluation' keywords",
    feedbackDate: "2025-01-13",
    userFeedbackCount: 15,
    usageType: "Power user",
    organization: "Global Dynamics",
    orgFeedbackCount: 67
  },
  {
    id: 4,
    intentType: "Find my @mentions",
    feedbackType: "Negative",
    userUtterance: "Find emails where I have been mentioned",
    userFeedback: "It's wrong. I have 225 unread e-mails",
    feedbackDate: "2025-01-12",
    userFeedbackCount: 6,
    usageType: "Low usage",
    organization: "StartupXYZ",
    orgFeedbackCount: 12
  },
  {
    id: 5,
    intentType: "Find from Company",
    feedbackType: "Negative",
    userUtterance: "Find emails from client companies",
    userFeedback: "Missing emails from important clients, only showing internal communications",
    feedbackDate: "2025-01-11",
    userFeedbackCount: 20,
    usageType: "Power user",
    organization: "Enterprise Solutions",
    orgFeedbackCount: 89
  },
  {
    id: 6,
    intentType: "Find from time range",
    feedbackType: "Negative",
    userUtterance: "Show me emails from yesterday",
    userFeedback: "The time range filter is not working correctly, showing emails from last week instead",
    feedbackDate: "2025-01-10",
    userFeedbackCount: 4,
    usageType: "New User",
    organization: "Tech Startup",
    orgFeedbackCount: 8
  },
  {
    id: 7,
    intentType: "Find on topic",
    feedbackType: "Negative",
    userUtterance: "Find emails about budget discussions",
    userFeedback: "Search is too broad, includes unrelated financial emails instead of specific budget meetings",
    feedbackDate: "2025-01-09",
    userFeedbackCount: 11,
    usageType: "Medium usage",
    organization: "Finance Corp",
    orgFeedbackCount: 34
  },
  {
    id: 8,
    intentType: "Find from Person",
    feedbackType: "Negative",
    userUtterance: "Find emails from Sarah Johnson",
    userFeedback: "Person scoping is not working - showing emails from different Sarah in the organization",
    feedbackDate: "2025-01-08",
    userFeedbackCount: 7,
    usageType: "Medium usage",
    organization: "Marketing Agency",
    orgFeedbackCount: 28
  },
  {
    id: 9,
    intentType: "Find my @mentions",
    feedbackType: "Negative",
    userUtterance: "Show emails mentioning my name",
    userFeedback: "Not finding emails where I'm CC'd or mentioned in the body text",
    feedbackDate: "2025-01-07",
    userFeedbackCount: 9,
    usageType: "Power user",
    organization: "Consulting Group",
    orgFeedbackCount: 56
  },
  {
    id: 10,
    intentType: "Find from Company",
    feedbackType: "Negative",
    userUtterance: "Find emails from vendor companies",
    userFeedback: "Incomplete results - missing emails from key vendors and suppliers",
    feedbackDate: "2025-01-06",
    userFeedbackCount: 13,
    usageType: "Medium usage",
    organization: "Manufacturing Co",
    orgFeedbackCount: 41
  },
  {
    id: 11,
    intentType: "Find from time range",
    feedbackType: "Negative",
    userUtterance: "Find emails from this month",
    userFeedback: "Time range selector is confusing and not working as expected",
    feedbackDate: "2025-01-05",
    userFeedbackCount: 5,
    usageType: "New User",
    organization: "Digital Agency",
    orgFeedbackCount: 18
  },
  {
    id: 12,
    intentType: "Find on topic",
    feedbackType: "Negative",
    userUtterance: "Find emails about client meetings",
    userFeedback: "Missing many relevant emails about client calls and meetings",
    feedbackDate: "2025-01-04",
    userFeedbackCount: 14,
    usageType: "Power user",
    organization: "Consulting Firm",
    orgFeedbackCount: 72
  },
  {
    id: 13,
    intentType: "Find from Person",
    feedbackType: "Negative",
    userUtterance: "Find emails from team lead",
    userFeedback: "Not identifying the correct person, showing results from multiple team leads",
    feedbackDate: "2025-01-03",
    userFeedbackCount: 3,
    usageType: "Low usage",
    organization: "Software Company",
    orgFeedbackCount: 29
  },
  {
    id: 14,
    intentType: "Find my @mentions",
    feedbackType: "Negative",
    userUtterance: "Show where I was mentioned in discussions",
    userFeedback: "Missing mentions in forwarded emails and group discussions",
    feedbackDate: "2025-01-02",
    userFeedbackCount: 8,
    usageType: "Medium usage",
    organization: "Remote Team",
    orgFeedbackCount: 15
  },
  {
    id: 15,
    intentType: "Find from Company",
    feedbackType: "Negative",
    userUtterance: "Find emails from partner organizations",
    userFeedback: "Only showing internal emails, missing external partner communications",
    feedbackDate: "2025-01-01",
    userFeedbackCount: 16,
    usageType: "Power user",
    organization: "Partnership Corp",
    orgFeedbackCount: 53
  },
  {
    id: 16,
    intentType: "Find from time range",
    feedbackType: "Negative",
    userUtterance: "Find emails from last quarter",
    userFeedback: "Results are incomplete and missing important quarterly reports",
    feedbackDate: "2024-12-31",
    userFeedbackCount: 22,
    usageType: "Power user",
    organization: "Finance Group",
    orgFeedbackCount: 84
  },
  {
    id: 17,
    intentType: "Find on topic",
    feedbackType: "Negative",
    userUtterance: "Find emails about product launch",
    userFeedback: "Search results are too generic, not finding specific launch-related emails",
    feedbackDate: "2024-12-30",
    userFeedbackCount: 10,
    usageType: "Medium usage",
    organization: "Product Team",
    orgFeedbackCount: 37
  },
  {
    id: 18,
    intentType: "Find from Person",
    feedbackType: "Negative",
    userUtterance: "Find emails from HR department",
    userFeedback: "Not capturing all HR communications, missing policy updates",
    feedbackDate: "2024-12-29",
    userFeedbackCount: 6,
    usageType: "Low usage",
    organization: "Corporate HR",
    orgFeedbackCount: 21
  },
  {
    id: 19,
    intentType: "Find my @mentions",
    feedbackType: "Negative",
    userUtterance: "Find where I was tagged in project discussions",
    userFeedback: "Missing tags in email chains and project updates",
    feedbackDate: "2024-12-28",
    userFeedbackCount: 12,
    usageType: "Power user",
    organization: "Project Management",
    orgFeedbackCount: 68
  },
  {
    id: 20,
    intentType: "Find from Company",
    feedbackType: "Negative",
    userUtterance: "Find emails from suppliers",
    userFeedback: "Incomplete supplier communication history, missing purchase orders",
    feedbackDate: "2024-12-27",
    userFeedbackCount: 18,
    usageType: "Medium usage",
    organization: "Supply Chain",
    orgFeedbackCount: 46
  }
];

const FailureDrilldown = ({ selectedFailureType, onBack }: FailureDrilldownProps) => {
  const [visibleCards, setVisibleCards] = useState(10);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    intentType: "all",
    usageType: "all",
    organization: "all",
    timeRange: ""
  });

  if (!selectedFailureType) {
    return null;
  }

  // Get unique values for filter options with counts
  const intentTypes = [...new Set(mockDrilldownData.map(item => item.intentType))];
  const usageTypes = [...new Set(mockDrilldownData.map(item => item.usageType))];
  const organizations = [...new Set(mockDrilldownData.map(item => item.organization))];

  // Calculate intent type counts
  const intentTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockDrilldownData.forEach(item => {
      counts[item.intentType] = (counts[item.intentType] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return mockDrilldownData.filter(item => {
      const matchesIntentType = filters.intentType === "all" || item.intentType === filters.intentType;
      const matchesUsageType = filters.usageType === "all" || item.usageType === filters.usageType;
      const matchesOrganization = filters.organization === "all" || item.organization === filters.organization;
      
      let matchesTimeRange = true;
      if (filters.timeRange) {
        const filterDate = new Date(filters.timeRange);
        const itemDate = new Date(item.feedbackDate);
        matchesTimeRange = itemDate >= filterDate;
      }

      return matchesIntentType && matchesUsageType && matchesOrganization && matchesTimeRange;
    });
  }, [filters]);

  const handleShowMore = () => {
    setVisibleCards(prev => Math.min(prev + 10, filteredData.length));
  };

  const toggleCardExpansion = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setVisibleCards(10); // Reset visible cards when filters change
  };

  const clearFilter = (key: keyof FilterState) => {
    const defaultValue = key === "timeRange" ? "" : "all";
    updateFilter(key, defaultValue);
  };

  const hasActiveFilters = filters.intentType !== "all" || 
    filters.usageType !== "all" || 
    filters.organization !== "all" ||
    filters.timeRange !== "";

  const getFeedbackTypeColor = (type: string) => {
    return type === "Positive" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getUsageTypeColor = (type: string) => {
    switch (type) {
      case "Power user": return "bg-purple-100 text-purple-800";
      case "Medium usage": return "bg-blue-100 text-blue-800";
      case "Low usage": return "bg-yellow-100 text-yellow-800";
      case "New User": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Failure Drilldown</h2>
          <p className="text-gray-600">Detailed feedback for: <span className="font-semibold">{selectedFailureType}</span></p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </CardTitle>
          <CardDescription>
            Filter feedback by intent type, usage type, organization, and time range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="intent-type-select">Intent Type</Label>
              <Select value={filters.intentType} onValueChange={(value) => updateFilter("intentType", value)}>
                <SelectTrigger id="intent-type-select">
                  <SelectValue placeholder="Select intent type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Intent Types ({mockDrilldownData.length})</SelectItem>
                  {intentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type} ({intentTypeCounts[type]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usage-type-select">Usage Type</Label>
              <Select value={filters.usageType} onValueChange={(value) => updateFilter("usageType", value)}>
                <SelectTrigger id="usage-type-select">
                  <SelectValue placeholder="Select usage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Usage Types</SelectItem>
                  {usageTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization-select">Organization</Label>
              <Select value={filters.organization} onValueChange={(value) => updateFilter("organization", value)}>
                <SelectTrigger id="organization-select">
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  {organizations.map(org => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-range-input">Time Range (From)</Label>
              <Input
                id="time-range-input"
                type="date"
                value={filters.timeRange}
                onChange={(e) => updateFilter("timeRange", e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.intentType !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Intent: {filters.intentType}
                  <button
                    onClick={() => clearFilter("intentType")}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.usageType !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Usage: {filters.usageType}
                  <button
                    onClick={() => clearFilter("usageType")}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.organization !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Org: {filters.organization}
                  <button
                    onClick={() => clearFilter("organization")}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.timeRange && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  From: {new Date(filters.timeRange).toLocaleDateString()}
                  <button
                    onClick={() => clearFilter("timeRange")}
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

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {Math.min(visibleCards, filteredData.length)} of {filteredData.length} feedback entries
      </div>

      {/* Feedback Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredData.slice(0, visibleCards).map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{item.intentType}</span>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    "{item.userUtterance}"
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getFeedbackTypeColor(item.feedbackType)}>
                    {item.feedbackType}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCardExpansion(item.id)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCard === item.id ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-200">
                  <p className="text-sm text-red-800 font-medium">User Feedback:</p>
                  <p className="text-sm text-red-700 mt-1">"{item.userFeedback}"</p>
                </div>

                {expandedCard === item.id && (
                  <div className="space-y-3 pt-3 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Feedback Date</p>
                          <p className="text-sm font-medium">{item.feedbackDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">User Feedback Count</p>
                          <p className="text-sm font-medium">{item.userFeedbackCount}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Usage Type</p>
                        <Badge className={getUsageTypeColor(item.usageType)}>
                          {item.usageType}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Organization</p>
                          <p className="text-sm font-medium">{item.organization}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">
                          Total feedback from <span className="font-semibold">{item.organization}</span>: 
                          <span className="font-semibold text-gray-800"> {item.orgFeedbackCount}</span>
                        </p>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-blue-600 font-medium">Co-Pilot Dashboard</p>
                            <p className="text-xs text-blue-500">View detailed analytics</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => window.open('https://copilotdash.microsoft.com/team/dsat?teamId=7&subMenu=All', '_blank')}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCards < filteredData.length && (
        <div className="flex justify-center">
          <Button onClick={handleShowMore} variant="outline">
            Show More ({filteredData.length - visibleCards} remaining)
          </Button>
        </div>
      )}

      {filteredData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No feedback entries match the current filters.</p>
        </div>
      )}
    </div>
  );
};

export default FailureDrilldown;
