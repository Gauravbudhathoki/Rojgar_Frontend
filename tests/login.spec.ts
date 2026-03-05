import { test, expect } from '@playwright/test';

test.describe('LoginPage', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  // ─── Layout & UI ───────────────────────────────────────────────

  test('1. should load login page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
  });

  test('2. should display Log In heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /log in/i });
    await expect(heading).toBeVisible();
  });

  test('3. should display email/username input field', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/enter your email or username/i);
    await expect(emailInput).toBeVisible();
  });

  test('4. should display password input field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('••••••••');
    await expect(passwordInput).toBeVisible();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('5. should display Login submit button', async ({ page }) => {
    const loginBtn = page.getByRole('button', { name: /login/i });
    await expect(loginBtn).toBeVisible();
  });

  test('6. should display Forgot Password link', async ({ page }) => {
    const forgotLink = page.getByText(/forgot password/i);
    await expect(forgotLink).toBeVisible();
  });

  test('7. should display Sign Up link', async ({ page }) => {
    const signUpLink = page.getByText(/sign up/i);
    await expect(signUpLink).toBeVisible();
  });

  test('8. should show left panel text on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const panelText = page.getByText(/connecting talent with opportunity/i);
    await expect(panelText).toBeVisible();
  });

  // ─── Password Toggle ────────────────────────────────────────────

  test('9. should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('••••••••');
    const toggleBtn = page.locator('button[type="button"]');

    await expect(passwordInput).toHaveAttribute('type', 'password');
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    await toggleBtn.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  // ─── Validation ─────────────────────────────────────────────────

  test('10. should show validation errors when submitting empty form', async ({ page }) => {
    const loginBtn = page.getByRole('button', { name: /^login$/i });
    await loginBtn.click();
    const errorMessages = page.locator('p.text-red-500');
    await expect(errorMessages.first()).toBeVisible();
  });

  test('11. should show error for invalid email format', async ({ page }) => {
    await page.getByPlaceholder(/enter your email or username/i).fill('notanemail');
    await page.getByPlaceholder('••••••••').fill('short');
    await page.getByRole('button', { name: /^login$/i }).click();
    const errorMessages = page.locator('p.text-red-500');
    await expect(errorMessages.first()).toBeVisible();
  });

  test('12. should show password error when password is too short', async ({ page }) => {
    await page.getByPlaceholder(/enter your email or username/i).fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('123');
    await page.getByRole('button', { name: /^login$/i }).click();
    const passwordError = page.locator('p.text-red-500');
    await expect(passwordError.first()).toBeVisible();
  });

  // ─── Navigation ─────────────────────────────────────────────────

  test('13. should navigate to forgot password page', async ({ page }) => {
    await page.getByText(/forgot password/i).click();
    await expect(page).toHaveURL(/forgot-password/);
  });

  test('14. should navigate to register page on Sign Up click', async ({ page }) => {
    await page.getByText(/sign up/i).click();
    await expect(page).toHaveURL(/register/);
  });

  // ─── Form Interaction ───────────────────────────────────────────

  test('15. should allow typing in email field', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/enter your email or username/i);
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('16. should allow typing in password field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('••••••••');
    await passwordInput.fill('mypassword123');
    await expect(passwordInput).toHaveValue('mypassword123');
  });

  test('17. should disable login button while submitting', async ({ page }) => {
    await page.getByPlaceholder(/enter your email or username/i).fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('Password123!');

    // Intercept API to keep loading state visible
    await page.route('**/api/auth/login', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    const loginBtn = page.getByRole('button', { name: /^login$/i });
    await loginBtn.click();
    await expect(page.getByRole('button', { name: /logging in/i })).toBeVisible();
  });

  test('18. should show Logging in... text while loading', async ({ page }) => {
    await page.getByPlaceholder(/enter your email or username/i).fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('Password123!');

    await page.route('**/api/auth/login', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.getByRole('button', { name: /^login$/i }).click();
    await expect(page.getByText(/logging in/i)).toBeVisible();
  });

  // ─── Responsive ─────────────────────────────────────────────────

  test('19. should hide left panel on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const panelText = page.getByText(/connecting talent with opportunity/i);
    await expect(panelText).toBeHidden();
  });

  test('20. should show full form on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const emailInput = page.getByPlaceholder(/enter your email or username/i);
    const passwordInput = page.getByPlaceholder('••••••••');
    const loginBtn = page.getByRole('button', { name: /^login$/i });
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginBtn).toBeVisible();
  });
});