import { expect, Locator, Page } from "@playwright/test"

export class LoginPage {
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly loginForm: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
        this.loginForm = page.locator('#login_form')
    }

    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
        await this.page.goBack()
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText(
            'Login and/or password are wrong.'
        )
    }

    async snapshotLoginForm() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
    }

    async snapshotErrorMessage() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot("login-error.png")
    }
}