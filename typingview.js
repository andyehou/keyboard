/**
 * A class for displaying the text that has been typed.
 * @param {number} width The width in pixels of the widget.
 * @param {number} height The height in pixels of the widget.
 * @constructor
 */
TypingView = function(width, height) {
  /**
   * The width in pixels of the widget.
   * @type {number}
   * @private
   */
  this.width_ = width;

  /**
   * The height in pixels of the widget.
   * @type {number}
   * @private
   */
  this.height_ = height;


  /**
   * The element for this widget.
   * @type {Element}
   * @private
   */
  this.typingElement_ = undefined;
};


/**
 * Returns the element for this widget. Creates the element if necessary.
 * @return {Element} The element for this widget.
 */
TypingView.prototype.getElement = function() {
  // Use cached element if already created.
  if (this.typingElement_) {
    return this.typingElement_;
  }

  this.typingElement_ = document.createElement('pre');
  this.typingElement_.className = 'typing';
  this.typingElement_.style.width = this.width_ + 'px';
  this.typingElement_.style.height = this.height_ + 'px';
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

  // Check for special keys.
  if (keyString == 'Backspace') {
    if (this.typingElement_.innerHTML.length > 0) {
      this.typingElement_.innerHTML = this.typingElement_.innerHTML.substring(
          0, this.typingElement_.innerHTML.length - 1);
    }
    return;
  } else if (keyString == 'Space') {
    this.typingElement_.innerHTML += ' ';
  } else if (keyString == 'Tab') {
    this.typingElement_.innerHTML += '\t';
  } else if (keyString == 'Enter') {
    this.typingElement_.innerHTML += '\n';
  } else if (keyString.length > 1) {
    // Ignore.
  } else {
    this.typingElement_.innerHTML += keyString;
  }
};
