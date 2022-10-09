// 实现 RequireAllOrNone 工具类型，用于满足以下功能。即当设置 age 属性时，gender 属性也会变成必填。具体的使用示例如下所示：

interface Person {
  name: string
  age?: number
  gender?: number
}

// type RequireAllOrNone<T, K extends keyof T> = // 你的实现代码

// const p1: RequireAllOrNone<Person, 'age' | 'gender'> = {
//   name: "lolo"
// };

// const p2: RequireAllOrNone<Person, 'age' | 'gender'> = {
//   name: "lolo",
//   age: 7,
//   gender: 1
// };

// ts Record // 用于将联合类型变成交叉类型，并且统一赋值 T
type FormatRecord<K extends keyof any, T> = {
  [P in K]: T
}
/***
 * 
 * 解题思路
 *  Omit 利用 Pick Exclude 将 T 中的 K 剔除。
 *  得到 { name: string } 
 *  交叉 &  一个联合类型  {age:number;gender:number} | { age?:never; gender?:never}
 *  得到 两个交叉类型
 *      A === {name:string; age:number; gender:number}
 *      B === {name:string; age?:never; gender?:never}
 * 1. 例 加入不写 age 和 gender，虽然两个值都是 never，但是符合 B  因为两个都是可选
 * 2. 例 如果我们只写 age 一个字段的话， 还是 符合 B， 因为 A 类型中 gender 是必选 所以不符合 A
 * 3. 例 如果 我们两个都写的话就符合 A 了。但是要注意 age 和 gender 都是number类型
 */
type RequireAllOrNone<T, K extends keyof T> = Omit<T, K> &
  (Required<Pick<T, K>> | Partial<Record<K, never>>)

const p1: RequireAllOrNone<Person, 'age' | 'gender'> = {
  name: '',
}
