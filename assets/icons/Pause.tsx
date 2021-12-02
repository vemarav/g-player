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
        d="M25 79.167h16.667V20.833H25v58.334zm33.333-58.334v58.334H75V20.833H58.333z"
        fill={color}
      />
    </Svg>
  );
};

export default SvgComponent;
