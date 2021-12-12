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
        d="M50 12.5v38.667C48.042 50.458 45.958 50 43.75 50 33.375 50 25 58.375 25 68.75S33.375 87.5 43.75 87.5c9.625 0 17.5-7.292 18.542-16.667h.208V25h16.667V12.5H50z"
        fill={color ?? '#ffffff'}
      />
    </Svg>
  );
};

export default SvgComponent;
