const { expect } = require('@playwright/test');

async function attachResponse(res, testInfo, label = 'response') {
  await testInfo.attach(`${label}-meta`, {
    body: JSON.stringify(
      {
        url: res.url(),
        status: res.status(),
        headers: res.headers()
      },
      null,
      2
    ),
    contentType: 'application/json'
  });
  const body = await res.text();
  await testInfo.attach(`${label}-body`, {
    body: body.length > 1_000_000 ? body.slice(0, 1_000_000) + '…(truncated)' : body,
    contentType: res.headers()['content-type'] ?? 'text/plain'
  });
}

module.exports = { attachResponse };