import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Users, 
  Building,
  ArrowRight,
  DollarSign
} from "lucide-react";

interface PricingPreviewProps {
  onViewAllPlans: () => void;
  onSelectPlan: (planId: string) => void;
}

export function PricingPreview({ onViewAllPlans, onSelectPlan }: PricingPreviewProps) {
  const popularPlans = [
    {
      id: "free",
      name: "Free Trial",
      price: "Free",
      description: "Try with 2 quote analyses",
      icon: Zap,
      color: "from-slate-500 to-slate-600",
      features: ["2 analyses/month", "Basic pricing", "Red flag detection"],
      cta: "Start Free"
    },
    {
      id: "homeowner",
      name: "Homeowner",
      price: "$12",
      period: "/month",
      description: "Everything families need",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      popular: true,
      features: ["Unlimited analyses", "Multi-channel intake", "Negotiation scripts"],
      cta: "Most Popular",
      savings: "Save $340+ per quote"
    },
    {
      id: "family",
      name: "Family & Friends",
      price: "$32",
      period: "/month",
      description: "Perfect for landlords",
      icon: Building,
      color: "from-purple-500 to-purple-600",
      features: ["5 properties", "Share with family", "Priority processing"],
      cta: "Choose Family"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <Badge className="bg-primary/10 text-primary border-primary/30 px-4 py-2">
            <DollarSign className="h-4 w-4 mr-2" />
            Simple, Transparent Pricing
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
            <span className="text-foreground/80">Stop Overpaying</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent">
              Start Saving Today
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your needs. All plans include our AI-powered quote analysis 
            and negotiation scripts to help you get fair pricing.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {popularPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`relative group ${isPopular ? 'z-10' : ''}`}
              >
                <Card className={`glass-card h-full transition-all duration-300 ${
                  isPopular 
                    ? 'border-primary/50 shadow-2xl ring-2 ring-primary/20' 
                    : 'hover:border-primary/30 hover:shadow-xl'
                }`}>
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <div>
                        <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 space-y-6">
                    {/* Pricing */}
                    <div className="text-center">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-primary">{plan.price}</span>
                        {plan.period && (
                          <span className="text-lg text-muted-foreground">{plan.period}</span>
                        )}
                      </div>
                      {plan.savings && (
                        <p className="text-xs text-success mt-2 font-medium">
                          {plan.savings}
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      size="lg"
                      onClick={() => onSelectPlan(plan.id)}
                      className={`w-full py-6 text-lg transition-all duration-300 ${
                        isPopular 
                          ? 'bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 shadow-lg animate-pulse-glow'
                          : 'hover:scale-105'
                      }`}
                      variant={isPopular ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Plans CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center space-y-6"
        >
          <p className="text-muted-foreground">
            Need more features? We have plans for landlords, professionals, and enterprises too.
          </p>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onViewAllPlans}
            className="px-8 py-6 text-lg border-primary/30 hover:bg-primary/5 backdrop-blur-sm"
          >
            View All Plans & Features
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>No long-term contracts</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}