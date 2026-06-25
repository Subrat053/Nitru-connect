import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { Inbox, Users, RefreshCw, AlertCircle, ArrowUpRight, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMsg('');
      const [statsData, enquiriesData] = await Promise.all([
        api.getDashboardStats(),
        api.getEnquiries(),
      ]);
      setStats(statsData);
      // Sort enquiries by date and slice top 5
      setRecentEnquiries(enquiriesData.slice(0, 5));
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load dashboard metrics. Verify database connections.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <RefreshCw className="animate-spin text-primary" size={32} />
        <p className="text-xs font-bold text-gray-500 font-montserrat">Loading metrics...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="glass-panel text-center max-w-md mx-auto my-8 p-8 rounded-3xl border border-red-200 bg-red-50/30 text-red-600 font-montserrat">
        <AlertCircle className="mx-auto mb-2 text-red-500" size={32} />
        <p className="font-semibold text-sm">{errorMsg}</p>
        <button 
          onClick={fetchDashboardData} 
          className="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold font-montserrat shadow-md transition-all active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Leads', value: stats?.totalEnquiries || 0, icon: <Inbox size={22} className="text-primary" />, bg: 'bg-primary/5 border border-primary/10' },
    { label: 'New Enquiries', value: stats?.newLeads || 0, icon: <AlertCircle size={22} className="text-secondary-dark" />, bg: 'bg-secondary/10 border border-secondary/20' },
    { label: 'In Progress', value: stats?.inProgressLeads || 0, icon: <TrendingUp size={22} className="text-orange-500" />, bg: 'bg-orange-500/5 border border-orange-500/10' },
    { label: 'Converted Client', value: stats?.convertedLeads || 0, icon: <Users size={22} className="text-green-500" />, bg: 'bg-green-500/5 border border-green-500/10' },
  ];

  return (
    <div className="flex flex-col gap-8 text-left font-montserrat">
      <SEO title="Admin Dashboard" />

      {/* Grid count cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="glass-panel rounded-2xl p-6 flex items-center justify-between shadow-md bg-white/40 border border-white/50 hover:-translate-y-0.5 transition-all">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</span>
              <span className="text-3xl font-extrabold text-neutral">{card.value}</span>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.bg}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Monthly trends chart (2 cols) */}
        <div className="glass-panel rounded-3xl p-6 shadow-md lg:col-span-2 flex flex-col gap-6 bg-white/40 border border-white/50">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral">Monthly Enquiry Trends</h3>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider bg-white/60 px-2.5 py-1 rounded-full border border-white">Last 6 Months</span>
          </div>

          {stats?.monthlyEnquiryGraph && stats.monthlyEnquiryGraph.length > 0 ? (
            <div className="h-64 flex items-end justify-between gap-4 border-b border-white/60 pb-2 pt-6">
              {stats.monthlyEnquiryGraph.map((item, i) => {
                // calculate height percentage based on max count
                const counts = stats.monthlyEnquiryGraph.map(g => g.count);
                const maxVal = Math.max(...counts, 5); // default min max of 5
                const heightPercentage = Math.round((item.count / maxVal) * 100);

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    {/* Tooltip */}
                    <span className="opacity-0 group-hover:opacity-100 bg-neutral text-white text-[9px] font-bold px-2 py-1 rounded transition-opacity pointer-events-none mb-1 shadow-md">
                      {item.count} Leads
                    </span>
                    {/* Bar */}
                    <div 
                      style={{ height: `${heightPercentage}%` }} 
                      className="w-full max-w-[40px] bg-gradient-to-t from-primary to-[#1844cb] group-hover:from-primary-dark group-hover:to-primary rounded-t-lg transition-all duration-300 relative shadow-sm"
                    />
                    {/* Label */}
                    <span className="text-[9px] font-bold text-gray-400 truncate w-full text-center mt-1">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400 text-xs bg-white/20 rounded-2xl border border-dashed border-white/60">
              No historical data available. Submit some enquiries to build charts.
            </div>
          )}
        </div>

        {/* Service Split (1 col) */}
        <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col gap-6 bg-white/40 border border-white/50">
          <h3 className="text-sm font-bold text-neutral">Service Demand</h3>
          
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {stats?.serviceWiseLeads && stats.serviceWiseLeads.length > 0 ? (
              stats.serviceWiseLeads.map((item, i) => {
                const total = stats.totalEnquiries || 1;
                const percentage = Math.round((item.count / total) * 100);
                
                return (
                  <div key={i} className="flex flex-col gap-1 text-left">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-gray-500 truncate max-w-[70%]">{item.service || 'General Enquiry'}</span>
                      <span className="text-neutral font-extrabold">{item.count} ({percentage}%)</span>
                    </div>
                    {/* progress line */}
                    <div className="w-full h-2 bg-white/60 border border-white/80 rounded-full overflow-hidden shadow-inner">
                      <div 
                        style={{ width: `${percentage}%` }} 
                        className="h-full bg-secondary-dark rounded-full"
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-400 text-xs font-bold">
                No service demand data yet.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Recent Leads / Enquiries Table */}
      <div className="glass-panel rounded-3xl p-6 shadow-md flex flex-col gap-6 bg-white/40 border border-white/50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral">Recent Enquiries</h3>
          <Link 
            to="/admin/enquiries" 
            className="text-xs font-bold text-primary hover:text-primary-dark flex items-center gap-0.5 bg-white/60 px-3 py-1.5 rounded-full border border-white shadow-sm transition-all"
          >
            <span>View All</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/60 text-gray-400 text-[10px] font-bold uppercase tracking-wider text-left">
                <th className="pb-3 pl-2">Date</th>
                <th className="pb-3">Company</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3">Service</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-white/30 transition-colors">
                    <td className="py-3.5 pl-2 text-gray-500 font-semibold whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3.5">
                      <div className="flex flex-col">
                        <span className="font-bold text-neutral">{enq.companyName}</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase">{enq.businessType}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-bold text-neutral">{enq.fullName}</span>
                        <span className="text-[10px] text-gray-400 font-semibold">{enq.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex text-[9px] font-bold text-primary bg-primary/5 px-2.5 py-0.5 rounded-full border border-primary/10">
                        {enq.selectedService}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-flex text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                        enq.status === 'New' ? 'text-blue-700 bg-blue-50 border-blue-100' :
                        enq.status === 'In Progress' ? 'text-orange-700 bg-orange-50 border-orange-100' :
                        enq.status === 'Converted' ? 'text-green-700 bg-green-50 border-green-100' :
                        'text-gray-700 bg-gray-50 border-gray-100'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right whitespace-nowrap">
                      <Link 
                        to="/admin/enquiries" 
                        state={{ activeEnquiryId: enq._id }}
                        className="text-[11px] font-bold text-primary hover:text-primary-dark bg-white/60 px-3 py-1 rounded-full border border-white shadow-sm transition-all"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400 text-xs font-bold">
                    No enquiries found. Submit your first quote request to check this layout.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
