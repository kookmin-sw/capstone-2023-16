import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import CardItem from './FollowCardItem';

const CardList = styled.FlatList`
  width: 100%;
  flex: 1;
  padding-left: 25px;
  padding-bottom: 15px;
`;

import {CardSectionProps} from './types';

const CardSection: FC<CardSectionProps> = props => {
  return (
    <CardList
      data={props.data}
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      keyExtractor={({id}: any) => id.toString()}
      renderItem={({item}: any) => <CardItem {...item} />}
    />
  );
};

export default CardSection;
