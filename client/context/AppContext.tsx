import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Language, Theme, Product, CartItem } from "@/types";
import { mockProducts } from "@/data/mockProducts";

// --- New: User tipi ---
interface User {
  email: string;
  role: "admin" | "user";
}

// --- Context tipi ---
interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  favorites: Set<string>;
  toggleFavorite: (productId: string) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // --- New: user + setUser ---
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "uz";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme;
    return saved || "light";
  });

  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(false);

  // --- New: user state ---
  const [user, setUser] = useState<User | null>(null);

  // --- Products state ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : mockProducts;
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // --- Product CRUD functions ---
  const addProduct = useCallback((productData: Omit<Product, "id">) => {
    setProducts((prev) => {
      const maxId = prev.reduce((max, p) => {
        const numId = parseInt(p.id) || 0;
        return numId > max ? numId : max;
      }, 0);
      const newProduct: Product = {
        ...productData,
        id: String(maxId + 1),
      };
      return [...prev, newProduct];
    });
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      setTheme,
      favorites,
      toggleFavorite,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isAdmin,
      setIsAdmin,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      user,
      setUser,
    }),
    [
      language,
      theme,
      favorites,
      toggleFavorite,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isAdmin,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      user,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
