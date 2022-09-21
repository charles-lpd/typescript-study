// 实现 Replace 工具类型，用于实现字符串类型的替换操作。具体的使用示例如下所示：

// type Replace<
//   S extends string,
//   From extends string,
//   To extends string
// > = // 你的实现代码 
  
// type R0 = Replace<'', '', ''> // ''
// type R1 = Replace<'foobar', 'bar', 'foo'> // "foofoo"
// type R2 = Replace<'foobarbar', 'bar', 'foo'> // "foofoobar"


// 此外，继续实现 ReplaceAll 工具类型，用于实现替换所有满足条件的子串。具体的使用示例如下所示：

// type ReplaceAll<
//   S extends string,
//   From extends string,
//   To extends string
// > = // 你的实现代码 

// type R0 = ReplaceAll<'', '', ''> // ''
// type R1 = ReplaceAll<'barfoo', 'bar', 'foo'> // "foofoo"
// type R2 = ReplaceAll<'foobarbar', 'bar', 'foo'> // "foofoofoo"
// type R3 = ReplaceAll<'foobarfoobar', 'ob', 'b'> // "fobarfobar"

type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer A}${From}${infer B}` ?  `${A}${To}${B}` : ''

type R0 = Replace<'', '', ''> // ''

type R1 = Replace<'foobar', 'bar', 'foo'> // "foofoo"
type R2 = Replace<'foobarbar', 'bar', 'foo'> // "foofoobar"

/**
 * 
 * 
 * 
 */
// type ReplaceAll<
//   S extends string,
//   From extends string,
//   To extends string,
//   A extends string = S
// > = A extends '' ? '' : A extends  `${infer A}${From}${infer B}`  ? ReplaceAll<S,From,To,`${A}${To}${B}`> : A extends `${From}${infer B}` ? ReplaceAll<S,From,To,`${To}${B}`> : A
/***
 * 
 * 
 * 
 * 
 */
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string,
  A extends string = S
> = A extends `${infer A}${From}${infer B}` ? `${ReplaceAll<A,From,To>}${To}${ReplaceAll<B,From,To>}` : S
type RA0 = ReplaceAll<'', '', ''> // ''
type RA1 = ReplaceAll<'barfoo', 'bar', 'foo'> // "foofoo"
type RA2 = ReplaceAll<'foobarbar', 'bar', 'foo'> // "foofoofoo"
type RA3 = ReplaceAll<'foobarfoobar', 'ob', 'b'> // "fobarfobar"