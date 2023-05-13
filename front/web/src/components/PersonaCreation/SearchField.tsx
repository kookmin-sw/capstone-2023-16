import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import TextField from './TextField';
import styled from 'styled-components';

const SearchField = () => {
  return <Container>
    <TextField fieldname='asdf' />
    <SearchIcon style={{marginLeft: '13px'}} />
  </Container>
};

export default SearchField;

const Container = styled.div`
  display: flex;
  margin: -20px -20px;
  padding: 40px 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`