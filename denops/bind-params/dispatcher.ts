import { Dispatcher } from "https://deno.land/x/denops_std@v6.4.0/mod.ts";
import { ParamStore } from "./store.ts";
import { ensure, is } from "https://deno.land/x/unknownutil@v3.18.0/mod.ts";

/** Bind a method to the ParamStore.
 * It will reserve parameters.
 *
 * @param paramStore ParamStore instance to be used for storing parameters.
 * @param methodName Method name to be bound.
 * @param method Method to be bound.
 */
export function bindMethod(
  paramStore: ParamStore,
  methodName: string,
  method: (...args: unknown[]) => unknown,
) {
  return (params: unknown) => {
    return method(
      paramStore.getParamsForMethod(
        methodName,
        params ? ensure(params, is.RecordOf(is.Unknown, is.String)) : {},
      ),
    );
  };
}

/**
 * Bind dispatcher to ParamStore.
 * It will reserve parameters for each method.
 * And it provides some methods to reserve parameters.
 *
 * @param dispatcher Dispatcher
 * @param paramStore ParamStore instance to be used for storing parameters.
 * @param customMethodsPrefix Prefix for custom methods.
 * @returns Dispatcher
 */
export function bindDispatcher(
  dispatcher: Dispatcher,
  paramStore = new ParamStore(),
  customMethodsPrefix: string = "",
) {
  for (const methodName of Object.keys(dispatcher)) {
    dispatcher[methodName] = bindMethod(
      paramStore,
      methodName,
      dispatcher[methodName],
    );
  }

  dispatcher[`${customMethodsPrefix}params:set-one`] = (
    uMethod: unknown,
    uName: unknown,
    value: unknown,
  ) => {
    paramStore.storeParam(
      ensure(uMethod, is.String),
      ensure(uName, is.String),
      value,
    );
  };

  dispatcher[`${customMethodsPrefix}params:set-for-method`] = (
    uMethod: unknown,
    uParams: unknown,
  ) => {
    paramStore.storeParamsForMethod(
      ensure(uMethod, is.String),
      ensure(uParams, is.RecordOf(is.Unknown, is.String)),
    );
  };

  dispatcher[`${customMethodsPrefix}params:set-all`] = (
    uParamSet: unknown,
  ) => {
    const paramSet = ensure(uParamSet, is.RecordOf(is.Record, is.String));
    paramStore.storeParams(paramSet);
  };

  dispatcher[`${customMethodsPrefix}params:get-for-method`] = (
    uMethod: unknown,
  ) => {
    return paramStore.getParamsForMethod(ensure(uMethod, is.String));
  };

  dispatcher[`${customMethodsPrefix}params:get-all`] = () => {
    return paramStore.getAllParams();
  };

  dispatcher[`${customMethodsPrefix}params:clear-one`] = (
    uMethod: unknown,
    uName: unknown,
  ) => {
    paramStore.clearParam(
      ensure(uMethod, is.String),
      ensure(uName, is.String),
    );
  };

  dispatcher[`${customMethodsPrefix}params:clear-for-method`] = (
    uMethod: unknown,
  ) => {
    paramStore.clearParamsForMethod(ensure(uMethod, is.String));
  };

  dispatcher[`${customMethodsPrefix}params:clear-all`] = () => {
    paramStore.clearAllParams();
  };

  return dispatcher;
}
