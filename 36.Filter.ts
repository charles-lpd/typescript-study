// 实现一个 Filter 工具类型，用于根据类型变量 F 的值进行类型过滤。具体的使用示例如下所示：

// type Filter<T extends any[], F> = // 你的实现代码

// type F0 = Filter<[6, "lolo", 7, "semlinker", false], number>; // [6, 7]
// type F1 = Filter<["kakuqo", 2, ["ts"], "lolo"], string>; // ["kakuqo", "lolo"]
// type F2 = Filter<[0, true, any, "abao"], string>; // [any, "abao"]
// 请在下面评论你的答案
/***
 * ** 检测 any类型 返回 boolean **
 *  type IsAny<T> = 0 extends (1 & T) ? true : false
 *  
 *  解题思路
 *  1. infer 拿到 第一项参数和剩余参数
 *   判断 是否是 any类型 
 *      成功 === 返回any 类型，避免分发
 *      失败  
 *         判断 是否是 F 类型， 
 *          成功 === 返回 First 
 *          失败 === 继续比较 返回 A 
 */
type IsAny<T> = 0 extends (1 & T) ? true : false
type Filter<T extends any[], F,A extends any[] = []> = T extends [infer First,...infer Last] ? IsAny<First> extends true ? Filter<Last,F,[...A,First]> : First extends F ? Filter<Last,F,[...A, First]> : Filter<Last,F,A> : A

type F0 = Filter<[6, "lolo", 7, "semlinker", false], number>; // [6, 7]
type F1 = Filter<["kakuqo", 2, ["ts"], "lolo"], string>; // ["kakuqo", "lolo"]
type F2 = Filter<[0, true, any, "abao"], string>; // [any, "abao"]



