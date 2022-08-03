// 实现一个 IsEqual 工具类型，用于比较两个类型是否相等。具体的使用示例如下所示
// type IsEqual<A, B> = // 你的实现代码

// // 测试用例
// type E0 = IsEqual<1, 2>; // false
// type E1 = IsEqual<{ a: 1 }, { a: 1 }> // true
// type E2 = IsEqual<[1], []>; // false
/***
 *  判断A===B and B === A 
 *  使用 [] 进行包裹
 *  否则联合类型的时候会会进行分发处理
 *  never 会直接返回 never
 * 
 */
type IsEqual<A,B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
type E0 = IsEqual<1, 2>; // false
type E1 = IsEqual<{ a: string }, { a: string }> // true
type E2 = IsEqual<[1], []>; // false
type E3 = IsEqual<never, never>; // false