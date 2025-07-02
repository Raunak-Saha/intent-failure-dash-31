
import React, { useState } from 'react';
import HighlightsPage from './components/HighlightsPage';
import IntentInsightsPage from './components/IntentInsightsPage';
import FailureInsightsPage from './components/FailureInsightsPage';
import RetentionInsightsPage from './components/RetentionInsightsPage';
import FeedbackRecordsPage from './components/FeedbackRecordsPage';

// Add new props interface and modify the navigation handler
interface NavigationProps {
  onNavigateToTab: (tab: string, intentType?: string, failureType?: string) => void;
}

// Update the App component to handle the new navigation parameters
const App = () => {
  const [activeTab, setActiveTab] = useState('highlights');
  const [feedbackFilters, setFeedbackFilters] = useState({
    intentType: undefined as string | undefined,
    failureType: undefined as string | undefined,
  });

  const handleNavigateToTab = (tab: string, intentType?: string, failureType?: string) => {
    setActiveTab(tab);
    if (tab === 'feedback-records') {
      setFeedbackFilters({
        intentType,
        failureType,
      });
    } else {
      setFeedbackFilters({
        intentType: undefined,
        failureType: undefined,
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'highlights':
        return <HighlightsPage onNavigateToTab={handleNavigateToTab} />;
      case 'intents':
        return <IntentInsightsPage onNavigateToTab={handleNavigateToTab} />;
      case 'failures':
        return <FailureInsightsPage />;
      case 'retention':
        return <RetentionInsightsPage />;
      case 'feedback-records':
        return (
          <FeedbackRecordsPage 
            initialIntentTypeFilter={feedbackFilters.intentType}
            initialFailureTypeFilter={feedbackFilters.failureType}
          />
        );
      default:
        return <HighlightsPage onNavigateToTab={handleNavigateToTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Assistant Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive insights into user interactions, intents, and feedback patterns
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'highlights', label: 'Highlights', icon: '✨' },
            { id: 'intents', label: 'Intent Insights', icon: '🎯' },
            { id: 'failures', label: 'Failure Analysis', icon: '⚠️' },
            { id: 'retention', label: 'Retention', icon: '📊' },
            { id: 'feedback-records', label: 'Feedback Records', icon: '💬' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
