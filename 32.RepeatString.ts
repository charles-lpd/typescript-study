// 实现一个 RepeatString 工具类型，用于根据类型变量 C 的值，重复 T 类型并以字符串的形式返回新的类型。具体的使用示例如下所示：

// type RepeatString<
//   T extends string,
//   C extends number,
// > = // 你的实现代码

// type S0 = RepeatString<"a", 0>; // ''
// type S1 = RepeatString<"a", 2>; // 'aa'
// type S2 = RepeatString<"ab", 3>; // 'ababab'
/***
 * 一
 * 解题思路
 * 1. 利用 31 题 Repeat 转换成数组 [ab,ab,ab,ab]
 *   遍历数组 通过 infer A ...infer B 进行拼接字符串 得到对应要求
 */
type Repeat<T, C extends number,Arr extends any[] = []> = Arr['length'] extends C ? Arr : Repeat<T,C,[...Arr,T]>
type RepeatString<T extends any[]> = T extends [infer A,...infer B] ? B extends any[] ? A extends string ? `${A}${RepeatString<B>}`: '' : T : ''
type S0 = RepeatString<Repeat<"", 0>> // ''
type S1 = RepeatString<Repeat<"a", 2>> // 'aa'
type S2 = RepeatString<Repeat<"ab", 3>> // 'ababab'
type S3 = RepeatString<Repeat<"ab", 5>> // 'ababab'
/**
 * 二
 * 解题思路
 * 通过 通过数组的length 解决 ， A extends any[] = [] 相当于一个工具人 ，只是用作检测长度是否达到要求而已
 * 1. A['length']  extends C ''
 *    成功 返回 '' 
 *    失败
 *        返回 *** ${T} 必须存在 ***
 *        重新执行了一遍 RepeatString2 而已 ， 重新赋值 A
 *        当 A length 达到 C 时 返回 ''  重点在 ${T} 身上
 *    达到想要的需求
 */
 type RepeatString2<T extends string, C extends number, A extends any[] = []> = A['length'] extends C ? '' : `${T}${RepeatString2<T,C,[...A,T]>}`
type S4 = RepeatString2<"", 0> // ''
type S5 = RepeatString2<"a", 2> // 'aa'
type S6 = RepeatString2<"ab", 3> // 'ababab'
type S7 = RepeatString2<"ab", 5> // 'ababababab'