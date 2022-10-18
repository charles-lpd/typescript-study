// 实现一个 UnionToIntersection 工具类型，用于把联合类型转换为交叉类型。具体的使用示例如下所示：

// type UnionToIntersection<U> = // 你的实现代码

// // 测试用例
// type U0 = UnionToIntersection<string | number> // never
// type U1 = UnionToIntersection<{ name: string } | { age: number }> // { name: string; } & { age: number; }
// 请在下面评论你的答案。

/***
 * 协变 and 逆变 https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html#%E4%B8%80%E4%B8%AA%E6%9C%89%E8%B6%A3%E7%9A%84%E9%97%AE%E9%A2%98
 *
 * 在逆变位置的同一类型变量中的多个候选会被推断成交叉类型。函数参数是逆变的，而对象属性是协变的。
 */
// 协变
// type UnionToIntersection<U> = (U extends any ? U : never) extends infer P ? P : never

// 逆变
type UnionToIntersection<U> = (U extends any ? (a: U) => void : never) extends (
  a: infer P
) => void
  ? P
  : never

type U0 = UnionToIntersection<string | number> // never

type U1 = UnionToIntersection<{ name: string } | { age: number }> // { name: string; } & { age: number; }

/**
 * 自我理解
 *  想要让 联合类型转为 交叉类型，官方方法使用逆变，操作更简单
 *  逆变位置 处于函数的参数中，利用逆变，当有多个的时候就会被推断成交叉类型
 *  这也就是我们为什么要写成函数，infer 推断形参的原因。
 *  如果不使用函数形式，依旧会是联合类型
 *
 * U0
 * 1. 先让 U 转换成(形参)的函数形式, 由于传入联合类型 ts 会进行分发处理
 * 第一步会转化成  (a:string)=>void | (a:number)=>void  extends (a:infer P)=> void ? P : never
 * 随后进行ts 执行两次 相当于， 执行两次，也就是所谓的分发
 *  (a:string)=>void extends (a:infer P)=> void ? P : never
 *  (a:number)=>void  extends (a:infer P)=> void ? P : never
 * 因为 逆变的原因 返回的会被推断成交叉类型，也就是 string & number
 * 但是 string & number 并不能被执行 所以是 never
 *
 * U1
 * 和上一个同理
 *  (a:{ name: string })=>void extends (a:infer P)=> void ? P : never
 *  (a:{ age: number })=>void  extends (a:infer P)=> void ? P : never
 *
 * 因为逆变原因返回的会被推断成交叉类型 也就是 { name: string }  & { age: number }
 * 这样就达成了我们的条件， 满足测试用例！
 *
 */
type A = string

type B = number

type C = A | B extends infer P ? P : never

