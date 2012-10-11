/**
 * A class that listens to keyboard events, translates them from one keyboard
 * layout to another, and dispatches new KeyTapEvent objects. The input events
 * can be raw key events (onkeydown, onkeyup) from the browser or KeyTapEvent
 * objects from another class. The output events are KeyTapEvent objects.
 * @param {Object} inputLayout The keyboard layout of the hardware keyboard.
 *     Used to decode incoming browser keycode events to a physical key id.
 * @param {Object} outputLayout The keyboard layout to simulate. This will be
 *     the keyboard layout of the outgoing KeyTapEvents.
 * @constructor
 */
KeyHook = function(inputLayout, outputLayout) {
  /**
   * The input keyboard layout.
   * @param {Object}
   * @private
   */
  this.inputLayout_ = inputLayout;

  /**
   * The input keyboard layout.
   * @param {Object}
   * @private
   */
  this.outputLayout_ = outputLayout;

  /**
   * The array of functions to call when KeyTapEvents are generated.
   * @param {Array.<Function(KeyTapEvent)>}
   * @private
   */
  this.listeners_ = [];

  // Listen to raw browser key events.
  document.onkeydown = this.onKeyboardEvent_;
  document.onkeyup = this.onKeyboardEvent_;

  // Create a link to us on global object so IE8 is happy.
  document.selfKeyHook = this;
};


/**
 * Adds a new listener that will be called when KeyTapEvents are generated.
 * @param {Function(KeyTapEvent)} listener The listener function.
 */
KeyHook.prototype.addListener = function(listener) {
  this.listeners_.push(listener);
};


/**
 * Sets the input keyboard layout.
 * @param {Object} inputLayout The input keyboard layout.
 */
KeyHook.prototype.setInputLayout = function(inputLayout) {
  this.inputLayout_ = inputLayout;
};


/**
 * Sets the output keyboard layout.
 * @param {Object} outputLayout The output keyboard layout.
 */
KeyHook.prototype.setOutputLayout = function(outputLayout) {
  this.outputLayout_ = outputLayout;
};


/**
 * Called when a key is pressed or released. Converts the given browser
 * KeyboardEvent into a KeyTapEvent using this Keyhook's keyboard layout and
 * calls all listeners with the KeyTapEvent.
 * @param {KeyboardEvent} e The browser KeyboardEvent.
 * @return {boolean} true to run the default handler.
 * @private
 */
KeyHook.prototype.onKeyboardEvent_ = function(e) {
  // IE8 is fucked up and gets an "event" variable magically defined.
  // Other saner browser pass the event object in as a parameter.
  if (typeof(e) == 'undefined') {
    e = event;
  }

  var selfObj = document.selfKeyHook;
  var keyCode = e.keyCode;
  var modifiersMask = selfObj.getModifiersMask_(e);
  var keyIds = selfObj.inputLayout_.getPhysicalKeyIds(keyCode);

    // Logging.
  if (e.type == 'keydown') {
    console.log('keyCode = ' + keyCode + ', modifiers = ' + modifiersMask);
  }

  // Filter out keycodes that do not correspond to a physical key on our
  // keyboard layout.
  if (keyIds.length == 0) {
    return true;
  }

  // Convert input keyCode to output keyCode.
  keyCode = selfObj.outputLayout_.getKeyCode(keyIds[0]);

  // Create the KeyTapEvent.
  var keyTapEvent = new KeyTapEvent(
      selfObj.outputLayout_,
      keyCode,
      modifiersMask,
      e.type == 'keydown');

  // Logging.
  if (e.type == 'keydown') {
    console.log('keyCode = ' + keyCode + ', modifiers = ' + modifiersMask);
  }

  // Dispatch the event.
  selfObj.dispatchEvent_(keyTapEvent);
  return false;
};


/**
 * Notifies all listeners about the given event.
 * @param {KeyTapEvent} event The KeyTapEvent to dispatch.
 * @private
 */
KeyHook.prototype.dispatchEvent_ = function(event) {
  for (var i = 0; i < this.listeners_.length; i++) {
    this.listeners_[i](event);
  }
};


/**
 * Returns a bitmask of the modifiers keys being pressed.
 * @param {KeyboardEvent} event The browser KeyboardEvent.
 * @return {number} a bitmask of the modifier keys being pressed.
 * @private
 */
KeyHook.prototype.getModifiersMask_ = function(event) {
  return (event.shiftKey ? 1 : 0) +
      (event.ctrlKey ? 2 : 0) +
      (event.altKey ? 4 : 0) +
      (event.metaKey ? 8 : 0);
};
