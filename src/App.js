import React, { useState } from 'react';
import { Video, Scissors, Sun, Download, Upload, Zap, Sparkles } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('video');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const tools = [
    { id: 'video', name: 'Image to Video', icon: <Video className="w-5 h-5" /> },
    { id: 'upscale', name: '4K Upscaler', icon: <Zap className="w-5 h-5" /> },
    { id: 'bg', name: 'BG Remover', icon: <Scissors className="w-5 h-5" /> },
    { id: 'portrait', name: 'AI Portrait', icon: <Sparkles className="w-5 h-5" /> }
  ];

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setResult('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800');
    }, 2500);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = result;
    link.download = `AIVision_Result.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <nav className="border-b border-white/10 px-6 py-4 flex justify-between items-center bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg"><Sun className="w-5 h-5" /></div>
          <span className="text-xl font-bold tracking-tighter">AIVISION</span>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-all">Sign In</button>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">AI Media Studio</h1>
        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">Neural tools for image and video enhancement.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {tools.map((t) => (
            <button key={t.id} onClick={() => {setActiveTab(t.id); setResult(null);}} className={`p-5 rounded-3xl border transition-all ${activeTab === t.id ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/10' : 'bg-slate-900 border-white/5 hover:border-white/20'}`}>
              <div className={`mb-3 p-2 w-fit rounded-xl mx-auto ${activeTab === t.id ? 'bg-purple-500' : 'bg-slate-800'}`}>{t.icon}</div>
              <p className="font-bold text-sm uppercase tracking-widest">{t.name}</p>
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 border-2 border-dashed border-white/10 rounded-[2.5rem] p-12">
          {!result ? (
            <button onClick={handleProcess} disabled={isProcessing} className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center gap-3 mx-auto">
              {isProcessing ? 'PROCESSING...' : <><Upload className="w-6 h-6" /> UPLOAD FILE</>}
            </button>
          ) : (
            <div className="space-y-8">
              <img src={result} alt="Result" className="max-w-md mx-auto rounded-3xl border-4 border-white/5 shadow-2xl" />
              <div className="flex justify-center gap-4">
                <button onClick={() => setResult(null)} className="px-8 py-4 border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all">RESET</button>
                <button onClick={handleDownload} className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all"><Download className="w-6 h-6" /> DOWNLOAD</button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 text-slate-600 text-sm font-medium uppercase tracking-[0.2em]">
        © 2026 NEURAL MEDIA LABS • OPEN SOURCE
      </footer>
    </div>
  );
};

export default App;
    
