import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  MessageSquare, 
  Copy, 
  CheckCircle, 
  ArrowRight, 
  Phone,
  Image,
  FileText,
  Zap
} from "lucide-react";

interface TextQuoteSubmissionProps {
  onTextSetup: (phoneNumber: string) => void;
  loading?: boolean;
}

export function TextQuoteSubmission({ onTextSetup, loading }: TextQuoteSubmissionProps) {
  const [phoneNumber] = useState("(704) 555-0123"); // Mock phone number
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    onTextSetup(phoneNumber);
  }, [phoneNumber, onTextSetup]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const features = [
    {
      icon: Image,
      title: "Photo Messages",
      description: "Send pictures of paper quotes",
      color: "text-blue-500"
    },
    {
      icon: FileText,
      title: "PDF Attachments",
      description: "Forward PDF quotes via MMS",
      color: "text-green-500"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get results in 15 seconds",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass-card shadow-soft">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <MessageSquare className="h-6 w-6 text-primary" />
              Text Your Quote
            </CardTitle>
          </motion.div>
          <p className="text-muted-foreground text-lg">
            Send a photo or PDF of your quote via text message for instant analysis
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Phone Number Display */}
          <div className="bg-gradient-to-br from-primary/5 to-info/5 rounded-xl p-6 border border-primary/20">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm">
                <CheckCircle className="h-4 w-4" />
                Ready to Use
              </div>
              
              <div className="bg-white rounded-lg p-6 border">
                <div className="flex items-center justify-center gap-3">
                  <Phone className="h-8 w-8 text-primary" />
                  <span className="text-3xl font-bold text-primary">{phoneNumber}</span>
                </div>
              </div>
              
              <Button
                onClick={() => copyToClipboard(phoneNumber)}
                variant="outline"
                className="w-full"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2 text-success" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Phone Number
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-4">
            <h3 className="text-lg font-medium text-center">What You Can Send:</h3>
            
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              How It Works
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  1
                </div>
                <p className="text-base">
                  <strong>Text the photo</strong> of your quote to the number above
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  2
                </div>
                <p className="text-base">
                  <strong>We analyze instantly</strong> - Our AI reads the quote and compares to fair market pricing
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  3
                </div>
                <p className="text-base">
                  <strong>Get your results</strong> - Receive a text back with a link to your analysis
                </p>
              </div>
            </div>
          </div>

          {/* Sample Response */}
          <div className="bg-muted/30 rounded-xl p-6">
            <h4 className="font-medium mb-3">Sample Response You'll Get:</h4>
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">From: {phoneNumber}</p>
                  <p className="text-base">
                    ✅ Got your quote! Analysis complete - your quote looks fair but we found potential savings of $150. 
                    View full results: <span className="text-primary underline">bit.ly/quote-analysis-abc123</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => window.open(`sms:${phoneNumber}?body=Here's my contractor quote for analysis`, '_blank')}
              className="h-12 bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Open Text App
            </Button>
            
            <Button
              variant="outline"
              onClick={() => copyToClipboard(phoneNumber)}
              className="h-12"
            >
              <Copy className="h-5 w-5 mr-2" />
              Copy Number
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="text-center">
            <Badge variant="outline" className="text-xs">
              Standard messaging rates apply • Secure & Private
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}