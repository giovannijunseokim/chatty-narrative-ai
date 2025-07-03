
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon } from 'lucide-react';

interface IllustrationGalleryProps {
  illustrations: string[];
}

const IllustrationGallery: React.FC<IllustrationGalleryProps> = ({ illustrations }) => {
  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `winston-story-illustration-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
    }
  };

  if (illustrations.length === 0) {
    return (
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-8 text-center space-y-4">
          <ImageIcon className="w-16 h-16 text-gray-500 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-300">삽화가 아직 생성되지 않았습니다</h3>
            <p className="text-gray-400">
              이야기를 진행하면서 중요한 장면마다 AI가 생성한 삽화가 여기에 모입니다.
            </p>
            <p className="text-gray-500 text-sm">
              💡 각 삽화는 다운로드 버튼으로 저장할 수 있어요!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <ImageIcon className="w-5 h-5 mr-2" />
          이야기 삽화 갤러리
          <span className="ml-2 text-sm font-normal text-gray-400">({illustrations.length}개)</span>
        </CardTitle>
        <p className="text-gray-400 text-sm">
          이야기 진행 중 생성된 장면 삽화들을 모아볼 수 있습니다. 각 이미지를 클릭하면 크게 볼 수 있어요.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {illustrations.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-600">
                <img 
                  src={imageUrl} 
                  alt={`Story illustration ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
                  onClick={() => window.open(imageUrl, '_blank')}
                />
              </div>
              <Button
                onClick={() => downloadImage(imageUrl, index)}
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                title="이미지 다운로드"
              >
                <Download className="w-3 h-3" />
              </Button>
              <p className="text-xs text-gray-400 mt-2 text-center">삽화 {index + 1}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IllustrationGallery;
