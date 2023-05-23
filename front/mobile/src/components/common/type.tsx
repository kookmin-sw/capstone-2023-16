export interface FeedProps {
    feed_id: number;
    title: string;
    author: string;
    author_id: string;
    author_img: string;
    content: string;
    like: number;
    bookmark: number;
    comment: number;
    hash_tag: string[];
    like_check: boolean;
    bookmark_check: boolean;
}

export interface tagItem {
    node: any;
    state: boolean|undefined;
}

