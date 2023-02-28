const WHcal = (widthType:string, num:number) =>{
    return (widthType==='big')? (num!*100/1440).toString() + 'vw':((widthType==='small')? (num!*100/820).toString() + 'vw':((num!*100/820)*450/100).toString() + 'px');
};

export default WHcal;
