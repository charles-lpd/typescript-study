// 实现一个 Unshift 工具类型，用于把指定类型 E 作为第一个元素添加到 T 数组类型中。具体的使用示例如下所示：

// type Unshift<T extends any[], E> =  // 你的实现代码

// // 测试用例
// type Arr0 = Unshift<[], 1>; // [1]
// type Arr1 = Unshift<[1, 2, 3], 0>; // [0, 1, 2, 3]
// 提示：该题目有多种解法，感兴趣小伙伴可以自行尝试一下。
// 请在下面评论你的答案。

type Unshift<T extends any[], E> = [E, ...T]

type Unshift0 = Unshift<[], 1>; // [1]
type Unshift1 = Unshift<[1, 2, 3], 0>; // [0, 1, 2, 3]