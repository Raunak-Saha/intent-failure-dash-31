
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, User, Building, MessageSquare, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackData {
  id: string;
  intentType: string;
  feedbackType: "Positive" | "Negative";
  userUtterance: string;
  userFeedbackVerbatim: string;
  feedbackDate: string;
  userFeedbackCount: number;
  usageType: "Power user" | "Medium usage" | "Low usage" | "New User";
  organization: string;
  orgTotalFeedback: number;
  failureType?: string;
}

// Sample feedback data
const feedbackData: FeedbackData[] = [
  {
    id: "1",
    intentType: "Find Topic",
    feedbackType: "Positive",
    userUtterance: "Find emails about project planning",
    userFeedbackVerbatim: "Great! Found exactly what I was looking for quickly.",
    feedbackDate: "2024-06-15",
    userFeedbackCount: 8,
    usageType: "Power user",
    organization: "Microsoft",
    orgTotalFeedback: 145,
    failureType: undefined
  },
  {
    id: "2",
    intentType: "Find Topic",
    feedbackType: "Negative",
    userUtterance: "Find emails about quarterly reviews",
    userFeedbackVerbatim: "Results were not relevant. Showed emails about performance reviews instead of quarterly business reviews.",
    feedbackDate: "2024-06-14",
    userFeedbackCount: 3,
    usageType: "Medium usage",
    organization: "Contoso",
    orgTotalFeedback: 67,
    failureType: "Keyword Matching Issue"
  },
  {
    id: "3",
    intentType: "Find Person",
    feedbackType: "Positive",
    userUtterance: "Find emails from my manager",
    userFeedbackVerbatim: "Perfect results! All emails from my direct manager were shown.",
    feedbackDate: "2024-06-13",
    userFeedbackCount: 15,
    usageType: "Power user",
    organization: "Microsoft",
    orgTotalFeedback: 145,
    failureType: undefined
  },
  {
    id: "4",
    intentType: "Find Person",
    feedbackType: "Negative",
    userUtterance: "Find emails from Sarah Johnson",
    userFeedbackVerbatim: "Missing some emails from Sarah. Only showed recent ones, not older conversations.",
    feedbackDate: "2024-06-12",
    userFeedbackCount: 2,
    usageType: "New User",
    organization: "Fabrikam",
    orgTotalFeedback: 23,
    failureType: "Person Scoping Issue"
  },
  {
    id: "5",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    userUtterance: "Find emails with PowerPoint attachments",
    userFeedbackVerbatim: "Found duplicate results and some results without actual PowerPoint files.",
    feedbackDate: "2024-06-11",
    userFeedbackCount: 5,
    usageType: "Medium usage",
    organization: "AdventureWorks",
    orgTotalFeedback: 89,
    failureType: "Incomplete results"
  },
  // Add more sample data
  {
    id: "6",
    intentType: "Find Time Range",
    feedbackType: "Positive",
    userUtterance: "Find emails from last week",
    userFeedbackVerbatim: "Exactly what I needed! All emails from the specified time range.",
    feedbackDate: "2024-06-10",
    userFeedbackCount: 12,
    usageType: "Power user",
    organization: "Microsoft",
    orgTotalFeedback: 145,
    failureType: undefined
  },
  {
    id: "7",
    intentType: "Find Status",
    feedbackType: "Negative",
    userUtterance: "Find pending emails",
    userFeedbackVerbatim: "Results were outdated. Showed emails that were already resolved.",
    feedbackDate: "2024-06-09",
    userFeedbackCount: 1,
    usageType: "Low usage",
    organization: "Contoso",
    orgTotalFeedback: 67,
    failureType: "Staleness"
  },
  {
    id: "8",
    intentType: "Find Topic",
    feedbackType: "Positive",
    userUtterance: "Find emails where I have been mentioned",
    userFeedbackVerbatim: "Very helpful! Found all my @mentions across different conversations.",
    feedbackDate: "2024-06-08",
    userFeedbackCount: 6,
    usageType: "Medium usage",
    organization: "Fabrikam",
    orgTotalFeedback: 23,
    failureType: undefined
  },
  {
    id: "9",
    intentType: "Find Person",
    feedbackType: "Negative",
    userUtterance: "Find emails that need my reply",
    userFeedbackVerbatim: "Missed several important emails that actually needed responses.",
    feedbackDate: "2024-06-07",
    userFeedbackCount: 4,
    usageType: "Low usage",
    organization: "AdventureWorks",
    orgTotalFeedback: 89,
    failureType: "Missing important emails"
  },
  {
    id: "10",
    intentType: "Find Attachment",
    feedbackType: "Positive",
    userUtterance: "Find email with subject Project Planning CY25",
    userFeedbackVerbatim: "Found the exact email I was looking for with all attachments.",
    feedbackDate: "2024-06-06",
    userFeedbackCount: 9,
    usageType: "Power user",
    organization: "Microsoft",
    orgTotalFeedback: 145,
    failureType: undefined
  }
];

// Additional feedback for "show more" functionality
const additionalFeedbackData: FeedbackData[] = [
  {
    id: "11",
    intentType: "Find Topic",
    feedbackType: "Negative",
    userUtterance: "Find emails about budget approval",
    userFeedbackVerbatim: "Results included irrelevant emails about budget planning instead of approval workflows.",
    feedbackDate: "2024-06-05",
    userFeedbackCount: 7,
    usageType: "Medium usage",
    organization: "Contoso",
    orgTotalFeedback: 67,
    failureType: "Keyword Matching Issue"
  },
  {
    id: "12",
    intentType: "Find Person",
    feedbackType: "Positive",
    userUtterance: "Find emails from the leadership team",
    userFeedbackVerbatim: "Great results! Found all communications from C-level executives.",
    feedbackDate: "2024-06-04",
    userFeedbackCount: 11,
    usageType: "Power user",
    organization: "Microsoft",
    orgTotalFeedback: 145,
    failureType: undefined
  }
];

interface IntentDrilldownProps {
  selectedIntentType: string | null;
  onClose: () => void;
}

const IntentDrilldown = ({ selectedIntentType, onClose }: IntentDrilldownProps) => {
  const [filters, setFilters] = useState({
    failureType: "all",
    usageType: "all",
    organization: "all",
    timeRange: "",
    feedbackType: "all"
  });
  const [showMore, setShowMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  // Combine initial and additional data
  const allFeedbackData = [...feedbackData, ...additionalFeedbackData];

  // Filter data based on selected intent and filters
  const filteredData = useMemo(() => {
    let filtered = allFeedbackData;

    // Filter by selected intent type
    if (selectedIntentType) {
      filtered = filtered.filter(item => item.intentType === selectedIntentType);
    }

    // Apply filters
    if (filters.failureType !== "all") {
      filtered = filtered.filter(item => item.failureType === filters.failureType);
    }
    if (filters.usageType !== "all") {
      filtered = filtered.filter(item => item.usageType === filters.usageType);
    }
    if (filters.organization !== "all") {
      filtered = filtered.filter(item => item.organization === filters.organization);
    }
    if (filters.feedbackType !== "all") {
      filtered = filtered.filter(item => item.feedbackType === filters.feedbackType);
    }
    if (filters.timeRange) {
      filtered = filtered.filter(item => item.feedbackDate >= filters.timeRange);
    }

    return filtered;
  }, [selectedIntentType, filters, allFeedbackData]);

  // Get visible data based on current page
  const visibleData = filteredData.slice(0, visibleCount);

  // Get unique values for filters
  const failureTypes = [...new Set(allFeedbackData.filter(item => item.failureType).map(item => item.failureType))];
  const usageTypes = [...new Set(allFeedbackData.map(item => item.usageType))];
  const organizations = [...new Set(allFeedbackData.map(item => item.organization))];

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  if (!selectedIntentType) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Intent Drilldown</CardTitle>
          <CardDescription>
            Click on any intent type in the "Top Intent Types" table to view detailed feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            Select an intent type to view detailed feedback analysis
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Intent Drilldown: {selectedIntentType}</CardTitle>
            <CardDescription>
              Detailed feedback analysis for {selectedIntentType} ({filteredData.length} feedbacks)
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onClose} size="sm">
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <Label>Failure Type</Label>
            <Select value={filters.failureType} onValueChange={(value) => updateFilter("failureType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {failureTypes.map(type => (
                  <SelectItem key={type} value={type!}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Usage Type</Label>
            <Select value={filters.usageType} onValueChange={(value) => updateFilter("usageType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {usageTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Organization</Label>
            <Select value={filters.organization} onValueChange={(value) => updateFilter("organization", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {organizations.map(org => (
                  <SelectItem key={org} value={org}>{org}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Time Range</Label>
            <Input
              type="date"
              value={filters.timeRange}
              onChange={(e) => updateFilter("timeRange", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Feedback Type</Label>
            <Select value={filters.feedbackType} onValueChange={(value) => updateFilter("feedbackType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Positive">Positive</SelectItem>
                <SelectItem value="Negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleData.map((feedback) => (
            <Card key={feedback.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant={feedback.feedbackType === "Positive" ? "default" : "destructive"} className="flex items-center gap-1">
                    {feedback.feedbackType === "Positive" ? <ThumbsUp className="w-3 h-3" /> : <ThumbsDown className="w-3 h-3" />}
                    {feedback.feedbackType}
                  </Badge>
                  <Badge variant="outline">{feedback.intentType}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-gray-600">User Utterance</Label>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    "{feedback.userUtterance}"
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">User Feedback</Label>
                  <p className="text-sm text-gray-700 italic">"{feedback.userFeedbackVerbatim}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(feedback.feedbackDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Count: {feedback.userFeedbackCount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-xs text-gray-600">Usage Type</Label>
                    <Badge variant="outline" className="ml-2">{feedback.usageType}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span>{feedback.organization}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Org Total Feedback: {feedback.orgTotalFeedback}</span>
                  {feedback.failureType && (
                    <Badge variant="destructive" className="text-xs">
                      {feedback.failureType}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < filteredData.length && (
          <div className="text-center">
            <Button onClick={handleShowMore} variant="outline">
              Show More ({filteredData.length - visibleCount} remaining)
            </Button>
          </div>
        )}

        {visibleData.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No feedback found matching the current filters
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntentDrilldown;
