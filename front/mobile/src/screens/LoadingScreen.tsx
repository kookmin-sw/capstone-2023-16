// import React, {FC, useEffect, useState} from 'react';
// import {View, Text} from 'react-native';
// import {NavigationData} from '../navigation/AppNavigator';
// import {useDispatch, useSelector} from 'react-redux';
// import {selectPersona, setPersona} from '../redux/slices/userSlice';
// import {useLazyLoadQuery} from 'react-relay';
// import getOwnPersonasQuery from '../graphQL/CookieSetting/GetPersona';
// import {getData, storeData} from '../asyncstorage';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// type Props = NavigationData<'Loading'>;

// const LoadingScreen: FC<Props> = ({navigation}) => {
//   const dispatch = useDispatch();
//   var persona: any = useSelector(selectPersona);
//   const data = useLazyLoadQuery(getOwnPersonasQuery, {
//     fetchPolicy: 'store-or-network',
//   });

//   if (persona.id === '') {
//     const id = data.getOwnPersonas.edges[0]?.node?.id || '';
//     console.log(`setId : ${id}`);
//     persona.id = id;
//     persona.nickname = data.getOwnPersonas.edges[0]?.node?.nickname || '';
//     dispatch(setPersona(persona));
//   }

//   storeData('persona_id', persona.id);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigation.navigate('Main');
//     }, 500);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   return (
//     <View>
//       <Text>Loading</Text>
//     </View>
//   );
// };

// export default LoadingScreen;
