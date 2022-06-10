// 题型链接 https://github.com/semlinker/awesome-typescript/issues
/* 本道题我们希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。
当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。

function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok
 */
// 利用函数重载
function f(a: number, b: number): number
function f(a: string, b: string): string
function f(a: string | number, b: string | number): string | number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + ':' + b
  } else {
    return (a as number) + (b as number)
  }
}

f(2, 3) // Ok
f(1, 'a') // Error
f('a', 2) // Error
f('a', 'b') // Ok

// 利用 extends 约束 第一个参数传递类型
const func = <T extends string | number>(a: T, b:T) => {
  if (typeof a === 'string') {
    return a + ':' + b
  } else {
    return (a as number) + (b as number)
  }
}
func(2, 3) // Ok
func(1, 'a') // Error
func('a', 2) // Error
func('a', 'b') // Ok
/**
 * 解释
 *  T 约束 string 和 number 类型 但是 T 只是代表 func 推导出来的第一个参数类型
 *  把 T 赋值给b参数 代表b参数必须要和第一个参数类型一致 否则错误
 *  达到要求 
 * 
 */