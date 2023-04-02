/* eslint-disable prettier/prettier */
import React, { SetStateAction, useState, Dispatch } from 'react';
import { View } from 'react-native';
import { DimensionTheme } from '../common/shared';
import { colors } from '../common/colors';
import SmallButton from '../common/Buttons/SmallButton';
import { whiteBGpurpleSD } from '../common/theme';
import { tagData } from '../../constants/tag';

interface CategorySelectProps{
    categoryEvent: Dispatch<SetStateAction<any>>;
}

const CategorySelect = (props:CategorySelectProps) => {
    const [category, setCategory] = useState(tagData);
    const [render, setRender] = useState(true);
    return (
        <View style={{width:DimensionTheme.width(332), marginStart:DimensionTheme.width(30), display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
            {category.map((value: {title: string; flag: boolean}, index?:number) => {
                return (
                    <SmallButton
                        key={index}
                        btnStyles={{
                            ...whiteBGpurpleSD.btnStyle,
                            height: DimensionTheme.width(30),
                            paddingTop: DimensionTheme.width(1),
                            paddingBottom: DimensionTheme.width(2),
                            paddingStart: DimensionTheme.width(15),
                            paddingEnd: DimensionTheme.width(15),
                            borderRadius: DimensionTheme.width(8),
                            marginEnd: DimensionTheme.width(10),
                            marginTop: DimensionTheme.width(15),
                            backgroundColor: (value.flag) ? colors.categorypurple : 'white',
                        }}
                        textStyles={{color: colors.black}}
                        onPress={() => {
                            category[index!].flag = !category[index!].flag;
                            setCategory(category);
                            console.log(index!);
                            console.log(category[index!]);
                            setRender(!render);
                            props.categoryEvent(category);
                        }}
                    >
                        {value.title}
                    </SmallButton>
                );
            })}
        </View>
    );
};

export default CategorySelect;
