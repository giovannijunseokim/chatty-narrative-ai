
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft } from 'lucide-react';
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
  const [showTextInput, setShowTextInput] = useState(true);
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
    setShowTextInput(false);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: responseData.text,
        isUser: false,
        timestamp: new Date(),
        imageUrl: responseData.imageUrl,
        hasOptions: true,
        options: responseData.options
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
    setShowTextInput(false);

    // 사용자 입력에 따른 응답 로직
    setTimeout(() => {
      let responseData = chatResponses.default;

      if (userInput.includes('이야기') || userInput.includes('시작') || userInput.includes('처음')) {
        responseData = chatResponses.storyStart;
      } else if (userInput.includes('줄리아') || userInput.includes('사랑')) {
        responseData = chatResponses.julia;
      } else if (userInput.includes('빅브라더') || userInput.includes('감시') || userInput.includes('당')) {
        responseData = chatResponses.bigBrother;
      } else if (userInput.includes('진실부') || userInput.includes('일') || userInput.includes('기록')) {
        responseData = chatResponses.ministryOfTruth;
      } else if (userInput.includes('증오') || userInput.includes('2분')) {
        responseData = chatResponses.twoMinutesHate;
      } else if (userInput.includes('101') || userInput.includes('배신')) {
        responseData = chatResponses.room101;
      } else if (userInput.includes('끝') || userInput.includes('결말')) {
        responseData = chatResponses.ending;
      }

      addWinstonMessage(responseData);
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    setShowTextInput(false);
    
    setTimeout(() => {
      let responseData = chatResponses.default;
      
      // 선택지별 세분화된 응답
      if (option.includes('처음부터') || option.includes('이야기를')) {
        responseData = chatResponses.storyStart;
      } else if (option.includes('다른 생각')) {
        responseData = chatResponses.differentThoughts;
      } else if (option.includes('진실부에서')) {
        responseData = chatResponses.ministryOfTruth;
      } else if (option.includes('1984년의 세상') || option.includes('1984년 세상')) {
        responseData = chatResponses.bigBrother;
      } else if (option.includes('빅브라더')) {
        responseData = chatResponses.bigBrother;
      } else if (option.includes('승리 맨션')) {
        responseData = {
          text: "승리 맨션... 그곳은 제가 살던 곳이지만 승리와는 거리가 먼 곳이었어요. 낡고 더러운 건물에서 항상 양배추 끓는 냄새가 났죠. 엘리베이터는 늘 고장이고, 각 층마다 빅브라더의 시선이 따라다녔습니다.",
          options: ["그곳에서 어떤 일상을 보내셨나요?", "다른 주민들과의 관계는 어땠나요?", "일기는 어디서 쓰셨나요?"]
        };
      } else if (option.includes('줄리아는 어떤')) {
        responseData = {
          text: "줄리아는... 겉으로는 당에 충성하는 모범적인 당원처럼 보였어요. 반성연맹 활동도 열심히 하고, 빅브라더를 찬양하는 구호도 큰 소리로 외쳤죠. 하지만 실제로는 저보다도 더 반항적인 정신을 가진 사람이었습니다.",
          options: ["그녀의 진짜 모습은 어땠나요?", "어떻게 서로의 정체를 알게 되었나요?", "함께한 시간 중 가장 기억에 남는 순간은?"]
        };
      } else if (option.includes('2분간의 증오')) {
        responseData = chatResponses.twoMinutesHate;
      } else if (option.includes('101호실')) {
        responseData = chatResponses.room101;
      } else if (option.includes('빅브라더를 사랑')) {
        responseData = {
          text: "그것이 가장 무서운 부분이에요... 저는 정말로 빅브라더를 사랑하게 되었습니다. 그것이 진심인지 강요당한 것인지 구분할 수 없을 정도로요. 101호실에서 나온 후, 제 마음 속의 모든 저항이 사라졌어요.",
          options: ["그 변화가 진짜였나요?", "저항할 방법은 정말 없었을까요?", "다시 돌아간다면 어떻게 하시겠어요?"]
        };
      } else if (option.includes('교훈')) {
        responseData = {
          text: "이 이야기에서 얻을 수 있는 교훈... 자유와 진실이 얼마나 소중한지, 그리고 그것들이 얼마나 쉽게 사라질 수 있는지를 보여주는 것 같아요. 사랑조차 통제당할 수 있는 세상에서, 우리는 무엇을 지켜야 할까요?",
          options: ["현재 우리 세상과 비교하면 어떤가요?", "가장 중요한 메시지는 무엇인가요?", "희망은 정말 없는 건가요?"]
        };
      }
      
      addWinstonMessage(responseData);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const enableTextInput = () => {
    setShowTextInput(true);
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
          
          <div className="p-4 border-t border-gray-700">
            {showTextInput ? (
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
            ) : (
              <Button 
                onClick={enableTextInput}
                variant="outline"
                className="w-full bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                직접 질문하기
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
