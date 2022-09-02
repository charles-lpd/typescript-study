// 实现一个 Tail 工具类型，用于获取数组类型除了第一个类型外，剩余的类型。具体的使用示例如下所示：

// type Tail<T extends Array<any>> =  // 你的实现代码

// // 测试用例
// type T0 = Tail<[]> // []
// type T1 = Tail<[1, 2]> // [2]
// type T2 = Tail<[1, 2, 3, 4, 5]> // [2, 3, 4, 5]
// 提示：该题目有多种解法，感兴趣小伙伴可以自行尝试一下。
// 请在下面评论你的答案。

type Tail<T extends Array<any>> = T extends [infer first, ... infer last ] ? last : []
type T0 = Tail<[]> // []
type T1 = Tail<[1, 2]> // [2]
type T2 = Tail<[1, 2, 3, 4, 5]> // [2, 3, 4, 5]