// App.js
import React from 'react';
import LoginAPI from './graphQL/LoginAPI';

const TempQuery = () => {
  const username = "chaem";
  const password = "asdf";

  const [commit, setCommit ] = LoginAPI.loginPost();

  const onClick = () => {
    commit({
      variables: {
        username,
        password,
      },
      onCompleted(data: any) {
        console.log(data);
      },
    });
  }

  return (
    <div>
      <button onClick={onClick}>post 요청 연습</button>
    </div>
  );
};

export default TempQuery;

function commit(arg0: { variables: { username: string; password: string; }; onCompleted(data: any): void; }) {
  throw new Error('Function not implemented.');
}
