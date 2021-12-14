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
        d="M70.344 11.999a5.206 5.206 0 00-7.375 0L27.928 47.04a4.15 4.15 0 000 5.875l35.041 35.041a5.206 5.206 0 007.375 0 5.206 5.206 0 000-7.375L39.761 50l30.625-30.625c2-2.042 2-5.333-.042-7.375z"
        fill={color ?? '#ffffff'}
      />
    </Svg>
  );
};

export default SvgComponent;
