import useDeviceType from '../hooks/useDeviceType';
import styled from 'styled-components';
import ContentLayout from '../components/commons/ContentLayout';
import PersonaList from '../components/MyPersonas/PersonaList';
import { useState } from 'react';
import SettingButton from '../components/MyPersonas/SettingButton';

const MyPersonasPage = () => {
    const deviceType = useDeviceType();
    const [mode, setMode] = useState('default');

    return (<ContentLayout>            
            <MyPersonasContainer>
            <MyPersonasHeader deviceType={deviceType}>
                <HeaderSpan deviceType={deviceType}>페르소나 선택</HeaderSpan>
                <SettingButton mode={mode} setMode={setMode} />
            </MyPersonasHeader>
            <PersonaList mode={mode} />
            </MyPersonasContainer>
        </ContentLayout>
    )
};

export default MyPersonasPage;

const MyPersonasContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const MyPersonasHeader = styled.div<{ deviceType: string }>`
    display: flex;
    justify-content: space-between;
`;

const HeaderSpan = styled.h2<{ deviceType: string }>`
    font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
    font-weight: 700;
`