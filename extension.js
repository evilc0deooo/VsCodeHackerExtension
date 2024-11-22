// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
    // 注册命令 Demo
	const disposable = vscode.commands.registerCommand('extensionproject.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from extensionProject!');
	});

	console.log('Congratulations, your extension "extensionproject" is now active!');
	

    // 定义顶级域名和国家顶级域名
    const topSufix = 'cc|aero|arpa|asia|biz|cat|com|coop|edu|gov|int|info|jobs|mil|mobi|museum|name|net|org|pro|tel|trave|xxx|digital|run';
    const countrySufix = 'ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yr|yt|yu|za|zm|zw';


    // 文本去重
    let removeDuplicates = vscode.commands.registerCommand('extension.removeDuplicateText', function () {
        const editor = vscode.window.activeTextEditor;
    
        // 确保有打开的编辑器并且有选中文本
        if (editor && editor.selection) {
            const selectedText = editor.document.getText(editor.selection);
            const lines = selectedText.split('\n').map(line => line.trim()).filter(Boolean); // 分割文本为数组，去除空白行
    
            let uniqueLines = [...new Set(lines)]; // 使用 Set 去除重复的行
            const numDuplicatesRemoved = lines.length - uniqueLines.length;
    
            const formattedUniqueText = uniqueLines.join('\n'); // 重新组合文本
    
            editor.edit(editBuilder => {
                editBuilder.replace(editor.selection, formattedUniqueText);
            }).then(() => {
                vscode.window.showInformationMessage(`Removed ${numDuplicatesRemoved} duplicate lines. ${uniqueLines.length} unique lines remaining.`);
            });
        }
    });
    
    // 文本排序（正序/倒序）
    let sortText = vscode.commands.registerCommand('extension.sortSelectedText', function () {
        const editor = vscode.window.activeTextEditor;

        // 确保有打开的编辑器并且有选中文本
        if (editor && editor.selection) {
            const selectedText = editor.document.getText(editor.selection);
            
            // 按行分割选中的文本
            const lines = selectedText.split('\n').filter(line => line.trim() !== '');

            // 如果没有有效的文本
            if (lines.length === 0) {
                vscode.window.showInformationMessage('No valid text selected.');
                return;
            }

            // 弹出选择框让用户选择排序方式
            vscode.window.showQuickPick(['Ascending', 'Descending'], { placeHolder: 'Choose sort order' }).then(sortOrder => {
                if (!sortOrder) {
                    return; // 用户取消操作
                }

                // 按照升序或降序排序
                let sortedLines;
                if (sortOrder === 'Ascending') {
                    sortedLines = lines.sort((a, b) => a.localeCompare(b));
                } else {
                    sortedLines = lines.sort((a, b) => b.localeCompare(a));
                }

                // 将排序后的文本重新拼接为字符串
                const sortedText = sortedLines.join('\n');

                // 替换编辑器中的选中文本为排序后的文本
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, sortedText);
                }).then(() => {
                    vscode.window.showInformationMessage(`Text sorted in ${sortOrder} order.`);
                });
            });
        }
    });

    // 提取IP地址
    let FilterIpv4 = vscode.commands.registerCommand('extension.applyRegexFilteripv4', function () {
        const editor = vscode.window.activeTextEditor;

        // 确保有打开的编辑器并且有选中文本
        if (editor && editor.selection) {
            const selectedText = editor.document.getText(editor.selection);

            // 定义正则表达式，匹配有效的IP地址
            const regex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;

            // 提取所有匹配的IP地址
            const ipAddresses = selectedText.match(regex);

            if (ipAddresses) {
                // 格式化IP地址，每个IP地址后面加上换行符
                const formattedIPs = ipAddresses.join('\n'); 

                // 将格式化后的 IP 地址替换回选中的位置
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, formattedIPs);
                }).then(() => {
                    // 如果替换成功，显示信息
                    vscode.window.showInformationMessage(`Found and formatted ${ipAddresses.length} IP addresses.`);
                });
            } else {
                vscode.window.showInformationMessage('No IP addresses found.');
            }
        }
    });

    // Base64 编码命令
    let base64Encode = vscode.commands.registerCommand('extension.base64Encode', function () {
        const editor = vscode.window.activeTextEditor;

        // 确保有打开的编辑器并且有选中文本
        if (editor && editor.selection) {
            const selectedText = editor.document.getText(editor.selection);

            // Base64 编码
            const encodedText = Buffer.from(selectedText, 'utf-8').toString('base64');

            // 将编码后的文本替换回选中的位置
            editor.edit(editBuilder => {
                editBuilder.replace(editor.selection, encodedText);
            }).then(() => {
                vscode.window.showInformationMessage('Text successfully encoded to Base64.');
            });
        }
    });

    // Base64 解码命令
    let base64Decode = vscode.commands.registerCommand('extension.base64Decode', function () {
        const editor = vscode.window.activeTextEditor;

        // 确保有打开的编辑器并且有选中文本
        if (editor && editor.selection) {
            const selectedText = editor.document.getText(editor.selection);

            try {
                // Base64 解码
                const decodedText = Buffer.from(selectedText, 'base64').toString('utf-8');

                // 将解码后的文本替换回选中的位置
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, decodedText);
                }).then(() => {
                    vscode.window.showInformationMessage('Text successfully decoded from Base64.');
                });
            } catch (error) {
                vscode.window.showErrorMessage('Invalid Base64 encoding.');
            }
        }
    });

    // Get根域名
    function selectRootDomain(domain) {
        const parts = domain.split('.');
        if (parts.length > 2) {
            return parts.slice(-2).join('.'); // 返回根域名（最后两个部分）
        }
        return domain; // 如果只有一个域名部分，直接返回
    }

    // 提取域名
    let extractDomains = vscode.commands.registerCommand('extension.extractDomains', function () {
        const editor = vscode.window.activeTextEditor;

        // 确保有打开的编辑器并且有选中文本
        if (editor && editor.selection) {
            const selectedText = editor.document.getText(editor.selection);
            
            // 定义正则表达式来匹配域名
            const domainRegex = new RegExp(`([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+(${topSufix}|${countrySufix})`, 'g');

            // 匹配所有域名
            const regions = selectedText.match(domainRegex);

            if (regions) {
                // 提取根域名
                const rootDomains = regions.map(selectRootDomain);
                const uniqueDomains = [...new Set(regions)];  // 去重
                const uniqueRootDomains = [...new Set(rootDomains)];  // 去重根域名

                // 将域名格式化为每行一个
                const formattedDomains = uniqueDomains.join('\n');
                const formattedRootDomains = uniqueRootDomains.join('\n');

                // 替换选中的文本为格式化后的域名
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, `Domains:\n${formattedDomains}\n\nRoot Domains:\n${formattedRootDomains}`);
                }).then(() => {
                    vscode.window.showInformationMessage(`Found ${uniqueDomains.length} domains and ${uniqueRootDomains.length} root domains.`);
                });
            } else {
                vscode.window.showInformationMessage('No domains found.');
            }
        }
    });


    // 提取URL（不带路径）
    let extractUrls = vscode.commands.registerCommand('extension.extractUrls', function () {
        const editor = vscode.window.activeTextEditor;

        // 删除 URL 路径部分，保留协议和主机部分
        function deleteUrlPath(url) {
            try {
                const parsedUrl = new URL(url);
                // 返回没有路径和查询字符串的 URL
                return `${parsedUrl.protocol}//${parsedUrl.host}`;
            } catch (e) {
                return url; // 如果 URL 解析失败，返回原始 URL
            }
        }
        // 确保有打开的编辑器并且有选中文本
        if (editor && editor.selection) {
            const selectedText = editor.document.getText(editor.selection);
            // 定义正则表达式来匹配 URL
            const urlRegex = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;

            // 使用正则表达式匹配所有的 URL
            const regions = selectedText.match(urlRegex);

            if (regions) {
                // 去重并删除 URL 路径部分
                const urls = [];
                regions.forEach(url => {
                    const cleanedUrl = deleteUrlPath(url);
                    if (!urls.includes(cleanedUrl)) {
                        urls.push(cleanedUrl);
                    }
                });

                // 将提取到的 URL 格式化为每行一个 URL
                const formattedUrls = urls.join('\n');

                // 将格式化后的 URL 替换回选中的位置
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, formattedUrls);
                }).then(() => {
                    vscode.window.showInformationMessage(`Found ${urls.length} unique URL(s).`);
                });
            } else {
                vscode.window.showInformationMessage('No URLs found.');
            }
        }
    });
    // 定义文件扩展名过滤规则
    const fileExts = ['png', 'jpg', 'jpeg', 'gif', 'js', 'vue', 'ico', 'svg', 'css', 'ts', 'bmp', 'ttf', 'woff', 'woff2'];

    // 正则表达式，用于匹配不同类型的 URL 和路由
    const regexStr = /(?:[a-zA-Z]{1,10}:\/\/|\/\/)[^"'\s]{1,}\.[a-zA-Z]{2,}[^"'\s]*|(?:\/|\.\.\/|\.)\/[^\s"'><,;|%$^\/\\[\]]+[^"'><,;|()]{1,}|[a-zA-Z0-9_\-\/]{1,}\/[a-zA-Z0-9_\-\/]{1,}\.(?:[a-zA-Z]{1,4}|action)(?:[\?|#][^"|']*|)|[a-zA-Z0-9_\-\/]{1,}\/[a-zA-Z0-9_\-\/]{3,}(?:[\?|#][^"|']*|)/g;

    // 从文本中提取路由
    function selectRouters(text) {
        const matches = [...text.matchAll(regexStr)];
        const routers = matches.map(m => {
            // 去除前导斜杠
            return m[0].replace(/^\/+/, ''); 
        });
        return routers;
    }

    // 过滤路由：按链接、路由和过滤文件分类
    function filterRouters(text) {
        const routers = selectRouters(text);
        const filteredRouters = { routers: [], links: [], filters: [] };

        // 去重并排序路由
        const uniqueRouters = Array.from(new Set(routers)).sort();

        uniqueRouters.forEach(router => {
            try {
                let temp = router;

                // 处理链接（包含 http:// 或 https://）
                if (temp.includes('http')) {
                    filteredRouters.links.push(router);
                    return;
                }

                // 处理路由，去掉查询参数部分
                if (temp.includes('?')) {
                    temp = temp.split('?')[0];
                }

                // 处理文件扩展名，判断是否是过滤项
                const ext = temp.split('.').pop();
                if (fileExts.includes(ext)) {
                    filteredRouters.filters.push(router);
                } else {
                    filteredRouters.routers.push(router);
                }
            } catch (error) {
                console.error('Error processing router:', error);
            }
        });

        // 格式化输出
        const formatOutput = (label, array) => {
            if (array.length > 0) {
                return `\n[+] ${label}:\n` + array.map(item => `/${item}`).join('\n');
            }
            return '';
        };

        let resultText = '';
        resultText += formatOutput('Routers', filteredRouters.routers);
        resultText += formatOutput('Links', filteredRouters.links);
        resultText += formatOutput('Filters', filteredRouters.filters);

        return resultText.trim();
    }

    // 提取路由
    let filterRoutersCommand = vscode.commands.registerCommand('extension.filterRouters', function () {
        const editor = vscode.window.activeTextEditor;

        if (editor && editor.selection) {
            const selectedText = editor.document.getText(editor.selection);

            // 过滤路由
            const formattedRouters = filterRouters(selectedText);

            if (formattedRouters) {
                // 将过滤后的路由替换回文本
                editor.edit(editBuilder => {
                    editBuilder.replace(editor.selection, formattedRouters);
                }).then(() => {
                    vscode.window.showInformationMessage(`Routers filtered and categorized.`);
                });
            } else {
                vscode.window.showInformationMessage('No valid routers found.');
            }
        }
    });




    // context.subscriptions.push(disposable);
	context.subscriptions.push(sortText);
    context.subscriptions.push(removeDuplicates);
    context.subscriptions.push(FilterIpv4);
    context.subscriptions.push(base64Encode);
    context.subscriptions.push(base64Decode);
    context.subscriptions.push(extractDomains);
    context.subscriptions.push(extractUrls);
    context.subscriptions.push(filterRoutersCommand);

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
