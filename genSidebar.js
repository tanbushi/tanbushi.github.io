var sidebarTxt = '* [首页](/)\n';
var fs = require('fs');
var path = require('path');
var docsDir = 'docs'
var curPath = path.resolve('./' + docsDir);

function walkSync(currentDirPath, prefixBlank, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && ".git" != path.basename(filePath) && '_' != path.basename(filePath).substr(0, 1)) {
            sidebarTxt += prefixBlank + '* ' + path.basename(filePath) + '\n';
            walkSync(filePath, prefixBlank + '  ', callback);
        }
    });
}

walkSync(curPath, '', function (filePath, stat) {
    if (".md" == path.extname(filePath).toLowerCase()
        && '_' != path.basename(filePath).substr(0, 1)
        && 'README.md' != path.basename(filePath)) {
        var relativeFilePath = filePath.substr(curPath.length);
        var itemText = relativeFilePath.substr(1, relativeFilePath.length - 4);
        while (itemText.indexOf('/') > 0) {
            itemText = itemText.substr(itemText.indexOf('/') + 1);
            sidebarTxt += '  ';
        }
        sidebarTxt += '- [' + itemText + '](/' + docsDir + relativeFilePath + ')\n';
    }
});

fs.writeFile(path.resolve('./') + '/_sidebar.md', sidebarTxt, function (err) {
    if (err) {
        console.error(err);
    }else{
        console.log('_sidebar.md 创建成功！')
    }
});