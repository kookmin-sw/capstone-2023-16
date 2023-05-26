import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
	let domain = "localhost";
	if (process.env.NODE_ENV !== 'development') {
		domain = ".postona.xyz";
	}
	document.cookie = `${name}=${value};domain=${domain}`;
	//cookies.set(name, value, { ...options, domain: domain });
};

export const getCookie = (name: string) => {
	return cookies.get(name);
};

export const removeCookie = (name: string) => {
	return cookies.remove(name);
};
