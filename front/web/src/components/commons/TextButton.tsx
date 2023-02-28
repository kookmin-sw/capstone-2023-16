import styled from "styled-components";

interface buttonContent {
    widthType?: string,
    text?:string,
}

const WHcal = (widthType:string, num:number) =>{
    return (widthType==='big')? (num!*100/1440).toString() + 'vw':((widthType==='small')? (num!*100/820).toString() + 'vw':((num!*100/820)*450/100).toString() + 'px');
}
const tmpWHcal = (widthType:string, num:number) =>{
    return (widthType==='big')? (num!*100/1440):((widthType==='small')? (num!*100/820):((num!*100/820)*450/100));
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
    console.log(tmpWHcal(widthType!, 30));
    console.log('====================================');
    return(
        <Btn widthType={widthType}>
            <Text widthType={widthType}>{text}</Text>
        </Btn>
    )
}

export default TextButton;
