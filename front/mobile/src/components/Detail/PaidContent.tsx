import React, {useState} from 'react';
import {useLazyLoadQuery} from 'react-relay';
// import {contentOpenQuery} from '../../graphQL/Post/ContentOpen';
import {Text, StyleSheet, View} from 'react-native';
import {DimensionTheme} from '../common/shared';
import {paidContentQuery} from '../../graphQL/Post/PaidContent';
import ContentBlock from './ContentBlock';
import DetailContent from './DetailContent';

const PaidContent = ({
  feed_id,
  author_id,
  author_nickname,
}: {
  feed_id: string;
  author_id: string;
  author_nickname: string;
}) => {
  try {
    const tmpdata = useLazyLoadQuery(
      paidContentQuery,
      {id: feed_id},
      {fetchPolicy: 'network-only'},
    );
    // setData(tmpdata.getPost.paidContent);
    return (
      <View>
        {tmpdata.getPost.paidContent === null ? (
          <DetailContent content={tmpdata.getPost.content}/>
        ) : (
          <View>
            <Text style={style.Text}>{tmpdata.getPost.paidContent}</Text>
          </View>
        )}
      </View>
    );
  } catch (error) {
    console.log(`PaidContentComponent: ${error}`);
    return (
      <ContentBlock
        paid={true}
        author_nickname={author_nickname}
        author_id={author_id}
        lowtier={false}
      />
    );
  }
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

export default PaidContent;
