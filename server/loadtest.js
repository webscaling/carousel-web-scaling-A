const loadtest = require('loadtest');

function statusCallback(error, result, latency) {
  // console.log('Current latency %j', latency);
  // console.log('----');
  // console.log('Request elapsed milliseconds: ', result.requestElapsed);
  console.log('Request index: ', result.requestIndex);
}

const options = {
  url: 'http://localhost:4444',
  maxRequests: 500000,
  statusCallback: statusCallback,
  requestsPerSecond: 1000,
  //concurrency: 10

};

loadtest.loadTest(options, function(error, result) {
  if (error) {
    return console.error('Got an error: %s', error);
  }
  console.log(result)
  console.log('Tests run successfully');
});

