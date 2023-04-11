
// GraphQl 
import { commitMutation, useMutation } from 'react-relay';
import environment from '../../RelayEnvironment';
import loginPostMutation from '../../graphQL/Mutations/loginPostMutation';
import logoutPostMutation from '../../graphQL/Mutations/logoutPostMutation';
import LoginFormType from '../../graphQL/types/LoginFormType';

class LoginAPI {
  public loginPost = (loginform: LoginFormType) => {

    return new Promise((resolve, reject) => {
      commitMutation(
        environment,
        {
          mutation: loginPostMutation,
          variables: loginform,
          onCompleted: (data) => {
            alert("로그인 되었습니다.");
            resolve(data);
          },
          onError: (error) => {
            alert(error.message);
          }
        });
    });
  };
  public logoutPost = () => {
    return () => useMutation(logoutPostMutation);
  }
}

export default LoginAPI;
