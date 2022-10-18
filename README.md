# typescript-study
宝哥
学习 typescript 练习题 链接: https://github.com/semlinker/awesome-typescript/issues

## 第一题： makeCustomer 为什么返回 User 会报错？

```ts
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
/*
不能将类型“{ id: number; kind: string; }”分配给类型“T”。
"{ id: number; kind: string; }" 可赋给 "T" 类型的约束，但可以使用约束 "User" 的其他子类型实例化 "T"。
*/
  return {
    id: u.id,
    kind: 'customer'
  }
}
```
### 解: 可赋值性 assignable 
```ts
function makeCustomer<T extends User>(u: T): T {
  return {
    ...u, // 因为 U 就是 T 类型，解构 u 返回的类型就是 T,也可以直接 return u。
    id: u.id,
    kind: 'customer'
  }
}
makeCustomer({ id: 1, kind: '刘' })
```
原因：首先 T extends User， 证明 T 是 User 的子类型，T 可以赋值给 User，但是 User 却不能赋值 T。

函数要求返回 T ，但 T 到底都有什么？我们并不知道，只知道 T 约束于 User`(T 包含 User)`。但是 函数返回的是User，User 不能赋值给 T 所以报错。

答：
1. 函数形参 u 是 T 类型，我们不管在 makeCustomer 函数传入任何形参，只要包含有 User ，就不会报错。所以解构 u，或者直接返回 u 就相当于返回类型是 T。

#### 课外：T 可以赋值给 User， User 却不能赋值给 T ? 
```ts
// 可赋值性 assignable 
interface Animal {
  age: number
}

interface Dog extends Animal {
  bark():void
}

let animal:Animal
let dog:Dog

animal = dog // ok // 这就是为什么 T 可以赋值给 User
dog = animal // error 类型 "Animal" 中缺少属性 "bark"，但类型 "Dog" 中需要该属性。
```

***

## 第二题：本道题我们希望参考 `a` 和 `b` 的类型都是一致的，即 `a` 和 `b` 同时为 `number` 或 `string` 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。

```ts
// 我们想让函数接受的 a 和 b 类型一致，如果不一致，函数就报错！
function f(a: string | number, b: string | number) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b; // error as b can be number | string
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok
```
### 解1: 函数重载
```ts
// 相信大家第一个想到的就是函数重载了吧，我也是！可以查阅一下资料了解一下函数重载。
// 我也只了解一点点
// 重载签名
function f(a: number, b: number): number
function f(a: string, b: string): string
// 实现签名
function f(a: string | number, b: string | number): string | number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + ':' + b
  } else {
    return (a as number) + (b as number)
  }
}

f(2, 3) // Ok  符合重载签名，也符合实现签名，OK!
f(1, 'a') // Error 不符合重载签名也不符合实现签名，报错!
f('a', 2) // Error 不符合重载签名也不符合实现签名，报错!
f('a', 'b') // Ok 符合重载签名， 也符合实现签名，OK!
```

### 解2: extends 约束

```ts
//（我是通过评论区了解此方法的）
// 利用 extends 约束 第一个参数传递类型 

const func = <T extends string | number>(a: T, b: T): string | number => {
  if (typeof a === 'string') {
    return a + ':' + b
  } else {
    return (a as number) + (b as number)
  }
}
func(2, 3) // Ok
func(1, 'a') // Error
func('a', 2) // Error
func('a', 'b') // Ok
```
Tips: `T extends string | number`, 约束 T 是 string 或者是 number，但是只约束了第一个形参类型，却赋值给第二个形参类型， 这样强行的让b的类型和a的类型保持一致。 然后就可以达到要求啦！

***

## 第三题: 定义一个 `SetOptional` 工具类型，支持把给定的 keys 对应的属性变成可选的。继续实现 `SetRequired` 工具类型，利用它可以把指定的 keys 对应的属性变成必选的。
```ts
type Foo = {
	a: number;
	b?: string;
	c: boolean;
}

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>;

// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean; 
// }

type Foo2 = {
	a?: number;
	b: string;
	c?: boolean;
}

// 测试用例
type SomeRequired = SetRequired<Foo2, 'b' | 'c'>;
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }
```
### 解1: SetOptional
```ts
/* 
定义一个 SetOptional 工具类型，支持把给定的 keys 对应的属性变成可选的。
*/ 
// 全部变成可选， 第一步达成 这也是 Partial 的实现方法
type PartialOptions<T> = {
  [K in keyof T]?: T[K]
}

// 筛选出 T 中 不包含 K 的 键值 ，这也是 Exclude 的实现方法
type FilterNotExist<T, K> = T extends K ? never : T

// 将 键值K 变成 必选
type RequiredFunc<T, K extends keyof T> = {
  [P in K]-?: T[K]
}

type Foo = {
  a: number
  b?: string
  c: boolean
}
// 实现内置工具方法
type SetOptional<T, K extends keyof T> = PartialOptions<T> &
  RequiredFunc<T, FilterNotExist<keyof T, K>>

// 成功实现
const foo: SetOptional<Foo, 'a' | 'b'> = {
  c: true
}
```
答：
  1. 创造内置工具，把所有属性都变成可选类型。
  2. 在把不需要的的进行必选。
  3. 随后进行 & 合并即可。
### 解2: SetRequired
```ts
/* 
  实现 `SetRequired` 工具类型，利用它可以把指定的 keys 对应的属性变成必选的。
  思路 和 `SetOptional` 方法类似，差不多
*/
// 筛选出 T 中 不包含 K 的 键值 ，这也是 Exclude 的实现方法
type FilterNotExist<T,K> = T extends K ? never : T

// 筛选出 T 中 包含 K 的 键值 ，这也是 Extract 的实现方法
type FilterExist<T, K> = T extends K ? T : never

// 将 键值K 变成 必选
type RequiredFunc<T, K extends keyof T> = {
  [P in K]-?: T[K]
}
// 默认遍历 K,从T中提取K值  这也是 Pick 的实现方法
type DefaultFunc<T,K extends keyof T> = {
  [P in K]: T[K]
}

type Foo = {
  a?: number
  b: string
  c?: boolean
}

// 实现内置工具方法
type SetRequired<T, K extends keyof T> = RequiredFunc<T, FilterExist<keyof T,K>> & 
DefaultFunc<T,FilterNotExist<keyof T,K>>

// 成功
const foo: SetRequired<Foo, 'b' | 'c'> = {
  b: '',
  c: true
}
```
答：
1. 筛选出指定的属性进行必选操作。
2. 筛选出剩余属性进行默认遍历操作。
3. 最后进行 & 合并。

Tips：此题主要考的是对`内置工具`，`必选`，`可选`，`合并&`，以及一些 `操作符` 和 `分发` 的一些使用和理解。
***

## 第四题: 定义一个 `ConditionalPick` 工具类型，支持根据指定的 `Condition` 条件来生成新的类型
```ts
// 提取指定类型参数生成新类型！

interface Example {
	a: string;
	b: string | number;
	c: () => void;
	d: {};
}

// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>;
//=> {a: string}
```
### 解: ConditionalPick
```ts
interface Example { 
  a: string; 
  b: string | number; 
  c: () => void; 
  d: {}; 
}
/*
 此题主要是通过 as 断言，判断键值是否存在。
*/
type ConditionalPick<T,U> ={
  K in keyof T as (T[K] extends U ? K : never)]:T[K]
}

// 测试用例
type StringKeysOnly = ConditionalPick<Example, string>;
```
答：
1. 遍历T，没问题，咱都会。 （K in Keyof T）
2. 通过`as 断言`进行判断 T[K] 是否约束于 U 成功返回键名K，失败返回never，该键名直接不存在。毕竟键名只有 stirng，number，symbol 才可以。
3. 此题考的是 对 as 的使用 和 never 类型。

课外：
```ts
type A = {
name: '刘'
age: 18
}

type B = {
name: '刘'
}
// true
const Test1 = A extends B ? true : false

// false
const Test2 = string | number extends string ? true : false
```
***
## 第五题: 定义一个工具类型 `AppendArgument`，为已有的函数类型增加指定类型的参数，新增的参数名是 `x`，将作为新函数类型的第一个参数。
```ts
type Fn = (a: number, b: string) => number
type AppendArgument<F, A> = // 你的实现代码

type FinalFn = AppendArgument<Fn, boolean> 
// (x: boolean, a: number, b: string) => number
```

### 解: AppendArgument
```ts
/*
  思路
  1. 已知函数 F，获取 F 的所有参数。
  2. 获取 F 的返回值。
  3. 添加x，并创建新函数进行返回
*/

type Fn = (a: number, b: string) => number

// F 约束 一个函数， 用于获取函数的所有参数, 这也是 Parameters 的实现方法
type GetParamsType<F extends (...args: any) => any> = F extends (
  ...args: infer P
) => any
  ? P
  : never
// F 约束一个函数，用于获取函数的返回类型，这也是 ReturnType 的实现方法
type GetFuncReturnType<F extends (...args: any) => any> = F extends (
  ...args: any
) => infer R
  ? R
  : any

// 实现工具
type AppendArgument<F extends (...args: any) => any, A> = (
  x: A,
  ...args: GetParamsType<F>
) => GetFuncReturnType<F>

type NewFn = AppendArgument<Fn, boolean


/*
  第二个解法，直接使用 infer
  思路
  判断 F是否是一个函数 infer 推断 参数(Type) 和返回类型(R)
*/
type AppendArgument2<F, A> = F extends (...args: infer P) => infer R
  ? (x: A, ...args: P) => R
  : never
type NewFn2 = AppendArgument2<Fn, boolean>
```
Tips： 此题主要是考我们 infer 操作符的使用，infer(推断)，顾名思义，推断一个类型，因为我们有时候不知道传进来的到底是什么类型。

像上面一道题 `F extends (...args: infer P) => infer R `, F 传进来的时候，因为我们提前 `约束(extends)`过了，所以确定 F 是一个函数，但是不确定参数和返回值，但是我们依旧可以extends判断F是否是一个函数，再利用 infer 推断得到`参数(P`)和`返回值(R)`，再进行返回。

课外：
```ts

// 传入一个 Promise 类型，但是我只想得到 Promise 的返回值。
// 可以自己去尝试一下，使用infer操作符实现。
type Pr = Promsie<string>

type PrReturn<F> = // 实现代码
// 结果
const Bb = PrReturn<Pr> // string
```
***
## 第六题: 定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化）,在完成 `NaiveFlat` 工具类型之后，再继续实现 `DeepFlat` 工具类型，

```ts
// 1. 定义一个 NativeFlat
type NaiveFlat<T extends any[]> = // 你的实现代码

// 测试用例
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult的结果： "a" | "b" | "c" | "d"


// 2.定义一个 DeepFlat 工具类型
type DeepFlat<T extends any[]> = unknown // 你的实现代码

// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];

type DeepTestResult = DeepFlat<Deep>
// DeepTestResult: "a" | "b" | "c" | "d" | "e"
```
### 解1: NativeFlat
```ts
 /*
   T[K][number]主要是以防数组嵌套数组的情况出现, [][number] 可以将数组变成一个联合类型。
   因为我们传入的是数组，在遍历之后，返回的还是数组。
   步骤
 */
 // 二维数组
 type NaiveDeep = [['a'], ['b', 'c'], ['d']]
 
 // 实现
 type NaiveFlat<T extends any[]> = {
  [K in keyof T]: T[K] extends any[] ? T[K][number] : T[K]
}[number]

type NaiveResult = NaiveFlat<NaiveDeep> // "a" | "b" | "c" | "d"
```
答：
1. 我们已经知道是二维数组了， 所以只需要判断一层 `T[K] extends any[]`， 使用 `T[K][number]`，进行数组转联合类型。
2. 因为最终得到的还是数组，在进行 [number] 就可以得到一个联合类型。
### 解2: DeepFlat

```ts
/*
  多维数组，其实和二维数组一致，只是需要递归一下而已，因为要判断多层数组嘛。
*/
// 测试用例
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];

// 实现
type DeepFlat<T extends any[]> = {
    [K in keyof T]: T[K] extends any[] ? DeepFlat<T[K]> : T[K]
}[number]

type DeepTestResult = DeepFlat<Deep>
```
答：
1. 依旧是遍历循环，结尾加上 [number], 因为返还回来肯定还是数组嘛
2. 判断 `T[K] 约束 any[]` 成功就证明 包含数组，以防包含多层，接着调用 `DeepFlat<T[K]> `就OK了嘛。

Tips: 学艺不精啊，这两个问题还是看了答案才明白的，我自己肯定解不出来，`[][number]` 的使用，原来还有这种,还可以在对象尾后使用`[keyof obj]`,也可以转键值联合类型，并且把类型是`never`的都给去除掉。

课外：
```ts
 // 可以找资料了解一下！
// [number]
type Arr = [1,2,3,4,5,6][number] === 1 | 2 | 3 | 4 | 5 | 6

type PersonOptionalKeys = {  
  id: never;  
  name: never;  
  age: never;  
  from?: "from";  
  speak?: "speak";  
}
// [keyof obj]
// 'from' | 'speak', 
type Test = PersonOptionalKeys[keyof PersonOptionalKeys]
```
***

## 第七题: 使用类型别名定义一个 `EmptyObject` 类型，使得该类型只允许空对象赋值,更改以下 `takeSomeTypeOnly` 函数的类型定义，让它的参数只允许严格SomeType类型的值。
```ts
 // 1. 使用类型别名定义一个 `EmptyObject` 类型，使得该类型只允许空对象赋值
type EmptyObject = // 你的代码

// 测试用例
const shouldPass: EmptyObject = {}; // 可以正常赋值
const shouldFail: EmptyObject = { // 将出现编译错误
  prop: "TS"
}



// 2. 更改以下 `takeSomeTypeOnly` 函数的类型定义，
//    让它的参数只允许严格SomeType类型的值
type SomeType =  {
  prop: string
}

// 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
function takeSomeTypeOnly(x: SomeType) { return x }

// 测试用例：
const x = { prop: 'a' };
takeSomeTypeOnly(x) // 可以正常调用

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y) // 将出现编译错误
```

### 解: EmptyObject
```ts
/* 
    只能赋值空对象，只要包含值就报错
*/
// keyof any === string | number | symbol
// PropertyKey === string | number | symbol
type EmptyObject = {
    [K in keyof any]: never // never 类型 表示永远不存在的值的类型
}
const shouldPass: EmptyObject = {}; // ok
/* 
   因为 "Ts" 不是 never类型，所以会报错。
   但是如果使用`as断言`的话也是可以通过编译器的
   "Ts" as never 
*/
const shouldFail: EmptyObject = { // error
  prop: "TS"
}

```
答： 
1. 将类型写成`never`类型，表示永远不存在的值的类型

Tips: 鲨鱼大佬讲过，不要随便使用 as操作符，因为它只是欺骗编译器而且，真的到执行环境中， 
 错误依旧会出现，还有非空断言(!)，在不能百分百确定的的情况下谨慎使用。

### 解2: takeSomeTypeOnly
```ts
/*
  让函数的参数严格使用 SomeType 的类型，否则报错
*/
type SomeType =  {
  prop: string
}
/*
  和 EmptyObject 一样， 我们把传入的对象键名跟 SomeType的键名做比较，
  相同的就正常返回类型嘛，不相同就还是返回 never 嘛，这样就OK啦！
*/
type FormatParams<T,S> = {
[K in keyof T]: K extends keyof S ? T[K] : never
}
function takeSomeTypeOnly<T extends SomeType>(x: FormatParams<T,SomeType>) { return x }

// 测试用例：
const x = { prop: 'a' };
takeSomeTypeOnly(x) // ok

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y) // error
```
答：
1. 约束 SomeType 得到 传入参数类型(T)， 传入参数至少包含 SomeType 类型。
2. 遍历 传入参数类型(T)
3. K(键名) 约束于 keyof S 就返回 正常类型，否则就是 never

Tips：这一题还是考验使用 never类型,自己创造工具的。!!!!!
`一定要要注意，不要乱使用as操作符以及非空断言(!)操作符，因为他们只是欺骗编译器而已！`。

***
## 第八题: 定义 `NonEmptyArray` 工具类型，用于确保数据非空数组。
```ts

type NonEmptyArray<T> = // 你的实现代码

const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用
```
#### 解:NonEmptyArray
```ts
 
// 1. [T，...] === 数组中第一个是 T 类型 后面也是都是 T 类型
type NonEmptyArray<T> =[T,...T[]]

const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用


// 2. T[] & {0:T} === T类型的数组 & 数组包含第一项
type NonEmptyArray<T> = T[] & {0:T}
const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用
```
答：
1. 但是我们可以让数组的第一项是什么类型，如果没传入，自然就会报错。
2. 我们知道数组的结构其实是这样的`{0:'第一个',1:'第二个'}`，所以合并一个 `{ 0: T }` 证明第一项是有值。

Tips：这一道题就有点简单了吧！在js中如何判断数组有值，我们都是通过 `length > 0` 来判断的，但是ts工具类型中没办法使用 `> 、< 、=` 这种符号。

***

## 第九题: 定义一个 `JoinStrArray` 工具类型，用于根据指定的 `Separator` 分隔符，对字符串数组类型进行拼接。
```ts
type JoinStrArray<
  Arr extends string[],
  Separator extends string,
  Result extends string = ''
> = // 你的实现代码

// 测试用例
type Names = ["Sem", "Lolo", "Kaquko"]
type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"
```

### 解: JoinStrArray
```ts
/*
  其实就是 js中的join，属性，用来让 数组进行分割成功字符串
  又到了使用 infer 的地方了
  [infer First, ...infer Last]
   First: 数组的第一项
   Last: 数组的剩余项 []
  还可以使用模板字符串哦！
*/
ttype JoinStrArray<
  Arr extends string[],
  Separator extends string,
  Result extends string = ''
> = Arr extends [infer First, ...infer Last]
  ? Last extends string[]
    ? First extends string
      ? Result extends ''
        ? JoinStrArray<Last, Separator, First>
        : JoinStrArray<Last, Separator, `${Result}${Separator}${First}`>
      : Result
    : Result
  : Result

// 测试用例
type Names = ["Sem", "Lolo", "Kaquko"]
type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"

```
答:

 1. `Arr extends [infer First, ...infer Last]`,取出数组第一项和剩余项，`[sem, ["Lolo", "Kaquko"]]`，就像这样。
 2. `Last extends string[]`，我们要保证 Last 是一个string类型的数组，这样我们才能递归的去使用这个数组。
 3. `First extends string`，保证 First 是一个string类型，这样更能赋值给 Result。
 4. `Result extends ''`，关键的一点，要判断是不是一个空字符串，是的话，就直接赋值First，而不是模版字符串。
 5. `JoinStrArray<Last, Separator, First>`，重新调用Join，将剩余项 `Last` 传入，以及`Separator(分隔符)`, 再将 `First` 赋值给 `Result` 等同于 `Result = First`。
 6. `JoinStrArray<Last, Separator,${Result}${Separator}${First}>`, 依旧是重新调用Join，还有`Last`，`Separator(分隔符)`， 只不过赋值给`Result`的值变成了模板字符串变量，等同于 `Result = ${Result}${Separator}${First}`, 这也是我们为什么要多一层`Result extends ''` 的代码的原因，要不然会多一个前面会多一个分隔符。

Tips: 这一题考的开始 infer 的使用和模板字符串的使用，竟然还能使用模板字符串，也是我没想到的。又学到了！！！

***

## 第十题: 实现一个 `Trim` 工具类型，用于对字符串字面量类型进行去空格处理。
```ts
type Trim<V extends string> = // 你的实现代码

// 测试用例
type Str = Trim<' semlinker '> // 'semlinker'
```
### 解: Trim
```ts
// 上一题讲到 可以使用模板字符串，还可以 extends 空字符串， 以及数组的第一项和剩余项，
// 数组既然可以，字符串也应该是可以滴啦！

// 剔除左边空格
type TrimLeft<V extends string> = V extends ` ${infer B}` ? TrimLeft<B> : V
// 剔除右边空格
type TrimRight<V extends string> = V extends `${infer B} ` ? TrimRight<B> : V

type Trim<V extends string> = TrimLeft<TrimRight<V>>

type Str = Trim<' semlinker '> // 'semlinker'
```
答:
1. TrimLeft `V extends   ${infer B}`, 注意 ${infer B} 前面有一个空格，至关重要，等同于 （空格 + `B === semlinker`），这一行代码直接将字符串的第一项拎出来，判断是不是空格。如果是空格就让剩余项接着去`TrimLeft<B>`直到没有空格为止。
2. TrimRight， 只是换到了右边而已啦！

Tips: 上一题主要是数组的拆分，这一题是字符串的拆分，也是使用`infer`来实现。


