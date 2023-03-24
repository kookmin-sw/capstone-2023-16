import useDeviceType from '../hooks/useDeviceType';
import styled from 'styled-components';
import ContentLayout from '../components/commons/ContentLayout';
import PersonaList from '../components/PersonaChoice/PersonaList';

const PersonaChoice = () => {
    const deviceType = useDeviceType();

    return (<ContentLayout>            
            <PersonaChoiceContainer>
                <PersonaChoiceTitle deviceType={deviceType}>페르소나 선택</PersonaChoiceTitle>
                <PersonaList />
            </PersonaChoiceContainer>
        </ContentLayout>
    )
};

export default PersonaChoice;

const PersonaChoiceContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const PersonaChoiceTitle = styled.div<{ deviceType: string }>`
    font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
    font-weight: 700;
`;
