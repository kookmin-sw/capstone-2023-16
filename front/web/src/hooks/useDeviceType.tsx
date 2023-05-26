import { useMediaQuery } from 'react-responsive';

const useDeviceType = () => {
  let deviceType = 'mobile';

  const desktop = useMediaQuery({
    query: "(min-width:1280px)"
  });
  const tablet = useMediaQuery({
    query: "(min-width:744px) and (max-width:1279px)"
  });
  const mobile = useMediaQuery({
    query: "(max-width:743px)"
  })

  if (desktop) {
    deviceType = 'desktop';
  } else if (tablet) {
    deviceType = 'tablet';
  } else if(mobile){
    deviceType = 'mobile';
  }

  return deviceType;
};

export default useDeviceType;