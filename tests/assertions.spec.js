import {test, expect} from '@playwright/test';

//describe - bl
test.describe("Learn assertions @assertion_group", ()=>{ 
    test('Verify web page behaviour', async ({page})=>{
        await page.goto('https://the-internet.herokuapp.com/');

        //1. to have URL
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/');



        //2. to have title
        await expect(page).toHaveTitle('The Internet');
    })

    test('Continue with assertations @smoke', async ({page})=>{
        await page.goto('https://the-internet.herokuapp.com/');
        //3. assert visibility
        await expect(page.locator('h1')).toBeVisible();

        //4. assert element to have text (exact match)

        await expect(page.locator('h2')).toHaveText('Available Examples');


        //5. assert contains text (partial match)
        await expect(page.locator('body')).toContainText('WYSIWYG'); //check entire page body for the text

        
    })

    test('Continue', async ({page})=>{
        await page.goto('https://the-internet.herokuapp.com/');
        
        //6 assert count
        await expect(page.locator('a')).toHaveCount(46);

        //7. to be checked
        await page.goto('https://the-internet.herokuapp.com/checkboxes');

        // await page.waitForTimeout(1000);
        // await page.waitForLoadState('networkidle')

        let checkbox =  await page.getByRole('checkbox').nth(0);
        await checkbox.waitFor();

        await page.getByRole('checkbox').nth(0).check();
        await page.getByRole('checkbox').nth(1).uncheck();
        
        await expect(page.getByRole('checkbox').nth(0)).toBeChecked();

        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked();


    })

    
    test("continue part 3", async ({page})=>{

        //8. check input value
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByLabel('username').fill('tomsmith');
        await expect(page.getByLabel('username')).toHaveValue('tomsmith');
        const value = await page.locator('#username').inputValue();
        await expect(value).not.toBeNull();

        //9. is enabled
        await expect(page.locator('button[type="submit"]')).toBeEnabled();
        // await expect(page.locator('button[type="submit"]')).toBeDisabled();


            
    })
    test("continue part 4", async ({page})=>{

        //10. verify text from variable matches
        await page.goto('https://the-internet.herokuapp.com/');
        const headerText = await page.locator('h1').textContent();
        const headerText1 = /Welcome to the-internet/i;

        expect(headerText).toBe('Welcome to the-internet');

        await expect(page.locator('h1')).toHaveText(headerText1);

    })



})