import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  const {width, height, color} = props;

  return (
    <Svg
      width={width ?? 100}
      height={height ?? 100}
      viewBox="0 0 100 100"
      fill={color ?? '#ffffff'}>
      <Path
        d="M83.333 63.791L97.125 50 83.333 36.208V16.666H63.792L50 2.875 36.208 16.666H16.667v19.542L2.875 50 16.667 63.79v19.542h19.541L50 97.125l13.792-13.792h19.541V63.791zM50 75V25c13.792 0 25 11.208 25 25 0 13.791-11.208 25-25 25z"
        fill={color}
      />
    </Svg>
  );
};

export default SvgComponent;
