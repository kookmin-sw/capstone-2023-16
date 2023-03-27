import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { DimensionTheme } from '../common/shared';

interface FoldFilterProps{
    searchEvent: ((event:GestureResponderEvent) => void)|undefined;
    searchCategory: ((event:GestureResponderEvent) => void)|undefined;
}

const Search = (props:FoldFilterProps) => {
    return ();
};

const style = StyleSheet.create({
    
});

export default Search;
