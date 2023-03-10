import styled from "styled-components";
import WHcal from '../../utils/WHcal';

interface buttonContent {
    widthType?: string,
    text?:string,
}

const Btn = styled.button<{widthType?:string}>`
    padding-left: ${(props)=>{return WHcal(props.widthType!, 22)}};
    padding-right: ${(props)=>{return WHcal(props.widthType!, 22)}};
    height: ${(props)=>{return WHcal(props.widthType!, 46)}};
    border-radius: ${(props)=>{return WHcal(props.widthType!, 10)}};
    background-color: #ffffff;
    box-shadow: 0px ${(props)=>{return WHcal(props.widthType!, 1)}} ${(props)=>{return WHcal(props.widthType!, 7)}} 0px rgba(0,0,0,0.25);
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

const Text = styled.p<{widthType?:string}>`
    font-size: ${(props) => {return WHcal(props.widthType!, 24)}};
    line-height: ${(props)=>{return WHcal(props.widthType!, 29.05)}};
`;

const TextButton = ({text, widthType}:buttonContent) => {
    console.log('====================================');
    console.log(WHcal(widthType!, 30));
    console.log('====================================');
    console.log('====================================');
    return(
        <Btn widthType={widthType}>
            <Text widthType={widthType}>{text}</Text>
        </Btn>
    )
}

export default TextButton;
