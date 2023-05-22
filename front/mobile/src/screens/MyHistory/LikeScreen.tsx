import React, {FC} from 'react';
import {ScrollView} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import FeedCard from '../../components/common/Cards/FeedCard';
import {Container} from '../../components/common/shared';
import {examplefeedcard} from '../../constants/feedcard';

const LikeContainer = styled(Container)``;

export const LikeScreen: FC = () => {
  return (
    <LikeContainer>
      <ScrollView>
        {examplefeedcard.map(value => (
          <FeedCard
            title={value.title}
            feed_id={value.feed_id}
            author={value.author}
            author_id={value.author_id}
            author_img={value.author_img}
            content={value.content}
            like={value.like}
            bookmark={value.bookmark}
            comment={value.comment}
            hash_tag={value.hash_tag}
            like_check={value.like_check}
            bookmark_check={value.bookmark_check}
          />
        ))}
      </ScrollView>
    </LikeContainer>
  );
};
