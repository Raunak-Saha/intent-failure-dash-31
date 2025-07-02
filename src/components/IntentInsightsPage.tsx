import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from 'lucide-react';
import DataTable from './DataTable';
import InsightCards from './InsightCards';
import SharedFilters from './SharedFilters';

// Enhanced intent data with all requested intent types and full column set
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
  },
  {
    "Intent Type": "Find emails with files",
    "Number of Utterances": "45",
    "Unique Customers": "12",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "58",
    "SAT %": "86.7%",
    "Number of SATs": "39",
    "Average Citations": "1.32",
    "DSAT Count": "4",
    "Turn 0": "1",
    "Avg Turn %": "72.2%",
    "CiQ %": "65.5%",
    "Completeness Intent %": "79.1%"
  },
  {
    "Intent Type": "Find emails from Person",
    "Number of Utterances": "72",
    "Unique Customers": "18",
    "Unique Tenants": "6",
    "Weekly Visits (75th Percentile)": "94",
    "SAT %": "89.5%",
    "Number of SATs": "64",
    "Average Citations": "1.18",
    "DSAT Count": "7",
    "Turn 0": "1",
    "Avg Turn %": "81.9%",
    "CiQ %": "58.3%",
    "Completeness Intent %": "74.2%"
  },
  {
    "Intent Type": "Find emails based on multiple people",
    "Number of Utterances": "38",
    "Unique Customers": "11",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "47",
    "SAT %": "82.1%",
    "Number of SATs": "31",
    "Average Citations": "1.95",
    "DSAT Count": "5",
    "Turn 0": "0",
    "Avg Turn %": "69.7%",
    "CiQ %": "71.0%",
    "Completeness Intent %": "68.4%"
  },
  {
    "Intent Type": "Find emails with URLs",
    "Number of Utterances": "29",
    "Unique Customers": "9",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "36",
    "SAT %": "78.6%",
    "Number of SATs": "23",
    "Average Citations": "2.14",
    "DSAT Count": "4",
    "Turn 0": "0",
    "Avg Turn %": "65.5%",
    "CiQ %": "62.1%",
    "Completeness Intent %": "83.7%"
  },
  {
    "Intent Type": "Find emails from a company",
    "Number of Utterances": "33",
    "Unique Customers": "10",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "42",
    "SAT %": "85.4%",
    "Number of SATs": "28",
    "Average Citations": "1.67",
    "DSAT Count": "3",
    "Turn 0": "1",
    "Avg Turn %": "73.0%",
    "CiQ %": "56.7%",
    "Completeness Intent %": "76.8%"
  },
  {
    "Intent Type": "Find emails about a Project",
    "Number of Utterances": "41",
    "Unique Customers": "13",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "52",
    "SAT %": "87.8%",
    "Number of SATs": "36",
    "Average Citations": "1.41",
    "DSAT Count": "3",
    "Turn 0": "1",
    "Avg Turn %": "77.6%",
    "CiQ %": "69.5%",
    "Completeness Intent %": "81.0%"
  },
  {
    "Intent Type": "Find emails about a Topic",
    "Number of Utterances": "58",
    "Unique Customers": "16",
    "Unique Tenants": "5",
    "Weekly Visits (75th Percentile)": "73",
    "SAT %": "90.3%",
    "Number of SATs": "52",
    "Average Citations": "0.89",
    "DSAT Count": "4",
    "Turn 0": "1",
    "Avg Turn %": "79.3%",
    "CiQ %": "74.1%",
    "Completeness Intent %": "78.6%"
  },
  {
    "Intent Type": "Find email with Subject",
    "Number of Utterances": "35",
    "Unique Customers": "11",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "44",
    "SAT %": "93.2%",
    "Number of SATs": "33",
    "Average Citations": "0.94",
    "DSAT Count": "2",
    "Turn 0": "1",
    "Avg Turn %": "85.7%",
    "CiQ %": "51.4%",
    "Completeness Intent %": "88.6%"
  },
  {
    "Intent Type": "Find emails based on relationships",
    "Number of Utterances": "27",
    "Unique Customers": "8",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "34",
    "SAT %": "81.5%",
    "Number of SATs": "22",
    "Average Citations": "1.74",
    "DSAT Count": "4",
    "Turn 0": "0",
    "Avg Turn %": "67.4%",
    "CiQ %": "66.7%",
    "Completeness Intent %": "70.4%"
  },
  {
    "Intent Type": "Find emails based on Roles",
    "Number of Utterances": "31",
    "Unique Customers": "9",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "39",
    "SAT %": "84.2%",
    "Number of SATs": "26",
    "Average Citations": "1.52",
    "DSAT Count": "3",
    "Turn 0": "0",
    "Avg Turn %": "71.0%",
    "CiQ %": "63.2%",
    "Completeness Intent %": "75.8%"
  },
  {
    "Intent Type": "Find unread emails",
    "Number of Utterances": "48",
    "Unique Customers": "14",
    "Unique Tenants": "5",
    "Weekly Visits (75th Percentile)": "61",
    "SAT %": "79.2%",
    "Number of SATs": "38",
    "Average Citations": "0.63",
    "DSAT Count": "6",
    "Turn 0": "1",
    "Avg Turn %": "66.7%",
    "CiQ %": "45.8%",
    "Completeness Intent %": "92.1%"
  },
  {
    "Intent Type": "Find emails by date range",
    "Number of Utterances": "56",
    "Unique Customers": "15",
    "Unique Tenants": "5",
    "Weekly Visits (75th Percentile)": "71",
    "SAT %": "88.4%",
    "Number of SATs": "49",
    "Average Citations": "2.31",
    "DSAT Count": "5",
    "Turn 0": "1",
    "Avg Turn %": "82.1%",
    "CiQ %": "70.9%",
    "Completeness Intent %": "76.8%"
  },
  {
    "Intent Type": "Find emails by date",
    "Number of Utterances": "43",
    "Unique Customers": "12",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "54",
    "SAT %": "86.0%",
    "Number of SATs": "37",
    "Average Citations": "1.86",
    "DSAT Count": "4",
    "Turn 0": "1",
    "Avg Turn %": "79.1%",
    "CiQ %": "68.6%",
    "Completeness Intent %": "81.4%"
  },
  {
    "Intent Type": "Find last email",
    "Number of Utterances": "39",
    "Unique Customers": "11",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "49",
    "SAT %": "91.8%",
    "Number of SATs": "36",
    "Average Citations": "0.51",
    "DSAT Count": "2",
    "Turn 0": "1",
    "Avg Turn %": "89.7%",
    "CiQ %": "41.0%",
    "Completeness Intent %": "94.9%"
  },
  {
    "Intent Type": "Find recent emails",
    "Number of Utterances": "62",
    "Unique Customers": "17",
    "Unique Tenants": "6",
    "Weekly Visits (75th Percentile)": "78",
    "SAT %": "83.9%",
    "Number of SATs": "52",
    "Average Citations": "0.74",
    "DSAT Count": "7",
    "Turn 0": "1",
    "Avg Turn %": "74.2%",
    "CiQ %": "48.4%",
    "Completeness Intent %": "87.1%"
  },
  {
    "Intent Type": "Find emails with Task",
    "Number of Utterances": "25",
    "Unique Customers": "7",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "31",
    "SAT %": "80.0%",
    "Number of SATs": "20",
    "Average Citations": "1.96",
    "DSAT Count": "3",
    "Turn 0": "0",
    "Avg Turn %": "64.0%",
    "CiQ %": "72.0%",
    "Completeness Intent %": "68.0%"
  },
  {
    "Intent Type": "Find emails pending Action Item",
    "Number of Utterances": "22",
    "Unique Customers": "6",
    "Unique Tenants": "2",
    "Weekly Visits (75th Percentile)": "28",
    "SAT %": "77.3%",
    "Number of SATs": "17",
    "Average Citations": "2.18",
    "DSAT Count": "4",
    "Turn 0": "0",
    "Avg Turn %": "59.1%",
    "CiQ %": "77.3%",
    "Completeness Intent %": "63.6%"
  },
  {
    "Intent Type": "Find emails with Unanswered question",
    "Number of Utterances": "18",
    "Unique Customers": "5",
    "Unique Tenants": "2",
    "Weekly Visits (75th Percentile)": "23",
    "SAT %": "83.3%",
    "Number of SATs": "15",
    "Average Citations": "1.67",
    "DSAT Count": "2",
    "Turn 0": "0",
    "Avg Turn %": "66.7%",
    "CiQ %": "61.1%",
    "Completeness Intent %": "77.8%"
  },
  {
    "Intent Type": "Find emails pending reply",
    "Number of Utterances": "34",
    "Unique Customers": "10",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "43",
    "SAT %": "85.3%",
    "Number of SATs": "29",
    "Average Citations": "1.24",
    "DSAT Count": "3",
    "Turn 0": "1",
    "Avg Turn %": "70.6%",
    "CiQ %": "55.9%",
    "Completeness Intent %": "82.4%"
  },
  {
    "Intent Type": "Find emails with follow up",
    "Number of Utterances": "28",
    "Unique Customers": "8",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "35",
    "SAT %": "82.1%",
    "Number of SATs": "23",
    "Average Citations": "1.89",
    "DSAT Count": "3",
    "Turn 0": "0",
    "Avg Turn %": "67.9%",
    "CiQ %": "71.4%",
    "Completeness Intent %": "75.0%"
  },
  {
    "Intent Type": "Find Important emails",
    "Number of Utterances": "37",
    "Unique Customers": "11",
    "Unique Tenants": "4",
    "Weekly Visits (75th Percentile)": "46",
    "SAT %": "89.2%",
    "Number of SATs": "33",
    "Average Citations": "0.81",
    "DSAT Count": "3",
    "Turn 0": "1",
    "Avg Turn %": "78.4%",
    "CiQ %": "48.6%",
    "Completeness Intent %": "91.9%"
  },
  {
    "Intent Type": "Find emails from folder",
    "Number of Utterances": "26",
    "Unique Customers": "7",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "33",
    "SAT %": "88.5%",
    "Number of SATs": "23",
    "Average Citations": "1.12",
    "DSAT Count": "2",
    "Turn 0": "1",
    "Avg Turn %": "80.8%",
    "CiQ %": "53.8%",
    "Completeness Intent %": "84.6%"
  },
  {
    "Intent Type": "Find emails from Archive",
    "Number of Utterances": "21",
    "Unique Customers": "6",
    "Unique Tenants": "2",
    "Weekly Visits (75th Percentile)": "27",
    "SAT %": "85.7%",
    "Number of SATs": "18",
    "Average Citations": "1.38",
    "DSAT Count": "2",
    "Turn 0": "1",
    "Avg Turn %": "76.2%",
    "CiQ %": "57.1%",
    "Completeness Intent %": "81.0%"
  },
  {
    "Intent Type": "Find emails with Attachment",
    "Number of Utterances": "51",
    "Unique Customers": "14",
    "Unique Tenants": "5",
    "Weekly Visits (75th Percentile)": "64",
    "SAT %": "84.3%",
    "Number of SATs": "43",
    "Average Citations": "1.57",
    "DSAT Count": "5",
    "Turn 0": "0",
    "Avg Turn %": "70.6%",
    "CiQ %": "62.7%",
    "Completeness Intent %": "78.4%"
  },
  {
    "Intent Type": "Find emails with Attachment Type",
    "Number of Utterances": "24",
    "Unique Customers": "7",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "30",
    "SAT %": "87.5%",
    "Number of SATs": "21",
    "Average Citations": "1.75",
    "DSAT Count": "2",
    "Turn 0": "0",
    "Avg Turn %": "75.0%",
    "CiQ %": "66.7%",
    "Completeness Intent %": "83.3%"
  },
  {
    "Intent Type": "Find external emails",
    "Number of Utterances": "32",
    "Unique Customers": "9",
    "Unique Tenants": "3",
    "Weekly Visits (75th Percentile)": "40",
    "SAT %": "81.3%",
    "Number of SATs": "26",
    "Average Citations": "1.44",
    "DSAT Count": "4",
    "Turn 0": "0",
    "Avg Turn %": "68.8%",
    "CiQ %": "59.4%",
    "Completeness Intent %": "75.0%"
  },
  {
    "Intent Type": "Find emails from Delegate",
    "Number of Utterances": "17",
    "Unique Customers": "5",
    "Unique Tenants": "2",
    "Weekly Visits (75th Percentile)": "22",
    "SAT %": "88.2%",
    "Number of SATs": "15",
    "Average Citations": "1.29",
    "DSAT Count": "1",
    "Turn 0": "1",
    "Avg Turn %": "82.4%",
    "CiQ %": "52.9%",
    "Completeness Intent %": "82.4%"
  }
];

// Enhanced failure types for each intent type with comprehensive data
const intentFailureTypes = {
  "Find Topic": [
    {
      "Intent Type": "Incomplete results",
      "Number of Utterances": "8",
      "Unique Customers": "3",
      "Unique Tenants": "2",
      "Weekly Visits (75th Percentile)": "12",
      "SAT %": "62.5%",
      "Number of SATs": "5",
      "Average Citations": "0.38",
      "DSAT Count": "2",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "75.0%",
      "Completeness Intent %": "62.5%"
    },
    {
      "Intent Type": "Keyword Matching Issue",
      "Number of Utterances": "6",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "9",
      "SAT %": "66.7%",
      "Number of SATs": "4",
      "Average Citations": "0.50",
      "DSAT Count": "2",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Missing important context",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "33.3%",
      "Number of SATs": "1",
      "Average Citations": "0.33",
      "DSAT Count": "2",
      "Turn 0": "0",
      "Avg Turn %": "33.3%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "33.3%"
    }
  ],
  "Find Attachment": [
    {
      "Intent Type": "Incomplete results",
      "Number of Utterances": "6",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "9",
      "SAT %": "66.7%",
      "Number of SATs": "4",
      "Average Citations": "1.17",
      "DSAT Count": "2",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "4",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "6",
      "SAT %": "50.0%",
      "Number of SATs": "2",
      "Average Citations": "1.25",
      "DSAT Count": "2",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "75.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find Time Range": [
    {
      "Intent Type": "Inaccurate Count of results",
      "Number of Utterances": "5",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "7",
      "SAT %": "60.0%",
      "Number of SATs": "3",
      "Average Citations": "2.40",
      "DSAT Count": "2",
      "Turn 0": "0",
      "Avg Turn %": "60.0%",
      "CiQ %": "80.0%",
      "Completeness Intent %": "60.0%"
    },
    {
      "Intent Type": "Keyword Matching Issue",
      "Number of Utterances": "4",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "5",
      "SAT %": "75.0%",
      "Number of SATs": "3",
      "Average Citations": "3.25",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "75.0%",
      "CiQ %": "75.0%",
      "Completeness Intent %": "75.0%"
    }
  ],
  "Find Person": [
    {
      "Intent Type": "Person Scoping Issue",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Incomplete results",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "0.67",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "66.7%",
      "CiQ %": "33.3%",
      "Completeness Intent %": "66.7%"
    }
  ],
  "Find Status": [
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "3",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "2.33",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Missing explainability",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails with files": [
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "5",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "7",
      "SAT %": "60.0%",
      "Number of SATs": "3",
      "Average Citations": "1.00",
      "DSAT Count": "2",
      "Turn 0": "0",
      "Avg Turn %": "40.0%",
      "CiQ %": "60.0%",
      "Completeness Intent %": "60.0%"
    },
    {
      "Intent Type": "Missing important emails",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "1.33",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    }
  ],
  "Find emails from Person": [
    {
      "Intent Type": "Person Scoping Issue",
      "Number of Utterances": "4",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "6",
      "SAT %": "75.0%",
      "Number of SATs": "3",
      "Average Citations": "1.25",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "75.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "75.0%"
    },
    {
      "Intent Type": "Incomplete results",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    }
  ],
  "Find emails based on multiple people": [
    {
      "Intent Type": "Person Scoping Issue",
      "Number of Utterances": "3",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Missing important emails",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails with URLs": [
    {
      "Intent Type": "Incomplete results",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "2.33",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "External Emails",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails from a company": [
    {
      "Intent Type": "Duplicate",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    },
    {
      "Intent Type": "Irrelevant emails",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails about a Project": [
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    },
    {
      "Intent Type": "Missing important context",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails about a Topic": [
    {
      "Intent Type": "Keyword Matching Issue",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "0.67",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Missing important context",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find email with Subject": [
    {
      "Intent Type": "Email Scoping Issue",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "0.50",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails based on relationships": [
    {
      "Intent Type": "Irrelevant emails",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "1.67",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Person Scoping Issue",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails based on Roles": [
    {
      "Intent Type": "Inaccurate Count of results",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    },
    {
      "Intent Type": "Person Scoping Issue",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find unread emails": [
    {
      "Intent Type": "Missing explainability",
      "Number of Utterances": "4",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "6",
      "SAT %": "75.0%",
      "Number of SATs": "3",
      "Average Citations": "0.50",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "75.0%",
      "CiQ %": "25.0%",
      "Completeness Intent %": "75.0%"
    },
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "0.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails by date range": [
    {
      "Intent Type": "Apology",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "2.33",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Inaccurate Count of results",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "2.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails by date": [
    {
      "Intent Type": "Duplicate",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "1.67",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find last email": [
    {
      "Intent Type": "Memorization",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "0.50",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find recent emails": [
    {
      "Intent Type": "External Emails",
      "Number of Utterances": "5",
      "Unique Customers": "2",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "7",
      "SAT %": "60.0%",
      "Number of SATs": "3",
      "Average Citations": "0.60",
      "DSAT Count": "2",
      "Turn 0": "1",
      "Avg Turn %": "60.0%",
      "CiQ %": "40.0%",
      "Completeness Intent %": "60.0%"
    },
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails with Task": [
    {
      "Intent Type": "Task Scoping Issue",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    },
    {
      "Intent Type": "Missing important context",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails pending Action Item": [
    {
      "Intent Type": "Task Scoping Issue",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "2.33",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Missing explainability",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails with Unanswered question": [
    {
      "Intent Type": "Folder Scoping Issue",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    },
    {
      "Intent Type": "Missing important context",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "0.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails pending reply": [
    {
      "Intent Type": "Email Scoping Issue",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    },
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails with follow up": [
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    },
    {
      "Intent Type": "Task Scoping Issue",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "100.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find Important emails": [
    {
      "Intent Type": "Missing explainability",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    },
    {
      "Intent Type": "Irrelevant emails",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "0.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "0.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails from folder": [
    {
      "Intent Type": "Folder Scoping Issue",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails from Archive": [
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails with Attachment": [
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "1.67",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Incomplete results",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find emails with Attachment Type": [
    {
      "Intent Type": "Irrelevant emails",
      "Number of Utterances": "2",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "3",
      "SAT %": "50.0%",
      "Number of SATs": "1",
      "Average Citations": "1.50",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "50.0%",
      "CiQ %": "50.0%",
      "Completeness Intent %": "50.0%"
    }
  ],
  "Find external emails": [
    {
      "Intent Type": "External Emails",
      "Number of Utterances": "3",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "4",
      "SAT %": "66.7%",
      "Number of SATs": "2",
      "Average Citations": "1.33",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "66.7%",
      "CiQ %": "66.7%",
      "Completeness Intent %": "66.7%"
    },
    {
      "Intent Type": "Staleness",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "2.00",
      "DSAT Count": "1",
      "Turn 0": "0",
      "Avg Turn %": "0.0%",
      "CiQ %": "0.0%",
      "Completeness Intent %": "0.0%"
    }
  ],
  "Find emails from Delegate": [
    {
      "Intent Type": "Person Scoping Issue",
      "Number of Utterances": "1",
      "Unique Customers": "1",
      "Unique Tenants": "1",
      "Weekly Visits (75th Percentile)": "1",
      "SAT %": "0.0%",
      "Number of SATs": "0",
      "Average Citations": "1.00",
      "DSAT Count": "1",
      "Turn 0": "1",
      "Avg Turn %": "0.0%",
      "CiQ %": "0.0%",
      "Completeness Intent %": "0.0%"
    }
  ]
};

const intentInsights = [
  {
    id: "top_intents",
    label: "Top 5 Intent Types",
    value: "Find Topic (97), Find emails about a Topic (58), Find recent emails (62), Find emails by date range (56), Find Person (54)",
    style: "highlight" as const
  },
  {
    id: "emerging_intent",
    label: "New Emerging Intent",
    value: "Find emails from Delegate (17 utterances)",
    style: "accent" as const
  },
  {
    id: "intent_growth",
    label: "High SAT % (Top 5)",
    value: "Find Person (94%), Find email with Subject (93.2%), Find last email (91.8%), Find Topic (91.1%), Find emails about a Topic (90.3%)",
    style: "positive" as const
  },
  {
    id: "intent_decline",
    label: "Low SAT % (Bottom 3)",
    value: "Find emails pending Action Item (77.3%), Find emails with URLs (78.6%), Find unread emails (79.2%)",
    style: "negative" as const
  },
  {
    id: "sat_up",
    label: "High CiQ % (Top 5)",
    value: "Find Topic (82.4%), Find Status (80.7%), Find emails pending Action Item (77.3%), Find emails about a Topic (74.1%), Find Time Range (73.1%)",
    style: "positive" as const
  },
  {
    id: "sat_down",
    label: "Low CiQ % (Bottom 3)",
    value: "Find last email (41.0%), Find unread emails (45.8%), Find recent emails (48.4%)",
    style: "negative" as const
  },
  {
    id: "sugg_share",
    label: "Suggested-Query Share",
    value: "24%",
    style: "neutral" as const
  }
];

interface IntentInsightsPageProps {
  onNavigateToTab?: (tab: string, intentType?: string, failureType?: string) => void;
}

const IntentInsightsPage = ({ onNavigateToTab }: IntentInsightsPageProps) => {
  const [selectedIntentType, setSelectedIntentType] = useState<string>("all");
  const [selectedFailureType, setSelectedFailureType] = useState<string>("all");
  const [expandedIntents, setExpandedIntents] = useState<Set<string>>(new Set());

  // Get unique intent types for filter
  const intentTypes = [...new Set(intentData.map(item => item["Intent Type"]))];

  // Get unique failure types from all intent failure types
  const allFailureTypes = useMemo(() => {
    const failureTypeSet = new Set<string>();
    Object.values(intentFailureTypes).forEach(failures => {
      failures.forEach(failure => {
        failureTypeSet.add(failure["Intent Type"]);
      });
    });
    return Array.from(failureTypeSet);
  }, []);

  // Filter data based on selected intent type and failure type
  const filteredIntentData = useMemo(() => {
    let filtered = intentData;
    
    // Filter by intent type
    if (selectedIntentType !== "all") {
      filtered = filtered.filter(item => item["Intent Type"] === selectedIntentType);
    }
    
    // Filter by failure type - show only intent types that have the selected failure type
    if (selectedFailureType !== "all") {
      filtered = filtered.filter(item => {
        const intentType = item["Intent Type"];
        const failures = intentFailureTypes[intentType] || [];
        return failures.some(failure => failure["Intent Type"] === selectedFailureType);
      });
    }
    
    return filtered;
  }, [selectedIntentType, selectedFailureType]);

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

  const handleFailureTypeClick = (intentType: string, failureType: string) => {
    // Navigate to feedback records with filters applied if onNavigateToTab is provided
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

  const renderIntentTable = () => {
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
            {filteredIntentData.map((intent, intentIndex) => {
              const intentType = intent["Intent Type"];
              const isExpanded = expandedIntents.has(intentType);
              const failureTypes = intentFailureTypes[intentType] || [];
              
              // Filter failure types if a specific failure type is selected
              const filteredFailureTypes = selectedFailureType === "all" 
                ? failureTypes 
                : failureTypes.filter(failure => failure["Intent Type"] === selectedFailureType);
              
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
                            {filteredFailureTypes.length > 0 && (
                              isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                            )}
                            <span className="text-blue-600 hover:underline">{intent[column]}</span>
                          </div>
                        ) : (
                          formatCellValue(intent[column])
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {/* Expanded failure types */}
                  {isExpanded && filteredFailureTypes.map((failure, failureIndex) => (
                    <TableRow 
                      key={`${intentIndex}-${failureIndex}`} 
                      className="bg-gray-25 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleFailureTypeClick(intentType, failure["Intent Type"])}
                    >
                      {columns.map((column) => (
                        <TableCell 
                          key={column}
                          className={`${
                            typeof failure[column] === 'number' ? 'text-right font-mono' : ''
                          } pl-8`}
                        >
                          {column === 'Intent Type' ? (
                            <span className="text-blue-600 hover:underline text-sm italic">↳ {failure["Intent Type"]}</span>
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
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              All Intent Types
              <Badge variant="outline">{filteredIntentData.length} intents</Badge>
            </CardTitle>
            <CardDescription>
              Intent types with expandable failure patterns. Click on Intent Type to expand/collapse failure details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="intent-filter" className="text-sm font-medium">
                  Filter by Intent Type:
                </Label>
                <Select value={selectedIntentType} onValueChange={setSelectedIntentType}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select intent type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Intent Types ({intentData.length})</SelectItem>
                    {intentTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="failure-filter" className="text-sm font-medium">
                  Filter by Failure Type:
                </Label>
                <Select value={selectedFailureType} onValueChange={setSelectedFailureType}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select failure type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Failure Types ({allFailureTypes.length})</SelectItem>
                    {allFailureTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                Showing {filteredIntentData.length} intent types with expandable failure details
                • Click on Intent Type to expand/collapse failure patterns
                • Click on failure types (indented rows) to navigate to Feedback Records
              </div>
              {renderIntentTable()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intent Performance Insights</CardTitle>
            <CardDescription>
              Trends, satisfaction rates, and query share across all intent types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InsightCards insights={intentInsights} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntentInsightsPage;
