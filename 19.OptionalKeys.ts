// 实现一个 OptionalKeys 工具类型，用来获取对象类型中声明的可选属性。具体的使用示例如下所示：

// type Person = {
//   id: string;
//   name: string;
//   age: number;
//   from?: string;
//   speak?: string;
// };

// type OptionalKeys<T> = // 你的实现代码
// type PersonOptionalKeys = OptionalKeys<Person> // "from" | "speak"
// 提示：该题目有多种解法，感兴趣小伙伴可以自行尝试一下。
// 请在下面评论你的答案。

type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};

type OptionalKeys<T> = {
  [K in keyof T] : Pick<T, K> extends Required<Pick<T,K>> ?  never : K
}[keyof T] // 你的实现代码

type PersonOptionalKeys = OptionalKeys<Person> // "from" | "speak"

/***
 *  解释 
 *  循环 T 得到 K
 *   Pick 得到 例: Pick<T, K> === { from?:string }
 *  extends 
 *  Required Pick 得到 例: Required<Pick<T,K>> === { from:string }
 * 
 *  为true返回 never ， false 返回 键值
 * 
 *  [keyof T] 相当于 寻找 返回对象中所有 T 的 键, never直接消失
 *  T = {
 *  id:never // 直接清楚
 *  form: form
 *  }[keyof T]
 * 
 */