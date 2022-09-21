// 实现 IsAny 工具类型，用于判断类型 T 是否为 any 类型。具体的使用示例如下所示：

// type IsAny<T> = // 你的实现代码

// type I0 = IsAny<never> // false
// type I1 = IsAny<unknown> // false
// type I2 = IsAny<any> // true
// 请在下面评论你的答案

/***
 * 利用任何类型和any交叉都等于any来实现。
 * 
 * 因为 0 extends 1 本身根本不相同，但是 利用交叉类型赋值 any 的话，就会为真
 * 属实 yyds
 */
type IsAny<T> = 0 extends (1 & T) ? true : false

type I0 = IsAny<1> // false
type I1 = IsAny<unknown> // false
type I2 = IsAny<any> // true