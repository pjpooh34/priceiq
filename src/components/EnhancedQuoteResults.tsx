import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CustomerTestimonials } from "./CustomerTestimonials";
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  MapPin,
  Copy,
  Share2,
  Download,
  MessageSquare,
  Mail,
  Phone,
  Calculator,
  Shield,
  Users,
  Lightbulb,
  Eye,
  HelpCircle
} from "lucide-react";

interface QuoteItem {
  item: string;
  quoted: number;
  typical: number;
  status: "fair" | "high" | "low";
}

interface EnhancedQuoteResultsProps {
  results: {
    contractor: string;
    service: string;
    location: string;
    date: string;
    totalQuoted: number;
    fairRangeLow: number;
    fairRangeHigh: number;
    confidence: number;
    timeAnalyzed: number;
    sourceCount: number;
    redFlags: string[];
    lineItems: QuoteItem[];
    savings: number;
    negotiationScripts: {
      friendly: string;
      professional: string;
      firm: string;
    };
    tips: string[];
  };
  onNewAnalysis: () => void;
}

export function EnhancedQuoteResults({ results, onNewAnalysis }: EnhancedQuoteResultsProps) {
  const [selectedScript, setSelectedScript] = useState<"friendly" | "professional" | "firm">("friendly");
  const [copied, setCopied] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fair": return "text-success";
      case "high": return "text-warning";
      case "low": return "text-info";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "fair": return "bg-success/10 border-success/30";
      case "high": return "bg-warning/10 border-warning/30";
      case "low": return "bg-info/10 border-info/30";
      default: return "bg-muted/10 border-muted/30";
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getPriceStatus = () => {
    if (results.totalQuoted <= results.fairRangeHigh && results.totalQuoted >= results.fairRangeLow) {
      return { status: "fair", message: "You're in the fair zone", color: "text-success" };
    } else if (results.totalQuoted > results.fairRangeHigh) {
      return { status: "high", message: "This quote is above market rate", color: "text-warning" };
    } else {
      return { status: "low", message: "This is a great deal", color: "text-info" };
    }
  };

  const priceStatus = getPriceStatus();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="glass-card border-primary/20 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl">
                  {results.contractor} • {results.service}
                </CardTitle>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{results.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{results.date}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-sm">
                Quote #{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Main Price Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="glass-card shadow-soft">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Price Comparison */}
              <div>
                <div className="text-4xl md:text-5xl mb-2">
                  <span className="text-muted-foreground">$</span>
                  <span className={`${priceStatus.color} font-bold`}>
                    {results.totalQuoted.toLocaleString()}
                  </span>
                </div>
                <div className={`text-xl ${priceStatus.color} font-medium mb-4`}>
                  {priceStatus.message}
                </div>
                
                <div className="bg-muted/30 rounded-xl p-6 max-w-lg mx-auto">
                  <div className="text-lg mb-2">Fair price in your area:</div>
                  <div className="text-2xl font-bold text-primary">
                    ${results.fairRangeLow.toLocaleString()} - ${results.fairRangeHigh.toLocaleString()}
                  </div>
                  
                  {results.savings > 0 && (
                    <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded-lg">
                      <div className="flex items-center justify-center gap-2 text-success">
                        <TrendingUp className="h-5 w-5" />
                        <span className="font-medium">Potential savings: ${results.savings}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Confidence & Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-info rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-lg font-medium mb-1">Confidence</div>
                  <div className="text-2xl font-bold text-primary">{results.confidence}%</div>
                  <Progress value={results.confidence} className="h-2 mt-2" />
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-success to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-lg font-medium mb-1">Data Source</div>
                  <div className="text-sm text-muted-foreground">
                    {results.sourceCount.toLocaleString()} similar jobs near {results.location}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-warning to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-lg font-medium mb-1">Time Saved</div>
                  <div className="text-sm text-muted-foreground">
                    Analyzed in {results.timeAnalyzed}s<br />
                    (~30 minutes of research)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Analysis Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass-card shadow-soft">
          <CardContent className="p-6">
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="breakdown">Line Items</TabsTrigger>
                <TabsTrigger value="redflags">Red Flags</TabsTrigger>
                <TabsTrigger value="negotiate">Negotiate</TabsTrigger>
                <TabsTrigger value="tips">Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium mb-4">Line-by-Line Comparison</h3>
                  
                  {results.lineItems.map((item, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${getStatusBg(item.status)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-lg">{item.item}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Quoted: ${item.quoted} • Typical: ${item.typical}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={item.status === "fair" ? "default" : "secondary"}>
                            {item.status === "fair" ? "Fair" : item.status === "high" ? "High" : "Great Deal"}
                          </Badge>
                          <div className={`text-sm mt-1 ${getStatusColor(item.status)}`}>
                            {item.status === "high" ? "+" : item.status === "low" ? "-" : ""}
                            ${Math.abs(item.quoted - item.typical)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="redflags" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Things to Watch Out For
                  </h3>
                  
                  {results.redFlags.length > 0 ? (
                    results.redFlags.map((flag, index) => (
                      <div key={index} className="p-4 bg-warning/10 border border-warning/30 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                          <p className="text-base">{flag}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 bg-success/10 border border-success/30 rounded-xl text-center">
                      <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
                      <p className="text-lg text-success">No red flags found!</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        This quote looks straightforward and fair.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="negotiate" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-4">Negotiation Script</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose your preferred tone for negotiating with the contractor:
                    </p>
                    
                    <div className="flex gap-2 mb-4">
                      {(["friendly", "professional", "firm"] as const).map((tone) => (
                        <Button
                          key={tone}
                          variant={selectedScript === tone ? "default" : "outline"}
                          onClick={() => setSelectedScript(tone)}
                          className="capitalize"
                        >
                          {tone}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium capitalize">{selectedScript} Approach</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(results.negotiationScripts[selectedScript])}
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2 text-success" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Script
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border">
                      <p className="text-base leading-relaxed whitespace-pre-line">
                        {results.negotiationScripts[selectedScript]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-12">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Send as Text
                    </Button>
                    <Button variant="outline" className="h-12">
                      <Mail className="h-5 w-5 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="h-12">
                      <Phone className="h-5 w-5 mr-2" />
                      Call Script
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tips" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-warning" />
                    Expert Tips
                  </h3>
                  
                  {results.tips.map((tip, index) => (
                    <div key={index} className="p-4 bg-info/10 border border-info/30 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
                        <p className="text-base">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Button onClick={onNewAnalysis} variant="outline" className="h-12">
          <Eye className="h-5 w-5 mr-2" />
          Analyze Another
        </Button>
        
        <Button variant="outline" className="h-12">
          <Share2 className="h-5 w-5 mr-2" />
          Share Results
        </Button>
        
        <Button variant="outline" className="h-12">
          <Download className="h-5 w-5 mr-2" />
          Download PDF
        </Button>
        
        <Button variant="outline" className="h-12">
          <HelpCircle className="h-5 w-5 mr-2" />
          Get Help
        </Button>
      </motion.div>

      {/* Customer Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <CustomerTestimonials variant="results" />
      </motion.div>

      {/* Trust Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-full text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Analysis based on {results.sourceCount.toLocaleString()} local projects • Updated daily</span>
        </div>
      </motion.div>
    </div>
  );
}