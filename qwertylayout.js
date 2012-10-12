/**
 * Represents a standard QWERTY keyboard layout.
 * Contains static methods related to QWERTY layout.
 */
QwertyLayout = {};


/**
 * A mapping from physical key id (modifiers have no effect) to non-Firefox
 * browser key code.
 * @type {Array.<number>}
 * @private
 */
QwertyLayout.defaultIdToKeyCode_ = [
    192,  49,  50,  51,  52,  53,  54,  55,  56,  57,  48, 189, 187,   8,
      9,  81,  87,  69,  82,  84,  89,  85,  73,  79,  80, 219, 221, 220,
     20,  65,  83,  68,  70,  71,  72,  74,  75,  76, 186, 222,  13,
     16,  90,  88,  67,  86,  66,  78,  77, 188, 190, 191,  16,
     17,  91,  18,  32,  18,  92,  93,  17
];


/**
 * A mapping from physical key id (modifiers have no effect) to Firefox browser
 * key code.
 * @type {Array.<number>}
 * @private
 */
QwertyLayout.firefoxIdToKeyCode_ = [
    192,  49,  50,  51,  52,  53,  54,  55,  56,  57,  48, 173,  61,   8,
      9,  81,  87,  69,  82,  84,  89,  85,  73,  79,  80, 219, 221, 220,
     20,  65,  83,  68,  70,  71,  72,  74,  75,  76,  59, 222,  13,
     16,  90,  88,  67,  86,  66,  78,  77, 188, 190, 191,  16,
     17,  91,  18,  32,  18,  92,  93,  17
];


/**
 * A mapping from physical key id (modifiers have no effect) to key code for
 * the browser we are on.
 * @type {Array.<number>}
 * @private
 */
QwertyLayout.idToKeyCode_ = $.browser.mozilla ?
    QwertyLayout.firefoxIdToKeyCode_ :
    QwertyLayout.defaultIdToKeyCode_;


/**
 * Returns the physical key ids. Most keycodes correspond to just one physical
 * key id. However, some keys (e.g., shift, ctrl, and alt) have more than one
 * physical key that generate the same browser keycode. Since it is impossible
 * to distinguish which physical key was pressed, we return all of them.
 * @param {number} keyCode The keyCode from the browser event.
 * @return {Array.<number>} The physical key ids on this layout.
 */
QwertyLayout.getPhysicalKeyIds = function(keyCode) {
  var keys = [];
  for (var i = 0; i < QwertyLayout.idToKeyCode_.length; i++) {
    if (QwertyLayout.idToKeyCode_[i] == keyCode) {
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
QwertyLayout.getKeyCode = function(keyId) {
  return QwertyLayout.idToKeyCode_[keyId];
};
