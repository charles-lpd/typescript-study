// 题型链接 https://github.com/semlinker/awesome-typescript/issues
// 第十题
// 实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理。具体的使用示例如下所示：

// type Trim<V extends string> = // 你的实现代码

// // 测试用例
// Trim<' semlinker '>
// //=> 'semlinker'
// 提示：可以考虑先定义 TrimLeft 和 TrimRight 工具类型，再组合成 Trim 工具类型。
// 请在下面评论你的答案。
/***
 * TrimLeft
 * 1. 确定传入参数只能是string 类型 
 * 2. 判断 V 是否包含  ` ${infer B}` // (空格 + B) === V ,B 除去前方空格后推断出来的参数，包含则继续执行该工具类型
 * TrimRight 和TrimLeft 一致
 * 
 * 
 */
type TrimLeft<V extends string> = V extends ` ${infer B}` ? TrimLeft<B> : V
type TrimRight<V extends string> = V extends `${infer B} ` ? TrimRight<B> : V 
type Trim<V extends string> = TrimLeft<TrimRight<V>>