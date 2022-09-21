// 实现 StartsWith 工具类型，判断字符串字面量类型 T 是否以给定的字符串字面量类型 U 开头，并根据判断结果返回布尔值。具体的使用示例如下所示：

// type StartsWith<T extends string, U extends string> = // 你的实现代码

// type S0 = StartsWith<'123', '12'> // true
// type S1 = StartsWith<'123', '13'> // false
// type S2 = StartsWith<'123', '1234'> // false

// type Repaet<T extends string,> = T extends

/***
 * 
 *  解题思路
 *  StartsWith
 *  判断 U 是否是 T 的开头
 *   直接 extends U + infer B ===  更推断的 B 无关，只跟 U 是否相同有关， B 代表着除了 U 的剩余参数。
 *  
 *  EndsWith
 *  判断 U 是不是 T 的结尾
 *  道理相同 都是 推断 + U 
 */
type StartsWith<T extends string, U extends string> = T extends `${ U }${infer B}` ? true : false

type S0 = StartsWith<'123', '12'> // true
type S1 = StartsWith<'123', '13'> // false
type S2 = StartsWith<'123', '1234'> // false

type EndsWith<T extends string, U extends string> = T extends `${infer B}${ U }` ? true : false

type E0 = EndsWith<'123', '23'> // true
type E1 = EndsWith<'123', '13'> // false
type E2 = EndsWith<'123', '123'> // true