/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../common/colors';
import { DimensionTheme } from '../common/shared';


interface HearderProps{
    feed_id:number;
    title: string;
    author_img: string;
    author: string;
}

const DetailHearder = (props:HearderProps) => {
    return (
        <View style={style.HeaderBox}>
            <View style={{flexDirection:'row'}}>
                <Text style={style.Title}>{props.title}</Text>
                <TouchableOpacity style={style.MoreBtn}>
                    <Image style={style.MoreBtn} source={require('../../assets/imgs/more-image.png')} resizeMode="contain"/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={style.ProfileBox}>
                <Image style={style.ProfileImg} source={(props.author_img !== null || props.author_img !== '') ? (props.author_img) : require('../../assets/imgs/profileImg.png')}/>
                <Text style={style.Nickname}>{props.author}</Text>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    HeaderBox:{
        width:'100%',
        marginTop: DimensionTheme.height(22),
        paddingStart: DimensionTheme.width(24),
        paddingEnd: DimensionTheme.width(24),
        paddingBottom: DimensionTheme.height(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomColor: colors.borderGray,
        borderBottomWidth: 1,
    },
    Title:{
        width: DimensionTheme.width(310),
        marginEnd: DimensionTheme.width(15),
        fontSize: DimensionTheme.fontSize(20),
        fontWeight: '700',
        color: 'black',
    },
    MoreBtn:{
        width: DimensionTheme.width(20),
        height: DimensionTheme.width(20),
    },
    ProfileBox:{
        marginTop: DimensionTheme.height(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    ProfileImg:{
        width: DimensionTheme.width(35),
        height: DimensionTheme.height(35),
        marginEnd: DimensionTheme.width(10),
    },
    Nickname:{
        width: DimensionTheme.width(300),
        fontSize: DimensionTheme.fontSize(14),
        color: 'black',
    }
});

export default DetailHearder;