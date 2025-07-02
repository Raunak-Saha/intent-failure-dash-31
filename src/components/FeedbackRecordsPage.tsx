import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, User, Building, MessageSquare, ThumbsUp, ThumbsDown, Filter } from 'lucide-react';
import SharedFilters from './SharedFilters';

interface FeedbackRecord {
  id: string;
  intentType: string;
  feedbackType: "Positive" | "Negative";
  failureType?: string;
  userUtterance: string;
  userFeedbackVerbatim: string;
  feedbackDate: string;
  userFeedbackCount: number;
  usageType: "Power user" | "Medium usage" | "Low usage" | "New User";
  organization: string;
  orgTotalFeedback: number;
}

// Updated initial feedback records with matching intent types
const initialFeedbackRecords: FeedbackRecord[] = [
  {
    id: "1",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Incomplete results",
    userUtterance: "Find emails from last week about project planning",
    userFeedbackVerbatim: "It's missing important emails from my manager about the project timeline. The results are incomplete.",
    feedbackDate: "2025-01-15",
    userFeedbackCount: 12,
    usageType: "Power user",
    organization: "TechCorp Inc",
    orgTotalFeedback: 45
  },
  {
    id: "2",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Person Scoping Issue",
    userUtterance: "Find emails from my manager",
    userFeedbackVerbatim: "Wrong answer to how many emails did I receive this week",
    feedbackDate: "2025-01-14",
    userFeedbackCount: 8,
    usageType: "Medium usage",
    organization: "Innovation Labs",
    orgTotalFeedback: 23
  },
  {
    id: "3",
    intentType: "Find Topic",
    feedbackType: "Positive",
    userUtterance: "Find emails about quarterly reviews",
    userFeedbackVerbatim: "Perfect! Found exactly what I was looking for. The search results were very relevant.",
    feedbackDate: "2025-01-13",
    userFeedbackCount: 15,
    usageType: "Power user",
    organization: "Global Dynamics",
    orgTotalFeedback: 67
  },
  {
    id: "4",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Missing important emails",
    userUtterance: "Find emails where I have been mentioned",
    userFeedbackVerbatim: "It's wrong. I have 225 unread e-mails",
    feedbackDate: "2025-01-12",
    userFeedbackCount: 6,
    usageType: "Low usage",
    organization: "StartupXYZ",
    orgTotalFeedback: 12
  },
  {
    id: "5",
    intentType: "Find Topic",
    feedbackType: "Positive",
    userUtterance: "Find emails from client companies",
    userFeedbackVerbatim: "Great results! Found all communications from our key clients.",
    feedbackDate: "2025-01-11",
    userFeedbackCount: 20,
    usageType: "Power user",
    organization: "Enterprise Solutions",
    orgTotalFeedback: 89
  },
  {
    id: "6",
    intentType: "Find Status",
    feedbackType: "Negative",
    failureType: "Staleness",
    userUtterance: "Find emails that need my reply",
    userFeedbackVerbatim: "The time range filter is not working correctly, showing emails from last week instead",
    feedbackDate: "2025-01-10",
    userFeedbackCount: 4,
    usageType: "New User",
    organization: "Tech Startup",
    orgTotalFeedback: 8
  },
  {
    id: "7",
    intentType: "Find Attachment",
    feedbackType: "Positive",
    userUtterance: "Find emails from my Inbox folder",
    userFeedbackVerbatim: "Excellent! Found all the emails I needed from my inbox.",
    feedbackDate: "2025-01-09",
    userFeedbackCount: 11,
    usageType: "Medium usage",
    organization: "Finance Corp",
    orgTotalFeedback: 34
  },
  {
    id: "8",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Email Scoping Issue",
    userUtterance: "Find email with subject Project Planning CY25",
    userFeedbackVerbatim: "Subject scoping is not working - showing emails with similar but different subjects",
    feedbackDate: "2025-01-08",
    userFeedbackCount: 7,
    usageType: "Medium usage",
    organization: "Marketing Agency",
    orgTotalFeedback: 28
  },
  {
    id: "9",
    intentType: "Find Topic",
    feedbackType: "Positive",
    userUtterance: "Show emails mentioning my name",
    userFeedbackVerbatim: "Perfect! Found all emails where I was mentioned or tagged.",
    feedbackDate: "2025-01-07",
    userFeedbackCount: 9,
    usageType: "Power user",
    organization: "Consulting Group",
    orgTotalFeedback: 56
  },
  {
    id: "10",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Duplicate",
    userUtterance: "Find emails from vendor companies",
    userFeedbackVerbatim: "Showing duplicate results and missing emails from key vendors",
    feedbackDate: "2025-01-06",
    userFeedbackCount: 13,
    usageType: "Medium usage",
    organization: "Manufacturing Co",
    orgTotalFeedback: 41
  },
  {
    id: "11",
    intentType: "Find Time Range",
    feedbackType: "Positive",
    userUtterance: "Find emails from this month",
    userFeedbackVerbatim: "Great filtering! Found all emails from the current month as expected.",
    feedbackDate: "2025-01-05",
    userFeedbackCount: 5,
    usageType: "New User",
    organization: "Digital Agency",
    orgTotalFeedback: 18
  },
  {
    id: "12",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Keyword Matching Issue",
    userUtterance: "Find emails about client meetings",
    userFeedbackVerbatim: "Missing many relevant emails about client calls and meetings",
    feedbackDate: "2025-01-04",
    userFeedbackCount: 14,
    usageType: "Power user",
    organization: "Consulting Firm",
    orgTotalFeedback: 72
  },
  {
    id: "13",
    intentType: "Find Person",
    feedbackType: "Positive",
    userUtterance: "Find emails from team lead",
    userFeedbackVerbatim: "Excellent results! Found all communications from my team lead.",
    feedbackDate: "2025-01-03",
    userFeedbackCount: 3,
    usageType: "Low usage",
    organization: "Software Company",
    orgTotalFeedback: 29
  },
  {
    id: "14",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Missing explainability",
    userUtterance: "Show where I was mentioned in discussions",
    userFeedbackVerbatim: "Missing mentions in forwarded emails and group discussions",
    feedbackDate: "2025-01-02",
    userFeedbackCount: 8,
    usageType: "Medium usage",
    organization: "Remote Team",
    orgTotalFeedback: 15
  },
  {
    id: "15",
    intentType: "Find Topic",
    feedbackType: "Positive",
    userUtterance: "Find emails from partner organizations",
    userFeedbackVerbatim: "Perfect! Found all external partner communications as needed.",
    feedbackDate: "2025-01-01",
    userFeedbackCount: 16,
    usageType: "Power user",
    organization: "Partnership Corp",
    orgTotalFeedback: 53
  },
  {
    id: "16",
    intentType: "Find Status",
    feedbackType: "Negative",
    failureType: "Inaccurate Count of results",
    userUtterance: "Find emails that need my reply",
    userFeedbackVerbatim: "The count is wrong, showing 50 emails but I only have 25 that need replies",
    feedbackDate: "2024-12-31",
    userFeedbackCount: 22,
    usageType: "Power user",
    organization: "Finance Group",
    orgTotalFeedback: 84
  },
  {
    id: "17",
    intentType: "Find Attachment",
    feedbackType: "Positive",
    userUtterance: "Find emails from Sent Items",
    userFeedbackVerbatim: "Great! Found all my sent emails quickly and accurately.",
    feedbackDate: "2024-12-30",
    userFeedbackCount: 10,
    usageType: "Medium usage",
    organization: "Product Team",
    orgTotalFeedback: 37
  },
  {
    id: "18",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Folder Scoping Issue",
    userUtterance: "Find email with subject Monthly Report",
    userFeedbackVerbatim: "Not finding emails in subfolders, only showing results from main folders",
    feedbackDate: "2024-12-29",
    userFeedbackCount: 6,
    usageType: "Low usage",
    organization: "Corporate HR",
    orgTotalFeedback: 21
  },
  {
    id: "19",
    intentType: "Find Topic",
    feedbackType: "Positive",
    userUtterance: "Find emails about budget discussions",
    userFeedbackVerbatim: "Excellent search results! Found all budget-related discussions.",
    feedbackDate: "2024-12-28",
    userFeedbackCount: 12,
    usageType: "Power user",
    organization: "Project Management",
    orgTotalFeedback: 68
  },
  {
    id: "20",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "External Emails",
    userUtterance: "Find emails from suppliers",
    userFeedbackVerbatim: "Missing external supplier emails, only showing internal communications",
    feedbackDate: "2024-12-27",
    userFeedbackCount: 18,
    usageType: "Medium usage",
    organization: "Supply Chain",
    orgTotalFeedback: 46
  }
];

// 40 new feedback records with specified intent types and failure types
const additionalFeedbackRecords: FeedbackRecord[] = [
  {
    id: "21",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Incomplete results",
    userUtterance: "Search for emails on Financial planning from this week",
    userFeedbackVerbatim: "Missing several important emails about budget allocation and quarterly financial reviews that I know exist.",
    feedbackDate: "2024-12-26",
    userFeedbackCount: 8,
    usageType: "Power user",
    organization: "Finance Corp",
    orgTotalFeedback: 34
  },
  {
    id: "22",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Irrelevant results",
    userUtterance: "Find the email where project alzazar doc was shared",
    userFeedbackVerbatim: "Showing documents from other projects that have nothing to do with alzazar. Results are completely off-topic.",
    feedbackDate: "2024-12-25",
    userFeedbackCount: 5,
    usageType: "Medium usage",
    organization: "TechCorp Inc",
    orgTotalFeedback: 45
  },
  {
    id: "23",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Staleness",
    userUtterance: "Find emails from Shubha that were sent today",
    userFeedbackVerbatim: "The results are showing old cached data, not reflecting the emails Shubha sent this morning.",
    feedbackDate: "2024-12-24",
    userFeedbackCount: 3,
    usageType: "Low usage",
    organization: "Innovation Labs",
    orgTotalFeedback: 23
  },
  {
    id: "24",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Keyword matching issue",
    userUtterance: "Find emails from Saurabh which mentioned me",
    userFeedbackVerbatim: "Not finding emails where Saurabh mentioned my nickname or used @mentions. Keyword detection is too literal.",
    feedbackDate: "2024-12-23",
    userFeedbackCount: 12,
    usageType: "Power user",
    organization: "Consulting Group",
    orgTotalFeedback: 56
  },
  {
    id: "25",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Missing important context",
    userUtterance: "Find emails about the product launch campaign",
    userFeedbackVerbatim: "Missing emails from the marketing thread that discuss campaign strategies. Context from forwarded emails is lost.",
    feedbackDate: "2024-12-22",
    userFeedbackCount: 15,
    usageType: "Medium usage",
    organization: "Marketing Agency",
    orgTotalFeedback: 28
  },
  {
    id: "26",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Incorrect date filter",
    userUtterance: "Find emails with presentation slides from last month",
    userFeedbackVerbatim: "The date filter is not working correctly. Showing presentations from 3 months ago instead of last month.",
    feedbackDate: "2024-12-21",
    userFeedbackCount: 7,
    usageType: "Medium usage",
    organization: "Enterprise Solutions",
    orgTotalFeedback: 89
  },
  {
    id: "27",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Incorrect sender filter",
    userUtterance: "Find emails from the HR team sent this week",
    userFeedbackVerbatim: "Showing emails from people not in HR team. The sender filter is including wrong people.",
    feedbackDate: "2024-12-20",
    userFeedbackCount: 9,
    usageType: "Low usage",
    organization: "Corporate HR",
    orgTotalFeedback: 21
  },
  {
    id: "28",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Incorrect recipient filter",
    userUtterance: "Find emails where I was included in the recipient list",
    userFeedbackVerbatim: "Missing emails where I was BCCed or part of a distribution list. Recipient detection is incomplete.",
    feedbackDate: "2024-12-19",
    userFeedbackCount: 11,
    usageType: "Power user",
    organization: "Global Dynamics",
    orgTotalFeedback: 67
  },
  {
    id: "29",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Incomplete results",
    userUtterance: "Search for emails discussing client requirements",
    userFeedbackVerbatim: "Only showing half of the requirement discussions. Missing the follow-up emails with detailed specifications.",
    feedbackDate: "2024-12-18",
    userFeedbackCount: 6,
    usageType: "Medium usage",
    organization: "Software Company",
    orgTotalFeedback: 29
  },
  {
    id: "30",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Irrelevant results",
    userUtterance: "Find emails with contract documents attached",
    userFeedbackVerbatim: "Showing random PDFs and images instead of actual contract files. Results don't match what I'm looking for.",
    feedbackDate: "2024-12-17",
    userFeedbackCount: 14,
    usageType: "Power user",
    organization: "Partnership Corp",
    orgTotalFeedback: 53
  },
  {
    id: "31",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Staleness",
    userUtterance: "Find emails received in the past 2 hours",
    userFeedbackVerbatim: "The search index seems outdated. Not showing the latest emails that arrived in my inbox.",
    feedbackDate: "2024-12-16",
    userFeedbackCount: 4,
    usageType: "New User",
    organization: "Tech Startup",
    orgTotalFeedback: 8
  },
  {
    id: "32",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Keyword matching issue",
    userUtterance: "Find emails from project managers about deadlines",
    userFeedbackVerbatim: "Not recognizing project managers by their titles. Missing emails from PMs who don't have 'manager' in their signature.",
    feedbackDate: "2024-12-15",
    userFeedbackCount: 10,
    usageType: "Medium usage",
    organization: "Project Management",
    orgTotalFeedback: 68
  },
  {
    id: "33",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Missing important context",
    userUtterance: "Find emails about the security incident response",
    userFeedbackVerbatim: "Missing critical emails from the incident thread. Context from urgent escalations is not being captured.",
    feedbackDate: "2024-12-14",
    userFeedbackCount: 18,
    usageType: "Power user",
    organization: "Digital Agency",
    orgTotalFeedback: 18
  },
  {
    id: "34",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Incorrect date filter",
    userUtterance: "Find emails with Excel reports from yesterday",
    userFeedbackVerbatim: "Date filtering is wrong. Showing Excel files from last week when I specifically asked for yesterday's reports.",
    feedbackDate: "2024-12-13",
    userFeedbackCount: 8,
    usageType: "Medium usage",
    organization: "Manufacturing Co",
    orgTotalFeedback: 41
  },
  {
    id: "35",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Incorrect sender filter",
    userUtterance: "Find emails from external clients sent this morning",
    userFeedbackVerbatim: "Including internal emails in results. Sender filter is not properly distinguishing between internal and external senders.",
    feedbackDate: "2024-12-12",
    userFeedbackCount: 13,
    usageType: "Power user",
    organization: "Consulting Firm",
    orgTotalFeedback: 72
  },
  {
    id: "36",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Incorrect recipient filter",
    userUtterance: "Find emails sent to my entire team",
    userFeedbackVerbatim: "Not finding emails where my team was included via group aliases or distribution lists. Recipient logic is flawed.",
    feedbackDate: "2024-12-11",
    userFeedbackCount: 7,
    usageType: "Low usage",
    organization: "Remote Team",
    orgTotalFeedback: 15
  },
  {
    id: "37",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Incomplete results",
    userUtterance: "Search for emails about training sessions",
    userFeedbackVerbatim: "Missing training invitations and follow-up materials. Only showing partial conversation threads.",
    feedbackDate: "2024-12-10",
    userFeedbackCount: 5,
    usageType: "New User",
    organization: "StartupXYZ",
    orgTotalFeedback: 12
  },
  {
    id: "38",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Irrelevant results",
    userUtterance: "Find emails with design mockups attached",
    userFeedbackVerbatim: "Showing random image files instead of actual design mockups. File type detection is not accurate enough.",
    feedbackDate: "2024-12-09",
    userFeedbackCount: 12,
    usageType: "Medium usage",
    organization: "Product Team",
    orgTotalFeedback: 37
  },
  {
    id: "39",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Staleness",
    userUtterance: "Find emails from the board meeting yesterday",
    userFeedbackVerbatim: "Search results seem to be from an old snapshot. Not reflecting the actual emails from yesterday's board meeting.",
    feedbackDate: "2024-12-08",
    userFeedbackCount: 9,
    usageType: "Power user",
    organization: "Finance Group",
    orgTotalFeedback: 84
  },
  {
    id: "40",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Keyword matching issue",
    userUtterance: "Find emails from the sales team mentioning Q4 targets",
    userFeedbackVerbatim: "Not catching variations like 'fourth quarter' or 'year-end goals'. Keyword matching is too rigid.",
    feedbackDate: "2024-12-07",
    userFeedbackCount: 16,
    usageType: "Power user",
    organization: "Supply Chain",
    orgTotalFeedback: 46
  },
  {
    id: "41",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Missing important context",
    userUtterance: "Find emails about the merger discussion",
    userFeedbackVerbatim: "Missing confidential emails and private conversations about the merger. Important context is not being captured.",
    feedbackDate: "2024-12-06",
    userFeedbackCount: 22,
    usageType: "Power user",
    organization: "TechCorp Inc",
    orgTotalFeedback: 45
  },
  {
    id: "42",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Incorrect date filter",
    userUtterance: "Find emails with invoices from this quarter",
    userFeedbackVerbatim: "Date range is off. Showing invoices from previous quarters instead of current quarter documents.",
    feedbackDate: "2024-12-05",
    userFeedbackCount: 11,
    usageType: "Medium usage",
    organization: "Innovation Labs",
    orgTotalFeedback: 23
  },
  {
    id: "43",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Incorrect sender filter",
    userUtterance: "Find emails from vendors sent last week",
    userFeedbackVerbatim: "Including emails from internal people. Vendor identification is not working properly in sender filtering.",
    feedbackDate: "2024-12-04",
    userFeedbackCount: 8,
    usageType: "Low usage",
    organization: "Global Dynamics",
    orgTotalFeedback: 67
  },
  {
    id: "44",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Incorrect recipient filter",
    userUtterance: "Find emails where senior leadership was copied",
    userFeedbackVerbatim: "Not detecting CC/BCC properly for senior executives. Missing important escalation emails.",
    feedbackDate: "2024-12-03",
    userFeedbackCount: 19,
    usageType: "Power user",
    organization: "Enterprise Solutions",
    orgTotalFeedback: 89
  },
  {
    id: "45",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Incomplete results",
    userUtterance: "Search for emails about performance reviews",
    userFeedbackVerbatim: "Missing self-assessment emails and manager feedback. Only showing partial review cycle communications.",
    feedbackDate: "2024-12-02",
    userFeedbackCount: 6,
    usageType: "Medium usage",
    organization: "Corporate HR",
    orgTotalFeedback: 21
  },
  {
    id: "46",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Irrelevant results",
    userUtterance: "Find emails with meeting recordings attached",
    userFeedbackVerbatim: "Showing all kinds of media files instead of actual meeting recordings. File content detection is poor.",
    feedbackDate: "2024-12-01",
    userFeedbackCount: 14,
    usageType: "Power user",
    organization: "Marketing Agency",
    orgTotalFeedback: 28
  },
  {
    id: "47",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Staleness",
    userUtterance: "Find emails sent in the last hour",
    userFeedbackVerbatim: "Index is clearly outdated. Missing recent emails that I can see in my inbox but search can't find.",
    feedbackDate: "2024-11-30",
    userFeedbackCount: 3,
    usageType: "New User",
    organization: "Software Company",
    orgTotalFeedback: 29
  },
  {
    id: "48",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Keyword matching issue",
    userUtterance: "Find emails from consultants about recommendations",
    userFeedbackVerbatim: "Not finding emails where consultants use terms like 'suggestions' or 'advice'. Semantic matching is too narrow.",
    feedbackDate: "2024-11-29",
    userFeedbackCount: 17,
    usageType: "Power user",
    organization: "Consulting Group",
    orgTotalFeedback: 56
  },
  {
    id: "49",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Missing important context",
    userUtterance: "Find emails about the software bug reports",
    userFeedbackVerbatim: "Missing bug tracking emails and developer discussions. Important technical context is not being indexed.",
    feedbackDate: "2024-11-28",
    userFeedbackCount: 13,
    usageType: "Medium usage",
    organization: "Tech Startup",
    orgTotalFeedback: 8
  },
  {
    id: "50",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Incorrect date filter",
    userUtterance: "Find emails with legal documents from this month",
    userFeedbackVerbatim: "Date filtering is completely wrong. Showing legal docs from months ago instead of current month files.",
    feedbackDate: "2024-11-27",
    userFeedbackCount: 21,
    usageType: "Power user",
    organization: "Partnership Corp",
    orgTotalFeedback: 53
  },
  {
    id: "51",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Incorrect sender filter",
    userUtterance: "Find emails from competitors sent recently",
    userFeedbackVerbatim: "Sender classification is wrong. Including partners and clients instead of actual competitor communications.",
    feedbackDate: "2024-11-26",
    userFeedbackCount: 7,
    usageType: "Low usage",
    organization: "Digital Agency",
    orgTotalFeedback: 18
  },
  {
    id: "52",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Incorrect recipient filter",
    userUtterance: "Find emails where executives were included",
    userFeedbackVerbatim: "Not properly identifying executive recipients. Missing emails where C-level executives were in the recipient chain.",
    feedbackDate: "2024-11-25",
    userFeedbackCount: 15,
    usageType: "Medium usage",
    organization: "Manufacturing Co",
    orgTotalFeedback: 41
  },
  {
    id: "53",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Incomplete results",
    userUtterance: "Search for emails about holiday schedule planning",
    userFeedbackVerbatim: "Missing team schedule emails and PTO requests. Only showing partial holiday planning conversations.",
    feedbackDate: "2024-11-24",
    userFeedbackCount: 4,
    usageType: "New User",
    organization: "Remote Team",
    orgTotalFeedback: 15
  },
  {
    id: "54",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Irrelevant results",
    userUtterance: "Find emails with project timelines attached",
    userFeedbackVerbatim: "Showing random calendar files instead of actual project timeline documents. Attachment classification is poor.",
    feedbackDate: "2024-11-23",
    userFeedbackCount: 10,
    usageType: "Medium usage",
    organization: "Project Management",
    orgTotalFeedback: 68
  },
  {
    id: "55",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Staleness",
    userUtterance: "Find emails received after 3 PM today",
    userFeedbackVerbatim: "Search data is stale. Not showing emails that arrived after 3 PM even though it's now 5 PM.",
    feedbackDate: "2024-11-22",
    userFeedbackCount: 12,
    usageType: "Power user",
    organization: "Consulting Firm",
    orgTotalFeedback: 72
  },
  {
    id: "56",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Keyword matching issue",
    userUtterance: "Find emails from support team about customer issues",
    userFeedbackVerbatim: "Not finding emails where support uses terms like 'tickets' or 'problems'. Missing important customer communications.",
    feedbackDate: "2024-11-21",
    userFeedbackCount: 18,
    usageType: "Power user",
    organization: "Product Team",
    orgTotalFeedback: 37
  },
  {
    id: "57",
    intentType: "Find Topic",
    feedbackType: "Negative",
    failureType: "Missing important context",
    userUtterance: "Find emails about compliance audit preparation",
    userFeedbackVerbatim: "Missing audit-related emails and compliance documentation discussions. Critical regulatory context is not captured.",
    feedbackDate: "2024-11-20",
    userFeedbackCount: 9,
    usageType: "Medium usage",
    organization: "Finance Group",
    orgTotalFeedback: 84
  },
  {
    id: "58",
    intentType: "Find Attachment",
    feedbackType: "Negative",
    failureType: "Incorrect date filter",
    userUtterance: "Find emails with research papers shared today",
    userFeedbackVerbatim: "Date filter is broken. Showing research papers from weeks ago instead of papers shared today.",
    feedbackDate: "2024-11-19",
    userFeedbackCount: 5,
    usageType: "Low usage",
    organization: "StartupXYZ",
    orgTotalFeedback: 12
  },
  {
    id: "59",
    intentType: "Find Time Range",
    feedbackType: "Negative",
    failureType: "Incorrect sender filter",
    userUtterance: "Find emails from international partners sent overnight",
    userFeedbackVerbatim: "Sender geography detection is wrong. Including domestic partners instead of actual international communications.",
    feedbackDate: "2024-11-18",
    userFeedbackCount: 14,
    usageType: "Power user",
    organization: "Supply Chain",
    orgTotalFeedback: 46
  },
  {
    id: "60",
    intentType: "Find Person",
    feedbackType: "Negative",
    failureType: "Incorrect recipient filter",
    userUtterance: "Find emails where I was the only recipient",
    userFeedbackVerbatim: "Including group emails where I was one of many recipients. Personal vs group email detection is faulty.",
    feedbackDate: "2024-11-17",
    userFeedbackCount: 11,
    usageType: "Medium usage",
    organization: "Finance Corp",
    orgTotalFeedback: 34
  }
];

interface FeedbackRecordsPageProps {
  initialIntentTypeFilter?: string;
  initialFailureTypeFilter?: string;
}

const FeedbackRecordsPage = ({ initialIntentTypeFilter, initialFailureTypeFilter }: FeedbackRecordsPageProps) => {
  const [visibleRecords, setVisibleRecords] = useState(20);
  const [filters, setFilters] = useState({
    intentType: initialIntentTypeFilter || "all",
    failureType: initialFailureTypeFilter || "all",
    usageType: "all",
    organization: "all",
    timeRange: "",
    feedbackType: "all"
  });

  // Combine initial and additional records
  const allFeedbackRecords = [...initialFeedbackRecords, ...additionalFeedbackRecords];

  // Get unique values for filters
  const intentTypes = [...new Set(allFeedbackRecords.map(record => record.intentType))];
  const failureTypes = [...new Set(allFeedbackRecords.filter(record => record.failureType).map(record => record.failureType))];
  const usageTypes = [...new Set(allFeedbackRecords.map(record => record.usageType))];
  const organizations = [...new Set(allFeedbackRecords.map(record => record.organization))];

  // Filter data based on current filters
  const filteredRecords = useMemo(() => {
    return allFeedbackRecords.filter(record => {
      const matchesIntentType = filters.intentType === "all" || record.intentType === filters.intentType;
      const matchesFailureType = filters.failureType === "all" || record.failureType === filters.failureType;
      const matchesUsageType = filters.usageType === "all" || record.usageType === filters.usageType;
      const matchesOrganization = filters.organization === "all" || record.organization === filters.organization;
      const matchesFeedbackType = filters.feedbackType === "all" || record.feedbackType === filters.feedbackType;
      
      let matchesTimeRange = true;
      if (filters.timeRange) {
        const filterDate = new Date(filters.timeRange);
        const recordDate = new Date(record.feedbackDate);
        matchesTimeRange = recordDate >= filterDate;
      }

      return matchesIntentType && matchesFailureType && matchesUsageType && matchesOrganization && matchesFeedbackType && matchesTimeRange;
    });
  }, [filters, allFeedbackRecords]);

  const displayedRecords = filteredRecords.slice(0, visibleRecords);

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setVisibleRecords(20); // Reset to show first 20 when filters change
  };

  const handleShowMore = () => {
    setVisibleRecords(prev => Math.min(prev + 20, filteredRecords.length));
  };

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
      <SharedFilters />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Records</h1>
          <p className="text-gray-600">Complete feedback history with detailed filtering options</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {filteredRecords.length} total records
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </CardTitle>
          <CardDescription>
            Filter feedback records by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label>Intent Type</Label>
              <Select value={filters.intentType} onValueChange={(value) => updateFilter("intentType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Intent Types</SelectItem>
                  {intentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Failure Type</Label>
              <Select value={filters.failureType} onValueChange={(value) => updateFilter("failureType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Failure Types</SelectItem>
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
                  <SelectItem value="all">All Usage Types</SelectItem>
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
                  <SelectItem value="all">All Organizations</SelectItem>
                  {organizations.map(org => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Feedback Type</Label>
              <Select value={filters.feedbackType} onValueChange={(value) => updateFilter("feedbackType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Feedback Types</SelectItem>
                  <SelectItem value="Positive">Positive</SelectItem>
                  <SelectItem value="Negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time Range (From)</Label>
              <Input
                type="date"
                value={filters.timeRange}
                onChange={(e) => updateFilter("timeRange", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {displayedRecords.length} of {filteredRecords.length} feedback records
      </div>

      {/* Feedback Records - One per row */}
      <div className="space-y-4">
        {displayedRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{record.intentType}</span>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    "{record.userUtterance}"
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${getFeedbackTypeColor(record.feedbackType)} flex items-center gap-1`}>
                    {record.feedbackType === "Positive" ? <ThumbsUp className="w-3 h-3" /> : <ThumbsDown className="w-3 h-3" />}
                    {record.feedbackType}
                  </Badge>
                  {record.failureType && (
                    <Badge variant="destructive" className="text-xs">
                      {record.failureType}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className={`p-3 rounded-lg border-l-4 ${record.feedbackType === "Positive" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <p className={`text-sm font-medium ${record.feedbackType === "Positive" ? "text-green-800" : "text-red-800"}`}>
                  User Feedback:
                </p>
                <p className={`text-sm mt-1 ${record.feedbackType === "Positive" ? "text-green-700" : "text-red-700"}`}>
                  "{record.userFeedbackVerbatim}"
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Feedback Date</p>
                    <p className="text-sm font-medium">{new Date(record.feedbackDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">User Feedback Count</p>
                    <p className="text-sm font-medium">{record.userFeedbackCount}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Usage Type</p>
                  <Badge className={getUsageTypeColor(record.usageType)}>
                    {record.usageType}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Organization</p>
                    <p className="text-sm font-medium">{record.organization}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">
                  Total feedback from <span className="font-semibold">{record.organization}</span>: 
                  <span className="font-semibold text-gray-800"> {record.orgTotalFeedback}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More Button */}
      {visibleRecords < filteredRecords.length && (
        <div className="flex justify-center">
          <Button onClick={handleShowMore} variant="outline" size="lg">
            Show More ({Math.min(20, filteredRecords.length - visibleRecords)} more records)
          </Button>
        </div>
      )}

      {filteredRecords.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No feedback records match the current filters.</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackRecordsPage;
