// 实现 JsonifiedObject 工具类型，用于对 object 对象类型进行序列化操作。具体的使用示例如下所示：

// type JsonifiedObject<T extends object> = // 你的实现代码

type MyObject = {
  str: 'literalstring'
  fn: () => void
  date: Date
  customClass: MyClass
  obj: {
    prop: 'property'
    clz: MyClass
    nested: { attr: Date }
  }
}

declare class MyClass {
  toJSON(): 'MyClass'
}
// /**
//  * type JsonifiedMyObject = {
//  *  str: "literalstring";
//  *  fn: never;
//  *  date: string;
//  *  customClass: "MyClass";
//  *  obj: JsonifiedObject<{
//  *    prop: "property";
//  *    clz: MyClass;
//  *    nested: {
//  *      attr: Date;
//  *    };
//  *   }>;
//  * }
// */
// type JsonifiedMyObject = Jsonified<MyObject>;
// declare let ex: JsonifiedMyObject;
// const z1: "MyClass" = ex.customClass;
// const z2: string = ex.obj.nested.attr;
/***
 *
 * 解题思路
 * 目的 将 函数 变成 never ， 将 MyClass 类，变成 toJSON 函数的返回值 其他的都正常返回
 * 1. 遍历对象 不多讲解 K in keyof Object
 *
 *
 * // 步骤
 *   首先 T[K] extends Object 首先判断 是不是对象
 *    1. 成功
 *       判断 toJSON extends keyof T[K]
 *        1-1. 成功 (证明 键名 toJSON 包含在T[K]中 然后就去取 toJSON 的返回值)
 *              判断 T[K]['toJSON'] extends (...args:any[]) => infer R
 *                1-1-1. 成功 (通过 infer 推断 toJSON 的返回值)
 *                         返回 R 即可
 *                1-1-2. 失败 (证明 T[K] 是一个对象 并且 键名 toJSON 也包含在 T[K] 中， 但是 T[K]['toJSON'] 却不是一个函数)
 *                         返回 never
 *        1-2. 失败 (证明键名 toJSON 不存在T[K] 继续判断是否是函数)
 *              判断 T[K] extends (...args:any[])=> any
 *                1-2-1. 成功 (证明T[K]是一个函数 返回 never)
 *                         返回 never
 *                1-2-2. 失败 (证明T[K]是一个对象 ，并且键名 toJSON 不存在T[K]，而且还不是一个函数)
 *                         返回 Jsonified 继续调用 T[K] 即可
 *    2. 失败
 *        返回 自身 T[K]
 *
 *
 */
type Jsonified<T extends object> = {
  [K in keyof T]: T[K] extends Object
    ? 'toJSON' extends keyof T[K]
      ? T[K]['toJSON'] extends (...args: any[]) => infer R
        ? R
        : never
      : T[K] extends (...args: any[]) => any
      ? never
      : Jsonified<T[K]>
    : T[K]
}

type ObjectTest = {
  prop: 'property'
  clz: MyClass
  nested: {
    attr: Date
  }
}
type AAa = Jsonified<ObjectTest>
type JsonifiedMyObject = Jsonified<MyObject>
declare let ex: JsonifiedMyObject
const z1: 'MyClass' = ex.customClass
const z2: string = ex.obj.nested.attr
