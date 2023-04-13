import useDeviceType from '../hooks/useDeviceType';
import styled from 'styled-components';
import ContentLayout from '../components/commons/ContentLayout';
import PersonaList from '../components/PersonaChoice/PersonaList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from 'react';
import PersonaApiClient from '../api/Persona';

const PersonaChoice = () => {
    const deviceType = useDeviceType();
    const loggedInUser = useSelector((state: RootState) => state.user);

    //const personaConnection = useFragment(PersonasGetQuery, PersonaConnection);
    PersonaApiClient.personaListGet()
    console.log(document.cookie);
    
    useEffect(() => {
        console.log(loggedInUser);
    }, [])

    return (<ContentLayout>            
            <PersonaChoiceContainer>
                <PersonaChoiceHeader deviceType={deviceType}>페르소나 선택</PersonaChoiceHeader>
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

const PersonaChoiceHeader = styled.h2<{ deviceType: string }>`
    font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
    font-weight: 700;
`;
