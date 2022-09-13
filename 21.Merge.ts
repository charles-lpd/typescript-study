// 实现一个 Merge 工具类型，用于把两个类型合并成一个新的类型。第二种类型（SecondType）的 Keys 将会覆盖第一种类型（FirstType）的 Keys。具体的使用示例如下所示：

// type Foo = { 
//    a: number;
//    b: string;
// };

// type Bar = {
//    b: number;
// };

// type Merge<FirstType, SecondType> = // 你的实现代码

// const ab: Merge<Foo, Bar> = { a: 1, b: 2 };

type Foo = { 
   a: number;
   b: string;
};

type Bar = {
   b: number;
   c: string;
   d: boolean
};
// 集和所有键名
type PushAB = keyof ( Foo & Bar)
// 解 1
/**
 * 通过 遍历 FirstType & SecondType 的联合类型
 * 因为 SecondType 要覆盖  FirstType 中相同的 键值
 * 所以要先判断 SecondType 中是否存在 键 存在就取 键
 * 不存在 就判断 FirstType 中是否存在 键 存在就取 键
 * 否则返回 never ， 达到需求
 * 
 */
type Merge<FirstType, SecondType> = {
  [K in keyof (FirstType & SecondType)]: K extends keyof SecondType ? SecondType[K] : K extends keyof FirstType ? FirstType[K] : never
}
// 解 2
/***
 * 使用Omit 将 剔除 FirstType 中 包含 SecondType 的键名 
 * ```// Omit 进行 Pick 以及 Exclude 处理
 *    // Exclude<keyof FirstType, keyof SecondType> 得到 FirstType 中独有的键 独有的键
 *    // Pick<FirstType, Exclude<keyof FirstType, keyof SecondType>> 得到
 *       {
 *        [ P in  Exclude<keyof FirstType, keyof SecondType>]: FirstType[P]
 *       } // a:number
 * 随后将 SecondType 进行& 合并，达到需求
 */
type Merge1<FirstType, SecondType> = Pick<FirstType, Exclude<keyof FirstType, keyof SecondType>> & SecondType

const ab: Merge1<Foo, Bar> ={
  a: 0,
  b: 0,
  c: '',
  d: true
}

