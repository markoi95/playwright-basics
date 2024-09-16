import { test, expect } from "@playwright/test";
import { chromium } from "playwright";

//browser => context => page/tabs

let browser;
let context;
let page;

test.describe("Describe block for hooks", async () => {
  test.beforeAll(async () => {
    //launch browser, in this case chromium, before all tests
    browser = await chromium.launch({headless:true});
    console.log("BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER");
  });

  test.beforeEach(async () => {
    //create context which can be different for every test
    context = await browser.newContext();

    //create new page
    page = await browser.newPage();

    //navigate to test URL
    await page.goto("https://the-internet.herokuapp.com/");

    //pause execution
    console.log("BEFORE EACH HOOK LAUNCHED NEW PAGE");
    await page.pause();
  });

  test.afterEach(async () => {
    //close page and context

    await context.close();
    console.log("AFTER EACH HOOK CLOSE PAGE");
  });

  test.afterAll(async () => {
    //close browser
    await browser.close();
    console.log("AFTER ALL HOOK CLOSE BROWSER");
  });
  test("A/B Test", async () => {
    await page.click('text="A/B Testing"');
    const header = await page.textContent("h3");
    expect(header).toBe("A/B Test Control");
  });

  test("Checkbox verification", async () => {
    await page.click('text="Checkboxes"');
    const checkbox = await page.isChecked('input[type="checkbox"]:first-child');
    expect(checkbox).toBe(false);
  });

  test("Geolocation setting in context and verification", async () => {
    //first I need to override context set in beforeEach hook
    context = await browser.newContext({
      permissions: ["geolocation"],
      geolocation: { latitude: 37.774929, longitude: -122.419416 },
      viewport: { width: 1280, height: 720 },
    });
    page = await context.newPage();
    console.log(
      "USING CONTEXT AND PAGE CREATE WITHING TEST AND NOT WITHIN HOOKS"
    );

    //navigate to test URL
    await page.goto("https://the-internet.herokuapp.com/geolocation");
    await page.click("button");
    const lat = await page.textContent("#lat-value");
    const long = await page.textContent("#long-value");
    expect(parseFloat(lat)).toBeCloseTo(37.774929);
    expect(parseFloat(long)).toBeCloseTo(-122.419416);

  });
});
