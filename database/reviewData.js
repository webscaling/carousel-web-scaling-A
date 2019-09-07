const axios = require('axios');

for (let i = 1; i <= 105; i++) {
  axios.get('http://ec2-18-212-163-195.compute-1.amazonaws.com/itemReviews', {
    params: {
      itemID: i
    }
  })
    .then(({data}) => {
      axios.put('http://localhost:4444/seed', data)
        .then (() => {
          console.log('success');
        })
        .catch(err => {
          console.error(err);
        });

    })
    .catch(err => {
      console.error(err);
    });

}