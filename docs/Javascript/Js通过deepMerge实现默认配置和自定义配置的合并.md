# Js通过deepMerge实现默认配置和自定义配置的合并
> 在做自定义配置文件时，为了简化操作，采用了默认配置基础上的用户自定义配置，发现使用 deepMerge 库可以轻松灵活实现。提示：请确保您的计算机安装了 NodeJS 运行环境。
## 1 实现目标
通过 defaultConfig 对象进行默认配置，可以确保在没有进行用户配置的前提下，系统可以按照默认配置进行运行，使应用能够“开箱即用”，提升用户体验；当用户需要满足各种不同需要的应用时，可以通过 userConfig 对象进行用户功能配置，满足灵活应用的需要。
## 2 关于 deepMerge
### 2.1 deepMerge 库相关介绍
deepMerge 库可以通过 npm 安装，安装包的链接为：[https://www.npmjs.com/package/deepmerge](https://www.npmjs.com/package/deepmerge)，github 仓库地址为：[github.com/TehShrike/deepmerge](github.com/TehShrike/deepmerge)。
### 2.2 deepMerge 的引入
可以在 Shell 里运行下面的命令安装：
```bash
npm install deepmerge
```
安装完成后可通过下面的 js 代码引入：
```javascript
const merge = require('deepmerge')
```
### 2.3 deepMerge 基本用法
```javascript
merge(x, y, [options])
```
深度合并连个对象 x 和 y ，返回一个新的合并后的对象，元素来自 x 和 y ， x 和 y 都不会发生改变。
注意：上面的 option 是可选项，默认情况下（即没有输入 option 时），两个对象的数组会连接起来。
- 下面的代码测试 deepMerge 库默认配置下的效果：

```javascript
const merge = require('deepmerge')

// 下面定义数组覆盖选项，当要实现数组覆盖的时候，可以在merge时使用该选项
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray

let x = {
    a: {
        a1: 'A1',
        a2: 'A2'
    },
    b: {
        b1: ['B1']
    }
}

let y = {
    a: {
        a1: 'A1-new',
        a3: 'created'
    },
    b: {
        b1: ['B2']
    }
}


let z1 = merge(x, y)
console.log('下面采用默认选项的 merge 结果：')
console.log(z1)


let z2 = merge(x, y, { arrayMerge: overwriteMerge })
console.log('下面采用数组覆盖选项的 merge 结果：')
console.log(z2)
```
- 得到对象 z 的结果打印如下：

```javascript
//下面采用默认选项的 merge 结果：
{
    a: {
        a1: 'A1-new',
        a2: 'A2',
        a3: 'created'
    },
    b: {
        b1: ['B1', 'B2']
    }
}
//下面采用数组覆盖选项的 merge 结果：
{
    a: {
        a1: 'A1-new',
        a2: 'A2',
        a3: 'created'
    },
    b: {
        b1: ['B2']
    }
}
```
- 结果解析  
1）值类型会被覆盖  
值类型为：字符串（string）、数值（number）、布尔值（boolean）、null、undefined，当 x，y 对象中有相同的key 对应的数据类型为值类型时，值会被覆盖，如：  
x.a.a1='A1'  
y.a.a1='A1-new'  
merge的结果就是 'A1-new' 会覆盖 'A1'，z.a.a1='A1-new'  
2）“左侧”内容会保留  
如x （左侧）中存在，但 y（右侧） 中不存在，则 x 的内容会被保留，如：x.a.a2='A2',y.a.a2不存在，所以：z.a.a2='A2'（x.a.a2 被保留）  
3）默认配置下引用类型：对象（Object）、数组（Array）默认会合并  
如对象属性：x.a.a3不存在，y.a.a3='created'，y.a.a3的内容就被合并到 z 中，z.a.a3='created'  
如数组元素：x.b.b1=['B1']，y.b.b1=['B2']，此两项内容被合并到 z 中，z.b.b1=['B1','B2']  
4）配置数组属性覆盖
当配置数组属性覆盖时，在 merge 后的对象 z 里，z.b.b1的值取 y.b.b1 的值：['B2']，即z.b.b1=['B2'] 
## 3 应用测试
创建 test-merge.js 文件，编写代码如下
```javascript
const merge = require('deepmerge')

// 下面定义数组覆盖选项，当要实现数组覆盖的时候，可以在merge时使用该选项
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
```
### 3.1 defaultConfig 的对象定义
在 test-merge.js 文件里定义 defaultConfig 对象：
```javascript
const defaultConfig={
    title: '模拟考试',
    students: 50,
    subjects: 2,
    subjectList: [ '语文', '数学' ]
}
```
### 3.2 userConfig 的对象定义
在 test-merge.js 文件里定义 userConfig 对象：
```javascript
const userConfig={
    title: 'xx年度会考',
    students: 60,
    subjectList: [ '地理', '生物' ]
}
```
### 3.3 deepMerge 合并生成 finalConfig 对象
一般作为配置文件的合并，数组一般会使用覆盖模式，继续编写代码：
```javascript
const finalConfig = merge(defaultConfig, userConfig, { arrayMerge: overwriteMerge })
console.log(finalConfig)
```
运行后得到的结果为
```javascript
{ 
    title: 'xx年度会考', 
    students: 60, 
    subjects: 2,
    subjectsList: [ '地理', '生物' ] 
}
```
完美实现默认配置和自定义配置的合并。
