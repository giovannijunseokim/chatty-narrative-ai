
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Play, Trash2 } from 'lucide-react';
import { getStorySaves, deleteStoryProgress } from '../utils/storyProgress';
import { stories } from '../data/stories';

interface BookmarkedStoriesProps {
  onContinueStory: (storyId: string, characterId: string) => void;
}

const BookmarkedStories: React.FC<BookmarkedStoriesProps> = ({ onContinueStory }) => {
  const [saves, setSaves] = React.useState(getStorySaves());

  const refreshSaves = () => {
    setSaves(getStorySaves());
  };

  const handleDelete = (storyId: string, characterId: string) => {
    deleteStoryProgress(storyId, characterId);
    refreshSaves();
  };

  const bookmarkedSaves = saves.filter(save => save.isBookmarked);
  const recentSaves = saves.filter(save => !save.isBookmarked).slice(0, 3);

  const renderSaveCard = (save: any, isBookmarked: boolean) => {
    const story = stories.find(s => s.id === save.storyId);
    const character = story?.characters.find(c => c.id === save.characterId);
    
    return (
      <Card key={`${save.storyId}-${save.characterId}`} className="bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm">{story?.title}</h3>
              <p className="text-gray-400 text-xs">{character?.name}와의 대화</p>
              <p className="text-gray-500 text-xs mt-1">진행률: {save.progress}%</p>
            </div>
            {isBookmarked && <Bookmark className="w-4 h-4 text-yellow-400 fill-current" />}
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={() => onContinueStory(save.storyId, save.characterId)}
              size="sm"
              className="flex-1 text-xs"
            >
              <Play className="w-3 h-3 mr-1" />
              이어보기
            </Button>
            <Button
              onClick={() => handleDelete(save.storyId, save.characterId)}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {bookmarkedSaves.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Bookmark className="w-5 h-5 mr-2 text-yellow-400" />
            북마크된 이야기
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarkedSaves.map(save => renderSaveCard(save, true))}
          </div>
        </div>
      )}

      {recentSaves.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">최근 이야기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSaves.map(save => renderSaveCard(save, false))}
          </div>
        </div>
      )}

      {saves.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">아직 저장된 이야기가 없습니다.</p>
          <p className="text-gray-500 text-sm mt-2">이야기를 시작하면 자동으로 저장됩니다.</p>
        </div>
      )}
    </div>
  );
};

export default BookmarkedStories;
