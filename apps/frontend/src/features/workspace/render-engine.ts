// apps/frontend/src/features/workspace/render-engine.ts

import type { WorkerShape, MainToWorkerMessage } from '@penpot/common-types'; // <-- IMPORT TYPES

export class RenderEngine {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(new URL('./render-worker.ts', import.meta.url), {
      type: 'module',
    });

    // Optional: Handle messages from the worker
    this.worker.onmessage = (event) => {
      console.log('[Main] Message from worker:', event.data);
    };
  }

  private postMessage(
    message: MainToWorkerMessage,
    transfer?: Transferable[]
  ): void {
    this.worker.postMessage(message, transfer || []);
  }

  async initialize(canvas: OffscreenCanvas): Promise<void> {
    this.postMessage({ type: 'INIT', canvas }, [canvas]);
    console.log('Render engine initialization message sent.');
  }

  addShape(shape: WorkerShape): void {
    // <-- Use WorkerShape type
    this.postMessage({ type: 'ADD_SHAPE', shape });
  }

  render(): void {
    this.postMessage({ type: 'RENDER' });
  }

  terminate(): void {
    this.worker.terminate();
  }
}
