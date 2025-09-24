import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { TrendingUp, Shield, Zap, PlayCircle } from "lucide-react";
import { CustomerTestimonials } from "./CustomerTestimonials";

interface HeroSectionProps {
  onAnalyzeQuote: () => void;
  onGetEstimate: () => void;
  onSeeFeatures?: () => void;
}

export function HeroSection({ onAnalyzeQuote, onGetEstimate, onSeeFeatures }: HeroSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-accent/10 to-primary/5 relative overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-20" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-info/10 rounded-full blur-xl"
        animate={{
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent">
                Got a quote?
              </span>
              <br />
              <span className="text-foreground/80">We'll tell you if it's fair.</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From paper estimates to email PDFs - we analyze any contractor quote and give you 
              fair pricing, red flags, and negotiation help in plain English.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={onAnalyzeQuote} 
                  className="sm:px-12 py-8 text-xl bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 shadow-lg hover:shadow-xl animate-pulse-glow"
                >
                  📸 Got a Quote? Start Here
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={onGetEstimate} 
                  className="sm:px-8 py-6 text-lg border-primary/20 hover:bg-primary/5 backdrop-blur-sm"
                >
                  Get Price Estimate
                </Button>
              </motion.div>
            </motion.div>

            {/* See How It Works Button */}
            {onSeeFeatures && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mb-12"
              >
                <Button
                  variant="ghost"
                  onClick={onSeeFeatures}
                  className="text-primary hover:text-primary/80 hover:bg-primary/5"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  See How It Works
                </Button>
              </motion.div>
            )}

            {/* Stats or trust indicators */}
            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span>Save up to 30% on services</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-info" />
                <span>Trusted by 10,000+ homeowners</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning" />
                <span>Instant AI analysis</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            {
              icon: "📸",
              title: "Upload Quote Photo",
              description: "Take a photo of your written estimate",
              gradient: "from-info to-primary",
              delay: 0.1
            },
            {
              icon: "🔍",
              title: "AI Analysis",
              description: "Compare quote vs fair market pricing",
              gradient: "from-warning to-info",
              delay: 0.2
            },
            {
              icon: "💬",
              title: "Negotiate Script",
              description: "Get customized scripts to negotiate better deals",
              gradient: "from-success to-primary",
              delay: 0.3
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + feature.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="glass-card border-accent/30 hover:shadow-xl transition-all duration-300 group-hover:border-primary/30 h-full">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-3xl">{feature.icon}</span>
                  </motion.div>
                  <h3 className="mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Customer Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20"
        >
          <CustomerTestimonials variant="hero" />
        </motion.div>

        {/* See How It Works CTA */}
        {onSeeFeatures && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-center mt-16"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={onSeeFeatures}
              className="text-primary border-primary/30 hover:bg-primary/5 backdrop-blur-sm px-8 py-6 text-lg"
            >
              <PlayCircle className="h-5 w-5 mr-2" />
              See How It Works - Full Demo
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}