import { MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  location: string;
  price: string;
}

interface MapViewProps {
  events: Event[];
}

export function MapView({ events }: MapViewProps) {
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
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e0" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
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

        {/* Simulated Park Area */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-green-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-green-200 rounded-full opacity-40"></div>

        {/* Water Body */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-200 opacity-30"></div>

        {/* Event Markers */}
        {markers.map((marker, index) => {
          const event = events[index];
          if (!event) return null;

          return (
            <div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ top: marker.top, left: marker.left }}
            >
              {/* Marker Pin */}
              <div className="relative">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-white fill-white" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px]">
                    <p className="text-sm text-gray-900 mb-1">{event.title}</p>
                    <p className="text-xs text-gray-600 mb-1">{event.location}</p>
                    <p className="text-sm text-orange-600">{event.price}</p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">+</span>
          </button>
          <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-gray-700">−</span>
          </button>
        </div>

        {/* Map Label */}
        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
          <p className="text-sm text-gray-700">San Francisco, CA</p>
        </div>
      </div>
    </div>
  );
}
