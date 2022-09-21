// --strictFunctionTypes : fasle
// class Animal {
//   name: string | undefined
// }

// class Bird extends Animal {
//   fly(){}
// }

// let fun1: (x: Animal) => void = (x: Animal)=>{}
// let fun2: (x: Bird) => void = (x: Bird)=>{}

// fun1  = fun2 // ok
// fun2  = fun1 // ok


// https://juejin.cn/post/7106882507982766117#heading-3
/**
 * 
 * 可赋值性 assignable
 * 
 * animal = dog // ok
 * 因为 animal:Animal 只有一个 age 属性 dog 赋值之后发现只有 age 属性, 并且 dog 中也有 age 属性，所以赋值成功
 * animal 只会保留 Animal 的属性 也就是说 bark 会自动删除
 * 
 * dog = animal // err
 * 为什么会报错呢
 * 
 * 因为 dog:Dog 有两个属性 age 和 bark， 但是 animal 只有一个 age 属性 所以 age 是成功的，
 * 但是bark为空，当 dog 调用 bark 的时候 就会报错。所以不允许赋值
 * 
 * */ 

interface Animal {
  age: number
}
interface Dog extends Animal {
  bark():void
}
let animal:Animal
let dog:Dog
type TTT = Dog extends Animal ? true : false

animal = dog
dog = animal

/***
 * 
 * 
 * 
 */
type Props = string | number | boolean
type Props2 = string

let props:Props = 0
let props2:Props2 = ''
props2 = props
props = props2


type P = Props extends Props2 ? true : false


/***
 * 逆变
 * 
 * fn1 = fn2 // err
 * 因为 fn2 赋值给 fn1 , 调用 fn1 时 就是调用 fn2 但是， fn1只支持2个参数， fn2 确实三个 ，参数缺少，肯定是会报错的。
 * 
 * fn2 = fn1 // ok
 * 少参数的 为什么会 可以复制给多参数的呢
 * 调用 fn2 就是调用 fn1 ，fn1 只需要两个参数， fn2 有三个, 所以包含 fn1 的所有参数， 不会因为参数而报错，可执行
 * （在JS中函数调用时的实参个数大于定义时的形参个数是被允许的）
 * 
 * 通俗来说，函数参数少（父）的可以赋值给参数多（子）的，这种参数类型兼容性是典型的逆变。
 */

 let fn1: (a: string, b: number) => void;
 let fn2: (a: string, b: number, c: boolean) => void;
 
 fn1 = fn2; // ❌ TS Error: 不能将fn2的类型赋值给fn1
 fn2 = fn1
 
 /**
  * 
  * 协变 
  * 
  * 
  */
  class Animal2 {
    doAnimalThing() {
      console.log('do animal thing.')
    }
  }
  class Dog2 extends Animal2 {
    doDogThing() {
      console.log('do dog thing.')
    }
  }
  type Co<V> = () => V;

  // Co<Dog> ≤ Co<Animal>
  const animalFn: Co<Animal2> = () => {
    return new Animal2();
  }
  
  const dogFn: Co<Dog2> = () => {
    return new Dog2();
  }
  
  let a: Co<Animal2> = dogFn; // ok，dogFn返回Dog，Dog本身就是Animal
  let b: Co<Dog2> = animalFn; // error，animalFn返回Animal，Animal不一定是Dog，有可能不会doDogThing
 


