
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

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
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">아직 삽화가 없습니다. 이야기를 진행하면 삽화가 추가됩니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">이야기 삽화 갤러리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {illustrations.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={`Story illustration ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <Button
                onClick={() => downloadImage(imageUrl, index)}
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
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
