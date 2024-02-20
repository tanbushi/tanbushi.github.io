// 需要使用 node 命令执行 node create_sidebar_data.js

var fs = require('fs');
var path = require('path');
// var exec = require('child_process').exec;
function readFileList(dir, filesList = []) {
    filesList.push(dir);
    const files = fs.readdirSync(dir);
    //   console.log(files);
    files.forEach((item, index) => {
        console.log('item '+item)
        if (item[0] != '.') 
        {
            var fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                // filesList.push(fullPath);
                readFileList(path.join(dir, item), filesList); //递归读取文件
            } else {
                filesList.push(fullPath);
            }
        }
    });
    return filesList;
}
var filesList = [];
// readFileList(__dirname,filesList);
readFileList('javascript', filesList);
console.log(filesList);