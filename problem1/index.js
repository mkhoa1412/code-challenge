var http = require('http');

var sum_to_n_a = function(n) {
  // your code here
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
};

var sum_to_n_b = function(n) {
  // your code here
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function(n) {
  // your code here
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_c(n - 1);
};

http.createServer(function (_req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(`sum_to_n_a: ${sum_to_n_a(5)}\nsum_to_n_b: ${sum_to_n_b(5)}\nsum_to_n_c: ${sum_to_n_c(5)}`);
  res.end();
}).listen(8080);