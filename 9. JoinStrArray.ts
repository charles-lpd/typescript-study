// 定义一个 JoinStrArray 工具类型，用于根据指定的 Separator 分隔符，对字符串数组类型进行拼接。具体的使用示例如下所示：

// type JoinStrArray<Arr extends string[], Separator extends string, Result extends string = ""> = // 你的实现代码

// // 测试用例
// type Names = ["Sem", "Lolo", "Kaquko"]
// type NamesComma = JoinStrArray<Names, ","> // "Sem,Lolo,Kaquko"
// type NamesSpace = JoinStrArray<Names, " "> // "Sem Lolo Kaquko"
// type NamesStars = JoinStrArray<Names, "⭐️"> // "Sem⭐️Lolo⭐️Kaquko"

type JoinStrArray<
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

type Names = ['Sem', 'Lolo', 'Kaquko']
type NamesComma = JoinStrArray<Names, ','> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, ' '> // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, '⭐️'> // "Sem⭐️Lolo⭐️Kaquko"
