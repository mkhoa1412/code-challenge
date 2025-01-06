// Todo: config url by environment variable

const fetcher = () =>
  fetch("https://interview.switcheo.com/prices.json").then((r) => r.json());

export default fetcher;
