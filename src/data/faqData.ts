export interface FaqLink {
  label: string;
  type: 'navigate' | 'size-guide' | 'auth-modal' | 'category-filter';
  tab?: 'home' | 'catalog' | 'our-story' | 'cooperatives' | 'checkout' | 'account' | 'faqs';
  param?: string;
  filterCategory?: string;
}

export interface FaqItem {
  id: string;
  number: number;
  category: string;
  categorySlug: string;
  question: string;
  answer: string;
  links?: FaqLink[];
}

export const FAQ_CATEGORIES = [
  { slug: 'all', name: 'All Questions' },
  { slug: 'about', name: 'About Kora Threads' },
  { slug: 'products-sourcing', name: 'Products and Fabric Sourcing' },
  { slug: 'size-fit', name: 'Size and Fit' },
  { slug: 'orders-payments', name: 'Orders and Payments' },
  { slug: 'shipping-delivery', name: 'Shipping and Delivery' },
  { slug: 'returns-exchanges', name: 'Returns and Exchanges' },
  { slug: 'product-care', name: 'Product Care' },
  { slug: 'account-verification', name: 'Account and Phone Verification' },
] as const;

export const ALL_FAQS: FaqItem[] = [
  // =========================================================================
  // Category A: About Kora Threads (Q1 - Q4)
  // =========================================================================
  {
    id: 'faq-01',
    number: 1,
    category: 'About Kora Threads',
    categorySlug: 'about',
    question: 'What is Kora Threads?',
    answer: 'Kora Threads is a fictional Pune-based direct-to-consumer handloom clothing brand created for the Get Cited hackathon demonstration. This website is a prototype and does not represent a real operating store.',
    links: [
      { label: 'Read Our Story', type: 'navigate', tab: 'our-story' },
      { label: 'Explore Handloom Collections', type: 'navigate', tab: 'catalog', param: 'all' }
    ]
  },
  {
    id: 'faq-02',
    number: 2,
    category: 'About Kora Threads',
    categorySlug: 'about',
    question: 'Where is Kora Threads based?',
    answer: 'The case-study business is based in Pune, Maharashtra, India.',
    links: [
      { label: 'Our Story & Pune Heritage', type: 'navigate', tab: 'our-story' }
    ]
  },
  {
    id: 'faq-03',
    number: 3,
    category: 'About Kora Threads',
    categorySlug: 'about',
    question: 'What products does Kora Threads offer?',
    answer: 'The demonstration catalogue includes cotton kurtas priced from ₹1,800 to ₹4,200, stoles priced from ₹900 to ₹2,400, and a recently launched home-linen collection.',
    links: [
      { label: 'Cotton Kurtas (₹1,800–₹4,200)', type: 'navigate', tab: 'catalog', param: 'kurtas' },
      { label: 'Cotton Stoles (₹900–₹2,400)', type: 'navigate', tab: 'catalog', param: 'stoles' },
      { label: 'Home Linen Collection', type: 'navigate', tab: 'catalog', param: 'home-linen' }
    ]
  },
  {
    id: 'faq-04',
    number: 4,
    category: 'About Kora Threads',
    categorySlug: 'about',
    question: 'When was Kora Threads founded?',
    answer: 'The case-study brief describes Kora Threads as founded in 2021.',
    links: [
      { label: 'Our 2021 Founding Story', type: 'navigate', tab: 'our-story' }
    ]
  },

  // =========================================================================
  // Category B: Products and Fabric Sourcing (Q5 - Q9)
  // =========================================================================
  {
    id: 'faq-05',
    number: 5,
    category: 'Products and Fabric Sourcing',
    categorySlug: 'products-sourcing',
    question: 'Where does Kora Threads source its fabrics?',
    answer: 'According to the case-study brief, fabrics are sourced directly from weaver cooperatives in Maharashtra and Karnataka.',
    links: [
      { label: 'Craft & Sourcing Cooperatives', type: 'navigate', tab: 'cooperatives' },
      { label: 'View Pure Cotton Catalog', type: 'navigate', tab: 'catalog', param: 'all' }
    ]
  },
  {
    id: 'faq-06',
    number: 6,
    category: 'Products and Fabric Sourcing',
    categorySlug: 'products-sourcing',
    question: 'What makes Kora Threads different from other clothing brands?',
    answer: 'The case-study brand emphasizes direct sourcing from weaver cooperatives in Maharashtra and Karnataka, with a focus on handloom clothing and cotton products. Do not add unverified claims about certifications, environmental impact or artisan partnerships.',
    links: [
      { label: 'Weaver Cooperatives Alliance', type: 'navigate', tab: 'cooperatives' }
    ]
  },
  {
    id: 'faq-07',
    number: 7,
    category: 'Products and Fabric Sourcing',
    categorySlug: 'products-sourcing',
    question: 'Does Kora Threads sell only kurtas?',
    answer: 'No. The demonstration catalogue includes cotton kurtas, stoles and home linen.',
    links: [
      { label: 'Browse Cotton Kurtas', type: 'navigate', tab: 'catalog', param: 'kurtas' },
      { label: 'Browse Cotton Stoles', type: 'navigate', tab: 'catalog', param: 'stoles' },
      { label: 'Browse Home Linen', type: 'navigate', tab: 'catalog', param: 'home-linen' }
    ]
  },
  {
    id: 'faq-08',
    number: 8,
    category: 'Products and Fabric Sourcing',
    categorySlug: 'products-sourcing',
    question: 'Are all products made from 100% pure cotton?',
    answer: 'Do not claim that every product is 100% cotton unless the material composition has been verified for that individual product. Customers should refer to the material information shown on each product page.',
    links: [
      { label: 'View Product Material Specifications', type: 'navigate', tab: 'catalog', param: 'all' }
    ]
  },
  {
    id: 'faq-09',
    number: 9,
    category: 'Products and Fabric Sourcing',
    categorySlug: 'products-sourcing',
    question: 'Are the product images and colours exactly the same as the actual products?',
    answer: 'Colours may appear different depending on screen settings and lighting. As this is a fictional demonstration store, product images are illustrative and do not guarantee the appearance of a real product.'
  },

  // =========================================================================
  // Category C: Size and Fit (Q10 - Q13)
  // =========================================================================
  {
    id: 'faq-10',
    number: 10,
    category: 'Size and Fit',
    categorySlug: 'size-fit',
    question: 'How do I choose the correct kurta size?',
    answer: 'Open the Size Guide linked beside the size selector on the relevant kurta product page. Compare the listed measurements with a well-fitting garment before choosing a size.',
    links: [
      { label: 'Open Kurta Size Guide', type: 'size-guide' },
      { label: 'Browse Cotton Kurtas', type: 'navigate', tab: 'catalog', param: 'kurtas' }
    ]
  },
  {
    id: 'faq-11',
    number: 11,
    category: 'Size and Fit',
    categorySlug: 'size-fit',
    question: 'Does the Size Guide show body measurements or garment measurements?',
    answer: 'Clearly identify the measurement type shown in the chart. If the chart contains sample measurements that have not yet been verified, label them as sample measurements requiring confirmation.',
    links: [
      { label: 'View Measurement Chart Details', type: 'size-guide' }
    ]
  },
  {
    id: 'faq-12',
    number: 12,
    category: 'Size and Fit',
    categorySlug: 'size-fit',
    question: 'What should I do if I am between two sizes?',
    answer: 'Compare the garment measurements with a kurta that fits you comfortably and check the fit description on the product page. If the correct fit cannot be established, do not invent a size recommendation.',
    links: [
      { label: 'Check Size Guide & Ease Recommendations', type: 'size-guide' }
    ]
  },
  {
    id: 'faq-13',
    number: 13,
    category: 'Size and Fit',
    categorySlug: 'size-fit',
    question: 'Is the same size chart applicable to every product?',
    answer: 'No. Kurta sizing does not apply to stoles or home linen. Display the relevant size information only for products that actually have size options.',
    links: [
      { label: 'Cotton Stoles (Free-Size)', type: 'navigate', tab: 'catalog', param: 'stoles' },
      { label: 'Home Linen (Item Dimensions)', type: 'navigate', tab: 'catalog', param: 'home-linen' }
    ]
  },

  // =========================================================================
  // Category D: Orders and Payments (Q14 - Q17)
  // =========================================================================
  {
    id: 'faq-14',
    number: 14,
    category: 'Orders and Payments',
    categorySlug: 'orders-payments',
    question: 'Can I browse the website without creating an account?',
    answer: 'Yes. Customers should be able to browse the public storefront without signing in.',
    links: [
      { label: 'Browse Catalog as Guest', type: 'navigate', tab: 'catalog', param: 'all' }
    ]
  },
  {
    id: 'faq-15',
    number: 15,
    category: 'Orders and Payments',
    categorySlug: 'orders-payments',
    question: 'Can I check out as a guest?',
    answer: 'The website is intended to support guest checkout, as specified in the case study. Clearly distinguish a working checkout from a visual prototype if payment and order processing have not been implemented.',
    links: [
      { label: 'Go to Demonstration Checkout', type: 'navigate', tab: 'checkout' }
    ]
  },
  {
    id: 'faq-16',
    number: 16,
    category: 'Orders and Payments',
    categorySlug: 'orders-payments',
    question: 'Is cash on delivery available?',
    answer: 'Cash on delivery is part of the case-study scenario. Do not claim that real orders can be placed or fulfilled through this fictional store. If COD is implemented in the demo, require successful phone verification before confirming a COD order.',
    links: [
      { label: 'View COD Verification Flow', type: 'navigate', tab: 'checkout' }
    ]
  },
  {
    id: 'faq-17',
    number: 17,
    category: 'Orders and Payments',
    categorySlug: 'orders-payments',
    question: 'Why is phone verification required?',
    answer: 'Phone verification is intended to help confirm that a customer can access the submitted phone number and reduce errors associated with cash-on-delivery orders. It should not be presented as a guarantee against fraud.',
    links: [
      { label: 'MiniMoth Phone Verification', type: 'auth-modal' }
    ]
  },

  // =========================================================================
  // Category E: Shipping and Delivery (Q18 - Q21)
  // =========================================================================
  {
    id: 'faq-18',
    number: 18,
    category: 'Shipping and Delivery',
    categorySlug: 'shipping-delivery',
    question: 'Does Kora Threads deliver across India?',
    answer: 'The case-study brief specifies shipping within India. International delivery options have not been specified.',
    links: [
      { label: 'Browse Products with Domestic Delivery', type: 'navigate', tab: 'catalog', param: 'all' }
    ]
  },
  {
    id: 'faq-19',
    number: 19,
    category: 'Shipping and Delivery',
    categorySlug: 'shipping-delivery',
    question: 'How long does delivery take?',
    answer: 'The case-study estimate is 4–6 days. This is an estimated delivery window for the demonstration scenario, not a guaranteed delivery date.'
  },
  {
    id: 'faq-20',
    number: 20,
    category: 'Shipping and Delivery',
    categorySlug: 'shipping-delivery',
    question: 'Is shipping free?',
    answer: 'The case-study policy provides free shipping on orders above ₹2,000. Do not invent shipping charges for orders below that threshold; display the applicable charge only after it has been configured.',
    links: [
      { label: 'Browse Collections over ₹2,000', type: 'navigate', tab: 'catalog', param: 'kurtas' }
    ]
  },
  {
    id: 'faq-21',
    number: 21,
    category: 'Shipping and Delivery',
    categorySlug: 'shipping-delivery',
    question: 'Can I track my order?',
    answer: 'Only show live order tracking if it has actually been implemented. Otherwise, state that order tracking is not available in this demonstration prototype.'
  },

  // =========================================================================
  // Category F: Returns and Exchanges (Q22 - Q25)
  // =========================================================================
  {
    id: 'faq-22',
    number: 22,
    category: 'Returns and Exchanges',
    categorySlug: 'returns-exchanges',
    question: 'What is the return policy?',
    answer: 'According to the case-study brief, returns are accepted within 10 days if the item is unworn. This is a fictional demonstration policy, not a real-world return service.'
  },
  {
    id: 'faq-23',
    number: 23,
    category: 'Returns and Exchanges',
    categorySlug: 'returns-exchanges',
    question: 'Can I return an item after 10 days?',
    answer: 'The stated case-study return window is 10 days. Do not invent exceptions or claim that requests outside this period will be accepted.'
  },
  {
    id: 'faq-24',
    number: 24,
    category: 'Returns and Exchanges',
    categorySlug: 'returns-exchanges',
    question: 'Can I return a worn item?',
    answer: 'The case-study policy specifies that returned items must be unworn.'
  },
  {
    id: 'faq-25',
    number: 25,
    category: 'Returns and Exchanges',
    categorySlug: 'returns-exchanges',
    question: 'How do I request a return or refund?',
    answer: 'Explain the stated eligibility conditions, but clearly indicate that actual return pickup, refund processing and refund timelines are not available unless those features have been implemented.'
  },

  // =========================================================================
  // Category G: Product Care (Q26 - Q28)
  // =========================================================================
  {
    id: 'faq-26',
    number: 26,
    category: 'Product Care',
    categorySlug: 'product-care',
    question: 'How should I wash my cotton kurta?',
    answer: 'Follow the care instructions provided for the individual product. Do not prescribe a universal washing method or promise that a garment will not shrink or fade without verified product-specific information.',
    links: [
      { label: 'Check Kurta Care Instructions', type: 'navigate', tab: 'catalog', param: 'kurtas' }
    ]
  },
  {
    id: 'faq-27',
    number: 27,
    category: 'Product Care',
    categorySlug: 'product-care',
    question: 'How should I care for a handloom stole?',
    answer: 'Refer to the care instructions for the specific stole. Do not assume that all fabrics require the same washing, drying or ironing method.',
    links: [
      { label: 'Check Stole Care Instructions', type: 'navigate', tab: 'catalog', param: 'stoles' }
    ]
  },
  {
    id: 'faq-28',
    number: 28,
    category: 'Product Care',
    categorySlug: 'product-care',
    question: 'How should I care for home-linen products?',
    answer: 'Use the product-specific care label and instructions. Do not invent fabric compositions or care guarantees.',
    links: [
      { label: 'Check Home Linen Care Labels', type: 'navigate', tab: 'catalog', param: 'home-linen' }
    ]
  },

  // =========================================================================
  // Category H: Account and Phone Verification (Q29 - Q32)
  // =========================================================================
  {
    id: 'faq-29',
    number: 29,
    category: 'Account and Phone Verification',
    categorySlug: 'account-verification',
    question: 'How does phone-number verification work?',
    answer: 'The website is designed to use MiniMoth for OTP verification and session management. Describe the verification flow as operational only after the MiniMoth API has been integrated and tested successfully.',
    links: [
      { label: 'MiniMoth OTP Verification Modal', type: 'auth-modal' }
    ]
  },
  {
    id: 'faq-30',
    number: 30,
    category: 'Account and Phone Verification',
    categorySlug: 'account-verification',
    question: 'What should I do if I do not receive an OTP?',
    answer: 'If OTP functionality is implemented, provide clear instructions to check the phone number, wait briefly and use the resend option when available. Show meaningful error messages and a resend cooldown. Do not display a fake successful verification message.',
    links: [
      { label: 'Test MiniMoth Phone Verification', type: 'auth-modal' }
    ]
  },
  {
    id: 'faq-31',
    number: 31,
    category: 'Account and Phone Verification',
    categorySlug: 'account-verification',
    question: 'Is my phone number stored on the website?',
    answer: 'Explain the actual data-handling process based on the implemented authentication and storage systems. Do not claim that personal data is never stored or shared unless that has been verified. Link to the privacy notice.'
  },
  {
    id: 'faq-32',
    number: 32,
    category: 'Account and Phone Verification',
    categorySlug: 'account-verification',
    question: 'Can I sign out of my account?',
    answer: 'Provide a working sign-out option that invalidates or ends the relevant session when account functionality is implemented.',
    links: [
      { label: 'Go to My Account & Sign Out', type: 'navigate', tab: 'account' }
    ]
  }
];
