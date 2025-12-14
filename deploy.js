#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { createInterface } from 'readline';

const CONFIG = {
  SERVER_IP: '119.91.115.131',
  DEPLOY_PATH: '/www/blog',
  USERNAME: 'root',
  SSH_KEY: `${process.cwd()}/.key`
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} 完成`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} 失败:`, error.message);
    return false;
  }
}

function fixKeyPermissions() {
  if (process.platform === 'win32') {
    try {
      execSync(`icacls "${CONFIG.SSH_KEY}" /inheritance:r /grant:r "%USERNAME%:(R)"`, { stdio: 'pipe' });
    } catch (error) {
      console.log('⚠️ 无法修复密钥权限，请手动设置');
    }
  }
}

async function main() {
  console.log('🚀 开始增量部署...\n');
  
  fixKeyPermissions();

  // 构建
  if (!runCommand('yarn build', '构建项目')) {
    process.exit(1);
  }

  if (!existsSync('docs/.vitepress/dist/index.html')) {
    console.log('❌ 构建产物不存在');
    process.exit(1);
  }

  console.log('\n📋 增量部署配置:');
  console.log(`服务器: ${CONFIG.USERNAME}@${CONFIG.SERVER_IP}`);
  console.log(`路径: ${CONFIG.DEPLOY_PATH}`);

  // const confirm = await question('\n确认增量部署？(y/N): ');
  // if (confirm.toLowerCase() !== 'y') {
  //   console.log('❌ 部署已取消');
  //   rl.close();
  //   process.exit(0);
  // }

  // 增量部署 - 只上传新文件，不删除现有文件
  const commands = [
    `ssh -i "${CONFIG.SSH_KEY}" ${CONFIG.USERNAME}@${CONFIG.SERVER_IP} "mkdir -p ${CONFIG.DEPLOY_PATH}"`,
    `scp -i "${CONFIG.SSH_KEY}" -r "docs/.vitepress/dist/"* ${CONFIG.USERNAME}@${CONFIG.SERVER_IP}:${CONFIG.DEPLOY_PATH}/`,
    `ssh -i "${CONFIG.SSH_KEY}" ${CONFIG.USERNAME}@${CONFIG.SERVER_IP} "chmod -R 755 ${CONFIG.DEPLOY_PATH}"`
  ];

  let success = true;
  const descriptions = ['创建远程目录', '增量上传文件', '设置权限'];
  
  for (let i = 0; i < commands.length; i++) {
    if (!runCommand(commands[i], descriptions[i])) {
      success = false;
      break;
    }
  }

  // 设置权限
  runCommand(`ssh -i "${CONFIG.SSH_KEY}" ${CONFIG.USERNAME}@${CONFIG.SERVER_IP} "chmod -R 755 ${CONFIG.DEPLOY_PATH}"`, '设置权限');

  rl.close();
  console.log('\n🎉 增量部署完成！');
  console.log(`🌐 访问: http://${CONFIG.SERVER_IP}`);
}

main().catch(console.error);