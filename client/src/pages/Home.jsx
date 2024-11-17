import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define a custom icon for the map marker
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
});

const people = [
  {
    name: 'John Doe',
    description: 'A passionate developer',
    address: '1234 Main St, Springfield, USA',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    coordinates: [12.9716, 77.5946], // Example: Bangalore, India
  },
  {
    name: 'Jane Smith',
    description: 'Web designer and photographer',
    address: '5678 Oak St, Shelbyville, USA',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    coordinates: [28.7041, 77.1025], // Example: Delhi, India
  },
  {
    name: 'Tom Lee',
    description: 'Data scientist and AI enthusiast',
    address: '9101 Maple St, Capital City, USA',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    coordinates: [19.0760, 72.8777], // Example: Mumbai, India
  },
  {
    name: 'Sara Connor',
    description: 'Full stack developer',
    address: '1213 Pine St, Metropolis, USA',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    coordinates: [13.0827, 80.2707], // Example: Chennai, India
  },
];

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900">Meet Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {people.map((person, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-5">
            <img src={person.image} alt={person.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold text-gray-800">{person.name}</h2>
            <p className="text-gray-600 mb-2">{person.description}</p>
            {/* Address clickable link */}
            <button
              className="text-blue-500 underline"
              onClick={() => setSelectedPerson(person)}
            >
              {person.address}
            </button>
          </div>
        ))}
      </div>

      {/* Display map only if a person is selected */}
      {selectedPerson && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Location of {selectedPerson.name}</h2>
          <MapContainer
            center={selectedPerson.coordinates}
            zoom={10}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={selectedPerson.coordinates} icon={customIcon}>
              <Popup>
                {selectedPerson.name} - {selectedPerson.address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}
