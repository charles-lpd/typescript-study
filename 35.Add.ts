// 实现一个 Add 工具类型，用于实现对数值类型对应的数值进行加法运算。具体的使用示例如下所示：

// type Add<T, R> = // 你的实现代码

// type A0 = Add<5, 5>; // 10
// type A1 = Add<8, 20> // 28
// type A2 = Add<10, 30>; // 40
// 请在下面评论你的答案
/**
 * 解题思路， 这道题确实简单
 * 根据前几题的锻炼 依旧是通过增加 数组长度的方法，来 判断 是否达到条件， 
 * 再通过将两个数组 解构成功一个数组，返回其 length 即可
 * 
 */
type GetArr<T extends number, A extends any[] = []> = A['length'] extends T ? A : GetArr<T,[...A,'']>
type Add<T extends number, R extends number> = [...GetArr<T>, ...GetArr<R>]['length']


type A0 = Add<5, 5>; // 10
type A1 = Add<8, 20> // 28
type A2 = Add<10, 30>; // 40