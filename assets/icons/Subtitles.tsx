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
        d="M83.333 16.667H16.667c-4.584 0-8.334 3.75-8.334 8.333v50c0 4.583 3.75 8.333 8.334 8.333h66.666c4.584 0 8.334-3.75 8.334-8.333V25c0-4.583-3.75-8.333-8.334-8.333zM16.667 50h16.666v8.333H16.667V50zm41.666 25H16.667v-8.333h41.666V75zm25 0H66.667v-8.333h16.666V75zm0-16.667H41.667V50h41.666v8.333z"
        fill={color ?? '#ffffff'}
      />
    </Svg>
  );
};

export default SvgComponent;
