import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => {
  const {width, height, color} = props;

  return (
    <Svg width={width ?? 24} height={height ?? 24} viewBox="0 0 24 24" fill={color ?? '#ffffff'}>
      <Path
        d="M15.749 4.183c2.736 1.292 4.694 3.934 4.996 7.067H22c-.427-5.133-4.736-9.167-10-9.167l-.552.025 3.188 3.175 1.113-1.1zm-5.23-.641a1.251 1.251 0 00-1.774 0l-5.322 5.3a1.239 1.239 0 000 1.766L13.48 20.625a1.251 1.251 0 001.774 0l5.322-5.3a1.239 1.239 0 000-1.767L10.52 3.542zm3.85 16.2L4.308 9.725l5.323-5.3L19.69 14.442l-5.322 5.3zm-6.118.241a8.741 8.741 0 01-4.996-7.066H2c.427 5.133 4.736 9.166 10 9.166l.552-.025-3.188-3.175-1.113 1.1z"
        fill={color ?? '#fff'}
      />
    </Svg>
  );
};

export default SvgComponent;
