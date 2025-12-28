"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } =
    useCart();

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3,
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
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-gray-400">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="glass rounded-3xl p-16 max-w-md mx-auto">
              <ShoppingBag className="w-24 h-24 text-gold-500 mx-auto mb-6" />
              <h2 className="text-3xl font-playfair font-bold text-white mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-400 mb-8">
                Discover our exclusive collection of luxury perfumes
              </p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 gradient-gold text-black font-bold rounded-lg inline-flex items-center space-x-2"
                >
                  <span>Start Shopping</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* Cart Items */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-4"
              >
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      exit="exit"
                      layout
                      className="glass rounded-2xl p-6 flex flex-col sm:flex-row gap-6"
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-playfair font-bold text-white mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm uppercase tracking-wider text-gold-500">
                              {item.category}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-gold-500/20 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </motion.button>
                            <span className="text-white font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-gold-500/20 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm text-gray-400">
                              Rs{item.price} each
                            </p>
                            <p className="text-xl font-bold text-gold-500">
                              Rs{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-2xl p-8 sticky top-28"
              >
                <h2 className="text-2xl font-playfair font-bold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>Rs{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="border-t border-gold-500/20 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-gold-500">Rs{cartTotal}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 gradient-gold text-black font-bold rounded-lg mb-4 flex items-center justify-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                <Link href="/shop">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 glass border border-gold-500 text-white font-semibold rounded-lg hover:bg-gold-500/10 transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-gold-500/20">
                  <p className="text-xs text-gray-400 text-center">
                    🔒 Secure checkout powered by WhatsApp
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
