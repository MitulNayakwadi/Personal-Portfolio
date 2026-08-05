import { useState } from 'react';
import { SKILLS_DATA } from '../../data/portfolio';
import AnimateOnScroll from '../AnimateOnScroll';
import { motion } from 'framer-motion';
import { Search, Code2, Cpu, Database, Wrench, BookOpen, Layers } from 'lucide-react';

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const CATEGORY_ICONS: Record<string, any> = {
    'Programming Languages': Code2,
    'Web Development': Layers,
    'AI & Machine Learning': Cpu,
    'Databases & Cloud': Database,
    'Developer Tools': Wrench,
    'Core Concepts': BookOpen,
  };

  const categories = ['All', ...SKILLS_DATA.map((s) => s.category)];

  const filteredGroups = SKILLS_DATA.map((group) => {
    if (selectedCategory !== 'All' && group.category !== selectedCategory) {
      return null;
    }
    const matchingSkills = group.skills.filter((skill) =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (matchingSkills.length === 0) return null;
    return {
      category: group.category,
      skills: matchingSkills,
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="py-24 px-6 max-w-[900px] mx-auto border-b border-slate-100">
      <AnimateOnScroll direction="left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="border-l-4 border-[#2563EB] pl-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1A1A2E] tracking-tight">
              Technical Stack & Competencies
            </h2>
            <p className="font-body text-xs sm:text-sm text-slate-500 mt-1">
              Core technologies, frameworks, and engineering principles
            </p>
          </div>

          {/* Interactive Skill Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g. Python, AWS)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#2563EB] shadow-xs"
            />
          </div>
        </div>
      </AnimateOnScroll>

      {/* Category Pills Filter */}
      <AnimateOnScroll delay={0.1}>
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm font-semibold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
                data-hover="true"
              >
                {cat}
              </button>
            );
          })}
        </div>
      </AnimateOnScroll>

      {/* Skill Groups Grid */}
      <div className="space-y-8">
        {filteredGroups.map((group) => {
          if (!group) return null;
          const CategoryIcon = CATEGORY_ICONS[group.category] || Code2;
          return (
            <div key={group.category} className="space-y-3 bg-white border border-slate-200/90 p-5 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-blue-200 transition-colors">
              {/* Category label header */}
              <div className="flex items-center gap-2 text-slate-700 font-mono text-xs uppercase font-bold tracking-wider pb-2 border-b border-slate-100">
                <CategoryIcon className="w-4 h-4 text-[#2563EB]" />
                <span>{group.category}</span>
                <span className="ml-auto text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                  {group.skills.length} skills
                </span>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill, pillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: pillIdx * 0.03,
                      ease: 'easeOut',
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3.5 py-1.5 rounded-xl border border-blue-200/70 bg-blue-50/70 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-900 text-xs sm:text-sm font-mono font-medium shadow-[0_1px_2px_rgba(37,99,235,0.04)] transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

