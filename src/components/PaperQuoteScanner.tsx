import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { 
  Camera, 
  ScanLine, 
  CheckCircle, 
  AlertTriangle, 
  RotateCcw,
  Zap,
  Eye,
  Sun
} from "lucide-react";
import { Badge } from "./ui/badge";

interface PaperQuoteScannerProps {
  onPhotoCapture: (file: File) => void;
  loading?: boolean;
}

export function PaperQuoteScanner({ onPhotoCapture, loading }: PaperQuoteScannerProps) {
  const [capturedPhoto, setCapturedPhoto] = useState<string>("");
  const [scanProgress, setScanProgress] = useState(0);
  const [qualityCheck, setQualityCheck] = useState<{
    brightness: "good" | "dark" | "bright";
    blur: "sharp" | "blurry";
    angle: "straight" | "tilted";
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate quality analysis
      setScanProgress(0);
      const url = URL.createObjectURL(file);
      setCapturedPhoto(url);
      
      // Simulate processing
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Mock quality analysis results
            setQualityCheck({
              brightness: Math.random() > 0.8 ? "dark" : "good",
              blur: Math.random() > 0.9 ? "blurry" : "sharp",
              angle: Math.random() > 0.85 ? "tilted" : "straight"
            });
            return 100;
          }
          return prev + 8;
        });
      }, 100);

      onPhotoCapture(file);
    }
  };

  const handleRetake = () => {
    setCapturedPhoto("");
    setScanProgress(0);
    setQualityCheck(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const tips = [
    {
      icon: Sun,
      text: "Use good lighting - avoid shadows",
      color: "text-warning"
    },
    {
      icon: Eye,
      text: "Make sure all text is visible",
      color: "text-info"
    },
    {
      icon: ScanLine,
      text: "Hold phone steady and straight",
      color: "text-success"
    }
  ];

  const getQualityColor = (status: string) => {
    if (status === "good" || status === "sharp" || status === "straight") return "text-success";
    return "text-warning";
  };

  const getQualityIcon = (status: string) => {
    if (status === "good" || status === "sharp" || status === "straight") return CheckCircle;
    return AlertTriangle;
  };

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
              <Camera className="h-6 w-6 text-primary" />
              Scan Your Paper Quote
            </CardTitle>
          </motion.div>
          <p className="text-muted-foreground text-lg">
            Take a clear photo of your written estimate for instant analysis
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!capturedPhoto ? (
            <>
              {/* Photo Tips */}
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quick Tips for Best Results
                </h3>
                <div className="grid gap-3">
                  {tips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-3"
                      >
                        <Icon className={`h-5 w-5 ${tip.color}`} />
                        <span className="text-base">{tip.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Capture Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => cameraInputRef.current?.click()}
                    className="w-full h-20 text-lg bg-gradient-to-br from-primary to-info hover:from-primary/90 hover:to-info/90 shadow-lg flex-col gap-2"
                    size="lg"
                  >
                    <Camera className="h-6 w-6" />
                    Take Photo
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full h-20 text-lg flex-col gap-2 border-primary/30 hover:bg-primary/5"
                    size="lg"
                  >
                    <ScanLine className="h-6 w-6" />
                    Choose from Gallery
                  </Button>
                </motion.div>
              </div>
            </>
          ) : (
            <>
              {/* Photo Preview */}
              <div className="relative">
                <img
                  src={capturedPhoto}
                  alt="Captured quote"
                  className="w-full max-h-80 object-contain rounded-lg border mx-auto"
                />
                
                {scanProgress < 100 && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 text-center min-w-64">
                      <motion.div
                        className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="mb-2">Analyzing photo quality...</p>
                      <Progress value={scanProgress} className="h-2" />
                      <p className="text-sm text-muted-foreground mt-2">{scanProgress}%</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quality Check Results */}
              {qualityCheck && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-muted/30 rounded-xl p-6"
                >
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Photo Quality Check
                  </h3>
                  
                  <div className="grid gap-3">
                    {Object.entries(qualityCheck).map(([key, value]) => {
                      const Icon = getQualityIcon(value);
                      const color = getQualityColor(value);
                      const labels = {
                        brightness: "Lighting",
                        blur: "Sharpness", 
                        angle: "Alignment"
                      };
                      
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-base">{labels[key as keyof typeof labels]}</span>
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${color}`} />
                            <Badge variant={value === "good" || value === "sharp" || value === "straight" ? "default" : "secondary"}>
                              {value}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {Object.values(qualityCheck).some(v => v !== "good" && v !== "sharp" && v !== "straight") && (
                    <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                      <p className="text-sm text-warning-foreground">
                        <strong>Tip:</strong> For better accuracy, consider retaking with improved lighting or steadier positioning.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleRetake}
                  variant="outline"
                  className="flex-1 h-12 text-lg"
                  disabled={loading}
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Retake Photo
                </Button>
                
                <Button
                  className="flex-1 h-12 text-lg bg-gradient-to-r from-success to-green-600 hover:from-success/90 hover:to-green-600/90"
                  disabled={loading}
                  onClick={() => {
                    // Photo is already processed, just show loading state
                  }}
                >
                  {loading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Use This Photo
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {/* Hidden inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoCapture}
            className="hidden"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoCapture}
            className="hidden"
          />
        </CardContent>
      </Card>
    </div>
  );
}