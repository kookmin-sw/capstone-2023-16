import React, {FC, useEffect, useState} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {ChallengeCardItem} from './ChallengeCardItem';

const CardList = styled.FlatList`
  width: 100%;
  flex: 1;
  padding-left: 25px;
  padding-bottom: 15px;
`;

import {useLazyLoadQuery} from 'react-relay';
import {ChanllengeGet} from '../../../graphQL/Challenge/ChallengeGet';
import {MyChanllengeGet} from '../../../graphQL/Challenge/MyChallengeGet';
import {useAppSelector} from '../../../redux/hooks';
import {selectPersona} from '../../../redux/slices/userSlice';

const ChallengeCardSection = ({type}: {type: string}) => {
  // console.log(props);
  const [render, setRender] = useState(false);
  const persona = useAppSelector(selectPersona);
  let tmpitems = Array<any>;
  const allData = useLazyLoadQuery(
    ChanllengeGet,
    {},
    {fetchPolicy: 'network-only'},
  );

  const myData = useLazyLoadQuery(
    MyChanllengeGet,
    {personaId: persona.id},
    {fetchPolicy: 'network-only'},
  );

  if (type === 'all' || type === 'recruit') {
    tmpitems = allData.getAllChallenges.edges;
  } else if (type === 'myChallenge') {
    tmpitems = myData.getMyChallenges.edges;
  }

  // useEffect(() => {
  //   if (render) {
  //     if (type === 'all' || type === 'recruit') {
  //       allData.refetch();
  //     } else if (type === 'myChallenge'){
  //       myData.refetch({peronaID: persona.id});
  //     }
  //   }
  // })

  return (
    <CardList
      data={tmpitems}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      keyExtractor={({id}: any) => id.toString()}
      renderItem={({item}: any) => (
        <ChallengeCardItem
          id={item.node.id}
          title={item.node.title}
          max={item.node.maxPersonaCount}
          current={item.node.peronas.totalCount}
          body={item.node.description}
          setRender={setRender}
          open={true}
        />
      )}
    />
  );
};

export default ChallengeCardSection;
