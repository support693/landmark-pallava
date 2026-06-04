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
    occupancy: { adults: 3, children: 2 },
    bed: '1 Super King Bed',
    priceWeekday: 6000,
    priceWeekend: 7500,
    price: 6000,
    tag: 'Recommended',
    images: [room1, room2, room3, room4],
    shortDesc: 'A spacious and elegantly appointed room with a garden view — perfect for families seeking comfort and style.',
    longDesc: 'The Deluxe Family Room is crafted for families who demand both comfort and elegance. Featuring a super king bed, warm ambient lighting, and a lush garden view, this room offers a serene retreat. Kids stay for free, and the room comfortably accommodates up to 3 adults, making it ideal for groups and families alike.',
    badges: ['Recommended', 'Your kids can stay for FREE!', 'Fits groups'],
    amenities: [
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
      'Lush garden view',
      'Kids stay for FREE',
      'Fits groups up to 3 adults',
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
