
import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
  hasOptions?: boolean;
  options?: string[];
  selectedOption?: string;
  characterAvatar?: string;
  characterName?: string;
}

interface ChatMessageProps {
  message: Message;
  onOptionClick: (option: string, messageId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick }) => {
  // Split long text into paragraphs for better readability
  const formatText = (text: string) => {
    return text.split('\n').filter(paragraph => paragraph.trim()).map(paragraph => paragraph.trim());
  };

  // Get character-specific colors
  const getCharacterColors = (characterName?: string) => {
    const colorMap: { [key: string]: { bg: string; accent: string } } = {
      '윈스턴 스미스': { bg: 'bg-slate-700', accent: 'border-l-blue-400' },
      '오브라이언': { bg: 'bg-red-900/50', accent: 'border-l-red-400' },
      '기택': { bg: 'bg-yellow-800/50', accent: 'border-l-yellow-400' },
      '박사장': { bg: 'bg-purple-800/50', accent: 'border-l-purple-400' },
      '성기훈': { bg: 'bg-pink-800/50', accent: 'border-l-pink-400' },
      '조상우': { bg: 'bg-indigo-800/50', accent: 'border-l-indigo-400' },
      '이창': { bg: 'bg-green-800/50', accent: 'border-l-green-400' },
      '서비': { bg: 'bg-orange-800/50', accent: 'border-l-orange-400' },
      '토니 스타크': { bg: 'bg-red-800/50', accent: 'border-l-red-400' },
      '스티브 로저스': { bg: 'bg-blue-800/50', accent: 'border-l-blue-400' }
    };
    
    return colorMap[characterName || ''] || { bg: 'bg-gray-800', accent: 'border-l-gray-400' };
  };

  if (message.isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="flex items-end space-x-3 max-w-[85%]">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-sm px-5 py-4 shadow-lg">
            {formatText(message.text).map((paragraph, index) => (
              <p key={index} className="leading-relaxed text-base">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md mb-1">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    );
  }

  const colors = getCharacterColors(message.characterName);

  return (
    <div className="flex justify-start mb-8">
      <div className="flex items-start space-x-4 max-w-[90%]">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg mt-2 flex-shrink-0">
          <span className="text-white text-lg font-bold">
            {message.characterAvatar || 'W'}
          </span>
        </div>
        
        <div className="space-y-4 flex-1">
          {message.characterName && (
            <div className="text-sm font-semibold text-gray-300 mb-2 px-1">
              {message.characterName}
            </div>
          )}
          
          <div className={`${colors.bg} ${colors.accent} border-l-4 text-white rounded-2xl rounded-tl-sm px-6 py-5 shadow-lg backdrop-blur-sm`}>
            <div className="space-y-3">
              {formatText(message.text).map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-base whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {message.imageUrl && (
            <div className="rounded-xl overflow-hidden shadow-xl mt-4">
              <img 
                src={message.imageUrl} 
                alt="Story illustration" 
                className="w-full h-56 object-cover"
              />
            </div>
          )}
          
          {/* Show selected option as a card */}
          {message.selectedOption && (
            <div className="mt-4">
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl px-5 py-3 backdrop-blur-sm">
                <div className="text-xs text-blue-300 font-medium mb-1">선택한 답변:</div>
                <div className="text-blue-100 text-base leading-relaxed">{message.selectedOption}</div>
              </div>
            </div>
          )}
          
          {/* Show options only if not selected yet and hasOptions is true */}
          {message.hasOptions && !message.selectedOption && message.options && (
            <div className="space-y-3 mt-6">
              <div className="text-xs text-gray-400 font-medium mb-3 px-1">답변을 선택하세요:</div>
              {message.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => onOptionClick(option, message.id)}
                  variant="outline"
                  className="w-full text-left justify-start bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 text-base py-4 px-5 rounded-xl leading-relaxed min-h-[56px] backdrop-blur-sm"
                >
                  <span className="text-gray-300 mr-3 font-bold">{index + 1}.</span>
                  <span className="flex-1">{option}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
