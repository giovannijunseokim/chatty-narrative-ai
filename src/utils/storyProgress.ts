
export interface StoryProgress {
  storyId: string;
  characterId: string;
  currentStage: string;
  progress: number;
  messages: any[];
  illustrations: string[];
  timestamp: Date;
  isBookmarked: boolean;
}

export const saveStoryProgress = (progress: StoryProgress) => {
  const existingProgress = getStorySaves();
  const updatedProgress = existingProgress.filter(p => 
    !(p.storyId === progress.storyId && p.characterId === progress.characterId)
  );
  updatedProgress.push(progress);
  localStorage.setItem('storyProgress', JSON.stringify(updatedProgress));
};

export const getStorySaves = (): StoryProgress[] => {
  const saved = localStorage.getItem('storyProgress');
  return saved ? JSON.parse(saved) : [];
};

export const getStoryProgress = (storyId: string, characterId: string): StoryProgress | null => {
  const saves = getStorySaves();
  return saves.find(s => s.storyId === storyId && s.characterId === characterId) || null;
};

export const deleteStoryProgress = (storyId: string, characterId: string) => {
  const saves = getStorySaves();
  const filtered = saves.filter(s => !(s.storyId === storyId && s.characterId === characterId));
  localStorage.setItem('storyProgress', JSON.stringify(filtered));
};

export const toggleBookmark = (storyId: string, characterId: string) => {
  const saves = getStorySaves();
  const updated = saves.map(s => {
    if (s.storyId === storyId && s.characterId === characterId) {
      return { ...s, isBookmarked: !s.isBookmarked };
    }
    return s;
  });
  localStorage.setItem('storyProgress', JSON.stringify(updated));
};
