"use client";

import React from "react";
import { motion } from "framer-motion";

const VideoShowcase = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          {/* Decorative Background Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-gold-600/20 to-gold-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Auto-playing Video */}
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative aspect-video"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/perfume.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Shimmer Effect on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Decorative Corner Accents */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-500/50 rounded-tl-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-500/50 rounded-br-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
