
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Image, Download } from 'lucide-react';
import ChatMessage from './ChatMessage';
import IllustrationGallery from './IllustrationGallery';
import { chatResponses } from '../data/chatResponses';

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
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [illustrations, setIllustrations] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // 첫 인사 메시지
    setTimeout(() => {
      addWinstonMessage(chatResponses.greeting);
    }, 1000);
  }, []);

  const addWinstonMessage = (responseData: any) => {
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
        progress: responseData.progress
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
      
      if (responseData.progress !== undefined) {
        setCurrentProgress(responseData.progress);
      }

      // 새로운 삽화가 있으면 갤러리에 추가
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

  const getProgressiveResponse = (userInput: string, currentProgress: number) => {
    const input = userInput.toLowerCase();
    
    // 진행도에 따른 단계별 응답
    if (currentProgress === 0) {
      if (input.includes('이야기') || input.includes('시작')) {
        return chatResponses.introduction;
      } else if (input.includes('누구') || input.includes('윈스턴')) {
        return chatResponses.introduction;
      } else if (input.includes('1984') || input.includes('세상')) {
        return chatResponses.introduction;
      }
    } else if (currentProgress <= 15) {
      if (input.includes('만남') || input.includes('운명')) {
        return chatResponses.storyStart;
      } else if (input.includes('진실부') || input.includes('일상')) {
        return chatResponses.storyStart;
      } else if (input.includes('의문') || input.includes('빅브라더')) {
        return chatResponses.storyStart;
      }
    } else if (currentProgress <= 25) {
      if (input.includes('만나기') || input.includes('결심')) {
        return chatResponses.meetingJulia;
      } else if (input.includes('함정') || input.includes('경찰')) {
        return chatResponses.meetingJulia;
      } else if (input.includes('사랑') || input.includes('범죄')) {
        return chatResponses.meetingJulia;
      }
    } else if (currentProgress <= 40) {
      if (input.includes('비밀') || input.includes('장소')) {
        return chatResponses.secretRoom;
      } else if (input.includes('반항') || input.includes('사랑')) {
        return chatResponses.secretRoom;
      } else if (input.includes('위험') || input.includes('발각')) {
        return chatResponses.secretRoom;
      }
    } else if (currentProgress <= 60) {
      if (input.includes('오브라이언') || input.includes('접근')) {
        return chatResponses.obrienTrap;
      } else if (input.includes('브라더후드') || input.includes('가입')) {
        return chatResponses.obrienTrap;
      } else if (input.includes('함정') || input.includes('깨달')) {
        return chatResponses.obrienTrap;
      }
    } else if (currentProgress <= 75) {
      if (input.includes('체포') || input.includes('기분')) {
        return chatResponses.ministryOfLove;
      } else if (input.includes('사랑의 부') || input.includes('일어났')) {
        return chatResponses.ministryOfLove;
      } else if (input.includes('줄리아') || input.includes('헤어')) {
        return chatResponses.ministryOfLove;
      }
    } else if (currentProgress <= 90) {
      if (input.includes('101') || input.includes('호실')) {
        return chatResponses.room101;
      } else if (input.includes('저항') || input.includes('힘')) {
        return chatResponses.room101;
      } else if (input.includes('목적') || input.includes('오브라이언')) {
        return chatResponses.room101;
      }
    } else if (currentProgress <= 100) {
      if (input.includes('결말') || input.includes('마지막')) {
        return chatResponses.ending;
      } else if (input.includes('사랑') || input.includes('사라')) {
        return chatResponses.ending;
      } else if (input.includes('선택') || input.includes('가능')) {
        return chatResponses.ending;
      }
    }

    // 완료 후 메타 질문들
    if (input.includes('교훈') || input.includes('의미')) {
      return chatResponses.lesson;
    }

    return chatResponses.default;
  };

  const handleOptionClick = (option: string, messageId: string) => {
    // 해당 메시지에 선택된 옵션 표시
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, selectedOption: option, hasOptions: false }
        : msg
    ));
    
    addUserMessage(option);
    
    setTimeout(() => {
      const responseData = getProgressiveResponse(option, currentProgress);
      addWinstonMessage(responseData);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Enhanced Progress Bar Section */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between items-center">
          <Button 
            onClick={() => window.location.reload()} 
            variant="ghost" 
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            처음으로 돌아가기
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setShowGallery(!showGallery)}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <Image className="w-4 h-4 mr-2" />
              삽화 갤러리 ({illustrations.length})
            </Button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <BookOpen className="w-4 h-4" />
              <span>윈스턴의 이야기</span>
            </div>
          </div>
        </div>
        
        {/* Main Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">이야기 진행도</span>
            <span className="text-white font-medium">{currentProgress}%</span>
          </div>
          <Progress 
            value={currentProgress} 
            className="h-3 bg-gray-800"
          />
          <div className="text-xs text-gray-500 text-center">
            {currentProgress === 0 && "이야기가 시작됩니다..."}
            {currentProgress > 0 && currentProgress <= 25 && "운명적인 만남"}
            {currentProgress > 25 && currentProgress <= 50 && "비밀스러운 사랑"}
            {currentProgress > 50 && currentProgress <= 75 && "위험한 반항"}
            {currentProgress > 75 && currentProgress <= 90 && "절망적인 고문"}
            {currentProgress > 90 && currentProgress < 100 && "마지막 순간"}
            {currentProgress === 100 && "이야기 완료"}
          </div>
        </div>
      </div>

      {/* Illustration Gallery */}
      {showGallery && (
        <div className="mb-6">
          <IllustrationGallery illustrations={illustrations} />
        </div>
      )}

      <Card className="h-[70vh] bg-gray-900/50 border-gray-700 backdrop-blur-sm">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onOptionClick={handleOptionClick}
              />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">W</span>
                </div>
                <div className="bg-gray-800 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
