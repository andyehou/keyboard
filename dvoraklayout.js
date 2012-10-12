/**
 * Represents a standard DVORAK keyboard layout.
 * Contains static methods related to DVORAK layout.
 */
DvorakLayout = {};


/**
 * A mapping from physical key id (modifiers have no effect) to non-Firefox
 * browser key code.
 * @type {Array.<number>}
 * @private
 */
DvorakLayout.defaultIdToKeyCode_ = [
    192,  49,  50,  51,  52,  53,  54,  55,  56,  57,  48, 219, 221,   8,
      9, 222, 188, 190,  80,  89,  70,  71,  67,  82,  76, 191, 187, 220,
     20,  65,  79,  69,  85,  73,  68,  72,  84,  78,  83, 189,  13,
     16, 186,  81,  74,  75,  88,  66,  77,  87,  86,  90,  16,
     17,  91,  18,  32,  18,  92,  93,  17
];


/**
 * A mapping from physical key id (modifiers have no effect) to Firefox browser
 * key code.
 * @type {Array.<number>}
 * @private
 */
DvorakLayout.firefoxIdToKeyCode_ = [
    192,  49,  50,  51,  52,  53,  54,  55,  56,  57,  48, 219, 221,   8,
      9, 222, 188, 190,  80,  89,  70,  71,  67,  82,  76, 191,  61, 220,
     20,  65,  79,  69,  85,  73,  68,  72,  84,  78,  83, 173,  13,
     16,  59,  81,  74,  75,  88,  66,  77,  87,  86,  90,  16,
     17,  91,  18,  32,  18,  92,  93,  17
];


/**
 * A mapping from physical key id (modifiers have no effect) to key code for
 * the browser we are on.
 * @type {Array.<number>}
 * @private
 */
DvorakLayout.idToKeyCode_ = $.browser.mozilla ?
    DvorakLayout.firefoxIdToKeyCode_ :
    DvorakLayout.defaultIdToKeyCode_;


/**
 * Returns the physical key ids. Most keycodes correspond to just one physical
 * key id. However, some keys (e.g., shift, ctrl, and alt) have more than one
 * physical key that generate the same browser keycode. Since it is impossible
 * to distinguish which physical key was pressed, we return all of them.
 * @param {number} keyCode The keyCode from the browser event.
 * @return {Array.<number>} The physical key ids on this layout.
 */
DvorakLayout.getPhysicalKeyIds = function(keyCode) {
  var keys = [];
  for (var i = 0; i < DvorakLayout.idToKeyCode_.length; i++) {
    if (DvorakLayout.idToKeyCode_[i] == keyCode) {
      keys.push(i);
    }
  }
  return keys;
};


/**
 * Return the keyCode from the browser event.
 * @param {number} keyId The physical key id.
 * @return {number} The keyCode from the browser event.
 */
DvorakLayout.getKeyCode = function(keyId) {
  return DvorakLayout.idToKeyCode_[keyId];
};
