const { test: base, request } = require('@playwright/test');
const { ProductsAPI } = require('../apis/Api');

const test = base.extend({
  productsApi: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: 'https://dummyjson.com',
    });
    await use(new ProductsAPI(apiContext));
    await apiContext.dispose();
  },
});

module.exports = { test };