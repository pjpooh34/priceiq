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
  quoteAnalysis?: {
    contractorName?: string;
    totalAmount: number;
    lineItems?: Array<{ description: string; amount: number; isOverpriced?: boolean }>;
    overallAssessment: "Fair" | "Overpriced" | "Underpriced" | "Suspicious";
    potentialSavings?: number;
    redFlags?: string[];
  };
}

// Mock price data for different services
const mockPriceData: Record<string, { low: number; high: number; factors: string[] }> = {
  plumbing: {
    low: 150,
    high: 400,
    factors: ["Material costs", "Labor complexity", "Emergency timing", "Local market rates"]
  },
  roofing: {
    low: 5000,
    high: 15000,
    factors: ["Roof size", "Material type", "Accessibility", "Weather conditions", "Local permits"]
  },
  hvac: {
    low: 300,
    high: 800,
    factors: ["System type", "Unit size", "Installation complexity", "Ductwork needs"]
  },
  electrical: {
    low: 200,
    high: 600,
    factors: ["Wire complexity", "Code requirements", "Panel capacity", "Material costs"]
  },
  "lawn care": {
    low: 50,
    high: 200,
    factors: ["Yard size", "Service frequency", "Seasonal factors", "Equipment needs"]
  },
  painting: {
    low: 300,
    high: 1200,
    factors: ["Room size", "Paint quality", "Surface prep", "Number of coats"]
  },
  flooring: {
    low: 800,
    high: 4000,
    factors: ["Material type", "Square footage", "Subfloor condition", "Installation complexity"]
  },
  "general repair": {
    low: 100,
    high: 500,
    factors: ["Repair complexity", "Material costs", "Time requirements", "Skill level needed"]
  }
};

const generateNegotiationScripts = (service: string, priceRange: { low: number; high: number }) => {
  const lowPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(priceRange.low);
  const highPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(priceRange.high);

  return {
    friendly: `Hi! Thank you for the quote on the ${service} work. I've done some research and found that similar projects in our area typically run between ${lowPrice} and ${highPrice}. Your quote seems a bit higher than what I was expecting. Would you be able to work with me on the pricing? I'm hoping we can find a fair price that works for both of us. Thanks for your time!`,
    
    professional: `Thank you for providing the quote for the ${service} project. Based on my research of local market rates, comparable projects typically range from ${lowPrice} to ${highPrice}. I would appreciate the opportunity to discuss your pricing and see if there's flexibility to align with market standards. Could we schedule a time to review the quote details?`,
    
    firm: `I received your quote for the ${service} work. After researching local market rates, I found that similar projects typically cost between ${lowPrice} and ${highPrice}. Your quote appears to be above market rate. I'm prepared to move forward quickly with the right contractor at a fair price point. Can you provide a revised quote that's more competitive with current market rates?`
  };
};

const negotiationTips = [
  "Get at least 3 quotes to compare pricing and scope",
  "Ask for a detailed breakdown of materials and labor costs",
  "Be prepared to walk away if the price isn't right",
  "Consider timing - off-season work often costs less",
  "Ask about package deals if you have multiple projects",
  "Verify licenses and insurance before committing",
  "Get everything in writing before work begins"
];

export const mockAnalyzeService = async (data: ServiceRequestData): Promise<ResultsData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const serviceKey = data.serviceType.toLowerCase();
  const priceData = mockPriceData[serviceKey] || mockPriceData["general repair"];
  
  // Add some variation based on urgency
  let adjustedPrices = { ...priceData };
  if (data.urgency === "asap") {
    adjustedPrices.low = Math.round(priceData.low * 1.2);
    adjustedPrices.high = Math.round(priceData.high * 1.3);
  }

  // Determine confidence based on description length and service type
  let confidence: "High" | "Medium" | "Low" = "Medium";
  if (data.description.length > 100 && mockPriceData[serviceKey]) {
    confidence = "High";
  } else if (data.description.length < 50 || !mockPriceData[serviceKey]) {
    confidence = "Low";
  }

  const scripts = generateNegotiationScripts(data.serviceType, adjustedPrices);

  return {
    service: data.serviceType,
    location: `ZIP ${data.zipCode}`,
    priceRange: {
      low: adjustedPrices.low,
      high: adjustedPrices.high
    },
    factors: adjustedPrices.factors,
    confidence,
    negotiationScript: scripts,
    tips: negotiationTips.slice(0, 5) // Show first 5 tips
  };
};

export const mockAnalyzeQuote = async (data: QuoteUploadData): Promise<ResultsData> => {
  // Simulate API delay for OCR and analysis
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Mock OCR results - in reality this would analyze the uploaded image
  const mockQuoteData = {
    service: "Plumbing", // Would be extracted from image
    quotedPrice: 850,
    breakdown: [
      { item: "Labor (4 hours)", price: 400, isOverpriced: false },
      { item: "Pipe materials", price: 120, isOverpriced: false },
      { item: "Emergency service fee", price: 150, isOverpriced: true },
      { item: "Fixture installation", price: 180, isOverpriced: true }
    ]
  };

  const serviceKey = mockQuoteData.service.toLowerCase();
  const priceData = mockPriceData[serviceKey] || mockPriceData["plumbing"];
  
  // Determine if quote is overpriced
  const isOverpriced = mockQuoteData.quotedPrice > priceData.high;
  const potentialSavings = isOverpriced ? mockQuoteData.quotedPrice - priceData.high : 0;
  
  const assessment: "Fair" | "Overpriced" | "Underpriced" | "Suspicious" = 
    mockQuoteData.quotedPrice > priceData.high * 1.3 ? "Suspicious" :
    mockQuoteData.quotedPrice > priceData.high ? "Overpriced" :
    mockQuoteData.quotedPrice < priceData.low * 0.7 ? "Underpriced" : "Fair";

  const redFlags = [];
  if (mockQuoteData.quotedPrice > priceData.high * 1.5) {
    redFlags.push("Quote is significantly above market rate");
  }
  if (mockQuoteData.breakdown.some(item => item.item.toLowerCase().includes("emergency") && item.price > 100)) {
    redFlags.push("High emergency service fee - may not be necessary");
  }

  const scripts = generateNegotiationScriptsForQuote(mockQuoteData.service, priceData, mockQuoteData.quotedPrice);

  return {
    service: mockQuoteData.service,
    location: `ZIP ${data.zipCode}`,
    priceRange: {
      low: priceData.low,
      high: priceData.high
    },
    factors: priceData.factors,
    confidence: "High",
    negotiationScript: scripts,
    tips: [
      "Point out specific overpriced line items from your quote",
      "Ask for justification on emergency fees if work isn't urgent",
      "Request itemized breakdown if not provided",
      "Get competing quotes to strengthen your position",
      "Be willing to walk away if they won't negotiate"
    ],
    quoteAnalysis: {
      contractorName: data.contractorName,
      totalAmount: mockQuoteData.quotedPrice,
      lineItems: mockQuoteData.breakdown.map(item => ({
        description: item.item,
        amount: item.price,
        isOverpriced: item.isOverpriced
      })),
      overallAssessment: assessment,
      potentialSavings: potentialSavings > 0 ? potentialSavings : undefined,
      redFlags: redFlags.length > 0 ? [
        "High emergency service fee - may not be necessary",
        "Fixture installation pricing above market rate",
        "No itemized materials breakdown provided"
      ] : undefined
    }
  };
};

const generateNegotiationScriptsForQuote = (service: string, priceRange: { low: number; high: number }, quotedPrice: number) => {
  const lowPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(priceRange.low);
  const highPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(priceRange.high);
  const quoted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(quotedPrice);

  const isOverpriced = quotedPrice > priceRange.high;
  
  if (isOverpriced) {
    return {
      friendly: `Hi! Thanks for the detailed quote. I've been researching ${service} costs in our area and found that similar projects typically run between ${lowPrice} and ${highPrice}. Your quote of ${quoted} seems higher than the local average. I really like working with you, but I'm hoping we can find a way to get closer to market rates. Could we discuss adjusting some of the line items?`,
      
      professional: `Thank you for the comprehensive quote. After reviewing local market data for ${service} projects, I've found that comparable work typically ranges from ${lowPrice} to ${highPrice}. Your quote of ${quoted} exceeds the typical market range. I'd like to discuss specific line items to understand the pricing and explore options to align with market standards.`,
      
      firm: `I've received your quote of ${quoted} for the ${service} work. My research shows that similar projects in this area typically cost between ${lowPrice} and ${highPrice}. Your quote is significantly above market rate. I need you to either justify the premium pricing with specific value-adds or revise the quote to be more competitive. I'm prepared to move forward quickly with a fair-priced contractor.`
    };
  } else {
    return {
      friendly: `Thanks for the quote! The pricing of ${quoted} looks reasonable compared to market rates of ${lowPrice} to ${highPrice}. I appreciate the competitive pricing. Just to confirm, could we review the timeline and make sure we're aligned on all the details?`,
      
      professional: `Thank you for the quote. At ${quoted}, your pricing falls within the expected market range of ${lowPrice} to ${highPrice}. I'd like to proceed with finalizing the details and timeline for the project.`,
      
      firm: `Your quote of ${quoted} is within acceptable market range. Let's finalize the contract terms and project timeline so we can move forward.`
    };
  }
};