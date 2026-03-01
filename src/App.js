import React, { useState } from 'react';
import { Video, Scissors, Sun, Download, Upload, Zap, Sparkles, X } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('video');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setResult('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800');
    }, 2500);
  };

  const Modal = ({ title, content }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
        <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X /></button>
        <h2 className="text-2xl font-bold mb-4 text-purple-400">{title}</h2>
        <div className="text-slate-300 space-y-4 text-sm leading-relaxed whitespace-pre-line">{content}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {modalContent && <Modal title={modalContent.title} content={modalContent.content} />}
      
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg"><Sun className="w-5 h-5" /></div>
          <span className="text-xl font-bold tracking-tighter uppercase">AIVision</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent italic">AI MEDIA SUITE</h1>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {['video', 'upscale', 'bg', 'portrait'].map((t) => (
            <button key={t} onClick={() => {setActiveTab(t); setResult(null);}} className={`p-6 rounded-[2rem] border transition-all ${activeTab === t ? 'bg-purple-600/20 border-purple-500' : 'bg-slate-900 border-white/5'}`}>
              <p className="font-black text-xs uppercase tracking-[0.2em]">{t}</p>
            </button>
          ))}
        </div>

        {/* Processing Area */}
        <div className="bg-slate-900/50 border-2 border-dashed border-white/10 rounded-[3rem] p-12 mb-16">
          {!result ? (
            <button onClick={handleProcess} disabled={isProcessing} className="bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:bg-purple-500 hover:text-white transition-all">
              {isProcessing ? 'PROCESSING...' : 'UPLOAD & CONVERT'}
            </button>
          ) : (
            <div className="space-y-6">
              <img src={result} alt="AI Result" className="max-w-sm mx-auto rounded-2xl shadow-2xl border border-white/10" />
              <button onClick={() => setResult(null)} className="text-slate-500 font-bold uppercase text-xs tracking-widest">Clear Result</button>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER WITH POLICY LINKS */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-xs font-bold tracking-widest uppercase">© 2026 AIVISION NEURAL LABS</div>
          <div className="flex gap-6 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
            <button onClick={() => setModalContent({title: 'Privacy Policy', content: 'We do not store your uploaded images. All processing is done via neural temporary buffers and deleted instantly after session end.'})} className="hover:text-purple-400">Privacy</button>
            <button onClick={() => setModalContent({title: 'Terms', content: 'This tool is for personal use. Commercial redistribution of AI generated content via this suite requires a Pro license.'})} className="hover:text-purple-400">Terms</button>
            <button onClick={() => setModalContent({title: 'Contact', content: 'Support: support@aivision.tools\nResponse time: 24-48 hours.'})} className="hover:text-purple-400">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
