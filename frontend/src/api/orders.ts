export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
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

// Obtener pedidos
export async function getUserOrders(): Promise<Order[]> {
  const resp = await fetch('/api/orders.php', {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!resp.ok) throw new Error(`Error fetching orders (${resp.status})`);
  const data = await resp.json();
  return data.orders.map((o: any) => ({
    id:          String(o.id),
    userId:      String(o.usuario_id),
    items:       JSON.parse(o.detalles) as OrderItem[],
    totalAmount: Number(o.total),
    status:      'pending',
    shippingAddress: {
      name:    o.shipping_name   || '',
      address: o.shipping_address|| '',
      city:    o.shipping_city   || '',
      phone:   o.shipping_phone  || '',
    },
    createdAt:   o.creado_en,
    updatedAt:   o.creado_en,
  }));
}

// Crear pedido
export async function createOrder(
  items: OrderItem[],
  total: number,
  shipping: Order['shippingAddress']
): Promise<boolean> {
  const resp = await fetch('/api/orders.php', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type':'application/json',
      Accept:'application/json'
    },
    body: JSON.stringify({
      detalles: JSON.stringify(items),
      total,
      shipping
    }),
  });
  if (!resp.ok) return false;
  const data = await resp.json();
  return data.success === true;
}

// Borrar pedido
export async function deleteOrder(id: string): Promise<boolean> {
  const resp = await fetch('/api/orders.php', {
    method: 'DELETE',
    credentials:'include',
    headers:{
      'Content-Type':'application/json',
      Accept:'application/json'
    },
    body: JSON.stringify({ id: Number(id) })
  });
  if (!resp.ok) return false;
  const data = await resp.json();
  return data.success === true;
}
