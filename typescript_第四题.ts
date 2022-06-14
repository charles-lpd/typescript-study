/* 第四题
Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

// 题型链接 https://github.com/semlinker/awesome-typescript/issues
const todo: TodoPreview = {
  title: "Clean room",
  completed: false
};
那么如何定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型，对应的使用示例如下：

interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}
*/

interface Example {
  a: string
  e: number
  b: string | number
  c: () => void
  d: {}
  f: string | number | boolean
}
/**
 * 解释
 * 此题目的主要是为了 提取出 指定的类型值
 * 1. 遍历 T 得到 K 代表  a或者e.... 等.
 * 2. 使用 as 进行断言 T[K] 代表当前键的类型 约束 U(传递的类型‘string’)
 * 3. 成功返回当前的键 K,否则返回 never(代表不会存在)
 * 4. K as (K or never): T[K]
 * 
 */
type ConditionalPick<T, U> = {
  [K in keyof T as (T[K] extends U ? K : never)]: T[K]
}
type StringKeysOnly = ConditionalPick<Example, string>
