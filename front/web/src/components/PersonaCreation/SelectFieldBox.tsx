import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';

type SelectFieldBox = {
  fieldname: string,
  label: string,
  labelsAndValues: { label: string, value: string }[]
  onSave: (e:any) => void
}

const SelectFieldBox = ({ fieldname, label, labelsAndValues, onSave }: SelectFieldBox) => {
  const form: any = useSelector((state: RootState) => state.newPersona);
  
  return <Container>
      <label htmlFor={fieldname} className='field__label'>{label}</label>
      <Select id={fieldname} className='field__container' name={fieldname} onChange={onSave} defaultValue={form[fieldname]}>
        <option value="">---직업 선택---</option>  
        {
          labelsAndValues.map((e => (
            <option value={e.value}>{e.label}</option>  
          )))
        }
      </Select>
  </Container>
};

export default SelectFieldBox;

const Container  = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: 7px 20px;
`