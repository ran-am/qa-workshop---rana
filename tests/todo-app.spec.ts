import { test, expect } from '@playwright/test'

test('todo list renders items from API', async ({ page }) => {
  await page.goto('/')

  const todoList = page.getByTestId('todo-list')
  await expect(todoList).toBeVisible()

  const checkboxes = page.locator('[data-testid^="todo-checkbox-"]')
  await expect(checkboxes.first()).toBeVisible()
})
