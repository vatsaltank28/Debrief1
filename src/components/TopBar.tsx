import React from 'react';
import { Search } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { Route } from '../types';

const ROUTE_LABELS: Record<Route, string> = {
  all: 'All Meetings',
  action: 'Action Items',
  decision: 'Decisions',
  discussion: 'Discussion',
  problem: 'Problems',
};

interface TopBarProps {
  onSearch: (q: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onSearch }) => {
  const { route } = useRouter();

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 z-30">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400 font-medium">Workspace</span>
        <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-semibold text-gray-800">{ROUTE_LABELS[route]}</span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
        <input
          type="text"
          placeholder="Search notes…"
          onChange={e => onSearch(e.target.value)}
          className="pl-8 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none w-44 transition-all placeholder:text-gray-400"
        />
      </div>
    </header>
  );
};
