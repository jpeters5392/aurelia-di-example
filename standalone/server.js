var express = require('express');
var app = express();

app.use(express.static('.'));

app.get('/commits', function (req, res) {
  const commits = [
    {
      id: 1,
      title: 'First commit ever',
      committer: 'joel.peterson@ilmservice.com'
    }, {
      id: 2,
      title: 'Update text file',
      committer: 'joel.peterson@ilmservice.com'
    }, {
      id: 3,
      title: 'Oops',
      committer: 'joel.peterson@ilmservice.com'
    }
  ];
  res.set('Content-Type', 'application/json');
  res.send(commits);
});

app.get('/user', function (req, res) {
  const user = {
      firstName: 'Joel',
      lastName: 'Peterson',
      email: 'joel.peterson@ilmservice.com'
  };
  res.set('Content-Type', 'application/json');
  res.send(user);
});

app.get('/otherUser', function (req, res) {
  const user = {
      firstName: 'Generic',
      lastName: 'User',
      email: 'generic.user@ilmservice.com'
  };
  res.set('Content-Type', 'application/json');
  res.send(user);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})