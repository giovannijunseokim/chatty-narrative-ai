
import { useEffect, useRef } from 'react';

export const useBackgroundMusic = (storyId: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicMap: { [key: string]: string } = {
    '1984': 'https://www.soundjay.com/misc/sounds/dystopian-ambient.mp3',
    'parasite': 'https://www.soundjay.com/misc/sounds/tension-ambient.mp3',
    'squid-game': 'https://www.soundjay.com/misc/sounds/suspense-ambient.mp3',
    'kingdom': 'https://www.soundjay.com/misc/sounds/horror-ambient.mp3',
    'avengers': 'https://www.soundjay.com/misc/sounds/epic-ambient.mp3'
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const musicUrl = musicMap[storyId];
    if (musicUrl) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // 자동재생 실패 시 무시 (브라우저 정책)
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [storyId]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return { toggleMusic };
};
