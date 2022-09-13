// 实现一个 RemoveIndexSignature 工具类型，用于移除已有类型中的索引签名。具体的使用示例如下所示：

// interface Foo {
//   [key: string]: any;
//   [key: number]: any;
//   bar(): void;
// }

// type RemoveIndexSignature<T> = // 你的实现代码

// type FooWithOnlyBar = RemoveIndexSignature<Foo>; //{ bar: () => void; }
// 请在下面评论你的答案。

interface Foo {
  [key: string]: any;
  [key: number]: any;
  bar(): void;
}
/***
 * 解   剔除类型中的索引签名
 * 
 * 遍历 T 得到联合类型 string | number | 'bar' // 查资料得知 **此时的 string 是数据类型， 并不是一个字符串 
 *    1.通过[P extends ${infer S}]可以区分到底是 数据类型 还是字面量数据类型
 * 通过查资料得知
 *    1.type A = 'bar' extends `${infer R}` ? true : false // true
      2.type B = string extends `${infer R}` ? true : false  // false
 *  [K extends ${infer S}] 可以推断出 数据类型 还是 字面量类型
      通过 返回true and false 进行判断 返回  数据类型 and never
      得到想要的数据
 */
type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${infer S}` ? S : never]: T[K]
}

type FooWithOnlyBar = RemoveIndexSignature<Foo>; //{ bar: () => void; }