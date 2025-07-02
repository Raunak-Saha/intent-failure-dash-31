
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HighlightsPage from '@/components/HighlightsPage';
import IntentInsightsPage from '@/components/IntentInsightsPage';
import FailureInsightsPage from '@/components/FailureInsightsPage';
import RetentionInsightsPage from '@/components/RetentionInsightsPage';
import FeedbackRecordsPage from '@/components/FeedbackRecordsPage';
import { BarChart3, Mail, TrendingDown, Users, Star, MessageSquare } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState("highlights");

  const handleNavigateToTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Email Intelligence Demo</h1>
                <p className="text-sm text-gray-600">Inline Data Analytics Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="highlights" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Highlights</span>
            </TabsTrigger>
            <TabsTrigger value="intents" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Intent Insights</span>
            </TabsTrigger>
            <TabsTrigger value="failures" className="flex items-center space-x-2">
              <TrendingDown className="w-4 h-4" />
              <span>Failure Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="retention" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Retention & Cohorts</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Feedback Records</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="highlights" className="space-y-6">
            <HighlightsPage onNavigateToTab={handleNavigateToTab} />
          </TabsContent>

          <TabsContent value="intents" className="space-y-6">
            <IntentInsightsPage />
          </TabsContent>

          <TabsContent value="failures" className="space-y-6">
            <FailureInsightsPage />
          </TabsContent>

          <TabsContent value="retention" className="space-y-6">
            <RetentionInsightsPage />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <FeedbackRecordsPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
