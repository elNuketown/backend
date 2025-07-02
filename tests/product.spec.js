const { expect } = require('@playwright/test');
const { test } = require('../fixtures/customFixtures');
const productsData = require('../fixtures/productsData.json');
const { attachResponse } = require('../utils/attachResponse');

test.describe('API Products', () => {
  test('GET lista de produtos', async ({ productsApi }, testInfo) => {
    const res = await productsApi.list();
    await attachResponse(res, testInfo, 'get-lista-produtos');

    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('application/json');

    const body = await res.json();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST cria produto', async ({ productsApi }, testInfo) => {
    const res = await productsApi.add(productsData.validProduct);
    await attachResponse(res, testInfo, 'post-produto-valido');

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toMatchObject(productsData.validProduct);
    expect(typeof body.id).toBe('number');
  });

  test('PUT atualiza produto', async ({ productsApi }, testInfo) => {
    const res = await productsApi.update(1, productsData.updatedProduct);
    await attachResponse(res, testInfo, 'put-produto-1');

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.price).toBe(productsData.updatedProduct.price);
  });

  test('DELETE remove produto', async ({ productsApi }, testInfo) => {
    const res = await productsApi.remove(1);
    await attachResponse(res, testInfo, 'delete-produto-1');

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
  });

  test('GET produto inexistente', async ({ productsApi }, testInfo) => {
    const res = await productsApi.request.get('/products/9999');
    await attachResponse(res, testInfo, 'get-produto-inexistente');

    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body).toHaveProperty('message');
  });

  // Skip porque DummyJSON sempre retorna 201
  test.skip('POST preço negativo', async ({ productsApi }, testInfo) => {
    const res = await productsApi.add(productsData.invalidNegativePrice);
    await attachResponse(res, testInfo, 'post-preco-negativo');
    expect(res.status()).toBe(400);
  });

  test('PUT em ID inexistente', async ({ productsApi }, testInfo) => {
    const res = await productsApi.update(9999, productsData.updatedProduct);
    await attachResponse(res, testInfo, 'put-id-inexistente');
    expect(res.status()).toBe(404);
  });

  test('DELETE em ID inexistente', async ({ productsApi }, testInfo) => {
    const res = await productsApi.remove(9999);
    await attachResponse(res, testInfo, 'delete-id-inexistente');
    expect(res.status()).toBe(404);
  });
});