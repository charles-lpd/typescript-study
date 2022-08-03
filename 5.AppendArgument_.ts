/* 第五题
定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数。具体的使用示例如下所示：

type Fn = (a: number, b: string) => number
type AppendArgument<F, A> = // 你的实现代码

type FinalFn = AppendArgument<Fn, boolean> 
// (x: boolean, a: number, b: string) => number
请在下面评论你的答案
 */
/**
 * 第一种使用 Parameters 和 ReturnType
 */
// args = 函数剩余参数 infer 代表 待推断参数
// 1. 约束 T 是个函数 //
// 2. 判断 T 是否是 函数 当前 infer P 相当于推断 args = P
// 3. 成功返回 P， 因为P = args 所以 返回的是 当前 T 的参数
type GetParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never

  
// 1. 约束 T 是个函数
// 2. 判断 T 是否是 函数
// 3. 成功则 返回 T 的函数返回类型 infer P 相当于推断出 T 的返回类型
type GetReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer P
  ? P
  : any

type AppendArgument<F extends (...args: any) => any, A> = (
  x: A,
  ...args: GetParameters<F>
) => GetReturnType<F>

type Fn = (a: number, b: string) => number
type FinalFn = AppendArgument<Fn, boolean>

/***
 * 第二种 直接使用 infer
 */
// 1. 判断 F是否是函数 infer 推断 参数(Type) 和返回类型(Return) 
// 2. 成功返回 
type AppendArgument_<F,A> = F extends (...args: infer Type) => infer Return ? (x:A,...args: Type)=> Return : never
type FinalFn2 = AppendArgument_<Fn,boolean>

