import React, {useEffect, useRef, FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';

import {
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import {DimensionTheme, ScreenHeight} from '../shared';

const OverlayViewSection = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BackgroundSection = styled.View`
  flex: 1;
`;

type BottomSheetProps = {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BottomSheet: FC<BottomSheetProps> = props => {
  const modalVisible = props.modalVisible;
  const setModalVisible = props.setModalVisible;
  //   const {modalVisible, setModalVisible} = props.modalVisible;

  // 터치 인식. state 변경시 리렌더링 될 때 값이 초기화 되는 것을 방지(useRef)
  const panY = useRef(new Animated.Value(ScreenHeight)).current;

  // panY에 따라 BottomSheet의 y축 위치 결정
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  // BottomSheet 초기 위치로
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  // BottomSheet 내리기
  const closeBottomSheet = Animated.timing(panY, {
    toValue: ScreenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    // dx, dy: 터치가 시작된 이후 제스처의 누적 거리
    // vx, vy : 제스처의 현재 속도
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,

      // 터치 이벤트 진행중 호출
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      // 터치 이벤트 끝나면 호출
      onPanResponderRelease: (event, gestureState) => {
        // 1.5 이상의 속도로 드래그 하면 BottomSheet가 내려감
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    } else {
      closeBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <OverlayViewSection>
        <TouchableWithoutFeedback onPress={closeModal}>
          <BackgroundSection />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          {props.children}
        </Animated.View>
      </OverlayViewSection>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: DimensionTheme.height(217),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
