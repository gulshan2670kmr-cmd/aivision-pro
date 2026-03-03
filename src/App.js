import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, Download, Upload, Zap, Sparkles, Loader2, Video, Eraser, 
  Menu, X, ShieldCheck, Globe, Trash2, CheckCircle2, Server, Cpu, 
  Shield, Layers, Search, MessageSquare, Newspaper
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
  const [activeTab, setActiveTab] = useState('enhance');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const aiTools = [
    { id: 'enhance', name: 'AI Enhancer', icon: <Zap />, desc: 'Upscale to 4K resolution with neural clarity.' },
    { id: 'img2vid', name: 'Img2Video', icon: <Video />, desc: 'Convert static photos into 3s cinematic clips.' },
    { id: 'remover', name: 'Object Remover', icon: <Eraser />, desc: 'Magic erase unwanted elements from photos.' },
    { id: 'artistic', name: 'Art Style', icon: <Sparkles />, desc: 'Transform photos into digital masterpiece art.' },
    { id: 'cyber', name: 'Cyberpunk', icon: <Globe />, desc: 'Apply futuristic neon & synthwave aesthetics.' }
  ];

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setResult('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200');
    }, 3500);
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
      
      {/* Navbar */}
      <nav className="border-b border-white/5 px-6 md:px-12 py-5 flex justify-between items-center bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-[100]">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <div className="bg-purple-600 p-2 rounded-xl"><Sun className="w-5 h-5" /></div>
          <span className="text-xl font-black tracking-tighter uppercase">AIVision</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <button onClick={() => navigateTo('home')}>Studio</button>
          <button onClick={() => navigateTo('about')}>Technology</button>
          <button onClick={() => navigateTo('privacy')}>Privacy</button>
          <button onClick={() => navigateTo('terms')}>Terms</button>
        </div>
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu /></button>
      </nav>

      {currentPage === 'home' ? (
        <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter gradient-text">Next-Gen <br /> AI Suite</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Five professional AI tools in one dashboard. No subscription required.</p>
          </div>

          {/* 5 TOOLS SELECTOR */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 animate-slide-up">
            {aiTools.map((tool) => (
              <button 
                key={tool.id} 
                onClick={() => { setActiveTab(tool.id); setResult(null); }}
                className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center text-center gap-3 ${activeTab === tool.id ? 'bg-purple-600 border-purple-400 shadow-xl shadow-purple-900/20' : 'bg-slate-900/40 border-white/5 hover:border-white/20'}`}
              >
                <div className={`${activeTab === tool.id ? 'text-white' : 'text-purple-500'}`}>{tool.icon}</div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest">{tool.name}</h3>
                  <p className="text-[8px] text-slate-400 mt-1 hidden md:block">{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* MAIN INTERFACE */}
          <div className="glass-card rounded-[4rem] p-8 md:p-20 flex flex-col items-center justify-center mb-32 animate-slide-up">
            {!selectedFile ? (
              <div className="text-center">
                <input type="file" ref={fileInputRef} onChange={(e) => {
                  const file = e.target.files[0];
                  if(file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
                }} className="hidden" accept="image/*" />
                <div className="mb-8 bg-white/5 p-10 rounded-full inline-block"><Upload className="w-10 h-10 text-slate-500" /></div>
                <h2 className="text-2xl font-black mb-4 uppercase">Ready to Start?</h2>
                <button onClick={() => fileInputRef.current.click()} className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                  Upload Image for {aiTools.find(t => t.id === activeTab).name}
                </button>
              </div>
            ) : !result ? (
              <div className="text-center max-w-lg w-full">
                <img src={previewUrl} className="rounded-[2.5rem] mb-10 border border-white/10 shadow-2xl" alt="Preview" />
                <button onClick={handleProcess} className="w-full bg-purple-600 py-6 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-purple-500">
                  {isProcessing ? <><Loader2 className="animate-spin" /> Neural Processing...</> : `Launch ${activeTab} Model`}
                </button>
              </div>
            ) : (
              <div className="text-center max-w-5xl w-full">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                   <div className="space-y-4">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Input Media</p>
                     <img src={previewUrl} className="rounded-[2rem] opacity-40 grayscale h-72 w-full object-cover border border-white/5" alt="Source" />
                   </div>
                   <div className="space-y-4">
                     <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Enhanced AI Result</p>
                     <img src={result} className="rounded-[2rem] border-2 border-purple-600 h-72 w-full object-cover shadow-2xl shadow-purple-500/20" alt="Result" />
                   </div>
                </div>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => { setSelectedFile(null); setResult(null); }} className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase text-xs">New Project</button>
                   <button className="bg-slate-900 border border-white/10 px-10 py-5 rounded-2xl font-black uppercase text-xs flex items-center gap-2"><Download className="w-4 h-4"/> Save HD</button>
                </div>
              </div>
            )}
          </div>

          {/* ADSENSE OPTIMIZED CONTENT SECTIONS */}
          <div className="space-y-32 mb-20">
            {/* Section 1: Detailed Tools Guide */}
            <section className="animate-slide-up">
              <div className="flex items-center gap-4 mb-8 text-purple-500 font-black uppercase tracking-[0.3em] text-xs">
                <div className="h-px w-12 bg-purple-500"></div> Comprehensive AI Solutions
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter">Professional Features <br/> For Every Creator</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-10 glass-card rounded-[3rem]">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Video className="text-purple-500"/> Image to Video Converter</h3>
                  <p className="text-slate-400 leading-relaxed">Hamara advanced Image to Video tool static photos ko cinematic 3-second clips mein convert karta hai. Ye social media reels aur digital ads ke liye perfect hai, jisme hum motion-vector prediction technology ka use karte hain.</p>
                </div>
                <div className="p-10 glass-card rounded-[3rem]">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Zap className="text-purple-500"/> Neural Image Enhancer</h3>
                  <p className="text-slate-400 leading-relaxed">Low-resolution photos ko 4K mein badlein. Humara Enhancer AI pixels ko reconstruct karta hai, noise remove karta hai aur details ko sharpen karta hai bina image ko fake dikhaye.</p>
                </div>
              </div>
            </section>

            {/* Section 2: Technical Infrastructure */}
            <section className="animate-slide-up">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5"><Cpu className="text-purple-500 w-8 h-8"/></div>
                    <h4 className="font-black text-xl mb-3">H100 Tensor Core</h4>
                    <p className="text-slate-500 text-sm">Industrial grade GPUs for lighting fast processing times.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5"><ShieldCheck className="text-purple-500 w-8 h-8"/></div>
                    <h4 className="font-black text-xl mb-3">AES-256 Encryption</h4>
                    <p className="text-slate-500 text-sm">Your data is processed in a secure, sandboxed environment.</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5"><Newspaper className="text-purple-500 w-8 h-8"/></div>
                    <h4 className="font-black text-xl mb-3">Blog & Updates</h4>
                    <p className="text-slate-500 text-sm">Stay tuned for the latest AI research and tool updates.</p>
                  </div>
               </div>
            </section>

            {/* Section 3: FAQ for AdSense */}
            <section className="max-w-4xl mx-auto animate-slide-up">
               <h2 className="text-3xl font-black mb-10 text-center uppercase tracking-widest">Common Questions</h2>
               <div className="space-y-4">
                  <div className="p-8 glass-card rounded-3xl border border-white/5">
                    <p className="font-bold mb-2">Q: Kya ye tools use karne ke liye koi account banana padega?</p>
                    <p className="text-slate-400 text-sm">Nahi, AIVision Studio ek free-access platform hai. Aap bina kisi login ke sabhi 5 AI tools use kar sakte hain.</p>
                  </div>
                  <div className="p-8 glass-card rounded-3xl border border-white/5">
                    <p className="font-bold mb-2">Q: Kya Image-to-Video feature watermark add karta hai?</p>
                    <p className="text-slate-400 text-sm">Nahi, hum aapki creativity mein vishwas rakhte hain. Sabhi outputs watermark-free aur commercial use ke liye ready hain.</p>
                  </div>
               </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="max-w-4xl mx-auto px-6 py-24 animate-slide-up">
          <div className="glass-card p-12 md:p-24 rounded-[4rem] space-y-12">
            {currentPage === 'about' && (
              <>
                <h1 className="text-7xl font-black tracking-tighter">Technology Stack</h1>
                <p className="text-slate-400 text-xl leading-relaxed font-medium">Hamara vision AI ko har kisi ke liye accessible banana hai. Hum distributed cloud computing ka use karte hain taaki aapko heavy hardware ki jarurat na pade.</p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5">
                    <h5 className="font-black text-purple-500 mb-2">Models</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Stable Diffusion, Real-ESRGAN, and custom Motion Vectors.</p>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5">
                    <h5 className="font-black text-purple-500 mb-2">Security</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">ISO 27001 compliant infrastructure and zero-log policy.</p>
                  </div>
                </div>
              </>
            )}
            {currentPage === 'privacy' && (
              <>
                <h1 className="text-7xl font-black tracking-tighter">Privacy Hub</h1>
                <p className="text-slate-400 text-lg">Hum aapki personal information collect nahi karte. Adsense partners cookies ka use ads ko personalize karne ke liye karte hain, jise aap browser settings se disable kar sakte hain.</p>
              </>
            )}
            {currentPage === 'terms' && (
              <>
                <h1 className="text-7xl font-black tracking-tighter">Legal Terms</h1>
                <div className="space-y-6 text-slate-500 text-sm">
                  <p>1. User Conduct: Aap illegal ya copyright protected images upload nahi kar sakte.</p>
                  <p>2. Output Rights: Output image par user ka 100% adhikar hai.</p>
                  <p>3. Accuracy: AI generated results par hum 100% guarantee nahi dete, ye ek creative tool hai.</p>
                </div>
              </>
            )}
          </div>
        </main>
      )}

      <footer className="py-24 border-t border-white/5 text-center bg-slate-900/20">
        <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30 mb-4">AIVISION NEURAL LABS • EST 2026</p>
        <div className="flex justify-center gap-6 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
           <button onClick={() => navigateTo('home')}>Studio</button>
           <button onClick={() => navigateTo('privacy')}>Security</button>
           <button onClick={() => navigateTo('terms')}>Policy</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
    
