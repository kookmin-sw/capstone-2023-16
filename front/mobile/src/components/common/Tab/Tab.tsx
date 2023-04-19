import React, {useState, FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {Animated} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {DimensionTheme} from '../shared';
import {colors} from '../colors';
import {routeProps, sceneMapProps} from './type';

const TabSection = styled.View`
  flex-direction: row;
  justfiy-contents: space-between;
  align-items: center;
  margin-top: ${DimensionTheme.height(10)};
  margin-left: ${DimensionTheme.width(16)};
  margin-bottom: ${DimensionTheme.height(25)};
`;

const TabItemSection = styled.TouchableOpacity`
  align-items: center;
  margin-right: ${DimensionTheme.width(20)};
  border-bottom: 1rem solid;
  min-width: ${DimensionTheme.width(70)};
  height: ${DimensionTheme.height(30)};
`;
type TabProps = {
  routes: routeProps[];
  sceneMap: sceneMapProps;
};

export const Tab: FC<TabProps> = ({routes, sceneMap}) => {
  const [index, setIndex] = useState(0);

  const _handleIndexChange = (index: number) => setIndex(index);

  const _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <TabSection>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const borderColor =
            index === i ? colors.borderpurple : colors.graydark;
          const borderWidth = index === i ? 3 : 1;

          return (
            <TabItemSection
              style={{
                borderBottomColor: borderColor,
                borderBottomWidth: borderWidth,
              }}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
            </TabItemSection>
          );
        })}
      </TabSection>
    );
  };

  const _renderScene = sceneMap;

  return (
    <TabView
      style={{width: '100%'}}
      navigationState={{index, routes}}
      renderScene={_renderScene}
      renderTabBar={_renderTabBar}
      onIndexChange={_handleIndexChange}
    />
  );
};
