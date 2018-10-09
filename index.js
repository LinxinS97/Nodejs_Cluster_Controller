const proxyServer = require('http-proxy');
const servers = require('./config');
const port = parseInt(process.argv[2]);

// 创建代理服务器，用于分发请求
require('http').createServer(require('proxy-by-directory')(servers)).listen(port);
console.log(`listening on port ${process.argv[2]}`);