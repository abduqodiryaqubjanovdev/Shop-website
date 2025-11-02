export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'phone' | 'laptop';
  image: string;
  rating: number;
  reviews: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type Language = 'uz' | 'en';
export type Theme = 'light' | 'dark';
