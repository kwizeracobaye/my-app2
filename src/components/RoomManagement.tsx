import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Room } from '../types';

interface Props {
  rooms: Room[];
  onAddRoom: (roomNumber: string) => void;
}

export function RoomManagement({ rooms, onAddRoom }: Props) {
  const [newRoom, setNewRoom] = React.useState('');
  
  const occupiedRooms = rooms.filter(room => room.isOccupied).length;
  const freeRooms = rooms.length - occupiedRooms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoom.trim()) {
      onAddRoom(newRoom.trim().toUpperCase());
      setNewRoom('');
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Room Management</h2>
          <div className="flex space-x-4 text-sm">
            <div className="px-3 py-1 bg-gray-100 rounded-full">
              Total: <span className="font-semibold">{rooms.length}</span>
            </div>
            <div className="px-3 py-1 bg-red-100 rounded-full">
              Occupied: <span className="font-semibold">{occupiedRooms}</span>
            </div>
            <div className="px-3 py-1 bg-green-100 rounded-full">
              Free: <span className="font-semibold">{freeRooms}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter room number (e.g., A101)"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            pattern="[A-Za-z0-9]+"
            title="Room number should be alphanumeric (e.g., A101)"
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Room
          </button>
        </form>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {rooms.map((room) => (
            <div
              key={room.number}
              className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${
                room.isOccupied
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {room.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}