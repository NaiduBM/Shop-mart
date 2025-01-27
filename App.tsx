import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { products } from './data/products';
import { Product, CartItem } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{
      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80')`,
    }}>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">FreshMart</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <Cart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;