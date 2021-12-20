import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  const {width = 24, height = 24, color} = props;

  return (
    <Svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill={color ?? '#ffffff'}>
      <Path
        d="M20 2.083H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm-2 5h-3v5.5a2.5 2.5 0 01-5 0 2.5 2.5 0 012.5-2.5c.57 0 1.08.19 1.5.51v-5.51h4v2zm-14-1H2v14c0 1.1.9 2 2 2h14v-2H4v-14z"
        fill={color ?? '#fff'}
      />
    </Svg>
  );
};

export default SvgComponent;
