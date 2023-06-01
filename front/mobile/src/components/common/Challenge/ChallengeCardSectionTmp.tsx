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

import {CardSectionProps} from './types';

const ChallengeCardSectionTmp: FC<CardSectionProps> = props => {
  return (
    <CardList
      data={props.data}
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
          open={true}
        />
      )}
    />
  );
};

export default ChallengeCardSectionTmp;
