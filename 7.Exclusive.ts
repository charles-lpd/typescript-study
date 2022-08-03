// 题型链接 https://github.com/semlinker/awesome-typescript/issues
// 第一题
// 使用类型别名定义一个 EmptyObject 类型，使得该类型只允许空对象赋值：


/* type EmptyObject = {} 

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
const shouldFail: EmptyObject = { // 将出现编译错误
  prop: "TS"
} */
// PropertyKey = symbol｜number｜string
type EmptyObject = {
  [K in keyof any]: never // 复制never表示不存在
}
const shouldPass: EmptyObject = {} // 可以正常赋值
const shouldFail: EmptyObject = {
  // 将出现编译错误
  prop: ''
}



/* 在通过 EmptyObject 类型的测试用例检测后，我们来更改以下 takeSomeTypeOnly 函数的类型定义，让它的参数只允许严格SomeType类型的值。具体的使用示例如下所示：
 */
type SomeType = {
  prop: string
}

// T 是 函数自动推断出来的类型 P 是传入规定的的类型
// 1. 遍历 keyof T 得到 K
// 2. 判断 K 是否 包含 keyof P
// 3. 成功代表是 K是 P类型中的键名 选择输出T[K] 否则 never
type Exclusive<T,P> = {
  [K in keyof T]: K extends keyof P ? T[K] : never
}
// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly<T extends SomeType>(x:Exclusive<T,SomeType>) {
  return x
}

// 测试用例：
const x = { prop: 'a' }
takeSomeTypeOnly(x) // 可以正常调用

const y = { prop: 'a', addditionalProp: 'x' }
takeSomeTypeOnly(y) // 将出现编译错误