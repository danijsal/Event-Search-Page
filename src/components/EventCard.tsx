import { MapPin, Calendar, Heart } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Event {
  id: number;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  category: string;
  isFavorite: boolean;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(event.isFavorite);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden group cursor-pointer">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          <Badge className="absolute bottom-3 left-3 bg-white text-gray-900 hover:bg-white">
            {event.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <h3 className="text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
            {event.title}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-900">{event.price}</span>
            <button className="text-orange-600 hover:text-orange-700 text-sm">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
