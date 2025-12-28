"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Check } from "lucide-react";

type FilterCategory = "all" | "men" | "women" | "unisex";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("all");
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const { addToCart } = useCart();

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categories: { label: string; value: FilterCategory }[] = [
    { label: "All", value: "all" },
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Unisex", value: "unisex" },
  ];

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-gray-400">Discover your signature scent</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="glass rounded-full p-2 inline-flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "gradient-gold text-black"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                className="group"
              >
                <div className="glass rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold-500/20 transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative h-72 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 glass text-xs uppercase tracking-wider text-gold-500 font-medium rounded-full">
                        {product.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToCart(product)}
                        className="px-6 py-3 gradient-gold text-black font-bold rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center space-x-2"
                      >
                        {addedToCart === product.id ? (
                          <>
                            <Check className="w-5 h-5" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <span>Add to Cart</span>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div>
                      <h3 className="text-xl font-playfair font-bold text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {product.volume}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold-500">
                        Rs{product.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className="px-4 py-2 glass border border-gold-500 text-gold-500 text-sm font-semibold rounded-lg hover:bg-gold-500/10 transition-colors"
                      >
                        {addedToCart === product.id ? "Added!" : "Quick Add"}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-2xl text-gray-400">
              No products found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
