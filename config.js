// config.js 负责从 config.json 里读取配置，并通过 callback 函数传递给 renderCssJss 函数
function loadConfig(jsonFile, callback) {
    console.log('loadConfig: ' + jsonFile);
    var requestUrl = jsonFile;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {   //if complete
            if (request.status === 200) {  //check if "OK" (200)
                let configText = request.response;
                let configJson = JSON.parse(configText);
                callback(configJson)
            } else {
                console.log('error')
            }
        } 
    }
    request.open('GET', requestUrl);
    request.responseType = 'text';
    request.send();
}




// var cssCanUse = {
//     vue: {
//         jsdelivr: '//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css',
//         onmicrosoft: '//jsd.onmicrosoft.cn/npm/docsify@4/lib/themes/vue.css'
//     },
//     sidebar_collapse_folder: {
//         jsdelivr: '//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/sidebar-folder.min.css'
//     },
//     sidebar_collapse_arrow: {
//         jsdelivr: '//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/sidebar.min.css'
//     }
// }

// var jsCanUse = {
//     vue: {
//         jsdelivr: '//cdn.jsdelivr.net/npm/docsify@4'
//     },
//     sidebar_collapse: {
//         jsdelivr: '//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/docsify-sidebar-collapse.min.js'
//     },
//     copy_code: {
//         jsdelivr: '//cdn.jsdelivr.net/npm/docsify-copy-code@2/dist/docsify-copy-code.min.js'
//     }
// }

// var cssKeys = [
//     ['vue', 'jsdelivr'],
//     ['sidebar_collapse_folder', 'jsdelivr'],
//     ['sidebar_collapse_arrow', 'jsdelivr']
// ]


