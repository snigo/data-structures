export function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export type JSONValue =
  | boolean
  | number
  | string
  | null
  | JSONArray
  | JSONObject;

export interface JSONObject {
  [key: string]: JSONValue;
}

export interface JSONArray extends ArrayLike<JSONValue> {}
