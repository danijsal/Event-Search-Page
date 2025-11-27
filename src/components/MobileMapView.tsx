import { MapPin, Navigation, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  location: string;
  city: string;
  price: string;
  date: string;
  time: string;
}

interface MobileMapViewProps {
  events: Event[];
  compact?: boolean;
}

export function MobileMapView({ events, compact = false }: MobileMapViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Simulated map markers positioned on the map
  const markers = [
    { id: 1, top: '25%', left: '35%' },
    { id: 2, top: '45%', left: '55%' },
    { id: 3, top: '60%', left: '40%' },
    { id: 4, top: '35%', left: '65%' },
    { id: 5, top: '70%', left: '50%' },
    { id: 6, top: '50%', left: '30%' },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mobile-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobile-grid)" />
          </svg>
        </div>

        {/* Simulated Streets */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gray-300"></div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400"></div>
          <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-gray-300"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        </div>

        {/* Park Areas */}
        <div className="absolute top-1/4 left-1/3 w-28 h-28 bg-green-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-green-200 rounded-full opacity-40"></div>

        {/* Water Body */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-200 opacity-30"></div>

        {/* Event Markers */}
        {markers.map((marker, index) => {
          const event = events[index];
          if (!event) return null;

          const isSelected = selectedEvent === event.id;

          return (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ top: marker.top, left: marker.left }}
              onClick={() => !compact && setSelectedEvent(isSelected ? null : event.id)}
            >
              {/* Marker Pin */}
              <div className={`relative transition-transform ${isSelected ? 'scale-125' : ''}`}>
                <div className={`rounded-full flex items-center justify-center shadow-lg border-white active:scale-95 transition-all ${
                  compact ? 'w-7 h-7 border-2' : 'w-10 h-10 border-4'
                } ${isSelected ? 'bg-orange-600' : 'bg-orange-500'}`}>
                  <MapPin className={`text-white fill-white ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
                </div>
                
                {/* Pulse Effect for Selected */}
                {isSelected && !compact && (
                  <div className="absolute inset-0 rounded-full bg-orange-600 animate-ping opacity-30"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Controls */}
      {!compact && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform">
            <Navigation className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform">
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform">
            <Minus className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}

      {/* Map Label */}
      <div className={`absolute z-10 ${compact ? 'top-2 left-2' : 'top-4 left-4'}`}>
        <div className="bg-white px-3 py-1.5 rounded-full shadow-lg">
          <p className={`text-gray-700 ${compact ? 'text-xs' : 'text-sm'}`}>San Francisco, CA</p>
        </div>
      </div>

      {/* Selected Event Card */}
      {selectedEvent && !compact && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 z-20 animate-in slide-in-from-bottom-4">
          {(() => {
            const event = events.find(e => e.id === selectedEvent);
            if (!event) return null;
            
            return (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1 pr-2 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{event.date} • {event.time}</p>
                    <p className="text-sm text-gray-600">{event.location}, {event.city}</p>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-gray-900">{event.price}</span>
                  <button className="px-5 py-2.5 bg-orange-600 text-white rounded-full text-sm active:scale-95 transition-transform">
                    Get Directions
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Event Count Badge or Expand Button */}
      {!selectedEvent && (
        <div className={`absolute left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg z-10 ${
          compact ? 'bottom-2 px-3 py-1.5' : 'bottom-4 px-4 py-2'
        }`}>
          <p className={`text-gray-700 ${compact ? 'text-xs' : 'text-sm'}`}>
            {compact ? `${events.length} events` : `${events.length} events nearby`}
          </p>
        </div>
      )}
    </div>
  );
}
