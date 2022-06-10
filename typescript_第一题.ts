// 题型链接 https://github.com/semlinker/awesome-typescript/issues
// 第一题
/*
 type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Error（TS 编译器版本：v4.4.2
  // Type '{ id: number; kind: string; }' is not assignable to type 'T'.
  // '{ id: number; kind: string; }' is assignable to the constraint of type 'T', 
  // but 'T' could be instantiated with a different subtype of constraint 'User'.
  return {
    id: u.id,
    kind: 'customer'
  }
}
*/
/**
 * 
 * 为什么报错?
 *  因为 extends 此时代表约束, T 中被约束必须包含 User类型 ，但不只有User类型 所以返回 T 类型报错
 */

type User = {
  id: number
  kind: string
}


function makeCustomer<T extends User>(u: T): T {
  // 不能将类型“{ id: number; kind: string; }”分配给类型“T”。
  // "{ id: number; kind: string; }" 可赋给 "T" 类型的约束，但可以使用约束 "User" 的其他子类型实例化 "T"。
  return {
    ...u,
    id: u.id,
    kind: 'customer'
  }
}
makeCustomer({ id: 1, kind: '张三'})
/**
 * 解决方案
 * 1. 已知返回参数确定为User类型。修改返回类型为 User类型
 *    makeCustomer<T extends User>(u: T): User
 * 
 * 2. 已知返回类型是 T 类型 传参 u == T 类型 返回并解构 u 标明返回参数有 T 类型
 *  return { ...u }
 * 
 */

