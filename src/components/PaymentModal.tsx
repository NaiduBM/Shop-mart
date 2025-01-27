import React, { useState } from 'react';
import { X, CreditCard, Smartphone } from 'lucide-react';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onSubmit: (paymentDetails: PaymentDetails) => void;
}

export interface PaymentDetails {
  paymentMethod: 'card' | 'upi';
  // Card details
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  name?: string;
  // UPI details
  upiId?: string;
}

export function PaymentModal({ total, onClose, onSubmit }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    upiId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...paymentDetails,
      paymentMethod,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {paymentMethod === 'card' ? (
                <CreditCard className="text-blue-600" />
              ) : (
                <Smartphone className="text-blue-600" />
              )}
              Payment Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-lg font-semibold text-green-600 mb-4">
              Total Amount: ${total.toFixed(2)}
            </p>
            
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                  paymentMethod === 'card'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={20} />
                Card
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
                  paymentMethod === 'upi'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setPaymentMethod('upi')}
              >
                <Smartphone size={20} />
                UPI
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {paymentMethod === 'card' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
                      setPaymentDetails(prev => ({ ...prev, cardNumber: formattedValue }));
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const formattedValue = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
                        setPaymentDetails(prev => ({ ...prev, expiryDate: formattedValue }));
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPaymentDetails(prev => ({ ...prev, cvv: value }));
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="username@upi"
                    value={paymentDetails.upiId}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, upiId: e.target.value }))}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter your UPI ID (e.g., username@upi)
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-6"
            >
              Pay ${total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
