// Standard TKL / 80% Mechanical QWERTY Keyboard Layout
// Width in U units (1U = standard key width)

export const RGB_COLORS = [
  { color: '#00ffff', shadow: '0 0 12px #00ffff' },
  { color: '#0080ff', shadow: '0 0 12px #0080ff' },
  { color: '#8000ff', shadow: '0 0 12px #8000ff' },
  { color: '#ff00ff', shadow: '0 0 12px #ff00ff' },
]

let colorIndex = 0
export const getNextRGBColor = () => {
  const c = RGB_COLORS[colorIndex % RGB_COLORS.length]
  colorIndex++
  return c
}

export const LETTER_TO_CODE = {
  K: 'KeyK', A: 'KeyA', R: 'KeyR', M: 'KeyM',
  V: 'KeyV', E: 'KeyE', O: 'KeyO', N: 'KeyN',
}

export const KARMAVEON_SEQUENCE = ['K', 'A', 'R', 'M', 'A', 'V', 'E', 'O', 'N']

// Each key: { code, label, w }  where w = width in U
// gaps: { gap: n }  = blank space of n U
export const REAL_KEYBOARD_LAYOUT = [
  // Row 0: Function row
  { row: 0, keys: [
    { code: 'Escape',      label: 'esc', w: 1 },
    { gap: 1 },
    { code: 'F1',          label: 'F1',  w: 1 },
    { code: 'F2',          label: 'F2',  w: 1 },
    { code: 'F3',          label: 'F3',  w: 1 },
    { code: 'F4',          label: 'F4',  w: 1 },
    { gap: 0.5 },
    { code: 'F5',          label: 'F5',  w: 1 },
    { code: 'F6',          label: 'F6',  w: 1 },
    { code: 'F7',          label: 'F7',  w: 1 },
    { code: 'F8',          label: 'F8',  w: 1 },
    { gap: 0.5 },
    { code: 'F9',          label: 'F9',  w: 1 },
    { code: 'F10',         label: 'F10', w: 1 },
    { code: 'F11',         label: 'F11', w: 1 },
    { code: 'F12',         label: 'F12', w: 1 },
    { gap: 0.5 },
    { code: 'PrintScreen', label: 'prt', w: 1 },
    { code: 'ScrollLock',  label: 'scr', w: 1 },
    { code: 'Pause',       label: 'pse', w: 1 },
  ]},
  // Row 1: Number row + Nav
  { row: 1, keys: [
    { code: 'Backquote',   label: '`',  w: 1 },
    { code: 'Digit1',      label: '1',  w: 1 },
    { code: 'Digit2',      label: '2',  w: 1 },
    { code: 'Digit3',      label: '3',  w: 1 },
    { code: 'Digit4',      label: '4',  w: 1 },
    { code: 'Digit5',      label: '5',  w: 1 },
    { code: 'Digit6',      label: '6',  w: 1 },
    { code: 'Digit7',      label: '7',  w: 1 },
    { code: 'Digit8',      label: '8',  w: 1 },
    { code: 'Digit9',      label: '9',  w: 1 },
    { code: 'Digit0',      label: '0',  w: 1 },
    { code: 'Minus',       label: '-',  w: 1 },
    { code: 'Equal',       label: '=',  w: 1 },
    { code: 'Backspace',   label: '⌫', w: 2 },
    { gap: 0.5 },
    { code: 'Insert',      label: 'ins',  w: 1 },
    { code: 'Home',        label: 'home', w: 1 },
    { code: 'PageUp',      label: 'pgup', w: 1 },
  ]},
  // Row 2: QWERTY row
  { row: 2, keys: [
    { code: 'Tab',         label: 'tab', w: 1.5 },
    { code: 'KeyQ',        label: 'Q',   w: 1 },
    { code: 'KeyW',        label: 'W',   w: 1 },
    { code: 'KeyE',        label: 'E',   w: 1 },
    { code: 'KeyR',        label: 'R',   w: 1 },
    { code: 'KeyT',        label: 'T',   w: 1 },
    { code: 'KeyY',        label: 'Y',   w: 1 },
    { code: 'KeyU',        label: 'U',   w: 1 },
    { code: 'KeyI',        label: 'I',   w: 1 },
    { code: 'KeyO',        label: 'O',   w: 1 },
    { code: 'KeyP',        label: 'P',   w: 1 },
    { code: 'BracketLeft', label: '[',   w: 1 },
    { code: 'BracketRight',label: ']',   w: 1 },
    { code: 'Backslash',   label: '\\',  w: 1.5 },
    { gap: 0.5 },
    { code: 'Delete',      label: 'del',  w: 1 },
    { code: 'End',         label: 'end',  w: 1 },
    { code: 'PageDown',    label: 'pgdn', w: 1 },
  ]},
  // Row 3: ASDF row (no nav cluster on this row)
  { row: 3, keys: [
    { code: 'CapsLock',    label: 'caps',    w: 1.75 },
    { code: 'KeyA',        label: 'A',       w: 1 },
    { code: 'KeyS',        label: 'S',       w: 1 },
    { code: 'KeyD',        label: 'D',       w: 1 },
    { code: 'KeyF',        label: 'F',       w: 1 },
    { code: 'KeyG',        label: 'G',       w: 1 },
    { code: 'KeyH',        label: 'H',       w: 1 },
    { code: 'KeyJ',        label: 'J',       w: 1 },
    { code: 'KeyK',        label: 'K',       w: 1 },
    { code: 'KeyL',        label: 'L',       w: 1 },
    { code: 'Semicolon',   label: ';',       w: 1 },
    { code: 'Quote',       label: "'",       w: 1 },
    { code: 'Enter',       label: '↵ enter', w: 2.25 },
  ]},
  // Row 4: ZXCV row + up arrow
  { row: 4, keys: [
    { code: 'ShiftLeft',   label: 'shift', w: 2.25 },
    { code: 'KeyZ',        label: 'Z',     w: 1 },
    { code: 'KeyX',        label: 'X',     w: 1 },
    { code: 'KeyC',        label: 'C',     w: 1 },
    { code: 'KeyV',        label: 'V',     w: 1 },
    { code: 'KeyB',        label: 'B',     w: 1 },
    { code: 'KeyN',        label: 'N',     w: 1 },
    { code: 'KeyM',        label: 'M',     w: 1 },
    { code: 'Comma',       label: ',',     w: 1 },
    { code: 'Period',      label: '.',     w: 1 },
    { code: 'Slash',       label: '/',     w: 1 },
    { code: 'ShiftRight',  label: 'shift', w: 2.75 },
    { gap: 1.5 },
    { code: 'ArrowUp',     label: '▲',    w: 1 },
  ]},
  // Row 5: Bottom row + arrows
  { row: 5, keys: [
    { code: 'ControlLeft', label: 'ctrl',   w: 1.25 },
    { code: 'AltLeft',     label: 'option', w: 1.25 },
    { code: 'MetaLeft',    label: '⌘',     w: 1.25 },
    { code: 'Space',       label: ' ',      w: 6.25 },
    { code: 'MetaRight',   label: '⌘',     w: 1.25 },
    { code: 'AltRight',    label: 'option', w: 1.25 },
    { code: 'Fn',          label: 'fn',     w: 1.25 },
    { code: 'ControlRight',label: 'ctrl',   w: 1.25 },
    { gap: 0.5 },
    { code: 'ArrowLeft',   label: '◄',    w: 1 },
    { code: 'ArrowDown',   label: '▼',    w: 1 },
    { code: 'ArrowRight',  label: '►',    w: 1 },
  ]},
]

// Backward-compat: flat rows for anything that still imports KEYBOARD_ROWS
export const KEYBOARD_ROWS = REAL_KEYBOARD_LAYOUT.map(r =>
  r.keys.filter(k => k.code).map(k => ({ code: k.code, label: k.label, colSpan: Math.round(k.w) }))
)

export const ALL_KEY_CODES = REAL_KEYBOARD_LAYOUT.flatMap(r =>
  r.keys.filter(k => k.code).map(k => k.code)
)
