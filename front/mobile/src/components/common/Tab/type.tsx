export type routeProps = {
  key: string;
  title: string;
  isMine?: boolean;
  followingList?: any;
  followerList?: any;
};

export type sceneMapProps = {
  [key: string]: React.ComponentType<{}>;
};
