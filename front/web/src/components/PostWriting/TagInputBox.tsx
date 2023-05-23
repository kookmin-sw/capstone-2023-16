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
};

const Tag = ({ label, onRemove }: TagProps) => {
  return <span id={label} className='tag' onClick={onRemove}>{label} &times; </span>
};

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

  return <div className="tag__container" ref={ref => refs.current[0] = ref} onClick={()=>refs?.current[2].focus()}>
      <span ref={ref => refs.current[2] = ref}>
      {taglist.map(label => <Tag key={label} label={label} onRemove={onRemove} />)}
      </span> 
      <Input type="text" ref={ref => refs.current[3] = ref} onKeyDown={onAdd} placeholder='태그'/>
    </div>
};

export default TagInputBox;

const Input = styled.input`
  width: 100% !important;
  height: auto;
  border: none;
  outline: none;
  padding: 5px;
  font-size: 18px;
`;