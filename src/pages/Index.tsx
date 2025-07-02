
import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import StorySelection from '../components/StorySelection';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [currentView, setCurrentView] = useState<'selection' | 'chat'>('selection');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
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
            
            <StorySelection onStorySelect={handleStorySelect} />
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
