const useThrottle = (callback:()=>void) => {
  let throttle:any = null;

  const onThrottle = () => {
    if (throttle) return;
    else {
      throttle = setTimeout(() => {
        callback();
      }, 300);
    }
  }

  return onThrottle;
}

export default useThrottle;