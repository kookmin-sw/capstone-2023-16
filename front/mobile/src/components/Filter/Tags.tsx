/* eslint-disable prettier/prettier */
import React, {SetStateAction, useState, Dispatch} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {DimensionTheme} from '../common/shared';
import {colors} from '../common/colors';
import SmallButton from '../common/Buttons/SmallButton';
import {whiteBGpurpleSD} from '../common/theme';
import {tagCategoryItem} from '../common/type';

interface tmp{
    list:Array<tagCategoryItem>;
    setTagList: Dispatch<SetStateAction<Array<string>>>;
    tagList: Array<string>;
    setSearchEvent: Dispatch<SetStateAction<boolean>>;
}

const Tags = (props:tmp) => {
  const [allTags, setALLTags] = useState(props.list);

  return (
    <View style={style.SearchTypes}>
        {
            allTags.map((value: tagCategoryItem, index?:number) => {
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
                            allTags[index!].state = !allTags[index!].state;
                            setALLTags(allTags);
                            console.log(`TagSearch: ${props.tagList.find(item => item === value.id)}`);
                            if (props.tagList.find(item => item === value.id) === value.id) {
                                const tmplist = props.tagList.filter((item) => item !== value.id);
                                props.setTagList(tmplist);
                                props.setSearchEvent(true);
                            } else if (props.tagList.find(item => item === value.id) === undefined) {
                                props.tagList.push(value.id);
                                props.setTagList(props.tagList);
                                props.setSearchEvent(true);
                            }
                        }}
                    >
                        {value.text}
                    </SmallButton>
                );
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

export default Tags;