/* @refresh reset */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  placeOrder: () => Promise<boolean>;
  loadOrders: () => Promise<CartItem[]>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const API = '/api'; // proxy a http://localhost/Proyecto-rosas/api

  const [items, setItems] = useState<CartItem[]>([]);

  // 1) cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // 2) guardar en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>): void => {
    setItems(prev => {
      const exist = prev.find(i => i.id === newItem.id);
      if (exist) {
        return prev.map(i =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string): void =>
    setItems(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id: string, quantity: number): void => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = (): void => setItems([]);

  const getTotalPrice = (): number =>
    items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const getTotalItems = (): number =>
    items.reduce((sum, i) => sum + i.quantity, 0);

  // 3) enviar el pedido al backend
  const placeOrder = async (): Promise<boolean> => {
    if (!user || items.length === 0) return false;

    const payload = {
      detalles: JSON.stringify(items),
      total: getTotalPrice()
    };

    try {
      const resp = await fetch(`${API}/orders.php`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (data.success) {
        clearCart();
        return true;
      }
      console.warn('placeOrder falló:', data);
      return false;
    } catch (err) {
      console.error('placeOrder error:', err);
      return false;
    }
  };

  // 4) cargar pedidos anteriores (opcional)
  const loadOrders = async (): Promise<CartItem[]> => {
    if (!user) return [];
    try {
      const resp = await fetch(`${API}/orders.php`, {
        credentials: 'include',
        headers: { Accept: 'application/json' }
      });
      const { orders } = await resp.json();
      const all: CartItem[] = [];
      orders.forEach((ord: any) => {
        try {
          const parsed: CartItem[] = JSON.parse(ord.detalles);
          all.push(...parsed);
        } catch {
          console.error('JSON inválido en detalles:', ord.detalles);
        }
      });
      return all;
    } catch (err) {
      console.error('loadOrders error:', err);
      return [];
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        placeOrder,
        loadOrders
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
