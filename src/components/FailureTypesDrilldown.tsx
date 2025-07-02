
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Calendar, User, Building2, MessageSquare } from 'lucide-react';

interface FailureFeedback {
  id: string;
  intentType: string;
  userUtterance: string;
  userFeedback: string;
  feedbackDate: string;
  userFeedbackCount: number;
  usageType: 'Power user' | 'Medium usage' | 'Low usage' | 'New User';
  organization: string;
  totalOrgFeedback: number;
}

interface FailureTypesDrilldownProps {
  selectedFailureType: string;
  onClose: () => void;
}

// Sample data for failure feedback
const generateFailureFeedbacks = (failureType: string): FailureFeedback[] => {
  const intentTypes = [
    "Find from time range", "Find from Person", "Find on topic", "Find my @mentions",
    "Find from Company", "Find emails pending reply", "Find emails from folder", "Find email with Subject"
  ];
  
  const utterances = [
    "Find emails from my manager", "Find emails about project planning",
    "Find emails where I have been mentioned", "Find emails that need my reply",
    "Find email with subject Project Planning CY25", "Show me emails from last week",
    "Find all emails from John", "Get emails about budget review"
  ];

  const feedbacks = {
    "Person Scoping Issue": [
      "The system returned emails from multiple Johns instead of my specific contact",
      "Couldn't distinguish between internal and external contacts with same name",
      "Mixed up emails from different people with similar names"
    ],
    "Incomplete results": [
      "Only showed 5 emails when I know there are more matching my search",
      "Missing recent emails that should match the criteria",
      "Search results seem to be cut off without showing all matches"
    ],
    "Keyword Matching Issue": [
      "Couldn't find emails with 'project planning' even though I have many",
      "Search terms don't seem to match synonyms or related words",
      "Too literal matching, missing contextually relevant emails"
    ],
    "Missing important context": [
      "Results don't consider the context of my previous conversations",
      "Missing emails that are part of ongoing thread discussions",
      "Doesn't understand the business context of my search"
    ],
    "Staleness": [
      "Showing old results that are no longer relevant",
      "Missing the latest updates in email threads",
      "Data seems outdated compared to what's actually in my inbox"
    ],
    "Missing important emails": [
      "Can't find critical emails that I know exist in my mailbox",
      "Important client communications not showing up in results",
      "Missing emails from key stakeholders"
    ],
    "Duplicate": [
      "Same email appearing multiple times in search results",
      "Getting duplicate entries for forwarded emails",
      "Redundant results making it hard to find unique information"
    ],
    "Email Scoping Issue": [
      "Search scope too broad, including irrelevant emails",
      "Not respecting folder boundaries in search",
      "Including deleted or archived emails in results"
    ]
  };

  const organizations = ["Microsoft", "Google", "Amazon", "Apple", "Meta"];
  const usageTypes: Array<'Power user' | 'Medium usage' | 'Low usage' | 'New User'> = 
    ['Power user', 'Medium usage', 'Low usage', 'New User'];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `failure-${failureType}-${i}`,
    intentType: intentTypes[Math.floor(Math.random() * intentTypes.length)],
    userUtterance: utterances[Math.floor(Math.random() * utterances.length)],
    userFeedback: feedbacks[failureType as keyof typeof feedbacks]?.[
      Math.floor(Math.random() * feedbacks[failureType as keyof typeof feedbacks].length)
    ] || "Generic failure feedback",
    feedbackDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    userFeedbackCount: Math.floor(Math.random() * 20) + 1,
    usageType: usageTypes[Math.floor(Math.random() * usageTypes.length)],
    organization: organizations[Math.floor(Math.random() * organizations.length)],
    totalOrgFeedback: Math.floor(Math.random() * 100) + 10
  }));
};

const FailureTypesDrilldown = ({ selectedFailureType, onClose }: FailureTypesDrilldownProps) => {
  const [intentTypeFilter, setIntentTypeFilter] = useState<string>('all');
  const [usageTypeFilter, setUsageTypeFilter] = useState<string>('all');
  const [organizationFilter, setOrganizationFilter] = useState<string>('all');
  const [timeRangeFilter, setTimeRangeFilter] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(10);

  const allFeedbacks = useMemo(() => generateFailureFeedbacks(selectedFailureType), [selectedFailureType]);

  const filteredFeedbacks = useMemo(() => {
    return allFeedbacks.filter(feedback => {
      const matchesIntentType = intentTypeFilter === 'all' || feedback.intentType === intentTypeFilter;
      const matchesUsageType = usageTypeFilter === 'all' || feedback.usageType === usageTypeFilter;
      const matchesOrganization = organizationFilter === 'all' || feedback.organization === organizationFilter;
      
      let matchesTimeRange = true;
      if (timeRangeFilter !== 'all') {
        const feedbackDate = new Date(feedback.feedbackDate);
        const now = new Date();
        if (timeRangeFilter === 'last-week') {
          matchesTimeRange = (now.getTime() - feedbackDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
        } else if (timeRangeFilter === 'last-month') {
          matchesTimeRange = (now.getTime() - feedbackDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
        }
      }

      return matchesIntentType && matchesUsageType && matchesOrganization && matchesTimeRange;
    });
  }, [allFeedbacks, intentTypeFilter, usageTypeFilter, organizationFilter, timeRangeFilter]);

  const visibleFeedbacks = filteredFeedbacks.slice(0, visibleCount);

  const uniqueIntentTypes = Array.from(new Set(allFeedbacks.map(f => f.intentType)));
  const uniqueUsageTypes = Array.from(new Set(allFeedbacks.map(f => f.usageType)));
  const uniqueOrganizations = Array.from(new Set(allFeedbacks.map(f => f.organization)));

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const clearFilters = () => {
    setIntentTypeFilter('all');
    setUsageTypeFilter('all');
    setOrganizationFilter('all');
    setTimeRangeFilter('all');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Failure Types Drilldown</h2>
          <p className="text-muted-foreground">
            Detailed feedback analysis for "{selectedFailureType}" failure type
          </p>
        </div>
        <Button variant="outline" onClick={onClose}>
          <X className="h-4 w-4 mr-2" />
          Close
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Intent Type</label>
              <Select value={intentTypeFilter} onValueChange={setIntentTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Intent Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Intent Types</SelectItem>
                  {uniqueIntentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Usage Type</label>
              <Select value={usageTypeFilter} onValueChange={setUsageTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Usage Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Usage Types</SelectItem>
                  {uniqueUsageTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Organization</label>
              <Select value={organizationFilter} onValueChange={setOrganizationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Organizations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  {uniqueOrganizations.map(org => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRangeFilter} onValueChange={setTimeRangeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {visibleFeedbacks.length} of {filteredFeedbacks.length} feedbacks
            </p>
            <Button variant="outline" onClick={clearFilters} size="sm">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleFeedbacks.map((feedback) => (
          <Card key={feedback.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{feedback.intentType}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {feedback.feedbackDate}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">User Utterance:</h4>
                <p className="text-sm italic">"{feedback.userUtterance}"</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">User Feedback:</h4>
                <p className="text-sm">{feedback.userFeedback}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  <span>{feedback.usageType}</span>
                </div>
                <div className="flex items-center">
                  <Building2 className="h-3 w-3 mr-1" />
                  <span>{feedback.organization}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{feedback.userFeedbackCount} feedbacks</span>
                </div>
                <div className="flex items-center">
                  <Building2 className="h-3 w-3 mr-1" />
                  <span>{feedback.totalOrgFeedback} org total</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < filteredFeedbacks.length && (
        <div className="flex justify-center">
          <Button onClick={handleShowMore} variant="outline">
            Show More ({Math.min(10, filteredFeedbacks.length - visibleCount)} more available)
          </Button>
        </div>
      )}

      {filteredFeedbacks.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No feedbacks found matching the current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FailureTypesDrilldown;
