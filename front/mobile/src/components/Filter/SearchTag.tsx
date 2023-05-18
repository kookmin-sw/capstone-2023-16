/* eslint-disable prettier/prettier */
import React, {SetStateAction, useState, Dispatch, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  View,
} from 'react-native';
import {DimensionTheme} from '../common/shared';
import {colors} from '../common/colors';
import SmallButton from '../common/Buttons/SmallButton';
import {whiteBGpurpleSD} from '../common/theme';
import {tagItem} from '../common/type';

import {useAppDispatch, useAppSelector} from '../redux/hooks';
import { selectSearch, selectCategories, selectTags } from '../../redux/slices/searchSlice';

const SearchTag = (props: tagItem[]) => {
  const [allTags, setALLTags] = useState(props);
  
  const dispatch = useAppDispatch();
  const searchTag = useAppSelector(selectTags);

  return (
    <View style={style.SearchTypes}>
        {
            allTags.map((value: tagItem, index?:number) => {
                return (
                    <SmallButton
                        key={index}
                        btnStyles={{
                            ...whiteBGpurpleSD.btnStyle,
                            width: 'auto',
                            height: DimensionTheme.width(30),
                            paddingTop: DimensionTheme.width(1),
                            paddingStart: DimensionTheme.width(15),
                            paddingEnd: DimensionTheme.width(15),
                            paddingBottom: DimensionTheme.width(2),
                            borderRadius: DimensionTheme.width(8),
                            marginEnd: DimensionTheme.width(10),
                            backgroundColor: (value.state) ? colors.categorypurple : 'white',
                        }}
                        textStyles={{color: colors.black, fontSize:DimensionTheme.fontSize(14)}}
                        onPress={()=>{
                            searchTypeList[index!].state = !searchTypeList[index!].state;
                            setSearchTypeList(searchTypeList);
                            setRender(!render);
                        }}
                    >
                        {value.node.body}
                    </SmallButton>
                )
            })
        }
    </View>
  );
};

const style = StyleSheet.create({
    SearchTypes:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: DimensionTheme.width(17),
    },
})

export default SearchTag;