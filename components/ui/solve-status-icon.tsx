import { ChallengeSolveStatus } from '@/lib/types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import React from 'react';

interface SolveStatusIconProps {
  status: ChallengeSolveStatus;
  iconSize?: number;
}

export const SolveStatusIcon: React.FC<SolveStatusIconProps> = ({
  status,
  iconSize = 18,
}) => {
  switch (status) {
    case 'solved':
      return <CheckCircle className="text-success" size={iconSize} />;
    case 'unsolved':
      return <Clock className="text-progress" size={iconSize} />;
    default:
      return <AlertCircle className="text-muted-foreground" size={iconSize} />;
  }
};
