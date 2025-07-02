
export interface Character {
  id: string;
  name: string;
  avatar: string;
  description: string;
  role: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  genre: string;
  thumbnail: string;
  characters: Character[];
}

export const stories: Story[] = [
  {
    id: "1984",
    title: "1984",
    description: "조지 오웰의 디스토피아 소설",
    genre: "소설",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    characters: [
      {
        id: "winston",
        name: "윈스턴 스미스",
        avatar: "W",
        description: "진실부에서 일하는 39세 남성, 체제에 의문을 품고 있다",
        role: "주인공"
      },
      {
        id: "julia",
        name: "줄리아",
        avatar: "J",
        description: "윈스턴의 연인, 반항적이고 자유로운 영혼",
        role: "연인"
      }
    ]
  },
  {
    id: "parasite",
    title: "기생충",
    description: "봉준호 감독의 아카데미상 수상작",
    genre: "영화",
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop",
    characters: [
      {
        id: "kitaek",
        name: "김기택",
        avatar: "기",
        description: "반지하에 사는 가족의 가장, 계획이 있다고 말하지만...",
        role: "아버지"
      },
      {
        id: "chungsook",
        name: "충숙",
        avatar: "충",
        description: "김기택의 아내, 현실적이고 강인한 어머니",
        role: "어머니"
      }
    ]
  },
  {
    id: "squid-game",
    title: "오징어 게임", 
    description: "생존을 위한 극한의 게임",
    genre: "드라마",
    thumbnail: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=300&fit=crop",
    characters: [
      {
        id: "gihun",
        name: "성기훈",
        avatar: "기",
        description: "456번 참가자, 딸을 위해 게임에 참여한 아버지",
        role: "주인공"
      },
      {
        id: "sangwoo",
        name: "조상우",
        avatar: "상",
        description: "218번 참가자, SNU 출신 증권맨",
        role: "친구"
      }
    ]
  },
  {
    id: "kingdom",
    title: "킹덤",
    description: "조선시대 좀비 아포칼립스",
    genre: "드라마",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    characters: [
      {
        id: "changgun",
        name: "이창",
        avatar: "창",
        description: "조선의 세자, 역병의 진실을 찾아 나선다",
        role: "세자"
      },
      {
        id: "seungui",
        name: "서비",
        avatar: "서",
        description: "의녀, 역병에 대한 비밀을 알고 있다",
        role: "의녀"
      }
    ]
  },
  {
    id: "avengers",
    title: "어벤져스: 엔드게임",
    description: "마블 시네마틱 유니버스의 대미를 장식하는 영화",
    genre: "영화",
    thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=300&fit=crop",
    characters: [
      {
        id: "tony",
        name: "토니 스타크",
        avatar: "T",
        description: "아이언맨, 천재 발명가이자 어벤져스의 핵심 멤버",
        role: "히어로"
      },
      {
        id: "steve",
        name: "스티브 로저스",
        avatar: "S",
        description: "캡틴 아메리카, 어벤져스의 리더",
        role: "히어로"
      }
    ]
  }
];
