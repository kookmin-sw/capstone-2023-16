export type routeProps = {
  key: string;
  title: string;
};

export type sceneMapProps = {
  [key: string]: React.ComponentType<{}>;
};
