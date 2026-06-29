import React, { useState } from 'react';
import { BookOpen, ChevronRight, LineChart, Lightbulb, Globe, PlayCircle } from 'lucide-react';

export const TheoryPanel = ({ 
  title, 
  children,
  graphGuide = "The graph visually maps the mathematical calculations in real-time. Pay attention to the intersecting lines or shaded areas—these highlight how the algorithm's 'guess' compares to the exact true value. Try moving the sliders to see how the visual accuracy improves!",
  realWorld = "Algorithms like this are the invisible backbone of modern technology. They are used daily in rendering 3D video game graphics, optimizing GPS delivery routes, and training advanced Artificial Intelligence models.",
  videoUrl = "https://www.youtube.com/embed/WUvTyaaNkzM"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('concept');
  
  return (
    <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl overflow-hidden mt-4 shadow-lg shadow-indigo-900/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-indigo-200 hover:bg-indigo-500/10 transition-colors"
      >
        <div className="flex items-center gap-3 font-semibold">
          <BookOpen size={18} className="text-indigo-400" />
          {title}
        </div>
        <ChevronRight size={18} className={`text-indigo-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-3 text-sm text-indigo-100/80 leading-relaxed border-t border-indigo-500/20">
            
            {/* Interactive Mini-Tabs for Beginners */}
            <div className="flex flex-wrap gap-2 mb-4">
              <TabButton 
                active={activeTab === 'concept'} 
                onClick={() => setActiveTab('concept')} 
                icon={<Lightbulb size={14} />} 
                label="Concept" 
              />
              <TabButton 
                active={activeTab === 'graph'} 
                onClick={() => setActiveTab('graph')} 
                icon={<LineChart size={14} />} 
                label="How to Read the Graph" 
              />
              <TabButton 
                active={activeTab === 'world'} 
                onClick={() => setActiveTab('world')} 
                icon={<Globe size={14} />} 
                label="Real World Use" 
              />
              <TabButton 
                active={activeTab === 'video'} 
                onClick={() => setActiveTab('video')} 
                icon={<PlayCircle size={14} />} 
                label="Video Tutorial" 
              />
            </div>

            {/* Tab Content Area */}
            <div className="min-h-[80px] bg-indigo-950/40 p-4 rounded-lg border border-indigo-500/10">
              {activeTab === 'concept' && (
                <div className="leading-relaxed">
                  {children}
                </div>
              )}
              {activeTab === 'graph' && (
                <div className="flex items-start gap-3">
                  <LineChart className="shrink-0 text-amber-400 mt-0.5" size={18} />
                  <p className="text-indigo-200/90 leading-relaxed">{graphGuide}</p>
                </div>
              )}
              {activeTab === 'world' && (
                <div className="flex items-start gap-3">
                  <Globe className="shrink-0 text-emerald-400 mt-0.5" size={18} />
                  <p className="text-indigo-200/90 leading-relaxed">{realWorld}</p>
                </div>
              )}
              {activeTab === 'video' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <PlayCircle className="shrink-0 text-red-400 mt-0.5" size={18} />
                    <p className="text-indigo-200/90 leading-relaxed">Watch this highly recommended video for a deeper visual understanding of the math at play:</p>
                  </div>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-indigo-500/20 shadow-lg bg-black">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={videoUrl}
                      title="Educational Math Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable micro-component specifically for the tabs inside the panel
const TabButton = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
      active 
        ? 'bg-indigo-500 text-white shadow-md' 
        : 'bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:text-white'
    }`}
  >
    {icon}
    {label}
  </button>
);