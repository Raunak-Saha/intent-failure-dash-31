
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle, Star } from 'lucide-react';

interface Insight {
  id: string;
  label: string;
  value: string;
  style: 'highlight' | 'accent' | 'positive' | 'negative' | 'neutral';
}

interface InsightCardsProps {
  insights: Insight[];
}

const InsightCards = ({ insights }: InsightCardsProps) => {
  const getStyleConfig = (style: Insight['style']) => {
    switch (style) {
      case 'highlight':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-900',
          icon: <Star className="w-4 h-4 text-blue-600" />,
          badgeVariant: 'default' as const
        };
      case 'accent':
        return {
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-900',
          icon: <AlertCircle className="w-4 h-4 text-purple-600" />,
          badgeVariant: 'secondary' as const
        };
      case 'positive':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-900',
          icon: <TrendingUp className="w-4 h-4 text-green-600" />,
          badgeVariant: 'default' as const
        };
      case 'negative':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-900',
          icon: <TrendingDown className="w-4 h-4 text-red-600" />,
          badgeVariant: 'destructive' as const
        };
      case 'neutral':
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          icon: null,
          badgeVariant: 'outline' as const
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-900',
          icon: null,
          badgeVariant: 'outline' as const
        };
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {insights.map((insight) => {
        const styleConfig = getStyleConfig(insight.style);
        
        return (
          <Card 
            key={insight.id}
            className={`${styleConfig.bgColor} ${styleConfig.borderColor} border-2 transition-all duration-200 hover:shadow-md`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between space-x-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {styleConfig.icon}
                    <h4 className={`font-semibold ${styleConfig.textColor} text-sm`}>
                      {insight.label}
                    </h4>
                  </div>
                  <p className={`${styleConfig.textColor} text-sm font-medium leading-relaxed`}>
                    {insight.value}
                  </p>
                </div>
                <Badge variant={styleConfig.badgeVariant} className="text-xs">
                  {insight.style}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default InsightCards;
