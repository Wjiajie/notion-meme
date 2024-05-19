const fs = require('fs');
const { resolve } = require('path');
const vm = require('vm');

// 读取文件内容
const raw = fs.readFileSync(resolve(process.cwd(), 'blog.config.js'), 'utf-8');

// 创建一个沙箱环境
const sandbox = {
  module: {
    exports: {}
  }
};

// 创建一个新上下文，将代码作为模块执行
const script = new vm.Script(raw);
script.runInNewContext(sandbox);

// 获取模块的导出
const config = sandbox.module.exports;

// 如果需要剥离一些私有字段，可以在这里进行操作
const clientConfig = JSON.parse(JSON.stringify(config)); // 深拷贝config

module.exports = {
  config,
  clientConfig
};
