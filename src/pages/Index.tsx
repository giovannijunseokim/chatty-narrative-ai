import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import StorySelection from '../components/StorySelection';
import BookmarkedStories from '../components/BookmarkedStories';
import { Button } from "@/components/ui/button";
import { Bookmark, Plus } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'selection' | 'chat' | 'bookmarks'>('selection');
  const [selectedStory, setSelectedStory] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');

  const handleStorySelect = (storyId: string, characterId: string) => {
    setSelectedStory(storyId);
    setSelectedCharacter(characterId);
    setCurrentView('chat');
  };

  const handleBackToStories = () => {
    setCurrentView('selection');
  };

  const handleSwitchCharacter = (newCharacterId: string) => {
    setSelectedCharacter(newCharacterId);
  };

  const handleContinueStory = (storyId: string, characterId: string) => {
    setSelectedStory(storyId);
    setSelectedCharacter(characterId);
    setCurrentView('chat');
  };

  const getMainBackgroundTheme = () => {
    if (currentView === 'selection') {
      return 'bg-gradient-to-br from-slate-900 via-gray-900 to-black';
    }
    
    const story = stories.find(s => s.id === selectedStory);
    const themeClasses = {
      'dystopian': 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800',
      'social-thriller': 'bg-gradient-to-br from-yellow-900/20 via-gray-900 to-orange-900/20',
      'survival-game': 'bg-gradient-to-br from-pink-900/20 via-gray-900 to-red-900/20',
      'zombie-historical': 'bg-gradient-to-br from-green-900/20 via-gray-900 to-brown-900/20',
      'superhero-epic': 'bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20'
    };
    
    return themeClasses[story?.backgroundTheme as keyof typeof themeClasses] || 'bg-gradient-to-br from-slate-900 via-gray-900 to-black';
  };

  return (
    <div className={`min-h-screen ${getMainBackgroundTheme()} text-white transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {currentView === 'selection' ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                대화형 스토리텔링
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
                AI 캐릭터와 함께하는 몰입감 있는 소설 경험
              </p>
              <p className="text-gray-400">
                다양한 이야기의 캐릭터들과 대화하며 그들의 세계를 탐험해보세요
              </p>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <Button
                onClick={() => setCurrentView('bookmarks')}
                variant="outline"
                className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                저장된 이야기
              </Button>
            </div>
            
            <StorySelection onStorySelect={handleStorySelect} />
          </div>
        ) : currentView === 'bookmarks' ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">저장된 이야기</h1>
              <Button
                onClick={() => setCurrentView('selection')}
                variant="outline"
                className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                새 이야기 시작
              </Button>
            </div>
            <BookmarkedStories onContinueStory={handleContinueStory} />
          </div>
        ) : (
          <ChatInterface 
            storyId={selectedStory}
            characterId={selectedCharacter}
            onBackToStories={handleBackToStories}
            onSwitchCharacter={handleSwitchCharacter}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
