// 实现一个 IsUnion 工具类型，判断指定的类型是否为联合类型。具体的使用示例如下所示：

// type IsUnion<T, U = T> = // 你的实现代码

// type I0 = IsUnion<string|number> // true
// type I1 = IsUnion<string|never> // false
// type I2 =IsUnion<string|unknown> // false
// 请在下面评论你的答案。


/***
 *  首先 利用 extends any 进行分发，肯定是为真的
 *  但是 需要包裹 U and T 否则 U 就会进行分发，但是我们不需要 U进行分发 
 *  所以包裹一下
 * 
 */
type IsUnion<T, U = T> = T extends any ? ([U] extends [T] ? false : true) : never


type I0 = IsUnion<string | number> // true 包裹前会返回 true｜false 也就是 boolean 包裹后 会返回 true 因为 [stirng|number] extends [string] 或者 [number] 永远为真
type I1 = IsUnion<string | never> // false // 包裹前会返回 false 因为 never 并不会进行多次分发处理 只会处理string 所以为真， 包裹后 一致
type I2 =IsUnion<string|unknown> // false 与 I1 类似