import React, {Dispatch, SetStateAction} from 'react';
import {useLazyLoadQuery, useMutation} from 'react-relay';
import {CommentInputMutation} from '../../graphQL/Post/__generated__/CommentInputMutation.graphql';
import {comments_inputMutation} from '../../graphQL/Post/CommentInput';
import {View} from 'react-native';
import {comments_getPostQuery} from '../../graphQL/Post/CommentGet';
import CommentInput from './CommentInput';
import Comment from './Comment';
import {DimensionTheme} from '../common/shared';

interface CommentContentProps {
  feed_id: number;
  render: Dispatch<SetStateAction<boolean>>;
  state: boolean;
}

const CommentContent = (prop: CommentContentProps) => {
  const data = useLazyLoadQuery(
    comments_getPostQuery,
    {id: prop.feed_id},
    {fetchPolicy: 'store-or-network'},
  );

  return (
    <View>
      <CommentInput
        state={prop.state}
        render={prop.render}
        feed_id={prop.feed_id}
      />
      <View style={{marginStart: DimensionTheme.width(19), height: 'auto'}}>
        {data.getPost.comments.map((value: any, index: number) => {
          return (
            <Comment
              key={index}
              user_id={value.persona.id}
              user_img={String(require('../../assets/profileImg.png'))}
              comment={value.body}
              date={value.createdAt}
              nickname={value.persona.nickname}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CommentContent;