const fs = require('fs');
const contents = fs.readFileSync('./data/groceries2.csv').toString();
const arr = contents.split("\n\r");
const all = {};
arr.map((line)=> {
  const arr2 = line.split(',');
  arr2.map((sent)=>{
    const arr3 = sent.split('/');
    if(arr.length<=1) {
      all[sent] = true;
    } else {
      arr3.map((word)=> {
        all[word] = true;
      })
    }
  })
});
console.log(Object.keys(all).length);
fs.writeFileSync('./data/groceries2.txt', Object.keys(all).join('\n'));