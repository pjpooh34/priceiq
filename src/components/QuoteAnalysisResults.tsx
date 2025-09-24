import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

interface QuoteAnalysisData {
  contractorName?: string;
  quotedPrice: number;
  breakdown: Array<{ item: string; price: number; isOverpriced?: boolean }>;
  overallAssessment: "Fair" | "Overpriced" | "Underpriced" | "Suspicious";
  potentialSavings?: number;
  redFlags?: string[];
}

interface ResultsData {
  service: string;
  location: string;
  priceRange: {
    low: number;
    high: number;
  };
  factors: string[];
  confidence: "High" | "Medium" | "Low";
  negotiationScript: {
    friendly: string;
    professional: string;
    firm: string;
  };
  tips: string[];
  quoteAnalysis?: QuoteAnalysisData;
}

interface QuoteAnalysisResultsProps {
  results: ResultsData;
  onNewAnalysis: () => void;
}

export function QuoteAnalysisResults({ results, onNewAnalysis }: QuoteAnalysisResultsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const getAssessmentIcon = (assessment: string) => {
    switch (assessment) {
      case "Fair":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "Overpriced":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "Suspicious":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "Underpriced":
        return <Info className="h-5 w-5 text-info" />;
      default:
        return null;
    }
  };

  const getAssessmentColor = (assessment: string) => {
    switch (assessment) {
      case "Fair":
        return "default";
      case "Overpriced":
        return "secondary";
      case "Suspicious":
        return "destructive";
      case "Underpriced":
        return "outline";
      default:
        return "outline";
    }
  };

  if (!results.quoteAnalysis) {
    return null;
  }

  const { quoteAnalysis } = results;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Quote Analysis Results</h2>
        <p className="text-muted-foreground">
          {quoteAnalysis.contractorName && `${quoteAnalysis.contractorName} • `}
          {results.service} in {results.location}
        </p>
      </div>

      {/* Quote Assessment Card */}
      <Card className="bg-gradient-to-r from-card to-accent/10 border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getAssessmentIcon(quoteAnalysis.overallAssessment)}
              <span>Quote Assessment</span>
            </div>
            <Badge variant={getAssessmentColor(quoteAnalysis.overallAssessment)}>
              {quoteAnalysis.overallAssessment}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl mb-1">{formatPrice(quoteAnalysis.quotedPrice)}</div>
              <p className="text-sm text-muted-foreground">Quoted Price</p>
            </div>
            <div>
              <div className="text-2xl mb-1">
                {formatPrice(results.priceRange.low)} - {formatPrice(results.priceRange.high)}
              </div>
              <p className="text-sm text-muted-foreground">Fair Market Range</p>
            </div>
            <div>
              <div className="text-2xl mb-1" style={{ color: 'var(--success)' }}>
                {quoteAnalysis.potentialSavings ? formatPrice(quoteAnalysis.potentialSavings) : "$0"}
              </div>
              <p className="text-sm text-muted-foreground">Potential Savings</p>
            </div>
          </div>

          <Separator />

          {/* Quote Breakdown */}
          <div>
            <h4 className="mb-3">Quote Breakdown:</h4>
            <div className="space-y-2">
              {quoteAnalysis.breakdown.map((item, index) => (
                <div key={index} className={`flex justify-between items-center p-3 rounded-lg transition-colors ${item.isOverpriced ? 'bg-warning/10 border border-warning/20' : 'bg-muted/30'}`}>
                  <span className={item.isOverpriced ? "text-warning" : ""}>{item.item}</span>
                  <div className="flex items-center space-x-2">
                    <span className={item.isOverpriced ? "text-warning font-medium" : ""}>{formatPrice(item.price)}</span>
                    {item.isOverpriced && (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags */}
          {quoteAnalysis.redFlags && quoteAnalysis.redFlags.length > 0 && (
            <>
              <Separator />
              <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
                <h4 className="mb-3 text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Red Flags
                </h4>
                <ul className="space-y-2">
                  {quoteAnalysis.redFlags.map((flag, index) => (
                    <li key={index} className="text-sm text-destructive flex items-start space-x-2">
                      <span className="mt-1 text-destructive">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Negotiation Scripts */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Negotiation Scripts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your specific quote analysis - choose the tone that matches your style
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="professional" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friendly">Friendly</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="firm">Firm</TabsTrigger>
            </TabsList>
            
            <TabsContent value="friendly" className="space-y-3">
              <div className="bg-muted p-4 rounded-lg">
                <p className="whitespace-pre-line">{results.negotiationScript.friendly}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(results.negotiationScript.friendly)}
                className="w-full"
              >
                Copy Script
              </Button>
            </TabsContent>
            
            <TabsContent value="professional" className="space-y-3">
              <div className="bg-muted p-4 rounded-lg">
                <p className="whitespace-pre-line">{results.negotiationScript.professional}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(results.negotiationScript.professional)}
                className="w-full"
              >
                Copy Script
              </Button>
            </TabsContent>
            
            <TabsContent value="firm" className="space-y-3">
              <div className="bg-muted p-4 rounded-lg">
                <p className="whitespace-pre-line">{results.negotiationScript.firm}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(results.negotiationScript.firm)}
                className="w-full"
              >
                Copy Script
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Negotiation Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.tips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-sm">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="text-center space-x-4">
        <Button onClick={onNewAnalysis} variant="outline">
          Analyze Another Quote
        </Button>
      </div>
    </div>
  );
}