// 实现一个 IsNever 工具类型，判断指定的类型是否为 never 类型。具体的使用示例如下所示：

// type I0 = IsNever<never> // true
// type I1 = IsNever<never | string> // false
// type I2 = IsNever<null> // false
// 请在下面评论你的答案。

/***
 * 
 * 
 * 包装后的类型进行对比 如果不包裹 就会直接返回 T 
 * 如果 联合类型中包含 never 以外的类型的话，会进行删除 [string｜never] === [string]
 * 如果 只有单个类型 never 的话 包裹后 就是 [never]
 */
type IsNever<T> = [T] extends [never] ? true: false

type I0 = IsNever<never> // true  [never] extends [never] === true 
type I1 = IsNever<never | string> // false [string] extends [never] === false
type I2 = IsNever<null> // false    [null] extends [never] === false

type Name = [never]