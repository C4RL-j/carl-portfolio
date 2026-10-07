import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

async function runCommand(page: Page, command: string) {
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await input.fill(command);
  await input.press("Enter");
  await expect(input).toHaveValue("");
}

async function openPalette(page: Page, shortcut = "Control+k") {
  await page.keyboard.press(shortcut);
  const palette = page.getByRole("dialog", { name: "Jump somewhere" });
  await expect(palette).toBeVisible();
  await expect(palette.getByRole("combobox", { name: "Search site commands" })).toBeFocused();
  return palette;
}

async function expectSectionAtTop(page: Page, id: string) {
  await expect.poll(async () => {
    const bounds = await page.locator(`#${id}`).boundingBox();
    return Math.abs(bounds?.y ?? Infinity);
  }).toBeLessThan(180);
}

async function expectFocusInside(dialog: Locator, page: Page) {
  // Check the actual active element, rather than merely whether background
  // buttons still exist. A modal must keep keyboard focus in its content.
  for (const key of ["Tab", "Tab", "Shift+Tab", "Shift+Tab"]) {
    await page.keyboard.press(key);
    await expect.poll(() => dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("I build tools for the little things that annoy me.");
});

test("the Lab terminal runs every supported command and clears its output", async ({ page }) => {
  const terminal = page.getByRole("region", { name: "Interactive Lab terminal" });
  const input = terminal.getByRole("textbox", { name: "Terminal command" });
  const log = terminal.getByRole("log");

  await terminal.locator(".terminal-titlebar").click();
  await expect(input).toBeFocused();

  await runCommand(page, "help");
  for (const command of ["help", "whoami", "projects", "now", "stack", "clear"]) {
    await expect(log.locator("pre").last()).toContainText(command);
  }

  const commands = [
    ["whoami", 'Carl\nBuilder.\nEditor.\nPC tinkerer.\nProfessional "what if I made my own version?" person.'],
    ["projects", "LitePlay\nEditFlow\nD2 Controller Center\n+ several experiments that escaped containment."],
    ["now", "Building lightweight software.\nThinking about seamless sync.\nProbably changing a UI detail nobody else noticed."],
    ["stack", "Python\nPySide6\nTypeScript\nGit\nPowerShell\nVS Code\nCapCut\nCuriosity"],
  ];

  for (const [command, response] of commands) {
    await runCommand(page, command);
    await expect(log.locator("pre").last()).toHaveText(response);
  }

  await runCommand(page, "not-a-command");
  await expect(log.locator("pre").last()).toContainText("Command not found: not-a-command");
  await runCommand(page, "clear");
  await expect(log).toBeEmpty();
  await expect(input).toBeFocused();
});

test("terminal history moves both ways and restores an unfinished draft", async ({ page }) => {
  const input = page.getByRole("textbox", { name: "Terminal command" });
  await runCommand(page, "whoami");
  await runCommand(page, "projects");
  await input.fill("unfinished draft");

  await input.press("ArrowUp");
  await expect(input).toHaveValue("projects");
  await input.press("ArrowUp");
  await expect(input).toHaveValue("whoami");
  await input.press("ArrowUp");
  await expect(input).toHaveValue("whoami");
  await input.press("ArrowDown");
  await expect(input).toHaveValue("projects");
  await input.press("ArrowDown");
  await expect(input).toHaveValue("unfinished draft");
  await input.press("ArrowDown");
  await expect(input).toHaveValue("unfinished draft");
});

for (const shortcut of ["Control+k", "Meta+k"]) {
  test(`${shortcut} opens the command palette; Escape closes and restores focus`, async ({ page }) => {
    const trigger = page.getByRole("button", { name: "Open command palette, Control or Command K" });
    await trigger.focus();
    const palette = await openPalette(page, shortcut);
    await expect(palette.getByRole("option")).toHaveCount(6);
    await page.keyboard.press("Escape");
    await expect(palette).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
}

test("palette arrow navigation wraps, filters keywords, and handles empty results", async ({ page }) => {
  const palette = await openPalette(page);
  const input = palette.getByRole("combobox", { name: "Search site commands" });
  await expect(palette.getByRole("option", { name: /Go to Projects/ })).toHaveAttribute("aria-selected", "true");
  await input.press("ArrowUp");
  await expect(palette.getByRole("option", { name: /Back to Top/ })).toHaveAttribute("aria-selected", "true");
  await input.press("ArrowDown");
  await expect(palette.getByRole("option", { name: /Go to Projects/ })).toHaveAttribute("aria-selected", "true");
  await input.press("ArrowDown");
  await expect(palette.getByRole("option", { name: /Go to Lab/ })).toHaveAttribute("aria-selected", "true");

  await input.fill("python");
  await expect(palette.getByRole("option")).toHaveCount(1);
  await expect(palette.getByRole("option", { name: /Go to Stack/ })).toBeVisible();
  await input.fill("there-is-no-such-command");
  await expect(palette.getByRole("option")).toHaveCount(0);
  await expect(palette.getByRole("status")).toContainText("No commands found");
  await input.press("Enter");
  await expect(palette).toBeVisible();
  await input.fill("lab");
  await input.press("Enter");
  await expect(palette).not.toBeVisible();
  await expectSectionAtTop(page, "lab");
});

test("every palette destination works, including terminal focus and back to top", async ({ page }) => {
  for (const id of ["projects", "lab", "about", "stack"]) {
    const palette = await openPalette(page);
    const input = palette.getByRole("combobox", { name: "Search site commands" });
    await input.fill(`Go to ${id}`);
    await expect(palette.getByRole("option")).toHaveCount(1);
    await input.press("Enter");
    await expect(palette).not.toBeVisible();
    await expectSectionAtTop(page, id);
  }

  let palette = await openPalette(page);
  let input = palette.getByRole("combobox", { name: "Search site commands" });
  await input.fill("Open Terminal");
  await input.press("Enter");
  await expect(palette).not.toBeVisible();
  await expect(page.getByRole("textbox", { name: "Terminal command" })).toBeFocused();
  await expectSectionAtTop(page, "lab");

  palette = await openPalette(page);
  input = palette.getByRole("combobox", { name: "Search site commands" });
  await input.fill("Back to Top");
  await input.press("Enter");
  await expect(palette).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(3);
});

for (const project of ["LitePlay", "EditFlow", "D2 Controller Center"]) {
  test(`${project} details support keyboard opening, focus containment, and Escape`, async ({ page }) => {
    const trigger = page.getByRole("button", { name: new RegExp(`^Explore ${project}:`) });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: project, exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Design goals" })).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "What started it" })).toBeVisible();
    await expectFocusInside(dialog, page);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
}

test("system info reveals the workshop details and its close button restores focus", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "system info", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "CARL.OS", exact: true });
  await expect(dialog).toBeVisible();
  for (const value of ["Building", "Windows", "curiosity.exe", "too many", "unknown"]) {
    await expect(dialog.getByText(value, { exact: true })).toBeVisible();
  }
  await dialog.getByRole("button", { name: "Close CARL.OS" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("project dialogs close on backdrop click and do not stack with the palette", async ({ page }) => {
  const trigger = page.getByRole("button", { name: /^Explore LitePlay:/ });
  await trigger.click();
  const project = page.getByRole("dialog", { name: "LitePlay", exact: true });
  await expect(project).toBeVisible();
  await page.keyboard.press("Control+k");
  await expect(project).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Jump somewhere" })).not.toBeVisible();
  await page.mouse.click(5, 5);
  await expect(project).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("the Konami Easter egg appears temporarily and ignores typing in the terminal", async ({ page }) => {
  await page.clock.install();
  const keys = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  for (const key of keys) await page.keyboard.press(key);
  const message = page.getByRole("status").filter({ hasText: "Developer mode unlocked." });
  await expect(message).toContainText("Nothing changed. You were already in developer mode.");
  await page.clock.fastForward(6_000);
  await expect(message).not.toBeVisible();
  await page.getByRole("textbox", { name: "Terminal command" }).focus();
  for (const key of keys) await page.keyboard.press(key);
  await expect(message).not.toBeVisible();
});

test("mobile navigation opens, navigates, and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const toggle = page.locator("#mobile-menu-toggle");
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu).not.toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "About", exact: true }).click();
  await expect(menu).not.toBeVisible();
  await expectSectionAtTop(page, "about");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
});

for (const width of [375, 768, 1920]) {
  test(`the page has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1080 });
    await page.evaluate(() => document.fonts.ready);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport + 1);
    await expect(page.getByRole("textbox", { name: "Terminal command" })).toBeVisible();
  });
}

test("unconfigured contact details produce no fake or empty links", async ({ page }) => {
  await expect(page.locator("#contact a")).toHaveCount(0);
  await expect(page.locator('a[href="#"], a[href=""], a:not([href])')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});

test("reduced motion disables decorative animation and smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const motion = await page.evaluate(() => {
    const moving = Array.from(document.querySelectorAll("*"))
      .filter((element) => {
        const style = getComputedStyle(element);
        const animation = style.animationName !== "none" && style.animationDuration.split(",").some((duration) => parseFloat(duration) > 0.02);
        const transition = style.transitionDuration.split(",").some((duration) => parseFloat(duration) > 0.02);
        return animation || transition;
      })
      .map((element) => `${element.tagName}.${element.className}`);
    return { moving, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior };
  });
  expect(motion.moving).toEqual([]);
  expect(motion.scrollBehavior).toBe("auto");
  const palette = await openPalette(page);
  await palette.getByRole("combobox").fill("terminal");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("textbox", { name: "Terminal command" })).toBeFocused();
});

test("the page meets automated WCAG checks", async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
});

test("project details and command palette meet automated WCAG checks", async ({ page }) => {
  await page.getByRole("button", { name: /^Explore LitePlay:/ }).click();
  await expect(page.getByRole("dialog", { name: "LitePlay", exact: true })).toBeVisible();
  const projectResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(projectResults.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await openPalette(page);
  const paletteResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(paletteResults.violations).toEqual([]);
});
