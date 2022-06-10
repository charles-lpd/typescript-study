// 题型链接 https://github.com/semlinker/awesome-typescript/issues
// 第三题
/* 在 掌握 TS 这些工具类型，让你开发事半功倍 这篇文章中，阿宝哥介绍了 TS 内置的工具类型：Partial<T>，它的作用是将某个类型里的属性全部变为可选项 ?。

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

// lib.es5.d.ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

那么如何定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的？对应的使用示例如下所示：

type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean; 
// }

*/
// 第一题 答案
// 1.创造 一个SetOptional 工具类型， 支持把指定的keys 对应的属性变成 可选?
// 利用 SetOptional 工具函数 把 interest 由必选变成可选 剩余变成必选
interface UserInfo {
  name: string
  age: number
  gender: string
  interest: string[]
}
// 定义工具 用于剔除 T 中的 U 返回 联合类型 ｜｜｜
type FilterTrue<T, U> = T extends U ? never : T

// 用于遍历 K 不影响 可选和必选
type DefaultFilter<T, K extends keyof T> = {
  [P in K]: T[P]
}
// 用于遍历 K 全部变成必选 (K为联合类型 被约束为 keyof T) 代表 K 是 keyof T 的子类型
// (K === 传入的类型） extends keyof (T === "name" | "age" | "gender"| "interest")
type RequiredTrue<T, K extends keyof T> = {
  [P in K]-?: T[K]
}
// 1.用于遍历 K 全部变成可选 (K为联合类型 被约束为 keyof T) 代表 K 是 keyof T 的子类型
// 2.& 合并
// 3. FilterTrue 计算 剔除 T 中 K 得到联合类型
// 4. RequiredTrue  遍历 全部变成必选
type SetOptional<T, K extends keyof T> = {
  [P in K]?: T[P]
} & RequiredTrue<T, FilterTrue<keyof T, K>>

const userinfo: SetOptional<UserInfo, 'interest'> = {
  name: '',
  age: 0,
  gender: ''
}

/*
第二个问题 
在实现 SetOptional 工具类型之后，如果你感兴趣，可以继续实现 SetRequired 工具类型，利用它可以把指定的 keys 对应的属性变成必填的。对应的使用示例如下所示：

type Foo = {
	a?: number;
	b: string;
	c?: boolean;
}

// 测试用例
type SomeRequired = SetRequired<Foo, 'b' | 'c'>;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// } */

// 1.创造 一个SetRequired 工具类型， 支持把指定的 keys 对应的属性变成 必选?
// 利用 SetRequired 工具函数 把 b,c 变成必选 a 不变
type Foo = {
  a?: number
  b: string
  c?: boolean
}
// 用于返回 T 中包含 U 的 返回 联合类型
type FilterFalse<T, U> = T extends U ? T : never

// 1. 利用 FilterFalse 只返回 T 中包含 K 的 联合类型 
// 2. 利用 RequiredTrue 遍历返回的联合类型 全部变成可选
// 3. & 合并
// 3  利用 FilterTrue 返回 T 中不包含 K 的联合类型
// 4  因剩余的值不变 利用DefaultFilter遍历成为 键值对型式
type SetRequired<T, K extends keyof T> = RequiredTrue<
  T,
  FilterFalse<keyof T, K>
> &
  DefaultFilter<T, FilterTrue<keyof T, K>>
const required: SetRequired<Foo, 'b' | 'c'> = {
  b: '',
  c: true,
  a: 0
}
