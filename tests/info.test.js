const Page = require('./helpers/page');

let page;
const domain = 'http://localhost:3000';
let shortUrl = '';
let url = 'https://www.cbc.ca';

beforeEach(async () => {
  page = await Page.build();
  await page.goto(domain);
});

afterEach(async () => {
  await page.close();
});

test('after creating short url, selecting short url loads correct redirect url', async () => {
  await page.createShortUrl(url);
  shortUrl = await page.getContentsOf('.url-item > p > a');
  await page.click('.url-item > p > a');
  fetchUrl = await page.url();
  expect(fetchUrl).toMatch(shortUrl);
});

test('after creating short url, selecting short url loads correct redirect url', async () => {
  await page.goto(shortUrl);
  await page.waitFor('.appContainer');
  let fetchUrl = await page.url();
  expect(fetchUrl).toMatch(url);
});
