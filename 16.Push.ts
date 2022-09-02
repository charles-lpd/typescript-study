// 实现一个 Push 工具类型，用于把指定类型 E 作为第最后一个元素添加到 T 数组类型中。具体的使用示例如下所示：

// type Push<T extends any[], V> = // 你的实现代码

// // 测试用例
// type Arr0 = Push<[], 1> // [1]
// type Arr1 = Push<[1, 2, 3], 4> // [1, 2, 3, 4]

type Push< T extends any[], V> = [...T, V]
type Push0 = Push<[], 1> // [1]
type Push1 = Push<[1, 2, 3], 4> // [1, 2, 3, 4]