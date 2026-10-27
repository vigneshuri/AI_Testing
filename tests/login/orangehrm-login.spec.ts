import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('accepts valid demo credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('requires both username and password', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required', { exact: true })).toHaveCount(2);
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  });

  test('requires a username when a password is provided', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  });

  test('requires a password when a username is provided', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  });

  test('rejects invalid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('invalid-user');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong-password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid credentials', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  });

  test('rejects unusually long credentials without leaving the login page', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('u'.repeat(256));
    await page.getByRole('textbox', { name: 'Password' }).fill('p'.repeat(256));
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Invalid credentials', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  });
});
