// 实现一个 SmallerThan 工具类型，用于比较数值类型的大小。具体的使用示例如下所示：

// type SmallerThan<
//   N extends number,
//   M extends number,
// > = // 你的实现代码

// type S0 = SmallerThan<0, 1>; // true
// type S1 = SmallerThan<2, 0>; // false
// type S2 = SmallerThan<8, 10>; // true
// 请在下面评论你的答案

/***
 *  根据A 数组的长度 对比得到要求 N < M === true  N >= M === false
 *  a.若 A['length'] === N 则 N <= M
 *    1. 继续判断 若 A['length'] === M 则 N === M 返回 false
 *    2. 若  A['length'] !== M 则 N < M
 *  b.若 A['length'] !== N
 *    1. 继续判断 M， A['length'] === M 则 N > M
 *    2. 若 A['length'] !== M 则 N and M !== A['length'] ,继续增加 A 数组长度 继续执行 直到达到要求
 *  数组是从 0 开始递增的
 *  S0:
 *     第一步 A['length'] === 0, A['length'] extends N 成功, 紧接着判断 A['length'] extends M 失败返回 true, 证明:  N === 0 < M
 *  S1:
 *     第一步 A['length'] === 0, A['length'] extends N 失败, 判断 A['length'] extends M 成功，返回 false 证明 (N > 0 === M)
 *  S3:
 *     第一步 A['length'] === 0, A['length'] extends N 失败, 判断 A['length'] extends M 失败 执行 SmallerThan<N,M,[...A, 1]> 重新执行函数
 *     第二步 A['length'] === 1, A['length'] extends N 失败, 判断 A['length'] extends M 失败 执行 SmallerThan<N,M,[...A, 1]> 重新执行函数
 *     ...
 *     第九步 A['length'] === 8, A['length'] extends N 成功, 紧接着判断 A['length'] extends M 失败返回 true 证明 N === 8 < M
 *  S4:
 *     第一步 A['length'] === 0, A['length'] extends N 失败, 判断 A['length'] extends M 失败 执行 SmallerThan<N,M,[...A, 1]> 重新执行函数
 *     第二步 A['length'] === 1, A['length'] extends N 失败, 判断 A['length'] extends M 失败 执行 SmallerThan<N,M,[...A, 1]> 重新执行函数
 *     ...
 *     第九步 A['length'] === 8, A['length'] extends N 成功, 紧接着判断 A['length'] extends M 成功 返回 false, 证明 N === 8 === M
 */
type SmallerThan<
  N extends number,
  M extends number,
  A extends any[] = [],
> = A['length'] extends N ? A['length'] extends M ? false : true : A['length'] extends M ? false : SmallerThan<N,M,[...A, 1]>

type S0 = SmallerThan<0, 1>; // true
type S1 = SmallerThan<2, 0>; // false
type S2 = SmallerThan<8, 10>; // true
type S3 = SmallerThan<8, 8>; // false
