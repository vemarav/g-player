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
        d="M68.667 10.5c13.625 6.458 23.375 19.667 24.875 35.333h6.25C97.667 20.167 76.208 0 50 0l-2.75.125L63.125 16l5.542-5.5zM42.625 7.292c-2.458-2.459-6.417-2.459-8.833 0l-26.5 26.5c-2.459 2.458-2.459 6.416 0 8.833l50.083 50.083c2.458 2.459 6.417 2.459 8.833 0l26.5-26.5c2.459-2.458 2.459-6.416 0-8.833L42.625 7.292zm19.167 81L11.708 38.208l26.5-26.5 50.084 50.084-26.5 26.5zM31.333 89.5C17.708 83.083 7.958 69.833 6.458 54.167H.208C2.333 79.833 23.792 100 50 100l2.75-.125L36.875 84l-5.542 5.5z"
        fill={color ?? '#ffffff'}
      />
    </Svg>
  );
};

export default SvgComponent;
