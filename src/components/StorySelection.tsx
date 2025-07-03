
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp } from 'lucide-react';
import { stories, Story, Character } from '../data/stories';
import { getRecommendations, StoryRecommendation } from '../utils/recommendationEngine';

interface StorySelectionProps {
  onStorySelect: (storyId: string, characterId: string) => void;
}

const StorySelection: React.FC<StorySelectionProps> = ({ onStorySelect }) => {
  const [recommendations, setRecommendations] = useState<StoryRecommendation[]>([]);

  useEffect(() => {
    const recs = getRecommendations(stories);
    setRecommendations(recs);
  }, []);

  const getRecommendationBadge = (storyId: string) => {
    const rec = recommendations.find(r => r.storyId === storyId);
    if (rec && rec.score > 0.7) {
      return (
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 mb-2">
          <Sparkles className="w-3 h-3 mr-1" />
          추천
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-white">이야기를 선택하세요</h2>
        <p className="text-gray-300">다양한 캐릭터와 함께 몰입감 있는 스토리를 경험해보세요</p>
        
        {recommendations.length > 0 && (
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-700/50">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-medium">맞춤 추천</span>
            </div>
            <p className="text-sm text-gray-300">
              회원님의 취향을 분석하여 추천해드립니다
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="bg-gray-900/70 border-gray-700 backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-300 relative">
            <CardHeader className="pb-4">
              {getRecommendationBadge(story.id)}
              
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img 
                  src={story.thumbnail} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{story.title}</CardTitle>
                  <Badge variant="secondary" className="bg-red-600/20 text-red-300 border-red-600/30">
                    {story.genre}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">{story.description}</p>
                
                {/* 해시태그 */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {story.hashtags.map((tag, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="text-xs bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-3">대화할 캐릭터 선택:</h4>
                <div className="space-y-2">
                  {story.characters.map((character) => (
                    <Button
                      key={character.id}
                      onClick={() => onStorySelect(story.id, character.id)}
                      variant="outline"
                      className="w-full justify-start bg-gray-800 border-gray-600 text-white hover:bg-gray-700 p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">{character.avatar}</span>
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{character.name}</div>
                          <div className="text-xs text-gray-400">{character.role}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StorySelection;
