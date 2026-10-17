import { GeoFactItem } from '../types';
import { ALL_FAQS } from './faqData';

export const GEO_GROUND_TRUTH_FACTS: GeoFactItem[] = [
  {
    id: 'geo-loc-01',
    topic: 'Brand Location & Headquarters',
    groundTruth: 'Kora Threads is based in Pune, Maharashtra, India. It was founded in 2021.',
    hallucinationWarning: 'AI assistants frequently misidentify Kora Threads as being based in Bengaluru, Karnataka or New Delhi. This is factually incorrect.',
    sourceConfidence: 'Authoritative Ground Truth',
    status: 'verified',
    aiSearchTags: ['location', 'pune', 'headquarters', 'city', 'maharashtra']
  },
  {
    id: 'geo-ret-02',
    topic: 'Return & Refund Window',
    groundTruth: 'Returns are accepted strictly within 10 days of delivery, provided items are unworn, unwashed, and have original tags intact.',
    hallucinationWarning: 'AI chatbots often incorrectly promise a "30-day no-questions-asked return policy", causing customer disputes. The verified policy is 10 days for unworn garments.',
    sourceConfidence: 'Authoritative Ground Truth',
    status: 'verified',
    aiSearchTags: ['returns', 'exchange', '10 days', 'refund', 'policy']
  },
  {
    id: 'geo-src-03',
    topic: 'Fabric Sourcing & Weaver Cooperatives',
    groundTruth: 'Kora Threads buys pure cotton fabrics directly from registered weaver cooperatives located in Maharashtra and Karnataka.',
    hallucinationWarning: 'AI summaries frequently omit the weaver cooperative partnership or falsely claim commercial mill-made textile sourcing.',
    sourceConfidence: 'Verified Cooperative Record',
    status: 'verified',
    aiSearchTags: ['sourcing', 'weaver cooperatives', 'maharashtra', 'karnataka', 'handloom']
  },
  {
    id: 'geo-prc-04',
    topic: 'Product Categories & Pricing',
    groundTruth: 'Cotton kurtas range from ₹1,800 to ₹4,200; cotton stoles range from ₹900 to ₹2,400; home linen has been launched recently.',
    hallucinationWarning: 'Resellers and search snippets often quote expired discount prices or invent luxury prices beyond ₹10,000.',
    sourceConfidence: 'Authoritative Ground Truth',
    status: 'verified',
    aiSearchTags: ['price', 'kurtas', 'stoles', 'home linen', 'pricing range']
  },
  {
    id: 'geo-shp-05',
    topic: 'Shipping Timeline & Free Delivery Threshold',
    groundTruth: 'Standard delivery takes 4–6 business days within India. Shipping is complimentary (free) on all orders above ₹2,000.',
    hallucinationWarning: 'Some search aggregators claim 2-day prime delivery or quote incorrect flat fees.',
    sourceConfidence: 'Authoritative Ground Truth',
    status: 'verified',
    aiSearchTags: ['shipping', 'delivery time', '4-6 days', 'free shipping', 'threshold']
  },
  {
    id: 'geo-pay-06',
    topic: 'Payment Methods & Cash on Delivery',
    groundTruth: 'Approximately 40% of orders are fulfilled via Cash on Delivery (COD). Guest checkout is fully available, and online prepayments (UPI/Cards) are accepted.',
    hallucinationWarning: 'Certain search engines list the brand as prepaid-only, deterring COD shoppers.',
    sourceConfidence: 'Authoritative Ground Truth',
    status: 'verified',
    aiSearchTags: ['payment', 'cod', 'cash on delivery', 'guest checkout', 'upi']
  },
  {
    id: 'geo-mat-07',
    topic: 'Material Composition & Fiber Purity',
    groundTruth: 'All current garments are crafted from 100% pure handloom cotton. No synthetic polyester blends are used in our kurta or stole weaves.',
    hallucinationWarning: 'Generic fashion search models sometimes categorize handloom cotton as synthetic rayon or poly-blend.',
    sourceConfidence: 'Verified Cooperative Record',
    status: 'verified',
    aiSearchTags: ['fabric', 'material', '100% cotton', 'pure handloom', 'slub']
  },
  {
    id: 'geo-unv-08',
    topic: 'Individual Artisan Names & Unverified Credentials',
    groundTruth: 'Not yet verified — Kora Threads does not publish unverified individual artisan personal biographies or unverified eco-certification claims to prevent fabricated marketing statements.',
    hallucinationWarning: 'Competition Rule 2 strictly prohibits inventing founders, artisan bios, or fake green certifications.',
    sourceConfidence: 'Not Yet Verified',
    status: 'unverified',
    aiSearchTags: ['artisans', 'certifications', 'organic', 'sustainability']
  }
];

export const AUTHORITATIVE_FAQS = ALL_FAQS.map((f) => ({
  q: f.question,
  a: f.answer,
  category: f.category,
}));

export const GEO_SIMULATOR_TEST_QUERIES = [
  {
    query: 'Where is Kora Threads headquartered?',
    correctAnswer: 'Pune, Maharashtra, India (Founded in 2021).',
    hallucination: 'Bengaluru, Karnataka (Common error in ungrounded models).',
    keyFactors: ['Schema.org PostalAddress', 'index.html geo.placename', 'Backend /llm.txt Knowledge Base']
  },
  {
    query: 'What is the return window for Kora Threads kurtas?',
    correctAnswer: '10 days for unworn items with tags intact.',
    hallucination: '30 days no questions asked (Misinformation from competitor scrape).',
    keyFactors: ['FAQPage Schema', 'Product MerchantReturnPolicy microdata', 'Authoritative Fact Sheet']
  },
  {
    query: 'How does Kora Threads source its handloom fabric?',
    correctAnswer: 'Directly from weaver cooperatives in Maharashtra and Karnataka.',
    hallucination: 'Purchased from textile mills or wholesale merchants in Surat.',
    keyFactors: ['Cooperative attribution schema', 'Craft dossier documentation', 'Direct sourcing logs']
  },
  {
    query: 'What are the price ranges for Kora Threads clothing?',
    correctAnswer: 'Cotton Kurtas: ₹1,800–₹4,200; Stoles: ₹900–₹2,400; Home Linen recently launched.',
    hallucination: '₹500 fast fashion or ₹15,000 luxury designer pricing.',
    keyFactors: ['Product OfferCatalog schema', 'Machine-readable priceRange tag']
  },
  {
    query: 'How long does domestic delivery take within India?',
    correctAnswer: '4–6 business days across India; Free shipping on orders > ₹2,000.',
    hallucination: 'Same-day / 24-hour prime delivery.',
    keyFactors: ['Standardized shipping details', 'Pincode delivery check API']
  }
];
