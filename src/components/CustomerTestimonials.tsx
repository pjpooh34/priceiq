import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  age: number;
  service: string;
  savings: number;
  quote: string;
  rating: number;
  verified: boolean;
}

interface CustomerTestimonialsProps {
  variant?: "hero" | "results" | "features";
  title?: string;
  subtitle?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Margaret Chen",
    location: "Charlotte, NC",
    age: 67,
    service: "HVAC Repair",
    savings: 340,
    quote: "I just took a picture of the paper quote the repair man gave me, and within seconds I knew he was overcharging. The negotiation script helped me save over $300! So easy to use.",
    rating: 5,
    verified: true
  },
  {
    name: "Robert Williams",
    location: "Atlanta, GA", 
    age: 62,
    service: "Roof Repair",
    savings: 1200,
    quote: "Three contractors gave me wildly different prices. This app showed me exactly what was fair and what wasn't. Saved me from getting ripped off on a $5,000 job.",
    rating: 5,
    verified: true
  },
  {
    name: "Linda Thompson",
    location: "Tampa, FL",
    age: 59,
    service: "Plumbing",
    savings: 180,
    quote: "My daughter helped me set up the email forwarding. Now every quote gets analyzed automatically. It's like having an expert advisor in my pocket!",
    rating: 5,
    verified: true
  },
  {
    name: "Frank Rodriguez",
    location: "Phoenix, AZ",
    age: 71,
    service: "Electrical Work",
    savings: 425,
    quote: "I was skeptical about the technology, but texting a photo was so simple. Found out the electrician was charging double for parts. Negotiated it down immediately.",
    rating: 5,
    verified: true
  },
  {
    name: "Betty Johnson",
    location: "Miami, FL",
    age: 64,
    service: "Lawn Care",
    savings: 95,
    quote: "The clear breakdown helped me understand exactly what I was paying for. No more mystery charges or 'shop supplies' that cost more than the actual work!",
    rating: 5,
    verified: true
  },
  {
    name: "David Park",
    location: "Austin, TX",
    age: 58,
    service: "Painting",
    savings: 650,
    quote: "Got three quotes and they were all over the place. This service showed me which contractor was trying to take advantage. The scripts made negotiating so much easier.",
    rating: 5,
    verified: true
  }
];

export function CustomerTestimonials({ variant = "hero", title, subtitle }: CustomerTestimonialsProps) {
  const getTestimonialCount = () => {
    switch (variant) {
      case "hero": return 3;
      case "results": return 2; 
      case "features": return 6;
      default: return 3;
    }
  };

  const displayedTestimonials = testimonials.slice(0, getTestimonialCount());

  const defaultTitles = {
    hero: "Trusted by Thousands of Homeowners",
    results: "Join Other Happy Customers",
    features: "Real Stories from Real Customers"
  };

  const defaultSubtitles = {
    hero: "See why homeowners across the country trust us to get fair pricing",
    results: "You're in good company - here's what others are saying",
    features: "Over 50,000 homeowners have saved money using our service"
  };

  return (
    <div className="py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl mb-4"
        >
          {title || defaultTitles[variant]}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle || defaultSubtitles[variant]}
        </motion.p>
      </div>

      {/* Testimonials Grid */}
      <div className={`grid gap-8 ${variant === "features" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        {displayedTestimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group"
          >
            <Card className="glass-card h-full hover:shadow-xl transition-all duration-300 group-hover:border-primary/30">
              <CardContent className="p-6 h-full flex flex-col">
                {/* Quote */}
                <div className="flex-grow mb-6">
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                {/* Customer Info */}
                <div className="border-t border-border/50 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-base">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.location} • Age {testimonial.age}
                      </div>
                    </div>
                    {testimonial.verified && (
                      <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{testimonial.service}</span>
                    <div className="font-medium text-success">
                      Saved ${testimonial.savings}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-warning fill-warning" />
          <span>4.9/5 from 12,000+ reviews</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-success/10 text-success border-success/30">
            ✓ Verified Reviews
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span>Over $2.8M saved for customers</span>
        </div>
      </motion.div>
    </div>
  );
}