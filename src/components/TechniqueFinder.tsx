'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TechniqueFinderProps {
  onPageChange?: (page: string) => void;
}

export default function TechniqueFinder({ onPageChange }: TechniqueFinderProps) {
  const { t } = useTranslation('common');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Handle clicks on technique links
  useEffect(() => {
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('[data-page-link]') as HTMLElement;
      
      if (link) {
        event.preventDefault();
        const pageName = link.getAttribute('data-page-link');
        if (pageName && onPageChange) {
          onPageChange(pageName);
        }
      }
    };

    // Add event listener to the document for dynamically created content
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [onPageChange]);

  const getRecommendation = () => {
    let rec = '';

    if (selectedGoal === 'memorization') {
      rec = `
        <h3 class="text-xl font-bold mb-2">${t('techniqueFinder.recommendations.memorization.title')}</h3>
        <p class="mb-2">${t('techniqueFinder.recommendations.memorization.description')}</p>
      `;
    } else if (selectedGoal === 'understanding') {
      rec = `
        <h3 class="text-xl font-bold mb-2">${t('techniqueFinder.recommendations.understanding.title')}</h3>
        <p class="mb-2">${t('techniqueFinder.recommendations.understanding.description')}</p>
      `;
    } else if (selectedGoal === 'longterm') {
      rec = `
        <h3 class="text-xl font-bold mb-2">${t('techniqueFinder.recommendations.longterm.title')}</h3>
        <p class="mb-2">${t('techniqueFinder.recommendations.longterm.description')}</p>
      `;
    } else if (selectedGoal === 'application') {
      rec = `
        <h3 class="text-xl font-bold mb-2">${t('techniqueFinder.recommendations.application.title')}</h3>
        <p class="mb-2">${t('techniqueFinder.recommendations.application.description')}</p>
      `;
    } else {
      rec = t('techniqueFinder.recommendations.default');
    }

    setRecommendation(rec);
    setShowResult(true);
  };

  return (
    <div className="content-card rounded-lg p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t('techniqueFinder.title')}</h2>
      <p className="text-muted-foreground mb-4 text-sm sm:text-base">
        {t('techniqueFinder.description')}
      </p>

      <div id="quiz-container">
        <div className="mb-4 sm:mb-6">
          <p className="font-semibold text-base sm:text-lg mb-2">{t('techniqueFinder.questions.q1')}</p>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="w-full p-3 sm:p-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
          >
            <option value="">Select an option</option>
            <option value="memorization">{t('techniqueFinder.questions.q1_options.memorization')}</option>
            <option value="understanding">{t('techniqueFinder.questions.q1_options.understanding')}</option>
            <option value="longterm">{t('techniqueFinder.questions.q1_options.longterm')}</option>
            <option value="application">{t('techniqueFinder.questions.q1_options.application')}</option>
          </select>
        </div>
        <div className="mb-4 sm:mb-6">
          <p className="font-semibold text-base sm:text-lg mb-2">{t('techniqueFinder.questions.q2')}</p>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-3 sm:p-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm sm:text-base"
          >
            <option value="">Select an option</option>
            <option value="short">{t('techniqueFinder.questions.q2_options.short')}</option>
            <option value="long">{t('techniqueFinder.questions.q2_options.long')}</option>
          </select>
        </div>

        <button
          onClick={getRecommendation}
          disabled={!selectedGoal}
          className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition disabled:bg-muted disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {t('techniqueFinder.button')}
        </button>
      </div>

      {showResult && (
        <div className="mt-6 animate-in fade-in-0 slide-in-from-top-4 duration-500">
          <div
            className="bg-muted p-4 rounded-lg border text-sm sm:text-base transition-all duration-300 hover:shadow-md"
            dangerouslySetInnerHTML={{ __html: recommendation }}
          />
        </div>
      )}
    </div>
  );
}
