import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  FileText, 
  Mail, 
  MessageSquare, 
  Globe, 
  Phone, 
  QrCode,
  Shield,
  Clock
} from "lucide-react";

interface QuoteIntakeMethodProps {
  onMethodSelect: (method: string) => void;
}

export function QuoteIntakeMethod({ onMethodSelect }: QuoteIntakeMethodProps) {
  const methods = [
    {
      id: "paper",
      title: "Paper Quote",
      description: "I have a printed estimate or written quote",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      badge: "Most Common",
      popular: true
    },
    {
      id: "email",
      title: "Email or PDF",
      description: "Quote was sent to my email or as a PDF attachment",
      icon: Mail,
      color: "from-green-500 to-green-600",
      badge: "Easy Setup"
    },
    {
      id: "text",
      title: "Text Message",
      description: "Photo of estimate sent via text message",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
      badge: "Instant"
    },
    {
      id: "portal",
      title: "Website Link",
      description: "Quote is on a contractor's website or portal",
      icon: Globe,
      color: "from-orange-500 to-orange-600",
      badge: "We'll Help"
    },
    {
      id: "phone",
      title: "Phone Call",
      description: "Quote given over the phone or voicemail",
      icon: Phone,
      color: "from-red-500 to-red-600",
      badge: "Quick Entry"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <QrCode className="h-4 w-4" />
            Step 1 of 2
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
            How did you get your quote?
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose how you received your contractor's estimate so we can help you analyze it
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-success" />
              <span>Results in 15 seconds</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Method Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {methods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer"
              onClick={() => onMethodSelect(method.id)}
            >
              <Card className="glass-card hover:shadow-xl transition-all duration-300 group-hover:border-primary/30 h-full relative overflow-hidden">
                {method.popular && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                      {method.badge}
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl mb-3 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed flex-grow text-lg">
                    {method.description}
                  </p>
                  
                  {!method.popular && method.badge && (
                    <div className="mt-4">
                      <Badge variant="outline" className="text-xs">
                        {method.badge}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Help Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <div className="bg-muted/30 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Not sure? <strong>Paper Quote</strong> works for photos of any written estimate. 
            We'll guide you through taking a clear photo.
          </p>
        </div>
      </motion.div>
    </div>
  );
}