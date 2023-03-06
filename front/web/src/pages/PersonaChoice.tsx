import useDeviceType from '../hooks/useDeviceType';
import ProfileCard from '../components/commons/ProfileCard';

const PersonaChoice = () => {
    const devicetype = useDeviceType();

    return(
        <div>
            <ProfileCard src='' name='홍현지' id='hongs_0430' devicetype={devicetype} usagetype='choice'/>
        </div>
    )
} ;

export default PersonaChoice;