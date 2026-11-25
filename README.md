# AutoScroll (Manifest V3)

Extension for Google Chrome and Chromium-based browsers that adds **Firefox-style autoscrolling** (middle-click or `Ctrl`/`⌘` + left-click), ideal for **Linux** and **macOS**, where this native feature is typically unavailable.

This is a **Manifest V3** port based on the original [Pauan/AutoScroll](https://github.com/Pauan/AutoScroll) extension (whose Manifest V2 package is no longer supported on the Chrome Web Store).

## Installation in Chrome (Developer Mode)

1. Download or clone this repository to your computer.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable the **Developer mode** toggle in the top-right corner.
4. Click **Load unpacked**.
5. Select the root folder of this project (where `manifest.json` is located).

## How to Use

- **Middle-click** (or **`Ctrl`/`⌘` + left-click**) on any free area of a webpage.
- An anchor icon will appear where you clicked, and the cursor will indicate the scroll direction as you move the mouse.
- The further you move the mouse away from the anchor, the faster the page scrolls.
- To stop, click again (in *sticky* mode) or release the mouse button (if holding while dragging).

## Configurable Options

You can open the options page (currently localized in `pt-BR`) by right-clicking the extension icon → **Options** (or in `chrome://extensions` → **Details** → **Extension options**).

| Category | Option | Default | Description |
|---|---|---|---|
| **Basic** | Scroll without holding the button (`stickyScroll`) | On | Keeps scrolling active after clicking and releasing the mouse button. |
| **Basic** | Drag threshold (`dragThreshold`) | `10` px | Maximum click movement distance to trigger *sticky* mode upon releasing the button. |
| **Basic** | Move threshold (`moveThreshold`) | `10` px | Minimum distance from the anchor required to start scrolling. |
| **Basic** | Activate with middle click (`middleClick`) | On | Allows starting autoscroll with the middle mouse button. |
| **Basic** | Activate with Ctrl/⌘ + left click (`ctrlClick`) | On | Allows starting autoscroll by holding `Ctrl` (Linux/Windows) or `⌘` (macOS) + left-click. |
| **Speed** | Move speed (`moveSpeed`) | `10` | Scroll speed divisor (lower values scroll faster). |
| **Speed** | Constant speed (`sameSpeed`) | Off | Ignores mouse distance and always scrolls at a constant speed. |
| **Speed** | Speed cap (`shouldCap` / `capSpeed`) | Off | Caps the maximum scroll speed in pixels per frame. |
| **Advanced** | Scroll inner elements (`innerScroll`) | On | Scrolls inner containers with their own scrollbars (`overflow: auto`/`scroll`). |
| **Advanced** | Activate on links and text fields (`scrollOnLinks`) | Off | Allows starting autoscroll when clicking on links, `textarea`, and `input` elements. |

## Differences from the Original Extension (v4.10)

- **Manifest V3:** full update of `manifest.json` to Chrome's current MV3 specification (`options_ui`, object-format `web_accessible_resources`, and removal of the legacy `main.js` migration script).
- **Eval-free options page in `pt-BR`:** rewritten in plain HTML/CSS/JS (without `require.js`) to comply with MV3 Content Security Policy, featuring a reset-to-defaults button and automatic light/dark theme support.
- **`capSpeed` bug fix:** in the original extension, enabling the speed cap with an empty input locked scrolling to `0`; now the cap is only applied when a valid numeric value (`>= 1`) is provided.
- **`moveSpeed` guard & pre-computed asset URLs:** prevents division by zero/NaN and avoids invalidated extension context errors after reloading the extension.
- **Ghost-click suppression:** blocks `click`/`auxclick` events briefly after stopping autoscroll to prevent releasing the button from opening links or triggering unintended actions.
- **Legacy compatibility cleanup:** removed old `createShadowRoot`/`webkitCreateShadowRoot` fallbacks in favor of `attachShadow({ mode: "closed" })`, and replaced `console.assert` with an explicit storage area check in `storage.onChanged`.

## Credits & License

Based on the original work by **Paul Chapman** ([Pauan/AutoScroll](https://github.com/Pauan/AutoScroll)).
Distributed under the **X11/MIT License** — see [LICENSE](LICENSE) for details.
