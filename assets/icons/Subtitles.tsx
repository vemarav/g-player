import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  const {width, height, color} = props;

  return (
    <Svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill={color ?? '#ffffff'}>
      <Path
        d="M20 3.167H4c-1.1 0-2 .937-2 2.083v12.5c0 1.146.9 2.083 2 2.083h16c1.1 0 2-.937 2-2.083V5.25c0-1.146-.9-2.083-2-2.083zM4 11.5h4v2.083H4V11.5zm10 6.25H4v-2.083h10v2.083zm6 0h-4v-2.083h4v2.083zm0-4.167H10V11.5h10v2.083z"
        fill={color ?? '#ffffff'}
      />
    </Svg>
  );
};

export default SvgComponent;
