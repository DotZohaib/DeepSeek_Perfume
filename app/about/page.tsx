"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Award,
  Users,
  Target,
  Eye,
  TrendingUp,
  Star,
  Package,
  Globe,
} from "lucide-react";
import Link from "next/link";

const AboutPage = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Craftsmanship",
      description:
        "Every bottle is a masterpiece, crafted with precision and passion.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Our love for fragrance drives us to create unforgettable scents.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our creations.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with our valued customers.",
    },
  ];

  const stats = [
    { number: "11+", label: "Premium Fragrances", icon: Package },
    { number: "100%", label: "Authentic Products", icon: Award },
    { number: "24/7", label: "Customer Support", icon: Users },
    { number: "2025", label: "Founded", icon: Star },
  ];

  const timeline = [
    {
      year: "2025",
      title: "The Beginning",
      description:
        "DotScent was founded in Karachi, Pakistan by Mr. Rizwan Khalil with a vision to bring luxury fragrances to discerning customers.",
    },
    {
      year: "Present",
      title: "Growing Collection",
      description:
        "Expanded to 11 premium fragrances, each crafted with the finest ingredients from around the world.",
    },
    {
      year: "Future",
      title: "Global Vision",
      description:
        "Continuing our journey to become a globally recognized luxury fragrance brand.",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="p-4 gradient-gold rounded-full inline-block">
              <Sparkles className="w-12 h-12 text-black" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
            <span className="text-gradient">Our Story</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Where luxury meets artistry in every drop
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="glass-premium rounded-2xl p-6 md:p-8 text-center"
            >
              <div className="inline-block p-3 bg-gold-500/20 rounded-full mb-4">
                <stat.icon className="w-6 h-6 text-gold-500" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Brand Story */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="glass-premium rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gradient mx-6">
                The DotScent Journey
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed max-w-4xl mx-auto">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="text-lg md:text-xl"
              >
                DotScent is a luxury fragrance brand that was founded in 2025 in
                the vibrant city of Karachi, Pakistan. Under the visionary
                leadership of our CEO,{" "}
                <span className="text-gold-500 font-semibold">
                  Mr. Rizwan Khalil
                </span>
                , we embarked on a mission to redefine luxury perfumery.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="text-lg md:text-xl"
              >
                Each DotScent perfume is more than just a fragrance—it&apos;s an
                experience, a memory, a piece of art. We source the finest
                ingredients from around the world, from the jasmine fields of
                Grasse to the oud forests of Southeast Asia, ensuring every
                bottle captures the essence of luxury.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="text-lg md:text-xl"
              >
                Today, DotScent stands as a testament to the power of passion
                and craftsmanship. We continue to push boundaries, creating
                scents that resonate with the modern individual who appreciates
                quality, elegance, and authenticity.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            whileHover={{ y: -10 }}
            className="glass-premium rounded-3xl p-8 md:p-10"
          >
            <div className="inline-block p-4 gradient-gold rounded-full mb-6">
              <Eye className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-3xl font-playfair font-bold text-white mb-4">
              Our Vision
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              To become a globally recognized luxury fragrance brand, celebrated
              for our exceptional quality, innovative scents, and commitment to
              craftsmanship. We envision a world where DotScent is synonymous
              with elegance and sophistication.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            whileHover={{ y: -10 }}
            className="glass-premium rounded-3xl p-8 md:p-10"
          >
            <div className="inline-block p-4 gradient-gold rounded-full mb-6">
              <Target className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-3xl font-playfair font-bold text-white mb-4">
              Our Mission
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              To create luxurious, high-quality fragrances that inspire
              confidence and evoke emotion. We are dedicated to providing our
              customers with an unparalleled olfactory experience through
              meticulous craftsmanship and premium ingredients.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-white mb-12">
            Our <span className="text-gradient">Timeline</span>
          </h2>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="glass-premium rounded-2xl p-6 md:p-8 relative overflow-hidden"
              >
                {/* Year Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 gradient-gold rounded-full">
                  <span className="text-black font-bold text-sm">
                    {item.year}
                  </span>
                </div>

                <div className="pr-24">
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold text-gold-500 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white text-center mb-12">
            Our <span className="text-gradient">Values</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass-premium rounded-2xl p-8 text-center relative overflow-hidden group"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500/20 via-gold-600/20 to-gold-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block p-4 gradient-gold rounded-full mb-6"
                  >
                    <value.icon className="w-8 h-8 text-black" />
                  </motion.div>

                  <h3 className="text-xl font-playfair font-bold text-white mb-4">
                    {value.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2 }}
          className="glass-premium rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-gold-600/10 to-gold-500/5" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3.4, type: "spring" }}
              className="inline-block p-4 gradient-gold rounded-full mb-8"
            >
              <Globe className="w-10 h-10 text-black" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-6">
              Join Our <span className="text-gradient">Journey</span>
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Experience the art of perfumery and discover your signature scent
              with DotScent&apos;s exclusive collection of luxury fragrances.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 gradient-gold text-black text-lg font-bold rounded-lg shadow-2xl hover:shadow-gold-500/50 transition-shadow w-full sm:w-auto"
                >
                  Explore Our Collection
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 glass border-2 border-gold-500 text-white text-lg font-bold rounded-lg hover:bg-gold-500/10 transition-colors w-full sm:w-auto"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
