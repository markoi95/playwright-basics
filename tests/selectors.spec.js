import {test, expect} from'@playwright/test'

test("Learning selectors", async ({page})=>{
    //navigate to the webpage
    await page.goto('http://127.0.0.1:5500/clickMe.html');

    // 1. Selecting by ID
    await page.locator('#clickButton').click();
    
    //2. Selecting by class
    await page.locator('.button-style').click();

    //3.Selecting by tag and Class
    await page.locator('button.button-style').click();

    //4. By Attribute value
    await page.locator('[data-action="increment"]').click();
    //await page.locator('[id="clickButton"]').click();         moze bilo koji atribut
    //await page.locator('[class="button-style"]').click();

    //5. Partial attribute
    await page.locator('[role*="but"]').click();

    //6. By text content
    await page.locator('text=CLICK ME').click();

    //7. Combine selectors for precision: class and text - exact text match
    await page.locator('.button-style:text("CLICK ME")').click();

    //8. Contains text -> has-text
    await page.locator('button:has-text("clic")').click();

    //9. Attribute and text combination
    await page.locator('[data-action="increment"]:text("CLICK ME")').click();

    //10. get by text pw way
    await page.getByText('CLICK ME').click();

    //11. By role - tag not the role attribute
    await page.getByRole('button',{name:/click me/i}).click();

    //assert the counter
    await expect(page.locator('#counter')).toContainText('11');


    await page.pause()

})