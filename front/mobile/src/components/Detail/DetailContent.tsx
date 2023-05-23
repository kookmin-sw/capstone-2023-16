import React from 'react';
import {useLazyLoadQuery} from 'react-relay';
import {contentOpenQuery} from '../../graphQL/Post/ContentOpen';
import {Text, StyleSheet} from 'react-native';
import {DimensionTheme} from '../common/shared';

const DetailContent = ({content}: {content: string}) => {
  // const data = useLazyLoadQuery(
  //   contentOpenQuery,
  //   {id: feed_id},
  //   {fetchPolicy: 'network-only'},
  // );
  return <Text style={style.Text}>{content}</Text>;
};

const style = StyleSheet.create({
  Text: {
    width: DimensionTheme.width(345),
    margin: DimensionTheme.width(24),
    marginBottom: DimensionTheme.width(33),
    fontSize: DimensionTheme.fontSize(14),
    color: 'black',
  },
});

export default DetailContent;
