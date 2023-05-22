export type PostType = {
  title: string,
  content: string,
  createdAt?: string,
  likeCnt?: number,
  bookmarkCnt?: number,
  tags?:{
    edges: [
      node: {
        body: string
      }
    ]
  },
  category?: {body:string},
  author?: { nickname: string, id: string },
  commentCnt?: number,
  comments?:{
    id: string,
    body: string,
    createdAt: string,
    persona: {
      id:string,
      nickname: string,
    }
  }
};

export type PostCreationType = {
  title: string,
  content: string,
  paidContent: string,
  tagbodies: string[],
  category?: { id: string },
};

export type PostCreationEdgeType = {
  cursor: string
  node: PostCreationType
};
