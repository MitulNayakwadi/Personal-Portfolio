export as namespace React;

declare module 'react' {
  export type ReactNode = any;
  export type FC<P = {}> = (props: P & { children?: ReactNode }) => JSX.Element | null;
  export type MouseEvent = any;
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  const React: any;
  export default React;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any): any;
  export function jsxs(type: any, props: any): any;
  export function jsxDEV(type: any, props: any): any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare global {
  namespace React {
    type ReactNode = any;
    type FC<P = {}> = (props: P & { children?: ReactNode }) => JSX.Element | null;
    type MouseEvent = any;
    function useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void];
    function useEffect(cb: () => void | (() => void), deps?: any[]): void;
    function useRef<T>(initial?: T | null): { current: T | null };
  }
}
