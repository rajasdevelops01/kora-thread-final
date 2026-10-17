import { Product } from '../types';
import { ASSETS } from '../assets/images';

export const PRODUCTS: Product[] = [
  // =========================================================================
  // CATEGORY A: COTTON KURTAS (₹1,800 to ₹4,200)
  // =========================================================================
  {
    id: 'kora-krt-01',
    name: 'Solapur Textured Kora Cotton Kurta',
    slug: 'solapur-textured-kora-cotton-kurta',
    category: 'kurtas',
    price: 2450,
    originalPrice: 2800,
    tagline: 'Raw unbleached ecru cotton slub woven on traditional wooden pit-looms in Solapur.',
    description: 'A breathable relaxed-fit kurta crafted from hand-spun and hand-woven 100% pure cotton. Retains the natural kora texture with authentic slub variations that soften with every wash. Designed with a clean band collar, hand-turned neem wood buttons, and tailored side welt pockets.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Solapur District Handloom Weavers Sahakari Society',
      region: 'Maharashtra',
      location: 'Solapur, Maharashtra'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    careInstructions: [
      'Gentle hand wash in cold water with mild liquid detergent',
      'Wash dark colors separately for the first two washes',
      'Dry in shade inside-out to preserve fabric luster',
      'Warm iron while slightly damp'
    ],
    features: [
      'Unbleached natural ecru cotton yarn',
      'Hand-carved natural neem wood buttons',
      'Functional side welt pockets with reinforced stitching',
      'Pre-washed pure cotton to minimize shrinkage'
    ],
    images: [
      ASSETS.kurtas.solapur,
      ASSETS.editorial.yarnTexture
    ],
    inStock: true,
    sku: 'KT-KRT-SOL-01'
  },
  {
    id: 'kora-krt-02',
    name: 'Ilkal Chikki Paras Indigo Cotton Kurta',
    slug: 'ilkal-chikki-paras-indigo-cotton-kurta',
    category: 'kurtas',
    price: 3800,
    tagline: 'Traditional Karnataka border motif woven on pure count cotton.',
    description: 'Honoring the centuries-old weaving tradition of Ilkal, Bagalkot district. Features signature red and white geometric temple border (Chikki Paras) accents along the placket and cuffs on rich indigo pure handloom cotton.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Ilkal Weavers Co-operative Production & Sale Society',
      region: 'Karnataka',
      location: 'Ilkal, Bagalkot District, Karnataka'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    careInstructions: [
      'Hand wash separately in cold water',
      'Do not soak for more than 10 minutes',
      'Do not bleach or wring',
      'Line dry in shade'
    ],
    features: [
      'Signature Ilkal geometric border weave on cuffs & placket',
      'Mandarin collar with concealed button stand',
      'Structured side slits for ease of movement',
      'High-twist count cotton for maximum breathability'
    ],
    images: [
      ASSETS.kurtas.ilkal,
      ASSETS.stoles.ilkal
    ],
    inStock: true,
    sku: 'KT-KRT-ILK-02'
  },
  {
    id: 'kora-krt-03',
    name: 'Phaltan Fine Count Handspun Khadi Kurta',
    slug: 'phaltan-fine-count-khadi-kurta',
    category: 'kurtas',
    price: 1850,
    tagline: 'Feather-light hand-spun cotton kurta from Maharashtra rural artisan societies.',
    description: 'Designed for effortless summer comfort. The 80s count hand-spun pure cotton allows continuous airflow while maintaining an understated silhouette suitable for work, gatherings, and daily wear.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Phaltan Taluka Gramodyog Sahakari Sangh',
      region: 'Maharashtra',
      location: 'Phaltan, Satara District, Maharashtra'
    },
    sizes: ['M', 'L', 'XL', 'XXL'],
    careInstructions: [
      'Hand wash or gentle machine wash in cold water',
      'Use natural liquid soap or mild detergent',
      'Dry in indirect sunlight'
    ],
    features: [
      '80s count breathable hand-spun cotton',
      'Minimalist band collar with single loop button',
      'Deep side pockets for essentials',
      'Neat French seams throughout'
    ],
    images: [
      ASSETS.kurtas.phaltan,
      ASSETS.editorial.yarnTexture
    ],
    inStock: true,
    sku: 'KT-KRT-PHL-03'
  },
  {
    id: 'kora-krt-04',
    name: 'Guledgudd Khun Accent Charcoal Kurta',
    slug: 'guledgudd-khun-accent-charcoal-kurta',
    category: 'kurtas',
    price: 4200,
    tagline: 'Distinctive Karnataka Khun handloom weave yoke on charcoal pure cotton.',
    description: 'Our signature festive piece pairing high-density charcoal cotton body with an authentic Guledgudd Khun geometric yoke. Handcrafted in limited seasonal batches in Bagalkot, Karnataka.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Guledgudd Handloom Khun Weavers Industrial Society',
      region: 'Karnataka',
      location: 'Guledgudd, Badami Taluk, Karnataka'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    careInstructions: [
      'Dry clean recommended for first cycle or gentle cold hand wash',
      'Do not brush embroidered or brocade yoke',
      'Steam iron on reverse side'
    ],
    features: [
      'Authentic Karnataka Khun hand-woven yoke',
      'Deep charcoal natural-dyed cotton base',
      'Tailored cuffs with contrast edging',
      'Reinforced side vents'
    ],
    images: [
      ASSETS.kurtas.guledgudd,
      ASSETS.editorial.weavingWorkshop
    ],
    inStock: true,
    sku: 'KT-KRT-GUL-04'
  },
  {
    id: 'kora-krt-05',
    name: 'Maharashtra Ochre Stripe Handloom Kurti',
    slug: 'maharashtra-ochre-stripe-handloom-kurti',
    category: 'kurtas',
    price: 2650,
    originalPrice: 2950,
    tagline: 'Warm ochre and ecru handloom cotton straight-cut kurta with natural textures.',
    description: 'Woven on wooden looms by rural cooperatives in Maharashtra. Features vertical woven reed stripes in earthy ochre and unbleached cotton with wooden buttons and straight-cut hemline.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Solapur District Handloom Weavers Sahakari Society',
      region: 'Maharashtra',
      location: 'Solapur, Maharashtra'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    careInstructions: [
      'Gentle hand wash in cold water',
      'Wash separately for first wash',
      'Line dry in shade',
      'Warm iron'
    ],
    features: [
      'V-notch neckline with sustainable wooden buttons',
      'Three-quarter sleeves with woven border cuffs',
      'Straight comfort silhouette with side slits',
      'Soft breathable pure cotton handle'
    ],
    images: [
      ASSETS.kurtas.womensKora,
      ASSETS.editorial.yarnTexture
    ],
    inStock: true,
    sku: 'KT-KRT-OCH-05'
  },

  // =========================================================================
  // CATEGORY B: COTTON STOLES (₹900 to ₹2,400)
  // =========================================================================
  {
    id: 'kora-stl-01',
    name: 'Ilkal Topi Teni Indigo Cotton Stole',
    slug: 'ilkal-topi-teni-indigo-cotton-stole',
    category: 'stoles',
    price: 1450,
    originalPrice: 1700,
    tagline: 'Classic Karnataka weave pallu with pure cotton tasseled selvedge.',
    description: 'Woven with extra-long staple pure cotton by cooperative artisans in Bagalkot. Features the traditional "Topi Teni" (jowar pod) motif along the border and hand-knotted natural fringe.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Ilkal Weavers Co-operative Production & Sale Society',
      region: 'Karnataka',
      location: 'Ilkal, Karnataka'
    },
    sizes: ['Free Size (200cm x 70cm)'],
    careInstructions: [
      'Hand wash in cold water with gentle agitation',
      'Do not wring or squeeze vigorously',
      'Flat dry in shade'
    ],
    features: [
      'Dimensions: 200 cm x 70 cm',
      'Hand-twisted yarn tassels',
      'Reversible geometric border weave',
      'Feather-soft cotton drape'
    ],
    images: [
      ASSETS.stoles.ilkal,
      ASSETS.stoles.bagalkot
    ],
    inStock: true,
    sku: 'KT-STL-ILK-01'
  },
  {
    id: 'kora-stl-02',
    name: 'Solapur Jaal Woven Summer Cotton Stole',
    slug: 'solapur-jaal-woven-summer-cotton-stole',
    category: 'stoles',
    price: 950,
    tagline: 'Lightweight open-weave cotton stole for warm weather shielding.',
    description: 'An everyday essential crafted with open reed spacing that creates an airy, breathable texture. Woven by Solapur artisans on pit-looms with madder red accent woven stripes.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Solapur District Handloom Weavers Sahakari Society',
      region: 'Maharashtra',
      location: 'Solapur, Maharashtra'
    },
    sizes: ['Free Size (190cm x 60cm)'],
    careInstructions: [
      'Gentle cold wash',
      'Do not use harsh detergents or bleach',
      'Iron on medium setting'
    ],
    features: [
      'Breathable open-reed weave structure',
      'Natural off-white with madder red accent stripes',
      'Skin-friendly 100% pure cotton fibers',
      'Zero synthetic blend'
    ],
    images: [
      ASSETS.stoles.solapur,
      ASSETS.stoles.bagalkot
    ],
    inStock: true,
    sku: 'KT-STL-SOL-02'
  },
  {
    id: 'kora-stl-03',
    name: 'Belagavi Zari Border Pure Cotton Stole',
    slug: 'belagavi-zari-border-pure-cotton-stole',
    category: 'stoles',
    price: 2350,
    tagline: 'Fine count cotton with subtle tested matte zari selvedge for occasions.',
    description: 'Loomed by the Belagavi cooperative clusters in North Karnataka. Offers understated elegance with fine woven motifs on the border and lightweight pure cotton body.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Belagavi District Handloom Weavers Federation',
      region: 'Karnataka',
      location: 'Belagavi, Karnataka'
    },
    sizes: ['Free Size (210cm x 75cm)'],
    careInstructions: [
      'Gentle cold hand wash or dry clean',
      'Iron on reverse with low heat'
    ],
    features: [
      'Fine 100s count combed cotton yarn',
      'Tested matte zari temple selvedge',
      'Ultra lightweight drape (140g)',
      'Natural earthen ecru palette'
    ],
    images: [
      ASSETS.stoles.belagavi,
      ASSETS.stoles.bagalkot
    ],
    inStock: true,
    sku: 'KT-STL-BEL-03'
  },
  {
    id: 'kora-stl-04',
    name: 'Bagalkot Textured Border Cotton Stole',
    slug: 'bagalkot-textured-border-cotton-stole',
    category: 'stoles',
    price: 1250,
    tagline: 'Hand-loomed cotton stole with natural fringed edge and earth-toned selvedge.',
    description: 'Crafted from unbleached natural cotton with fine textured horizontal border stripes in vegetable dye tones. Worn effortlessly across shoulders or draped loosely around the neck.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Ilkal Weavers Co-operative Production & Sale Society',
      region: 'Karnataka',
      location: 'Ilkal, Karnataka'
    },
    sizes: ['Free Size (195cm x 65cm)'],
    careInstructions: [
      'Gentle cold hand wash with mild soap',
      'Do not squeeze or twist fringe',
      'Line dry in shade'
    ],
    features: [
      'Pure unbleached handloom cotton yarn',
      'Hand-tied cotton fringe',
      'Subtle earth-toned selvedge stripe',
      'Ultra-breathable all-season comfort'
    ],
    images: [
      ASSETS.stoles.bagalkot,
      ASSETS.stoles.solapur
    ],
    inStock: true,
    sku: 'KT-STL-BAG-04'
  },

  // =========================================================================
  // CATEGORY C: HOME LINEN (Recently launched secondary category)
  // =========================================================================
  {
    id: 'kora-hl-01',
    name: 'Solapur Handloom Cotton Bed Runner',
    slug: 'solapur-handloom-cotton-bed-runner',
    category: 'home-linen',
    price: 1950,
    tagline: 'Heavy count textured bed throw with hand-tied fringe.',
    description: 'Part of our recently launched home living collection. Woven from sturdy coarse count pure cotton by Solapur weavers, adding architectural warmth and tactile handloom character to any bedroom.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Solapur District Handloom Weavers Sahakari Society',
      region: 'Maharashtra',
      location: 'Solapur, Maharashtra'
    },
    sizes: ['Double Bed (240cm x 50cm)'],
    careInstructions: [
      'Machine wash cold gentle cycle',
      'Tumble dry low or line dry in shade',
      'Do not bleach'
    ],
    features: [
      'Heavyweight 450 GSM pure handloom cotton',
      'Hand-knotted natural fringe borders',
      'Reversible waffle texture weave',
      'Pre-shrunk fabric'
    ],
    images: [
      ASSETS.homeLinen.bedRunner,
      ASSETS.editorial.weavingWorkshop
    ],
    inStock: true,
    sku: 'KT-HL-SOL-01'
  },
  {
    id: 'kora-hl-02',
    name: 'Ilkal Handloom Cotton Cushion Covers (Pair)',
    slug: 'ilkal-handloom-cotton-cushion-covers-pair',
    category: 'home-linen',
    price: 1200,
    tagline: 'Pair of 16x16 inch pure cotton cushion covers with coconut button closure.',
    description: 'Part of our recently launched home living collection. Handcrafted with authentic Karnataka weave stripes and natural coconut shell back closures.',
    fabric: '100% Pure Handloom Cotton',
    cooperativeOrigin: {
      name: 'Ilkal Weavers Co-operative Production & Sale Society',
      region: 'Karnataka',
      location: 'Ilkal, Karnataka'
    },
    sizes: ['16 x 16 inches (Pair)'],
    careInstructions: [
      'Hand wash or machine wash gentle',
      'Wash inside out',
      'Warm iron'
    ],
    features: [
      'Set of 2 covers',
      'Concealed placket with natural coconut buttons',
      'Interlined with cotton for structural longevity',
      '100% biodegradable materials'
    ],
    images: [
      ASSETS.homeLinen.cushions,
      ASSETS.homeLinen.bedRunner
    ],
    inStock: true,
    sku: 'KT-HL-ILK-02'
  }
];
