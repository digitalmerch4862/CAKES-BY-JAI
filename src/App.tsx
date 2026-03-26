/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Cake, 
  Star, 
  CheckCircle2, 
  MessageCircle, 
  ChevronRight,
  Instagram,
  Facebook,
  Heart
} from "lucide-react";

import { ChatBot } from "./components/ChatBot";

const BUSINESS_NAME = "Cakes by Jai";
const PHONE = "0912 345 6789";
const WHATSAPP = "0912 345 6789";
const EMAIL = "caenajirah@gmail.com";
const ADDRESS = "33 Malate St, Cabuyao City, Laguna, Philippines";
const MAPS_LINK = "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA";
const FACEBOOK_LINK = "https://www.facebook.com/cakesbyjai2020/";
const TIKTOK_LINK = "https://www.tiktok.com/@cakes_by_jai";
const LOGO_URL = "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/305832199_456591943151124_5258538409421345392_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGYES2qy9NGPXcKHBApLlHog5jRdIAnEC2DmNF0gCcQLcOh41-E3R5CAGAAdh70ARQ&_nc_ohc=TZ4c8gM1-bwQ7kNvwGmuFRB&_nc_oc=AdrToX0YSGEB8eZMjCRedri72tsoV8bySOsUD5bD1qCFyTpz05BCeaN9zOPgDFuYWOE&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=kjY3r27awS8-mdtI3hFtcg&_nc_ss=7a32e&oh=00_Afx0yy_ChwKB1A00Dgd8DoABsmpZOVIjH-dT6c2zUCkT6w&oe=69CADB3B";

const SERVICES = [
  {
    title: "Custom Wedding Cakes",
    description: "Elegant, multi-tiered masterpieces designed to be the centerpiece of your special day.",
    icon: <Cake className="w-6 h-6" />
  },
  {
    title: "Birthday & Celebration Cakes",
    description: "Personalized designs that capture the spirit of your milestone moments.",
    icon: <Star className="w-6 h-6" />
  },
  {
    title: "Artisanal Pastries",
    description: "A refined selection of macarons, tarts, and cupcakes for any gathering.",
    icon: <CheckCircle2 className="w-6 h-6" />
  },
  {
    title: "Dessert Tables",
    description: "Curated dessert spreads that offer a variety of flavors and textures for your guests.",
    icon: <ChevronRight className="w-6 h-6" />
  }
];

const GALLERY = [
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/490013077_1114019630741682_7141718429963901221_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHiyrPBNAoYa2t7m52jgeg6SiO0EVYlXP5KI7QRViVc_mbpreiu-f1DjTC80hnJvSM&_nc_ohc=cwQJCKN82zoQ7kNvwGbhRoy&_nc_oc=Adp8bH2nRbllLTOrV2DJp0NSEdUb3Pf1hGrHmw5IriO7_Xnuxo7nNh2J7hBgNwVSmCU&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=E2qx3lleEolvsQqnBlTZ_w&_nc_ss=7a32e&oh=00_Afzl8QKnGSc3a1N_1LSWL0q2FoXi0rChmZcPDMtOagO57w&oe=69CAC648",
    title: "Elegant Tiered Design",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  },
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/489791658_1114019620741683_1033841171124339470_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGsaN3HUKSlNTj0WHIOg2Ymc-S5og-8-lZz5LmiD7z6Vu7G272moLN7X4C1I9dCy0s&_nc_ohc=x0NW4ieybUgQ7kNvwEF6IdT&_nc_oc=AdrE-aQhCboBWrgeeFZKdaeD4eAlvQXwYsYaCTx5sLdSqOvjHzvOOLcAAnWxtAFTNBI&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=FxZ8lMPMK0GNkv-fg3CA1g&_nc_ss=7a32e&oh=00_AfzmoWOvoLoJZdR23xtqO-1fpodKvYsvo508B7Ch5ejFCw&oe=69CADE6D",
    title: "Floral Masterpiece",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  },
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/489132958_1114019644075014_1831521694006131761_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHuufsfK2Ar_mrDjkMkqj8AfGsSHcLYj2x8axIdwtiPbLXIm7dl8PrC_JdFQJrflSY&_nc_ohc=RF6FHdh5DVgQ7kNvwGsy2HA&_nc_oc=Adr8ecRJESJY-xUvsBM1cZDp3rNO0MTqJWKewOWJi5vyMZUJ767uD3lDXvBUT6tbFOQ&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=ntJQu2eALe4IKvwe-oioTw&_nc_ss=7a32e&oh=00_AfyeOGpE6nZKerZ03T2s_we9FRjNBl6z5zmsgrU5clci_g&oe=69CAD553",
    title: "Bespoke Wedding Cake",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  },
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/489792470_1114019484075030_1451504521821765654_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH9ql9tFekhtelFPMdzsXOum1QZsQSOx-WbVBmxBI7H5euFQoBULnb_kNNhiBRPdWU&_nc_ohc=aIy2gz43bmIQ7kNvwFGcE2B&_nc_oc=AdpcW_fogmgd11gbZ5hWiTf8-B_rYtocHk7EUl0q6ligWi1DkgfTiflIb3KKzbR7W7A&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=fODv1pvZkQ4dzB6CxZ-ZQw&_nc_ss=7a32e&oh=00_Afz9RBVAWbI8QfbntO2OAtAZY-sBTLCT4YXIBFfvKHbXjA&oe=69CADE07",
    title: "Artisanal Detail",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  },
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/518318785_1193420466134931_5281555292695521905_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeH8g7_8AeaZsi2KGwAr9x6ElbsEVNJ6_XmVuwRU0nr9eR04GmjlGKITrJXGcfLgsg0&_nc_ohc=OktEI0bNccgQ7kNvwEqaqTA&_nc_oc=AdrqVjvLee4l3ZbxW_AxZxMWGgMqviTZz1FwpEV9H0v88iqo3yEgJfm0y94AhRws224&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=vaDYSreWnR7TXr2FQVocGA&_nc_ss=7a32e&oh=00_AfziggYDogptv_E7VqQ0Rl1_CIjbQ7UBuW0CvcJvn5DQaA&oe=69CADABF",
    title: "Signature Creation",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  },
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/518335794_1193420509468260_6923162679469864501_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEXUDRvmjKke_gGnYalRHJnlCqq1OhRuGiUKqrU6FG4aGDPcP4_BEHtMiMHbux8RhA&_nc_ohc=f9ppFzCtqB4Q7kNvwFz_hJq&_nc_oc=Adr1GSOIn7D0WOLLOBLEA0BS5cz1jcWe_Z5-iYWRBAQMg8KhxBvBb-jFJ9VjXtDCazY&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=nF54J6gRNjp7guueO_xdHQ&_nc_ss=7a32e&oh=00_AfzrnpSqVw8AJLWIeEeQZ-4uFgUE5fAbsdw2ow7b6jEe8g&oe=69CAC3F3",
    title: "Luxury Pastry",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  },
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/518308767_1193420592801585_9165065907770436382_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGoHq-Mx31pZqf9wR_SoCvFZjXc5inBuoBmNdzmKcG6gPNyD5rvoCS6gRRtwMSn7GA&_nc_ohc=-lYAKBCg18QQ7kNvwFoLGYe&_nc_oc=AdoV3BGgiLZFcoa4kT4oHzOp1QDHsp7zXF2pQxtzZ8xzwqcwEWmHd6--DdRJQX3-SBg&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=4CE_zv5yO_r-0NInX-OXeA&_nc_ss=7a3a8&oh=00_AfwHaFSxTIE19UOfUCxVrVjuXBkHDLR3ycds_PRMyo3aKA&oe=69CAB77B",
    title: "Exquisite Dessert",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  },
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/518321847_1193420642801580_8561831025634860870_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEAuqYQY8HymuIZjQlF88aOBmh54xj56asGaHnjGPnpq1TWsyJuFbHq7Dd6C3h4lp8&_nc_ohc=yhAhmdy-k6QQ7kNvwFTZ3-B&_nc_oc=AdqgUGnIqDA72hKtyN0P1IB2CR5zyW_gYwPECzKlepJhzCUB6JvwjkzpAZ1DwRh9AxI&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=-S7BjHvsrhdZHkHzKpjLuA&_nc_ss=7a32e&oh=00_Afzv-wbHZZrTtWUKjxlz1UVT5FgOA6yBAZDCg6u8Zdt0Nw&oe=69CAE71F",
    title: "Boutique Cake Design",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  },
  {
    url: "https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/518283637_1193420709468240_8459548005968608267_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEnZzqTMzH7sCUZmSPxaYkTe87i_qJRKSt7zuL-olEpKx0nvQHLmUTxvPUGhSW6CcE&_nc_ohc=u9G_a216X6sQ7kNvwEiOFMD&_nc_oc=Ado0kNhXTnqqG-GW3Iu4xM1CdX4IYUQuapOh4CObwGGtltPu5yjV7hh0tgeiegWY8mU&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=ZZFJYCVMdj1WdNxgnYhmwQ&_nc_ss=7a32e&oh=00_AfxkwAEeFH0igRL4b7ym2qUvGw-KrxHjZlrnjC-ybGtG-w&oe=69CACA0A",
    title: "Handcrafted Elegance",
    link: "https://maps.app.goo.gl/qMeFa6QyNC6pT95TA"
  }
];

const TESTIMONIALS = [
  {
    name: "Maria C.",
    rating: 5,
    text: "The cake is delicious and the design is so beautiful — it's really well-detailed and well-made. The owners are kind and accommodating, so the transaction was smooth and hassle-free. We are super satisfied, will definitely order again! 💜"
  },
  {
    name: "James L.",
    rating: 5,
    text: "Absolutely stunning wedding cake! It was exactly what we envisioned and tasted heavenly. Highly recommend for any special occasion in Laguna."
  },
  {
    name: "Sarah G.",
    rating: 5,
    text: "Best custom cakes in Cabuyao. The attention to detail is unmatched and the flavors are so rich. Thank you, Jai, for making our birthday extra special!"
  }
];

const USPS = [
  "Handcrafted Designs",
  "Premium Ingredients",
  "Personalized Service",
  "Attention to Detail"
];

const PROCESS = [
  {
    step: "01",
    title: "Consultation",
    description: "Share your vision, theme, and flavor preferences with us via WhatsApp."
  },
  {
    step: "02",
    title: "Design & Quote",
    description: "We'll provide a custom design sketch and a detailed quote for your approval."
  },
  {
    step: "03",
    title: "Baking & Artistry",
    description: "Our artisans craft your cake using premium ingredients and meticulous detail."
  },
  {
    step: "04",
    title: "Delivery/Pickup",
    description: "Your masterpiece is ready for its grand debut at your celebration."
  }
];

const FAQS = [
  {
    question: "How far in advance should I order?",
    answer: "For wedding cakes, we recommend 3-6 months. For celebration cakes, at least 2 weeks notice is preferred."
  },
  {
    question: "Do you offer delivery?",
    answer: "Yes, we offer professional delivery within Cabuyao and nearby areas in Laguna to ensure your cake arrives safely."
  },
  {
    question: "Can I request a custom flavor?",
    answer: "Absolutely! While we have signature flavors, we love experimenting with custom requests to match your palate."
  }
];

export default function App() {
  const [isBrowsing, setIsBrowsing] = useState(false);

  const handleWhatsApp = () => {
    const message = `Hi Jai! I'd like to inquire about a cake.`;
    window.open(`https://wa.me/${WHATSAPP.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${PHONE.replace(/\s/g, '')}`;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsBrowsing(true);
    
    // Simulate browsing/loading time
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Keep the "browsing" state a bit longer for visual effect
      setTimeout(() => setIsBrowsing(false), 800);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/10 selection:text-primary">
      {/* Browsing Animation Overlay */}
      <AnimatePresence>
        {isBrowsing && (
          <>
            {/* Top Progress Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-1 bg-accent z-[100]"
            />
            {/* Subtle Luxury Fade Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-white/40 backdrop-blur-[2px] z-[99] pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsApp}
          className="w-full bg-primary text-white py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 font-bold text-lg"
        >
          <MessageCircle className="w-6 h-6" />
          Order on WhatsApp
        </motion.button>
      </div>

      {/* Header/Nav */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={LOGO_URL} 
              alt={BUSINESS_NAME} 
              className="h-12 w-12 rounded-full object-cover border border-gray-100"
              referrerPolicy="no-referrer"
            />
            <div className="text-xl font-bold text-primary tracking-tighter hidden sm:block">
              CAKES BY JAI
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-primary transition-colors">Services</a>
            <a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')} className="hover:text-primary transition-colors">Gallery</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-primary transition-colors">About</a>
            <a href="#testimonials" onClick={(e) => handleNavClick(e, 'testimonials')} className="hover:text-primary transition-colors">Reviews</a>
          </nav>
          <button 
            onClick={handleWhatsApp}
            className="hidden sm:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <MessageCircle className="w-4 h-4" />
            Order Now
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[95vh] flex flex-col lg:flex-row items-stretch pt-20 overflow-hidden bg-luxury-bg">
          {/* Decorative Background Text */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 text-[20rem] font-serif font-bold text-primary/5 select-none pointer-events-none hidden lg:block">
            Jai
          </div>

          {/* Text Content */}
          <div className="flex-1 flex items-center px-4 sm:px-8 lg:px-20 py-12 lg:py-0 z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2 bg-white text-primary text-[11px] font-bold uppercase tracking-[0.4em] mb-10 rounded-full shadow-sm border border-primary/10"
              >
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
                Bespoke Luxury Bakery
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-10 leading-[0.85] tracking-tighter text-gray-900">
                Edible <span className="text-primary italic font-serif font-normal block lg:inline">Masterpieces</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-14 text-gray-600 font-light leading-relaxed max-w-lg">
                Transforming your most precious visions into handcrafted luxury cakes in Cabuyao City, Laguna.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.button 
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-4 bg-primary text-white px-12 py-6 rounded-full text-xl font-bold hover:shadow-[0_20px_50px_rgba(209,77,114,0.3)] transition-all group"
                >
                  <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Start Your Order
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => handleNavClick(e, 'gallery')}
                  className="flex items-center justify-center gap-4 bg-white text-gray-900 border border-gray-100 px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                  Explore Gallery
                </motion.button>
              </div>
              
              <div className="mt-20 flex flex-wrap items-center gap-10">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <img 
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${i + 20}`} 
                        alt="Customer" 
                        className="w-12 h-12 rounded-full border-4 border-luxury-bg shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-primary mb-1">
                      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-sm text-gray-500 font-semibold">500+ Celebrations Shared</p>
                  </div>
                </div>
                
                <div className="h-10 w-px bg-gray-200 hidden sm:block" />
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-primary">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-sm font-bold text-gray-900 uppercase tracking-widest">Made with Love</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="flex-1 relative min-h-[60vh] lg:min-h-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img 
                src="https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/489503180_1114019514075027_7737077209642158684_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHrIUcRAlPkNVImi0J6u8zDMVXCIm8z3rwxVcIibzPevCTopZGCGsjdBTtwyMKcx0g&_nc_ohc=QbyzmqOag7gQ7kNvwENxnZR&_nc_oc=AdrrG0sZNRmbfhn9SwEcwwTqUPZ0e7o8pfBVdjmLDkz18o2YU8fPhcnud1KjzMc_Uys&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=qpHDxqragUvO6kzQm0M_JQ&_nc_ss=7a32e&oh=00_AfwNf5iJiqeRRq5UaA_YdIhc3dtqy9Lm4iOX4KiwRzUMHw&oe=69CAB879" 
                alt="Luxury Custom Cake" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg via-transparent to-transparent lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-transparent lg:hidden block" />
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
            </motion.div>
            
            {/* Floating Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute top-10 right-10 p-5 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-0.5">Top Rated</div>
                  <div className="font-serif italic text-gray-900">Laguna's Finest</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-10 left-10 right-10 lg:left-auto lg:right-10 lg:w-72 p-6 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Cabuyao City</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">Main Studio</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                33 Malate St, Cabuyao City, Laguna. Open for consultations.
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block"
          >
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-luxury-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Main Services</h2>
              <div className="w-20 h-1 bg-accent mx-auto mb-6" />
              <p className="text-gray-500 max-w-2xl mx-auto">
                From intimate gatherings to grand celebrations, we provide a range of artisanal services tailored to your needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-accent/30 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Featured Creations</h2>
              <div className="w-20 h-1 bg-accent mx-auto mb-6" />
              <p className="text-gray-500 max-w-2xl mx-auto">
                A glimpse into our studio's most beloved designs. Each piece is a unique collaboration with our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GALLERY.map((item, idx) => (
                <motion.a 
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="relative group aspect-square overflow-hidden rounded-3xl shadow-lg"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <h3 className="text-white text-xl font-bold">{item.title}</h3>
                    <p className="text-accent text-sm font-medium">View on Maps</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - NEW for Trust */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-primary-foreground/70 text-sm uppercase tracking-widest">Cakes Delivered</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <div className="text-primary-foreground/70 text-sm uppercase tracking-widest">Handcrafted</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <div className="text-primary-foreground/70 text-sm uppercase tracking-widest">Custom Flavors</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">4.9/5</div>
                <div className="text-primary-foreground/70 text-sm uppercase tracking-widest">Customer Rating</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-luxury-bg overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2 relative"
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://scontent-man2-1.xx.fbcdn.net/v/t39.30808-6/489503180_1114019514075027_7737077209642158684_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHrIUcRAlPkNVImi0J6u8zDMVXCIm8z3rwxVcIibzPevCTopZGCGsjdBTtwyMKcx0g&_nc_ohc=QbyzmqOag7gQ7kNvwENxnZR&_nc_oc=AdrrG0sZNRmbfhn9SwEcwwTqUPZ0e7o8pfBVdjmLDkz18o2YU8fPhcnud1KjzMc_Uys&_nc_zt=23&_nc_ht=scontent-man2-1.xx&_nc_gid=qpHDxqragUvO6kzQm0M_JQ&_nc_ss=7a32e&oh=00_AfwNf5iJiqeRRq5UaA_YdIhc3dtqy9Lm4iOX4KiwRzUMHw&oe=69CAB879" 
                    alt="Baking Process" 
                    className="w-full h-full object-cover aspect-[4/5]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full -z-0 blur-3xl" />
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full -z-0 blur-3xl" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">The Art of Baking</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                  Crafting Sweet Memories in Cabuyao City
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Cakes by Jai is a luxury boutique bakery specializing in bespoke cake designs that taste as good as they look. We believe that every celebration deserves a centerpiece that reflects its unique importance.
                </p>
                <p className="text-gray-600 mb-10 leading-relaxed">
                  We use only the finest ingredients—from premium chocolates to fresh local produce—to create edible art for your most precious moments. Our commitment to quality and personalized service ensures that your experience is as delightful as our cakes.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {USPS.map((usp, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="font-medium text-gray-800">{usp}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section - NEW for High Conversion */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 tracking-tight">How to Order Your Masterpiece</h2>
              <div className="w-20 h-1 bg-accent mx-auto mb-6" />
              <p className="text-gray-500">A simple, stress-free process from first sketch to final bite.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {PROCESS.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="text-6xl font-black text-gray-100 absolute -top-10 left-0 -z-0 select-none">
                    {item.step}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Credibility Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 italic">"A cake should not only be a dessert, but a memory that lasts a lifetime."</h2>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-80">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-xs uppercase tracking-widest">Handcrafted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">Premium</div>
                <div className="text-xs uppercase tracking-widest">Ingredients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">Bespoke</div>
                <div className="text-xs uppercase tracking-widest">Designs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-luxury-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Sweet Words</h2>
              <div className="w-20 h-1 bg-accent mx-auto mb-6" />
              <p className="text-gray-500 max-w-2xl mx-auto">
                Hear from our wonderful clients who have shared their most precious moments with us.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="font-bold text-gray-900">— {testimonial.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
              <div className="w-20 h-1 bg-accent mx-auto" />
            </div>
            <div className="space-y-6">
              {FAQS.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-24 bg-luxury-bg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/3">
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Visit Our Studio</h2>
                <p className="text-gray-600 mb-8">
                  Located in the heart of Cabuyao, our studio is where the magic happens. We welcome consultations by appointment.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Address</div>
                      <div className="text-gray-600 text-sm">{ADDRESS}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Opening Hours</div>
                      <div className="text-gray-600 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</div>
                      <div className="text-gray-600 text-sm italic mt-1 text-xs">Closed on Sundays</div>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={MAPS_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 text-primary font-bold hover:underline"
                >
                  Get Directions on Google Maps
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="lg:w-2/3 h-[450px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.444985233633!2d121.1214!3d14.2783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d09633333333%3A0x3333333333333333!2s33%20Malate%20St%2C%20Cabuyao%2C%20Laguna!5e0!3m2!1sen!2sph!4v1711440000000!5m2!1sen!2sph" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Custom Order?</h2>
              <p className="text-gray-400 mb-12 text-lg">
                We'd love to hear about your upcoming celebration. Contact us via your preferred method below.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-8 mb-16">
                <button 
                  onClick={handleWhatsApp}
                  className="p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 group"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="font-bold mb-1">WhatsApp</div>
                  <div className="text-sm text-gray-400">{WHATSAPP}</div>
                </button>
                
                <button 
                  onClick={handleCall}
                  className="p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 group"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="font-bold mb-1">Call Us</div>
                  <div className="text-sm text-gray-400">{PHONE}</div>
                </button>
                
                <a 
                  href={`mailto:${EMAIL}`}
                  className="p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/10 group block"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="font-bold mb-1">Email</div>
                  <div className="text-sm text-gray-400">{EMAIL}</div>
                </a>
              </div>
              
              <button 
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 transition-all shadow-2xl shadow-primary/50"
              >
                <MessageCircle className="w-6 h-6" />
                Message on WhatsApp
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-500 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <img 
                src={LOGO_URL} 
                alt={BUSINESS_NAME} 
                className="h-16 w-16 rounded-full object-cover border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xl font-bold text-white mb-1 tracking-tighter uppercase">CAKES BY JAI</div>
                <div className="text-sm">© 2026 Cakes by Jai. All rights reserved.</div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href={TIKTOK_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13-.09-.26-.18-.38-.28v6.44c.02 2.22-.55 4.49-2.01 6.18-1.54 1.86-4.03 2.96-6.41 2.68-2.33-.17-4.61-1.6-5.48-3.77-.89-2.14-.52-4.73 1.03-6.41 1.57-1.74 4.21-2.47 6.46-1.87.01-1.31.01-2.62.02-3.93-1.42-.33-2.92-.1-4.26.43-1.88.71-3.42 2.24-4.02 4.12-.65 2-.36 4.24.78 6.02 1.14 1.82 3.13 3.04 5.25 3.21 2.3.2 4.71-.55 6.21-2.3 1.52-1.71 1.97-4.14 1.61-6.36V4.4c-.81-.55-1.54-1.2-2.14-1.97-.65-.84-1.1-1.81-1.32-2.85-.05-.26-.07-.52-.07-.78z"/>
                </svg>
              </a>
            </div>
            
            <div className="text-sm text-center md:text-right">
              <div>33 Malate St, Cabuyao City, Laguna</div>
              <div>Philippines</div>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chat Assistant */}
      <ChatBot />
    </div>
  );
}
