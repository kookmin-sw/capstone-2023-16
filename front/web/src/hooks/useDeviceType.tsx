import { useMediaQuery } from 'react-responsive';

const useDeviceType = () => {
  let deviceType = 'min';

  const isPC = useMediaQuery({
    query: "(min-width:900px)"
  });
  const small = useMediaQuery({
    query: "(min-width:450px) and (max-width:899px)"
  })

  if (isPC) {
    deviceType = 'big';
  } else if (small) {
    deviceType = 'small';
  }

  return deviceType;
};

export default useDeviceType;