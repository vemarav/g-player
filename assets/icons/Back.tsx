import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  const {width, height, color} = props;

  return (
    <Svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill={color ?? '#ffffff'}>
      <Path
        d="M17.77 3.77L16 2 6 12l10 10 1.77-1.77L9.54 12l8.23-8.23z"
        fill={color ?? '#ffffff'}
      />
    </Svg>
  );
};

export default SvgComponent;
