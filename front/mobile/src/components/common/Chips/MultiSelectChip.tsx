import React, {useReducer, FC, useEffect, useState} from 'react';

import * as ButtonTheme from '../theme';
import {View} from 'react-native';
import SmallButton from '../Buttons/SmallButton';
import {colors} from '../colors';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return [...action.payload];
    case 'ON_SELECT':
      return state.map((item, index) => {
        if (index === action.index) {
          return {...item, flag: !item.flag};
        }
        return item;
      });
    default:
      return state;
  }
};

type ChipsProps = {
  data: any;
  getTagInfo: any;
};

export const MultiSelectChip: FC<ChipsProps> = props => {
  const [state, dispatch] = useReducer(reducer, []);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    dispatch({type: 'INITIALIZE', payload: props.data});
  }, [props.data]);

  const selectItem = (item, index) => {
    dispatch({type: 'ON_SELECT', index});
    const updatedData = [...state];
    updatedData[index].flag = !updatedData[index].flag;
    dispatch({type: 'INITIALIZE', payload: updatedData});
    updatedData.map(item => {
      item.flag ? console.log(item.title) : null;
    });
    const selected = updatedData
      .filter(item => item.flag)
      .map(item => item.body);
    setSelectedItems(selected);
    props.getTagInfo(selectedItems);
  };

  return (
    <>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}>
        {state.map((item, index) => {
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
              #{item.body}
            </SmallButton>
          );
        })}
      </View>
    </>
  );
};
