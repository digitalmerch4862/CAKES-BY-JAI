import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  CreditCard
} from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  url: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onCheckout 
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
          />

          {/* Cart Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[201] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-luxury-bg/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Your Cart</h3>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'} Selected
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Your cart is empty</p>
                    <p className="text-sm text-gray-500">Add some delicious cakes to get started!</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="text-primary font-bold hover:underline"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-900 leading-tight">{item.title}</h4>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-primary font-bold text-sm mt-1">₱{item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1 border border-gray-100">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-gray-400 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold text-gray-700 w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-gray-400 hover:text-primary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-gray-900">₱{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between text-gray-900">
                  <span className="text-sm font-medium text-gray-500">Subtotal</span>
                  <span className="text-2xl font-black">₱{total.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">
                  Shipping and taxes calculated at checkout
                </p>
                <button 
                  onClick={onCheckout}
                  className="w-full py-5 bg-gray-900 text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-gray-200 group"
                >
                  <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
