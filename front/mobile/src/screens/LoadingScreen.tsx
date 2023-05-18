import React, {FC, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationData} from '../navigation/AppNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {selectPersona, setPersona} from '../redux/slices/userSlice';
import {useLazyLoadQuery} from 'react-relay';
import getOwnPersonasQuery from '../graphQL/CookieSetting/GetPersona';
import {getData, storeData} from '../asyncstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NavigationData<'Loading'>;

const LoadingScreen: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  var persona_id = useSelector(selectPersona);
  const data = useLazyLoadQuery(getOwnPersonasQuery, {
    fetchPolicy: 'store-or-network',
  });

  if (persona_id === '') {
    const id = data.getOwnPersonas.edges[0]?.node?.id || '';
    console.log(`setId : ${id}`);
    persona_id = id;
    dispatch(setPersona(id));
  }

  // getData('cookies').then(cookies => {
  //   console.log(`loadingGetCookie: ${cookies}`);
  //   if (cookies.indexOf('persona_id') === -1) {
  //     console.log(`loadingGetCookie: ${cookies}`);
  //     const newCookie = `${cookies.slice(0, -1)}, persona_id=${persona_id}; Path=/"`;
  //     console.log(`newcookie: ${newCookie}`);
  //     storeData('cookies', newCookie.slice(1, -1));
  //   }
  // });

  storeData('persona_id', persona_id);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default LoadingScreen;
