import { test, expect } from "../../fixtures/fixtures";
import { enviroments } from "../../config/enviroments";

test("@api @smoke user can get all products via api", async ({ request }) => {
  const response = await request.get(enviroments.dev.apiURL + "/productsList");
  expect(await response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.products.length).toBeGreaterThan(0);
});

test("@api @regression products response under 1s", async ({ request }) => {
  const startTime = Date.now();
  const response = await request.get(enviroments.dev.apiURL + "/productsList");
  const endTime = Date.now() - startTime;
  expect(await response.ok()).toBeTruthy();
  expect(endTime).toBeLessThan(1000);
});
