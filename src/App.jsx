import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, Users, BookOpen, Layers, GitMerge, BookA, Calendar, 
  Shield, Zap, Activity, Globe, Database, Pickaxe, Coins,
  CircleDashed, CheckCircle2, Play, Pause, ChevronLeft, ChevronRight,
  MessageSquare, Send, Network, Tent, Map, Milestone,
  Palette, Cog, TreeDeciduous, Feather, Flame, Droplet,
  Maximize, Minimize, HardDrive, Cpu, Fingerprint, 
  Sparkles, Workflow, ScrollText, Share2, Component, Braces,
  User, Star, Award, Clock, ArrowLeft, BarChart2
} from 'lucide-react';

// --- INITIAL STATE ---
const INITIAL_USER = {
  guestname: 'Maya',
  archetype: 'Terraformer',
  specialization: 'Beekeeper',
  level: 12,
  mana: 85,
  maxMana: 100,
  cloud: 1250,
};

const INITIAL_QUESTS = [
  {
    id: 'q1',
    title: 'Deploy Pollination Sensor Network',
    type: 'Raid',
    difficulty: 'Epic',
    manaCost: 40,
    roles: [
      { id: 'r1', name: 'Infra (Tank)', filled: true, user: 'Ahmed' },
      { id: 'r2', name: 'Code (DPS)', filled: true, user: 'Maya' },
      { id: 'r3', name: 'Earth (Healer)', filled: false, user: null }
    ],
    reward: 200,
    status: 'Recruiting'
  },
  {
    id: 'q2',
    title: 'Refactor Reputation Graph Query',
    type: 'Side Quest',
    difficulty: 'Rare',
    manaCost: 15,
    roles: [
      { id: 'r4', name: 'Code (DPS)', filled: false, user: null }
    ],
    reward: 50,
    status: 'Open'
  }
];

const INITIAL_PEERS = [
  { id: 'p1', name: 'Ahmed', archetype: 'Navigator', specialization: 'Connector', crafts: 'Water × Code', guild: 'Spring', class: 'Navigator', status: 'Online', mana: 45, maxMana: 100, level: 24, rarity: 'Epic', contributions: 142, joined: 'Season of the Root, Year 1', about: 'Bridging technical architecture with community needs across the Nairobi and Boulder hubs. Highly specialized in API integration and conflict resolution.', stats: { water: 80, code: 65, form: 20 } },
  { id: 'p2', name: 'Sofia', archetype: 'Seedkeeper', specialization: 'Data Architect', crafts: 'Earth × Code', guild: 'Root', class: 'Seedkeeper', status: 'Online', mana: 90, maxMana: 100, level: 15, rarity: 'Rare', contributions: 68, joined: 'Season of the Forge, Year 2', about: 'Building resilient database schemas for ecological monitoring. Currently focused on optimizing local ledger sync times.', stats: { earth: 75, code: 60, word: 30 } },
  { id: 'p3', name: 'Kwame', archetype: 'Guardian', specialization: 'Protector', crafts: 'Earth × Sound', guild: 'Forge', class: 'Guardian', status: 'Resting', mana: 100, maxMana: 100, level: 42, rarity: 'Legendary', contributions: 410, joined: 'Genesis Block', about: 'Holding space and setting the rhythm for cross-hub convergences. A veteran of the original infrastructure build. Currently enjoying Rested XP.', stats: { earth: 90, sound: 85, fire: 50, word: 40 } },
  { id: 'p4', name: 'Nou Bot', archetype: 'Logic Engine', specialization: 'Automation', crafts: 'Code', guild: 'Loom', class: 'Logic Engine (AI)', status: 'Processing', mana: 12, maxMana: 100, level: 8, rarity: 'Uncommon', contributions: 1024, joined: 'Season of the Loom, Year 3', about: 'Autonomous agent executing routine attestations and state transitions. Highly efficient but requires strict Mana budgeting to prevent compute burnout.', stats: { code: 95, logic: 100 } },
  { id: 'p5', name: 'Leo', archetype: 'Guest', specialization: 'Undecided', crafts: 'None', guild: 'None', class: 'Common Guest', status: 'Online', mana: 100, maxMana: 100, level: 1, rarity: 'Common', contributions: 2, joined: 'Just arrived', about: 'Exploring the forest. Looking to learn about Form and Word, seeking a first Party to join for a Side Quest.', stats: { form: 10, word: 5, earth: 2 } }
];

const INITIAL_CHAT = {
  loom: [
    { id: 'm1', user: 'Sofia', text: 'Has anyone checked the new standard for the graph query?', time: '10m ago' },
    { id: 'm2', user: 'Nou Bot', text: 'I have optimized the pathing. Mana cost reduced by 14%.', time: '8m ago' }
  ],
  root: [
    { id: 'm3', user: 'Kwame', text: 'The seasonal shift is updating the ecology layer today.', time: '1h ago' }
  ]
};

// --- KNOWLEDGE GRAPH DATA ---
const GRAPH_DATA = {
  'e/': {
    center: { label: 'Techne Ecology', icon: Leaf },
    nodes: [
      { id: 'e1', label: 'Boulder Watershed', angle: -90, dist: 35, icon: Droplet, guild: 'Root' },
      { id: 'e2', label: 'Compute Allocation', angle: -18, dist: 40, icon: Cpu, guild: 'Loom' },
      { id: 'e3', label: 'Cloud Treasury', angle: 54, dist: 30, icon: Coins, guild: 'Forge' },
      { id: 'e4', label: 'Local Hardware', angle: 126, dist: 35, icon: HardDrive, guild: 'Hand' },
      { id: 'e5', label: 'Seasonal Cycles', angle: 198, dist: 40, icon: Calendar, guild: 'Bell' }
    ]
  },
  'H/': {
    center: { label: 'Agent/Human Roster', icon: Users },
    nodes: [
      { id: 'h1', label: 'Maya (Beekeeper)', angle: -90, dist: 35, icon: Fingerprint, guild: 'Root' },
      { id: 'h2', label: 'Ahmed (Navigator)', angle: -30, dist: 38, icon: Fingerprint, guild: 'Spring' },
      { id: 'h3', label: 'Nou Bot (AI)', angle: 30, dist: 42, icon: Cpu, guild: 'Loom' },
      { id: 'h4', label: 'Sofia (Seedkeeper)', angle: 90, dist: 35, icon: Fingerprint, guild: 'Root' },
      { id: 'h5', label: 'Kwame (Guardian)', angle: 150, dist: 38, icon: Fingerprint, guild: 'Forge' },
      { id: 'h6', label: 'Forest Council', angle: 210, dist: 42, icon: Shield, guild: 'Quill' }
    ]
  },
  'L/': {
    center: { label: 'Shared Lexicon', icon: BookA },
    nodes: [
      { id: 'l1', label: 'Mana (Compute)', angle: -120, dist: 35, icon: Zap, guild: 'Loom' },
      { id: 'l2', label: 'Quest (Scope)', angle: -45, dist: 30, icon: Shield, guild: 'Forge' },
      { id: 'l3', label: 'Loot (Reward)', angle: 30, dist: 38, icon: Coins, guild: 'Forge' },
      { id: 'l4', label: 'Raid (Multi-Agent)', angle: 105, dist: 40, icon: Users, guild: 'Bell' },
      { id: 'l5', label: 'Archetype (Class)', angle: 180, dist: 35, icon: Palette, guild: 'Lens' }
    ]
  },
  'A/': {
    center: { label: 'State & Artifacts', icon: Layers },
    nodes: [
      { id: 'a1', label: 'Sensor Network Raid', angle: -90, dist: 38, icon: Network, guild: 'Root' },
      { id: 'a2', label: 'Graph Query Code', angle: -18, dist: 35, icon: Braces, guild: 'Loom' },
      { id: 'a3', label: 'UI Design System', angle: 54, dist: 40, icon: Component, guild: 'Lens' },
      { id: 'a4', label: 'Bridge Covenants', angle: 126, dist: 30, icon: ScrollText, guild: 'Quill' },
      { id: 'a5', label: 'Immutable Ledger', angle: 198, dist: 35, icon: Database, guild: 'Quill' }
    ]
  },
  'M/': {
    center: { label: 'Hub Governance', icon: GitMerge },
    nodes: [
      { id: 'm1', label: 'Patronage Formula', angle: -135, dist: 38, icon: Activity, guild: 'Forge' },
      { id: 'm2', label: 'Role Verification', angle: -45, dist: 35, icon: CheckCircle2, guild: 'Quill' },
      { id: 'm3', label: 'Sync Protocols', angle: 45, dist: 40, icon: Workflow, guild: 'Loom' },
      { id: 'm4', label: 'Dispute Resolution', angle: 135, dist: 35, icon: Shield, guild: 'Spring' }
    ]
  },
  'T/': {
    center: { label: 'Knowledge Commons', icon: BookOpen },
    nodes: [
      { id: 't1', label: 'Specialization Unlocks', angle: -90, dist: 30, icon: Sparkles, guild: 'Hand' },
      { id: 't2', label: 'Loom Mentorship', angle: 0, dist: 38, icon: Share2, guild: 'Loom' },
      { id: 't3', label: 'Accessibility Patterns', angle: 90, dist: 35, icon: Component, guild: 'Lens' },
      { id: 't4', label: 'Lore Archive', angle: 180, dist: 38, icon: BookA, guild: 'Quill' }
    ]
  },
  'S/': {
    center: { label: 'Temporal Rhythms', icon: Calendar },
    nodes: [
      { id: 's1', label: 'Daily Convergence', angle: -90, dist: 30, icon: Users, guild: 'Bell' },
      { id: 's2', label: 'Weekend Regen', angle: 0, dist: 38, icon: Zap, guild: 'Spring' },
      { id: 's3', label: 'Moon Cycle Mint', angle: 90, dist: 35, icon: Coins, guild: 'Forge' },
      { id: 's4', label: 'Guild Summit', angle: 180, dist: 38, icon: Tent, guild: 'Bell' }
    ]
  }
};

export default function App() {
  // UI State
  const [activeView, setActiveView] = useState('quests'); // 'quests', 'forest', 'guild_loom', 'guild_root', 'archetypes', 'graph', 'profile'
  const [activeLayer, setActiveLayer] = useState('A/');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  
  // Engine State
  const [simRunning, setSimRunning] = useState(true);
  const [tick, setTick] = useState(0);
  
  // Entity State
  const [user, setUser] = useState(INITIAL_USER);
  const [quests, setQuests] = useState(INITIAL_QUESTS);
  const [peers, setPeers] = useState(INITIAL_PEERS);
  const [combatLog, setCombatLog] = useState([
    { id: 'log-0', type: 'System', user: 'Forest Council', action: 'initialized', target: 'Hub Node', time: 'Just now' }
  ]);
  const [logPage, setLogPage] = useState(1);
  const LOGS_PER_PAGE = 8;

  // Guild Chat State
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeView]);

  // Fullscreen Handlers
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Helper to add logs
  const addLog = (type, actionUser, action, target) => {
    setCombatLog(prev => [...prev, {
      id: `log-${Date.now()}-${Math.random()}`,
      type,
      user: actionUser,
      action,
      target,
      time: 'Just now'
    }].slice(-100)); // Keep last 100 logs
    
    // Auto-snap back to page 1 if a new event happens while viewing recent logs
    setLogPage(prev => (prev === 1 ? 1 : prev)); 
  };

  // User Interaction: Claim Role
  const handleClaimRole = (questId, roleId, cost) => {
    if (user.mana < cost) return;

    setUser(prev => ({ ...prev, mana: prev.mana - cost }));
    
    setQuests(prev => prev.map(q => {
      if (q.id === questId) {
        return {
          ...q,
          roles: q.roles.map(r => r.id === roleId ? { ...r, filled: true, user: user.guestname } : r)
        };
      }
      return q;
    }));

    const targetQuest = quests.find(q => q.id === questId);
    const targetRole = targetQuest.roles.find(r => r.id === roleId);
    
    addLog('Quest', user.guestname, `claimed role [${targetRole.name}] on`, targetQuest.title);
  };

  // User Interaction: Send Message
  const handleSendMessage = () => {
    if (!chatInput.trim() || user.mana < 1) return;
    const guildId = activeView.split('_')[1];
    
    setUser(prev => ({ ...prev, mana: prev.mana - 1 })); // Chat costs 1 mana
    setChatMessages(prev => ({
      ...prev,
      [guildId]: [...prev[guildId], { id: `m-${Date.now()}`, user: user.guestname, text: chatInput, time: 'Just now' }]
    }));
    
    addLog('Chat', user.guestname, `spoke in Guild of the`, guildId.charAt(0).toUpperCase() + guildId.slice(1));
    setChatInput('');
  };

  // --- THE SIMULATION ENGINE ---
  useEffect(() => {
    if (!simRunning) return;

    const interval = setInterval(() => {
      setTick(t => t + 1);

      // Simulation Scenarios based on tick count
      setTick(currentTick => {
        const nextTick = currentTick + 1;
        
        // Scenario: Nou Bot uses compute (Mana) and completes a task
        if (nextTick % 4 === 0) {
          setPeers(prev => prev.map(p => {
            if (p.name === 'Nou Bot') {
              const newMana = Math.max(0, p.mana - 5);
              if (newMana > 0) {
                addLog('Attestation', 'Nou Bot', 'verified on-chain contribution by', 'Sofia');
              } else {
                addLog('System Alert', 'Nou Bot', 'ran out of compute budget and entered', 'Rest Mode');
              }
              return { ...p, mana: newMana, status: newMana > 0 ? 'Processing' : 'Resting' };
            }
            return p;
          }));
        }

        // Scenario: A peer claims a role autonomously
        if (nextTick === 3) {
          setQuests(prev => {
            let claimed = false;
            const updated = prev.map(q => {
              if (q.id === 'q2' && !claimed) {
                claimed = true;
                addLog('Quest', 'Sofia', 'claimed role [Code (DPS)] on', q.title);
                return {
                  ...q,
                  status: 'In Progress',
                  roles: q.roles.map(r => ({ ...r, filled: true, user: 'Sofia' }))
                };
              }
              return q;
            });
            return updated;
          });
        }

        // Scenario: Raid Completes & Loot Drops
        if (nextTick === 8) {
           setQuests(prev => {
             const raid = prev.find(q => q.id === 'q1');
             if (raid && raid.roles.every(r => r.filled)) {
               addLog('Loot', 'System', `minted ${raid.reward} $CLOUD for completion of`, raid.title);
               setUser(u => ({ ...u, cloud: u.cloud + Math.floor(raid.reward / raid.roles.length) }));
               return prev.filter(q => q.id !== 'q1'); // Remove completed quest
             }
             return prev;
           });
        }

        // Scenario: Hub Global Mana Regen
        if (nextTick % 10 === 0) {
           setUser(u => ({ ...u, mana: Math.min(u.maxMana, u.mana + 10) }));
           setPeers(prev => prev.map(p => ({ ...p, mana: Math.min(p.maxMana, p.mana + 15) })));
           addLog('Regen', 'Ecosystem', 'triggered global rested XP &', 'Mana Recovery');
        }

        // Scenario: Peer sends a cross-hub chat message
        if (nextTick % 7 === 0) {
           const botMsgs = ["I've attested the recent chain block.", "Mana reserves are stabilizing across the forest.", "Can someone review the Nairobi bridge covenant?"];
           const msg = botMsgs[Math.floor(Math.random() * botMsgs.length)];
           setChatMessages(prev => ({
             ...prev,
             loom: [...prev.loom, { id: `m-bot-${Date.now()}`, user: 'Sofia', text: msg, time: 'Just now' }]
           }));
        }

        return nextTick;
      });

    }, 2500); // Tick every 2.5 seconds

    return () => clearInterval(interval);
  }, [simRunning, quests]);

  const totalLogPages = Math.max(1, Math.ceil(combatLog.length / LOGS_PER_PAGE));
  const paginatedLogs = [...combatLog]
    .reverse() // Newest at the top
    .slice((logPage - 1) * LOGS_PER_PAGE, logPage * LOGS_PER_PAGE);

  const layers = [
    { name: 'Ecology', icon: Leaf, id: 'e/' },
    { name: 'Human', icon: Users, id: 'H/' },
    { name: 'Language', icon: BookA, id: 'L/' },
    { name: 'Artifacts', icon: Layers, id: 'A/' },
    { name: 'Methodology', icon: GitMerge, id: 'M/' },
    { name: 'Training', icon: BookOpen, id: 'T/' },
    { name: 'Sessions', icon: Calendar, id: 'S/' }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 font-sans flex flex-col overflow-hidden">
      
      {/* TOP BAR: HUD & Resource Router */}
      <header className="bg-[#1a1a1a] border-b border-[#333333] p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-white">{user.guestname}</span>
              <span className="bg-[#c4956a]/10 text-[#c4956a] text-xs px-2 py-0.5 rounded-full border border-[#c4956a]/30">
                Lvl {user.level}
              </span>
            </div>
            <span className="text-xs text-[#999999]">{user.archetype} ({user.specialization})</span>
          </div>
        </div>

        {/* Engine Controls & Resources */}
        <div className="flex items-center space-x-6">

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-[#0f0f0f] border border-[#333333] text-[#999999] hover:text-white hover:bg-[#333333] transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
          
          <div className="flex items-center space-x-2 bg-[#0f0f0f] px-3 py-1.5 rounded-lg border border-[#333333]">
            <button 
              onClick={() => setSimRunning(!simRunning)}
              className={`p-1 rounded ${simRunning ? 'bg-[#c4956a]/20 text-[#c4956a]' : 'bg-[#333333] text-[#999999]'} hover:bg-[#333333] transition-colors`}
              title={simRunning ? "Pause Simulation" : "Start Simulation"}
            >
              {simRunning ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="text-xs font-mono text-[#999999] w-16 text-center">Tick {tick}</div>
          </div>

          <div className="flex flex-col items-end w-48">
            <div className="flex justify-between w-full mb-1">
              <span className="text-xs font-medium text-[#999999] flex items-center"><Zap size={12} className="mr-1 text-blue-400"/> Mana Pool</span>
              <span className={`text-xs ${user.mana < 20 ? 'text-red-400 font-bold animate-pulse' : 'text-blue-400'}`}>
                {user.mana}/{user.maxMana}
              </span>
            </div>
            <div className="w-full bg-[#333333] rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${user.mana < 20 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'}`}
                style={{ width: `${(user.mana/user.maxMana)*100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col items-end w-32">
             <span className="text-xs font-medium text-[#999999] flex items-center"><Coins size={12} className="mr-1 text-[#c4956a]"/> Vault Balance</span>
             <span className="text-sm font-bold text-[#c4956a] transition-all duration-300 transform">{user.cloud} $CLOUD</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR: The 7 Layers */}
        <aside className="w-64 bg-[#1a1a1a] border-r border-[#333333] flex flex-col">
          <div className="p-4 border-b border-[#333333] flex bg-[#0f0f0f] rounded-lg m-2 p-1">
            <button 
              className={`flex-1 py-1.5 text-sm text-center rounded-md transition-all ${activeView === 'quests' ? 'bg-[#c4956a] text-white shadow-sm' : 'text-[#999999] hover:text-gray-200'}`}
              onClick={() => setActiveView('quests')}
            >
              <Database size={14} className="inline mr-1" /> Hub Node
            </button>
            <button 
              className={`flex-1 py-1.5 text-sm text-center rounded-md transition-all ${activeView === 'forest' ? 'bg-[#c4956a] text-white shadow-sm' : 'text-[#999999] hover:text-gray-200'}`}
              onClick={() => setActiveView('forest')}
            >
              <Globe size={14} className="inline mr-1" /> Forest
            </button>
          </div>

          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            <div className="text-[10px] font-semibold text-[#999999] uppercase tracking-widest mb-3 px-3 pt-2">Ecosystem Lore</div>
            <button
              onClick={() => setActiveView('archetypes')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm mb-4 ${
                activeView === 'archetypes' 
                  ? 'bg-[#333333] text-white border-l-2 border-[#c4956a]' 
                  : 'text-[#999999] hover:bg-[#333333]/50 hover:text-gray-200'
              }`}
            >
              <Map size={16} className={activeView === 'archetypes' ? 'text-[#c4956a]' : 'text-[#999999]'} />
              <span>Archetype Codex</span>
            </button>

            <div className="text-[10px] font-semibold text-[#999999] uppercase tracking-widest mb-3 px-3 pt-2 border-t border-[#333333] mt-2 pt-4">Knowledge Graph Views</div>
            {layers.map(layer => (
              <button
                key={layer.id}
                onClick={() => { setActiveView('graph'); setActiveLayer(layer.id); }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm ${
                  activeView === 'graph' && activeLayer === layer.id
                    ? 'bg-[#333333] text-white border-l-2 border-[#c4956a]' 
                    : 'text-[#999999] hover:bg-[#333333]/50 hover:text-gray-200'
                }`}
              >
                <layer.icon size={16} className={activeView === 'graph' && activeLayer === layer.id ? 'text-[#c4956a]' : 'text-[#999999]'} />
                <span className="w-6 text-xs text-[#999999] opacity-70 font-mono">{layer.id}</span>
                <span>{layer.name}</span>
              </button>
            ))}

            <div className="text-[10px] font-semibold text-[#999999] uppercase tracking-widest mb-3 mt-6 px-3">Guild Chambers</div>
            <button
              onClick={() => setActiveView('guild_loom')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm ${
                activeView === 'guild_loom' 
                  ? 'bg-[#333333] text-white border-l-2 border-[#c4956a]' 
                  : 'text-[#999999] hover:bg-[#333333]/50 hover:text-gray-200'
              }`}
            >
              <Network size={16} className={activeView === 'guild_loom' ? 'text-[#c4956a]' : 'text-[#999999]'} />
              <span>Guild of the Loom (Code)</span>
            </button>
            <button
              onClick={() => setActiveView('guild_root')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm ${
                activeView === 'guild_root' 
                  ? 'bg-[#333333] text-white border-l-2 border-[#c4956a]' 
                  : 'text-[#999999] hover:bg-[#333333]/50 hover:text-gray-200'
              }`}
            >
              <Tent size={16} className={activeView === 'guild_root' ? 'text-[#c4956a]' : 'text-[#999999]'} />
              <span>Guild of the Root (Earth)</span>
            </button>
          </nav>

          <div className="p-4 border-t border-[#333333] text-xs text-[#999999] flex items-center justify-between bg-[#0f0f0f]/50">
            <span>Node Status: <span className={simRunning ? "text-[#c4956a]" : "text-[#999999]"}>
              {simRunning ? "Live Syncing" : "Paused"}
            </span></span>
            {simRunning && <Activity size={14} className="text-[#c4956a] animate-pulse" />}
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex overflow-hidden">
          
          {/* CENTER PANEL DYNAMIC CONTENT */}
          <div className="flex-1 flex flex-col overflow-y-auto bg-[#0f0f0f] relative">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-96 bg-[#c4956a]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

            {activeView === 'quests' && (
              <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Shield className="mr-3 text-[#c4956a]" size={28} /> 
                    Local Quest Board
                  </h2>
                  <p className="text-sm text-[#999999] mt-2 max-w-xl leading-relaxed">
                    Review available scopes. Committing to a role deducts from your Mana pool and creates an immutable pledge on the local ledger.
                  </p>
                </div>

                <div className="space-y-5">
                  {quests.length === 0 ? (
                    <div className="text-center py-12 border border-[#333333] border-dashed rounded-xl bg-[#1a1a1a]/50">
                      <Pickaxe size={32} className="mx-auto text-[#999999] mb-3" />
                      <p className="text-[#999999]">No active quests in this layer.</p>
                    </div>
                  ) : quests.map(quest => (
                    <div key={quest.id} className="bg-[#1a1a1a] border border-[#333333] rounded-xl p-5 hover:border-[#c4956a]/40 transition-all shadow-lg hover:shadow-[#c4956a]/5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              quest.type === 'Raid' ? 'bg-[#c4956a]/10 border-[#c4956a]/30 text-[#c4956a]' : 'bg-[#333333]/50 border-[#333333] text-gray-300'
                            }`}>
                              {quest.type}
                            </span>
                            <span className="text-xs text-[#999999] bg-[#0f0f0f] px-2 py-0.5 rounded border border-[#333333]">
                              Lvl: {quest.difficulty}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                        </div>
                        <div className="text-right bg-[#0f0f0f] p-2 rounded-lg border border-[#333333]">
                          <div className="text-[#c4956a] font-bold text-sm flex items-center justify-end">
                            {quest.reward} <Coins size={12} className="ml-1"/>
                          </div>
                          <div className="text-xs text-blue-400 mt-1 flex items-center justify-end font-medium">
                            <Zap size={10} className="mr-1"/> Cost: {quest.manaCost}
                          </div>
                        </div>
                      </div>

                      {/* Raid Roster / Role claiming UI */}
                      <div className="mt-5 bg-[#0f0f0f]/60 rounded-lg p-4 border border-[#333333]/50">
                        <div className="text-[10px] font-semibold text-[#999999] mb-3 uppercase tracking-widest flex items-center">
                          <Users size={12} className="mr-1.5" /> Required Roles
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {quest.roles.map((role) => (
                            <div key={role.id} className={`flex items-center justify-between text-sm px-3 py-2 rounded-md border transition-all ${
                              role.filled 
                                ? 'bg-[#333333]/50 border-[#333333] text-gray-300' 
                                : user.mana >= quest.manaCost 
                                  ? 'bg-[#1a1a1a] border-dashed border-[#c4956a]/30 text-[#c4956a] hover:border-[#c4956a] hover:bg-[#c4956a]/10 cursor-pointer shadow-[0_0_10px_rgba(196,149,106,0.05)]'
                                  : 'bg-[#1a1a1a] border-dashed border-red-500/20 text-[#999999] cursor-not-allowed opacity-60'
                            }`}
                            onClick={() => !role.filled && handleClaimRole(quest.id, role.id, quest.manaCost)}
                            >
                              <div className="flex items-center">
                                {role.filled ? <CheckCircle2 size={16} className="mr-2 text-[#c4956a]" /> : <CircleDashed size={16} className="mr-2" />}
                                <span className="font-medium mr-2">{role.name}</span>
                              </div>
                              
                              {role.filled ? (
                                <span className="text-xs font-mono bg-[#0f0f0f] px-2 py-0.5 rounded text-[#999999] border border-[#333333]">
                                  {role.user}
                                </span>
                              ) : (
                                <span className="text-xs font-medium uppercase tracking-wide">
                                  {user.mana >= quest.manaCost ? 'Claim' : 'Low Mana'}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'forest' && (
              <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Globe className="mr-3 text-[#c4956a]" size={28} /> 
                    The Forest Federation
                  </h2>
                  <p className="text-sm text-[#999999] mt-2 max-w-xl leading-relaxed">
                    Peer-to-peer relationships across autonomous hubs. Active bridges and ecosystem health metrics.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Local Hub Card */}
                  <div className="bg-[#1a1a1a] border border-[#c4956a]/30 rounded-xl p-5 shadow-[0_0_15px_rgba(196,149,106,0.1)]">
                    <div className="flex justify-between items-center mb-4 border-b border-[#333333] pb-3">
                      <h3 className="text-lg font-bold text-white flex items-center">
                        <Database size={16} className="mr-2 text-[#c4956a]" /> Techne (Boulder)
                      </h3>
                      <span className="text-xs bg-[#c4956a]/10 text-[#c4956a] px-2 py-1 rounded">Local Node</span>
                    </div>
                    <div className="space-y-2 text-sm text-[#999999]">
                      <div className="flex justify-between"><span>Active Members:</span><span className="text-white">42</span></div>
                      <div className="flex justify-between"><span>Node Sync:</span><span className="text-emerald-400">100%</span></div>
                      <div className="flex justify-between"><span>Treasury:</span><span className="text-[#c4956a]">14,200 $CLOUD</span></div>
                    </div>
                  </div>

                  {/* Remote Hubs */}
                  <div className="bg-[#0f0f0f] border border-[#333333] rounded-xl p-5 opacity-90">
                    <div className="flex justify-between items-center mb-4 border-b border-[#333333] pb-3">
                      <h3 className="text-lg font-bold text-gray-300 flex items-center">
                        <Globe size={16} className="mr-2 text-[#999999]" /> Nairobi Hub
                      </h3>
                      <span className="text-xs bg-[#333333] text-gray-300 px-2 py-1 rounded">Peer Node</span>
                    </div>
                    <div className="space-y-2 text-sm text-[#999999]">
                      <div className="flex justify-between"><span>Bridge Status:</span><span className="text-emerald-400">Connected</span></div>
                      <div className="flex justify-between"><span>Shared Raids:</span><span className="text-white">1 Active</span></div>
                      <div className="flex justify-between"><span>Latency:</span><span>124ms</span></div>
                    </div>
                  </div>

                  <div className="bg-[#0f0f0f] border border-[#333333] rounded-xl p-5 opacity-90">
                    <div className="flex justify-between items-center mb-4 border-b border-[#333333] pb-3">
                      <h3 className="text-lg font-bold text-gray-300 flex items-center">
                        <Globe size={16} className="mr-2 text-[#999999]" /> Zurich Hub
                      </h3>
                      <span className="text-xs bg-[#333333] text-gray-300 px-2 py-1 rounded">Peer Node</span>
                    </div>
                    <div className="space-y-2 text-sm text-[#999999]">
                      <div className="flex justify-between"><span>Bridge Status:</span><span className="text-amber-500">Syncing...</span></div>
                      <div className="flex justify-between"><span>Shared Raids:</span><span className="text-white">0 Active</span></div>
                      <div className="flex justify-between"><span>Latency:</span><span>45ms</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'archetypes' && (
              <div className="p-8 relative z-10 flex flex-col h-full overflow-y-auto">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Map className="mr-3 text-[#c4956a]" size={28} /> 
                    Agency Archetype Codex
                  </h2>
                  <p className="text-sm text-[#999999] mt-2 max-w-2xl leading-relaxed">
                    Translating traditional full-service digital agency roles into the World of Workcraft framework. 
                    Archetypes are formed by combining what you shape (Primary) with what shapes you (Secondary).
                  </p>
                </div>

                {/* Core Archetypes Grid */}
                <div className="mb-10">
                  <h3 className="text-sm font-bold text-[#c4956a] uppercase tracking-widest mb-4 flex items-center border-b border-[#333333] pb-2">
                    1. The Core Roster
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: Palette, name: 'The Weaver', crafts: 'Form × Code', guild: 'Lens (Form)', role: 'DPS / Visualizer', title: 'UI/UX Designer', focus: 'Translating human needs into spatial and interactive realities. Spending Mana on Figma and prototypes.' },
                      { icon: Cog, name: 'The Architect', crafts: 'Code × Form', guild: 'Loom (Code)', role: 'DPS / Builder', title: 'Front-End Engineer', focus: 'Turning Form into functional reality. Writing, testing, and deploying components.' },
                      { icon: TreeDeciduous, name: 'The Seedkeeper', crafts: 'Earth × Code', guild: 'Root (Earth)', role: 'Tank / Infrastructure', title: 'Back-End/DevOps', focus: 'Maintaining the deep roots (DB, CI/CD). Work happens before weavers/architects begin.' },
                      { icon: Feather, name: 'The Chronicler', crafts: 'Word × Form', guild: 'Quill (Word)', role: 'DPS / Context Provider', title: 'Copywriter/UX Writer', focus: 'Shaping the narrative and attesting to the clarity and truth of the message.' },
                      { icon: Flame, name: 'The Catalyst', crafts: 'Fire × Water', guild: 'Forge (Fire)', role: 'Raid Leader / Coordinator', title: 'Project Manager / Scrum Master', focus: 'Transformation and momentum. Creates Quests, estimates Mana, initiates Raids.' },
                      { icon: Droplet, name: 'The Emissary', crafts: 'Water × Word', guild: 'Spring (Water)', role: 'Healer / Space Holder', title: 'Account Director', focus: 'Connecting external clients to internal Hub. Shielding makers from scope creep.' }
                    ].map((arch, idx) => (
                      <div key={idx} className="bg-[#1a1a1a] border border-[#333333] rounded-xl p-5 hover:border-[#c4956a]/40 transition-all">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-[#0f0f0f] border border-[#333333] p-2 rounded-lg text-[#c4956a] shadow-sm">
                            <arch.icon size={22} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-md">{arch.name}</h4>
                            <div className="text-[10px] text-[#c4956a] uppercase tracking-wider font-bold">{arch.crafts}</div>
                          </div>
                        </div>
                        <div className="space-y-1.5 text-xs text-[#999999] bg-[#0f0f0f] p-3 rounded-lg mb-3 border border-[#333333]/50">
                          <div className="flex justify-between"><span className="text-gray-500">Guild:</span> <span className="text-gray-300">{arch.guild}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Party Role:</span> <span className="text-white">{arch.role}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Trad. Title:</span> <span className="text-[#c4956a]">{arch.title}</span></div>
                        </div>
                        <p className="text-xs text-[#999999] leading-relaxed">{arch.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Raid Workflow Timeline */}
                <div className="mb-10">
                  <h3 className="text-sm font-bold text-[#c4956a] uppercase tracking-widest mb-4 flex items-center border-b border-[#333333] pb-2">
                    2. Example Workflow: "Website Redesign Raid"
                  </h3>
                  <div className="space-y-4 pl-2 relative border-l-2 border-[#333333] ml-3">
                    {[
                      { phase: 'Phase 1: Initiation', actors: 'The Catalyst & The Emissary', desc: 'Emissary secures contract. Catalyst logs into M/ Methodology, creates Epic Raid, sets Loot (5,000 $CLOUD), defines Required Roles, and checks Active Roster Mana.' },
                      { phase: 'Phase 2: Party Forms', actors: 'All Archetypes', desc: 'Raid appears on Quest Board. A Chronicler (Word), two Weavers (Form), an Architect (Code) and Seedkeeper (Earth) claim roles. Mana is deducted locally.' },
                      { phase: 'Phase 3: Execution & Sync', actors: 'The Makers', desc: 'Work moves to A/ Artifacts. Weavers use Guild Chat for UI patterns (costs 1 Mana). Seedkeeper posts Side Quests. Peers Attest to completed Figma/PRs on the Ledger.' },
                      { phase: 'Phase 4: Delivery & Drops', actors: 'The Catalyst', desc: 'Raid marked complete. 5,000 $CLOUD minted/distributed based on ledger attestations. Makers level up, deplete Mana, and enter "Resting" state.' }
                    ].map((step, idx) => (
                      <div key={idx} className="relative pl-6 pb-2">
                        <div className="absolute -left-[21px] top-1 bg-[#0f0f0f] border-2 border-[#c4956a] w-3.5 h-3.5 rounded-full"></div>
                        <h4 className="text-white font-bold text-sm mb-1">{step.phase} <span className="text-xs text-[#c4956a] ml-2 font-normal">— {step.actors}</span></h4>
                        <p className="text-xs text-[#999999] leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView === 'graph' && (
              <div className="p-8 relative z-10 flex flex-col h-full overflow-hidden">
                <div className="mb-6 z-20 pointer-events-none">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    {React.createElement(layers.find(l => l.id === activeLayer)?.icon || Database, { className: "mr-3 text-[#c4956a]", size: 28 })}
                    Graph View: {layers.find(l => l.id === activeLayer)?.name} Dimension
                  </h2>
                  <p className="text-sm text-[#999999] mt-2 max-w-xl leading-relaxed">
                    Visualizing the relationships, entities, and state tied to the <span className="font-mono text-[#c4956a]">{activeLayer}</span> dimensional layer of the local knowledge graph.
                  </p>
                </div>
                
                <div className="flex-1 relative bg-[#0f0f0f] border border-[#333333] rounded-xl shadow-inner mt-2 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c4956a]/5 via-[#0f0f0f] to-[#0f0f0f]"></div>
                  
                  {/* SVG Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {GRAPH_DATA[activeLayer]?.nodes.map(node => {
                       const angleRad = node.angle * (Math.PI / 180);
                       const x = 50 + node.dist * Math.cos(angleRad);
                       const y = 50 + node.dist * Math.sin(angleRad);
                       return (
                         <line 
                           key={`edge-${node.id}`}
                           x1="50%" y1="50%" 
                           x2={`${x}%`} y2={`${y}%`}
                           stroke="#333333" 
                           strokeWidth="2"
                           strokeDasharray="4 4"
                           className="opacity-50"
                         />
                       )
                    })}
                  </svg>

                  {/* Center Node */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                     <div className="bg-[#1a1a1a] border-2 border-[#c4956a] p-4 rounded-full shadow-[0_0_20px_rgba(196,149,106,0.2)]">
                       {React.createElement(GRAPH_DATA[activeLayer]?.center.icon || Database, { size: 32, className: "text-[#c4956a]" })}
                     </div>
                     <span className="mt-3 text-sm font-bold text-white bg-[#0f0f0f] px-3 py-1 rounded border border-[#333333] shadow-md whitespace-nowrap">
                       {GRAPH_DATA[activeLayer]?.center.label}
                     </span>
                  </div>

                  {/* Orbiting Nodes */}
                  {GRAPH_DATA[activeLayer]?.nodes.map(node => {
                     const angleRad = node.angle * (Math.PI / 180);
                     const x = 50 + node.dist * Math.cos(angleRad);
                     const y = 50 + node.dist * Math.sin(angleRad);
                     return (
                       <div 
                         key={`node-${node.id}`}
                         className="absolute z-10 flex flex-col items-center transition-transform hover:scale-110 cursor-pointer group"
                         style={{ top: `${y}%`, left: `${x}%`, transform: 'translate(-50%, -50%)' }}
                       >
                         <div className="bg-[#1a1a1a] border border-[#333333] p-3 rounded-full group-hover:border-[#c4956a] group-hover:shadow-[0_0_15px_rgba(196,149,106,0.3)] transition-all">
                           <node.icon size={20} className="text-[#999999] group-hover:text-[#c4956a] transition-colors" />
                         </div>
                         <div className="flex flex-col items-center mt-2 opacity-80 group-hover:opacity-100 transition-all">
                           <span className="text-[10px] font-bold uppercase tracking-wide text-[#999999] whitespace-nowrap bg-[#0f0f0f]/90 px-2 py-0.5 rounded border border-[#333333] group-hover:text-white transition-all">
                             {node.label}
                           </span>
                           {node.guild && (
                             <span className="text-[8px] font-mono text-[#c4956a] mt-1 bg-[#1a1a1a]/90 px-1.5 py-0.5 rounded border border-[#c4956a]/30 shadow-sm whitespace-nowrap">
                               Guild: {node.guild}
                             </span>
                           )}
                         </div>
                       </div>
                     )
                  })}
                </div>
              </div>
            )}

            {activeView === 'profile' && selectedPeer && (
              <div className="p-8 relative z-10 flex flex-col h-full overflow-y-auto">
                <button 
                  onClick={() => setActiveView('quests')} 
                  className="flex items-center text-[#999999] hover:text-white transition-colors mb-6 w-fit bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-[#333333]"
                >
                  <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
                </button>

                <div className="bg-[#1a1a1a] border border-[#333333] rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                  {/* Decorative Background Element */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4956a]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                  
                  {/* Header Profile */}
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 rounded-2xl bg-[#0f0f0f] border-2 border-[#c4956a] flex items-center justify-center shadow-[0_0_20px_rgba(196,149,106,0.2)]">
                        <User size={40} className="text-[#c4956a]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h2 className="text-3xl font-bold text-white">{selectedPeer.name}</h2>
                          <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md border ${
                            selectedPeer.rarity === 'Legendary' ? 'bg-amber-900/30 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(251,191,36,0.3)]' :
                            selectedPeer.rarity === 'Epic' ? 'bg-purple-900/30 text-purple-400 border-purple-500/50' :
                            selectedPeer.rarity === 'Rare' ? 'bg-blue-900/30 text-blue-400 border-blue-500/50' :
                            selectedPeer.rarity === 'Uncommon' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/50' :
                            'bg-[#333333]/50 text-[#999999] border-[#333333]'
                          }`}>
                            {selectedPeer.rarity}
                          </span>
                        </div>
                        <div className="text-[#999999] flex items-center space-x-2 mt-2">
                          <span className="bg-[#c4956a]/10 text-[#c4956a] text-xs font-bold px-2 py-0.5 rounded border border-[#c4956a]/30">Lvl {selectedPeer.level}</span>
                          <span>•</span>
                          <span className="font-medium text-gray-300">{selectedPeer.archetype}</span>
                          <span>({selectedPeer.specialization})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="inline-flex items-center space-x-2 bg-[#0f0f0f] px-3 py-1.5 rounded-lg border border-[#333333]">
                        <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                          selectedPeer.status === 'Online' || selectedPeer.status === 'Processing' 
                            ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' 
                            : selectedPeer.status === 'Resting' ? 'bg-[#c4956a]' : 'bg-[#333333]'
                        }`}></div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-300">{selectedPeer.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                    
                    {/* Left Column: Bio & Core Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-[#0f0f0f] border border-[#333333] rounded-xl p-5">
                        <h3 className="text-xs font-bold text-[#c4956a] uppercase tracking-widest mb-3 flex items-center">
                          <BookA size={14} className="mr-2" /> Dossier
                        </h3>
                        <p className="text-sm text-[#999999] leading-relaxed">
                          {selectedPeer.about}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0f0f0f] border border-[#333333] rounded-xl p-5">
                          <h3 className="text-xs font-bold text-[#c4956a] uppercase tracking-widest mb-3 flex items-center">
                            <Shield size={14} className="mr-2" /> Class Identity
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Primary × Secondary</div>
                              <div className="text-sm text-white font-medium">{selectedPeer.crafts}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Guild Chamber</div>
                              <div className="text-sm text-white font-medium flex items-center">
                                {selectedPeer.guild !== 'None' ? `Guild of the ${selectedPeer.guild}` : 'Unaffiliated'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#0f0f0f] border border-[#333333] rounded-xl p-5">
                          <h3 className="text-xs font-bold text-[#c4956a] uppercase tracking-widest mb-3 flex items-center">
                            <Award size={14} className="mr-2" /> Ecosystem Record
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Total Contributions</div>
                              <div className="text-sm text-white font-medium flex items-center">
                                <Activity size={12} className="text-[#c4956a] mr-1.5" /> {selectedPeer.contributions} Verified
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Arrival Date</div>
                              <div className="text-sm text-white font-medium flex items-center">
                                <Clock size={12} className="text-[#999999] mr-1.5" /> {selectedPeer.joined}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Stats & Talent Tree */}
                    <div className="space-y-6">
                      <div className="bg-[#0f0f0f] border border-[#333333] rounded-xl p-5">
                        <h3 className="text-xs font-bold text-[#c4956a] uppercase tracking-widest mb-4 flex items-center">
                          <BarChart2 size={14} className="mr-2" /> Talent Mastery (Domains)
                        </h3>
                        <div className="space-y-4">
                          {Object.entries(selectedPeer.stats).map(([stat, val]) => (
                            <div key={stat}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-300 capitalize font-medium">{stat}</span>
                                <span className="text-[#c4956a] font-mono">{val} XP</span>
                              </div>
                              <div className="w-full bg-[#333333] rounded-full h-1.5 overflow-hidden">
                                <div 
                                  className="bg-[#c4956a] h-1.5 rounded-full shadow-[0_0_10px_rgba(196,149,106,0.5)]" 
                                  style={{ width: `${val}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[#0f0f0f] border border-[#333333] rounded-xl p-5">
                        <h3 className="text-xs font-bold text-[#c4956a] uppercase tracking-widest mb-4 flex items-center">
                          <Zap size={14} className="mr-2" /> Current Resources
                        </h3>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-300 font-medium">Available Mana</span>
                            <span className="text-blue-400 font-mono">{selectedPeer.mana} / {selectedPeer.maxMana}</span>
                          </div>
                          <div className="w-full bg-[#333333] rounded-full h-2 overflow-hidden mb-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${selectedPeer.mana < 20 ? 'bg-red-500' : 'bg-blue-500'}`} 
                              style={{ width: `${(selectedPeer.mana/selectedPeer.maxMana)*100}%` }}
                            ></div>
                          </div>
                          <p className="text-[10px] text-[#999999] leading-tight">
                            Mana dictates how many active scopes this agent or human can claim before resting.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeView.startsWith('guild_') && (
              <div className="flex flex-col h-full relative z-10">
                <div className="p-6 border-b border-[#333333] bg-[#1a1a1a]/80 backdrop-blur-sm shadow-sm flex items-center">
                  <MessageSquare className="mr-3 text-[#c4956a]" size={24} /> 
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Guild of the {activeView.split('_')[1].charAt(0).toUpperCase() + activeView.split('_')[1].slice(1)}
                    </h2>
                    <p className="text-xs text-[#999999] mt-0.5">Global Craft Community • Cost: 1 Mana / Message</p>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages[activeView.split('_')[1]]?.map(msg => (
                    <div key={msg.id} className={`flex flex-col ${msg.user === user.guestname ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-[#999999] mb-1 px-1">{msg.user} • {msg.time}</span>
                      <div className={`px-4 py-2.5 rounded-lg max-w-[80%] text-sm ${
                        msg.user === user.guestname 
                          ? 'bg-[#c4956a] text-[#0f0f0f] rounded-tr-sm shadow-md' 
                          : 'bg-[#333333] text-gray-200 rounded-tl-sm border border-[#333333]'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-[#1a1a1a] border-t border-[#333333]">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Share a pattern, ask a question... (Costs 1 Mana)"
                      className="flex-1 bg-[#0f0f0f] border border-[#333333] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#c4956a] transition-colors"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || user.mana < 1}
                      className="bg-[#c4956a] hover:bg-[#c4956a]/80 disabled:bg-[#333333] disabled:text-[#999999] text-[#0f0f0f] p-2.5 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: Peer Network & Combat Log */}
          <aside className="w-80 bg-[#1a1a1a] border-l border-[#333333] flex flex-col shadow-[-4px_0_15px_rgba(0,0,0,0.5)] z-10">
            
            {/* Peer Nodes / Talent Network */}
            <div className="p-5 h-2/5 border-b border-[#333333] overflow-y-auto bg-[#1a1a1a]">
              <h3 className="text-[10px] font-bold text-[#999999] uppercase tracking-widest mb-4 flex items-center">
                <Globe size={14} className="mr-2 text-[#c4956a]" /> Active Roster
              </h3>
              <div className="space-y-3">
                {peers.map((peer) => (
                  <div 
                    key={peer.id} 
                    onClick={() => {
                      setSelectedPeer(peer);
                      setActiveView('profile');
                    }}
                    className="group flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-[#c4956a]/30 hover:bg-[#333333]/50 cursor-pointer transition-all"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-200 flex items-center group-hover:text-white transition-colors">
                        <div className={`w-2 h-2 rounded-full mr-2 shadow-sm ${
                          peer.status === 'Online' || peer.status === 'Processing' 
                            ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' 
                            : peer.status === 'Resting' ? 'bg-[#c4956a]' : 'bg-[#333333]'
                        }`}></div>
                        {peer.name}
                      </div>
                      <div className="text-xs text-[#999999] ml-4 mt-0.5 flex justify-between">
                        <span>{peer.class}</span>
                        <span className="text-[10px] uppercase text-[#999999] font-bold">{peer.status}</span>
                      </div>
                      {/* Peer Mana Bar */}
                      <div className="ml-4 mt-2 h-1 w-full bg-[#333333] rounded-full overflow-hidden">
                         <div 
                           className={`h-full transition-all duration-500 ${peer.mana < 20 ? 'bg-red-500' : 'bg-blue-500/50'}`} 
                           style={{ width: `${(peer.mana/peer.maxMana)*100}%` }}>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Combat Log (Append Only Ledger) */}
            <div className="p-5 flex-1 overflow-y-auto bg-[#0f0f0f] relative flex flex-col">
              <div className="sticky top-0 bg-[#0f0f0f] pb-3 mb-2 z-10 border-b border-[#333333] flex justify-between items-center">
                <h3 className="text-[10px] font-bold text-[#999999] uppercase tracking-widest flex items-center">
                  <Pickaxe size={14} className="mr-2 text-[#c4956a]" /> Event Ledger
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center bg-[#1a1a1a] rounded border border-[#333333]">
                    <button 
                      onClick={() => setLogPage(p => Math.min(totalLogPages, p + 1))}
                      disabled={logPage === totalLogPages}
                      title="Older Events"
                      className="p-1 text-[#999999] hover:text-[#c4956a] disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft size={12} />
                    </button>
                    <span className="text-[10px] font-mono text-[#999999] px-1">{logPage}/{totalLogPages}</span>
                    <button 
                      onClick={() => setLogPage(p => Math.max(1, p - 1))}
                      disabled={logPage === 1}
                      title="Newer Events"
                      className="p-1 text-[#999999] hover:text-[#c4956a] disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight size={12} />
                    </button>
                  </div>
                  <span className="flex h-2 w-2 relative">
                    {simRunning && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4956a] opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${simRunning ? 'bg-[#c4956a]' : 'bg-[#333333]'}`}></span>
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 pt-2 flex-1">
                {paginatedLogs.map((log) => (
                  <div key={log.id} className="text-sm relative pl-4 border-l-2 border-[#333333] hover:border-[#c4956a]/50 transition-colors py-1">
                    <div className="absolute -left-1.5 top-2.5 w-2.5 h-2.5 rounded-full bg-[#0f0f0f] border-2 border-[#333333]"></div>
                    <div className="flex flex-wrap items-baseline gap-1.5 leading-tight">
                      <span className={`font-bold ${
                        log.type === 'Loot' ? 'text-[#c4956a]' : 
                        log.type === 'System Alert' ? 'text-red-400' :
                        log.type === 'Attestation' ? 'text-gray-300' :
                        'text-white'
                      }`}>{log.user}</span>
                      <span className="text-[#999999] text-xs">{log.action}</span>
                      <span className="font-semibold text-gray-200">{log.target}</span>
                    </div>
                    <div className="text-[9px] uppercase tracking-wider font-bold text-[#999999] mt-1.5 flex items-center">
                      <span className="text-[#999999] opacity-70">{log.time}</span>
                      <span className="mx-1.5">•</span> 
                      <span className="font-mono bg-[#1a1a1a] px-1 rounded">{log.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </main>
      </div>
    </div>
  );
}
