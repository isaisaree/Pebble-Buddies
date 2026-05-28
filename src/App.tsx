/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  Trophy, 
  Settings, 
  Plus, 
  ChevronRight, 
  LogOut, 
  User, 
  Bell, 
  Shield, 
  HelpCircle,
  Smartphone,
  Check,
  ArrowLeft,
  Activity,
  Moon,
  Sun
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { PebbleCharacter } from './components/PebbleCharacter';
import { UserProfile, Accessory, BodyShape, FamilyGroup } from './types';

// --- Mock Data ---
const INITIAL_USER: UserProfile = {
  name: "Alex",
  email: "alex@example.com",
  points: 450,
  streak: 12,
  buddy: {
    name: "Pebby",
    shape: 'round',
    hair: 'none',
    eyes: 'dots',
    mouth: 'smile',
    color: '#fbf9f2',
    accessories: []
  }
};

const ACCESSORIES: Accessory[] = [
  { id: 'flower', name: 'Pretty Flower', icon: '🌸', price: 120, type: 'hat', locked: false },
  { id: 'bow', name: 'Pink Bow', icon: '🎀', price: 100, type: 'hat', locked: false },
  { id: 'gun', name: 'Water Gun', icon: '🔫', price: 300, type: 'clothing', locked: false },
  { id: 'hat', name: 'Top Hat', icon: '🎩', price: 250, type: 'hat', locked: false },
  { id: 'necktie', name: 'Blue Tie', icon: '👔', price: 150, type: 'clothing', locked: false },
];

const WEEKLY_DATA = [
  { name: 'Mon', time: 120 },
  { name: 'Tue', time: 135 },
  { name: 'Wed', time: 110 },
  { name: 'Thu', time: 150 },
  { name: 'Fri', time: 125 },
  { name: 'Sat', time: 140 },
  { name: 'Sun', time: 130 },
];

const MONTHLY_DATA = [
  { name: 'Week 1', time: 850 },
  { name: 'Week 2', time: 920 },
  { name: 'Week 3', time: 880 },
  { name: 'Week 4', time: 950 },
];

const FAMILY_GROUPS: FamilyGroup[] = [
  {
    id: '1',
    name: 'The Smith Family',
    members: [
      INITIAL_USER,
      { name: "Mom", email: "mom@example.com", points: 1200, streak: 45, buddy: { name: "Mama", shape: 'fluffy', hair: 'curtain', eyes: 'closed', mouth: 'smile', color: '#E37E7F', accessories: ['bow'] } },
      { name: "Dad", email: "dad@example.com", points: 800, streak: 30, buddy: { name: "Papa", shape: 'sharp', hair: 'curly', eyes: 'dots', mouth: 'straight', color: '#D5E3E8', accessories: ['hat'] } },
    ]
  }
];

// --- Components ---

const NeumorphicButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}> = ({ children, onClick, className = "", variant = 'primary' }) => {
  const variantClasses = {
    primary: "text-text-dark",
    secondary: "text-accent",
    danger: "text-accent",
  };

  return (
    <button
      onClick={onClick}
      className={`neumorphic-button px-6 py-3 font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const BottomNav: React.FC<{ current: string; setScreen: (s: string) => void }> = ({ current, setScreen }) => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'family', icon: Users, label: 'Family' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'ranking', icon: Trophy, label: 'Ranking' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-beige/80 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-6 py-4 flex justify-between items-center z-50">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setScreen(item.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${current === item.id ? 'text-accent' : 'text-stone-400 dark:text-stone-300'}`}
        >
          <item.icon size={24} strokeWidth={current === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium uppercase tracking-wider dark:text-stone-200">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

// --- Screens ---

export default function App() {
  const [screen, setScreen] = useState<string>('signup');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [familyGroups, setFamilyGroups] = useState<FamilyGroup[]>(FAMILY_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState<FamilyGroup | null>(null);
  const [rankingFilter, setRankingFilter] = useState<string>('This Week');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [boughtItems, setBoughtItems] = useState<string[]>([]);
  const [showShareLink, setShowShareLink] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isAddingHub, setIsAddingHub] = useState(false);
  const [newHubName, setNewHubName] = useState('');
  const [createdHubLink, setCreatedHubLink] = useState('');
  const [isBrushing, setIsBrushing] = useState(false);
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddHub = () => {
    setIsAddingHub(true);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setScreen('customize');
  };

  const handleCustomize = () => {
    setScreen('pairing');
  };

  const handlePairing = () => {
    setScreen('home');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-beige relative overflow-hidden pb-24">
      <AnimatePresence mode="wait">
        {screen === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 flex flex-col items-center pt-16"
          >
            <div className="w-32 h-32 mb-8">
              <PebbleCharacter shape="round" color="#E4E3BC" size={128} />
            </div>
            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2">Pebble Buddies</h1>
            <p className="text-stone-500 dark:text-stone-200 mb-8 text-center">Your cozy companion for healthy habits.</p>
            
            <form onSubmit={handleSignup} className="w-full space-y-4">
              <div className="neumorphic-inset rounded-2xl p-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full bg-transparent outline-none text-stone-700 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
                  required
                />
              </div>
              <div className="neumorphic-inset rounded-2xl p-4">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-transparent outline-none text-stone-700 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
                  required
                />
              </div>
              <div className="neumorphic-inset rounded-2xl p-4">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-transparent outline-none text-stone-700 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
                  required
                />
              </div>
              <NeumorphicButton className="w-full mt-4">Sign Up</NeumorphicButton>
            </form>

            <div className="w-full flex items-center gap-4 my-8">
              <div className="h-[1px] flex-1 bg-stone-200 dark:bg-stone-800" />
              <span className="text-xs text-stone-400 dark:text-stone-300 font-medium">OR</span>
              <div className="h-[1px] flex-1 bg-stone-200 dark:bg-stone-800" />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <button className="neumorphic-button py-3 flex items-center justify-center gap-2 text-sm dark:text-stone-100">
                <span className="text-lg">G</span> Google
              </button>
              <button className="neumorphic-button py-3 flex items-center justify-center gap-2 text-sm dark:text-stone-100">
                <span className="text-lg"></span> Apple
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'customize' && (
          <motion.div
            key="customize"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 pt-12"
          >
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-8 text-center">Design Your Buddy</h2>
            
            <div className="flex justify-center mb-12">
              <div className="neumorphic-card p-8 rounded-full">
                <PebbleCharacter 
                  shape={user.buddy.shape} 
                  hair={user.buddy.hair}
                  eyes={user.buddy.eyes}
                  mouth={user.buddy.mouth}
                  color={user.buddy.color} 
                  size={180} 
                  accessories={user.buddy.accessories}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-200 mb-4 block">Body Shape</label>
                <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                  {(['fluffy', 'onigiri', 'round', 'sharp'] as BodyShape[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setUser({ ...user, buddy: { ...user.buddy, shape: s } })}
                      className={`px-4 py-3 rounded-xl transition-all whitespace-nowrap ${user.buddy.shape === s ? 'neumorphic-inset text-accent' : 'neumorphic-button text-stone-400 dark:text-stone-300'}`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-200 mb-4 block">Hair Style</label>
                <div className="flex justify-between gap-2 overflow-x-auto pb-2">
                  {(['none', 'curtain', 'curly', 'swoosh', 'bangs', 'loop', 'wavy'] as any[]).map((h) => (
                    <button
                      key={h}
                      onClick={() => setUser({ ...user, buddy: { ...user.buddy, hair: h } })}
                      className={`px-4 py-3 rounded-xl transition-all whitespace-nowrap ${user.buddy.hair === h ? 'neumorphic-inset text-accent' : 'neumorphic-button text-stone-400 dark:text-stone-300'}`}
                    >
                      {h.charAt(0).toUpperCase() + h.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-200 mb-4 block">Eyes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['dots', 'lines', 'closed', 'angry'] as any[]).map((e) => (
                      <button
                        key={e}
                        onClick={() => setUser({ ...user, buddy: { ...user.buddy, eyes: e } })}
                        className={`py-2 rounded-xl transition-all ${user.buddy.eyes === e ? 'neumorphic-inset text-accent' : 'neumorphic-button text-stone-400 dark:text-stone-300'}`}
                      >
                        {e.charAt(0).toUpperCase() + e.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-200 mb-4 block">Mouth</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['smile', 'cat', 'straight', 'frown'] as any[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setUser({ ...user, buddy: { ...user.buddy, mouth: m } })}
                        className={`py-2 rounded-xl transition-all ${user.buddy.mouth === m ? 'neumorphic-inset text-accent' : 'neumorphic-button text-stone-400 dark:text-stone-300'}`}
                      >
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-200 mb-4 block">Buddy Color</label>
                <div className="flex justify-between gap-4">
                  {['#fbf9f2', '#fdebf3', '#d5e3e8', '#c7ce9a', '#ffd869'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setUser({ ...user, buddy: { ...user.buddy, color: c } })}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${user.buddy.color === c ? 'border-accent shadow-lg scale-110' : 'border-white'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-200 mb-4 block">Buddy Name</label>
                <div className="neumorphic-inset rounded-2xl p-4">
                  <input 
                    type="text" 
                    value={user.buddy.name}
                    onChange={(e) => setUser({ ...user, buddy: { ...user.buddy, name: e.target.value } })}
                    placeholder="Name Your Buddy" 
                    className="w-full bg-transparent outline-none text-stone-700 dark:text-stone-100 placeholder:text-stone-400"
                  />
                </div>
              </div>

              <NeumorphicButton onClick={handleCustomize} className="w-full">Looks Perfect!</NeumorphicButton>
            </div>
          </motion.div>
        )}

        {screen === 'pairing' && (
          <motion.div
            key="pairing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 pt-24 flex flex-col items-center text-center"
          >
            <div className="w-48 h-48 neumorphic-card rounded-full flex items-center justify-center mb-12 relative">
              <Smartphone size={64} className="text-accent" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 border-4 border-accent/30 rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">Pair Your Stand</h2>
            <p className="text-stone-500 dark:text-stone-300 mb-12">Place your phone near your Pebble Stand to sync your brushing data.</p>
            
            <div className="space-y-4 w-full">
              <div className="neumorphic-card flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check size={20} className="text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm">Bluetooth Enabled</p>
                  <p className="text-xs text-stone-400 dark:text-stone-200">Ready to connect</p>
                </div>
              </div>
              
              <NeumorphicButton onClick={handlePairing} className="w-full mt-8">Start Brushing</NeumorphicButton>
            </div>
          </motion.div>
        )}

        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 pt-12"
          >
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setScreen('settings')} className="neumorphic-button p-3">
                <Settings size={20} className="text-text-dark" />
              </button>
              <div className="bg-accent text-white py-2 px-4 rounded-full flex items-center gap-2 shadow-sm">
                <span className="text-amber-200 font-bold">✨</span>
                <span className="font-bold">{user.points} pts</span>
              </div>
            </div>

            <div className="flex flex-col items-center mb-12">
              <div className="relative mb-6">
                <AnimatePresence>
                  {isBrushing && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: [0.2, 0.5, 0.2], 
                        scale: [1, 1.1, 1],
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                      className="absolute -inset-8 bg-accent/30 rounded-full blur-3xl z-0"
                    />
                  )}
                </AnimatePresence>
                <div className="absolute -inset-4 bg-accent/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <PebbleCharacter 
                    shape={user.buddy.shape} 
                    hair={user.buddy.hair}
                    eyes={user.buddy.eyes}
                    mouth={user.buddy.mouth}
                    color={user.buddy.color} 
                    size={300} 
                    accessories={user.buddy.accessories}
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100">{user.buddy.name}</h1>
              <p className="text-stone-400 dark:text-stone-200 font-medium">Level 12 Habit Master</p>
              
              <button 
                onClick={() => setIsBrushing(!isBrushing)}
                className={`mt-6 px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${isBrushing ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'neumorphic-button text-stone-500 dark:text-stone-300'}`}
              >
                <Activity size={16} className={isBrushing ? 'animate-pulse' : ''} />
                {isBrushing ? 'Brushing Detected...' : 'Simulate Brushing'}
              </button>
            </div>

            <div className="mb-8 neumorphic-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-stone-400 dark:text-stone-200 uppercase tracking-widest">Brushing Time (sec)</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setChartView('weekly')}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${chartView === 'weekly' ? 'bg-accent text-white' : 'text-stone-400 dark:text-stone-300'}`}
                  >
                    Week
                  </button>
                  <button 
                    onClick={() => setChartView('monthly')}
                    className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all ${chartView === 'monthly' ? 'bg-accent text-white' : 'text-stone-400 dark:text-stone-300'}`}
                  >
                    Month
                  </button>
                </div>
              </div>
              
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartView === 'weekly' ? WEEKLY_DATA : MONTHLY_DATA}>
                    <defs>
                      <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={isDarkMode ? "#A6C1E2" : "#344945"} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={isDarkMode ? "#A6C1E2" : "#344945"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: isDarkMode ? '#E7E5E4' : '#A8A29E' }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        fontSize: '12px',
                        backgroundColor: isDarkMode ? '#242629' : '#ffffff',
                        color: isDarkMode ? '#f8fafc' : '#344945'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="time" 
                      stroke={isDarkMode ? "#A6C1E2" : "#344945"} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorTime)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {boughtItems.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-stone-400 dark:text-stone-200 uppercase tracking-widest mb-4">Your Collection</h3>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {boughtItems.map((id) => {
                    const item = ACCESSORIES.find(a => a.id === id);
                    const isEquipped = user.buddy.accessories.includes(id);
                    return (
                      <button 
                        key={id} 
                        onClick={() => {
                          const newAcc = isEquipped 
                            ? user.buddy.accessories.filter(accId => accId !== id)
                            : [...user.buddy.accessories, id];
                          setUser({ ...user, buddy: { ...user.buddy, accessories: newAcc } });
                        }}
                        className={`neumorphic-card p-4 min-w-[80px] flex flex-col items-center transition-all active:scale-95 ${isEquipped ? 'border-2 border-accent/50' : ''}`}
                      >
                        <span className="text-2xl">{item?.icon}</span>
                        <span className={`text-[10px] font-bold mt-1 ${isEquipped ? 'text-accent' : 'text-stone-500 dark:text-stone-200'}`}>
                          {isEquipped ? 'Equipped' : item?.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="neumorphic-card flex flex-col items-center p-4">
                <p className="text-xs font-bold text-stone-400 dark:text-stone-200 uppercase mb-1">Streak</p>
                <p className="text-2xl font-bold text-accent">{user.streak} Days</p>
              </div>
              <div className="neumorphic-card flex flex-col items-center p-4">
                <p className="text-xs font-bold text-stone-400 dark:text-stone-200 uppercase mb-1">Today</p>
                <p className="text-2xl font-bold text-accent">2/2</p>
              </div>
            </div>

            <div className="mt-8 neumorphic-card">
              <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-4">Daily Progress</h3>
              <div className="w-full h-4 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  className="h-full bg-accent"
                />
              </div>
              <p className="text-xs text-stone-400 dark:text-stone-200 mt-2 text-right">85% to next level</p>
            </div>

            <BottomNav current="home" setScreen={setScreen} />
          </motion.div>
        )}

        {isAddingHub && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="neumorphic-card bg-beige w-full max-w-sm p-8"
            >
              <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-6">Create New Hub</h2>
              
              {!createdHubLink ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 dark:text-stone-200 uppercase tracking-widest mb-2 block">Hub Name</label>
                    <div className="neumorphic-inset rounded-2xl p-4">
                      <input 
                        type="text" 
                        value={newHubName}
                        onChange={(e) => setNewHubName(e.target.value)}
                        placeholder="e.g. The Rock Family" 
                        className="w-full bg-transparent outline-none text-stone-700 dark:text-stone-100 placeholder:text-stone-400"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-2">
                    <button 
                      onClick={() => {
                        setIsAddingHub(false);
                        setNewHubName('');
                      }}
                      className="flex-1 py-3 rounded-2xl text-stone-500 dark:text-stone-300 font-bold text-sm border-2 border-stone-200 dark:border-stone-800"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        if (newHubName) {
                          const id = Math.random().toString(36).substr(2, 9);
                          const newGroup: FamilyGroup = {
                            id,
                            name: newHubName,
                            members: [user]
                          };
                          setFamilyGroups([...familyGroups, newGroup]);
                          setCreatedHubLink(`https://pebblebuddies.app/join/${id}-${Math.random().toString(36).substr(2, 9)}`);
                        }
                      }}
                      disabled={!newHubName}
                      className={`flex-1 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all ${newHubName ? 'bg-accent text-white shadow-accent/20' : 'bg-stone-200 text-stone-400 shadow-none'}`}
                    >
                      Create
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <Check size={16} />
                    </div>
                    <p className="text-sm font-medium text-green-800">Hub Created Successfully!</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 dark:text-stone-200 uppercase mb-2">Share this link with family:</p>
                    <div className="flex gap-2">
                      <div className="flex-1 neumorphic-inset p-3 text-xs truncate text-stone-500 dark:text-stone-300 rounded-xl">
                        {createdHubLink}
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(createdHubLink);
                        }}
                        className="bg-accent text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  
                  <NeumorphicButton 
                    onClick={() => {
                      setIsAddingHub(false);
                      setCreatedHubLink('');
                      setNewHubName('');
                    }} 
                    className="w-full"
                  >
                    Done
                  </NeumorphicButton>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {screen === 'family' && (
          <motion.div
            key="family"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 pt-12"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">The Pebble Hub</h1>
              <div className="flex gap-2">
                <button onClick={handleAddHub} className="neumorphic-button px-4 py-2 text-xs font-bold text-accent">
                  Add Hub
                </button>
                <button className="neumorphic-button p-3">
                  <Settings size={20} className="text-stone-600 dark:text-stone-100" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {familyGroups.map((group) => (
                <button 
                  key={group.id}
                  onClick={() => {
                    setSelectedGroup(group);
                    setScreen('hub-members');
                  }}
                  className="neumorphic-card text-left flex justify-between items-center group"
                >
                  <div>
                    <h3 className="font-bold text-lg text-stone-800 dark:text-stone-100">{group.name}</h3>
                    <p className="text-sm text-stone-400 dark:text-stone-200">{group.members.length} Members</p>
                  </div>
                  <div className="flex -space-x-3">
                    {group.members.slice(0, 3).map((m, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-beige overflow-hidden bg-sand flex items-center justify-center">
                        <PebbleCharacter shape={m.buddy.shape} color={m.buddy.color} size={30} accessories={m.buddy.accessories} />
                      </div>
                    ))}
                    {group.members.length > 3 && (
                      <div className="w-10 h-10 rounded-full border-2 border-beige bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-[10px] font-bold text-stone-500 dark:text-stone-200">
                        +{group.members.length - 3}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <BottomNav current="family" setScreen={setScreen} />
          </motion.div>
        )}

        {screen === 'hub-members' && selectedGroup && (
          <motion.div
            key="hub-members"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 pt-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setScreen('family')} className="neumorphic-button p-2">
                <ArrowLeft size={20} className="dark:text-stone-100" />
              </button>
              <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">{selectedGroup.name}</h1>
            </div>

            <div className="space-y-4">
              {selectedGroup.members.map((member, i) => (
                <div key={i} className="neumorphic-card flex items-center gap-4 p-4">
                  <div className="w-16 h-16 rounded-2xl bg-sand flex items-center justify-center">
                    <PebbleCharacter 
                      shape={member.buddy.shape} 
                      hair={member.buddy.hair}
                      eyes={member.buddy.eyes}
                      mouth={member.buddy.mouth}
                      color={member.buddy.color} 
                      size={50} 
                      accessories={member.buddy.accessories} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-stone-800 dark:text-stone-100">{member.name}</p>
                    <p className="text-xs text-stone-400 dark:text-stone-200">{member.buddy.name}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="bg-accent/20 text-accent text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Trophy size={10} />
                      {member.streak} DAY STREAK
                    </div>
                    <p className="text-xs font-bold text-stone-500 dark:text-stone-200 mt-1">{member.points} pts</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <NeumorphicButton 
                onClick={() => {
                  const link = `https://pebblebuddies.app/join/${selectedGroup.id}-${Math.random().toString(36).substr(2, 9)}`;
                  setShareLink(link);
                  setShowShareLink(true);
                }} 
                className="w-full flex items-center justify-center gap-2"
              >
                <Plus size={20} /> Add Family Member
              </NeumorphicButton>

              {showShareLink && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="neumorphic-card bg-white/50 dark:bg-stone-900/50 p-4"
                >
                  <p className="text-[10px] font-bold text-stone-400 dark:text-stone-200 uppercase mb-2">Share this link:</p>
                  <div className="flex gap-2">
                    <div className="flex-1 neumorphic-inset p-2 text-xs truncate text-stone-500 dark:text-stone-300">
                      {shareLink}
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(shareLink);
                        alert('Link copied to clipboard!');
                      }}
                      className="bg-accent text-white px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Share
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <BottomNav current="family" setScreen={setScreen} />
          </motion.div>
        )}

        {screen === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 pt-12"
          >
            <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2 text-center">Dress Your Buddy</h1>
            <p className="text-stone-400 dark:text-stone-200 text-sm text-center mb-8 italic">The Pebble Boutique</p>

            <div className="neumorphic-card bg-white dark:bg-stone-900/50 p-8 flex flex-col items-center mb-8 relative overflow-hidden border-4 border-white dark:border-stone-800">
              <div className="absolute top-4 right-4 bg-accent text-white py-1 px-3 text-xs font-bold rounded-full">
                {user.points} pts
              </div>
              <div className="w-40 h-40 bg-white/30 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <PebbleCharacter 
                shape={user.buddy.shape} 
                hair={user.buddy.hair}
                eyes={user.buddy.eyes}
                mouth={user.buddy.mouth}
                color={user.buddy.color} 
                size={160} 
                accessories={user.buddy.accessories}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {ACCESSORIES.map((item) => (
                <div key={item.id} className="neumorphic-card p-4 flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-stone-800 dark:text-stone-100 text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-stone-400 dark:text-stone-200 mb-4">{item.price} Points</p>
                  
                  {boughtItems.includes(item.id) ? (
                    <div className="w-full py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-200 text-xs font-bold flex items-center justify-center gap-2">
                      <Check size={14} /> Owned
                    </div>
                  ) : item.locked ? (
                    <div className="w-full py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-300 dark:text-stone-500 flex items-center justify-center">
                      <Shield size={14} />
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        if (user.points >= item.price) {
                          setUser({ 
                            ...user, 
                            points: user.points - item.price
                          });
                          setBoughtItems([...boughtItems, item.id]);
                        }
                      }}
                      disabled={user.points < item.price}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${user.points >= item.price ? 'bg-accent text-white' : 'bg-stone-200 text-stone-400'}`}
                    >
                      Buy
                    </button>
                  )}
                </div>
              ))}
            </div>

            <BottomNav current="shop" setScreen={setScreen} />
          </motion.div>
        )}

        {screen === 'ranking' && (
          <motion.div
            key="ranking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 pt-12"
          >
            <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-8">Leaderboard</h1>

            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {['All Time', 'This Month', 'This Week'].map((filter) => (
                <button 
                  key={filter} 
                  onClick={() => setRankingFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${rankingFilter === filter ? 'bg-accent text-white' : 'neumorphic-button text-stone-500 dark:text-stone-300'}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {familyGroups[0].members
                .map(m => ({
                  ...m,
                  displayPoints: rankingFilter === 'All Time' ? m.points * 10 : rankingFilter === 'This Month' ? m.points * 3 : m.points
                }))
                .sort((a, b) => b.displayPoints - a.displayPoints)
                .map((member, i) => (
                <div key={i} className={`neumorphic-card flex items-center gap-4 p-4 ${member.name === user.name ? 'border-2 border-accent/30' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-amber-100 text-amber-600' : 'text-stone-400 dark:text-stone-200'}`}>
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-sand flex items-center justify-center">
                    <PebbleCharacter 
                      shape={member.buddy.shape} 
                      hair={member.buddy.hair}
                      eyes={member.buddy.eyes}
                      mouth={member.buddy.mouth}
                      color={member.buddy.color} 
                      size={40} 
                      accessories={member.buddy.accessories} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-stone-800 dark:text-stone-100">{member.name}</p>
                    <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full mt-1">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${(member.displayPoints / (rankingFilter === 'All Time' ? 15000 : rankingFilter === 'This Month' ? 4500 : 1500)) * 100}%` }} />
                    </div>
                  </div>
                  <p className="font-bold text-stone-700 dark:text-stone-100">{member.displayPoints}</p>
                </div>
              ))}
            </div>

            <BottomNav current="ranking" setScreen={setScreen} />
          </motion.div>
        )}

        {screen === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 pt-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setScreen('home')} className="neumorphic-button p-2">
                <ArrowLeft size={20} className="dark:text-stone-100" />
              </button>
              <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Settings</h1>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4 ml-2">Account</h3>
                <div className="neumorphic-card p-0 overflow-hidden">
                  <button className="w-full p-4 flex items-center justify-between border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <User size={18} className="text-stone-400 dark:text-stone-300" />
                      <span className="text-sm font-medium">Profile Management</span>
                    </div>
                    <ChevronRight size={16} className="text-stone-300 dark:text-stone-100" />
                  </button>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Smartphone size={18} className="text-stone-400 dark:text-stone-300" />
                      <span className="text-sm font-medium">Device Settings</span>
                    </div>
                    <ChevronRight size={16} className="text-stone-300 dark:text-stone-100" />
                  </button>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4 ml-2">Preferences</h3>
                <div className="neumorphic-card p-0 overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-3">
                      <Moon size={18} className="text-stone-400 dark:text-stone-300" />
                      <span className="text-sm font-medium">Dark Mode</span>
                    </div>
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`w-10 h-6 rounded-full relative p-1 transition-colors ${isDarkMode ? 'bg-accent' : 'bg-stone-200'}`}
                    >
                      <motion.div 
                        animate={{ x: isDarkMode ? 16 : 0 }}
                        className="w-4 h-4 bg-white rounded-full" 
                      />
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-3">
                      <Bell size={18} className="text-stone-400 dark:text-stone-300" />
                      <span className="text-sm font-medium">Notifications</span>
                    </div>
                    <button 
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`w-10 h-6 rounded-full relative p-1 transition-colors ${notificationsEnabled ? 'bg-accent' : 'bg-stone-200'}`}
                    >
                      <motion.div 
                        animate={{ x: notificationsEnabled ? 16 : 0 }}
                        className="w-4 h-4 bg-white rounded-full" 
                      />
                    </button>
                  </div>
                  <button className="w-full p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Shield size={18} className="text-stone-400 dark:text-stone-300" />
                      <span className="text-sm font-medium">Privacy & Security</span>
                    </div>
                    <ChevronRight size={16} className="text-stone-300 dark:text-stone-100" />
                  </button>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-stone-400 dark:text-stone-200 uppercase tracking-widest mb-4 ml-2">Support</h3>
                <div className="neumorphic-card p-0 overflow-hidden">
                  <button className="w-full p-4 flex items-center justify-between border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-stone-400 dark:text-stone-300" />
                      <span className="text-sm font-medium">FAQ & Support</span>
                    </div>
                    <ChevronRight size={16} className="text-stone-300 dark:text-stone-100" />
                  </button>
                </div>
              </section>

              <div className="pt-8 space-y-4">
                <button 
                  onClick={() => setScreen('signup')}
                  className="w-full p-4 rounded-2xl flex items-center justify-center gap-2 text-stone-500 dark:text-stone-200 font-bold text-sm border-2 border-stone-200 dark:border-stone-800"
                >
                  <LogOut size={18} /> Logout
                </button>
                <button className="w-full p-4 text-accent font-bold text-sm opacity-50">
                  Delete Account
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
