# DotScent - Luxury Perfume E-commerce Website

A high-performance, luxury perfume e-commerce website built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion.

## 🌟 Features

### Core Functionality
- **Client-Side Cart System**: Full shopping cart functionality using React Context API with LocalStorage persistence
- **WhatsApp Checkout**: Complete checkout flow that sends order details directly to seller via WhatsApp (no backend required)
- **Product Filtering**: Browse products by category (Men, Women, Unisex)
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

### Design & UX
- **Luxury Aesthetic**: Gold/Black/White color scheme with premium typography (Playfair Display & Inter)
- **Glassmorphism Effects**: Modern frosted glass UI components
- **Advanced Animations**: Framer Motion animations including:
  - Page transitions
  - Scroll animations
  - Staggered list entries
  - Hover effects and micro-interactions
- **Premium Components**: Navbar with sticky glassmorphism, professional footer, animated product cards

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure WhatsApp Number**
   
   Open `app/checkout/page.tsx` and update line 51 with your WhatsApp business number:
   ```typescript
   const whatsappNumber = '1234567890'; // Replace with your number (country code + number, no + or spaces)
   ```
   Example: For +1 (234) 567-8900, use: `1234567890`

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
dotscent/
├── app/
│   ├── about/           # About page with brand story
│   ├── cart/            # Shopping cart page
│   ├── checkout/        # Checkout with WhatsApp integration
│   ├── contact/         # Contact page with form
│   ├── shop/            # Products listing with filters
│   ├── layout.tsx       # Root layout with providers
│   ├── page.tsx         # Home page with hero & features
│   └── globals.css      # Global styles & utilities
├── components/
│   ├── Navbar.tsx       # Sticky navigation with cart badge
│   └── Footer.tsx       # Footer with links & newsletter
├── contexts/
│   └── CartContext.tsx  # Cart state management
├── data/
│   └── products.ts      # Product catalog
└── public/
    └── images/          # Product images (add your images here)
```

## 🛍️ How It Works

### Shopping Flow
1. **Browse Products**: Visit the Shop page to view all perfumes
2. **Filter by Category**: Use category buttons to filter products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click cart icon in navbar to review items
5. **Adjust Quantities**: Increase/decrease quantities or remove items
6. **Checkout**: Click "Proceed to Checkout"
7. **Enter Details**: Fill in customer information
8. **WhatsApp Order**: Click "Order via WhatsApp" to send order to seller

### WhatsApp Integration
The checkout page formats the order as a WhatsApp message including:
- Customer details (name, phone, address)
- All cart items with quantities and prices
- Total amount
- Opens WhatsApp with pre-filled message for customer to send

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the gold color palette:
```typescript
colors: {
  gold: {
    500: '#d4b982', // Adjust to your preferred gold tone
    // ... other shades
  },
}
```

### Products
Edit `data/products.ts` to add/modify products:
```typescript
{
  id: 1,
  name: "Product Name",
  price: 12500, // Price in cents (Rs125.00)
  category: "men" | "women" | "unisex",
  description: "Product description",
  image: "/images/yourimage.jpg",
  featured: true // Show on homepage
}
```

### Fonts
Current fonts: Playfair Display (headings) & Inter (body text).
To change, update the Google Fonts import in `app/globals.css`.

## 🖼️ Adding Product Images

Place your product images in the `public/images/` directory and reference them in `data/products.ts`:
```typescript
image: "/images/perfume1.jpg"
```

## 📱 Pages

- **/** - Home page with hero, featured products, and values
- **/shop** - Full product catalog with category filtering
- **/cart** - Shopping cart with quantity controls
- **/checkout** - Checkout form with WhatsApp integration
- **/about** - Brand story and company values
- **/contact** - Contact form and business information

## 🔧 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: LocalStorage (cart persistence)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

This app can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting platform**

No backend or database required - fully client-side!

## ⚙️ Environment Variables

No environment variables required. The app runs entirely client-side.

## 📝 License

This project is open source and available under the MIT License.

## 🎯 Key Features Implemented

✅ Next.js 14 App Router  
✅ TypeScript throughout  
✅ Tailwind CSS with luxury design  
✅ Framer Motion animations  
✅ LocalStorage cart persistence  
✅ WhatsApp checkout integration  
✅ Category filtering  
✅ Responsive design  
✅ Glassmorphism effects  
✅ No backend required  

## 🤝 Support

For questions or issues, please visit the contact page or reach out via the provided contact information.

---

**Built with ❤️ for luxury perfume enthusiasts**
