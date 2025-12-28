"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Award, Shield, Truck } from "lucide-react";
import { featuredProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import HeroSlider from "@/components/HeroSlider";
import VideoShowcase from "@/components/VideoShowcase";
import InteractiveProductCard from "@/components/InteractiveProductCard";

const HomePage = () => {
  const { addToCart } = useCart();

  const features = [
    {
      icon: Sparkles,
      title: "Premium Quality",
      description:
        "Handcrafted with the finest ingredients from around the world.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized globally for exceptional fragrance compositions.",
    },
    {
      icon: Shield,
      title: "Authenticity Guaranteed",
      description: "100% genuine luxury perfumes with quality certification.",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Complimentary shipping on all orders above Rs100.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Featured Collection Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
            >
              Best Sellers
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg">
              Our most loved fragrances
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.slice(0, 3).map((product, index) => (
              <InteractiveProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass border-2 border-gold-500 text-white font-semibold rounded-lg hover:bg-gold-500/10 transition-colors"
              >
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Why Choose Us Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4"
            >
              Why Choose DotScent
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg">
              Excellence in every aspect
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass rounded-xl p-8 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block p-4 gradient-gold rounded-full mb-6"
                >
                  <feature.icon className="w-8 h-8 text-black" />
                </motion.div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-t from-black to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Experience Luxury Today
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of satisfied customers who have discovered their
            signature scent
          </p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-10 py-5 gradient-gold text-black text-lg font-bold rounded-lg flex items-center space-x-3 mx-auto shadow-2xl hover:shadow-gold-500/50 transition-shadow"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
