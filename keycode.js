/**
 * Contains mappings from browser key code to printable character.
 */
var KeyCode = {};


/**
 * A mapping from browser key code to printable characters.
 * @type {Object}
 * @private
 */
KeyCode.keyCodeToString_ = {
  192: '`',
   49: '1',
   50: '2',
   51: '3',
   52: '4',
   53: '5',
   54: '6',
   55: '7',
   56: '8',
   57: '9',
   48: '0',
  189: '-',
  173: '-', // Firefox
  187: '=',
   61: '=', // Firefox
    8: 'Backspace',

    9: 'Tab',
   81: 'q',
   87: 'w',
   69: 'e',
   82: 'r',
   84: 't',
   89: 'y',
   85: 'u',
   73: 'i',
   79: 'o',
   80: 'p',
  219: '[',
  221: ']',
  220: '\\',

   20: 'Caps Lock',
   65: 'a',
   83: 's',
   68: 'd',
   70: 'f',
   71: 'g',
   72: 'h',
   74: 'j',
   75: 'k',
   76: 'l',
  186: ';',
   59: ';', // Firefox
  222: '\'',
   13: 'Enter',

   16: 'Shift',
   90: 'z',
   88: 'x',
   67: 'c',
   86: 'v',
   66: 'b',
   78: 'n',
   77: 'm',
  188: ',',
  190: '.',
  191: '/',

   17: 'Ctrl',
   91: 'Meta',
   18: 'Alt',
   32: 'Space',
   92: 'Meta',
   93: 'Menu'
};


/**
 * A mapping from browser key code with shift key pressed to printable
 * characters.
 * @type {Object}
 * @private
 */
KeyCode.shiftKeyCodeToString_ = {
  192: '~',
   49: '!',
   50: '@',
   51: '#',
   52: '$',
   53: '%',
   54: '^',
   55: '&',
   56: '*',
   57: '(',
   48: ')',
  189: '_',
  173: '_', // Firefox
  187: '+',
   61: '+', // Firefox
    8: 'Backspace',

    9: 'Tab',
   81: 'Q',
   87: 'W',
   69: 'E',
   82: 'R',
   84: 'T',
   89: 'Y',
   85: 'U',
   73: 'I',
   79: 'O',
   80: 'P',
  219: '{',
  221: '}',
  220: '|',

   20: 'Caps Lock',
   65: 'A',
   83: 'S',
   68: 'D',
   70: 'F',
   71: 'G',
   72: 'H',
   74: 'J',
   75: 'K',
   76: 'L',
  186: ':',
   59: ':', // Firefox
  222: '"',
   13: 'Enter',

   16: 'Shift',
   90: 'Z',
   88: 'X',
   67: 'C',
   86: 'V',
   66: 'B',
   78: 'N',
   77: 'M',
  188: '<',
  190: '>',
  191: '?',

   17: 'Ctrl',
   91: 'Meta',
   18: 'Alt',
   32: 'Space',
   92: 'Meta',
   93: 'Menu'
};


/**
 * Return the printable characters corresponding to a key code.
 * @param {number} keyCode The browser key code.
 * @param {number} modifiers The modifiers mask.
 * @return {string} The printable characters.
 */
KeyCode.toString = function(keyCode, modifiers) {
  if (modifiers % 2 != 0) {
    // Shift key is pressed.
    return KeyCode.shiftKeyCodeToString_[keyCode];
  } else {
    // Shift key is not pressed.
    return KeyCode.keyCodeToString_[keyCode];
  }
};
