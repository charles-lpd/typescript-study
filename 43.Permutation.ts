// 实现一个 Permutation 工具类型，当输入一个联合类型时，返回一个包含该联合类型的全排列类型数组。具体的使用示例如下所示：

// type Permutation<T, K=T> = // 你的实现代码

// type P0 = Permutation<"a" | "b">; // ['a', 'b'] | ['b' | 'a']
// type P1 = Permutation<"a" | "b" | "c"> // ["a", "b", "c"] | ["a", "c", "b"] | ["b", "a", "c"] | ["b", "c", "a"] | ["c", "a", "b"] | ["c", "b", "a"]


/***
 * 
 * 解题思路 -- 
 *  1. [T] extends [never] 防止传入 never 类型 需要包裹，不过多解释
 *  P0
 *  2. K === T  ，原因是保留 T 的全部属性
 *     K extends any 是为了利用分发机制完成要求 所以永远会成功
 *     "a" | "b" extends any === a extends any ? [a, ...Permutation<Exclude<"a"|"b", "a">>] | b extends any ? [b, ...Permutation<Exclude<"a"|"b", "b">>]
 *     知道 Exclude 是返回 T中除了K的联合类型，所以相当于筛选了一次 a 分发后筛选出 b， b 分发后筛选出 a  得到  ['a', 'b'] | ['b' | 'a'] 达到要求
 *  P1 一致 只是分发层次较多，因为再次调用了Permutation所以递归分发了
 *    
 *     "a" | "b" | "c" extends any === a extends any ? [a, ...Permutation<Exclude<"a" | "b" | "c", "a"> ] | 后面类似 
 * 
 */
type Permutation<T, K = T> = [T] extends [never] ? [] : K extends any ? [K, ...Permutation<Exclude<T,K>>] : never

type P0 = Permutation<"a" | "b">; // ['a', 'b'] | ['b' | 'a']

type P1 = Permutation<"a" | "b" | "c"> // ["a", "b", "c"] | ["a", "c", "b"] | ["b", "a", "c"] | ["b", "c", "a"] | ["c", "a", "b"] | ["c", "b", "a"]