import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { Camera, Upload, X, FileImage, Sparkles } from "lucide-react";

interface QuoteUploadData {
  quotePhoto: File;
  zipCode: string;
  contractorName?: string;
}

interface QuoteUploadFormProps {
  onSubmit: (data: QuoteUploadData) => void;
  loading?: boolean;
}

export function QuoteUploadForm({ onSubmit, loading }: QuoteUploadFormProps) {
  const [formData, setFormData] = useState<{
    quotePhoto?: File;
    zipCode: string;
    contractorName: string;
  }>({
    zipCode: "",
    contractorName: ""
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.quotePhoto && formData.zipCode) {
      onSubmit({
        quotePhoto: formData.quotePhoto,
        zipCode: formData.zipCode,
        contractorName: formData.contractorName
      });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 50);

    setFormData(prev => ({ ...prev, quotePhoto: file }));
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      processFile(imageFile);
    }
  }, []);

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearPhoto = () => {
    setFormData(prev => ({ ...prev, quotePhoto: undefined }));
    setPreviewUrl("");
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="max-w-2xl mx-auto glass-card shadow-soft">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CardTitle className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Upload Your Contractor Quote
            </CardTitle>
          </motion.div>
          <p className="text-muted-foreground">
            Take a photo or upload an image of your contractor's written estimate for instant analysis
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload Section */}
            <div className="space-y-4">
              <Label>Quote Photo *</Label>
              
              <AnimatePresence mode="wait">
                {!formData.quotePhoto ? (
                  <motion.div
                    key="upload-area"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                      isDragOver
                        ? 'border-primary bg-primary/5 scale-105'
                        : 'border-border hover:border-primary/50 hover:bg-primary/2'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-center space-y-4">
                      <motion.div
                        animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
                        className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-info/10 rounded-full flex items-center justify-center"
                      >
                        <FileImage className="h-8 w-8 text-primary" />
                      </motion.div>
                      
                      <div>
                        <p className="text-lg mb-1">
                          {isDragOver ? 'Drop your quote here!' : 'Drag & drop your quote'}
                        </p>
                        <p className="text-sm text-muted-foreground">or choose from the options below</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCameraClick}
                            className="w-full h-24 flex-col space-y-2 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 hover:from-primary/10 hover:to-primary/20 transition-all"
                          >
                            <Camera className="h-6 w-6 text-primary" />
                            <span>Take Photo</span>
                          </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleUploadClick}
                            className="w-full h-24 flex-col space-y-2 bg-gradient-to-br from-info/5 to-info/10 border-info/20 hover:border-info/40 hover:from-info/10 hover:to-info/20 transition-all"
                          >
                            <Upload className="h-6 w-6 text-info" />
                            <span>Upload Image</span>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <div className="relative bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-4 border">
                      <img
                        src={previewUrl}
                        alt="Uploaded quote"
                        className="w-full max-h-64 object-contain rounded-lg mx-auto"
                      />
                      <motion.button
                        type="button"
                        onClick={clearPhoto}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-2 shadow-lg hover:bg-destructive/90 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                      
                      {uploadProgress < 100 && uploadProgress > 0 && (
                        <div className="mt-3">
                          <Progress value={uploadProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1 text-center">
                            Processing... {uploadProgress}%
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hidden file inputs */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              
              <p className="text-sm text-muted-foreground">
                Make sure the quote is clearly visible with good lighting. Include all line items and totals.
              </p>
            </div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <Label htmlFor="zipCode">Your Zip Code *</Label>
            <Input
              id="zipCode"
              placeholder="Enter your zip code"
              value={formData.zipCode}
              onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
              className="transition-all focus:scale-[1.02] focus:shadow-lg"
            />
            <p className="text-sm text-muted-foreground">
              Used to compare against local market rates
            </p>
          </motion.div>

          {/* Optional contractor name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <Label htmlFor="contractorName">Contractor Name (Optional)</Label>
            <Input
              id="contractorName"
              placeholder="Name of the contractor or company"
              value={formData.contractorName}
              onChange={(e) => setFormData(prev => ({ ...prev, contractorName: e.target.value }))}
              className="transition-all focus:scale-[1.02] focus:shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:hover:scale-100" 
              disabled={loading || !formData.quotePhoto || !formData.zipCode}
            >
              {loading ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Analyzing Quote...
                </motion.div>
              ) : (
                "Analyze My Quote"
              )}
            </Button>
          </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}