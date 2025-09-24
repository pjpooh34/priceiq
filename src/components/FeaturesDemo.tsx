import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Camera, 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Clock,
  CheckCircle,
  Star,
  Users,
  Calculator,
  FileText,
  Phone,
  ArrowRight,
  PlayCircle,
  Zap
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CustomerTestimonials } from "./CustomerTestimonials";

interface FeaturesDemoProps {
  onGetStarted: () => void;
}

export function FeaturesDemo({ onGetStarted }: FeaturesDemoProps) {
  const [activeDemo, setActiveDemo] = useState("paper");

  const features = [
    {
      icon: Camera,
      title: "Smart Photo Analysis", 
      description: "Just snap a photo of any paper quote. Our AI reads it instantly and compares to fair market pricing.",
      benefits: ["Works with handwritten quotes", "Auto-detects pricing", "Handles multiple pages"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Integration",
      description: "Get your personal email address. Forward any quote email or ask contractors to send there directly.", 
      benefits: ["PDF attachments", "Automatic analysis", "Works with any email"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: MessageSquare,
      title: "Text Messaging",
      description: "Text a photo or PDF to our number. Get instant analysis back within seconds.",
      benefits: ["MMS support", "Instant results", "No app needed"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Compare quotes against thousands of real jobs in your area to ensure fair pricing.",
      benefits: ["Local market data", "Real-time updates", "85%+ accuracy"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  const demoScreenshots = {
    paper: {
      title: "Photo Analysis Demo",
      steps: [
        {
          title: "Take a Photo",
          description: "Point your camera at any written quote - handwritten or printed",
          image: "contractor quote document"
        },
        {
          title: "Instant Processing", 
          description: "Our AI reads the quote in seconds with quality checks",
          image: "mobile phone scanning"
        },
        {
          title: "Get Your Analysis",
          description: "See fair pricing, red flags, and negotiation scripts",
          image: "data analysis charts"
        }
      ]
    },
    email: {
      title: "Email Integration Demo",
      steps: [
        {
          title: "Get Your Email",
          description: "Receive a personal address like quote.abc123@fairfix.ai",
          image: "email inbox interface"
        },
        {
          title: "Forward Quotes",
          description: "Forward any quote email or ask contractors to send directly",
          image: "email forwarding"
        },
        {
          title: "Auto-Analysis",
          description: "Get a link to your analysis within seconds of receiving the quote",
          image: "email notification"
        }
      ]
    },
    text: {
      title: "Text Message Demo", 
      steps: [
        {
          title: "Send a Text",
          description: "Text your quote photo to our dedicated number",
          image: "text message conversation"
        },
        {
          title: "Instant Reply",
          description: "Get analysis results back via text with a secure link",
          image: "mobile text messages"
        },
        {
          title: "View Results",
          description: "Tap the link to see detailed pricing analysis and tips",
          image: "mobile app interface"
        }
      ]
    },
    results: {
      title: "Results Dashboard Demo",
      steps: [
        {
          title: "Price Comparison",
          description: "See exactly how your quote compares to fair market pricing",
          image: "price comparison chart"
        },
        {
          title: "Line-by-Line Analysis",
          description: "Detailed breakdown showing which items are overpriced",
          image: "detailed financial report"
        },
        {
          title: "Negotiation Help",
          description: "Ready-to-use scripts in friendly, professional, or firm tones",
          image: "business meeting handshake"
        }
      ]
    }
  };

  const stats = [
    { label: "Homeowners Helped", value: "50,000+", icon: Users },
    { label: "Total Savings", value: "$2.8M", icon: TrendingUp },
    { label: "Average Savings", value: "$340", icon: Calculator },
    { label: "Analysis Time", value: "15 sec", icon: Clock }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <Badge className="bg-primary/10 text-primary border-primary/30 px-4 py-2">
            <PlayCircle className="h-4 w-4 mr-2" />
            See How It Works
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
            <span className="bg-gradient-to-r from-primary via-info to-primary bg-clip-text text-transparent">
              Never Overpay
            </span>
            <br />
            <span className="text-foreground/80">for Local Services Again</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From paper estimates to email PDFs - see exactly how our AI analyzes any contractor quote 
            and helps you negotiate fair pricing in plain English.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-info rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Interactive Demo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="glass-card shadow-soft">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl md:text-3xl">Interactive Demo</CardTitle>
            <p className="text-muted-foreground text-lg">
              Choose how you'd like to submit a quote and see the process in action
            </p>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="paper" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  <span className="hidden sm:inline">Photo</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline">Email</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Text</span>
                </TabsTrigger>
                <TabsTrigger value="results" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Results</span>
                </TabsTrigger>
              </TabsList>
              
              {Object.entries(demoScreenshots).map(([key, demo]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="space-y-8">
                    <div className="text-center">
                      <h3 className="text-xl font-medium mb-2">{demo.title}</h3>
                      <p className="text-muted-foreground">
                        Follow the simple 3-step process below
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                      {demo.steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center group"
                        >
                          <div className="relative mb-6">
                            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                              <ImageWithFallback
                                src={
                                  activeDemo === "paper" && index === 0 ? "https://images.unsplash.com/photo-1554224155-cfa08c2a758f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250cmFjdG9yJTIwcXVvdGUlMjBkb2N1bWVudCUyMHBhcGVyfGVufDF8fHx8MTc1NjkyOTIxNXww&ixlib=rb-4.1.0&q=80&w=1080" :
                                  activeDemo === "paper" && index === 1 ? "https://images.unsplash.com/photo-1708728428881-888b46603534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHNjYW5uaW5nJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzU2OTI5MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080" :
                                  activeDemo === "paper" && index === 2 ? "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBjaGFydHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU2OTI5MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080" :
                                  activeDemo === "email" && index === 0 ? "https://images.unsplash.com/photo-1683117927786-f146451082fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMGluYm94JTIwaW50ZXJmYWNlfGVufDF8fHx8MTc1NjkyOTIyOXww&ixlib=rb-4.1.0&q=80&w=1080" :
                                  activeDemo === "email" && index === 1 ? "https://images.unsplash.com/photo-1683117927786-f146451082fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMGZvcndhcmRpbmclMjBub3RpZmljYXRpb258ZW58MXx8fHwxNzU2OTI5MjMzfDA&ixlib=rb-4.1.0&q=80&w=1080" :
                                  activeDemo === "text" && index === 0 ? "https://images.unsplash.com/photo-1646766677899-9c1750e28b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0JTIwbWVzc2FnZSUyMGNvbnZlcnNhdGlvbiUyMG1vYmlsZXxlbnwxfHx8fDE3NTY5MjkyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080" :
                                  activeDemo === "text" && index === 1 ? "https://images.unsplash.com/photo-1694878982093-25e8897ec9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBzY3JlZW58ZW58MXx8fHwxNzU2OTI5MjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080" :
                                  activeDemo === "results" && index === 0 ? "https://images.unsplash.com/photo-1660970781103-ba6749cb9ce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmljZSUyMGNvbXBhcmlzb24lMjBjaGFydCUyMGZpbmFuY2lhbHxlbnwxfHx8fDE3NTY5MjkyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080" :
                                  "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBjaGFydHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU2OTI5MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                                }
                                alt={step.image}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-medium text-sm shadow-lg">
                              {index + 1}
                            </div>
                          </div>
                          
                          <h4 className="text-lg font-medium mb-2">{step.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to analyze quotes and negotiate with confidence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="glass-card h-full hover:shadow-xl transition-all duration-300 hover:border-primary/30">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <div>
            <Badge className="bg-success/10 text-success border-success/30 mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Trusted & Secure
            </Badge>
            <h2 className="text-3xl md:text-4xl mb-4">
              Why Homeowners <span className="text-primary">Love</span> Our Service
            </h2>
          </div>
          
          <div className="space-y-4">
            {[
              {
                icon: Zap,
                title: "Instant Analysis",
                description: "Get results in 15 seconds or less - no waiting around"
              },
              {
                icon: Shield,
                title: "100% Private",
                description: "Your quotes never leave our secure system. No data sharing."
              },
              {
                icon: Clock,
                title: "Save Hours of Research", 
                description: "Skip calling around for quotes. Know fair pricing instantly."
              },
              {
                icon: Calculator,
                title: "Average Savings: $340",
                description: "Most customers save hundreds on their contractor projects"
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1666113604293-d34734339acb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwcmV2aWV3aW5nJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzU2OTMwMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="happy customer reviewing analysis"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="text-sm opacity-90">"Saved me $425 on electrical work!"</p>
          </div>
        </div>
      </motion.div>

      {/* Customer Testimonials */}
      <CustomerTestimonials variant="features" />

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center space-y-8"
      >
        <Card className="glass-card shadow-soft border-primary/20">
          <CardContent className="p-12">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl">
                Ready to Save Money on Your Next Project?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of homeowners who've stopped overpaying for contractor services. 
                Get started in seconds - no signup required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="sm:px-12 py-8 text-xl bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 shadow-lg hover:shadow-xl animate-pulse-glow"
                >
                  <Camera className="h-6 w-6 mr-3" />
                  Analyze My Quote Now
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Free • No signup • Results in 15 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}