export type Params = Record<string, unknown>;

// A marker instead of the method name to specify parameters as default values for all methods.
export type AcrossMethod = "_";

/**
 * Store and manage parameters for methods.
 */
export class ParamStore {
  #store = new Map<string | AcrossMethod, Map<string, unknown>>();
  /**
   * Store a parameter value for a specific method or as a default value for all methods.
   * @param {string} method - Target method name or "_" to specify a default value for all methods.
   * @param {string} name - The name of the parameter to store.
   * @param {unknown} value - The value of the parameter to store.
   */
  public storeParam(
    method: string | AcrossMethod,
    name: string,
    value: unknown,
  ) {
    const params = this.#store.get(method) || new Map<string, unknown>();
    params.set(name, value);
    this.#store.set(method, params);
  }

  /**
   * Store parameters for a specific method or as a default values for all methods.
   * @param {string} method - Target method name or "_" as a default values for all methods.
   * @param {Record<string, unknown>} parameters - A record holding parameter name and value pairs.
   */
  public storeParamsForMethod(
    method: string | AcrossMethod,
    parameters: Params,
  ) {
    const params = this.#store.get(method) || new Map<string, unknown>();
    for (const [name, value] of Object.entries(parameters)) {
      params.set(name, value);
    }
    this.#store.set(method, params);
  }

  /** Store parameters for each methods. */
  public storeParams(
    paramSet: Record<string | AcrossMethod, Params>,
  ) {
    for (const method in paramSet) {
      this.storeParamsForMethod(method, paramSet[method]);
    }
  }

  /**
   * Get stored parameter values for a specific method.
   * @param {string} method - Target method name.
   * @param {Record<string, unknown>} [override] - Optional parameter values to override the stored values.
   */
  public getParamsForMethod(method: string, override?: Params): Params {
    const across = this.#store.get("_") || new Map<string, unknown>();
    const target = this.#store.get(method) || new Map<string, unknown>();
    const result: Params = {};

    for (const [name, value] of across) {
      result[name] = value;
    }

    for (const [name, value] of target) {
      result[name] = value;
    }

    if (override) {
      Object.assign(result, override);
    }

    return result;
  }

  /** Get stored parameter values for all methods. */
  public getAllParams(): Record<string, Params> {
    const result: Record<string, Params> = {};

    for (const [method, params] of this.#store) {
      result[method] = Object.fromEntries(params);
    }

    return result;
  }

  /**
   * Clear one parameter for a specific method or as a default value for all methods (using "_").
   * @param {string | AcrossMethod} method - The method name or "_" to clear a default parameter for all methods.
   * @param {string} name - The name of the parameter to clear.
   */
  public clearParam(method: string | AcrossMethod, name: string) {
    const params = this.#store.get(method);
    if (params) {
      params.delete(name);
    }
  }

  /**
   * Clear all parameters for a specific method or as a default values for all methods (using "_").
   * @param {string | AcrossMethod} method - The method name or "_" to clear default parameters for all methods.
   */
  public clearParamsForMethod(method: string | AcrossMethod) {
    this.#store.delete(method);
  }

  /** Clear all parameters for all methods. */
  public clearAllParams() {
    this.#store.clear();
  }
}
