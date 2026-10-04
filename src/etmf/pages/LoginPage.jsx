import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCheck, AlertCircle, ShieldCheck, KeyRound } from 'lucide-react';
import logoImg from '../assets/vigithink_logo.png';

export default function LoginPage() {
  const { loginWithCredentials } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!userName) {
      setError("Please enter your Login ID or Email.");
      return;
    }

    setIsLoggingIn(true);
    setError("");
    const result = await loginWithCredentials(userName, password);
    setIsLoggingIn(false);

    if (result && result.success) {
      navigate('/');
    } else {
      setError(result?.error || "Invalid Login ID or Password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4 font-sans select-none">
      {/* Main Centered Clean Login Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-200/80 space-y-6">
        <div className="text-center space-y-2 border-b border-slate-100 pb-5">
          <div className="flex justify-center mb-2">
            <img src={logoImg} alt="VigiThink Logo" className="h-9 w-auto object-contain" />
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Clinidea Education — VigiThink eTMF</h1>
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            21 CFR Part 11 & ICH-GCP Validated Portal
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 text-xs">Login ID / Email</label>
            <input
              type="text"
              placeholder="Login ID or email" autoComplete="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError("");
              }}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none text-xs transition-all"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 text-xs">Password</label>
            <input
              type="password"
              placeholder="Enter your password" autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none text-xs transition-all"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center gap-2 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer text-xs disabled:opacity-50"
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <a href="/" className="block text-center text-xs text-slate-500 hover:text-blue-700 transition-colors">&larr; Back to VigiThink website</a>
      </div>
    </div>
  );
}
