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
        d="M41.667 16.667h-25c-4.584 0-8.292 3.75-8.292 8.333l-.042 50c0 4.583 3.75 8.333 8.334 8.333h66.666c4.584 0 8.334-3.75 8.334-8.333V33.333c0-4.583-3.75-8.333-8.334-8.333H50l-8.333-8.333z"
        fill={color}
      />
    </Svg>
  );
};

export default SvgComponent;
