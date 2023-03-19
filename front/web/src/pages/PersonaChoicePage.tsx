import useDeviceType from '../hooks/useDeviceType';
import styled from 'styled-components';
import WHcal from '../utils/WHcal';
import ContentLayout from '../components/commons/ContentLayout';
import PersonaList from '../components/PersonaChoice/PersonaList';

const PersonaChoice = () => {
    const deviceType = useDeviceType();

    return (<ContentLayout>            
            <PersonaChoiceContainer>
                <PersonaChoiceTitle widthType={deviceType}>페르소나 선택</PersonaChoiceTitle>
                <PersonaList />
            </PersonaChoiceContainer>
        </ContentLayout>
    )
} ;

export default PersonaChoice;

const PersonaChoiceContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const PersonaChoiceTitle = styled.div<{ widthType: string }>`
    font-size: ${(props) => { return `${WHcal(props.widthType!, 30)}}` }};
    font-weight: 700;
`;
