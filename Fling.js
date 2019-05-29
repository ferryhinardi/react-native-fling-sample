import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

const USE_NATIVE_DRIVER = true;
const windowWidth = Dimensions.get('window').width;
const circleRadius = 30;

class Fling extends Component {
  constructor(props) {
    super(props);
    this._touchX = new Animated.Value(windowWidth / 2 - circleRadius);
    this._translateX = Animated.add(
      this._touchX,
      new Animated.Value(-circleRadius)
    );
    this._translateY = new Animated.Value(0);
    console.log('State', State);
  }

  _onHorizontalFlingHandlerStateChange = ({ nativeEvent }, offset) => {
    console.log('nativeEvent.oldState horizontal', nativeEvent.oldState);
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this._touchX, {
        toValue: this._touchX._value + offset,
      }).start();
    }
  };

  _onVerticalFlingHandlerStateChange = ({ nativeEvent }) => {
    console.log('nativeEvent.oldState vertical', nativeEvent.oldState);
    if (nativeEvent.oldState === State.ACTIVE) {
      console.log('_translateY', this._translateY._value, this._translateY._value + 10);
      Animated.spring(this._translateY, {
        toValue: this._translateY._value + 10,
      }).start();
    }
  };

  render() {
    return (
      <FlingGestureHandler
        direction={Directions.UP}
        numberOfPointers={1}
        onHandlerStateChange={this._onVerticalFlingHandlerStateChange}>
        <FlingGestureHandler
          direction={Directions.RIGHT | Directions.LEFT}
          onHandlerStateChange={ev =>
            this._onHorizontalFlingHandlerStateChange(ev, -10)
          }>
          <View style={styles.horizontalPan}>
            <Animated.View
              style={[
                styles.circle,
                {
                  transform: [
                    {
                      translateX: this._translateX,
                    },
                    {
                      translateY: this._translateY,
                    },
                  ],
                },
              ]}
            />
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  horizontalPan: {
    backgroundColor: '#f76f41',
    height: 300,
    justifyContent: 'center',
    marginVertical: 10,
  },
  circle: {
    backgroundColor: '#42a5f5',
    borderRadius: circleRadius,
    height: circleRadius * 2,
    width: circleRadius * 2,
  },
});

export default Fling;