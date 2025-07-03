import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Image, Users, Volume2, VolumeX, Star } from 'lucide-react';
import ChatMessage from './ChatMessage';
import IllustrationGallery from './IllustrationGallery';
import RatingModal from './RatingModal';
import { chatResponses } from '../data/chatResponses';
import { enhancedChatResponses } from '../data/enhancedChatResponses';
import { stories } from '../data/stories';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { saveUserRating } from '../utils/recommendationEngine';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  hasOptions?: boolean;
  options?: string[];
  progress?: number;
  selectedOption?: string;
  characterAvatar?: string;
  characterName?: string;
}

interface ChatInterfaceProps {
  storyId: string;
  characterId: string;
  onBackToStories: () => void;
  onSwitchCharacter: (newCharacterId: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  storyId, 
  characterId, 
  onBackToStories, 
  onSwitchCharacter 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [illustrations, setIllustrations] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [storyStage, setStoryStage] = useState<string>('greeting');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { toggleMusic } = useBackgroundMusic(storyId);
  
  const currentStory = stories.find(s => s.id === storyId);
  const currentCharacter = currentStory?.characters.find(c => c.id === characterId);
  const availableCharacters = currentStory?.characters.filter(c => c.id !== characterId) || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 캐릭터 변경 시 메시지 초기화 및 첫 인사
    setMessages([]);
    setCurrentProgress(0);
    setIllustrations([]);
    setStoryStage('greeting');
    
    setTimeout(() => {
      const responses = enhancedChatResponses[storyId]?.[characterId] || chatResponses;
      addCharacterMessage(responses.greeting);
    }, 1000);
  }, [storyId, characterId]);

  const addCharacterMessage = (responseData: any) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: responseData.text,
        isUser: false,
        timestamp: new Date(),
        imageUrl: responseData.imageUrl,
        hasOptions: true,
        options: responseData.options,
        progress: responseData.progress,
        characterAvatar: currentCharacter?.avatar,
        characterName: currentCharacter?.name
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
      
      if (responseData.progress !== undefined) {
        setCurrentProgress(responseData.progress);
      }

      if (responseData.imageUrl && !illustrations.includes(responseData.imageUrl)) {
        setIllustrations(prev => [...prev, responseData.imageUrl]);
      }
    }, 1500);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getNextStoryStage = (currentStage: string, userInput: string) => {
    const responses = enhancedChatResponses[storyId]?.[characterId] || chatResponses;
    const input = userInput.toLowerCase();
    
    // 스토리 진행 순서 정의
    const storyProgression: { [key: string]: string[] } = {
      'greeting': ['introduction', 'storyStart'],
      'introduction': ['storyStart', 'meetingJulia'],
      'storyStart': ['meetingJulia', 'secretRoom'],
      'meetingJulia': ['secretRoom', 'obrienTrap'],
      'secretRoom': ['obrienTrap', 'ministryOfLove'],
      'obrienTrap': ['ministryOfLove', 'room101'],
      'ministryOfLove': ['room101', 'ending'],
      'room101': ['ending'],
      'ending': ['ending'] // 마지막 단계
    };

    // 캐릭터 전환 요청 처리
    if (input.includes('대화해보고 싶어요') || input.includes('대화하고 싶어요')) {
      return currentStage;
    }

    // 다른 이야기 선택 요청
    if (input.includes('다른 이야기')) {
      return 'ending';
    }

    // 현재 단계에서 가능한 다음 단계들 중 하나를 선택
    const possibleNextStages = storyProgression[currentStage] || ['ending'];
    
    // 사용자 입력에 따라 적절한 다음 단계 선택
    if (input.includes('시작') || input.includes('이야기')) {
      return possibleNextStages.find(stage => stage === 'storyStart') || possibleNextStages[0];
    }
    if (input.includes('만남') || input.includes('줄리아')) {
      return possibleNextStages.find(stage => stage === 'meetingJulia') || possibleNextStages[0];
    }
    if (input.includes('비밀') || input.includes('장소')) {
      return possibleNextStages.find(stage => stage === 'secretRoom') || possibleNextStages[0];
    }
    if (input.includes('오브라이언') || input.includes('함정')) {
      return possibleNextStages.find(stage => stage === 'obrienTrap') || possibleNextStages[0];
    }
    if (input.includes('사랑의 부') || input.includes('고문')) {
      return possibleNextStages.find(stage => stage === 'ministryOfLove') || possibleNextStages[0];
    }
    if (input.includes('101') || input.includes('쥐')) {
      return possibleNextStages.find(stage => stage === 'room101') || possibleNextStages[0];
    }
    if (input.includes('결말') || input.includes('끝')) {
      return 'ending';
    }

    // 기본적으로 다음 단계로 진행
    return possibleNextStages[0];
  };

  const getProgressiveResponse = (userInput: string, currentStage: string) => {
    const responses = enhancedChatResponses[storyId]?.[characterId] || chatResponses;
    const nextStage = getNextStoryStage(currentStage, userInput);
    
    // 각 단계별 응답 반환
    if (responses[nextStage]) {
      return responses[nextStage];
    }
    
    // 기본 응답이 필요한 경우
    return responses.default || chatResponses.default;
  };

  const handleOptionClick = (option: string, messageId: string) => {
    // 선택한 옵션을 숨기고 비활성화
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, hasOptions: false }
        : msg
    ));
    
    addUserMessage(option);
    
    setTimeout(() => {
      if (option.includes('다른 이야기')) {
        onBackToStories();
        return;
      }
      
      const responseData = getProgressiveResponse(option, storyStage);
      const nextStage = getNextStoryStage(storyStage, option);
      setStoryStage(nextStage);
      addCharacterMessage(responseData);
    }, 500);
  };

  const getProgressStage = () => {
    if (currentProgress === 0) return "이야기 시작";
    if (currentProgress <= 25) return "도입부";
    if (currentProgress <= 50) return "갈등 발생";
    if (currentProgress <= 75) return "클라이맥스";
    if (currentProgress < 100) return "결말";
    return "완료";
  };

  const getBackgroundTheme = () => {
    const story = stories.find(s => s.id === storyId);
    const themeClasses = {
      'dystopian': 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800',
      'social-thriller': 'bg-gradient-to-br from-yellow-900/20 via-gray-900 to-orange-900/20',
      'survival-game': 'bg-gradient-to-br from-pink-900/20 via-gray-900 to-red-900/20',
      'zombie-historical': 'bg-gradient-to-br from-green-900/20 via-gray-900 to-brown-900/20',
      'superhero-epic': 'bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20'
    };
    
    return themeClasses[story?.backgroundTheme as keyof typeof themeClasses] || 'bg-gradient-to-br from-slate-900 via-gray-900 to-black';
  };

  const handleRatingSubmit = (rating: number, feedback: string) => {
    saveUserRating({
      storyId,
      rating,
      feedback,
      timestamp: new Date()
    });
    
    // 평가 완료 후 스토리 선택으로 이동
    setTimeout(() => {
      onBackToStories();
    }, 1000);
  };

  const handleEndStory = () => {
    setShowRatingModal(true);
  };

  const handleMusicToggle = () => {
    setMusicEnabled(!musicEnabled);
    toggleMusic();
  };

  return (
    <div className={`min-h-screen ${getBackgroundTheme()} transition-all duration-1000`}>
      <div className="max-w-5xl mx-auto px-3 sm:px-6">
        {/* Mobile-optimized Header with better spacing */}
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <Button 
              onClick={onBackToStories} 
              variant="ghost" 
              className="text-gray-400 hover:text-white text-base px-4 py-2"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              이야기 선택
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleMusicToggle}
                variant="ghost"
                className="text-gray-400 hover:text-white text-base px-4 py-2"
              >
                {musicEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={handleEndStory}
                variant="ghost"
                className="text-gray-400 hover:text-white text-base px-4 py-2"
              >
                <Star className="w-5 h-5 mr-2" />
                평가하기
              </Button>
              
              {availableCharacters.length > 0 && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white text-base px-4 py-2"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    캐릭터
                  </Button>
                  <div className="absolute right-0 mt-2 bg-gray-800 rounded-xl p-3 space-y-2 min-w-[140px] z-10 shadow-xl border border-gray-700">
                    {availableCharacters.map(char => (
                      <Button
                        key={char.id}
                        onClick={() => onSwitchCharacter(char.id)}
                        variant="ghost"
                        className="w-full text-left text-base text-white hover:bg-gray-700 rounded-lg py-2"
                      >
                        {char.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <Button
                onClick={() => setShowGallery(!showGallery)}
                variant="ghost"
                className="text-gray-400 hover:text-white text-base px-4 py-2"
              >
                <Image className="w-5 h-5 mr-2" />
                갤러리
              </Button>
            </div>
          </div>
          
          {/* Enhanced Progress Bar with better spacing */}
          <div className="space-y-3 bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center text-base">
              <span className="text-gray-300 font-medium">{currentStory?.title}</span>
              <span className="text-white font-bold text-lg">{currentProgress}%</span>
            </div>
            <Progress value={currentProgress} className="h-3 bg-gray-800 rounded-full" />
            <div className="text-sm text-gray-400 text-center font-medium">
              {getProgressStage()}
            </div>
          </div>
        </div>

        {/* Gallery with improved spacing */}
        {showGallery && (
          <div className="mb-6">
            <IllustrationGallery illustrations={illustrations} />
          </div>
        )}

        {/* Chat Container - Enhanced mobile optimization */}
        <Card className="h-[calc(100vh-220px)] bg-gray-900/30 border-gray-700 backdrop-blur-lg shadow-2xl rounded-2xl">
          <CardContent className="p-0 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  onOptionClick={handleOptionClick}
                />
              ))}
              {isTyping && (
                <div className="flex items-start space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-lg font-bold">
                      {currentCharacter?.avatar || 'W'}
                    </span>
                  </div>
                  <div className="bg-gray-800/80 rounded-2xl rounded-tl-sm px-6 py-5 backdrop-blur-sm">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>
      </div>

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onRatingSubmit={handleRatingSubmit}
        storyTitle={currentStory?.title || ''}
      />
    </div>
  );
};

export default ChatInterface;
