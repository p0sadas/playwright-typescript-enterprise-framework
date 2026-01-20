import { test, expect } from "../../fixtures/fixtures";
import { enviroments } from "../../config/enviroments";
import users from "../../data/users.json";
test("@api @smoke valid user can login via api", async ({ request }) => {
  const response = await request.post(enviroments.dev.apiURL + "/verifyLogin", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: `email=${users.validUser.email}&password=${users.validUser.password}`,
  });
  // check response code is 200
  expect(response.status()).toBe(200);
  const data = await response.json();
  // check response message is User exists!
  expect(data.message).toBe("User exists!");
});
test("@api @regression invalid login returns 404", async ({ request }) => {
  const response = await request.post(enviroments.dev.apiURL + "/verifyLogin", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: `email=${users.invalidUser.email}&password=${users.invalidUser.password}`,
  });

  const data = await response.json();
  // check response code is 404
  expect(data.responseCode).toBe(404);
  // check response message is User not found!
  expect(data.message).toBe("User not found!");
});
