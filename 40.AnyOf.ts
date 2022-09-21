// 实现 AnyOf 工具类型，只要数组中任意元素的类型非 Falsy 类型、 {} 类型或 [] 类型，则返回 true，否则返回 false。如果数组为空的话，则返回 false。具体的使用示例如下所示：

// type AnyOf<T extends any[]> = // 你的实现代码

// type A0 = AnyOf<[]>; // false
// type A1 = AnyOf<[0, '', false, [], {}]> // false
// type A2 = AnyOf<[1, "", false, [], {}]> // true
// 请在下面评论你的答案

type NotEmptyObject<T> = T extends {} ? ({} extends T ? false : true) : true 
type Falsy = 0 | '' | false | []
/***
 * 
 * 解题思路
 * 数组的话 通过 extends [infer A,...infer B] 来 对每一个 字段的判断
 * 首先判断的是 Falsy， 但是无法判断 {}, 成功 返回 false
 * 失败 再去判断是否为空对象， 
 *  T extends {} && {} extends T , 
 *  成功返回 false
 *  失败返回 true
 * 
 * 
 */
type AnyOf<T extends any[]> = T extends [infer A,...infer B] ? A extends Falsy ? AnyOf<B>  : NotEmptyObject<A> : false

type A0 = AnyOf<[]>; // false
type A1 = AnyOf<[0, '', false, [], {}]> // false
type A2 = AnyOf<[1, "", false, []]> // true