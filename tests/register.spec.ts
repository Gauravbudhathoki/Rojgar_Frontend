import { test, expect } from '@playwright/test';

test.describe('RegisterPage', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('1. should load register page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/register/);
  });

  test('2. should display REGISTER heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /register/i });
    await expect(heading).toBeVisible();
  });

  test('3. should display username input field', async ({ page }) => {
    const usernameInput = page.getByPlaceholder(/enter your username/i);
    await expect(usernameInput).toBeVisible();
  });

  test('4. should display email input field', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/enter your email/i);
    await expect(emailInput).toBeVisible();
  });

  test('5. should display password input field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder(/enter your password/i);
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('6. should display confirm password input field', async ({ page }) => {
    const confirmInput = page.getByPlaceholder(/confirm your password/i);
    await expect(confirmInput).toBeVisible();
    await expect(confirmInput).toHaveAttribute('type', 'password');
  });

  test('7. should display Sign Up button', async ({ page }) => {
    const signUpBtn = page.getByRole('button', { name: /sign up/i });
    await expect(signUpBtn).toBeVisible();
  });

  test('8. should display Already have an account text', async ({ page }) => {
    const text = page.getByText(/already have an account/i);
    await expect(text).toBeVisible();
  });

  test('9. should display Login link', async ({ page }) => {
    const loginLink = page.getByText('Login', { exact: true });
    await expect(loginLink).toBeVisible();
  });

  test('10. should show right panel text on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const panelText = page.getByText(/hire smarter. work better./i);
    await expect(panelText).toBeVisible();
  });

  test('11. should hide right panel on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const panelText = page.getByText(/hire smarter. work better./i);
    await expect(panelText).toBeHidden();
  });

  test('12. should allow typing in username field', async ({ page }) => {
    const usernameInput = page.getByPlaceholder(/enter your username/i);
    await usernameInput.fill('testuser');
    await expect(usernameInput).toHaveValue('testuser');
  });

  test('13. should allow typing in email field', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/enter your email/i);
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('14. should allow typing in password field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder(/enter your password/i);
    await passwordInput.fill('Password123!');
    await expect(passwordInput).toHaveValue('Password123!');
  });

  test('15. should allow typing in confirm password field', async ({ page }) => {
    const confirmInput = page.getByPlaceholder(/confirm your password/i);
    await confirmInput.fill('Password123!');
    await expect(confirmInput).toHaveValue('Password123!');
  });

  test('16. should show validation errors on empty form submit', async ({ page }) => {
    await page.getByRole('button', { name: /^sign up$/i }).click();
    const usernameError = page.getByText(/at least 2 characters/i);
    await expect(usernameError).toBeVisible();
  });

  

  test('18. should show error when passwords do not match', async ({ page }) => {
    await page.getByPlaceholder(/enter your username/i).fill('testuser');
    await page.getByPlaceholder(/enter your email/i).fill('test@example.com');
    await page.getByPlaceholder(/enter your password/i).fill('Password123!');
    await page.getByPlaceholder(/confirm your password/i).fill('DifferentPass123!');
    await page.getByRole('button', { name: /^sign up$/i }).click();
    const matchError = page.getByText(/passwords don't match/i);
    await expect(matchError).toBeVisible();
  });

  test('19. should show error when password is too short', async ({ page }) => {
    await page.getByPlaceholder(/enter your username/i).fill('testuser');
    await page.getByPlaceholder(/enter your email/i).fill('test@example.com');
    await page.getByPlaceholder(/enter your password/i).fill('123');
    await page.getByPlaceholder(/confirm your password/i).fill('123');
    await page.getByRole('button', { name: /^sign up$/i }).click();
    const passwordError = page.getByText(/at least 6 characters/i);
    await expect(passwordError).toBeVisible();
  });

  test('20. should show Signing up... text while loading', async ({ page }) => {
    await page.getByPlaceholder(/enter your username/i).fill('testuser');
    await page.getByPlaceholder(/enter your email/i).fill('test@example.com');
    await page.getByPlaceholder(/enter your password/i).fill('Password123!');
    await page.getByPlaceholder(/confirm your password/i).fill('Password123!');

    await page.route('**/api/auth/register', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.getByRole('button', { name: /^sign up$/i }).click();
    await expect(page.getByText(/signing up/i)).toBeVisible();
  });

  test('21. should disable Sign Up button while loading', async ({ page }) => {
    await page.getByPlaceholder(/enter your username/i).fill('testuser');
    await page.getByPlaceholder(/enter your email/i).fill('test@example.com');
    await page.getByPlaceholder(/enter your password/i).fill('Password123!');
    await page.getByPlaceholder(/confirm your password/i).fill('Password123!');

    await page.route('**/api/auth/register', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.getByRole('button', { name: /^sign up$/i }).click();
    const btn = page.getByRole('button', { name: /signing up/i });
    await expect(btn).toBeDisabled();
  });

  test('22. should navigate to login page on Login link click', async ({ page }) => {
    await page.getByText('Login', { exact: true }).click();
    await expect(page).toHaveURL(/login/);
  });

  test('23. should show full form on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.getByPlaceholder(/enter your username/i)).toBeVisible();
    await expect(page.getByPlaceholder(/enter your email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/enter your password/i)).toBeVisible();
    await expect(page.getByPlaceholder(/confirm your password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /^sign up$/i })).toBeVisible();
  });
});