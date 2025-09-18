type HNItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

export type HNArticle = {
  id: number;
  deleted: boolean;
  type: HNItemType;
  by: string;
  time: number; //unix timestamp
  text: string; //!html
  dead: boolean;
  parent?: number;
  poll?: number;
  kids: number[];
  url: string;
  score: number;
  title: string; //!html
  parts?: number[];
  descendants: number;
};

export type UIArticle = {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  score: number;
  url: string;
  number_of_comments: number;
};
