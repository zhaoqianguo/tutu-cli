const path = require('path');
const { exec } = require('child_process');
const ora = require('ora');
const spinner = ora();

const LibraryMap = {
  'Ant Design': 'antd',
  iView: 'view-ui-plus',
  'Ant Design Vue': 'ant-design-vue',
  Element: 'element-plus',
};

function install(cwdPath, options) {
  const { frame, library } = options;
  const command = `pnpm add ${frame} && pnpm add ${LibraryMap[library]}`;

  return new Promise((resolve, reject) => {
    spinner.start(`正在安装依赖，请稍等`);
    exec(
      command,
      {
        cwd: path.resolve(cwdPath),
      },
      function (error) {
        if (error) {
          reject();
          spinner.fail(`依赖安装失败`);
          return;
        }
        spinner.succeed(`依赖安装成功`);
        resolve();
      }
    );
  });
}

module.exports = install;
