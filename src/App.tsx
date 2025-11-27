import { useState } from 'react';
import { Search, MapPin, Calendar, Heart, SlidersHorizontal, Compass, Ticket, User, Home } from 'lucide-react';
import { Input } from './components/ui/input';
import { MobileEventCard } from './components/MobileEventCard';
import { MobileMapView } from './components/MobileMapView';

const moods = [
  { id: 1, name: 'Energetic', emoji: '⚡', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 2, name: 'Relaxing', emoji: '🧘', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 3, name: 'Social', emoji: '🎉', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 4, name: 'Cultural', emoji: '🎭', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { id: 5, name: 'Adventurous', emoji: '🏔️', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 6, name: 'Creative', emoji: '🎨', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
];

const events = [
  {
    id: 1,
    title: 'Summer Music Festival 2024',
    image: 'https://images.unsplash.com/photo-1656283384093-1e227e621fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBjcm93ZHxlbnwxfHx8fDE3NjQyMzEyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Sat, Dec 14',
    time: '6:00 PM',
    location: 'Golden Gate Park',
    city: 'San Francisco',
    price: '$45.00',
    category: 'Music',
    isFavorite: true,
    isPopular: true,
    isRecurring: false,
  },
  {
    id: 2,
    title: 'Urban Food & Wine Experience',
    image: 'https://images.unsplash.com/photo-1551883709-2516220df0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBvdXRkb29yfGVufDF8fHx8MTc2NDI1MDM1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Sun, Dec 15',
    time: '12:00 PM',
    location: 'Pier 39',
    city: 'San Francisco',
    price: '$65.00',
    category: 'Food & Drink',
    isFavorite: false,
    isPopular: false,
    isRecurring: false,
  },
  {
    id: 3,
    title: 'Morning Yoga in the Park',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwd2VsbG5lc3MlMjBjbGFzc3xlbnwxfHx8fDE3NjQyNTE0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Sat, Dec 14',
    time: '8:00 AM',
    location: 'Dolores Park',
    city: 'San Francisco',
    price: 'Free',
    category: 'Health',
    isFavorite: false,
    isPopular: false,
    isRecurring: true,
  },
  {
    id: 4,
    title: 'Tech Summit: AI & Innovation',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzY0MTc0Mzk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Mon, Dec 16',
    time: '9:00 AM',
    location: 'Moscone Center',
    city: 'San Francisco',
    price: '$150.00',
    category: 'Business',
    isFavorite: true,
    isPopular: true,
    isRecurring: false,
  },
  {
    id: 5,
    title: 'Contemporary Art Exhibition',
    image: 'https://images.unsplash.com/photo-1719935115623-4857df23f3c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NjQyMzI2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Fri, Dec 13',
    time: '6:00 PM',
    location: 'SFMOMA',
    city: 'San Francisco',
    price: '$25.00',
    category: 'Arts',
    isFavorite: false,
    isPopular: false,
    isRecurring: false,
  },
  {
    id: 6,
    title: 'Warriors vs Lakers',
    image: 'https://images.unsplash.com/photo-1764050359179-517599dab87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwZXZlbnR8ZW58MXx8fHwxNzY0MjIzMjYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: 'Thu, Dec 19',
    time: '7:30 PM',
    location: 'Chase Center',
    city: 'San Francisco',
    price: '$89.00',
    category: 'Sports',
    isFavorite: true,
    isPopular: false,
    isRecurring: true,
  },
];

export default function App() {
  const [selectedMoods, setSelectedMoods] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'map' | 'tickets' | 'profile'>('browse');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMood = (id: number) => {
    setSelectedMoods((prev) =>
      prev.includes(id) ? prev.filter((moodId) => moodId !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-orange-600">eventbrite</h1>
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-full"
          />
        </div>
      </header>

      {/* Location & Filter Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">San Francisco</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">This week</span>
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'browse' && (
          <>
            {/* Mood Categories */}
            <div className="bg-white border-b border-gray-200 px-4 py-4">
              <p className="text-gray-700 mb-3 text-sm">Choose your mood</p>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => toggleMood(mood.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full border-2 transition-all text-sm ${
                      selectedMoods.includes(mood.id)
                        ? mood.color + ' border-current shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    <span className="mr-1.5">{mood.emoji}</span>
                    {mood.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mini Map */}
            <div className="bg-white border-b border-gray-200 px-4 py-4">
              <div className="h-48 rounded-xl overflow-hidden">
                <MobileMapView events={events} compact />
              </div>
            </div>

            {/* Events List */}
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-gray-900">Nearby Events</h2>
                  <p className="text-gray-500 text-sm mt-0.5">{events.length} events</p>
                </div>
              </div>
              <div className="space-y-4">
                {events.map((event) => (
                  <MobileEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'map' && (
          <div className="h-full">
            <MobileMapView events={events} />
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <Ticket className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-gray-900 mb-2">No tickets yet</h3>
            <p className="text-gray-500 text-sm">Your tickets will appear here after purchase</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-gray-900 mb-2">Welcome!</h3>
            <p className="text-gray-500 text-sm mb-6">Sign in to personalize your experience</p>
            <button className="px-6 py-3 bg-orange-600 text-white rounded-full">
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 flex-shrink-0 absolute bottom-0 left-0 right-0">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'browse' ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Browse</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'map' ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'tickets' ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            <Ticket className="w-6 h-6" />
            <span className="text-xs">Tickets</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 py-2 px-4 ${
              activeTab === 'profile' ? 'text-orange-600' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
