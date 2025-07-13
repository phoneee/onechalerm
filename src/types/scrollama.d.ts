declare module 'scrollama' {
  interface ScrollamaInstance {
    setup(options: {
      step: string | Element[] | NodeList;
      offset?: number;
      progress?: boolean;
      threshold?: number;
      order?: boolean;
      once?: boolean;
      debug?: boolean;
      parent?: Element[] | Element;
    }): ScrollamaInstance;
    
    onStepEnter(callback: (response: {
      element: Element;
      direction: 'up' | 'down';
      index: number;
    }) => void): ScrollamaInstance;
    
    onStepExit(callback: (response: {
      element: Element;
      direction: 'up' | 'down';
      index: number;
    }) => void): ScrollamaInstance;
    
    onStepProgress(callback: (response: {
      element: Element;
      progress: number;
      index: number;
    }) => void): ScrollamaInstance;
    
    onContainerEnter(callback: (response: {
      direction: 'up' | 'down';
    }) => void): ScrollamaInstance;
    
    onContainerExit(callback: (response: {
      direction: 'up' | 'down';
    }) => void): ScrollamaInstance;
    
    disable(): void;
    enable(): void;
    destroy(): void;
    resize(): void;
    getOffset(): number;
    setOffset(offset: number): void;
    setProgressThreshold(threshold: number): void;
  }

  function scrollama(): ScrollamaInstance;
  
  export default scrollama;
}