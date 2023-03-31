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
    searchType: Dispatch<SetStateAction<any>>;
    searchTagState: Dispatch<SetStateAction<boolean>>;
    searchEvent: Dispatch<SetStateAction<boolean>>;
}

const Search = (props:FoldFilterProps) => {
    const [search, setSearch] = useState('');
    const [render, setRender] = useState(true);
    const [searchTypeList, setSearchTypeList] = useState([
        {
            'type':'제목만',
            'state':true,
        },
        {
            'type':'제목+내용',
            'state':false,
        },
        {
            'type':'내용',
            'state':false,
        },
        {
            'type':'작성자',
            'state':false,
        },
    ]);
    return (
        <View style={style.SearchSection}>
            <View style={style.SearchBox}>
                <TextInput style={style.TextInput} placeholder="#으로 시작하면 태그 검색이 됩니다." placeholderTextColor={colors.graydark2} onChangeText={(text)=>{
                    setSearch(text);
                }}/>
                <TouchableOpacity
                    style={style.SearchBtn}
                    onPress = {()=>{
                        if (search === ''){
                            props.searchText(search);
                            if (search.includes('#')){
                                props.searchTagState(true);
                            } else {
                                props.searchTagState(false);
                                props.searchType(searchTypeList);
                            }
                            props.searchEvent(true);
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: '검색 사항 없음',
                                text2: '검색 사항이 존재하지 않습니다. 다시 입력해주세요.',
                            });
                        }
                    }}
                >
                    <Image style={style.SearchBtnImg} source={require('../../assets/searchIcon.png')}/>
                </TouchableOpacity>
            </View>
            {!search.includes('#') &&
                <View style={style.SearchTypes}>
                    {
                        searchTypeList.map((value: {type:string; state:boolean;}, index?:number) => {
                            return (
                                <SmallButton
                                    key={index}
                                    btnStyles={{
                                        ...whiteBGpurpleSD.btnStyle,
                                        width: 'auto',
                                        height: DimensionTheme.width(30),
                                        paddingTop: DimensionTheme.width(1),
                                        paddingBottom: DimensionTheme.width(2),
                                        borderRadius: DimensionTheme.width(8),
                                        marginEnd: DimensionTheme.width(10),
                                        backgroundColor: (value.state) ? colors.categorypurple : 'white',
                                    }}
                                    textStyles={{color: colors.black}}
                                    onPress={()=>{
                                        searchTypeList[index!].state = !searchTypeList[index!].state;
                                        setSearchTypeList(searchTypeList);
                                        setRender(!render);
                                    }}
                                >
                                    {value.type}
                                </SmallButton>
                            );
                        })
                    }
                </View>
            }
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
