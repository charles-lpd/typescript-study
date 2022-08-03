/* 第六题
定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化）。具体的使用示例如下所示：

type NaiveFlat<T extends any[]> = // 你的实现代码

// 测试用例：
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"
在完成 NaiveFlat 工具类型之后，在继续实现 DeepFlat 工具类型，以支持多维数组类型：

type DeepFlat<T extends any[]> = unknown // 你的实现代码

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>  
// DeepTestResult: "a" | "b" | "c" | "d" | "e"
请在下面评论你的答案 */

/***
 *
 * 解答
 * 1. 对 T 进行 约束 any[] 并对 进行遍历 keyof T
 * 2. 对 T[K] 进行判断， infer P 推断类型[] === P[]
 * 3. 对 P 进行判断 any[] 如果还是数组就递归当前方法
 * 3. 如果 P 不是数组(内容不是数组 [[]] ) 使用[][number] 能遍历数组中所有值 ['a','b','c'][number] // 'a'|'b'|'c'
 * 4. 因为传入的 T 是个数组,返回也是数组 在[][number] 遍历的到想要的结果
 */
type NaiveFlatDeep<T extends any[]> = {
  [K in keyof T]: T[K] extends (infer P)[]
    ? P extends any[]
      ? NaiveFlatDeep<T[K]>
      : T[K][number]
    : never
}[number]
type Flat = [['a'], ['b', 'c'], ['d']]
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]]
type NaiveResultDeep = NaiveFlatDeep<Deep>
// type NaiveResultDeep = "a" | "b" | "c" | "d" | "e"



type DeepObject = {
  a: ['a', 'b']
  d: ['c', 'd']
}
type NaiveFlat<T extends any> = {
  [K in keyof T]: T[K] extends (infer P)[]
    ? P extends any[]
      ? NaiveFlat<T[K]>
      : T[K][number]
    : never
}
type NaiveResult = NaiveFlat<DeepObject>
// type NaiveResult = {
//   a: "a" | "b";
//   d: "c" | "d";
// }
