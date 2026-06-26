import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { api } from '../../services/api';
import { ShieldCheck, RefreshCw, KeyRound, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect directly to dashboard
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await api.login(email, password);
      localStorage.setItem('admin_token', response.token);
      localStorage.setItem('admin_email', response.email);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Login failed. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] flex items-center justify-center p-4 font-montserrat relative overflow-hidden">
      {/* Background decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[100px] pointer-events-none float-medium" />

      <SEO title="Admin Login" />

      {/* Main card box */}
      <div className="glass-panel rounded-[2rem] w-full max-w-md overflow-hidden border border-white/50 bg-white/40 shadow-2xl flex flex-col relative z-10 p-2">
        <form onSubmit={handleLoginSubmit} className="p-8 flex flex-col gap-6 text-left">
          {/* Header branding */}
          <div className="flex flex-col items-center gap-3 text-center border-b border-white/60 pb-6">
            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary border border-primary/10 shadow-sm animate-pulse">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-xl font-bold text-neutral">Nitru Administration</h2>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">Log in to manage enquiries, services, settings, and testimonials.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-xl border border-red-200 font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral">Admin Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nitruconnect.com"
                className="w-full border border-white/80 rounded-xl pl-10 pr-4 py-3.5 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
              />
              <Mail className="absolute left-3.5 top-4 text-primary/70" size={15} />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border border-white/80 rounded-xl pl-10 pr-4 py-3.5 text-xs bg-white/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
              />
              <KeyRound className="absolute left-3.5 top-4 text-primary/70" size={15} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 disabled:bg-gray-300 disabled:pointer-events-none mt-2 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin" size={18} />
                Authenticating...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
