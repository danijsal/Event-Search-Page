import { MapPin, Calendar, Heart, Clock, Star, Repeat, Plus } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  city: string;
  price: string;
  category: string;
  isFavorite: boolean;
  isPopular?: boolean;
  isRecurring?: boolean;
}

interface MobileEventCardProps {
  event: Event;
}

export function MobileEventCard({ event }: MobileEventCardProps) {
  const [isFavorite, setIsFavorite] = useState(event.isFavorite);
  const [isAdded, setIsAdded] = useState(false);

  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden active:scale-[0.98] transition-all ${
      event.isPopular ? 'border-2 border-orange-400' : 'border border-gray-200'
    }`}>
      {/* Image */}
      <div className="relative h-48">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
              }`}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAdded(!isAdded);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all ${
              isAdded 
                ? 'bg-orange-600 text-white' 
                : 'bg-white/90 backdrop-blur-sm text-gray-700'
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white/90 text-xs">
            {event.category}
          </Badge>
          {event.isPopular && (
            <Badge className="bg-orange-500 text-white hover:bg-orange-500 text-xs flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              Popular
            </Badge>
          )}
          {event.isRecurring && (
            <Badge className="bg-blue-500 text-white hover:bg-blue-500 text-xs flex items-center gap-1">
              <Repeat className="w-3 h-3" />
              Recurring
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{event.date}</span>
            <Clock className="w-4 h-4 flex-shrink-0 ml-1" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{event.location}, {event.city}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-gray-900">{event.price}</span>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm active:scale-95 transition-transform">
            Get Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
