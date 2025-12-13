#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

// 配置 - 修改这些值
const CONFIG = {
  SERVER_IP: '119.91.115.131',      // 你的服务器IP
  DEPLOY_PATH: '/www/blog',    // 服务器部署路径
  USERNAME: 'root',              // SSH用户名
  SSH_KEY: `${process.cwd()}/.key` // 使用绝对路径
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
    // Windows上修复密钥权限
    try {
      execSync(`icacls "${CONFIG.SSH_KEY}" /inheritance:r /grant:r "%USERNAME%:(R)"`, { stdio: 'pipe' });
    } catch (error) {
      console.log('⚠️ 无法修复密钥权限，请手动设置');
    }
  }
}

async function main() {
  console.log('🚀 开始部署...\n');

  // 检查配置
  if (CONFIG.SERVER_IP === 'your_server_ip') {
    console.log('❌ 请先修改 deploy.js 中的 CONFIG 配置');
    process.exit(1);
  }

  // 修复密钥权限
  fixKeyPermissions();

  // 构建
  if (!runCommand('yarn build', '构建项目')) {
    process.exit(1);
  }

  // 检查构建结果
  if (!existsSync('docs/.vitepress/dist/index.html')) {
    console.log('❌ 构建产物不存在');
    process.exit(1);
  }

  // 显示配置
  console.log('\n📋 部署配置:');
  console.log(`服务器: ${CONFIG.USERNAME}@${CONFIG.SERVER_IP}`);
  console.log(`路径: ${CONFIG.DEPLOY_PATH}`);
  console.log(`本地: docs/.vitepress/dist/`);

  const confirm = await question('\n确认部署？(y/N): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ 部署已取消');
    rl.close();
    process.exit(0);
  }

  // 部署命令 - 先清理，再scp传输
  const commands = [
    `ssh -i "${CONFIG.SSH_KEY}" ${CONFIG.USERNAME}@${CONFIG.SERVER_IP} "mkdir -p ${CONFIG.DEPLOY_PATH} && rm -rf ${CONFIG.DEPLOY_PATH}/*"`,
    `scp -i "${CONFIG.SSH_KEY}" -r "docs/.vitepress/dist/"* ${CONFIG.USERNAME}@${CONFIG.SERVER_IP}:${CONFIG.DEPLOY_PATH}/`,
    `ssh -i "${CONFIG.SSH_KEY}" ${CONFIG.USERNAME}@${CONFIG.SERVER_IP} "chmod -R 755 ${CONFIG.DEPLOY_PATH}"`
  ];

  let success = true;
  for (let i = 0; i < commands.length; i++) {
    const descriptions = ['清理远程目录', '上传文件', '设置权限'];
    if (!runCommand(commands[i], descriptions[i])) {
      success = false;
      break;
    }
  }

  rl.close();

  if (success) {
    console.log('\n🎉 部署完成！');
    console.log(`🌐 访问: http://${CONFIG.SERVER_IP}`);
  } else {
    console.log('\n❌ 部署失败');
    process.exit(1);
  }
}

main().catch(console.error);