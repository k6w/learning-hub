export interface LearningTechnique {
  category: string;
  contentKey: string;
}

export interface LearningData {
  [key: string]: LearningTechnique;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
    tension?: number;
  }>;
}
