import styled from "styled-components";

interface buttonContent {
    devicetype?: string,
    text?:string,
}

const Btn = styled.button<{devicetype?:string}>`
    padding-left: ${(props) => {return (props.devicetype==='mobile')?'11px': '22px'}};
    padding-right: ${(props) => {return (props.devicetype==='mobile')?'11px': '22px'}};
    height: ${(props) => {return (props.devicetype==='mobile')?'23px': '46px'}};
    border-radius: ${(props) => {return (props.devicetype==='mobile')?'5px': '10px'}};
    background-color: #ffffff;
    box-shadow: 0px 0.0694vw 0.4861vw 0px rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    border:none;
`;

const Text = styled.p<{devicetype?:string}>`
    font-size: ${(props) => {return (props.devicetype==='mobile')?'12px': '24px'}};
    line-height: ${(props) => {return (props.devicetype==='mobile')?'15.5px': '29px'}};
`;

const TextButton = ({text, devicetype}:buttonContent) => {
    return(
        <Btn devicetype={devicetype}>
            <Text devicetype={devicetype}>{text}</Text>
        </Btn>
    )
}

export default TextButton;
