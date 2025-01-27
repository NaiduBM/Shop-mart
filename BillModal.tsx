import React from 'react';
import { Receipt, X, ShoppingBag, CreditCard, Smartphone } from 'lucide-react';
import { CartItem } from '../types';
import { PaymentDetails } from './PaymentModal';

interface BillModalProps {
  items: CartItem[];
  paymentDetails: PaymentDetails;
  onClose: () => void;
}

export function BillModal({ items, paymentDetails, onClose }: BillModalProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Receipt className="text-green-600" />
              Purchase Receipt
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="border-t border-b py-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-blue-600" />
                <h3 className="text-lg font-semibold">FreshMart</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Order #{orderNumber}</p>
                <p className="text-sm text-gray-600">{date}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-center py-2">Qty</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">${item.price.toFixed(2)}</td>
                    <td className="text-right py-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Payment Information</h4>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {paymentDetails.paymentMethod === 'card' ? (
                <CreditCard className="text-blue-600" />
              ) : (
                <Smartphone className="text-blue-600" />
              )}
              <span className="font-medium">
                {paymentDetails.paymentMethod === 'card' ? 'Card Payment' : 'UPI Payment'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-2">
              {paymentDetails.paymentMethod === 'card' ? (
                <>
                  <div>
                    <p>Card Number</p>
                    <p>•••• {paymentDetails.cardNumber?.slice(-4)}</p>
                  </div>
                  <div>
                    <p>Cardholder Name</p>
                    <p>{paymentDetails.name}</p>
                  </div>
                </>
              ) : (
                <div>
                  <p>UPI ID</p>
                  <p>{paymentDetails.upiId}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-gray-600">
            <p>Thank you for shopping with FreshMart!</p>
            <p className="text-sm">This receipt has been emailed to you.</p>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}