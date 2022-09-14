// 完善 Chainable 类型的定义，使得 TS 能成功推断出 result 变量的类型。调用 option 方法之后会不断扩展当前对象的类型，使得调用 get 方法后能获取正确的类型。
declare const config: Chainable
/**
 * 
 * 解题思路
 * 1. option 
 *  首先 看到 config 的类型是 Chainble， 但是config 可以链式调用 证明 option 返回的也是 Chainable
 *  所以 返回值需要 Chainable<T={}> , T 代表着上一次 调用时返回的参数, 第一次调用时使用默认值 {}
 *  第一次调用 option('age', 7) 通过泛型 拿到 age 和 7 通过 & 合并 返回 Chainable< T & {age:7}> 
 *  第二次调用 option('name', 'lolo') 依旧泛型取之 再次通过合并，此时 T === { age: 7 } 所以返回的是 Chainable<{age:7} & { name: 'lolo'}>
 *  第三次调用 option('address', { value: 'XiaMen' }) 与前两次相同
 * 2. get
 *   因为 config 最后执行的是 get(), 所以需要给get() 写返回值 *** 当我们typeof一个方法的时候 ，在没有执行的时候（get） 返回的是当前函数， 如果该方法执行了(get()) ,返回的就是get()的返回值***
 *   所以我们需要去遍历 T 因为是最后 T 包含的是 所有 option 的 交叉类型， 成功得到我们想要的
 */
type Chainable<T = {}> = {
  option<K extends string, V extends any>(key: K, value: V):Chainable<T & {
   [P in K]:V
  }>
  get(): {
    [P in keyof T]:T[P]
  }
}

const result = config
  .option('age', 7)
  .option('name', 'lolo')
  .option('address', { value: 'XiaMen' })
  .get()

type ResultType = typeof result

// 期望 ResultType 的类型是：
// {
//   age: number
//   name: string
//   address: {
//     value: string
//   }
// }
// 请在下面评论你的答案。

