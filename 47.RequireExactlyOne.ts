// 实现 RequireExactlyOne 工具类型，用于满足以下功能。即只能包含 age 或 gender 属性，不能同时包含这两个属性。具体的使用示例如下所示：

interface Person {
  name: string
  age?: number
  gender?: number
}

// // 只能包含Keys中唯一的一个Key
// type RequireExactlyOne<T, Keys extends keyof T> = // 你的实现代码

// const p1: RequireExactlyOne<Person, 'age' | 'gender'> = {
//   name: "lolo",
//   age: 7,
// };

// const p2: RequireExactlyOne<Person, 'age' | 'gender'> = {
//   name: "lolo",
//   gender: 1
// };

// // Error
// const p3: RequireExactlyOne<Person, 'age' | 'gender'> = {
//   name: "lolo",
//   age: 7,
//   gender: 1
// };
/***
 * 解题思路 传如的age 和 gender 只能只能出现一个类型, 同时出现报错
 *
 * 首先 利用 分发 Keys extends any
 *      Omit<T,K> 得到 { name: string }
 *      交叉&
 *      分发后对当前 Keys 进行 Required 操作，
 *      然后 对 除了 Keys 的进行赋值 never 操作即可
 *      
 *      最终类型
 *      { name: string } & { age:number , gender?: never } | { name: string } & { age?:never , gender: number }
 *      当然 Omit<T, Keys> 可以写在分发里面，也可以写在分发外面
 *
 *
 */
type RequireExactlyOne<
  T,
  Keys extends keyof T,
  K extends keyof T = Keys
> = Omit<T, Keys> &
  (Keys extends any
    ? Required<Pick<T, Keys>> & Partial<Record<Exclude<K, Keys>, never>>
    : never)

const p1: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: 'lolo',
  age: 7
}

const p2: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: 'lolo',
  gender: 1
}

// Error
const p3: RequireExactlyOne<Person, 'age' | 'gender'> = {
  name: 'lolo',
  age: 7,
  gender: 1
}
