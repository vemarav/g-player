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
        d="M45.833 29.167h8.334V37.5h-8.334v-8.333zm0 16.666h8.334v25h-8.334v-25zM50 8.333C27 8.333 8.333 27 8.333 50S27 91.667 50 91.667 91.667 73 91.667 50 73 8.333 50 8.333zm0 75c-18.375 0-33.333-14.958-33.333-33.333S31.625 16.667 50 16.667 83.333 31.625 83.333 50 68.375 83.333 50 83.333z"
        fill={color}
      />
    </Svg>
  );
};

export default SvgComponent;
