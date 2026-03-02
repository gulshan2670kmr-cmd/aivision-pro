Import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, Download, Upload, Zap, Sparkles, Loader2, Image as ImageIcon, 
  Menu, X, Info, ShieldCheck, Globe, Trash2, RefreshCw,
  CheckCircle2, Server, Cpu, Shield, ArrowRight, MousePointer2
} from 'lucide-react';

/**
 * AIVision Studio - Optimized for App.js
 * Make sure to run: npm install lucide-react
 */

const customStyles = `
  @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes progressBar { 0% { width: 0%; } 50% { width: 70%; } 100% { width: 100%; } }
  @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.2); } 50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.5); } }
  .animate-slide-up { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
  .animate-pulse-glow { animation: pulseGlow 3s infinite ease-in-out; }
  .glass-card { background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
  .gradient-text { background: linear-gradient(to right, #ffffff, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nav-blur { background: rgba(2, 6, 23, 0.8); backdrop-filter: blur(20px); }
  .mobile-menu-enter { animation: slideUpFade 0.3s ease-out forwards; }
`;

const AdSlot = ({ position }) => (
  <div className="w-full max-w-5xl mx-auto my-12 p-8 glass-card border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center min-h-[150px] text-slate-600 transition-all hover:bg-slate-900/60 group">
    <div className="flex items-center gap-2 mb-3 opacity-40 group-hover:opacity-100 transition-opacity">
      <div className="h-[1px] w-12 bg-slate-700"></div>
      <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Sponsor Hub</span>
      <div className="h-[1px] w-12 bg-slate-700"></div>
    </div>
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
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white font-sans overflow-hidden">
        <style>{customStyles}</style>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-10 rounded-[3rem] shadow-2xl animate-pulse-glow">
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
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500/30">
      <style>{customStyles}</style>
      
      {/* HEADER / NAVIGATION */}
      <nav className="border-b border-white/5 px-6 md:px-12 py-5 flex justify-between items-center nav-blur sticky top-0 z-[100]">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
          <div className="bg-purple-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Sun className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">AIVision</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <button onClick={() => navigateTo('home')} className={currentPage === 'home' ? 'text-white' : 'hover:text-white transition-colors'}>Studio</button>
          <button onClick={() => navigateTo('about')} className={currentPage === 'about' ? 'text-white' : 'hover:text-white transition-colors'}>About Tech</button>
          <button onClick={() => navigateTo('privacy')} className={currentPage === 'privacy' ? 'text-white' : 'hover:text-white transition-colors'}>Privacy Policy</button>
          <button className="bg-white text-black px-6 py-2.5 rounded-xl font-black hover:bg-purple-500 hover:text-white transition-all">Free Trial</button>
        </div>

        {/* Fixed Mobile Menu Trigger */}
        <button 
          className="md:hidden p-2 bg-slate-900 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-[#020617] z-[99] flex flex-col p-8 space-y-8 mobile-menu-enter">
          <button onClick={() => navigateTo('home')} className="text-4xl font-black text-left border-b border-white/5 pb-4">STUDIO</button>
          <button onClick={() => navigateTo('about')} className="text-4xl font-black text-left border-b border-white/5 pb-4">OUR TECH</button>
          <button onClick={() => navigateTo('privacy')} className="text-4xl font-black text-left border-b border-white/5 pb-4">SECURITY</button>
          <button className="w-full bg-purple-600 py-6 rounded-2xl font-black text-xl mt-4 tracking-widest">JOIN THE BETA</button>
        </div>
      )}

      {currentPage === 'home' ? (
        <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          {/* HERO */}
          <div className="text-center mb-20 animate-slide-up">
            <h1 className="text-6xl md:text-[8rem] font-black mb-10 leading-[0.8] tracking-tighter">
              Creative <br /> <span className="text-purple-500 text-6xl md:text-[9rem]">Neural Lab</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Professional-grade image processing. Fast, private, and powered by advanced neural architecture.
            </p>
          </div>

          <AdSlot position="Home Top" />

          {/* TOOLS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 animate-slide-up delay-100">
            {tools.map((t) => (
              <div 
                key={t.id} 
                onClick={() => {setActiveTab(t.id); setResult(null);}} 
                className={`p-8 rounded-[2.5rem] border cursor-pointer transition-all duration-300 ${activeTab === t.id ? 'bg-slate-900 border-purple-500' : 'bg-slate-900/20 border-white/5 hover:bg-slate-900/40'}`}
              >
                <div className={`mb-6 p-4 w-fit rounded-2xl ${activeTab === t.id ? 'bg-purple-600' : 'bg-slate-800'}`}>{t.icon}</div>
                <h3 className="font-bold text-lg mb-2">{t.name}</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* INTERFACE AREA */}
          <div className="glass-card rounded-[3.5rem] p-6 md:p-16 min-h-[500px] flex flex-col items-center justify-center animate-slide-up delay-200">
            {!selectedFile ? (
              <div className="text-center">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" />
                <button 
                  onClick={() => fileInputRef.current.click()} 
                  className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all"
                >
                  Upload Source Image
                </button>
                <p className="text-slate-600 text-[10px] font-bold mt-6 uppercase tracking-widest">Max file size: 10MB</p>
              </div>
            ) : !result ? (
              <div className="w-full max-w-xl text-center">
                <img src={previewUrl} className="rounded-3xl mb-10 border border-white/10 mx-auto max-h-[400px]" alt="Source" />
                <div className="flex gap-4">
                  <button onClick={processAIImage} disabled={isProcessing} className="flex-1 bg-purple-600 py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                    {isProcessing ? <><Loader2 className="animate-spin" /> Working...</> : 'Process with AI'}
                  </button>
                  <button onClick={reset} className="bg-slate-900 px-6 rounded-2xl border border-white/10"><Trash2 className="w-5 h-5 text-red-500" /></button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Original</span>
                    <img src={previewUrl} className="rounded-3xl w-full h-[300px] object-cover opacity-30 grayscale" alt="Input" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Enhanced Result</span>
                    <img src={result} className="rounded-3xl w-full h-[300px] object-cover border-2 border-purple-500 shadow-2xl" alt="Output" />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button onClick={() => window.open(result, '_blank')} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Save Masterpiece</button>
                  <button onClick={reset} className="border border-white/10 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">Start Over</button>
                </div>
              </div>
            )}
          </div>

          {/* SPECS */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up delay-300">
            <div className="p-10 glass-card rounded-[3rem] border border-white/5 hover:border-purple-500/20 transition-all">
              <Cpu className="w-10 h-10 text-purple-500 mb-6" />
              <h4 className="font-bold text-2xl mb-4">Neural Engine</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Powered by proprietary transformer models optimized for visual clarity and lighting reconstruction.</p>
            </div>
            <div className="p-10 glass-card rounded-[3rem] border border-white/5 hover:border-purple-500/20 transition-all">
              <Server className="w-10 h-10 text-purple-500 mb-6" />
              <h4 className="font-bold text-2xl mb-4">Cloud Clusters</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Sub-5 second processing times using our distributed high-performance GPU infrastructure across the globe.</p>
            </div>
            <div className="p-10 glass-card rounded-[3rem] border border-white/5 hover:border-purple-500/20 transition-all">
              <Shield className="w-10 h-10 text-purple-500 mb-6" />
              <h4 className="font-bold text-2xl mb-4">Zero Persistence</h4>
              <p className="text-slate-400 text-sm leading-relaxed">We never store your images. All processing is done in volatile memory and purged immediately after download.</p>
            </div>
          </div>

          <AdSlot position="Home Bottom" />
        </main>
      ) : currentPage === 'about' ? (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-slide-up">
          <div className="glass-card p-10 md:p-20 rounded-[4rem]">
            <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">About Our <br/><span className="text-purple-500">Technology</span></h1>
            <div className="space-y-8 text-slate-400 leading-relaxed text-lg">
              <p>AIVision Studio is a creative-first platform dedicated to making high-end image synthesis accessible. We use a combination of diffusion-based models and semantic lighting analysis to reimagined your photos.</p>
              <h3 className="text-white text-2xl font-black mt-10">Why AIVision?</h3>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start"><CheckCircle2 className="text-purple-500 shrink-0 mt-1"/> Professional grade outputs suitable for digital marketing.</li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="text-purple-500 shrink-0 mt-1"/> Zero-subscription model for individual creators.</li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="text-purple-500 shrink-0 mt-1"/> Ethically trained models using licensed data sets.</li>
              </ul>
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-6 py-20 animate-slide-up">
          <div className="glass-card p-10 md:p-20 rounded-[4rem]">
            <h1 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter">Privacy & <br/><span className="text-purple-500">Security</span></h1>
            <div className="space-y-8 text-slate-400 text-lg">
              <p>Your privacy is the core of AIVision. We have built our architecture to ensure that your media never stays on our servers.</p>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck className="text-green-500"/> GDPR & CCPA Ready</h4>
                <p className="text-sm">We fully respect global data protection laws. Our ad partners only use anonymized browser signals for targeting, never your personal content.</p>
              </div>
              <p>For support or data inquiries, please reach out via our official Beta Access channel.</p>
            </div>
            <AdSlot position="Privacy Support" />
          </div>
        </main>
      )}

      <footer className="py-20 text-center border-t border-white/5 opacity-50">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">
          © 2026 AIVISION STUDIO • NEURAL CORE V2.5
        </p>
      </footer>
    </div>
  );
}

export default App;