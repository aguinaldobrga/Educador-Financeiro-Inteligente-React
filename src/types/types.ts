export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  notes?: string;
}

export interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  deadline: string; // e.g. "2026-12"
  category: 'savings' | 'investment' | 'purchase' | 'emergency';
}

export interface Lesson {
  id: string;
  title: string;
  excerpt: string;
  content: string[]; // split by paragraphs or steps
  duration: string;
  category: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  readTime: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}
