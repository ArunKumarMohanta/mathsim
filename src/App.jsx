import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, BarChart, Bar
} from 'recharts';
import { Calculator, TrendingDown, BarChart2, Play, AlertCircle, BookOpen, ChevronRight } from 'lucide-react';

import { useIntegration } from './hooks/useIntegration';
import { useRootFinding } from './hooks/useRootFinding';
import { useCLT } from './hooks/useCLT';

export default function App() {
  const [activeTab, setActiveTab] = useState('integration');

  const integration = useIntegration();
  const rootFinding = useRootFinding();
  const clt = useCLT();

  return (
    <div className="flex h-screen bg-[#0f1117] text-gray-100 font-sans selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#161821] border-r border-gray-800 flex flex-col z-10 shadow-xl shrink-0">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20">M</div>
            <h1 className="text-xl font-bold tracking-wide text-white">MathSim</h1>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-medium">Engineering Algorithms</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavItem active={activeTab === 'integration'} onClick={() => setActiveTab('integration')} icon={<Calculator size={18} />} label="Integration" />
          <NavItem active={activeTab === 'roots'} onClick={() => setActiveTab('roots')} icon={<TrendingDown size={18} />} label="Root Finding" />
          <NavItem active={activeTab === 'clt'} onClick={() => setActiveTab('clt')} icon={<BarChart2 size={18} />} label="Central Limit" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* --- MODULE 1: TRAPEZOIDAL INTEGRATION --- */}
          {activeTab === 'integration' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Header title="Trapezoidal Rule Approximation" desc="Type any custom math function to visualize how integration is approximated using geometry." />
              
              <TheoryPanel title="How does this work?">
                Calculus lets us find the exact area under a curved line, but computers prefer simple geometry. The Trapezoidal Rule guesses the area by slicing the space into vertical strips and drawing straight lines across the top (trapezoids). Notice how the green trapezoids peek above or below the true blue curve? That's the "error". As you increase the intervals on the slider, the strips get thinner, the error shrinks, and the computer's guess matches the true exact area!
              </TheoryPanel>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-[#161821] p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Custom Function f(x)</label>
                    <input 
                      type="text" 
                      value={integration.functionString}
                      onChange={(e) => integration.setFunctionString(e.target.value)}
                      placeholder="e.g. sin(x) + 2"
                      className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono transition-colors"
                    />
                    {integration.error && <p className="text-red-400 text-xs mt-2 font-medium">{integration.error}</p>}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-300">Intervals (n)</label>
                      <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-md font-mono font-bold">{integration.intervals}</span>
                    </div>
                    <input 
                      type="range" min="1" max="40" 
                      value={integration.intervals} 
                      onChange={(e) => integration.setIntervals(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                  <div className="pt-6 border-t border-gray-800 mt-auto">
                    <div className="text-[10px] tracking-wider text-gray-500 font-bold uppercase mb-2">Calculated Area</div>
                    <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800 flex flex-col items-center">
                      <div className="text-3xl font-mono font-bold text-emerald-400">{integration.area}</div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 bg-[#161821] p-6 rounded-2xl border border-gray-800 shadow-lg h-[450px] flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-400 mb-6">Real-Time Geometrical Mapping</h3>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={integration.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTrue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorTrap" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2e3039" vertical={false} />
                        <XAxis dataKey="x" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#161821', borderColor: '#2e3039', borderRadius: '8px', color: '#fff' }} />
                        <Area type="monotone" dataKey="True Curve" stroke="#818cf8" strokeWidth={2} fill="url(#colorTrue)" />
                        <Area type="linear" dataKey="Trapezoid" stroke="#10b981" strokeWidth={2} fill="url(#colorTrap)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- MODULE 2: ROOT FINDING (NEWTON-RAPHSON) --- */}
          {activeTab === 'roots' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <Header title="Newton-Raphson Root Finding" desc="An iterative algorithm that uses tangents to find exactly where a curve crosses zero." />
              
               <TheoryPanel title="How does this work?">
                How do computers find where a curve hits exactly zero (the "root")? They guess! Newton-Raphson starts at your "Initial Guess". It calculates the slope (tangent) at that exact point and slides down that straight line to the zero axis. It takes that new spot and repeats the process. Watch the graph—it usually only takes 4 or 5 iterations to slide right into the exact answer. But beware: if you guess a spot where the line is perfectly flat (slope = 0), it shoots off into infinity and fails!
              </TheoryPanel>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-[#161821] p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Custom Function f(x)</label>
                    <input 
                      type="text" 
                      value={rootFinding.functionString}
                      onChange={(e) => rootFinding.setFunctionString(e.target.value)}
                      placeholder="e.g. x^2 - 4"
                      className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono transition-colors"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-300">Initial Guess (x₀)</label>
                      <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md font-mono font-bold">{rootFinding.initialGuess}</span>
                    </div>
                    <input 
                      type="range" min="-5" max="5" step="0.5"
                      value={rootFinding.initialGuess} 
                      onChange={(e) => rootFinding.setInitialGuess(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                  
                  <div className="mt-auto">
                    {rootFinding.error ? (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-red-400 text-sm">
                        <AlertCircle className="shrink-0 mt-0.5" size={16} />
                        <p>{rootFinding.error}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-800">
                        <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800 flex flex-col items-center justify-center">
                          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">Root Found</div>
                          <div className="text-xl font-mono font-bold text-amber-400">{rootFinding.root}</div>
                        </div>
                        <div className="p-4 bg-[#0f1117] rounded-xl border border-gray-800 flex flex-col items-center justify-center">
                          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-1 font-bold">Iterations</div>
                          <div className="text-xl font-mono font-bold text-white">{rootFinding.iterations}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#161821] p-6 rounded-2xl border border-gray-800 shadow-lg h-[450px] flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-400 mb-6">Algorithm Convergence</h3>
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={rootFinding.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2e3039" vertical={false} />
                        <XAxis dataKey="x" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#161821', borderColor: '#2e3039', borderRadius: '8px', color: '#fff' }} />
                        <ReferenceLine y={0} stroke="#4b5563" strokeWidth={2} />
                        {!rootFinding.error && (
                          <ReferenceLine x={rootFinding.root} stroke="#fbbf24" strokeDasharray="5 5" strokeWidth={2} />
                        )}
                        <Line type="monotone" dataKey="f(x)" stroke="#818cf8" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- MODULE 3: CENTRAL LIMIT THEOREM --- */}
          {activeTab === 'clt' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <Header title="Central Limit Theorem (High-Performance)" desc="Proves that the sum of independent random variables tends toward a normal distribution." />
              
               <TheoryPanel title="Why does this form a perfect Bell Curve?">
                The Central Limit Theorem is one of the most magical concepts in statistics. Imagine rolling dice and taking their average. Getting an average of 1 (rolling all ones) is incredibly rare. Getting an average of 3.5 (a mix of high and low numbers) is very common. Because of this, no matter how chaotic individual data points are, when you take their averages, they will <strong>always</strong> stack up in the middle to form a perfect "Bell Curve" (Normal Distribution). This simulation rolls millions of random numbers in a background thread to prove it visually!
              </TheoryPanel>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                
                {/* INTERACTIVE CONTROLS FOR CLT */}
                <div className="bg-[#161821] p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-300">Sample Size (Dice per roll)</label>
                      <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-md font-mono font-bold">{clt.sampleSize}</span>
                    </div>
                    <input 
                      type="range" min="1" max="200" 
                      value={clt.sampleSize} 
                      onChange={(e) => clt.setSampleSize(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-300">Total Samples (Rolls)</label>
                      <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-md font-mono font-bold">{clt.numSamples.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="1000" max="500000" step="1000"
                      value={clt.numSamples} 
                      onChange={(e) => clt.setNumSamples(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-gray-800">
                    <button 
                      onClick={clt.runSimulation}
                      disabled={clt.isCalculating}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {clt.isCalculating ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Computing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2"><Play size={16} fill="currentColor" /> Run Simulation</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* GRAPH PANEL */}
                <div className="lg:col-span-2 bg-[#161821] p-6 rounded-2xl border border-gray-800 shadow-lg h-[450px] flex flex-col">
                  <h3 className="text-sm font-semibold text-gray-400 mb-6">Simulation Distribution</h3>
                  <div className="flex-1 min-h-0">
                    {clt.histogramData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={clt.histogramData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#2e3039" vertical={false} />
                          <XAxis dataKey="bin" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#161821', borderColor: '#2e3039', borderRadius: '8px', color: '#fff' }} cursor={{fill: '#2e3039', opacity: 0.4}}/>
                          <Bar dataKey="count" fill="#818cf8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
                        <BarChart2 size={48} className="mb-4 opacity-50" />
                        <p>Adjust parameters and click Run Simulation.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// --- Reusable Micro-Components ---

const NavItem = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      active 
        ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Header = ({ title, desc }) => (
  <div className="mb-4">
    <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
    <p className="text-gray-400 mt-2 max-w-3xl leading-relaxed">{desc}</p>
  </div>
);

// Educational Panel Component
const TheoryPanel = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl overflow-hidden mt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-indigo-300 hover:bg-indigo-500/10 transition-colors"
      >
        <div className="flex items-center gap-3 font-semibold">
          <BookOpen size={18} />
          {title}
        </div>
        <ChevronRight size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 text-sm text-indigo-200/80 leading-relaxed border-t border-indigo-500/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};