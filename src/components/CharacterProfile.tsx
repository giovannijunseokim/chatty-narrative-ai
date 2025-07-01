
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User, MapPin, Briefcase } from 'lucide-react';

const CharacterProfile = () => {
  return (
    <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-300" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">윈스턴 스미스</h3>
            <p className="text-gray-400">진실부 기록과 직원</p>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin className="w-4 h-4 text-red-400" />
            <span>오세아니아, 런던</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Briefcase className="w-4 h-4 text-orange-400" />
            <span>역사 기록 수정 업무</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
          <p className="text-xs text-gray-400 italic">
            "진실부에서 일하며 과거의 기록을 바꾸는 일을 하고 있습니다. 
            하지만 내 마음 속에는 당이 허용하지 않는 생각들이..."
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterProfile;
