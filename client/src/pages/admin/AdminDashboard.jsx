import React, { useState, useEffect } from 'react';
import { Users, FileText, Sparkles, Activity, Calendar, ChevronDown, CheckCircle, Database, Server, Link as LinkIcon, HardDrive, DollarSign, PenTool, LayoutTemplate, MessageSquare, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { io } from 'socket.io-client';
import api from '../../services/api';

const mockLineData = [
    { name: 'May 3', users: 2000 },
    { name: 'May 4', users: 4000 },
    { name: 'May 5', users: 8000 },
    { name: 'May 6', users: 5000 },
    { name: 'May 7', users: 6500 },
    { name: 'May 8', users: 11000 },
    { name: 'May 9', users: 12456 },
];

const mockPieData = [
    { name: 'Documents Edited', value: 430, color: '#3b82f6' },
    { name: 'Comments', value: 312, color: '#8b5cf6' },
    { name: 'Chat Messages', value: 251, color: '#10b981' },
    { name: 'File Shared', value: 165, color: '#64748b' },
    { name: 'Others', value: 76, color: '#334155' },
];

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDocuments: 0,
        totalBlogs: 0,
        activeAdmins: 0,
        activeUsers: 0,
        loggedTodayAdmins: 0,
        loggedTodayUsers: 0,
        activities: [],
        socialPostsScheduled: 0,
        aiContentGenerated: 0,
        totalEngagement: '0'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/stats');
                setStats(prev => ({
                    ...prev,
                    ...res.data,
                    activities: res.data.activities || prev.activities || []
                }));
            } catch (err) {
                console.error("Failed to load admin stats", err);
            }
        };
        fetchStats();

        // Real-Time Monitoring
        const token = sessionStorage.getItem('token');
        let rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        if (typeof rawApiUrl === 'string' && rawApiUrl.includes('VITE_API_URL=')) {
            rawApiUrl = rawApiUrl.split('VITE_API_URL=')[1];
        }
        let rawSocketUrl = import.meta.env.VITE_SOCKET_URL;
        if (typeof rawSocketUrl === 'string' && rawSocketUrl.includes('VITE_SOCKET_URL=')) {
            rawSocketUrl = rawSocketUrl.split('VITE_SOCKET_URL=')[1];
        }
        const socketUrl = rawSocketUrl || rawApiUrl.replace(/\/api$/, '');
        const socket = io(socketUrl, {
            auth: { token }
        });

        socket.on('connect_error', (err) => {
            console.error('Socket connection error in AdminDashboard:', err.message);
            if (err.message === 'Authentication error') {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                window.location.href = '/login';
            }
        });

        socket.emit('join-admin');

        socket.on('admin-stats-update', (data) => {
            setStats(prev => ({
                ...prev,
                activeAdmins: data.activeAdmins,
                activeUsers: data.activeUsers,
                loggedTodayAdmins: data.loggedTodayAdmins,
                loggedTodayUsers: data.loggedTodayUsers,
                activities: data.activities || []
            }));
        });
        
        socket.on('new-activity', (activity) => {
            setStats(prev => ({
                ...prev,
                activities: [activity, ...prev.activities].slice(0, 50)
            }));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const topCards = [
        { title: 'Total Users', value: '12,456', icon: <Users size={20} className="text-purple-400" />, iconBg: 'bg-purple-500/20', trend: '+12.5%' },
        { title: 'Active Collaborators', value: '1,234', icon: <Activity size={20} className="text-emerald-400" />, iconBg: 'bg-emerald-500/20', trend: '+8.2%' },
        { title: 'Documents Created', value: '3,567', icon: <FileText size={20} className="text-blue-400" />, iconBg: 'bg-blue-500/20', trend: '+15.3%' },
        { title: 'Blog Posts', value: '890', icon: <LayoutTemplate size={20} className="text-orange-400" />, iconBg: 'bg-orange-500/20', trend: '+10.1%' },
        { title: 'AI Content Generated', value: '2,345', icon: <Sparkles size={20} className="text-pink-400" />, iconBg: 'bg-pink-500/20', trend: '+18.6%' },
        { title: 'Revenue', value: '$45,678', icon: <DollarSign size={20} className="text-emerald-400" />, iconBg: 'bg-emerald-500/20', trend: '+20.4%' },
    ];

    const collaborationPieData = [
        { name: 'Documents', value: stats.totalDocuments || 0, color: '#3b82f6' },
        { name: 'Comments', value: stats.totalComments || 0, color: '#8b5cf6' },
        { name: 'Messages', value: stats.totalMessages || 0, color: '#10b981' },
        { name: 'Social Posts', value: stats.socialPostsScheduled || 0, color: '#64748b' },
        { name: 'AI Content', value: stats.aiContentGenerated || 0, color: '#334155' },
    ];

    const totalCollab = collaborationPieData.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-[22px] font-bold text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
                    <p className="text-[13px] text-gray-500 dark:text-[#8b949e]">Welcome back! Here's what's happening with Collab-Tool.</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#11131a] border border-gray-200 dark:border-[#1e212b] px-3 py-1.5 rounded-lg">
                    <span className="text-[12px] text-gray-900 dark:text-white">May 3, 2025 - May 9, 2025</span>
                    <Calendar size={14} className="text-gray-500 dark:text-[#8b949e] ml-2" />
                </div>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-6 gap-4">
                {topCards.map((card, i) => (
                    <div key={i} className="bg-white dark:bg-[#15171e] border border-gray-200 dark:border-[#1e212b] rounded-xl p-4 flex flex-col justify-between h-28">
                        <div className="flex justify-between items-start">
                            <p className="text-[12px] text-gray-900 dark:text-white font-medium">{card.title}</p>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                                {card.icon}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.title === 'Total Users' ? stats.totalUsers.toLocaleString() : (card.title === 'Active Collaborators' ? stats.activeCollaborators : card.value)}</h3>
                            <div className="flex items-center gap-1">
                                <span className="text-[11px] text-emerald-400 font-medium">{card.trend}</span>
                                <span className="text-[11px] text-gray-500 dark:text-[#8b949e]">from last week</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle Row Grid */}
            <div className="grid grid-cols-12 gap-5">
                {/* User Growth Chart */}
                <div className="col-span-5 bg-white dark:bg-[#15171e] border border-gray-200 dark:border-[#1e212b] rounded-xl p-5">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">User Growth</h3>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalUsers.toLocaleString()}</h2>
                            <p className="text-[11px] text-gray-500 dark:text-[#8b949e]">Total Users</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 bg-gray-50 dark:bg-[#11131a] border border-gray-200 dark:border-[#1e212b] px-2.5 py-1 rounded-md mb-2 cursor-pointer">
                                <span className="text-[11px] text-gray-900 dark:text-white">This Week</span>
                                <ChevronDown size={12} className="text-gray-500 dark:text-[#8b949e]" />
                            </div>
                            <span className="text-[11px] text-emerald-400 font-medium">-12.5% <span className="text-gray-500 dark:text-[#8b949e]">from last week</span></span>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 220 }}>
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={mockLineData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e212b" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8b949e', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8b949e', fontSize: 11}} tickFormatter={(val) => `${val/1000}K`} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#11131a', border: '1px solid #1e212b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                                    itemStyle={{ color: '#8b5cf6' }}
                                    cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '3 3' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Collaboration Activity Pie */}
                <div className="col-span-4 bg-white dark:bg-[#15171e] border border-gray-200 dark:border-[#1e212b] rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Collaboration Activity</h3>
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-[#11131a] border border-gray-200 dark:border-[#1e212b] px-2.5 py-1 rounded-md cursor-pointer">
                            <span className="text-[11px] text-gray-900 dark:text-white">This Week</span>
                            <ChevronDown size={12} className="text-gray-500 dark:text-[#8b949e]" />
                        </div>
                    </div>
                    <div className="flex items-center" style={{ height: 220 }}>
                        <div className="w-1/2 h-full relative" style={{ minHeight: 220 }}>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={collaborationPieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {collaborationPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{totalCollab}</span>
                                <span className="text-[11px] text-gray-500 dark:text-[#8b949e]">Total</span>
                            </div>
                        </div>
                        <div className="w-1/2 pl-4 space-y-3">
                            {collaborationPieData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-[11px] text-gray-500 dark:text-[#8b949e]">{item.name}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-900 dark:text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live Activity */}
                <div className="col-span-3 bg-white dark:bg-[#15171e] border border-gray-200 dark:border-[#1e212b] rounded-xl p-5 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[14px] font-bold text-gray-900 dark:text-white">Live Activity</h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-emerald-400">
                                    {(stats.activeUsers || 0) + (stats.activeAdmins || 0)} Active
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                                <span className="text-[10px] font-bold text-blue-400">
                                    {(stats.loggedTodayUsers || 0) + (stats.loggedTodayAdmins || 0)} Logged Today
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-4 max-h-[400px]">
                        {stats.activities?.length > 0 ? (
                            stats.activities.map((log, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <img 
                                        src={`https://ui-avatars.com/api/?name=${(log.username || 'U').replace(' ','+')}&background=random&color=fff`} 
                                        className="w-7 h-7 rounded-full mt-0.5" 
                                        alt={log.username}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[12px] font-bold text-gray-900 dark:text-white truncate">{log.username}</p>
                                        <p className="text-[11px] text-gray-500 dark:text-[#8b949e] truncate">{log.action}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <span className="text-[10px] text-gray-500 dark:text-[#8b949e]">{log.time}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 opacity-40">
                                <Activity size={32} className="text-gray-500 dark:text-[#8b949e] mb-2" />
                                <p className="text-[11px] text-gray-500 dark:text-[#8b949e]">No live activity detected</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Row Grid */}
            <div className="grid grid-cols-4 gap-5">
                {/* Top Performing Blogs */}
                <div className="bg-white dark:bg-[#15171e] border border-gray-200 dark:border-[#1e212b] rounded-xl p-5">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">Top Performing Blogs</h3>
                        <span className="text-[11px] text-indigo-400 font-medium cursor-pointer hover:text-indigo-300">View All</span>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'How AI is Transforming Workspaces', views: '2,345', trend: '+18.5%', img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=50&h=50&fit=crop' },
                            { title: '10 Tips for Better Team Collaboration', views: '1,876', trend: '+14.2%', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=50&h=50&fit=crop' },
                            { title: 'The Future of Remote Work', views: '1,567', trend: '+11.3%', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=50&h=50&fit=crop' },
                            { title: 'Collab-Tool Release Notes', views: '987', trend: '+8.7%', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=50&h=50&fit=crop' },
                            { title: 'Ultimate Guide to Productivity', views: '876', trend: '+7.5%', img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=50&h=50&fit=crop' },
                        ].map((blog, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <img src={blog.img} className="w-9 h-9 rounded-md object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-bold text-gray-900 dark:text-white truncate">{blog.title}</p>
                                    <p className="text-[10px] text-gray-500 dark:text-[#8b949e]">{blog.views} views</p>
                                </div>
                                <span className="text-[11px] text-emerald-400 font-medium">{blog.trend}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Media Overview */}
                <div className="bg-white dark:bg-[#15171e] border border-gray-200 dark:border-[#1e212b] rounded-xl p-5">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">Social Media Overview</h3>
                        <span className="text-[11px] text-indigo-400 font-medium cursor-pointer hover:text-indigo-300">View All</span>
                    </div>
                    <div className="space-y-5">
                        {[
                            { name: 'Instagram', handle: '@collab_tool', count: '2,345', trend: '+15.3%', color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500', icon: <Instagram size={18} /> },
                            { name: 'LinkedIn', handle: 'Collab-Tool Official', count: '4,567', trend: '+20.1%', color: 'bg-[#0a66c2]', icon: <Linkedin size={18} /> },
                            { name: 'Twitter', handle: '@collab_tool', count: '1,234', trend: '+9.8%', color: 'bg-[#1da1f2]', icon: <Twitter size={18} /> },
                            { name: 'Facebook', handle: 'Collab-Tool', count: '987', trend: '+7.2%', color: 'bg-[#1877f2]', icon: <Facebook size={18} /> },
                        ].map((social, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold ${social.color}`}>
                                        {social.icon}
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-bold text-gray-900 dark:text-white">{social.name}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-[#8b949e]">{social.handle}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[12px] font-bold text-gray-900 dark:text-white">{social.count}</p>
                                    <p className="text-[10px] text-emerald-400">{social.trend}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Usage Stats */}
                <div className="bg-white dark:bg-[#15171e] border border-gray-200 dark:border-[#1e212b] rounded-xl p-5">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">AI Usage Stats</h3>
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-[#11131a] border border-gray-200 dark:border-[#1e212b] px-2 py-0.5 rounded cursor-pointer">
                            <span className="text-[10px] text-gray-900 dark:text-white">This Week</span>
                            <ChevronDown size={10} className="text-gray-500 dark:text-[#8b949e]" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Blogs Generated', count: '456', trend: '+12.5%', icon: <FileText size={14} className="text-purple-400"/>, bg: 'bg-purple-500/20' },
                            { name: 'Captions Generated', count: '1,234', trend: '+18.7%', icon: <MessageSquare size={14} className="text-indigo-400"/>, bg: 'bg-indigo-500/20' },
                            { name: 'Images Generated', count: '345', trend: '+10.3%', icon: <LayoutTemplate size={14} className="text-orange-400"/>, bg: 'bg-orange-500/20' },
                            { name: 'SEO Optimizations', count: '567', trend: '+15.1%', icon: <Activity size={14} className="text-blue-400"/>, bg: 'bg-blue-500/20' },
                            { name: 'Total Tokens Used', count: '2.4M', trend: '+20.5%', icon: <Database size={14} className="text-yellow-400"/>, bg: 'bg-yellow-500/20' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-7 h-7 rounded-md flex items-center justify-center ${stat.bg}`}>
                                        {stat.icon}
                                    </div>
                                    <p className="text-[11px] text-gray-500 dark:text-[#8b949e]">{stat.name}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] font-bold text-gray-900 dark:text-white">{stat.count}</span>
                                    <span className="text-[10px] text-emerald-400">{stat.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white dark:bg-[#15171e] border border-gray-200 dark:border-[#1e212b] rounded-xl p-5 flex flex-col">
                    <h3 className="text-[13px] font-bold text-gray-900 dark:text-white mb-5">System Status</h3>
                    <div className="flex-1 flex flex-col justify-between">
                        {[
                            { name: 'Server', status: 'All systems operational', icon: <Server size={14} className="text-emerald-400"/> },
                            { name: 'Database', status: 'All systems operational', icon: <Database size={14} className="text-emerald-400"/> },
                            { name: 'Storage', status: 'All systems operational', icon: <HardDrive size={14} className="text-emerald-400"/> },
                            { name: 'Socket Connection', status: 'All systems operational', icon: <LinkIcon size={14} className="text-emerald-400"/> },
                        ].map((sys, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                        {sys.icon}
                                    </div>
                                    <div>
                                        <p className="text-[12px] font-bold text-gray-900 dark:text-white leading-tight">{sys.name}</p>
                                        <p className="text-[10px] text-gray-500 dark:text-[#8b949e]">{sys.status}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">Operational</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
