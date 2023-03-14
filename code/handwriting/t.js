const list = [
  {
    type: 1,
  },
  {
    type: 1,
  },
  {
    type: 2,
  },
  {
    type: 3,
    block: {
      begin: true,
    },
  },
  {
    type: 4,
    block: {
      begin: true,
    },
  },
  {
    type: 4,
    block: {
      end: true,
    },
  },
  {
    type: 3,
    block: {
      end: true,
    },
  },
  {
    type: 1,
  },
];

// 0 + 1 + 2 + 3 + 4
const a = list.reduce((arr, cur, index) => {
  const ret = arr;
  if (index === 0 && cur.block?.begin) {
    ret[index] = [];
  }
  // 第一个
  if (cur.block?.begin && index !== 0 && !ret[index - 1].child) {
    cur.child = [];
    ret[index] = cur;
    return ret;
  }
  // 第二个
  if (index !== 0 && ret[index - 1]?.child) {
    console.log(ret);
    ret[index - 1].child.push(cur);
    return ret;
  }
  ret.push(cur);
  return ret;
}, []);

console.dir(a);
// Expected output: 10
