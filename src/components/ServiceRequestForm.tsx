import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface ServiceRequestData {
  serviceType: string;
  description: string;
  zipCode: string;
  urgency: string;
  photo?: File;
}

interface ServiceRequestFormProps {
  onSubmit: (data: ServiceRequestData) => void;
  loading?: boolean;
}

const serviceTypes = [
  "Plumbing",
  "Roofing",
  "HVAC",
  "Electrical",
  "Lawn Care",
  "Painting",
  "Flooring",
  "Kitchen Remodel",
  "Bathroom Remodel",
  "General Repair",
  "Other"
];

const urgencyOptions = [
  { value: "asap", label: "ASAP (Emergency)" },
  { value: "week", label: "Within a week" },
  { value: "month", label: "Within a month" },
  { value: "flexible", label: "Flexible timing" }
];

export function ServiceRequestForm({ onSubmit, loading }: ServiceRequestFormProps) {
  const [formData, setFormData] = useState<ServiceRequestData>({
    serviceType: "",
    description: "",
    zipCode: "",
    urgency: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.serviceType && formData.description && formData.zipCode) {
      onSubmit(formData);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tell us about your service request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="serviceType">Service Type *</Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service.toLowerCase()}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Describe what you need *</Label>
            <Textarea
              id="description"
              placeholder="Please describe the work you need done in detail. Include any materials, size of area, current condition, etc."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="zipCode">Zip Code *</Label>
            <Input
              id="zipCode"
              placeholder="Enter your zip code"
              value={formData.zipCode}
              onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="urgency">Timeline</Label>
            <Select
              value={formData.urgency}
              onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="When do you need this done?" />
              </SelectTrigger>
              <SelectContent>
                {urgencyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="photo">Photo (Optional)</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Upload a photo to help us provide more accurate estimates
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !formData.serviceType || !formData.description || !formData.zipCode}
          >
            {loading ? "Analyzing..." : "Get My Price Estimate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}