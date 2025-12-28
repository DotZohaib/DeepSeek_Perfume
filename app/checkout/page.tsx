"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { User, MapPin, Phone, ShoppingBag, MessageCircle } from "lucide-react";

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const cartTotal = getCartTotal();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s+()-]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppCheckout = () => {
    if (!validateForm()) {
      return;
    }

    // Format the order details for WhatsApp
    let message = `*New Order from DotScent*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}\n`;
    message += `City: ${formData.city}\n`;
    if (formData.postalCode) {
      message += `Postal Code: ${formData.postalCode}\n`;
    }
    message += `\n*Order Items:*\n`;

    cart.forEach((item, index) => {
      message += `\n${index + 1}. ${item.name}\n`;
      message += `   Category: ${item.category}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: Rs${item.price} each\n`;
      message += `   Subtotal: Rs${item.price * item.quantity}\n`;
    });

    message += `\n*Total Amount: Rs${cartTotal}*\n`;
    message += `\nThank you for choosing DotScent! 🌟`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);

    // Replace with your actual WhatsApp business number (include country code without + or spaces)
    const whatsappNumber = "+923194635913"; // Example: '1234567890' for +1 (234) 567-890

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Clear the cart after successful order
    clearCart();

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");

    // Redirect to a thank you page or home
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Add some items to your cart before checking out
              </p>
              <button
                onClick={() => router.push("/shop")}
                className="px-8 py-4 gradient-gold text-black font-bold rounded-lg"
              >
                Browse Products
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
            Checkout
          </h1>
          <p className="text-xl text-gray-400">Complete your order details</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-gold-500" />
                Customer Information
              </h2>

              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "ring-2 ring-red-500"
                        : "focus:ring-gold-500"
                    } text-white`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "ring-2 ring-red-500"
                        : "focus:ring-gold-500"
                    } text-white`}
                    placeholder="+1 234 567 8900"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Street Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 ${
                      errors.address
                        ? "ring-2 ring-red-500"
                        : "focus:ring-gold-500"
                    } text-white resize-none`}
                    placeholder="123 Luxury Avenue, Apartment 4B"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City and Postal Code */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 ${
                        errors.city
                          ? "ring-2 ring-red-500"
                          : "focus:ring-gold-500"
                      } text-white`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-400">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 text-white"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </form>
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

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start pb-4 border-b border-gold-500/20"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-gold-500 font-semibold">
                      Rs{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>Rs{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-gold-500/20 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-gold-500">Rs{cartTotal}</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 gradient-gold text-black font-bold rounded-lg mb-4 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order via WhatsApp</span>
              </motion.button>

              <p className="text-xs text-gray-400 text-center">
                You will be redirected to WhatsApp to complete your order
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
