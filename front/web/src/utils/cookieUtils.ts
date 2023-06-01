import { Cookies } from 'react-cookie';

const EXPIRED_DAYS = 14;

const cookies = new Cookies();

export const setCookie = (name: string, value: string, expires?: boolean) => {
	let domain = "localhost";
	if (process.env.NODE_ENV !== 'development') {
		domain = ".postona.xyz";
	}
	const date = new Date();
	date.setTime(date.getTime() + (EXPIRED_DAYS* 24 * 60 * 60 * 1000));
	document.cookie = `${name}=${value};domain=${domain}${expires?`;expires=${date.toUTCString()};path = /;`:''}`;
	//cookies.set(name, value, { ...options, domain: domain });
	console.log(`${name}=${value};domain=${domain}${expires?`;expires=${date.toUTCString()};path = /;`:''}`);
};

export const getCookie = (name: string) => {
	return cookies.get(name);
};

export const removeCookie = (name: string) => {
	return cookies.remove(name);
};
