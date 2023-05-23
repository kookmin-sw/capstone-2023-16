const getHost = () => {
  if (process.env.NODE_ENV !== 'development') {
    return "https://api.postona.xyz/graphql";
  } else {
    return "http://localhost:8000/graphql"
  }
};

export default getHost;