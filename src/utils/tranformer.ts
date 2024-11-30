import serialize from "serialize-javascript";

export const transformer = {
  serialize,
  deserialize(data: any) {
    return eval("(" + data + ")");
  },
};
