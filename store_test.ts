import { assertEquals } from "jsr:@std/assert@0.224.0";
import { test } from "https://deno.land/x/denops_test@v1.6.2/mod.ts";
import { ParamStore } from "./store.ts";

test({
  mode: "all",
  name: "stores a parameter value for a specific method",
  fn: () => {
    const paramStore = new ParamStore();
    paramStore.storeParam("method1", "param1", true);
    assertEquals(paramStore.getParamsForMethod("method1"), { param1: true });
  },
});

test({
  mode: "all",
  name: "stores a default parameter value for all methods",
  fn: () => {
    const paramStore = new ParamStore();
    paramStore.storeParam("_", "defaultParam", false);
    assertEquals(paramStore.getParamsForMethod("_"), { defaultParam: false });
    assertEquals(paramStore.getParamsForMethod("method1"), {
      defaultParam: false,
    });
  },
});

test({
  mode: "all",
  name: "stores parameters for multiple methods",
  fn: () => {
    const paramStore = new ParamStore();
    paramStore.storeParams({
      method1: { param1: true, param2: false },
      method2: { param3: true, param4: false },
    });
    assertEquals(paramStore.getParamsForMethod("method1"), {
      param1: true,
      param2: false,
    });
    assertEquals(paramStore.getParamsForMethod("method2"), {
      param3: true,
      param4: false,
    });
  },
});

test({
  mode: "all",
  name: "gets all stored parameter values",
  fn: () => {
    const paramStore = new ParamStore();
    paramStore.storeParam("_", "defaultParam1", true);
    paramStore.storeParam("method1", "param1", false);
    assertEquals(paramStore.getAllParams(), {
      _: { defaultParam1: true },
      method1: { param1: false },
    });
  },
});

test({
  mode: "all",
  name: "clears a single parameter value for a specific method or all methods",
  fn: () => {
    const paramStore = new ParamStore();
    paramStore.storeParam("_", "defaultParam1", true);
    paramStore.clearParam("_", "defaultParam1");
    assertEquals(paramStore.getParamsForMethod("_"), {});

    paramStore.storeParam("method1", "param1", false);
    paramStore.clearParam("method1", "param1");
    assertEquals(paramStore.getParamsForMethod("method1"), {});
  },
});

test({
  mode: "all",
  name: "clears all parameter values for a specific method or all methods",
  fn: () => {
    const paramStore = new ParamStore();
    paramStore.storeParam("_", "defaultParam1", true);
    paramStore.storeParam("method1", "param1", false);
    paramStore.clearAllParams();
    assertEquals(paramStore.getAllParams(), {});
  },
});
