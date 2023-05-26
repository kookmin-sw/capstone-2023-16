export function debounce(callback: () => any) {
  let timer = null;

  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    console.log('debounce 호출');
    callback();
  }, 200);
};

let timer: NodeJS.Timeout | null = null;
export function throttle(callback: () => any) {
  if (!timer) {
    timer = setTimeout(function() {
      timer = null;
      callback();
    }, 500);
  }
};