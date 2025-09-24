import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Users, 
  Building, 
  Crown,
  ArrowRight,
  DollarSign,
  Shield,
  Clock,
  Camera,
  Mail,
  MessageSquare,
  FileText,
  BarChart3,
  UserPlus,
  Globe,
  Headphones,
  Sparkles
} from "lucide-react";
import { CustomerTestimonials } from "./CustomerTestimonials";
import { redirectToCheckout } from "../lib/stripeClient";
import { useAuth } from "../auth/AuthProvider";

interface PricingPlansProps {
  onSelectPlan: (planId: string) => void;
  variant?: "full" | "preview";
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  color: string;
  icon: any;
  badge?: string;
  popular?: boolean;
  features: string[];
  limits: {
    analyses: string;
    properties: string;
    users: string;
    support: string;
  };
  cta: string;
  savings?: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free Trial",
    description: "Perfect for trying our service with your first quote",
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: "from-slate-500 to-slate-600",
    icon: Zap,
    features: [
      "2 free quote analyses per month",
      "Basic fair-price range",
      "Red flag detection",
      "File upload only",
      "Basic negotiation tips"
    ],
    limits: {
      analyses: "2 per month",
      properties: "1 address",
      users: "1 user",
      support: "Email support"
    },
    cta: "Start Free Trial",
    savings: "See if quotes are fair"
  },
  {
    id: "homeowner",
    name: "Homeowner",
    description: "Everything families need to save on contractor services",
    monthlyPrice: 12,
    yearlyPrice: 108,
    color: "from-blue-500 to-blue-600",
    icon: Users,
    popular: true,
    badge: "Most Popular",
    features: [
      "Unlimited quote analyses",
      "Multi-channel intake (photo, email, text)",
      "Advanced negotiation scripts",
      "Quote history & comparisons",
      "Email/SMS price alerts",
      "Fair pricing confidence scores"
    ],
    limits: {
      analyses: "Unlimited",
      properties: "1 household",
      users: "1 user",
      support: "Priority email"
    },
    cta: "Choose Homeowner",
    savings: "Average savings: $340/quote"
  },
  {
    id: "family",
    name: "Family & Friends",
    description: "Perfect for extended families and small landlords",
    monthlyPrice: 32,
    yearlyPrice: 288,
    color: "from-purple-500 to-purple-600",
    icon: Building,
    features: [
      "Everything in Homeowner, plus:",
      "Up to 5 properties/addresses",
      "Share access with family members",
      "Exportable PDF reports",
      "Priority OCR processing",
      "Advanced contractor database"
    ],
    limits: {
      analyses: "Unlimited",
      properties: "5 addresses",
      users: "3 users",
      support: "Priority email + chat"
    },
    cta: "Choose Family Plan",
    savings: "Perfect for landlords"
  },
  {
    id: "pro",
    name: "Professional",
    description: "Built for contractors and property managers",
    monthlyPrice: 112,
    yearlyPrice: 1008,
    color: "from-orange-500 to-orange-600",
    icon: BarChart3,
    features: [
      "Everything in Family, plus:",
      "Up to 25 quotes per month",
      "Custom branding options",
      "API access & webhooks",
      "Analytics dashboard",
      "Bulk quote processing",
      "Vendor performance tracking"
    ],
    limits: {
      analyses: "25 per month",
      properties: "Unlimited",
      users: "5 users",
      support: "Phone + priority"
    },
    cta: "Choose Professional",
    savings: "ROI tracking included"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: "from-indigo-500 to-indigo-600",
    icon: Crown,
    badge: "Custom Pricing",
    features: [
      "Everything in Professional, plus:",
      "Unlimited quotes & analyses",
      "Custom SLA agreements",
      "CRM & PM tool integration",
      "Bulk reporting & admin controls",
      "Dedicated account manager",
      "Custom training & onboarding"
    ],
    limits: {
      analyses: "Unlimited",
      properties: "Unlimited",
      users: "Unlimited",
      support: "Dedicated support"
    },
    cta: "Contact Sales",
    savings: "Volume discounts available"
  }
];

export function PricingPlans({ onSelectPlan, variant = "full" }: PricingPlansProps) {
  const [isYearly, setIsYearly] = useState(false);
  const { status, user } = useAuth();

  const displayedTiers = variant === "preview" ? pricingTiers.slice(0, 3) : pricingTiers;

  const formatPrice = (tier: PricingTier) => {
    if (tier.id === "free") return "Free";
    if (tier.id === "enterprise") return "Custom";
    
    const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
    const period = isYearly ? "year" : "month";
    const monthlyEquivalent = isYearly ? tier.yearlyPrice / 12 : tier.monthlyPrice;
    
    return {
      price: `$${Math.round(monthlyEquivalent)}`,
      period: isYearly ? "/month" : "/month",
      billing: isYearly ? "billed annually" : "billed monthly",
      savings: isYearly ? `Save $${(tier.monthlyPrice * 12 - tier.yearlyPrice)}` : null
    };
  };

  const yearlyDiscount = (tier: PricingTier) => {
    if (tier.monthlyPrice === 0) return 0;
    return Math.round(((tier.monthlyPrice * 12 - tier.yearlyPrice) / (tier.monthlyPrice * 12)) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <Badge className="bg-primary/10 text-primary border-primary/30 px-4 py-2">
            <DollarSign className="h-4 w-4 mr-2" />
            Save Money on Every Project
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="text-foreground/80">Choose Your</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent">
              Savings Plan
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From occasional quotes to professional analysis - find the perfect plan to 
            stop overpaying contractors and negotiate with confidence.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4"
        >
          <span className={`text-lg ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <div className="relative">
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <Badge className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-success text-success-foreground text-xs">
              Save 25%
            </Badge>
          </div>
          <span className={`text-lg ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly
          </span>
        </motion.div>
      </div>

      {/* Pricing Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`grid gap-8 ${variant === "preview" ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"}`}
      >
        {displayedTiers.map((tier, index) => {
          const Icon = tier.icon;
          const pricing = formatPrice(tier);
          const isPopular = tier.popular;
          
          return (
            <motion.div
              key={tier.id}
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
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 shadow-lg">
                      <Star className="h-3 w-3 mr-1" />
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <div>
                      <CardTitle className="text-xl mb-2">{tier.name}</CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-6">
                  {/* Pricing */}
                  <div className="text-center">
                    {typeof pricing === "string" ? (
                      <div className="text-4xl font-bold text-primary mb-2">{pricing}</div>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-primary">{pricing.price}</span>
                          <span className="text-lg text-muted-foreground">{pricing.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{pricing.billing}</p>
                        {pricing.savings && (
                          <Badge variant="outline" className="mt-2 bg-success/10 text-success border-success/30">
                            {pricing.savings}
                          </Badge>
                        )}
                      </>
                    )}
                    
                    {tier.savings && (
                      <p className="text-xs text-muted-foreground mt-2 font-medium">
                        {tier.savings}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limits */}
                  <div className="border-t border-border/50 pt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>📊 {tier.limits.analyses}</div>
                      <div>🏠 {tier.limits.properties}</div>
                      <div>👥 {tier.limits.users}</div>
                      <div>🎧 {tier.limits.support}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    size="lg"
                    onClick={async () => {
                      if (tier.id === 'free' || tier.id === 'enterprise') return onSelectPlan(tier.id);
                      // Call our backend to create a Checkout session
                      try {
                        const base = import.meta.env.VITE_API_BASE_URL || '';
                        const res = await fetch(`${base}/api/stripe/create-checkout-session`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          credentials: 'include',
                          body: JSON.stringify({ plan: tier.id }),
                        });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.error || 'Checkout error');
                        await redirectToCheckout(data.id);
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                    className={`w-full py-6 text-lg transition-all duration-300 ${
                      isPopular 
                        ? 'bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 shadow-lg animate-pulse-glow'
                        : 'hover:scale-105'
                    }`}
                    variant={isPopular ? "default" : "outline"}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {variant === "full" && (
        <>
          {/* Feature Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl mb-4">Compare All Features</h2>
              <p className="text-xl text-muted-foreground">
                See exactly what's included in each plan
              </p>
            </div>

            <Card className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="p-4 text-left font-medium">Feature</th>
                      {pricingTiers.map(tier => (
                        <th key={tier.id} className="p-4 text-center font-medium min-w-32">
                          {tier.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      { feature: "Quote Analyses", values: ["2/month", "Unlimited", "Unlimited", "25/month", "Unlimited"] },
                      { feature: "Multi-channel Intake", values: ["❌", "✅", "✅", "✅", "✅"] },
                      { feature: "Negotiation Scripts", values: ["Basic", "Advanced", "Advanced", "Advanced", "Custom"] },
                      { feature: "Properties", values: ["1", "1", "5", "Unlimited", "Unlimited"] },
                      { feature: "Team Members", values: ["1", "1", "3", "5", "Unlimited"] },
                      { feature: "API Access", values: ["❌", "❌", "❌", "✅", "✅"] },
                      { feature: "Custom Branding", values: ["❌", "❌", "❌", "✅", "✅"] },
                      { feature: "Dedicated Support", values: ["❌", "❌", "❌", "❌", "✅"] }
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-muted/20">
                        <td className="p-4 font-medium">{row.feature}</td>
                        {row.values.map((value, i) => (
                          <td key={i} className="p-4 text-center text-sm">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Money-Back Guarantee",
                description: "30-day money-back guarantee on all paid plans"
              },
              {
                icon: Clock,
                title: "No Long-term Contracts",
                description: "Cancel anytime. No hidden fees or commitments"
              },
              {
                icon: Sparkles,
                title: "Always Improving",
                description: "Regular updates and new features at no extra cost"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Customer Testimonials */}
          <CustomerTestimonials variant="features" />

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "Can I change plans anytime?",
                  a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
                },
                {
                  q: "What happens if I go over my quote limit?",
                  a: "We'll notify you before you reach your limit. You can upgrade your plan or purchase additional quotes as needed."
                },
                {
                  q: "Do you offer refunds?",
                  a: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund your payment in full."
                },
                {
                  q: "Is my data secure?",
                  a: "Absolutely. We use enterprise-grade encryption and never share your quote data with contractors or third parties."
                }
              ].map((faq, index) => (
                <Card key={index} className="glass-card p-6">
                  <h3 className="font-medium mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center"
      >
        <Card className="glass-card shadow-soft border-primary/20 p-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl">
              Ready to Stop Overpaying?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of homeowners who've saved money with our service. 
              Start with a free trial - no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => onSelectPlan("free")}
                className="sm:px-12 py-8 text-xl bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 shadow-lg hover:shadow-xl animate-pulse-glow"
              >
                <Camera className="h-6 w-6 mr-3" />
                Start Free Trial
              </Button>
              
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No credit card • 2 free analyses • Instant results</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
