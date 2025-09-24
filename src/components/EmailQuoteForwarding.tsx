import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { 
  Mail, 
  Copy, 
  CheckCircle, 
  ArrowRight, 
  Shield,
  Zap,
  Globe,
  RefreshCw
} from "lucide-react";

interface EmailQuoteForwardingProps {
  onEmailSetup: (alias: string) => void;
  loading?: boolean;
}

export function EmailQuoteForwarding({ onEmailSetup, loading }: EmailQuoteForwardingProps) {
  const [emailAlias, setEmailAlias] = useState("");
  const [copied, setCopied] = useState(false);
  const [setupMethod, setSetupMethod] = useState<"alias" | "connect" | null>(null);

  useEffect(() => {
    // Generate a unique email alias
    const randomId = Math.random().toString(36).substring(2, 8);
    const alias = `quote.${randomId}@fairfix.ai`;
    setEmailAlias(alias);
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
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

  const handleMethodSelect = (method: "alias" | "connect") => {
    setSetupMethod(method);
    if (method === "alias") {
      onEmailSetup(emailAlias);
    }
  };

  if (setupMethod === null) {
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
                <Mail className="h-6 w-6 text-primary" />
                Email Quote Setup
              </CardTitle>
            </motion.div>
            <p className="text-muted-foreground text-lg">
              Choose how you'd like to handle email quotes
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Method Options */}
            <div className="grid gap-6">
              {/* Email Alias Option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => handleMethodSelect("alias")}
              >
                <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-info rounded-xl flex items-center justify-center shadow-lg">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-medium">Personal Email Address</h3>
                          <Badge className="bg-success/20 text-success border-success/30">Recommended</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">
                          Get a dedicated email address. Forward any quote emails or ask contractors to send directly.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="h-4 w-4 text-success" />
                          <span>Instant setup</span>
                          <Shield className="h-4 w-4 text-info" />
                          <span>No login required</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Email Connect Option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => handleMethodSelect("connect")}
              >
                <Card className="border-2 border-dashed border-info/30 hover:border-info/50 hover:bg-info/5 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-info to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-medium">Connect Gmail/Outlook</h3>
                          <Badge variant="outline">Magic Mode</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">
                          One-click connect to automatically find and analyze recent quote emails.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <RefreshCw className="h-4 w-4 text-info" />
                          <span>Auto-discovery</span>
                          <Shield className="h-4 w-4 text-success" />
                          <span>Read-only access</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Trust Message */}
            <div className="bg-muted/30 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium">Private & Secure</span>
              </div>
              <p className="text-muted-foreground text-sm">
                We never share your information. Read-only access only. You control what we see.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <Mail className="h-6 w-6 text-primary" />
              Your Personal Quote Email
            </CardTitle>
          </motion.div>
          <p className="text-muted-foreground text-lg">
            Forward any quote emails to this address for instant analysis
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Email Address Display */}
          <div className="bg-gradient-to-br from-primary/5 to-info/5 rounded-xl p-6 border border-primary/20">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <CheckCircle className="h-4 w-4" />
                Ready to Use
              </div>
              
              <div className="bg-white rounded-lg p-4 border">
                <Input
                  value={emailAlias}
                  readOnly
                  className="text-center text-lg font-mono bg-transparent border-none focus:ring-0 cursor-pointer"
                  onClick={() => copyToClipboard(emailAlias)}
                />
              </div>
              
              <Button
                onClick={() => copyToClipboard(emailAlias)}
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
                    Copy Email Address
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-primary" />
              How to Use
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  1
                </div>
                <p className="text-base">
                  <strong>Forward quote emails</strong> to your personal address above, or ask contractors to send quotes directly there
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  2
                </div>
                <p className="text-base">
                  <strong>We'll analyze automatically</strong> - PDF attachments, images, and quote text all work
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  3
                </div>
                <p className="text-base">
                  <strong>Get instant results</strong> - You'll receive a link to your analysis within seconds
                </p>
              </div>
            </div>
          </div>

          {/* Sample Email Template */}
          <div className="bg-muted/30 rounded-xl p-6">
            <h4 className="font-medium mb-3">Sample Message for Contractors:</h4>
            <div className="bg-white rounded-lg p-4 border text-sm">
              <p className="italic text-muted-foreground">
                "Hi [Contractor Name], please send my quote to <strong>{emailAlias}</strong> so I can review it quickly. Thanks!"
              </p>
            </div>
            <Button
              onClick={() => copyToClipboard(`Hi, please send my quote to ${emailAlias} so I can review it quickly. Thanks!`)}
              variant="ghost"
              size="sm"
              className="w-full mt-2"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Message Template
            </Button>
          </div>

          {/* Action Button */}
          <Button
            className="w-full h-12 text-lg bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Setting Up...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Email Address Ready!
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}