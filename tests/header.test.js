const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('the header brand has the correct text', async () => {
  const text = await page.getContentsOf('a.navbar-brand');
  expect(text).toEqual('URL-Shortener');
});

test('clicking the header brand loads the landing page', async () => {
  await page.click('a[href="/');
  const url = await page.url();
  expect(url).toMatch(/\//);
});
