// 实现一个 Flat 工具类型，支持把数组类型拍平（扁平化）。具体的使用示例如下所示：

// type Flat<T extends any[]> = // 你的实现代码

// type F0 = Flat<[]> // []
// type F1 = Flat<['a', 'b', 'c']> // ["a", "b", "c"]
// type F2 = Flat<['a', ['b', 'c'], ['d', ['e', ['f']]]]> // ["a", "b", "c", "d", "e", "f"]
// 请在下面评论你的答案
/***
 * 解题思路
 *  1. 判断 First 是否为数组，Last 一定是数组
 *     成功 === Flat => First，以及Last [...Flat<First>, ...Flat<Last>]
 *     失败 证明 First 不是数组
 *         将 First 添加到数组内，只 Flat Last 即可
 */
type Flat<T extends any[]> = T extends [infer First, ...infer Last] ? First extends any[] ? [...Flat<First>, ...Flat<Last>] : [First, ...Flat<Last>] : []

type F0 = Flat<[]> // []
type F1 = Flat<['a', 'b', ['c'],['d']]> // ["a", "b", "c"]

type F2 = Flat<['a', ['b', 'c'], ['d', ['e', ['f']]]]> // ["a", "b", "c", "d", "e", "f"]

