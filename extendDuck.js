import isPlainObject from "is-plain-object";
import * as deepmerge from "deepmerge";
import reduceReducers from "reduce-reducers";

export default function extendDuck(duck = {}, extension = {}) {
  if (!isPlainObject(duck)) {
    throw new Error("Duck has to be a plain object");
  }

  if (!isPlainObject(extension)) {
    throw new Error("Extension has to be a plain object");
  }

  const { reducer: reducerExtension } = extension;
  let extendedDuckReducer = {};

  if (reducerExtension) {
    const { reducer: initialReducer } = duck;
    const reducers = [initialReducer, reducerExtension];
    const extendedReducer = reduceReducers(...reducers);
    extendedDuckReducer = { reducer: extendedReducer };
  }

  return deepmerge.all([extension, duck, extendedDuckReducer]);
}
