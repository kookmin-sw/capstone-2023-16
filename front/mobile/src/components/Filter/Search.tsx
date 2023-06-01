/* eslint-disable prettier/prettier */
import React, { SetStateAction, useState, Dispatch } from 'react';
import { StyleSheet, TouchableOpacity, Image, TextInput, View } from 'react-native';
import { DimensionTheme } from '../common/shared';
import { colors } from '../common/colors';
import SmallButton from '../common/Buttons/SmallButton';
import { whiteBGpurpleSD } from '../common/theme';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

interface FoldFilterProps{
    searchText: Dispatch<SetStateAction<string>>;
    searchEvent: Dispatch<SetStateAction<boolean>>;
    searchType: Dispatch<SetStateAction<string>>;
}

const Search = (props:FoldFilterProps) => {
    const [search, setSearch] = useState('');
    const searchTypeList = [
        '제목', '작성자',
    ];
    const [searchType, setSearchType] = useState('제목');

    return (
        <View style={style.SearchSection}>
            <View style={style.SearchBox}>
                <TextInput style={style.TextInput} placeholder="검색어를 입력해주세요." placeholderTextColor={colors.graydark2} onChangeText={(text)=>{
                    setSearch(text);
                }}/>
                <TouchableOpacity
                    style={style.SearchBtn}
                    onPress = {()=>{
                        if (search !== ''){
                            props.searchText(search);
                            props.searchEvent(true);
                            props.searchType(searchType);
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: '검색 사항 없음',
                                text2: '검색 사항이 존재하지 않습니다. 다시 입력해주세요.',
                            });
                        }
                    }}
                >
                    <Image style={style.SearchBtnImg} source={require('../../assets/search-white.png')}/>
                </TouchableOpacity>
            </View>
            <View style={style.SearchTypes}>
                {
                    searchTypeList.map((value: string, index?:number) => {
                        return (
                            <SmallButton
                                key={index}
                                btnStyles={{
                                    paddingEnd: DimensionTheme.width(15),
                                    ...whiteBGpurpleSD.btnStyle,
                                    width: 'auto',
                                    height: DimensionTheme.width(30),
                                    // paddingEnd: DimensionTheme.width(15),
                                    paddingTop: DimensionTheme.width(1),
                                    paddingStart: DimensionTheme.width(15),
                                    paddingBottom: DimensionTheme.width(2),
                                    borderRadius: DimensionTheme.width(8),
                                    marginEnd: DimensionTheme.width(10),
                                    backgroundColor: (searchType === value) ? colors.categorypurple : 'white',
                                }}
                                textStyles={{color: colors.black, fontSize:DimensionTheme.fontSize(14)}}
                                onPress={()=>{
                                    if (searchType !== value){
                                        setSearchType(value);
                                    }
                                }}
                            >
                                {value}
                            </SmallButton>
                        );
                    })
                }
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    SearchSection:{
        width: '100%',
        paddingStart: DimensionTheme.width(30),
        paddingEnd: DimensionTheme.width(30),
    },
    SearchBox:{
        display: 'flex',
        flexDirection: 'row',
        height: DimensionTheme.width(43),
        justifyContent: 'space-between',
        marginBottom: DimensionTheme.width(13),
    },
    TextInput:{
        width: DimensionTheme.width(280),
        height: DimensionTheme.width(43),
        fontSize: DimensionTheme.fontSize(14),
        paddingStart: DimensionTheme.width(18),
        alignItems: 'center',
        color: 'black',
        overflow: 'hidden',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 2,
        borderRadius: DimensionTheme.width(10),
    },
    SearchBtn:{
        width: DimensionTheme.width(43),
        height: DimensionTheme.width(43),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        backgroundColor: colors.primary,
        borderRadius: DimensionTheme.width(10),
    },
    SearchBtnImg:{
        width: DimensionTheme.width(23),
        height: DimensionTheme.width(22.63),
    },
    SearchTypes:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: DimensionTheme.width(17),
    },
});

export default Search;
