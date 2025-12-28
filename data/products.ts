export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  video?: string;
  volume?: string;
  category: "men" | "women" | "unisex";
  description: string;
  featured?: boolean;
}

export const products: Product[] = [
  // Men's Collection
  {
    id: 1,
    name: "K.Soul",
    price: 1600,
    image: "/images/K.Soul.png",
    video: "/videos/soul.mp4",
    volume: "50ml",
    category: "unisex",
    description:
      "Experience the beautiful contradiction: a delicate bloom wrapped in a deep, captivating leather.",
    featured: true,
  },
  {
    id: 2,
    name: "Jamaal",
    price: 1600,
    image: "/images/Jamaal.png",
    video: "/videos/jamal.mp4",
    volume: "50ml",
    category: "men",
    description:
      "A bold fusion of spicy black pepper and pineapple, deepened by coffee and tobacco, resting on a warm amber-vanilla woody base.",
    featured: true,
  },
  {
    id: 3,
    name: "Bemolds",
    price: 1500,
    image: "/images/Bemolds.png",
    volume: "50ml",
    category: "men",
    description:
      "Fresh citrus opening with woody undertones, perfect for day wear.",
  },
  {
    id: 4,
    name: "Parisa",
    price: 1500,
    image: "/images/Parisa.png",
    volume: "50ml",
    category: "unisex",
    description: "Much deeper, darker, and more opulent.",
  },

  // Women's Collection
  {
    id: 5,
    name: "Zawar",
    price: 1600,
    image: "/images/Zawar.png",
    volume: "50ml",
    category: "women",
    description:
      "The warm breath of the desert wind, carrying rare resins and the promise of devotion.",
  },
  {
    id: 6,
    name: "Azar",
    price: 1400,
    image: "/images/Azar 2.jpg",
    volume: "50ml",
    category: "unisex",
    description:
      "Bold and incandescent. An unforgettable glow that leaves a fiery trail of confidence.",
  },
  {
    id: 7,
    name: "Blossom",
    price: 1400,
    image: "/images/Blossom.png",
    volume: "50ml",
    category: "unisex",
    description: "Let your day blossom with the perfect scent.",
  },
  {
    id: 8,
    name: "Jannam",
    price: 1500,
    image: "/images/Jannam.png",
    volume: "50ml",
    category: "women",
    description: "Mysterious and alluring with black orchid and truffle.",
  },

  // Unisex Collection
  {
    id: 9,
    name: "Deepseek",
    price: 1500,
    image: "/images/Deepseek.png",
    video: "/videos/deepseek.mp4",
    volume: "50ml",
    category: "men",
    description:
      "Noble freshness meets raw power the only signature you need to command the room.",
    featured: true,
  },
  {
    id: 10,
    name: "Jannisar",
    price: 1500,
    image: "/images/Jannisar 1.png",
    volume: "50ml",
    category: "men",
    description: "Jannisar is a Woody Spicy fragrance for men.",
  },
  {
    id: 11,
    name: "Pehchan",
    price: 1600,
    image: "/images/Pehchan 2.png",
    volume: "50ml",
    category: "unisex",
    description: "Ethereal blend of lavender, cedar, and vanilla.",
  },
];

export const featuredProducts = products.filter((p) => p.featured);
