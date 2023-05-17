import styled from 'styled-components';
import { ReactComponent as CheckedIcon } from '../../assets/icons/checked.svg';
import { ReactComponent as UnCheckedIcon } from '../../assets/icons/unchecked.svg';
import useDeviceType from '../../hooks/useDeviceType';

type AccountCheckBoxType = {
  checked: boolean,
  onChange: () => void,
};

const AccountCheckBox = ({ checked, onChange }: AccountCheckBoxType) => {
  const deviceType = useDeviceType();

  return <Container className='field__container' htmlFor='term' deviceType={deviceType}>
    <input id='term' type='checkbox' onChange={onChange}/>
    {checked ?
      <CheckedIcon style={{ width: '20px' }} />
      : <UnCheckedIcon style={{ width: '20px' }} />
  }
    <span>&nbsp;이용약관</span>
  </Container>
}

export default AccountCheckBox;

const Container = styled.label<{deviceType: string}>`
  width: ${(props) => { return props.deviceType === 'mobile'? '100%': '464px' }};
  height: ${(props) => { return props.deviceType === 'mobile'? '40px': '45px' }};
  display: flex;
  padding: 7px 20px;
  margin-top: 9px;
  padding-right: 10px;
  border-radius: 10px;
  font-size: ${(props) => { return props.deviceType === 'mobile'? '16px': '20px'}};
  font-weight: 700; 
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  & input {
    display: none;
  }
`;
