// 实现一个 RequireAtLeastOne 工具类型，它将创建至少含有一个给定 Keys 的类型，其余的 Keys 保持原样。具体的使用示例如下所示：

// type Responder = {
//    text?: () => string;
//    json?: () => string;
//    secure?: boolean;
// };

// type RequireAtLeastOne<
//     ObjectType,
//     KeysType extends keyof ObjectType = keyof ObjectType,
// > = // 你的实现代码

// // 表示当前类型至少包含 'text' 或 'json' 键
// const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
//     json: () => '{"message": "ok"}',
//     secure: true
// };
// 请在下面评论你的答案。

type Responder = {
   text?: () => string;
   json?: () => string;
   secure?: boolean;
};
/***
 * 
 * 首先 利用 extends 会分发的原理 对 KeysType 进行约束
 * 得到 { text:()=> string } | { json: () => string }
 * 并且在每次分发的时候 利用 Exclude 对 不包含在 KeysType 联合类型 进行返回
 * 随后 利用Pick 提取出 ObjectType中 的 Exclude 后的 字段
 * 得到最终结果  两个由交叉类型组成的 联合类型 
 * { text:()=> string } & { secure?:boolean} | { json: () => string } & { secure?:boolean}
 * 
 * 
 */
type RequireAtLeastOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType,
> = (KeysType extends any ? {[K in KeysType]-?: ObjectType[K]}: never) & Pick<ObjectType,Exclude<keyof ObjectType, KeysType>>

const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
  json:()=>'string',
  secure: true
}