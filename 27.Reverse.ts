// 实现一个 Reverse 工具类型，用于对元组类型中元素的位置颠倒，并返回该数组。元组的第一个元素会变成最后一个，最后一个元素变成第一个。

// type Reverse<
//   T extends Array<any>,
//   R extends Array<any> = []
// > = // 你的实现代码

// type R0 = Reverse<[]> // []
// type R1 = Reverse<[1, 2, 3]> // [3, 2, 1]
// 请在下面评论你的答案。

/***
 * 
 * 利用 extends 属性分发 [infer A,...infer B] 拿到 A，B
 * 为真 证明 A 存在 剩余参数 B 
 * 重新对 B 进行 Reverse，并且 将 A 存在 R 数组中，并扩展R数组 === Reverse<B, [A,...R]>
 * 每 Reverse 一次就会 R 数组 就会改变
 * 直到 A 不存在 返回 R 达到要求
 * 
 */
type Reverse<
  T extends Array<any>,
  R extends Array<any> = []
> = T extends [infer A, ...infer B] ? Reverse<B, [A,...R]> : R

type R1 = Reverse<[]> // [3, 2, 1]
