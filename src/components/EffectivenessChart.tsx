'use client';

import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EffectivenessChartProps {
  containerId?: string;
}

export default function EffectivenessChart({ containerId = 'effectiveness-chart-container' }: EffectivenessChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const data = {
    labels: ['Active Recall', 'Spaced Repetition', 'Interleaving', 'Elaboration', 'Highlighting', 'Rereading'],
    datasets: [
      {
        label: 'Effectiveness for Long-Term Retention',
        data: [90, 85, 75, 70, 30, 20],
        backgroundColor: [
          isDark ? 'rgba(164, 125, 94, 0.5)' : 'rgba(164, 125, 94, 0.7)',
          isDark ? 'rgba(164, 125, 94, 0.5)' : 'rgba(164, 125, 94, 0.7)',
          isDark ? 'rgba(164, 125, 94, 0.4)' : 'rgba(164, 125, 94, 0.5)',
          isDark ? 'rgba(164, 125, 94, 0.4)' : 'rgba(164, 125, 94, 0.5)',
          isDark ? 'rgba(210, 180, 140, 0.3)' : 'rgba(210, 180, 140, 0.5)',
          isDark ? 'rgba(210, 180, 140, 0.3)' : 'rgba(210, 180, 140, 0.5)'
        ],
        borderColor: [
          isDark ? 'rgba(164, 125, 94, 0.8)' : 'rgba(164, 125, 94, 1)',
          isDark ? 'rgba(164, 125, 94, 0.8)' : 'rgba(164, 125, 94, 1)',
          isDark ? 'rgba(164, 125, 94, 0.8)' : 'rgba(164, 125, 94, 1)',
          isDark ? 'rgba(164, 125, 94, 0.8)' : 'rgba(164, 125, 94, 1)',
          isDark ? 'rgba(210, 180, 140, 0.8)' : 'rgba(210, 180, 140, 1)',
          isDark ? 'rgba(210, 180, 140, 0.8)' : 'rgba(210, 180, 140, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'bar'>) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += context.parsed.x + '% Utility';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Relative Utility Score'
        }
      }
    }
  };

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (container && !container.querySelector('canvas')) {
      const canvas = document.createElement('canvas');
      canvas.id = 'effectivenessChart';
      container.appendChild(canvas);
    }
  }, [containerId]);

  return (
    <div className="chart-container h-96 md:h-[500px] transition-all duration-300 hover:scale-105 animate-in fade-in-0 slide-in-from-right-4 duration-700">
      <Bar data={data} options={options} />
    </div>
  );
}
