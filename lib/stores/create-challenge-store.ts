import { create } from 'zustand';
import {
  ChallengeCategory,
  ChallengeDifficulty,
  ChallengeTag,
} from '@/lib/types';

interface CreateChallengeStore {
  name: string;
  description: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  tags: ChallengeTag[];
  challengeZip: File | null;
  displayFiles: File[] | null;
  hints: string[];
  isFlagDynamic: boolean;
  isPointsDynamic: boolean;
  points: number | null;

  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setCategory: (category: ChallengeCategory) => void;
  setDifficulty: (difficulty: ChallengeDifficulty) => void;
  setTags: (tags: ChallengeTag[]) => void;
  setChallengeZip: (challengeZip: File | null) => void;
  setDisplayFiles: (displayFiles: File[] | null) => void;
  setHints: (hints: string[]) => void;
  setIsFlagDynamic: (isFlagDynamic: boolean) => void;
  setIsPointsDynamic: (isPointsDynamic: boolean) => void;
  setPoints: (points: number) => void;
  reset: () => void;
}

const useCreateChallengeStore = create<CreateChallengeStore>((set) => ({
  name: '',
  description: '',
  category: 'static',
  difficulty: 'easy',
  tags: [],
  challengeZip: null,
  displayFiles: null,
  hints: [],
  isFlagDynamic: false,
  isPointsDynamic: false,
  points: null,

  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setCategory: (category: ChallengeCategory) => set({ category }),
  setDifficulty: (difficulty: ChallengeDifficulty) => set({ difficulty }),
  setTags: (tags: ChallengeTag[]) => set({ tags }),
  setChallengeZip: (challengeZip: File | null) => set({ challengeZip }),
  setDisplayFiles: (displayFiles: File[] | null) => set({ displayFiles }),
  setHints: (hints: string[]) => set({ hints }),
  setIsFlagDynamic: (isFlagDynamic: boolean) => set({ isFlagDynamic }),
  setIsPointsDynamic: (isPointsDynamic: boolean) => set({ isPointsDynamic }),
  setPoints: (points: number) => set({ points }),
  reset: () =>
    set({
      name: '',
      description: '',
      category: 'static',
      difficulty: 'easy',
      tags: [],
      challengeZip: null,
      displayFiles: null,
      hints: [],
      isFlagDynamic: false,
      isPointsDynamic: false,
      points: null,
    }),
}));

export default useCreateChallengeStore;
