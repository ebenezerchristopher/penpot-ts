// packages/common-types/src/index.ts

export * from './base';
export * from './path';
export * from './shapes';
export * from './component';
export * from './page';
export * from './file';
export * from './token'; // <-- NEW
export * from './variant'; // <-- NEW

// Existing placeholder type
export type Placeholder = {
  id: string;
  name: string;
};

// --- NEW TYPES FOR RENDER WORKER ---

// The shape data sent to the worker. We use Placeholder for now.
// This will eventually become a more complex discriminated union of all shape types.
export type WorkerShape = Placeholder;

// Messages sent FROM the main thread TO the worker
export type MainToWorkerMessage =
  | {
      type: 'INIT';
      canvas: OffscreenCanvas;
    }
  | {
      type: 'ADD_SHAPE';
      shape: WorkerShape;
    }
  | {
      type: 'RENDER';
    };

// Messages sent FROM the worker back TO the main thread
export type WorkerToMainMessage = {
  type: 'INIT_COMPLETE';
};

console.log('Penpot Common Types Package');
