# OrangeHRM Dashboard Smoke Test Plan

## Application Overview

Validate the public OrangeHRM demo's Admin login and verify the Dashboard renders its primary widgets and Quick Launch actions. The dashboard was inspected live at https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index after signing in with the demo credentials shown on the login page. Use a fresh unauthenticated browser context; avoid assertions on volatile counts, dates, and chart values.

## Test Scenarios

### 1. OrangeHRM Dashboard

**Seed:** `seed.spec.ts`

#### 1.1. Admin can sign in and view the dashboard

**File:** `tests/dashboard/orangehrm-dashboard.spec.ts`

**Steps:**
  1. Open the OrangeHRM demo login page in a fresh browser session.
    - expect: The Login heading and Username and Password fields are visible.
  2. Enter the demo credentials displayed on the login page (Admin / admin123).
    - expect: Both credential fields accept the values.
  3. Click Login.
    - expect: The browser navigates to /web/index.php/dashboard/index.
    - expect: The page shows the Dashboard heading.
  4. Inspect the primary dashboard panels.
    - expect: Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, and Employee Distribution by Location are visible.
  5. Inspect the Quick Launch actions without activating them.
    - expect: Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, and My Timesheet are visible and available.

### 2. OrangeHRM Login

**File:** `tests/login/orangehrm-login.spec.ts`

Each scenario starts at the login page in a fresh browser context.

#### 2.1. Accepts valid demo credentials

1. Enter `Admin` and `admin123`, then click Login.
   - expect: The Dashboard page loads.

#### 2.2. Requires both username and password

1. Leave both fields empty and click Login.
   - expect: Required validation is shown for both fields and the login page remains open.

#### 2.3. Requires a username when a password is provided

1. Enter a password, leave the username empty, and click Login.
   - expect: Username required validation is shown and the login page remains open.

#### 2.4. Requires a password when a username is provided

1. Enter a username, leave the password empty, and click Login.
   - expect: Password required validation is shown and the login page remains open.

#### 2.5. Rejects invalid credentials

1. Enter an invalid username and password, then click Login.
   - expect: Invalid credentials is shown and the login page remains open.

#### 2.6. Rejects unusually long credentials

1. Enter 256-character username and password values, then click Login.
   - expect: Invalid credentials is shown and the login page remains open without an error page.
