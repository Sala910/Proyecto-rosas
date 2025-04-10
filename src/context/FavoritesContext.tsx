// src/context/FavoritesContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface FavoriteItem {
  id: number;
  title: string;
  image: string;
  url: string;
  price: number;  
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addFavorite = (item: FavoriteItem) => {
    if (!favorites.find(f => f.id === item.id)) {
      setFavorites(prev => [...prev, item]);
    }
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const isFavorite = (id: number) => favorites.some(f => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
