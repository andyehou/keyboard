/**
 * Represents a key on a keyboard being pressed or released.
 * Has methods for getting the id of the physical key and for getting the
 * character to print.
 * @param {Object} keyboardLayout The keyboard layout for this event.
 * @param {number} keycode The browser keycode.
 * @param {number} modifiersMask A bitmask of the modifier keys being pressed.
 * @param {boolean} isPressed True if the key is being pressed, false if it is
 *     being released.
 * @constructor
 */
var KeyTapEvent = function(
    keyboardLayout, keyCode, modifiersMask, isPressed) {
  /**
   * The keyboard layout for this event. Determines the printable character
   * corresponding to the physical key id and modifiers mask.
   * @param {Object}
   * @private
   */
  this.keyboardLayout_ = keyboardLayout;

  /**
   * The browser keycode.
   * @type {number}
   * @private
   */
  this.keyCode_ = keyCode;

  /**
   * A bitmask of the modifier keys being pressed.
   * @type {number}
   * @private
   */
  this.modifiersMask_ = modifiersMask;

  /**
   * True if the key is being pressed, false if it is being released.
   * @type {boolean}
   * @private
   */
  this.isPressed_ = isPressed;
};


/**
 * Returns the id of the physical key.
 * @return {number} The id of the physical key.
 */
KeyTapEvent.prototype.getKeyCode = function() {
  return this.keyCode_;
};


/**
 * Returns a bitmask of the modifier keys being pressed.
 * @return {number} A bitmask of the modifier keys being pressed.
 */
KeyTapEvent.prototype.getModifiersMask = function() {
  return this.modifiersMask_;
};


/**
 * Returns true if the key is being pressed.
 * @return {boolean} True if the key is being pressed.
 */
KeyTapEvent.prototype.isPressed = function() {
  return this.isPressed_;
};


/**
 * Returns the ids of the physical keys.
 * @return {Array.<number>} The ids of the physical keys.
 */
KeyTapEvent.prototype.getPhysicalKeyIds = function() {
  return this.keyboardLayout_.getPhysicalKeyIds(
      this.getKeyCode(), this.getModifiersMask());
};


/**
 * Returns the printable characters of the key.
 * @return {string} The printable characters of the key.
 */
KeyTapEvent.prototype.getString = function() {
  return KeyCode.toString(this.getKeyCode(), this.getModifiersMask());
};
