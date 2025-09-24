import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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
}

interface ResultsDashboardProps {
  results: ResultsData;
  onNewEstimate: () => void;
}

export function ResultsDashboard({ results, onNewEstimate }: ResultsDashboardProps) {
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl mb-2">Your Service Estimate</h2>
        <p className="text-muted-foreground">
          {results.service} in {results.location}
        </p>
      </div>

      {/* Price Range Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Fair Price Range
            <Badge variant={results.confidence === "High" ? "default" : results.confidence === "Medium" ? "secondary" : "outline"}>
              {results.confidence} Confidence
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-2">
              {formatPrice(results.priceRange.low)} - {formatPrice(results.priceRange.high)}
            </div>
            <p className="text-muted-foreground">Based on local market data</p>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="mb-3">Factors affecting price:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {results.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Negotiation Scripts */}
      <Card>
        <CardHeader>
          <CardTitle>Negotiation Scripts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose the tone that matches your style and copy the script to use with contractors
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

      <div className="text-center">
        <Button onClick={onNewEstimate} variant="outline">
          Get Another Estimate
        </Button>
      </div>
    </div>
  );
}