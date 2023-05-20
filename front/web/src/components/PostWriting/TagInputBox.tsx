import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { partialChange } from '../../redux/slices/newPostSlice';

type TagProps = {
  label: string,
  onRemove: (e:any)=>void,
};

type TagInputBoxProps = {
  submitFlag: boolean,
}

const Tag = ({ label, onRemove }: TagProps) => {
  return <TagSpan id={label} onClick={onRemove}>{label} &times; </TagSpan>
}

const TagInputBox = ({submitFlag}: TagInputBoxProps) => {
  const [taglist, setTaglist] = useState<string[]>([]);
  const refs = useRef<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (submitFlag && taglist.length > 0) {
      dispatch(partialChange({key:'tagBodies', value:taglist}));
    }
  }, [submitFlag]);

  useEffect(() => {
    refs.current[3].value = "";
  }, [taglist]);
  
  const onRemove = (e: any) => {
    console.log("onRemove!");
    setTaglist(taglist.filter(tag=> e.target.id !== tag));
  }

  function onAdd(e: any) {
    const { value } = e.target;
    console.log('onAdd!', value);
    if (e.key === "Enter"&&value !== "") {
      if( taglist.find((t)=>t===value) ){
        alert('이미 추가된 태그입니다.');
        return;
      }
      console.log(refs.current[3].value);
      setTaglist(prev=>[...prev, refs.current[3].value]);
    }
  };

  return <Container className="box" ref={ref => refs.current[0] = ref} onClick={()=>refs?.current[2].focus()}>
      <span className="innerBox" ref={ref => refs.current[2] = ref}>
      {taglist.map(label => <Tag key={label} label={label} onRemove={onRemove} />)}
      </span> 
      <Input type="text" ref={ref => refs.current[3] = ref} onKeyDown={onAdd} placeholder='태그'/>
    </Container>
};

export default TagInputBox;

const TagSpan = styled.span`
  display: inline-block;
  margin: 5px;
  padding: 5px;
  background-color: #D38CFF;
  color: #FFFFFF;
  border-radius: 5px;
  font-size: 18px;
  &:hover{
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  max-height: 90px;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 5px 10px;
  border-radius: 10px;
  overflow: auto;
`;

const Input = styled.input`
  width: 100% !important;
  height: auto;
  border: none;
  outline: none;
  padding: 5px;
  font-size: 18px;
`;