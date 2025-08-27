import { useState } from 'react';
import { motion } from 'motion/react';
import { SnakeGame } from './SnakeGame';
import { GraffitiSlap } from './GraffitiSlap';
import { Share2, Download, Palette, Trophy } from 'lucide-react';

interface SharedAchievement {
  id: string;
  type: 'snake_score' | 'graffiti_piece';
  title: string;
  description: string;
  timestamp: Date;
  data: any;
}

export function PortfolioShowcase() {
  const [activePrototype, setActivePrototype] = useState<'snake' | 'graffiti'>('snake');
  const [achievements, setAchievements] = useState<SharedAchievement[]>([]);
  const [showAchievements, setShowAchievements] = useState(false);

  const addAchievement = (achievement: Omit<SharedAchievement, 'id' | 'timestamp'>) => {
    const newAchievement: SharedAchievement = {
      ...achievement,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setAchievements(prev => [newAchievement, ...prev.slice(0, 9)]); // Keep last 10
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Innovation & Play
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAchievements(!showAchievements)}
              className="p-3 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors relative"
            >
              <Trophy className="w-6 h-6 text-amber-600" />
              {achievements.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {achievements.length}
                </motion.div>
              )}
            </motion.button>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Interactive prototypes showcasing playful design and technical execution. 
            Built with attention to detail, responsiveness, and delightful microinteractions.
          </p>
          
          {/* Portfolio Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-6 mt-6 text-sm text-slate-500"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>Interactive Design</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span>Cross-Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Production Ready</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Achievements Panel */}
        <motion.div
          initial={false}
          animate={{ 
            height: showAchievements ? 'auto' : 0,
            opacity: showAchievements ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mb-6"
        >
          <div className="bg-white rounded-xl shadow-lg border p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Creative Journey</h3>
            {achievements.length === 0 ? (
              <p className="text-slate-500 text-center py-4">
                Start playing to unlock achievements! 🎯
              </p>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg"
                  >
                    <div className="text-2xl">
                      {achievement.type === 'snake_score' ? '🐍' : '🎨'}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-slate-800">
                        {achievement.title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {achievement.description}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {achievement.timestamp.toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Prototype Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white p-2 rounded-xl shadow-lg border">
            <button
              onClick={() => setActivePrototype('snake')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activePrototype === 'snake'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              🐍 Snake Game
            </button>
            <button
              onClick={() => setActivePrototype('graffiti')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activePrototype === 'graffiti'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              🎨 Graffiti Creator
            </button>
          </div>
        </motion.div>

        {/* Prototype Display */}
        <motion.div
          key={activePrototype}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl border p-6 md:p-8"
        >
          {activePrototype === 'snake' ? (
            <SnakeGame onAchievement={addAchievement} />
          ) : (
            <GraffitiSlap onAchievement={addAchievement} />
          )}
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-slate-500 mb-4">Built with React, TypeScript, and Motion</p>
          
          {/* Technical Stack Showcase */}
          <div className="flex justify-center gap-4 text-xs text-slate-400">
            <span className="px-2 py-1 bg-slate-100 rounded">Canvas API</span>
            <span className="px-2 py-1 bg-slate-100 rounded">Real-time Animations</span>
            <span className="px-2 py-1 bg-slate-100 rounded">Responsive Design</span>
            <span className="px-2 py-1 bg-slate-100 rounded">DOS Framework</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}