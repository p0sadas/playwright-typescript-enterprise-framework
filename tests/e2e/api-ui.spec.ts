import { test, expect } from "../../fixtures/fixtures";
import { enviroments } from "../../config/enviroments";
import users from "../../data/users.json";
test("@api @regression login with api and validate in ui ", async ({
  browser,
  request,
}) => {
  const loginPageHTML = await request.get(`${enviroments.dev.baseURL}/login`);
  const html = await loginPageHTML.text();
  //console.log(html);
  const csrfmiddlewaretoken: string =
    html.match(/name="csrfmiddlewaretoken" value="(.+?)"/)?.[1] || "";
  console.log(csrfmiddlewaretoken);
  expect(csrfmiddlewaretoken).not.toBeNull();
  const response = await request.post(`${enviroments.dev.baseURL}/login`, {
    headers: {
      Referer: `${enviroments.dev.baseURL}/`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      csrfmiddlewaretoken: csrfmiddlewaretoken,
      email: users.validUser.email,
      password: users.validUser.password,
    },
  });
  // check response code is 200
  expect(response.status()).toBe(200);
  //create context with login
  const context = await browser.newContext({
    storageState: await request.storageState(),
  });
  //create page with login
  const pageWithLogin = await context.newPage();
  //navigate to home page
  await pageWithLogin.goto(`${enviroments.dev.baseURL}`);
  //check if user is logged in
  await expect(pageWithLogin.getByText("Logged in as")).toBeVisible();
});
