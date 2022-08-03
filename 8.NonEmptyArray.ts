// 题型链接 https://github.com/semlinker/awesome-typescript/issues

// 第八题
// 定义 NonEmptyArray 工具类型，用于确保数据非空数组。

// type NonEmptyArray<T> = // 你的实现代码

// const a: NonEmptyArray<string> = [] // 将出现编译错误
// const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用
// 提示：该题目有多种解法，感兴趣小伙伴可以自行尝试一下。
// 请在下面评论你的答案。

// 代表 数组中第一个是 T类型 后面也是都是 T 类型
// type NonEmptyArray<T> = [T, ...T[]]

// 代表 T[] 并且 具有下标为 0 的值
type NonEmptyArray<T> = T[] & { 0: T }

const a: NonEmptyArray<string> = [] // 将出现编译错误

const b: NonEmptyArray<string> = ['123'] 