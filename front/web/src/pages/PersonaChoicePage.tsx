import useDeviceType from '../hooks/useDeviceType';
import ProfileCard from '../components/ProfileCard';

const PersonaChoice = () => {
    const deviceType = useDeviceType();

    return(
        <div>
            <ProfileCard src='' name='홍현지' id='hongs_0430' widthType={deviceType} usageType='choice'/>
        </div>
    )
} ;

export default PersonaChoice;