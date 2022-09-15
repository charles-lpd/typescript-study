// 实现一个 ToNumber 工具类型，用于实现把数值字符串类型转换为数值类型。具体的使用示例如下所示：

// type ToNumber<T extends string> = // 你的实现代码

// type T0 = ToNumber<"0">; // 0
// type T1 = ToNumber<"10">; // 10
// type T2 = ToNumber<"20">; // 20
// 请在下面评论你的答案
/***
 * 解题思路
 * 1. 利用数组长度 与 T 进行 extends
 *    成功 
 *       返回 数组长度，所以 typeof A['length'] === number
 *    失败
 *       则继续 填充 A 数组的长度。直到 A['length'] extends C 成功
 */

type ToNumber<T extends string, A  extends any[] = []> = `${A['length']}` extends T ? A['length'] : ToNumber<T,[...A, '']>


export type T0 = ToNumber<"0">; // 0
export type T1 = ToNumber<"10">; // 10
export type T2 = ToNumber<"20">; // 20

