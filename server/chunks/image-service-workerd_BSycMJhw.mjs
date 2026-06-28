globalThis.process ??= {};
globalThis.process.env ??= {};
import { b as baseService } from "./image-passthrough-endpoint_CF1uke7d.mjs";
const service = {
  ...baseService,
  async transform(inputBuffer, transform) {
    return { data: inputBuffer, format: transform.format };
  }
};
var image_service_workerd_default = service;
export {
  image_service_workerd_default as default
};
