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

export interface TechniqueDetail {
  title: string;
  why: string;
  how: string[];
  examples: string[];
  common_mistakes?: string[];
  tools?: string[];
}

export interface LessonData {
  [key: string]: Record<string, unknown>; // For the detailed lesson structure
}

export interface CommonData {
  techniqueDetails: {
    [key: string]: TechniqueDetail;
  };
  [key: string]: Record<string, unknown>;
}
