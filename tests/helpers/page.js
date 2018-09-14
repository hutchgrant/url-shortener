const puppeteer = require('puppeteer');
const urlFactory = require('../factories/urlFactory');
const viewFactory = require('../factories/viewFactory');
const dailyViewFactory = require('../factories/dailyViewFactory');

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false
      // // args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function(target, property) {
        return customPage[property] || browser[property] || page[property];
      }
    });
  }

  constructor(page) {
    this.page = page;
  }

  async createShortUrl(url) {
    return Promise.all([
      await this.click('fieldset > .url-input'),
      await this.setInputValue('fieldset > .url-input', url),
      await this.click('.url-button'),
      await this.waitFor('.url-items')
    ]);
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML);
  }

  async getElement(selector) {
    return this.page.$eval(selector, el => el.outerHTML);
  }
  async getElementAttribute(selector, attr) {
    return this.page.$eval(selector, (el, attr) => el.getAttribute(attr), attr);
  }

  async setInputValue(selector, text) {
    this.page.$eval(
      selector,
      (el, text) => {
        el.value = text;
      },
      text
    );
  }

  get(path) {
    return this.page.evaluate(_path => {
      return fetch(_path, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    }, path);
  }

  post(path, data) {
    return this.page.evaluate(
      (_path, _data) => {
        return fetch(_path, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(_data)
        }).then(res => res.json());
      },
      path,
      data
    );
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return this[method](path, data);
      })
    );
  }
}

module.exports = CustomPage;
