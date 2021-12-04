import {useRef, useEffect} from 'react';

export const getValue = (animated: any) => {
  return animated.value ?? animated._value;
};

export const getTime = (seconds: number) => {
  const _seconds = `${Math.floor(seconds) % 60}`.padStart(2, '0');
  const _minutes = `${Math.floor(seconds / 60) % 60}`.padStart(2, '0');
  const _hours = `${Math.floor(seconds / 3600) % 24}`.padStart(2, '0');
  if (Number(_hours) > 0) {
    return `${_hours}:${_minutes}:${_seconds}`;
  } else {
    return `${_minutes}:${_seconds}`;
  }
};

export const usePrevious = (value: any): boolean => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current ?? false;
};
