// types/react-swipeable.d.ts

import { HTMLAttributes } from 'react';

declare module 'react-swipeable' {
  interface SwipeEventData {
    event: React.TouchEvent | React.MouseEvent;
    dir: string;
    velocity: number;
    delta: { x: number; y: number };
  }

  interface SwipeableConfig {
    onSwiped?: (eventData: SwipeEventData) => void;
    onSwiping?: (eventData: SwipeEventData) => void;
    onSwipedUp?: (eventData: SwipeEventData) => void;
    onSwipedDown?: (eventData: SwipeEventData) => void;
    onSwipedLeft?: (eventData: SwipeEventData) => void;
    onSwipedRight?: (eventData: SwipeEventData) => void;
    preventDefaultTouchmoveEvent?: boolean;
    trackMouse?: boolean;
    trackTouch?: boolean;
    delta?: number;
  }

  export function useSwipeable(config: SwipeableConfig): HTMLAttributes<HTMLElement>;
}
