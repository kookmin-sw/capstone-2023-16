import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type TagProps = {
  tmp: string,
  onRemove: (e:any)=>void,
};

const Tag = ({ tmp, onRemove }: TagProps) => {
  const tagRef = useRef<HTMLSpanElement>(null);

  if (tagRef.current) {
    tagRef.current.innerHTML = tmp;
  }

  return <span className='tag' ref={tagRef} onClick={onRemove}></span>
}

let template = (tag: string) => `<span class="tag"><span>${tag}</span><span class="close">&times;</span></span>`;

const TagInput = () => {
  const [taglist, setTaglist] = useState<string[]>([]);
  const [tmp, setTmp] = useState<string>('')
  const refs = useRef<any[]>([])
  
  useEffect(() => {
    taglist.forEach(tag => {
      setTmp(prev => `${prev}${template(tag)}`);
    });
    console.log(tmp);
  }, [taglist]);

  const onRemove = (e: any) => {
    console.log("onRemove!");
    
    let {target} = e;
    let textNode = target.previousElementSibling.innerText.trim();
    if(target.tagName === "SPAN" && target.className === "close"){
        setTaglist(taglist.filter(tag=> textNode !== tag));
    }
  }

  function onAdd(e: any) {
    console.log(e.target.value);
    if (e.target.value!==""&&e.key === "Enter") {
      console.log("onAdd!");
      console.log(refs.current[3].value);
      setTaglist(prev=>[...prev, refs.current[3].value]);
      refs.current[3].value = "";
    }
  }

  return <Box className="box" ref={ref => refs.current[0] = ref} onClick={()=>refs?.current[2].focus()}>
      <span className="innerBox" ref={ref => refs.current[2] = ref}>
        <Tag tmp={tmp} onRemove={onRemove} />
      </span> 
      <Input type="text" style={{ width: '5rem' }} ref={ref => refs.current[3] = ref} onKeyDown={onAdd} />
    </Box>
};

export default TagInput;

const Box = styled.div`
width: 100%;
  border: 1px solid rgba(0,0,0,0.2);
  padding: .3rem;
  border-radius: 0.3rem;
  -webkit-border-radius: 0.3rem;
  -moz-border-radius: 0.3rem;
  -ms-border-radius: 0.3rem;
  -o-border-radius: 0.3rem;
`
const Input = styled.input`
  width: 100% !important;
  border: none;
  outline: none;
  height: 2rem;
  padding: .3rem;
  font-size: 1rem;
`;