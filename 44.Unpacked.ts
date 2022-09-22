// 实现Unpacked工具类型，用于对类型执行“拆箱”操作。具体使用示例如下：

// type Unpacked<T> = // 你的实现代码

// type T00 = Unpacked<string>;  // string
// type T01 = Unpacked<string[]>;  // string
// type T02 = Unpacked<() => string>;  // string
// type T03 = Unpacked<Promise<string>>;  // string
// type T04 = Unpacked<Unpacked<Promise<string>[]>>;  // string
// type T05 = Unpacked<any>;  // any
// type T06 = Unpacked<never>;  // never

/***
 * 首先使用infer 推断 函数返回值
 * 然后推断数组类型
 * 接着推断 Promise 返回参数类型
 * 其他的返回自己本身即可
 */
type Unpacked<T> = T extends () => infer A
  ? A
  : T extends (infer B)[]
  ? B
  : T extends Promise<infer C>
  ? C
  : T

type T00 = Unpacked<string> // string
type T01 = Unpacked<string[]> // string
type T02 = Unpacked<() => string> // string
type T03 = Unpacked<Promise<string>> // string
type T04 = Unpacked<Unpacked<Promise<string>[]>> // string
type T05 = Unpacked<any> // any
type T06 = Unpacked<never> // never
