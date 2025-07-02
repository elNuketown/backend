const { test: base, request } = require('@playwright/test');
const { ProductsAPI } = require('../apis/productsAPI');
const { LoginAPI } = require('../apis/loginAPI');

const createApiFixture = (ApiClass) => async ({}, use) => {
  const apiContext = await request.newContext({ baseURL: 'https://dummyjson.com' });
  await use(new ApiClass(apiContext));
  await apiContext.dispose();
};

const test = base.extend({
  productsApi: createApiFixture(ProductsAPI),
  loginApi: createApiFixture(LoginAPI),
});

module.exports = { test };