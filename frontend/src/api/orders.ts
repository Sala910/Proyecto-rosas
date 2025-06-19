
  export interface Order {
    id: string;
    userId: string;
    items: Array<{
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }>;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      phone: string;
    };
    createdAt: string;
    updatedAt: string;
  }

  // Моковые данные заказов
  const mockOrders: Order[] = [
    {
      id: 'order-1',
      userId: '1',
      items: [
        {
          productId: '1',
          productName: 'Букет "Весенняя романтика"',
          quantity: 1,
          price: 2500
        }
      ],
      totalAmount: 2500,
      status: 'delivered',
      shippingAddress: {
        name: 'Анна Иванова',
        address: 'ул. Пушкина, д. 15, кв. 42',
        city: 'Москва',
        phone: '+7 (999) 123-45-67'
      },
      createdAt: '2024-06-10T10:30:00Z',
      updatedAt: '2024-06-12T14:20:00Z'
    },
    {
      id: 'order-2',
      userId: '1',
      items: [
        {
          productId: '2',
          productName: 'Композиция "Солнечное утро"',
          quantity: 2,
          price: 1800
        }
      ],
      totalAmount: 3600,
      status: 'shipped',
      shippingAddress: {
        name: 'Анна Иванова',
        address: 'ул. Пушкина, д. 15, кв. 42',
        city: 'Москва',
        phone: '+7 (999) 123-45-67'
      },
      createdAt: '2024-06-14T15:45:00Z',
      updatedAt: '2024-06-15T09:15:00Z'
    }
  ];


  export const getUserOrders = async (userId: string): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockOrders.filter(order => order.userId === userId);
  };

  export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newOrder: Order = {
      ...orderData,
      id: 'order-' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockOrders.push(newOrder);
    return newOrder;
  };
