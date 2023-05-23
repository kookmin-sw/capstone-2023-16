export type routeProps = {
  key: string;
  title: string;
  isMine?: boolean;
  followingList?: any;
  followerList?: any;
  persona_id?: any;
  data?: any;
  persona_nick?: any;
};

export type sceneMapProps = {
  [key: string]: React.ComponentType<{}>;
};
