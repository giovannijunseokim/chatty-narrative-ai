
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRatingSubmit: (rating: number, feedback: string) => void;
  storyTitle: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ 
  isOpen, 
  onClose, 
  onRatingSubmit, 
  storyTitle 
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onRatingSubmit(rating, feedback);
      onClose();
      setRating(0);
      setFeedback('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {storyTitle} 대화는 어떠셨나요?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">이야기에 대한 평점을 남겨주세요</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-colors"
                >
                  <Star 
                    className={`w-8 h-8 ${
                      star <= rating 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              추가 의견 (선택사항)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
              placeholder="이야기에 대한 소감을 자유롭게 남겨주세요..."
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              나중에
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              평점 제출
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
