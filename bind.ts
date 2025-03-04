import { ensure, is } from "@core/unknownutil";
import type { Dispatcher } from "@denops/core";
import { ParamStore } from "./store.ts";

/**
 * Bind dispatcher to ParamStore.
 * It will reserve parameters for each method by reservation methods (`${customMethodsPrefix}params:*`) that are generated by this function.
 *
 * @param dispatcher Dispatcher
 * @param paramStore ParamStore instance to be used for storing parameters if you need.
 * @param customMethodsPrefix Prefix for custom methods like params:set-one if you need.
 * @returns Dispatcher
 *
 * @example
 * ```typescript
 * import { bindDispatcher } from "@kyoh86/denops-bind-params";
 * import { ensure, is } from "@core/unknownutil";
 *
 * export function main(denops: Denops) {
 *     denops.dispatcher = bindDispatcher({
 *       hello(uParams: unknown) {
 *         const {name, age} = uParams as is.ObjectOf({
 *             name: is.String,
 *             age: is.Number,
 *         });
 *         return `Hello, ${name}! You are ${age} years old.`;
 *       },
 *     });
 * }
 * ```
 */
export function bindDispatcher<T extends Dispatcher, K extends string>(
  dispatcher: T,
  paramStore: ParamStore = new ParamStore(),
  customMethodsPrefix: K = "" as K,
):
  & T
  & {
    [N in `${K}params:set-one`]: (
      uMethod: unknown,
      uName: unknown,
      value: unknown,
    ) => void;
  }
  & {
    [N in `${K}params:set-for-method`]: (
      uMethod: unknown,
      uParams: unknown,
    ) => void;
  }
  & { [N in `${K}params:set-all`]: (uParamSet: unknown) => void }
  & { [N in `${K}params:get-for-method`]: (uMethod: unknown) => void }
  & { [N in `${K}params:get-all`]: () => void }
  & {
    [N in `${K}params:clear-one`]: (uMethod: unknown, uName: unknown) => void;
  }
  & { [N in `${K}params:clear-for-method`]: (uMethod: unknown) => void }
  & { [N in `${K}params:clear-all`]: () => void } {
  // dispatcherのメソッドをbindMethodで変換
  const transformed = Object.fromEntries(
    Object.entries(dispatcher).map(([methodName, fn]) => {
      return [methodName, bindMethod(paramStore, methodName, fn)];
    }),
  ) as T;

  return {
    ...transformed,
    [`${customMethodsPrefix}params:set-one`]: (
      uMethod: unknown,
      uName: unknown,
      value: unknown,
    ) => {
      paramStore.storeParam(
        ensure(uMethod, is.String),
        ensure(uName, is.String),
        value,
      );
    },

    [`${customMethodsPrefix}params:set-for-method`]: (
      uMethod: unknown,
      uParams: unknown,
    ) => {
      paramStore.storeParamsForMethod(
        ensure(uMethod, is.String),
        ensure(uParams, is.RecordOf(is.Unknown, is.String)),
      );
    },

    [`${customMethodsPrefix}params:set-all`]: (
      uParamSet: unknown,
    ) => {
      const paramSet = ensure(uParamSet, is.RecordOf(is.Record, is.String));
      paramStore.storeParams(paramSet);
    },

    [`${customMethodsPrefix}params:get-for-method`]: (
      uMethod: unknown,
    ) => {
      return paramStore.getParamsForMethod(ensure(uMethod, is.String));
    },

    [`${customMethodsPrefix}params:get-all`]: () => {
      return paramStore.getAllParams();
    },

    [`${customMethodsPrefix}params:clear-one`]: (
      uMethod: unknown,
      uName: unknown,
    ) => {
      paramStore.clearParam(
        ensure(uMethod, is.String),
        ensure(uName, is.String),
      );
    },

    [`${customMethodsPrefix}params:clear-for-method`]: (
      uMethod: unknown,
    ) => {
      paramStore.clearParamsForMethod(ensure(uMethod, is.String));
    },

    [`${customMethodsPrefix}params:clear-all`]: () => {
      paramStore.clearAllParams();
    },
  };
}

/** Bind a method to the ParamStore. It will reserve parameters.
 *
 * @param paramStore ParamStore instance to be used for storing parameters.
 * @param methodName Method name to be bound.
 * @param method Method to be bound.
 *
 * @example
 * ```typescript
 * import { bindMethod, ParamStore } from "@kyoh86/denops-bind-params";
 * import { ensure, is } from "@core/unknownutil";
 * export function main(denops: Denops) {
 *   const paramStore = new ParamStore();
 *
 *   denops.dispatcher = {
 *     openBuffer: bindMethod(paramStore, "hello", (uParams) => {
 *       const {name, age} = uParams as is.ObjectOf({
 *           name: is.String,
 *           age: is.Number,
 *       });
 *       return `Hello, ${name}! You are ${age} years old.`;
 *     }),
 *   };
 * }
 * ```
 */
export function bindMethod(
  paramStore: ParamStore,
  methodName: string,
  method: (...args: unknown[]) => unknown,
): (params: unknown) => unknown {
  return (params: unknown) => {
    return method(
      paramStore.getParamsForMethod(
        methodName,
        params ? ensure(params, is.RecordOf(is.Unknown, is.String)) : {},
      ),
    );
  };
}
