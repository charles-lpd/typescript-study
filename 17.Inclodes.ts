// 实现一个 Includes 工具类型，用于判断指定的类型 E 是否包含在 T 数组类型中。具体的使用示例如下所示：

// type Includes<T extends Array<any>, E> = // 你的实现代码

// type I0 = Includes<[], 1> // false
// type I1 = Includes<[2, 2, 3, 1], 2> // true
// type I2 = Includes<[2, 3, 3, 1], 1> // true
// 提示：该题目有多种解法，感兴趣小伙伴可以自行尝试一下。
// 请在下面评论你的答案。
type Ta = [][number] 
type Includes<T extends Array<any>, E> = E extends T[number] ? true : false

type I0 = Includes<[], 1> // false
type I1 = Includes<[2, 2, 3, 1], 2> // true
type I2 = Includes<[2, 3, 3, 1], 3> // true