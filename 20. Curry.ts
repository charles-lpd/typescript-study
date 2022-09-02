// 实现一个 Curry 工具类型，用来实现函数类型的柯里化处理。具体的使用示例如下所示：

// type Curry<
//   F extends (...args: any[]) => any,
//   P extends any[] = Parameters<F>, 
//   R = ReturnType<F> 
// > = // 你的实现代码

// type F0 = Curry<() => Date>; // () => Date
// type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
// type F2 = Curry<(a: number, b: string) => Date>; //  (arg_0: number) => (b: string) => Date
// 请在下面评论你的答案。

type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>, 
  R = ReturnType<F> 
> = P extends [infer A, ...infer B] ? B extends [] ? (arg:A)=> R : (arg_0:A) =>Curry<(...args:B)=>R>  : ()=> R

type F0 = Curry<() => Date>; // () => Date
type F1 = Curry<(a: number) => Date>; // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date>; //  (arg_0: number) => (b: string) => Date
/****
 * 
 * 解释
 * F 约束 是一个 函数 
 * P 是 F 函数的 形参
 * R 是 F 函数的 返回值
 * 
 * 1. 判断 P(形参) 约束 [infer A ...infer B] 拿到 形参的第一个形参和剩余形参,如果没有刑参返回 ()=> R  达成  F0 
 * 2. 如果有形参, 判断 ...infer B extends [] 证明 A存在 B是空数组, 返回 (arg: A) => R 达成 F1
 * 3. 如果 剩余形参 还有值的情况下 返回 (arg_0: A )=> Curry<(...args:B=>R>  
 * 解释 3 
 * 确定F2 是柯里化 函数返回函数 
 * 确定 第一个函数和形参以及返回值 (arg_0:A) => 返回 包含第二个形参的函数以及它的返回值
 * 确定 第二个函数形参是 infer B => R
 */