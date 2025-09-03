'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/Navigation';
import LessonContent from '@/components/LessonContent';
import TechniqueFinder from '@/components/TechniqueFinder';
import ForgettingCurveChart from '@/components/ForgettingCurveChart';
import EffectivenessChart from '@/components/EffectivenessChart';
import { learningData } from '@/data/learningData';

export default function Home() {
  const { t } = useTranslation('common');
  const [currentPage, setCurrentPage] = useState('Introduction');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    if (currentPage === 'Introduction') {
      return (
        <div>
          <div className="content-card rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('introduction.welcome')}</h2>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">{t('introduction.description1')}</p>
            <p className="text-muted-foreground text-sm sm:text-base">{t('introduction.description2')}</p>
          </div>
          <div className="content-card rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{t('introduction.forgettingCurve.title')}</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">{t('introduction.forgettingCurve.description')}</p>
            <ForgettingCurveChart />
          </div>
        </div>
      );
    }

    if (currentPage === 'Technique Finder') {
      return <TechniqueFinder onPageChange={setCurrentPage} />;
    }

    if (currentPage === 'Comparison') {
      return (
        <div className="content-card rounded-lg p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('comparison.title')}</h2>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">{t('comparison.description')}</p>
          <EffectivenessChart />
          <p className="text-xs sm:text-sm text-center text-muted-foreground mt-4">{t('comparison.footnote')}</p>
        </div>
      );
    }

    // For other techniques, render using LessonContent component
    const technique = learningData[currentPage];
    if (!technique) return null;

    return <LessonContent contentKey={technique.contentKey} />;
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay - positioned behind sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden transition-all duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto w-full">
          <header className="mb-8 md:mb-12 text-center relative">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden absolute left-0 top-0 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted z-10"
              aria-label="Open navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('header.title')}</h1>
            <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">{t('header.subtitle')}</p>
          </header>
          <div id="content-display" className="w-full animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
