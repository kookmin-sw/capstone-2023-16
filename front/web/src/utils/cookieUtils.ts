export function getCookie(key: string) {
  const cookieString = document.cookie.split(';').filter(c => c.split('=')[0].trim() === key);
  const value = cookieString[0]?.split('=')[1];
  return value ? value : null;
};

export function setCookie(key:string, value:string, expiration_date:number) {
  const expired = new Date();
  expired.setTime(expired.getTime() + expiration_date * 24 * 60 * 60 * 1000);
  try {
    document.cookie = `${[key]}=${value}; expires=${expired};`
  } catch (e) {
    console.log(e);
  }
};
