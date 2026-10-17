import React from 'react';
import {
  Terminal,
  Cpu,
  Wrench,
  Building,
  Zap,
  Brain,
  Server,
  Layers,
  FlaskConical,
  BookOpen
} from 'lucide-react';

interface BranchIconProps {
  name: string;
  className?: string;
}

export const BranchIcon: React.FC<BranchIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Terminal':
      return <Terminal className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Building':
      return <Building className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'FlaskConical':
      return <FlaskConical className={className} />;
    default:
      return <Layers className={className} />;
  }
};
