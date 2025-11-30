import React, { useState, useEffect, useMemo } from 'react';
import { Seat } from '../types';
import { Users, Clock, RefreshCw, Armchair } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ZONES = ['Quiet Zone', 'Collab Area', 'Computer Lab'] as const;

// Generate mock initial seats
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  let idCounter = 1;
  ZONES.forEach((zone) => {
    const count = zone === 'Quiet Zone' ? 40 : zone === 'Collab Area' ? 24 : 16;
    for (let i = 0; i < count; i++) {
      seats.push({
        id: `${idCounter++}`,
        zone,
        status: Math.random() > 0.4 ? 'occupied' : 'available', // initial random state
      });
    }
  });
  return seats;
};

const LiveSeats: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSeats((currentSeats) => {
        return currentSeats.map((seat) => {
          // 10% chance to change status per tick
          if (Math.random() < 0.1) {
            const r = Math.random();
            return {
              ...seat,
              status: r > 0.6 ? 'occupied' : r > 0.1 ? 'available' : 'reserved',
            };
          }
          return seat;
        });
      });
      setLastUpdated(new Date());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => {
    const total = seats.length;
    const available = seats.filter((s) => s.status === 'available').length;
    const occupied = seats.filter((s) => s.status === 'occupied').length;
    const reserved = seats.filter((s) => s.status === 'reserved').length;
    return { total, available, occupied, reserved };
  }, [seats]);

  const pieData = [
    { name: 'Available', value: stats.available, color: '#22c55e' }, // green-500
    { name: 'Occupied', value: stats.occupied, color: '#ef4444' },   // red-500
    { name: 'Reserved', value: stats.reserved, color: '#f59e0b' },   // amber-500
  ];

  const getStatusColor = (status: Seat['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500 hover:bg-green-600 shadow-green-200';
      case 'occupied': return 'bg-red-400 opacity-80';
      case 'reserved': return 'bg-amber-400';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Live Seat Availability</h2>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Real-time tracking active
          </p>
        </div>
        <div className="text-sm text-slate-400 flex items-center gap-1 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
          <RefreshCw size={14} className="animate-spin-slow" />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-slate-500 font-medium">Available Now</span>
            <div className="text-5xl font-bold text-green-600 mt-2">{stats.available}</div>
            <div className="text-xs text-green-700 mt-1 font-medium bg-green-50 inline-block px-2 py-1 rounded-md self-start">Ready for you</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-slate-500 font-medium">Occupancy Rate</span>
            <div className="text-5xl font-bold text-slate-800 mt-2">
              {Math.round(((stats.occupied + stats.reserved) / stats.total) * 100)}%
            </div>
            <div className="text-xs text-slate-400 mt-1">Total Capacity: {stats.total}</div>
        </div>
        
        {/* Chart */}
        <div className="md:col-span-2 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center hover:shadow-md transition-shadow">
             <div className="w-full h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="flex flex-col gap-3 mr-8">
                {pieData.map(d => (
                    <div key={d.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: d.color }}></div>
                        <span className="text-slate-600 font-medium">{d.name}: {d.value}</span>
                    </div>
                ))}
             </div>
        </div>
      </div>

      {/* Map Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {ZONES.map((zone) => (
          <div key={zone} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                  {zone}
                </h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  seats.filter(s => s.zone === zone && s.status === 'available').length > 0 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
                }`}>
                    {seats.filter(s => s.zone === zone && s.status === 'available').length} seats free
                </span>
            </div>
            
            <div className="grid grid-cols-8 gap-3 content-start">
              {seats
                .filter((s) => s.zone === zone)
                .map((seat) => (
                  <div
                    key={seat.id}
                    className={`
                        aspect-square rounded-lg transition-all duration-500 flex items-center justify-center text-white
                        ${getStatusColor(seat.status)}
                        ${seat.status === 'available' ? 'cursor-pointer hover:scale-110 shadow-md' : 'cursor-not-allowed'}
                    `}
                    title={`Seat ${seat.id}: ${seat.status}`}
                  >
                    <Armchair size={16} strokeWidth={2.5} />
                  </div>
                ))}
            </div>
            
            <div className="mt-auto pt-6 flex gap-4 text-xs text-slate-500 justify-end border-t border-slate-50 mt-6">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"></div> Available</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-80"></div> Occupied</div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div> Reserved</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveSeats;