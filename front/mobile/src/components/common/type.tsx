interface tag {
  node: {
    body: string;
  };
}

export interface FeedProps {
  feed_id: string;
  title: string;
  author: string;
  author_id: string;
  author_img: string;
  content: string;
  like: number;
  bookmark: number;
  comment: number;
  hash_tag: Array<tag>;
}

export interface tagCategoryItem {
  id: string;
  text: string;
  state: boolean | undefined;
}
