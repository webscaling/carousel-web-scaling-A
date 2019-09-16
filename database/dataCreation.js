const faker = require('faker');
const fs = require('fs');
const timerFn = require('timer-node');
const timer = timerFn('test-timer');


const createData1 = function() {
  return new Promise(resolve => {
    let stream = fs.createWriteStream('products1.csv', { flags: 'a' });

    for (let i = 1; i <= 5000000; i++) {
      stream.write(
        //i + ',' +
        faker.commerce.productName() + ',' +
        faker.commerce.price() + ',' +
        parseFloat((Math.random() * Math.floor(5)).toFixed(2)) + ',' +
        Math.floor(Math.random() * Math.floor(50)) + ',' + 
        faker.commerce.department() + ',' +
        faker.image.imageUrl() + '\n')
    }
    stream.end();
    resolve('5 million records complete');
  })
};

function resolveAfter5Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 5000);
  });
}

async function createData2() {
  timer.start();

  await createData1();

  await resolveAfter5Seconds();

  let stream = fs.createWriteStream('products2.csv', { flags: 'a' });

  for (let i = 1; i <= 5000000; i++) {
    let id = 5000000 + i
    stream.write(
      //id + ',' +
      faker.commerce.productName() + ',' +
      faker.commerce.price() + ',' +
      parseFloat((Math.random() * Math.floor(5)).toFixed(2)) + ',' +
      Math.floor(Math.random() * Math.floor(50)) + ',' + 
      faker.commerce.department() + ',' +
      faker.image.imageUrl() + '\n')
  }
  stream.end();
  timer.stop();
  console.log(`10 million records written in ${timer.seconds()} seconds`);
  console.log(`10 million records written in ${timer.milliseconds()} milliseconds`);
};

createData2();


//module.exports = { createData };


