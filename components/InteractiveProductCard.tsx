"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

interface InteractiveProductCardProps {
  product: Product;
  index: number;
}

const InteractiveProductCard: React.FC<InteractiveProductCardProps> = ({
  product,
  index,
}) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // tablets and below
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile auto-play logic with Intersection Observer
  useEffect(() => {
    if (!isMobile || !product.video || hasAutoPlayed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Card is visible, wait 1 second then play
            autoPlayTimeoutRef.current = setTimeout(() => {
              setShowVideo(true);
              setHasAutoPlayed(true);
              if (videoRef.current) {
                videoRef.current.play().catch((err) => {
                  console.log("Auto-play prevented:", err);
                });
              }
            }, 1000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isMobile, product.video, hasAutoPlayed]);

  // Desktop hover logic
  useEffect(() => {
    if (isMobile || !product.video) return;

    if (isHovered) {
      setShowVideo(true);
      // Play video when it's loaded
      if (videoRef.current && videoLoaded) {
        videoRef.current.play().catch((err) => {
          console.log("Play prevented:", err);
        });
      }
    } else {
      setShowVideo(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isMobile, videoLoaded, product.video]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    // Auto-play if already showing video
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Play prevented:", err);
      });
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={!isMobile ? { y: -15 } : undefined}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => addToCart(product)}
      className="group relative cursor-pointer"
    >
      {/* Decorative Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 via-gold-600/20 to-gold-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      <div className="relative glass-premium rounded-2xl overflow-hidden shadow-2xl hover:shadow-gold-500/20 transition-all duration-500 border border-transparent group-hover:border-gold-500/30">
        {/* Product Image/Video - Full Cover */}
        <div className="relative h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
          {/* Image Layer */}
          <AnimatePresence mode="wait">
            {!showVideo && (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={!isMobile ? { scale: 1.1 } : undefined}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Layer */}
          {product.video && (
            <AnimatePresence>
              {showVideo && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <video
                    ref={videoRef}
                    src={product.video}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    preload={isMobile ? "auto" : "metadata"}
                    poster={product.image}
                    onLoadedData={handleVideoLoad}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Gradient Overlay - Subtle */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={!isMobile ? { x: "100%" } : undefined}
            transition={{ duration: 0.6 }}
          />

          {/* Add to Cart Overlay - Shows on Hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 gradient-gold-animated text-black text-lg font-bold rounded-lg shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              Add to Cart
            </motion.div>
          </div>

          {/* Mobile Video Indicator */}
          {isMobile && showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 left-4 pointer-events-none"
            >
              <div className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-2">
                <Volume2 className="w-3 h-3 text-white" />
                <span className="text-xs text-white">Playing</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveProductCard;
