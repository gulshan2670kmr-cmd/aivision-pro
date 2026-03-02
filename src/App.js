import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, Download, Upload, Zap, Sparkles, Loader2, Image as ImageIcon, 
  Menu, X, Info, ShieldCheck, Globe, Trash2, RefreshCw,
  CheckCircle2, Server, Cpu, Shield
} from 'lucide-react';

const customStyles = `
  @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes progressBar { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }
  @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.2); } 50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.5); } }
  .animate-slide-up { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-pulse-glow { animation: pulseGlow 3s infinite ease-in-out; }
  .glass-card { background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
  .gradient-text { background: linear-gradient(to right, #ffffff, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
`;

const AdSlot = ({ position }) => (
  <div className="w-full max-w-5xl mx-auto my-12 p-8 glass-card border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center min-h-[150px] text-slate-600 transition-all hover:bg-slate-900/60 group">
    <p className="text-xs italic font-medium opacity-50">Ad Slot - {position}</p>
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('artistic');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const tools = [
    { id: 'artistic', name: 'Artistic Reimagining', icon: <Sparkles className="w-5 h-5" />, desc: 'Neural style transfer for digital art.' },
    { id: 'enhance', name: 'Detail Enhancer', icon: <Zap className="w-5 h-5" />, desc: 'Generative upscaling and clarity.' },
    { id: 'portrait', name: 'Professional Headshot', icon: <Sun className="w-5 h-5" />, desc: 'AI-driven studio lighting optimization.' },
    { id: 'cyberpunk', name: 'Cyberpunk Vision', icon: <Globe className="w-5 h-5" />, desc: 'Future-noir aesthetic synthesis.' }
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const processAIImage = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setResult('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80');
    }, 3000);
  };

  const reset = () => { setSelectedFile(null); setPreviewUrl(null); setResult(null); };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white font-sans">
        <style>{customStyles}</style>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-10 rounded-[3rem] animate-pulse-glow">
          <Sun className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter mt-10 gradient-text">AIVISION STUDIO</h1>
        <div className="w-64 h-1.5 bg-slate-900 rounded-full overflow-hidden mt-10">
          <div className="h-full bg-purple-500" style={{ animation: 'progressBar 2.4s linear forwards' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden">
      <style>{customStyles}</style>
      <nav className="border-b border-white/5 px-6 md:px-12 py-5 flex justify-between items-center bg-[#020617]/80 backdrop-blur-2xl sticky top-0 z-[100]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="bg-purple-600 p-2 rounded-xl"><Sun className="w-5 h-5" /></div>
          <span className="text-xl font-black tracking-tighter">AIVision</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <button onClick={() => navigateTo('home')}>Studio</button>
          <button onClick={() => navigateTo('about')}>About Tech</button>
          <button onClick={() => navigateTo('privacy')}>Privacy Policy</button>
          <button className="bg-white text-black px-6 py-2.5 rounded-xl font-black">Free Trial</button>
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-[#020617] z-[99] flex flex-col p-8 space-y-8 animate-slide-up">
          <button onClick={() => navigateTo('home')} className="text-4xl font-black text-left">STUDIO</button>
          <button onClick={() => navigateTo('about')} className="text-4xl font-black text-left">OUR TECH</button>
          <button onClick={() => navigateTo('privacy')} className="text-4xl font-black text-left">SECURITY</button>
        </div>
      )}

      {currentPage === 'home' ? (
        <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="text-center mb-20 animate-slide-up">
            <h1 className="text-6xl md:text-[8rem] font-black mb-10 leading-[0.8] tracking-tighter">Creative <br /> <span className="text-purple-500">Neural Lab</span></h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">Professional-grade image processing powered by neural architecture.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 animate-slide-up">
            {tools.map((t) => (
              <div key={t.id} onClick={() => {setActiveTab(t.id); setResult(null);}} className={`p-8 rounded-[2.5rem] border cursor-pointer transition-all ${activeTab === t.id ? 'bg-slate-900 border-purple-500' : 'bg-slate-900/20 border-white/5'}`}>
                <div className={`mb-6 p-4 w-fit rounded-2xl ${activeTab === t.id ? 'bg-purple-600' : 'bg-slate-800'}`}>{t.icon}</div>
                <h3 className="font-bold text-lg mb-2">{t.name}</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-[3.5rem] p-6 md:p-16 min-h-[500px] flex flex-col items-center justify-center animate-slide-up">
            {!selectedFile ? (
              <div className="text-center">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" />
                <button onClick={() => fileInputRef.current.click()} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Upload Source Image</button>
              </div>
            ) : !result ? (
              <div className="w-full max-w-xl text-center">
                <img src={previewUrl} className="rounded-3xl mb-10 border border-white/10 mx-auto max-h-[400px]" alt="Source" />
                <button onClick={processAIImage} disabled={isProcessing} className="w-full bg-purple-600 py-6 rounded-2xl font-black uppercase tracking-widest">
                  {isProcessing ? 'Working...' : 'Process with AI'}
                </button>
              </div>
            ) : (
              <div className="w-full max-w-5xl text-center">
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <img src={previewUrl} className="rounded-3xl h-[300px] object-cover opacity-30" alt="Input" />
                  <img src={result} className="rounded-3xl h-[300px] object-cover border-2 border-purple-500 shadow-2xl" alt="Output" />
                </div>
                <button onClick={reset} className="bg-white text-black px-12 py-5 rounded-2xl font-black">Start Over</button>
              </div>
            )}
          </div>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-slide-up">
          <div className="glass-card p-10 md:p-20 rounded-[4rem]">
            <h1 className="text-5xl font-black mb-10 tracking-tighter">{currentPage === 'about' ? 'About Tech' : 'Privacy Policy'}</h1>
            <p className="text-slate-400 text-lg leading-relaxed">Your privacy is our core value. We use zero-persistence processing to ensure your data stays yours.</p>
          </div>
        </main>
      )}
      <footer className="py-20 text-center border-t border-white/5 opacity-50">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">© 2026 AIVISION STUDIO</p>
      </footer>
    </div>
  );
}

export default App;
