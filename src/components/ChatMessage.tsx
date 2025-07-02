
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
}

interface ChatMessageProps {
  message: Message;
  onOptionClick: (option: string, messageId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick }) => {
  if (message.isUser) {
    return (
      <div className="flex justify-end">
        <div className="flex items-end space-x-2 max-w-[70%]">
          <div className="bg-red-600 text-white rounded-lg px-4 py-2">
            <p>{message.text}</p>
          </div>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="flex items-end space-x-2 max-w-[80%]">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">W</span>
        </div>
        <div className="space-y-2">
          <div className="bg-gray-800 text-white rounded-lg px-4 py-2">
            <p className="whitespace-pre-line">{message.text}</p>
          </div>
          
          {message.imageUrl && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={message.imageUrl} 
                alt="Story scene" 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          {/* Show selected option if exists */}
          {message.selectedOption && (
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg px-4 py-2">
              <p className="text-red-300 text-sm">선택됨: {message.selectedOption}</p>
            </div>
          )}
          
          {/* Show options only if not selected yet and hasOptions is true */}
          {message.hasOptions && !message.selectedOption && message.options && (
            <div className="space-y-2">
              {message.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => onOptionClick(option, message.id)}
                  variant="outline"
                  className="w-full text-left justify-start bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  {option}
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
