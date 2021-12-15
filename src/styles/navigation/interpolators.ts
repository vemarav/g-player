import {StackCardInterpolationProps} from '@react-navigation/stack';

import {Animated} from 'react-native';

const {multiply} = Animated;

export const HorizontalInterpolator = ({
  current,
  next,
  inverted,
  layouts: {screen},
}: StackCardInterpolationProps) => {
  const translateFocused = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: 'clamp',
    }),
    inverted,
  );
  const translateUnfocused = next
    ? multiply(
        next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -screen.width],
          extrapolate: 'clamp',
        }),
        inverted,
      )
    : 0;

  return {
    cardStyle: {
      transform: [
        // Translation for the animation of the current card
        {
          translateX: translateFocused,
        }, // Translation for the animation of the card on top of this
        {
          translateX: translateUnfocused,
        },
      ],
    },
    overlayStyle: {
      opacity: 0,
    },
  };
};
