const servers = require('./config');
const httpProxy = require('http-proxy');
const port = parseInt(process.argv[2]);
const mode = process.argv[3];

/**
 * 集群控制器
 */
let temp = servers.balance.concat();

switch(mode) {
    /**
     * 网关模式，根据路径分发请求
     */
    case 'gateway': 
        console.log('gateway mode on');
        require('http').createServer(require('proxy-by-directory')(servers.gateway)).listen(port);
        break;
    /**
     * 负载均衡模式，根据服务器集群循环分发请求
     */
    case 'balance':
        const proxy = httpProxy.createProxyServer({});
        console.log('balance mode on');
        require('http').createServer((req, res) => {
            let url = temp.shift();
            console.log('redirected to ' + url);
            proxy.web(req, res, { target: url });
            temp.push(url);
        }).listen(port);
        break;
}
console.log(`listening on port ${process.argv[2]}`);