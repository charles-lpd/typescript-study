// 实现 ConsistsOnlyOf 工具类型，用于判断 LongString 字符串类型是否由 0 个或多个 Substring 字符串类型组成。具体的使用示例如下所示：

// type ConsistsOnlyOf<LongString extends string, Substring extends string> = // 你的实现代码

// type C0 = ConsistsOnlyOf<'aaa', 'a'> //=> true
// type C1 = ConsistsOnlyOf<'ababab', 'ab'> //=> true
// type C2 = ConsistsOnlyOf<'aBa', 'a'> //=> false
// type C3 = ConsistsOnlyOf<'', 'a'> //=> true

/***
 *
 * 解题思路
 *   通过 extends 分发 ，infer 推断
 *  成功继续进行递归处理，直到 成为空字符串， 返回 true 和 false
 *
 *
 */
type ConsistsOnlyOf<
  LongString extends string,
  Substring extends string
> = LongString extends `${Substring}${infer A}`
  ? ConsistsOnlyOf<A, Substring>
  : LongString extends ''
  ? true
  : false

type C0 = ConsistsOnlyOf<'aaa', 'a'> //=> true
type C1 = ConsistsOnlyOf<'ababab', 'ab'> //=> true
type C2 = ConsistsOnlyOf<'aBa', 'a'> //=> false
type C3 = ConsistsOnlyOf<'', 'a'> //=> true
