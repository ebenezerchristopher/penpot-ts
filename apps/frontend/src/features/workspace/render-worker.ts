// apps/frontend/src/features/workspace/render-worker.ts

import type { MainToWorkerMessage, WorkerShape } from '@penpot/common-types'; // <-- IMPORT TYPES

// Placeholder for the real WASM API
const wasmApi = {
  initialize_scene: (canvas: OffscreenCanvas) => {
    console.log('[Worker] WASM: Initializing scene with canvas', canvas);
  },
  add_shape: (shape: WorkerShape) => {
    // <-- Use WorkerShape type
    console.log('[Worker] WASM: Adding shape', shape);
  },
  render_scene: () => {
    console.log('[Worker] WASM: Rendering scene.');
  },
};

// Use a type guard to ensure the event data matches our defined message type
self.onmessage = (event: MessageEvent<MainToWorkerMessage>) => {
  const { type } = event.data;

  switch (type) {
    case 'INIT': {
      // TypeScript now knows that event.data contains a 'canvas' property
      const { canvas } = event.data;
      wasmApi.initialize_scene(canvas);
      self.postMessage({ type: 'INIT_COMPLETE' });
      break;
    }
    case 'ADD_SHAPE': {
      // TypeScript knows that event.data contains a 'shape' property
      const { shape } = event.data;
      wasmApi.add_shape(shape);
      break;
    }
    case 'RENDER': {
      wasmApi.render_scene();
      break;
    }
    default: {
      // This default case will now error if we haven't handled all message types
      console.error(`[Worker] Unknown message type`);
      break;
    }
  }
};

console.log('[Worker] Render worker loaded.');
