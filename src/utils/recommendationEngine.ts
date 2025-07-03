
export interface UserRating {
  storyId: string;
  rating: number;
  feedback: string;
  timestamp: Date;
}

export interface StoryRecommendation {
  storyId: string;
  score: number;
  reason: string;
}

export const saveUserRating = (rating: UserRating) => {
  const existingRatings = getUserRatings();
  const updatedRatings = [...existingRatings, rating];
  localStorage.setItem('userRatings', JSON.stringify(updatedRatings));
};

export const getUserRatings = (): UserRating[] => {
  const saved = localStorage.getItem('userRatings');
  return saved ? JSON.parse(saved) : [];
};

export const getRecommendations = (stories: any[]): StoryRecommendation[] => {
  const userRatings = getUserRatings();
  
  if (userRatings.length === 0) {
    return stories.slice(0, 3).map(story => ({
      storyId: story.id,
      score: 0.8,
      reason: '인기 이야기입니다'
    }));
  }

  const averageRating = userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length;
  const highRatedStories = userRatings.filter(r => r.rating >= 4);
  
  return stories
    .filter(story => !userRatings.some(r => r.storyId === story.id))
    .map(story => {
      let score = 0.5;
      let reason = '새로운 이야기';
      
      // 장르 기반 추천
      if (highRatedStories.length > 0) {
        const preferredGenres = highRatedStories.map(r => {
          const ratedStory = stories.find(s => s.id === r.storyId);
          return ratedStory?.genre;
        });
        
        if (preferredGenres.includes(story.genre)) {
          score += 0.3;
          reason = `선호하시는 ${story.genre} 장르입니다`;
        }
      }
      
      // 해시태그 기반 추천
      if (story.hashtags && highRatedStories.length > 0) {
        const matchingTags = story.hashtags.filter((tag: string) => 
          highRatedStories.some(r => {
            const ratedStory = stories.find(s => s.id === r.storyId);
            return ratedStory?.hashtags?.includes(tag);
          })
        );
        
        if (matchingTags.length > 0) {
          score += 0.2 * matchingTags.length;
          reason = `${matchingTags.join(', ')} 태그를 좋아하실 것 같아요`;
        }
      }
      
      return { storyId: story.id, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};
