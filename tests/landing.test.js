const Page = require('./helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('Form displays correctly', async () => {
  const text = await page.getElementAttribute(
    'fieldset > .url-input',
    'placeholder'
  );
  expect(text).toEqual('http://www.yoursite.com');
});

test('Form validates when input does not include http://', async () => {
  await page.setInputValue('fieldset > .url-input', 'testing123');
  await page.click('.url-button');
  const text = await page.getContentsOf('.text-danger');
  expect(text).toEqual('You must enter a valid url e.g. http://whatever.com');
});

test('Form submits and reinitializes when input does include http://', async () => {
  await page.setInputValue('fieldset > .url-input', 'http://www.cbc.ca');
  await page.click('.url-button');
  const text = await page.getElementAttribute('fieldset > .url-input', 'value');
  expect(text).toEqual('');
});

test('Form submits and displays result below it', async () => {
  const url = 'http://www.cbc.ca';
  await page.click('fieldset > .url-input');
  await page.setInputValue('fieldset > .url-input', url);
  await page.click('.url-button');
  await page.waitFor('.url-items');
  text = await page.getContentsOf('.url-item');
  let longUrl = text.substr(3, 17);
  expect(longUrl).toEqual(url);
});
