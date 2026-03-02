import React, { useState, useRef, useEffect } from 'react';
import { Video, Scissors, Sun, Download, Upload, Zap, Sparkles, Loader2, Image as ImageIcon, ArrowRight, Menu, X, FileText, Info, HelpCircle, ShieldCheck, Globe } from 'lucide-react';

const customStyles = `
  @keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes progressBar {
    0% { width: 0%; }
    50% { width: 70%; }
    100% { width: 100%; }
  }
  .animate-slide-up {
    animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
`;

const AdSlot = ({ position }) => (
  <div className="w-full max-w-5xl mx-auto my-12 p-4 bg-slate-900/40 border border-slate-800 border-dashed rounded-2xl flex flex-col items-center justify-center min-h-[150px] text-slate-600 transition-all hover:bg-slate-900/60">
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-50">Advertisement</span>
    <p className="text-xs italic">Google AdSense - {position}</p>
  </div>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('video');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const tools = [
    { id: 'video', name: 'Image to Video', icon: <Video className="w-5 h-5" />, desc: 'Transform static images into cinematic motion clips.' },
    { id: 'upscale', name: '4K Upscaler', icon: <Zap className="w-5 h-5" />, desc: 'Enhance low-res photos to ultra HD 4K resolution.' },
    { id: 'bg', name: 'BG Remover', icon: <Scissors className="w-5 h-5" />, desc: 'Remove backgrounds instantly with pixel perfection.' },
    { id: 'portrait', name: 'AI Portrait', icon: <Sparkles className="w-5 h-5" />, desc: 'Generate professional headshots using neural filters.' }
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const mockResults = {
        video: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
        upscale: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800',
        bg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
        portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800'
      };
      setResult(mockResults[activeTab]);
    }, 3000);
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans overflow-hidden">
        <style>{customStyles}</style>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/10">
          <Sun className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter mt-8">AIVISION STUDIO</h1>
        <div className="w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden mt-6 border border-white/5">
          <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ animation: 'progressBar 2s forwards' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30">
      <style>{customStyles}</style>
      <nav className="border-b border-white/5 px-8 py-5 flex justify-between items-center bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="bg-purple-600 p-2 rounded-xl"><Sun className="w-5 h-5" /></div>
          <span className="text-xl font-black tracking-tight">AIVISION</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold text-slate-400 uppercase tracking-widest">
          <button onClick={() => setCurrentPage('home')}>Tools</button>
          <button onClick={() => setCurrentPage('about')}>About</button>
          <button onClick={() => setCurrentPage('privacy')}>Privacy</button>
          <button className="bg-white text-black px-7 py-3 rounded-2xl font-bold">Get Started</button>
        </div>
      </nav>

      {currentPage === 'home' ? (
        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9]">Creative <span className="text-purple-500">Intelligence</span></h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Free, fast, and remarkably powerful tools for modern creators.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-12 animate-slide-up delay-100">
            {tools.map((t) => (
              <button key={t.id} onClick={() => {setActiveTab(t.id); setResult(null);}} className={`p-8 rounded-[2rem] border text-left transition-all ${activeTab === t.id ? 'bg-slate-900 border-purple-500' : 'bg-slate-900/30 border-white/5'}`}>
                <div className={`mb-4 p-3 w-fit rounded-xl ${activeTab === t.id ? 'bg-purple-600' : 'bg-slate-800'}`}>{t.icon}</div>
                <h3 className="font-bold mb-1">{t.name}</h3>
                <p className="text-[10px] text-slate-500 uppercase font-bold">{t.desc}</p>
              </button>
            ))}
          </div>
          <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-12 min-h-[400px] flex items-center justify-center animate-slide-up delay-200">
            {!selectedFile ? (
              <div className="text-center">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                <button onClick={() => fileInputRef.current.click()} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase">Browse Media</button>
              </div>
            ) : !result ? (
              <div className="text-center w-full max-w-md">
                <img src={previewUrl} className="rounded-3xl mb-8 border border-white/10" alt="Preview" />
                <button onClick={handleProcess} disabled={isProcessing} className="bg-purple-600 px-10 py-4 rounded-2xl font-black w-full">{isProcessing ? 'PROCESSING...' : 'RUN AI'}</button>
              </div>
            ) : (
              <div className="text-center w-full max-w-md">
                <img src={result} className="rounded-3xl mb-8 border-2 border-purple-500 shadow-2xl" alt="Result" />
                <button onClick={() => setResult(null)} className="text-slate-500 font-bold uppercase text-xs mb-4 block mx-auto tracking-widest">Clear</button>
                <button onClick={() => window.open(result)} className="bg-white text-black px-10 py-4 rounded-2xl font-black w-full">DOWNLOAD RESULT</button>
              </div>
            )}
          </div>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-6 py-24 animate-slide-up">
          <div className="bg-slate-900/40 p-12 rounded-[3rem] border border-white/5">
            {currentPage === 'about' ? (
              <>
                <Info className="w-12 h-12 text-purple-500 mb-8" />
                <h1 className="text-5xl font-black mb-8">About AIVision</h1>
                <p className="text-slate-400 text-lg leading-relaxed">AIVision Studio democratizes advanced media editing. We believe professional AI tools should be free and accessible to everyone, from designers to hobbyists.</p>
              </>
            ) : (
              <>
                <ShieldCheck className="w-12 h-12 text-purple-500 mb-8" />
                <h1 className="text-5xl font-black mb-8">Privacy Policy</h1>
                <div className="text-slate-400 space-y-6">
                  <p>Your privacy is our priority. We operate a "Zero-Persistence" data policy.</p>
                  <h3 className="text-white font-bold text-xl mt-8">Media Handling</h3>
                  <p>All uploaded files are encrypted and held in temporary memory only. Once processing is complete, files are automatically purged from our servers within 60 minutes.</p>
                  <h3 className="text-white font-bold text-xl mt-8">Google AdSense</h3>
                  <p>We use Google AdSense to serve ads. Google may use cookies to serve ads based on your visits to this and other sites. You can opt-out via Google's Ad settings.</p>
                </div>
              </>
            )}
          </div>
        </main>
      )}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.3em]">© 2026 AIVISION NEURAL LABS</p>
      </footer>
    </div>
  );
};

export default App;
