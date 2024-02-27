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



const defaultConfig={
    title: '模拟考试',
    students: 50,
    subjects: 2,
    subjectList: [ '语文', '数学' ]
}

const userConfig={
    title: 'xx年度会考',
    students: 60,
    subjectList: [ '地理', '生物' ]
}

const finalConfig = merge(defaultConfig, userConfig, { arrayMerge: overwriteMerge })
console.log(finalConfig)
