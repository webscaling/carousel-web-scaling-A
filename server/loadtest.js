const loadtest = require('loadtest');

function statusCallback(error, result, latency) {
  console.log('Current latency %j', latency);
  console.log('----');
  console.log('Request elapsed milliseconds: ', result.requestElapsed);
  console.log('Request index: ', result.requestIndex);
}

const options = {
  url: 'http://localhost:4444',
  maxRequests: 1000000,
  statusCallback: statusCallback,
  rps: 10000
};

loadtest.loadTest(options, function(error, result) {
  if (error) {
    return console.error('Got an error: %s', error);
  }
  console.log('Tests run successfully');
});

