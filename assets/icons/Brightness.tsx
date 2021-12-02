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
        d="M12.5 37.5v25h16.667L50 83.333V16.667L29.167 37.5H12.5zM68.75 50c0-7.375-4.25-13.708-10.417-16.792V66.75C64.5 63.708 68.75 57.375 68.75 50zM58.333 13.458v8.584C70.375 25.625 79.167 36.792 79.167 50c0 13.208-8.792 24.375-20.834 27.958v8.584C75.042 82.75 87.5 67.833 87.5 50c0-17.833-12.458-32.75-29.167-36.542z"
        fill={color}
      />
    </Svg>
  );
};

export default SvgComponent;
