// 实现 IndexOf 工具类型，用于获取数组类型中指定项的索引值。若不存在的话，则返回 -1 字面量类型。具体的使用示例如下所示：

// type IndexOf<A extends any[], Item> = // 你的实现代码

// type Arr = [1, 2, 3, 4, 5]
// type I0 = IndexOf<Arr, 0> // -1
// type I1 = IndexOf<Arr, 1> // 0
// type I2 = IndexOf<Arr, 3> // 2
// 请在下面评论你的答案

type IndexOf<A extends any[], Item, Arr extends any[] = []> = A extends [infer A, ...infer B] ? A extends Item ? Arr['length'] : IndexOf<B,Item,[...Arr,1]> : -1
type Arr = [1, 2, 3, 4, 5]
type I0 = IndexOf<Arr, 0> // -1
type I1 = IndexOf<Arr, 1> // 0
type I2 = IndexOf<Arr, 3> // 2