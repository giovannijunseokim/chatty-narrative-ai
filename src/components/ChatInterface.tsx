
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Image, ArrowLeft } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { chatResponses } from '../data/chatResponses';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  hasOptions?: boolean;
  options?: string[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
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

  const addWinstonMessage = (text: string, imageUrl?: string, hasOptions?: boolean, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        isUser: false,
        timestamp: new Date(),
        imageUrl,
        hasOptions,
        options
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
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

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    addUserMessage(inputText);
    const userInput = inputText.toLowerCase();
    setInputText('');

    // 사용자 입력에 따른 응답 로직
    setTimeout(() => {
      let response = chatResponses.default;
      let imageUrl: string | undefined;
      let hasOptions = false;
      let options: string[] | undefined;

      if (userInput.includes('이야기') || userInput.includes('시작') || userInput.includes('처음')) {
        response = chatResponses.storyStart;
        imageUrl = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop";
      } else if (userInput.includes('줄리아') || userInput.includes('사랑')) {
        response = chatResponses.julia;
        imageUrl = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop";
      } else if (userInput.includes('빅브라더') || userInput.includes('감시') || userInput.includes('당')) {
        response = chatResponses.bigBrother;
        imageUrl = "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop";
      } else if (userInput.includes('진실부') || userInput.includes('일') || userInput.includes('기록')) {
        response = chatResponses.ministryOfTruth;
      } else if (userInput.includes('끝') || userInput.includes('결말')) {
        response = chatResponses.ending;
        hasOptions = true;
        options = ['다른 장면이 궁금해요', '윈스턴의 감정을 더 알고 싶어요', '새로운 이야기를 들어보고 싶어요'];
      } else if (userInput.includes('안녕') || userInput.includes('처음')) {
        response = chatResponses.greeting;
      }

      addWinstonMessage(response, imageUrl, hasOptions, options);
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    setTimeout(() => {
      let response = "그 부분에 대해 더 자세히 말씀드리죠...";
      
      if (option.includes('장면')) {
        response = chatResponses.additionalScenes;
      } else if (option.includes('감정')) {
        response = chatResponses.emotions;
      } else if (option.includes('새로운')) {
        response = "다른 이야기도 언젠가 들려드릴 수 있을 것 같습니다. 지금은 제 이야기에 대해 더 궁금한 것이 있으신가요?";
      }
      
      addWinstonMessage(response);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Button 
          onClick={() => window.location.reload()} 
          variant="ghost" 
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          처음으로 돌아가기
        </Button>
      </div>

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
                  W
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
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="윈스턴에게 무엇을 물어보고 싶나요?"
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-red-600 hover:bg-red-700"
                disabled={!inputText.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
