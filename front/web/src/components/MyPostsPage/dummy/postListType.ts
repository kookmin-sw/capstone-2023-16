export type PostListType = Root[];

export interface Root {
  node: Node;
};

export interface Node{
  id: string
  title: string
  content: string
  createdAt: Date
};