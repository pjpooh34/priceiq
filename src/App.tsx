import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home } from "lucide-react";
import { Header } from "./components/Header";
import { AuthProvider } from "./auth/AuthProvider";
import { HeroSection } from "./components/HeroSection";
import { FeaturesDemo } from "./components/FeaturesDemo";
import { PricingPlans } from "./components/PricingPlans";
import { PricingPreview } from "./components/PricingPreview";
import { QuoteIntakeMethod } from "./components/QuoteIntakeMethod";
import { PaperQuoteScanner } from "./components/PaperQuoteScanner";
import { EmailQuoteForwarding } from "./components/EmailQuoteForwarding";
import { TextQuoteSubmission } from "./components/TextQuoteSubmission";
import { ServiceRequestForm } from "./components/ServiceRequestForm";
import { QuoteUploadForm } from "./components/QuoteUploadForm";
import { ResultsDashboard } from "./components/ResultsDashboard";
import { QuoteAnalysisResults } from "./components/QuoteAnalysisResults";
import { EnhancedQuoteResults } from "./components/EnhancedQuoteResults";
import { mockAnalyzeService, mockAnalyzeQuote } from "./components/mockAiService";
import { Account } from "./components/Account";
import { useAuth } from "./auth/AuthProvider";
import { Toaster, toast } from "sonner";
import { GuidedTour } from "./components/GuidedTour";

type AppState = "landing" | "features" | "pricing" | "signup" | "account" | "intake-method" | "paper-scan" | "email-forward" | "text-submit" | "portal-link" | "phone-entry" | "quote-upload" | "form" | "results";

interface ServiceRequestData {
  serviceType: string;
  description: string;
  zipCode: string;
  urgency: string;
  photo?: File;
}

interface QuoteUploadData {
  quotePhoto: File;
  zipCode: string;
  contractorName?: string;
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
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { plan } = useAuth();
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResultsData | null>(null);
  const [tourOpen, setTourOpen] = useState(false);

  const handleAnalyzeQuote = () => {
    setCurrentState("intake-method");
  };

  const handleMethodSelect = (method: string) => {
    const premiumMethods = new Set(["paper", "email", "text", "portal", "phone"]);
    if (plan === "free" && premiumMethods.has(method as any)) {
      toast("Upgrade required", { description: "This intake method is available on paid plans.", action: { label: "View plans", onClick: () => setCurrentState("pricing") } });
      return;
    }
    switch (method) {
      case "paper":
        setCurrentState("paper-scan");
        break;
      case "email":
        setCurrentState("email-forward");
        break;
      case "text":
        setCurrentState("text-submit");
        break;
      case "portal":
        setCurrentState("portal-link");
        break;
      case "phone":
        setCurrentState("phone-entry");
        break;
      default:
        setCurrentState("quote-upload");
    }
  };

  const handleAccount = () => setCurrentState("account");

  const handleGetEstimate = () => {
    setCurrentState("form");
  };

  const handleSeeFeatures = () => {
    setCurrentState("features");
  };

  const handleViewPricing = () => {
    setCurrentState("pricing");
  };

  const handleDemoComplete = (demoResult: any) => {
    // Map demo result to ResultsData shape and show full results view
    setResults(demoResult);
    setCurrentState("results");
    // Auto-open tour the first time
    if (!localStorage.getItem("tour_results_seen")) {
      setTourOpen(true);
      localStorage.setItem("tour_results_seen", "1");
    }
  };

  const handleSelectPlan = (planId: string) => {
    // In a real app, this would handle plan selection/signup
    console.log("Selected plan:", planId);
    if (planId === "free") {
      // Start free trial - go directly to quote analysis
      setCurrentState("intake-method");
    } else {
      // For paid plans, you'd redirect to a signup/payment flow
      setCurrentState("signup");
    }
  };

  const handleQuoteSubmit = async (data: QuoteUploadData) => {
    setLoading(true);
    try {
      const analysisResults = await mockAnalyzeQuote(data);
      setResults(analysisResults);
      setCurrentState("results");
    } catch (error) {
      console.error("Error analyzing quote:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoCapture = async (file: File) => {
    setLoading(true);
    try {
      const analysisResults = await mockAnalyzeQuote({ 
        quotePhoto: file, 
        zipCode: "28202", // Default or prompt for zip
        contractorName: "Photo Analysis" 
      });
      setResults(analysisResults);
      setCurrentState("results");
    } catch (error) {
      console.error("Error analyzing photo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSetup = (alias: string) => {
    // In a real app, this would set up the email forwarding
    console.log("Email alias set up:", alias);
    // For now, show a success message or redirect
  };

  const handleTextSetup = (phoneNumber: string) => {
    // In a real app, this would set up the SMS endpoint
    console.log("Text number set up:", phoneNumber);
  };

  const handleFormSubmit = async (data: ServiceRequestData) => {
    setLoading(true);
    try {
      const analysisResults = await mockAnalyzeService(data);
      setResults(analysisResults);
      setCurrentState("results");
    } catch (error) {
      console.error("Error analyzing service:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setCurrentState("intake-method");
    setResults(null);
  };

  const handleNewEstimate = () => {
    setCurrentState("form");
    setResults(null);
  };

  const handleBackToHome = () => {
    setCurrentState("landing");
    setResults(null);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-info/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" />
      </div>

      <Header 
        onPricingClick={handleViewPricing}
        onFeaturesClick={handleSeeFeatures}
        onHomeClick={handleBackToHome}
        onAccountClick={handleAccount}
      />
      
      <main className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          {currentState === "landing" && (
            <motion.div
              key="landing"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <div className="space-y-0">
                <HeroSection 
                  onAnalyzeQuote={handleAnalyzeQuote} 
                  onGetEstimate={handleGetEstimate}
                  onSeeFeatures={handleSeeFeatures}
                  onDemoComplete={handleDemoComplete}
                />
                <PricingPreview 
                  onViewAllPlans={handleViewPricing}
                  onSelectPlan={handleSelectPlan}
                />
              </div>
            </motion.div>
          )}

          {currentState === "account" && (
            <motion.div
              key="account"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <Account onBack={handleBackToHome} />
            </motion.div>
          )}

          {currentState === "features" && (
            <motion.div
              key="features"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <FeaturesDemo onGetStarted={handleAnalyzeQuote} />
            </motion.div>
          )}

          {currentState === "pricing" && (
            <motion.div
              key="pricing"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <PricingPlans onSelectPlan={handleSelectPlan} />
            </motion.div>
          )}

          {currentState === "signup" && (
            <motion.div
              key="signup"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl">Sign Up for Your Plan</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    In a real app, this would be your signup/payment form integrated with Stripe or similar.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => setCurrentState("landing")}>
                      Back to Home
                    </Button>
                    <Button onClick={handleAnalyzeQuote} variant="outline">
                      Try Free Instead
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {currentState === "intake-method" && (
            <motion.div
              key="intake-method"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <QuoteIntakeMethod onMethodSelect={handleMethodSelect} />
            </motion.div>
          )}

          {currentState === "paper-scan" && (
            <motion.div
              key="paper-scan"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl mb-4 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent"
                >
                  Scan Your Paper Quote
                </motion.h2>
              </div>
              <PaperQuoteScanner onPhotoCapture={handlePhotoCapture} loading={loading} />
            </motion.div>
          )}

          {currentState === "email-forward" && (
            <motion.div
              key="email-forward"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <EmailQuoteForwarding onEmailSetup={handleEmailSetup} loading={loading} />
            </motion.div>
          )}

          {currentState === "text-submit" && (
            <motion.div
              key="text-submit"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <TextQuoteSubmission onTextSetup={handleTextSetup} loading={loading} />
            </motion.div>
          )}
          
          {currentState === "quote-upload" && (
            <motion.div
              key="quote-upload"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl mb-4 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent"
                >
                  Analyze Your Contractor Quote
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground"
                >
                  Upload a photo of your written estimate for instant analysis and fair pricing comparison
                </motion.p>
              </div>
              <QuoteUploadForm onSubmit={handleQuoteSubmit} loading={loading} />
            </motion.div>
          )}
          
          {currentState === "form" && (
            <motion.div
              key="form"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl mb-4 bg-gradient-to-r from-primary to-info bg-clip-text text-transparent"
                >
                  Get Your Price Estimate
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-muted-foreground"
                >
                  Tell us about your project and we'll provide fair market pricing and negotiation help
                </motion.p>
              </div>
              <ServiceRequestForm onSubmit={handleFormSubmit} loading={loading} />
            </motion.div>
          )}
          
          {currentState === "results" && results && (
            <motion.div
              key="results"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="max-w-7xl mx-auto"
            >
              <GuidedTour open={tourOpen} onClose={() => setTourOpen(false)} />
              {results.quoteAnalysis ? (
                <EnhancedQuoteResults 
                  results={{
                    contractor: results.quoteAnalysis.contractorName || "Unknown Contractor",
                    service: results.service,
                    location: results.location,
                    date: new Date().toLocaleDateString(),
                    totalQuoted: results.quoteAnalysis.totalAmount,
                    fairRangeLow: results.priceRange.low,
                    fairRangeHigh: results.priceRange.high,
                    confidence: 85,
                    timeAnalyzed: 12,
                    sourceCount: 2184,
                    redFlags: results.quoteAnalysis.redFlags || [],
                    lineItems: results.quoteAnalysis.lineItems?.map(item => ({
                      item: item.description,
                      quoted: item.amount,
                      typical: item.amount * 0.9, // Mock typical price
                      status: item.amount > item.amount * 1.1 ? "high" : "fair" as "fair" | "high" | "low"
                    })) || [],
                    savings: Math.max(0, results.quoteAnalysis.totalAmount - results.priceRange.high),
                    negotiationScripts: results.negotiationScript,
                    tips: results.tips
                  }}
                  onNewAnalysis={handleNewAnalysis} 
                />
              ) : (
                <ResultsDashboard results={results} onNewEstimate={handleNewEstimate} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <motion.footer 
        className="glass-card border-t border-border/50 py-12 mt-16 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary to-info rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Home className="h-6 w-6 text-white" />
              </motion.div>
            </div>
            
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ServiceNegotiator helps you analyze quotes, get fair prices, and negotiate with confidence. 
              Join thousands of homeowners saving money on local services.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
              <motion.button
                onClick={handleAnalyzeQuote}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📸 Analyze Quote
              </motion.button>
              <motion.button
                onClick={handleGetEstimate}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📊 Get Estimate
              </motion.button>
            </div>
            
            <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground/60">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-400"
              >
                ❤️
              </motion.span>
              <span>for homeowners</span>
            </div>
          </motion.div>
        </div>
      </motion.footer>
      <Toaster position="top-center" richColors />
    </div>
  );
}
