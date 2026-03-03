import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, Download, Upload, Zap, Sparkles, Loader2, Image as ImageIcon, 
  Menu, X, Info, ShieldCheck, Globe, Trash2, RefreshCw,
  CheckCircle2, Server, Cpu, Shield, HelpCircle, Layers, Scale
} from 'lucide-react';

const customStyles = `
  @keyframes slideUpFade { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes progressBar { 0% { width: 0%; } 100% { width: 100%; } }
  .animate-slide-up { animation: slideUpFade 0.7s ease-out forwards; opacity: 0; }
  .glass-card { background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
  .gradient-text { background: linear-gradient(to right, #ffffff, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
`;

function App() {
  const [showSplash, setShowSplash] = useState(true);
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

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white font-sans">
        <style>{customStyles}</style>
        <div className="bg-purple-600 p-8 rounded-[2.5rem] animate-pulse"><Sun className="w-12 h-12 text-white" /></div>
        <h1 className="text-3xl font-black tracking-tighter mt-8">AIVISION STUDIO</h1>
        <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden mt-6">
          <div className="h-full bg-purple-500" style={{ animation: 'progressBar 2.4s linear forwards' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
      <style>{customStyles}</style>
      
      {/* Navigation */}
      <nav className="border-b border-white/5 px-6 md:px-12 py-5 flex justify-between items-center bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-[100]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="bg-purple-600 p-2 rounded-xl"><Sun className="w-5 h-5" /></div>
          <span className="text-xl font-black tracking-tighter uppercase">AIVision</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <button onClick={() => navigateTo('home')}>Studio</button>
          <button onClick={() => navigateTo('about')}>Tech</button>
          <button onClick={() => navigateTo('privacy')}>Privacy</button>
          <button onClick={() => navigateTo('terms')}>Terms</button>
          <button className="bg-white text-black px-5 py-2 rounded-xl font-black">Join Beta</button>
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-[#020617] z-[99] flex flex-col p-8 space-y-6">
          <button onClick={() => navigateTo('home')} className="text-3xl font-black text-left">STUDIO</button>
          <button onClick={() => navigateTo('about')} className="text-3xl font-black text-left">TECH</button>
          <button onClick={() => navigateTo('privacy')} className="text-3xl font-black text-left">PRIVACY</button>
          <button onClick={() => navigateTo('terms')} className="text-3xl font-black text-left">TERMS</button>
        </div>
      )}

      {currentPage === 'home' ? (
        <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="text-center mb-20 animate-slide-up">
            <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter gradient-text">Neural <br /> Synthesis</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">High-performance image processing for the modern web.</p>
          </div>

          {/* Interface Card */}
          <div className="glass-card rounded-[3.5rem] p-8 md:p-16 flex flex-col items-center justify-center mb-24 animate-slide-up">
            {!selectedFile ? (
              <div className="text-center">
                <input type="file" ref={fileInputRef} onChange={(e) => {
                  const file = e.target.files[0];
                  if(file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
                }} className="hidden" accept="image/*" />
                <button onClick={() => fileInputRef.current.click()} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Upload Media</button>
              </div>
            ) : !result ? (
              <div className="text-center max-w-lg">
                <img src={previewUrl} className="rounded-3xl mb-8 border border-white/10" alt="Preview" />
                <button onClick={() => { setIsProcessing(true); setTimeout(() => { setIsProcessing(false); setResult('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200'); }, 2000); }} 
                className="w-full bg-purple-600 py-6 rounded-2xl font-black flex items-center justify-center gap-3">
                  {isProcessing ? <><Loader2 className="animate-spin" /> Processing...</> : 'Run AI Engine'}
                </button>
              </div>
            ) : (
              <div className="text-center max-w-4xl">
                <img src={result} className="rounded-3xl mb-8 border-2 border-purple-500 shadow-2xl shadow-purple-500/20" alt="Result" />
                <button onClick={() => { setSelectedFile(null); setResult(null); }} className="bg-white text-black px-12 py-5 rounded-2xl font-black">Reset Canvas</button>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: <Zap />, title: "Real-time Edge", desc: "Proprietary algorithms deliver results in under 3 seconds." },
              { icon: <Shield />, title: "Secure Sessions", desc: "No permanent storage. Your files are yours alone." },
              { icon: <Globe />, title: "Global Access", desc: "Available 24/7 across all continents via edge delivery." }
            ].map((f, i) => (
              <div key={i} className="p-10 glass-card rounded-[3rem] border border-white/5">
                <div className="text-purple-500 mb-6">{f.icon}</div>
                <h4 className="text-xl font-black mb-4">{f.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-6 py-24 animate-slide-up">
          <div className="glass-card p-10 md:p-20 rounded-[4rem] space-y-10">
            {currentPage === 'about' && (
              <>
                <h1 className="text-6xl font-black tracking-tighter">Our Technology</h1>
                <p className="text-slate-400 text-lg leading-relaxed">AIVision Studio utilizes advanced neural networks to perform pixel-level synthesis. We focus on low-latency, high-fidelity transformations for professional creators.</p>
              </>
            )}
            {currentPage === 'privacy' && (
              <>
                <h1 className="text-6xl font-black tracking-tighter">Privacy First</h1>
                <p className="text-slate-400 text-lg">We strictly follow a zero-persistence policy. Your media is processed in volatile memory and purged instantly after your session ends. We are GDPR and CCPA compliant.</p>
              </>
            )}
            {currentPage === 'terms' && (
              <>
                <h1 className="text-6xl font-black tracking-tighter">Terms of Service</h1>
                <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
                  <p>Welcome to AIVision Studio. By using our tools, you agree to the following terms:</p>
                  <h4 className="text-white font-bold">1. Usage License</h4>
                  <p>You retain all ownership of the images you upload. We grant you a non-exclusive license to use the output for personal and commercial projects without attribution.</p>
                  <h4 className="text-white font-bold">2. Prohibited Content</h4>
                  <p>Users are prohibited from uploading illegal, harmful, or sexually explicit material. Our systems automatically flag and reject such content.</p>
                  <h4 className="text-white font-bold">3. Disclaimer</h4>
                  <p>The AI tools are provided "as-is" without warranty. We are not responsible for any specific outcome or data loss due to browser issues.</p>
                </div>
              </>
            )}
          </div>
        </main>
      )}

      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">© 2026 AIVISION NEURAL LABS • ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}

export default App;
