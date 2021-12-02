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
        d="M68.75 50c0-7.375-4.25-13.708-10.417-16.792v9.209l10.209 10.208c.125-.833.208-1.708.208-2.625zm10.417 0c0 3.917-.834 7.583-2.25 11l6.291 6.292C85.958 62.125 87.5 56.25 87.5 50c0-17.833-12.458-32.75-29.167-36.542v8.584C70.375 25.625 79.167 36.792 79.167 50zM17.792 12.5L12.5 17.792 32.208 37.5H12.5v25h16.667L50 83.333V55.292L67.708 73c-2.791 2.167-5.916 3.875-9.375 4.917V86.5c5.75-1.292 10.959-3.958 15.375-7.542l8.5 8.542 5.292-5.292-37.5-37.5L17.792 12.5zM50 16.667l-8.708 8.708L50 34.083V16.667z"
        fill={color}
      />
    </Svg>
  );
};

export default SvgComponent;
