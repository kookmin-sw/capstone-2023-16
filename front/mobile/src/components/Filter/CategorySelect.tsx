/* eslint-disable prettier/prettier */
import React, { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { View } from 'react-native';
import { DimensionTheme } from '../common/shared';
import { colors } from '../common/colors';
import SmallButton from '../common/Buttons/SmallButton';
import { whiteBGpurpleSD } from '../common/theme';
import {useLazyLoadQuery} from 'react-relay';
import {graphql} from 'babel-plugin-relay/macro';

interface CategorySelectProps{
    setCategory: Dispatch<SetStateAction<string>>;
    setSearchEvent: Dispatch<SetStateAction<boolean>>;
}

const getAllCategoryQuery = graphql`
  query CategorySelectQuery {
    getAllCategories(
        sortingOpt: {sortBy: PERSONA_REFERENCE_CNT},
    ) {
      edges {
        node {
          id
          body
        }
      }
    }
  }
`;

const CategorySelect = (props:CategorySelectProps) => {
    const categoryData = useLazyLoadQuery(
        getAllCategoryQuery,
        {},
        {fetchPolicy: 'store-or-network'},
    );

    const [category, setCategory] = useState('');
    return (
        <View style={{width:DimensionTheme.width(332), marginStart:DimensionTheme.width(30), display:'flex', flexDirection:'row', flexWrap: 'wrap'}}>
            {categoryData.getAllCategories.edges.map((value: {id: string, body: string}, index?:number) => {
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
                            backgroundColor: (value.id === category) ? colors.categorypurple : 'white',
                        }}
                        textStyles={{color: colors.black}}
                        onPress={() => {
                            if (value.id !== category) {
                                setCategory(value.id);
                                props.setCategory(value.id);
                                props.setSearchEvent(true);
                            }
                        }}
                    >
                        {value.body}
                    </SmallButton>
                );
            })}
        </View>
    );
};

export default CategorySelect;
