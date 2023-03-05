const WHcal = (widthtype:string, num:number) =>{
    return ((widthtype==='big')? (num!*100/1440).toString() + 'vw':((widthtype==='small')? (num!*100/820).toString() + 'vw':((num!*100/820)*450/100).toString() + 'px'));
};

const Hcal = (num:number) => {
    return ((num!*100/1024).toString());
}

const Fcal = (num: number) => {
    return ((num!*0.0625).toString());
}

export {WHcal, Hcal, Fcal};
