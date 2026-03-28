import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  QrCode, 
  Upload, 
  CheckCircle2, 
  Smartphone, 
  ShieldCheck, 
  Loader2,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";

interface PaymentPortalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: string;
}

export const PaymentPortal: React.FC<PaymentPortalProps> = ({ isOpen, onClose, amount = "500.00" }) => {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setScreenshot(reader.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setScreenshot(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={reset}
          className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-luxury-bg/30">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Secure Payment</h3>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-widest mt-1">Reservation Deposit</p>
            </div>
            <button 
              onClick={reset}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between p-6 bg-blue-50 rounded-3xl border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-0.5">Payment Method</div>
                      <div className="font-bold text-gray-900 text-lg">GCash Transfer</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-0.5">Amount Due</div>
                    <div className="text-2xl font-black text-primary">₱{amount}</div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6 py-4">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] scale-110 blur-xl group-hover:bg-primary/10 transition-all" />
                    <div className="relative bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GCash-CakesByJai-09123456789" 
                        alt="GCash QR Code" 
                        className="w-48 h-48"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-[2rem]">
                        <QrCode className="w-12 h-12 text-primary animate-pulse" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <p className="font-bold text-gray-900">Scan to Pay</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Open your GCash app, select 'Scan QR', and enter the amount above.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-5 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200"
                >
                  I've made the payment
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Upload Proof of Payment</h4>
                  <p className="text-sm text-gray-500">Please upload a screenshot of your successful GCash transaction.</p>
                </div>

                <div 
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  className={`relative h-64 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${
                    screenshot 
                      ? "border-green-500 bg-green-50/30" 
                      : "border-gray-200 hover:border-primary/50 hover:bg-luxury-bg/20"
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {isUploading ? (
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-12 h-12 text-primary animate-spin" />
                      <p className="text-sm font-bold text-primary uppercase tracking-widest">Verifying Image...</p>
                    </div>
                  ) : screenshot ? (
                    <div className="absolute inset-0 p-4">
                      <img src={screenshot} alt="Screenshot" className="w-full h-full object-contain rounded-xl" />
                      <div className="absolute top-6 right-6 bg-green-500 text-white p-2 rounded-full shadow-lg">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <Upload className="w-8 h-8" />
                      </div>
                      <p className="font-bold text-gray-600">Click to select screenshot</p>
                      <p className="text-xs uppercase tracking-widest">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-5 bg-white text-gray-600 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleConfirm}
                    disabled={!screenshot || isUploading}
                    className="flex-[2] py-5 bg-primary text-white rounded-full font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:grayscale transition-all shadow-xl shadow-primary/20"
                  >
                    Confirm Payment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-8"
              >
                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-200 relative z-10"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-green-500 rounded-full blur-2xl"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-3xl font-bold text-gray-900">Payment Received!</h4>
                  <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Thank you! Your reservation is now being processed. We will contact you shortly to finalize the details.
                  </p>
                </div>

                <div className="w-full p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center gap-4 text-left">
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Transaction Secured</p>
                    <p className="text-xs text-gray-400">Reference ID: CBJ-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </div>

                <button 
                  onClick={reset}
                  className="w-full py-5 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all"
                >
                  Return to Website
                </button>
              </motion.div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-3">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
              End-to-End Encrypted Payment
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Helper component for ChevronRight since it wasn't imported
const ChevronRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);
