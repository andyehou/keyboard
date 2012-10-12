/**
 * A class for displaying the text that has been typed.
 * @param {number} width The width in pixels of the widget.
 * @param {number} height The height in pixels of the widget.
 * @param {string=} opt_initialText The initial text to display.
 * @constructor
 */
TypingView = function(width, height, opt_initialText) {
  /**
   * The element for this widget.
   * @type {Element}
   * @private
   */
  this.typingElement_ = document.createElement('pre');
  this.typingElement_.className = 'typing';
  this.typingElement_.style.width = this.width_ + 'px';
  this.typingElement_.style.height = this.height_ + 'px';
  this.typingElement_.innerHTML = opt_initialText || '';
};


/**
 * Returns the element for this widget. Creates the element if necessary.
 * @return {Element} The element for this widget.
 */
TypingView.prototype.getElement = function() {
  return this.typingElement_;
};


/**
 * Returns the method that will listen to KeyTapEvents.
 * @return {Function(KeyTapEvent)} The method that will listen to KeyTapEvents.
 */
TypingView.prototype.getListenerMethod = function() {
  return this.onKeyTapEvent_.bind(this);
};


/**
 * Called when a key is pressed or released.
 * @param {KeyTapEvent} event The KeyTapEvent.
 * @private
 */
TypingView.prototype.onKeyTapEvent_ = function(event) {
  // Check if the element has been created.
  if (!this.typingElement_) {
    return;
  }

  // Check if this is a key press event.
  if (!event.isPressed()) {
    return;
  }

  var keyString = event.getString();
  var text = this.typingElement_.innerHTML;

  // Check for special keys.
  if (keyString == 'Backspace') {
    if (text.length > 0) {
      text = text.substring(0, text.length - 1);
    }
  } else if (keyString == 'Space') {
    text += ' ';
  } else if (keyString == 'Tab') {
    text += '\t';
  } else if (keyString == 'Enter') {
    text += '\n';
  } else if (keyString.length > 1) {
    // Ignore.
  } else {
    text += keyString;
  }

  this.typingElement_.innerHTML = text;
};
