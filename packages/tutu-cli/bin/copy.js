const copydir = require('copy-dir');
const path = require('path');
const fs = require('fs');
const mustache = require('mustache');

// 复制目录
function copyDir(from, to, options) {
  mkdirGuard(to);
  copydir.sync(from, to, options);
}

// 检查目录是否存在
function checkMkdirExists(path) {
  return fs.existsSync(path);
}

// 目录守卫，用于创建不存在的目录
function mkdirGuard(target) {
  try {
    fs.mkdirSync(target); // 这个能递归创建父目录
  } catch (error) {
    mkdirp(target);
  }
}
// 递归创建父级目录
function mkdirp(dir) {
  if (fs.existsSync(dir)) {
    return true;
  }
  const dirName = path.dirname(dir);
  mkdirp(dirName);
  fs.mkdirSync(dir);
}

// 拷贝文件
function copyFile(from, to) {
  const fileStr = fs.readFileSync(from, 'utf-8');
  const parentPath = path.dirname(to);

  mkdirGuard(parentPath);
  fs.writeFileSync(to, fileStr);
}

// 读取模版文件
function readTemplateFile(path, view = {}) {
  const templateStr = fs.readFileSync(path, 'utf-8');
  console.log(path);

  return mustache.render(templateStr, view);
}

// 拷贝模版文件
function copyTemplateFile(from, to, view = {}) {
  // 非模版文件直接拷贝
  if (path.extname(from) !== '.tpl') {
    return copyFile(from, to);
  }
  const parentPath = path.dirname(to);

  mkdirGuard(parentPath);
  fs.writeFileSync(to, readTemplateFile(from, view));
}

module.exports = {
  copyDir,
  checkMkdirExists,
  mkdirGuard,
  copyFile,
  copyTemplateFile,
};
