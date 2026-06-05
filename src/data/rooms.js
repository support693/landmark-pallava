import room1 from '../assets/rooms/room1.webp'
import room2 from '../assets/rooms/room2.webp'
import room3 from '../assets/rooms/room3.webp'
import room4 from '../assets/rooms/room4.jpg'

export const rooms = [
  {
    id: 1,
    slug: 'deluxe-family-room',
    category: 'Deluxe',
    type: 'Deluxe Family Room',
    view: 'Garden View',
    size: '17 m² / 183 ft²',
    floor: 'First & Second Floor',
    occupancy: { adults: 2, children: 0 },
    bed: '1 Super King Bed',
    priceWeekday: 5000,
    priceWeekend: 7499,
    price: 5000,
    tag: 'Recommended',
    images: [room1, room2, room3, room4],
    shortDesc: 'A spacious and elegantly appointed room with a garden view — perfect for couples seeking comfort and style.',
    longDesc: 'The Deluxe Family Room is crafted for couples who demand both comfort and elegance. Featuring a super king bed, warm ambient lighting, and a lush garden view, this room offers a serene retreat. The room accommodates 2 adults. Children below 5 years of age stay absolutely free.',
    badges: ['Recommended', 'Garden View', 'Children below 5 stay FREE!'],
    amenities: [
      'Free Wi-Fi',
      'Garden View',
      'Electric Kettle',
      'Private Bathroom',
      'Shower',
      'Towels',
      'Toiletries',
      'Satellite / Cable Channels',
      'Air Conditioning',
      'Free Bottled Water',
      'Refrigerator',
    ],
    highlights: [
      'Free high-speed Wi-Fi',
      'Lush garden view',
      '2 Adults per room',
      'Children below 5 years stay FREE',
      'Complimentary bottled water',
      'Early check-in on request',
    ],
    policies: {
      checkIn: '2:00 PM',
      checkOut: '12:00 PM',
      cancellation: 'Free cancellation up to 48 hours before arrival',
    },
  },
]

export const categories = ['All', 'Deluxe']
