/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { DimensionTheme } from '../components/common/shared';

const FilterScreen = () => {
    return (
        <SafeAreaView>
            <ScrollView style={style.Container}>
                <View style={style.Header}>
                    <TouchableOpacity style={style.BackBtn}>
                        <Image style={style.BackBtnImg} source={require('../../assets/back_btn.png')} resizeMode="contain"/>
                    </TouchableOpacity>
                    <Image style={style.HeadetText} source={require('../filter_header.png')} resizeMode="contain"/>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    Header:{
        height: DimensionTheme.width(58),
        display: 'flex',
        flexDirection: 'row',
    },
    Container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    BackBtn:{
        width: DimensionTheme.width(22),
        height: DimensionTheme.width(22),
        marginStart: DimensionTheme.width(10),
        marginTop: DimensionTheme.width(16),
    },
    BackBtnImg:{
        width: DimensionTheme.width(22),
        height: DimensionTheme.width(22),
    },
    HeadetText:{
        width: DimensionTheme.width(66),
        height: DimensionTheme.width(24),
        marginTop: DimensionTheme.width(19),
        marginStart: DimensionTheme.width(130),
    },
});

export default FilterScreen;
