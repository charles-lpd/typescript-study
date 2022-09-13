
// 实现一个 Mutable 工具类型，用于移除对象类型上所有属性或部分属性的 readonly 修饰符。具体的使用示例如下所示：

// type Foo = {
//   readonly a: number;
//   readonly b: string;
//   readonly c: boolean;
// };

// type Mutable<T, Keys extends keyof T = keyof T> = // 你的实现代码

// const mutableFoo: Mutable<Foo, 'a'> = { a: 1, b: '2', c: true };

// mutableFoo.a = 3; // OK
// mutableFoo.b = '6'; // Cannot assign to 'b' because it is a read-only property.
// 请在下面评论你的答案。

type Foo = {
  readonly a: number;
  readonly b: string;
  readonly c: boolean;
};
/***
 * 先对 T 进行遍历， 然后对 Keys 进行删除readonly属性的处理 ，进行合并即可 
 */
type Mutable<T, Keys extends keyof T = keyof T> = {
   [K in keyof T]: T[K]
} & {
 -readonly [K in Keys] :T[K]
}

/***
 * 先删除 指定键名的 readonly属性 ，最后使用Omit 筛选出 T 中除了Keys的 数据类型
 * 随后进行合并 达到要求
 * 
 */
type Mutable2<T, Keys extends keyof T = keyof T> = {
  -readonly [K in Keys]:T[K]
} & Omit<T, Keys>
const mutableFoo: Mutable2<Foo, 'a'> = {
  a: 0,
  b: "",
  c: false
};
mutableFoo.a = 3,
mutableFoo.b = "6"