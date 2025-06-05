export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  category: string;
  organizer: {
    name: string;
    avatar: string;
  };
  tickets: {
    total: number;
    sold: number;
  };
}

export const events: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2025",
    description: "Join us for a day of amazing music performances from top artists across multiple genres. Food, drinks, and good vibes included!",
    date: "July 15, 2025",
    time: "12:00 PM - 10:00 PM",
    location: "Kololo Airstrip, Kampala, Uganda",
    price: "0.05 ETH",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center",
    category: "music",
    organizer: {
      name: "EventMasters",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    tickets: {
      total: 1000,
      sold: 750
    }
  },
  {
    id: "2",
    title: "Blockchain Developer Conference",
    description: "A two-day conference featuring workshops, talks, and networking opportunities for blockchain developers and enthusiasts.",
    date: "August 5-6, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "KICC Convention Center, Nairobi, Kenya",
    price: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&crop=center",
    category: "tech",
    organizer: {
      name: "BlockchainDevs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    tickets: {
      total: 500,
      sold: 320
    }
  },
  {
    id: "3",
    title: "NFT Art Exhibition",
    description: "Explore the world of digital art with this exclusive NFT exhibition featuring works from renowned digital artists.",
    date: "September 10, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "National Theatre, Lagos, Nigeria",
    price: "0.03 ETH",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop&crop=center",
    category: "art",
    organizer: {
      name: "NFTCurators",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3eb?w=100&h=100&fit=crop&crop=face"
    },
    tickets: {
      total: 300,
      sold: 150
    }
  },
  {
    id: "4",
    title: "Web3 Hackathon",
    description: "A weekend-long hackathon for developers to build innovative Web3 applications with mentorship from industry experts.",
    date: "October 15-17, 2025",
    time: "Starts at 9:00 AM",
    location: "University of Ghana, Accra, Ghana",
    price: "0.02 ETH",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop&crop=center",
    category: "tech",
    organizer: {
      name: "Web3Builders",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face"
    },
    tickets: {
      total: 200,
      sold: 180
    }
  },
  {
    id: "5",
    title: "DeFi Summit",
    description: "Learn about the latest trends and innovations in decentralized finance from industry leaders and pioneers.",
    date: "November 20, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Sandton Convention Centre, Johannesburg, South Africa",
    price: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&crop=center",
    category: "tech",
    organizer: {
      name: "DeFiAlliance",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    },
    tickets: {
      total: 400,
      sold: 250
    }
  },
  {
    id: "6",
    title: "Metaverse Expo",
    description: "Experience the future of virtual worlds and digital interactions at this immersive metaverse exhibition.",
    date: "December 5, 2025",
    time: "11:00 AM - 7:00 PM",
    location: "Julius Nyerere Convention Centre, Dar es Salaam, Tanzania",
    price: "0.04 ETH",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=600&fit=crop&crop=center",
    category: "tech",
    organizer: {
      name: "MetaCreators",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    },
    tickets: {
      total: 600,
      sold: 420
    }
  }
];
