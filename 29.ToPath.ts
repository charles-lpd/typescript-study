// 实现一个 ToPath 工具类型，用于把属性访问（. 或 []）路径转换为元组的形式。具体的使用示例如下所示：

// type ToPath<S extends string> = // 你的实现代码

// ToPath<'foo.bar.baz'> //=> ['foo', 'bar', 'baz']
// ToPath<'foo[0].bar.baz'> //=> ['foo', '0', 'bar', 'baz']
// 请在下面评论你的答案。

// type ToPath<S extends string> = // 你的实现代码

// ToPath<'foo.bar.baz'> //=> ['foo', 'bar', 'baz']
// ToPath<'foo[0].bar.baz'> //=> ['foo', '0', 'bar', 'baz']
/**
 * 解题步骤 例:foo[0][1][3][4]
 * 1.通过infer 推断符合 是否成功  // 转变成数组 A === foo, B ==== 0, C === 1][3][4
 *    成功返回数组 [A , B, ...IndexSignature<`[${C}]`>] 
 *      a. 为什么要使用扩展运算符，因为 IndexSignature 最终返回的 [] 是数组，所以 需要使用扩展运算符
 *      b. 为什么 IndexSignature<`[${C}]`> 外面包裹了一层 []  因为判断是根据数组的 [] 字符去做的判断， 所以 ABC 都会 失去相应的 [] 符号  
 *         A === foo, B === 0 , C === 1][3][4  所以 C 需要包裹一下 才可以执行 
 *      c. 注意 当被包裹后 C [1][3][4] 传入 IndexSignature 时 infer A === ""  虽然 A 没有根本不存在， 但是会被理解成为空字符串 传入数组中， (后续会解决进行删除空字符传)
 *    失败又做了一层判断 T extends `${infer D}[${infer E}]`
 *      a. 因为判断到最后会剩下 [4] 不合符 A[B][C] 但是符合 D[E], 推断出 D 最后是空字符串 E 是最后的一位
 *      b. 所以返回 [D, E]
 *    得到 ["foo", "0", "", "1", "", "3", "", "4"]
 *    总结 // 其实 所有步骤 都是在 [A,B, ...IndexSignature<`[${C}]`>] 这一个 IndexSignature 完成的，这也就是为什么[D,E] 为什么要返回数组的原因 类似深层次递归方法而已，不懂可以多看几遍
 */
type IndexSignature<T extends string> = T extends `${infer A}[${infer B}][${infer C}]` ? [A,B, ...IndexSignature<`[${C}]`>] : T extends `${infer D}[${infer E}]` ? [D,E] : [T]

/**
 * 删除数组中空字符串
 * 解题步骤
 * 1. 简单的 通过infer 推断出 数组中的第一个 和 剩余参数
 * 2. Last 判断 string[]   ***(此时 Last 就是 string 数组) 首先 T 已经约束 stirng[] 所以 剩余参数 就是 string[]，但是以防万一,还是判断为好，所以返回never,证明该ts内置工具不可用 **
 *    成功 继续判断 First 是否为空字符串，用于我们删除数组中的空字符串
 *         成功 证明First 是空字符串不需要所以返回 [...NonSpace<Last>] 继续对 Last数组 进行删除字符串
 *         失败 证明 First 不为空字符串 返回 [First, ...NonSpace<Last>]
 *    失败 返回 never 
 * 得到 ["foo", "0", "1", "3", "4"]
 * 总结 // 很简单的删除空字符串方法，不过多解释
 */
type NonSpace<T extends string[]> = T extends [infer First, ...infer Last] ? Last extends string[] ? First extends '' ? [...NonSpace<Last>] : [First, ...NonSpace<Last>] : never : T

/**
 * 结合 IndexSignature NonSpace 达到要求 例: foo[0].[2][3][4].bar[5][6].baz[12][13]
 * 解题步骤 
 * 1. T 约束 string 
 * 2. 判断 `${infer A}.${infer B}` 也就是 通过 . 进行了分割 A === foo[0], B === [2][3][4].bar[5][6].baz[12][13]
 *    成功 证明 A 里面 没有 '.' 了 ，然后通过 NonSpace<IndexSignature<A>> 进行 转数组并且清除空字符串, 因为B 中很可能还会有 '.'  所以要对 B 进行 ToPath<B>,  因为它们都返回的数组，所以需要扩展运算符 ...
 *    失败 证明 T 中已经没有 '.' 了，直接通过 NonSpace<IndexSignature<A>> 进行 转数组并且清除空字符串 处理即可。
 */
type ToPath<T extends string> = T extends `${infer A}.${infer B}` ? [...NonSpace<IndexSignature<A>>,...ToPath<B>] : [...NonSpace<IndexSignature<T>>]
type t1 = ToPath<"foo.bar.baz">; //=> ['foo', 'bar', 'baz']
type t2 = ToPath<"foo[0].[2][3][4].bar[5][6].baz[12][13]">; //=> ['foo','0','2','3','4','bar','5','6','baz','12','13']