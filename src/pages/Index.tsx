
import React, { useState, useRef, useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';
import CharacterProfile from '../components/CharacterProfile';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [chatStarted, setChatStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {!chatStarted ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-fade-in">
                대화형 스토리텔링
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                AI 캐릭터와 함께하는 몰입감 있는 소설 경험
              </p>
              <p className="text-gray-400">
                윈스턴 스미스와 대화하며 1984의 세계를 탐험해보세요
              </p>
            </div>
            
            <CharacterProfile />
            
            <Button 
              onClick={() => setChatStarted(true)}
              className="px-8 py-3 text-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              대화 시작하기
            </Button>
          </div>
        ) : (
          <ChatInterface />
        )}
      </div>
    </div>
  );
};

export default Index;
