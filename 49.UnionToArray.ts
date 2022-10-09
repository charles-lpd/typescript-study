// 实现 UnionToArray 工具类型，用于将联合类型转换成元组类型。具体的使用示例如下所示：

// type UnionToArray<U> = // 你的实现代码

// type A0 = UnionToArray<'aaa' | 'bbb' | 'ccc'> //=> ['aaa' , 'bbb' , 'ccc']
// type A1 = UnionToArray<1 | 2 | 3 > //=> [1, 2, 3]
// type A2 = UnionToArray<{type:'input'} | {type:'select',hasOptions:boolean}> //=> [{type:'input'} ,{type:'select',hasOptions:boolean}]
type UnionToIntersection<U extends (a: any) => any> = (
  U extends any ? (a: U) => void : never
) extends (a: infer P) => void
  ? P
  : never

/**
 * 解题思路
 *  1. UnionToIntersectio 用于 传入 函数，返回函数
 *   该证明理解这一句话 UnionToIntersection<T extends any ? (a: T) => T : never>
 *   通过 UnionToIntersectio 进行分发 想当与 将  aaa bbb ccc 都通过函数进行了分发，此时我们已经知道。通过函数进行分发是会返回联合类型的
 *   也就是
 *   第一步 ((a:'aaa')=> 'aaa') & ((a:'bbb')=> 'bbb') & ((a:'ccc')=> 'ccc')
 *   第二步 通过 extends 关键字 进行分发 因为 extends (a:infer A) => infer W， 只要是函数，都会为真，所以取最后一个判断函数 得到了 形参，和返回值
 *   第三步，因为返回的是数组，所以需要，将(返回值或者形参)填入数组, 拿着(形参或者返回值) 去使用Exclude从T中筛选掉 (返回值或者形参) 得到 'aaa' | 'bbb，
 *   第四部，拿着得到的参数，继续调用 UnionToTuple ,循环调用
 *
 */
type UnionToTuple<T> = UnionToIntersection<
  T extends any ? (a: T) => T : never
> extends (a: infer A) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : []
type A0 = UnionToTuple<'aaa' | 'bbb' | 'ccc'> //=> ['aaa' , 'bbb' , 'ccc']
type A1 = UnionToTuple<1 | 2 | 3> //=> [1, 2, 3]
// type A2 = UnionToArray<
//   { type: 'input' } | { type: 'select'; hasOptions: boolean }
// > //=> [{type:'input'} ,{type:'select',hasOptions:boolean}]
type A2 = ((a: 'aaa') => 'aaa') & ((a: 'bbb') => 'bbb') extends (
  a: infer A
) => infer B
  ? A
  : never
