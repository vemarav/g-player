import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  const {width, height, color} = props;

  return (
    <Svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill={color ?? '#ffffff'}>
      <Path
        d="M20.378 8.543l-1.232 1.854a8.024 8.024 0 01-.22 7.598H5.043A8.024 8.024 0 016.154 8.49 8.011 8.011 0 0115.57 6.82l1.853-1.233A10.01 10.01 0 005.117 6.758a10.026 10.026 0 00-1.797 12.24A2.004 2.004 0 005.043 20h13.873a2.003 2.003 0 001.742-1.002 10.03 10.03 0 00-.27-10.465l-.01.01zm-9.806 6.856a2.004 2.004 0 002.835 0l5.669-8.51-8.504 5.673a2.005 2.005 0 000 2.837z"
        fill={color ?? '#ffffff'}
      />
    </Svg>
  );
};

export default SvgComponent;
