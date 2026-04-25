import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';

interface WishlistContextType {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const toggleWishlist = (product: Product) => {
    setItems(prev => prev.find(i => i.id === product.id) ? prev.filter(i => i.id !== product.id) : [...prev, product]);
  };

  const isInWishlist = (productId: string) => items.some(i => i.id === productId);
  const removeFromWishlist = (productId: string) => setItems(prev => prev.filter(i => i.id !== productId));

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isInWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
