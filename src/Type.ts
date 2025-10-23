export interface ProblemCardProps {
  number: number;
  title: string;
  description: string;
  difficulty?: string;
  time?: string;
  tags?: string[];
  disabled?: boolean;
}
