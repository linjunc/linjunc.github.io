// 调试reduce过程的示例代码

const spu = "AB1234567";
const specList = [
  ["red", "yellow"],  // 颜色
  ["XL", "S"],       // 尺寸
];

console.log('📦 开始reduce调试...\n');

// 添加详细日志的reduce版本
function createSKU_Reduce_Debug(spu, specList) {
  return specList.reduce((acc, specs, stepIndex) => {
    console.log(`\n步骤 ${stepIndex + 1}:`);
    console.log(`当前累积器: [${acc.join(', ')}]`);
    console.log(`当前规格: [${specs.join(', ')}]`);
    
    const newAcc = acc.flatMap(base => {
      const newSpecs = specs.map(spec => `${base}-${spec}`);
      console.log(`  ${base} + ${JSON.stringify(specs)} → [${newSpecs.join(', ')}]`);
      return newSpecs;
    });
    
    console.log(`新的累积器: [${newAcc.join(', ')}]`);
    return newAcc;
  }, [spu]);
}

const result = createSKU_Reduce_Debug(spu, specList);

console.log('\n🎯 最终结果:');
console.log(result);