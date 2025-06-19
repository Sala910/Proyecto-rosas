export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
}

// Catálogo con 20 variantes y enlaces de imagen estáticos de Pixabay
const mockProducts: Product[] = [
  // Roses
  {
    id: '1',
    name: 'Букет "Эквадорские розы классик"',
    description: 'Элегантный букет из красных эквадорских роз. Символ страсти и любви.',
    price: 2500,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/63/1635066051_86460463.jpg',
    category: 'roses',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Композиция "Белые розы элегантность"',
    description: 'Утонченная композиция из белых эквадорских роз для особых моментов.',
    price: 2800,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/41/1637014991_83065741.jpg',
    category: 'roses',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Букет "Розовая нежность"',
    description: 'Нежный букет из розовых роз, идеально подходит для выражения чувств.',
    price: 2300,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/07/1636291377_31585107.jpg',
    category: 'roses',
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: 'Композиция "Кремовые розы люкс"',
    description: 'Роскошная композиция из кремовых роз в стильной упаковке.',
    price: 3200,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/78/1649107368_53225478.jpg',
    category: 'roses',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Букет "Желтые розы радость"',
    description: 'Яркий букет из желтых роз, который подарит позитивное настроение.',
    price: 2200,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/04/1637493991_20207004.jpg',
    category: 'roses',
    inStock: true,
    featured: false
  },

  // Peonies
  {
    id: '6',
    name: 'Букет "Пионы весенние"',
    description: 'Роскошные розовые пионы в элегантной упаковке. Воплощение изысканности.',
    price: 3800,
    image: 'https://lasflore.ru/upload/resize_cache/iblock/ab2/523_523_240cd750bba9870f18aada2478b24840a/ab222b8eb96449816d950f7ac411021a.jpg',
    category: 'peonies',
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: 'Композиция "Розовые пионы мечта"',
    description: 'Нежная композиция из розовых пионов для романтических моментов.',
    price: 4200,
    image: 'https://lasflore.ru/upload/resize_cache/iblock/7e1/523_523_240cd750bba9870f18aada2478b24840a/7e14c0913dd840c4e9ebfe91d923998d.jpg',
    category: 'peonies',
    inStock: true,
    featured: true
  },
  {
    id: '8',
    name: 'Букет "Пионы коралловые"',
    description: 'Яркий букет из коралловых пионов, символ процветания.',
    price: 3600,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/72/1750152186_13679672.jpg',
    category: 'peonies',
    inStock: true,
    featured: false
  },
  {
    id: '9',
    name: 'Композиция "Пионы микс"',
    description: 'Разноцветная композиция из пионов разных оттенков.',
    price: 4500,
    image: 'https://lasflore.ru/upload/resize_cache/iblock/b04/523_523_240cd750bba9870f18aada2478b24840a/b0498f83c6ee8a49167e075c6a932933.jpg',
    category: 'peonies',
    inStock: true,
    featured: false
  },
  {
    id: '10',
    name: 'Букет "Пионы бордовые"',
    description: 'Глубокие бордовые пионы для выражения страстных чувств.',
    price: 3900,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/41/1750152751_47225041.jpg',
    category: 'peonies',
    inStock: true,
    featured: false
  },

  // Tulips
  {
    id: '11',
    name: 'Букет "Тюльпаны весенние"',
    description: 'Яркие разноцветные тюльпаны, символизирующие обновление и надежду.',
    price: 1500,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/02/1736424410_70496602.jpg',
    category: 'tulips',
    inStock: true,
    featured: true
  },
  {
    id: '12',
    name: 'Композиция "Красные тюльпаны"',
    description: 'Классические красные тюльпаны в стильном оформлении.',
    price: 1800,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/71/1646246901_71577771.jpg',
    category: 'tulips',
    inStock: true,
    featured: false
  },
  {
    id: '13',
    name: 'Букет "Белые тюльпаны чистота"',
    description: 'Нежные белые тюльпаны, символ чистоты и невинности.',
    price: 1700,
    image: 'https://content3.flowwow-images.com/data/flowers/524x524/12/1737738430_7529912.jpg',
    category: 'tulips',
    inStock: true,
    featured: false
  },
  {
    id: '14',
    name: 'Композиция "Желтые тюльпаны солнце"',
    description: 'Солнечные желтые тюльпаны для поднятия настроения.',
    price: 1600,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/39/1637118719_38012839.jpg',
    category: 'tulips',
    inStock: true,
    featured: false
  },
  {
    id: '15',
    name: 'Букет "Розовые тюльпаны нежность"',
    description: 'Деликатные розовые тюльпаны для выражения нежных чувств.',
    price: 1900,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/88/1637964499_17879188.jpg',
    category: 'tulips',
    inStock: true,
    featured: false
  },

  // Alstroemeria
  {
    id: '16',
    name: 'Букет "Альстромерия классик"',
    description: 'Изящные альстромерии в пастельных тонах для выражения дружбы.',
    price: 2300,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/32/1689825444_38375432.jpg',
    category: 'alstroemeria',
    inStock: true,
    featured: true
  },
  {
    id: '17',
    name: 'Композиция "Альстромерия микс"',
    description: 'Разноцветная композиция из альстромерий разных оттенков.',
    price: 2500,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/31/1749881218_15498031.jpg',
    category: 'alstroemeria',
    inStock: true,
    featured: false
  },
  {
    id: '18',
    name: 'Букет "Белые альстромерии"',
    description: 'Элегантные белые альстромерии в стильной упаковке.',
    price: 2100,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/68/1717098895_49828468.jpg',
    category: 'alstroemeria',
    inStock: true,
    featured: false
  },
  {
    id: '19',
    name: 'Композиция "Розовые альстромерии"',
    description: 'Нежные розовые альстромерии для особых случаев.',
    price: 2400,
    image: 'https://content3.flowwow-images.com/data/flowers/1000x1000/91/1680725229_2447291.jpg',
    category: 'alstroemeria',
    inStock: true,
    featured: false
  },
  {
    id: '20',
    name: 'Букет "Альстромерии радуга"',
    description: 'Яркая композиция из альстромерий всех цветов радуги.',
    price: 2700,
    image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/20/1668013489_27026020.jpg',
    category: 'alstroemeria',
    inStock: true,
    featured: false
  }
];

export const getProducts = async (): Promise<Product[]> => {
  // Имитация API запроса
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.find(product => product.id === id) || null;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockProducts.filter(product => product.featured);
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockProducts.filter(product => product.category === category);
};
