import React from 'react';
import { useTranslation } from 'react-i18next';
import { learningData } from '@/data/learningData';
import LanguageSwitcher from './LanguageSwitcher';
import { ThemeToggle } from './theme-toggle';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navigation({ currentPage, onPageChange, sidebarOpen, setSidebarOpen }: NavigationProps) {
  const { t } = useTranslation('common');

  // Function to get category translation key
  const getCategoryKey = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "Getting Started": "getting_started",
      "Memory & Recall": "memory_recall",
      "Understanding": "understanding",
      "Focus & Productivity": "focus_productivity",
      "Note-Taking Strategies": "note_taking"
    };
    return categoryMap[category] || category.toLowerCase().replace(/\s+/g, '_');
  };

  // Function to get technique translation key
  const getTechniqueKey = (technique: string) => {
    const techniqueMap: { [key: string]: string } = {
      "Introduction": "introduction",
      "Technique Finder": "technique_finder",
      "Active Recall": "active_recall",
      "Spaced Repetition": "spaced_repetition",
      "Interleaving": "interleaving",
      "Elaboration": "elaboration",
      "Dual Coding": "dual_coding",
      "The Feynman Technique": "feynman_technique",
      "Pomodoro Technique": "pomodoro_technique",
      "Cornell Method": "cornell_method",
      "Mind Mapping": "mind_mapping",
      "Self-Testing": "self_testing",
      "Comparison": "comparison"
    };
    return techniqueMap[technique] || technique.toLowerCase().replace(/\s+/g, '_');
  };

  // Group techniques by category
  const categories: { [key: string]: string[] } = {};

  Object.keys(learningData).forEach(key => {
    const category = learningData[key].category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(key);
  });

  return (
    <aside className={`w-80 sm:w-96 bg-sidebar border-r border-sidebar-border p-4 sm:p-6 fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:block ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:w-80 flex flex-col`}>
      {/* Close button for mobile */}
      <button
        onClick={() => setSidebarOpen(false)}
        className="lg:hidden absolute top-4 right-4 p-2 rounded-md text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent z-10"
        aria-label={t('navigation.close')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-sidebar-primary">{t('navigation.title')}</h1>
        <LanguageSwitcher />
      </div>
      <nav className="space-y-2">
        {Object.keys(categories).map(category => (
          <div key={category}>
            <h3 className="text-xs sm:text-sm font-semibold text-sidebar-foreground uppercase tracking-wider mt-4 mb-2 px-4">
              {t(`categories.${getCategoryKey(category)}`)}
            </h3>
            {categories[category].map(technique => (
              <button
                key={technique}
                onClick={() => {
                  onPageChange(technique);
                  setSidebarOpen(false); // Close sidebar on mobile after selection
                }}
                className={`nav-link block w-full text-left py-2 px-4 rounded-md font-medium text-sidebar-foreground transition-all duration-300 ease-in-out border-l-3 text-sm sm:text-base ${
                  currentPage === technique
                    ? 'active bg-sidebar-primary text-sidebar-primary-foreground border-l-sidebar-primary shadow-sm'
                    : 'border-l-transparent'
                }`}
              >
                {t(`techniques.${getTechniqueKey(technique)}`)}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Theme Toggle at bottom */}
      <div className="mt-auto pt-4 border-t border-sidebar-border">
        <ThemeToggle />
      </div>
    </aside>
  );
}
