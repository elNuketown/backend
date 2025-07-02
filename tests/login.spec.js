const { expect } = require('@playwright/test');
const { test } = require('../fixtures/customFixtures');
const loginData = require('../fixtures/loginData.json');
const { attachResponse } = require('../utils/attachResponse');
const { faker } = require('@faker-js/faker');

let fakeAccessToken = faker.string.alphanumeric(128);

test.describe('Login API', () => {
  test('Login válido', async ({ loginApi }, testInfo) => {
    const response = await loginApi.login({
      username: loginData.validLogin.login,
      password: loginData.validLogin.password,
    });

    await attachResponse(response, testInfo, 'login-valido');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.accessToken).toBeDefined();
    expect(body.refreshToken).toBeDefined();
    expect(body.username).toBe(loginData.validLogin.login);
  });

  test('Login com senha inválida', async ({ loginApi }, testInfo) => {
    const response = await loginApi.login({
      username: loginData.invalidLogin.login,
      password: loginData.invalidLogin.password,
    });

    await attachResponse(response, testInfo, 'login-senha-invalida');

    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.message).toBe('Invalid credentials');
  });

  test('Login com campos vazios', async ({ loginApi }, testInfo) => {
    const response = await loginApi.login({
      username: '',
      password: '',
    });

    await attachResponse(response, testInfo, 'login-campos-vazios');

    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(body.message).toBe('Username and password required');
  });
});

test.describe('Current Login API', () => {
  test('currentLogin válido', async ({ loginApi }, testInfo) => {
    const loginRes = await loginApi.login({
      username: loginData.validLogin.login,
      password: loginData.validLogin.password,
    });
    const token = (await loginRes.json()).accessToken;

    const response = await loginApi.currentLogin(token);

    await attachResponse(response, testInfo, 'current-login-valido');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.username).toBe(loginData.validLogin.login);
  });

  test('currentLogin sem token', async ({ loginApi }, testInfo) => {
    const response =  await loginApi.currentLogin();

    await attachResponse(response, testInfo, 'current-login-sem-token');

    expect(response.status()).toBe(401);
  });

  test('currentLogin com token inválido', async ({ loginApi }, testInfo) => {
    const response = await loginApi.currentLogin(fakeAccessToken);

    await attachResponse(response, testInfo, 'current-login-token-invalido');
     
    const body = await response.json();

    expect(response.status()).toBe(401);
    expect(body.message).toBe('Invalid/Expired Token!');
  });
});

test.describe('Refresh Token API', () => {
  test('Refresh com token válido', async ({ loginApi }, testInfo) => {
    const loginRes = await loginApi.login({
      username: loginData.validLogin.login,
      password: loginData.validLogin.password,
    });
    const body = await loginRes.json();

    const refreshRes = await loginApi.refresh({ refreshToken: body.refreshToken });

    await attachResponse(refreshRes, testInfo, 'refresh-token-valido');

    expect(refreshRes.status()).toBe(200);
    const refreshBody = await refreshRes.json();
    expect(refreshBody.token).not.toBe(body.refreshToken);
  });

  test('Refresh com token inválido', async ({ loginApi }, testInfo) => {
    const response = await loginApi.refresh({ refreshToken: fakeAccessToken });

    await attachResponse(response, testInfo, 'refresh-token-invalido');

    const body = await response.json();
    expect(response.status()).toBe(403);
    expect(body.message).toBe('Invalid refresh token');
  });

  test('Refresh sem token', async ({ loginApi }, testInfo) => {
    const response = await loginApi.refresh({});

    await attachResponse(response, testInfo, 'refresh-sem-token');

    const body = await response.json();
    expect(response.status()).toBe(401);
    expect(body.message).toBe('Refresh token required');
  });
});