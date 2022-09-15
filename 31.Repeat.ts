// 实现一个 Repeat 工具类型，用于根据类型变量 C 的值，重复 T 类型并以元组的形式返回新的类型。具体的使用示例如下所示：

// type Repeat<T, C extends number> = // 你的实现代码

// type R0 = Repeat<0, 0>; // []
// type R1 = Repeat<1, 1>; // [1]
// type R2 = Repeat<number, 2>; // [number, number]
// 请在下面评论你的答案


/***
 * 解题思路 
 *  1. 先给 Repeat 接收 Arr extends any[] 的数组 (默认空数组)
 *  2. 判断 Arr 数组的length 是否达到 C 也就是 Arr['length'] extends C 
 *     成功 
 *        证明 Arr 中已经达到 C 个 T
 *     失败 继续执行 Repeat ， 并将 T 添加到 Arr 中，解构当前 ...Arr 
 */
type Repeat<T, C extends number,Arr extends any[] = []> = Arr['length'] extends C ? Arr : Repeat<T,C,[...Arr,T]>

type R0 = Repeat<0, 0>; // []
type R1 = Repeat<1, 1>; // [1]
type R2 = Repeat<number, 5>; // [number, number, number, number, number]