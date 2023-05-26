import React from "react";
import styled from "styled-components";

interface buttonContent extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    deviceType?: string,
    text?:string,
}

const Btn = styled.button<{deviceType?:string}>`
    padding-left: ${(props) => {return (props.deviceType==='mobile')?'11px': '22px'}};
    padding-right: ${(props) => {return (props.deviceType==='mobile')?'11px': '22px'}};
    height: ${(props) => {return (props.deviceType==='mobile')?'23px': '46px'}};
    border-radius: ${(props) => {return (props.deviceType==='mobile')?'5px': '10px'}};
    background-color: #ffffff;
    box-shadow: 0px 0.0694vw 0.4861vw 0px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    border:none;
    &:hover{
        cursor: pointer;
    }
    &:active{
        cursor: default;
        background-color: lightgray;
    }
`;

const Text = styled.p<{deviceType?:string}>`
    font-size: ${(props) => {return (props.deviceType==='mobile')?'12px': '24px'}};
    line-height: ${(props) => {return (props.deviceType==='mobile')?'15.5px': '29px'}};
`;

const TextButton = ({text, deviceType, ...res}:buttonContent) => {
    return(
        <Btn deviceType={deviceType} {...res}>
            <Text deviceType={deviceType}>{text}</Text>
        </Btn>
    )
}

export default TextButton;
