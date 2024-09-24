import {test, expect} from '@playwright/test'
import LoginPage from '../pages/LoginPage.js'
import PomManager from '../pages/PomManager.js';

let pm;

test.describe('Login tests', ()=>{

    test.beforeEach(async ({page}) => {
        pm = new PomManager(page)
    })

    test.afterEach(async ({page}) => {
        await page.close()
        
    })
    
    test('Login with valid credentials', async () => {
        await pm.loginPage.navigate()
        await pm.loginPage.login('tomsmith', 'SuperSecretPassword!')
        await pm.securePage.assertLoggedInMessage('You logged into a secure area!')
        
        // Assert value directly in test
        const message = await pm.securePage.getMessage()
        expect(message).toContain('You logged into a secure area!')
    })

    test('Login with invalid credentials', async () => {
        await pm.loginPage.navigate();
        await pm.loginPage.login('invalidUser', 'SuperSecretPassword!')
        await pm.loginPage.assertErrorMessage('Your username is invalid!')
    })
})

test.describe('Checkbox tests', () => {
    test.beforeEach(async ({page}) => {
        pm = new PomManager(page)
    })

    test.afterEach(async ({page}) => {
        await page.close() 
    })

    test('Checkbox is checked', async () => {
        await pm.checkboxPage.navigate()
        await pm.checkboxPage.checkCheckbox(1)
        await pm.checkboxPage.assertCheckbox(1, true)

        await pm.checkboxPage.navigate()
        await pm.checkboxPage.checkCheckbox(2)
        await pm.checkboxPage.assertCheckbox(2, false)
        
    })
})