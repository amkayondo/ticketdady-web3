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
    location: "Central Park, New York",
    price: "0.05 ETH",
    image: "/images/event1.jpg",
    category: "music",
    organizer: {
      name: "EventMasters",
      avatar: "/images/organizer1.jpg"
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
    location: "Tech Hub, San Francisco",
    price: "0.1 ETH",
    image: "/images/event2.jpg",
    category: "tech",
    organizer: {
      name: "BlockchainDevs",
      avatar: "/images/organizer2.jpg"
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
    location: "Digital Art Gallery, Miami",
    price: "0.03 ETH",
    image: "/images/event3.jpg",
    category: "art",
    organizer: {
      name: "NFTCurators",
      avatar: "/images/organizer3.jpg"
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
    location: "Innovation Center, Berlin",
    price: "0.02 ETH",
    image: "/images/event4.jpg",
    category: "tech",
    organizer: {
      name: "Web3Builders",
      avatar: "/images/organizer4.jpg"
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
    location: "Finance District, London",
    price: "0.08 ETH",
    image: "/images/event5.jpg",
    category: "tech",
    organizer: {
      name: "DeFiAlliance",
      avatar: "/images/organizer5.jpg"
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
    location: "Virtual Reality Center, Tokyo",
    price: "0.04 ETH",
    image: "/images/event6.jpg",
    category: "tech",
    organizer: {
      name: "MetaCreators",
      avatar: "/images/organizer6.jpg"
    },
    tickets: {
      total: 600,
      sold: 420
    }
  }
];
