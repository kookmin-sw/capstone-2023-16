import { useMediaQuery } from 'react-responsive';
import ProfileCard from '../components/commons/ProfileCard';

const PersonaChoice = () => {
    const isPC = useMediaQuery({
        query : "(min-width:900px)"
    });
    const small = useMediaQuery({
        query: "(min-width:450px) and (max-width:899px)"
    })

    let type = "";
    if (isPC){
        type = 'big';
    }else if(small){
        type = 'small';
    }else{
        type = 'min';
    }

    return(
        <div>
            <ProfileCard src='' name='홍현지' id='hongs_0430' widthType={type} usageType='choice'/>
        </div>
    )
} ;

export default PersonaChoice;