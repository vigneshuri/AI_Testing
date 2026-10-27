// spec: specs/orangehrm-dashboard.plan.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Dashboard', () => {
  test('Admin can sign in and view the dashboard', async ({ page }) => {
    // 1. Open the OrangeHRM demo login page in a fresh browser session.
    await page.goto('/web/index.php/auth/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();

    // 2. Enter the demo credentials displayed on the login page.
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

    // 3. Sign in and verify the Dashboard page.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // 4. Verify the primary dashboard panels are visible.
    for (const panel of [
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub Unit',
      'Employee Distribution by Location',
    ]) {
      await expect(page.getByText(panel, { exact: true })).toBeVisible();
    }

    // 5. Verify the Quick Launch actions are available without activating them.
    for (const action of [
      'Assign Leave',
      'Leave List',
      'Timesheets',
      'Apply Leave',
      'My Leave',
      'My Timesheet',
    ]) {
      await expect(page.getByRole('button', { name: action })).toBeVisible();
    }
  });
});
