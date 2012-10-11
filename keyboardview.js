/**
 * A class for displaying a standard computer keyboard.
 * Renders the keys as absolutely positioned div elements. There is no spacing
 * between the keys. Requires browser support for CSS inset box shadows.
 * The size of the view is specified in terms of the width and height of a
 * single standard key. The width of the keyboard is 15x a single key's width.
 * The height of the keyboard is 5x a single key's height.
 * @param {number} keyWidth The width in pixels of a single key.
 * @param {number} keyHeight The height in pixels of a single key.
 * @param {Object} keyboardLayout The keyboard layout to use. Determines the
 *     physical key ids of the out KeyTapEvent objects.
 * @constructor
 */
KeyboardView = function(keyWidth, keyHeight, keyboardLayout) {
  /**
   * The width in pixels of a single key.
   * @type {number}
   * @private
   */
  this.keyWidth_ = keyWidth;

  /**
   * The height in pixels of a single key.
   * @type {number}
   * @private
   */
  this.keyHeight_ = keyHeight;

  /**
   * The keyboard layout to use.
   * @param {Object}
   * @private
   */
  this.keyboardLayout_ = keyboardLayout;

  /**
   * The top level element of the keyboard. Lazily created.
   * @type {Element}
   * @private
   */
  this.keyboardElement_ = undefined;
};


/**
 * Returns the element for the keyboard. Creates the element if necessary.
 * @return {Element} The element for the keyboard.
 */
KeyboardView.prototype.getElement = function() {
  // Used cached element if already created.
  if (this.keyboardElement_) {
    return this.keyboardElement_;
  }

  // Create the keyboard container.
  var keyboard = document.createElement('div');
  keyboard.className = 'keyboard';
  
  // The id of the next key element.
  var id = 0;
  // The x and y coordinates to place the next key element.
  var x = 0;
  var y = 0;
  // The width and height of the unit (size 1) key.
  var width = this.keyWidth_;
  var height = this.keyHeight_;

  /**
   * Creates a key of the given size. The size linearly scales the width of the
   * key. For example a key of size 2 is twice as wide as a key of size 1.
   * @param {number} size The size of the key.
   * @return {Element} The created element.
   * @private
   */
   var createKey_ = function(size) {
    var scaledWidth = Math.floor(size * width);
    var key = document.createElement('div');
    key.className = 'key';
    key.id = 'key-' + id++;
    key.style.left = x + 'px';
    key.style.top = '0px';
    key.style.width = Math.floor(width * size) + 'px';
    key.style.height = height + 'px';
    x += scaledWidth;
    return key;
  };

  /**
   * Creates a row containing keys.
   * @return {Element} The created element.
   * @private
   */
  var createRow_ = function() {
    var row = document.createElement('div');
    row.className = 'row';
    row.style.left = '0px';
    row.style.top = y + 'px';
    row.style.width = (width * 15) + 'px';
    row.style.height = (height + 1) + 'px';
    x = 0;
    y += height;
    return row;
  };

  // 1st row.
  var row = createRow_();
  for (var i = 0; i < 13; i++) {
    row.appendChild(createKey_(1));
  }
  row.appendChild(createKey_(2));
  keyboard.appendChild(row);

  // 2nd row.
  row = createRow_();
  row.appendChild(createKey_(1.5));
  for (var i = 0; i < 12; i++) {
    row.appendChild(createKey_(1));
  }
  row.appendChild(createKey_(1.5));
  keyboard.appendChild(row);

  // 3rd row.
  row = createRow_();
  row.appendChild(createKey_(1.8));
  for (var i = 0; i < 11; i++) {
    row.appendChild(createKey_(1));
  }
  row.appendChild(createKey_(2.2));
  keyboard.appendChild(row);

  // 4th row.
  row = createRow_();
  row.appendChild(createKey_(2.25));
  for (var i = 0; i < 10; i++) {
    row.appendChild(createKey_(1));
  }
  row.appendChild(createKey_(2.75));
  keyboard.appendChild(row);

  // 5th row.
  row = createRow_();
  row.appendChild(createKey_(1.5));
  row.appendChild(createKey_(1.25));
  row.appendChild(createKey_(1.25));
  row.appendChild(createKey_(5.75));
  row.appendChild(createKey_(1.25));
  row.appendChild(createKey_(1.25));
  row.appendChild(createKey_(1.25));
  row.appendChild(createKey_(1.5));
  keyboard.appendChild(row);

  this.keyboardElement_ = keyboard;
  this.setKeyLabels_(0);
  return keyboard;
};


/**
 * Returns the method that will listen to KeyTapEvents.
 * @return {Function(KeyTapEvent)} The method that will listen to KeyTapEvents.
 */
KeyboardView.prototype.getListenerMethod = function() {
  return this.onKeyTapEvent_.bind(this);
};


/**
 * Sets the keyboard layout to use to display the key labels.
 * @param {Object} keyboardLayout The keyboard layout.
 */
KeyboardView.prototype.setLayout = function(keyboardLayout) {
  this.keyboardLayout_ = keyboardLayout;
  if (this.keyboardElement_) {
    this.setKeyLabels_(0);
  }
};


/**
 * Sets the key label elements of the keys.
 * @param {number} modifiers The modifiers mask.
 */
KeyboardView.prototype.setKeyLabels_ = function(modifiers) {
  var keyboard = this.getElement();
  var selfObj = this;
  $(keyboard).find('.key').each(function(index, key) {
    var id = parseInt(key.id.substring(4), 10);
    var keyCode = selfObj.keyboardLayout_.getKeyCode(id);
    var label = KeyCode.toString(keyCode, modifiers);
    var labelElem = key.firstChild;
    if (!labelElem) {
      // Create the label element if it doesn't exist.
      labelElem = document.createElement('div');
      labelElem.className = 'label';
      key.appendChild(labelElem);
    }
    labelElem.innerHTML = label;
  });
};


/**
 * Called when a key is pressed or released.
 * @param {KeyTapEvent} event The KeyTapEvent
 * @private
 */
KeyboardView.prototype.onKeyTapEvent_ = function(event) {
  var physicalKeyIds = event.getPhysicalKeyIds();

  // Check that the event corresponds to a physical key on our keyboard layout.
  if (physicalKeyIds.length == 0) {
    return;
  }

  for (var i = 0; i < physicalKeyIds.length; i++) {
    var physicalKeyId = physicalKeyIds[i];

    // Change the css class name of the key.
    var key = document.getElementById('key-' + physicalKeyId);
    if (event.isPressed()) {
      key.className = 'key pressed';
    } else {
      key.className = 'key';
    }
  }

  // Handle the shift key.
  if (event.getKeyCode() == 16) {
    this.setKeyLabels_(event.isPressed());
  }
};
