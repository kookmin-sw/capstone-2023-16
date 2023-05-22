export type PersonaListType = Root[]

export interface Root {
  node: Node
}

export interface Node {
  id: string
  nickname: string
}
