
// GraphQl 
import { commitMutation } from 'react-relay';
import environment from '../../RelayEnvironment';
import loginPostMutation from '../../graphQL/Mutations/loginPostMutation';
import logoutPostMutation from '../../graphQL/Mutations/logoutPostMutation';
import LoginFormType from '../../graphQL/types/LoginFormType';
import registerMutation from '../../graphQL/Mutations/registerMutation';

class AccountAPI {
  public loginPost = (loginform: LoginFormType) => {

    return new Promise((resolve, reject) => {
      commitMutation(
        environment,
        {
          mutation: loginPostMutation,
          variables: loginform,
          onCompleted: (data) => {
            resolve(data);
          },
          onError: (error) => {
            alert(error.message);
          }
        });
    });
  };

  public logoutPost = () => {
    return new Promise((resolve, reject) => {
      commitMutation(
        environment,
        {
          mutation: logoutPostMutation,
          variables: {},
          onCompleted: (data) => {
            resolve(data);
          }
        }
      );
    })
  };

  public register = (username:string, email: string, password: string, ) => {
    return new Promise((resolve, reject) => {
      commitMutation(
        environment,
        {
          mutation: registerMutation,
          variables: {
            username,
            password,
            email
          },
          onCompleted: (data) => {
            alert("성공적으로 회원가입하였습니다.");
            resolve(data);
          },
          onError: (error) => {
            alert(error.message);
          }
        });
    });
  }
}

export default AccountAPI;
