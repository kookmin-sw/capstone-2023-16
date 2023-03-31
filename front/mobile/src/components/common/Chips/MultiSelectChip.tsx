import React, {useReducer, FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import * as ButtonTheme from '../theme';
import {View} from 'react-native';
import SmallButton from '../Buttons/SmallButton';
import {colors} from '../colors';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ON_SELECT':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

type ChipsProps = {
  data: any;
};

export const MultiSelectChip: FC<ChipsProps> = props => {
  const inisialState = {
    list: props.data,
  };
  const [state, dispatch] = useReducer(reducer, inisialState);

  const selectItem = (item, index) => {
    state.list[index].flag = !state.list[index].flag;
    dispatch({
      type: 'ON_SELECT',
      payload: state.list,
    });
    state.list.map(item => {
      item.flag ? console.log(item.title) : null;
    });
  };

  return (
    <>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}>
        {state.list.map((item, index) => {
          return (
            <SmallButton
              key={index}
              btnStyles={[
                item.flag
                  ? ButtonTheme.lightpurpleBG.btnStyle
                  : ButtonTheme.whiteBGpurpleSD.btnStyle,
                {
                  height: 30,
                  paddingTop: 1,
                  paddingBottom: 2,
                  borderRadius: 8,
                  marginBottom: 15,
                  marginLeft: 10,
                },
              ]}
              textStyles={{color: colors.black}}
              onPress={() => selectItem(item, index)}>
              #{item.title}
            </SmallButton>
          );
        })}
      </View>
    </>
  );
};
