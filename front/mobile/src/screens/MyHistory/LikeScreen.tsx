import React, {FC} from 'react';
import {ScrollView} from 'react-native';
//@ts-ignore
import styled from 'styled-components/native';
import FeedCard from '../../components/common/Cards/FeedCard';
import {Container} from '../../components/common/shared';
import {imagePath} from '../../utils/imagePath';

const LikeContainer = styled(Container)``;

type Props = {
  data: any;
  type: string;
  name?: string;
};

export const LikeScreen: FC<Props> = (props, route) => {
  console.log('feeds ; ', props);
  return (
    <LikeContainer>
      <ScrollView>
        {props.name === 'history'
          ? props?.data?.map(value => (
              <FeedCard
                title={
                  props.type === 'bookmark' ? value.post.title : value.title
                }
                feed_id={props.type === 'bookmark' ? value.post.id : value.id}
                author={
                  props.type === 'bookmark'
                    ? value.post.author.nickname
                    : value.author.nickname
                }
                author_id={
                  props.type === 'bookmark'
                    ? value.post.author.id
                    : value.author.id
                }
                author_img={imagePath.avatar}
                content={
                  props.type === 'bookmark'
                    ? value.post.contentPreview
                    : value.contentPreview
                }
                like={
                  props.type === 'bookmark' ? value.post.likeCnt : value.likeCnt
                }
                bookmark={
                  props.type === 'bookmark'
                    ? value.post.bookmarkCnt
                    : value.bookmarkCnt
                }
                comment={
                  props.type === 'bookmark'
                    ? value.post.commnetCnt
                    : value.commentCnt
                }
                hash_tag={['조별과제']}
                like_check={true}
                bookmark_check={true}
              />
            ))
          : props?.data?.edges.map(value => (
              <FeedCard
                title={value.node.title}
                feed_id={value.node.id}
                author={value.node.nickname}
                author_id={value.node.id}
                author_img={imagePath.avatar}
                content={value.node.contentPreview}
                like={value.node.likeCnt}
                bookmark={value.node.bookmarkCnt}
                comment={value.node.commentCnt}
                hash_tag={['조별과제']}
                like_check={true}
                bookmark_check={true}
              />
            ))}
      </ScrollView>
    </LikeContainer>
  );
};
