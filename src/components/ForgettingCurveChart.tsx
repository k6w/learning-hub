'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ForgettingCurveChart() {
  const { theme } = useTheme();
  const [showSpacedRepetition, setShowSpacedRepetition] = useState(false);

  const isDark = theme === 'dark';

  const baseData = {
    labels: ['Day 1', 'Day 2', 'Day 7', 'Day 30', 'Day 60'],
    datasets: [{
      label: 'Memory Retention (No Review)',
      data: [100, 50, 25, 10, 5],
      borderColor: isDark ? 'rgba(210, 180, 140, 0.8)' : 'rgba(210, 180, 140, 1)',
      backgroundColor: isDark ? 'rgba(210, 180, 140, 0.1)' : 'rgba(210, 180, 140, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const spacedRepetitionDataset = {
    label: 'Memory Retention (With Spaced Repetition)',
    data: [100, 95, 90, 85, 80],
    borderColor: isDark ? 'rgba(164, 125, 94, 0.8)' : 'rgba(164, 125, 94, 1)',
    backgroundColor: isDark ? 'rgba(164, 125, 94, 0.1)' : 'rgba(164, 125, 94, 0.2)',
    fill: true,
    tension: 0.4
  };

  const chartData = {
    ...baseData,
    datasets: showSpacedRepetition
      ? [...baseData.datasets, spacedRepetitionDataset]
      : baseData.datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Knowledge Retained (%)'
        }
      }
    }
  };

  useEffect(() => {
    const container = document.getElementById('forgetting-curve-container');
    if (container && !container.querySelector('canvas')) {
      const canvas = document.createElement('canvas');
      canvas.id = 'forgettingCurveChart';
      container.appendChild(canvas);
    }
  }, []);

  const toggleSpacedRepetition = () => {
    setShowSpacedRepetition(!showSpacedRepetition);
  };

  return (
    <div className="w-full animate-in fade-in-0 slide-in-from-left-4 duration-700">
      <div className="chart-container h-80 md:h-96 mb-4 transition-all duration-300 hover:scale-105">
        <Line data={chartData} options={options} />
      </div>
      <div className="text-center">
        <button
          onClick={toggleSpacedRepetition}
          className="px-4 py-2 text-sm sm:text-base rounded-lg transition bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95"
        >
          {showSpacedRepetition ? 'Hide Effect of Spaced Repetition' : 'Show Effect of Spaced Repetition'}
        </button>
      </div>
    </div>
  );
}
