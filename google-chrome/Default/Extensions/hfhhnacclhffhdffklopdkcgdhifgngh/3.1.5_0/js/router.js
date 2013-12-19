// Copyright (c) 2013 The Chromium OS Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/**
 * Namespace for the Camera app.
 */
var camera = camera || {};

/**
 * Creates the Router object, used to navigate between views.
 *
 * @param {function(camera.Router.ViewIdentifier, Object=)} navigateCallback
 *     Callback to be called, when a view switch is requested. An optional
 *     argument for the view may be specified.
 * @param {function(Object=)} backCallback Callback to be called, when the
 *     current view is requested to be closed. An optional argument acting
 *     as a return value passed to the previous view can be passed.
 * @constructor
 */
camera.Router = function(navigateCallback, backCallback) {
  /**
   * @type {function(camera.Router.ViewIdentifier, Object=}}
   * @private
   */
  this.navigateCallback_ = navigateCallback;

  /**
   * @type {function(Object=)}
   * @private
   */
  this.backCallback_ = backCallback;

  // End of properties. Freeze the object.
  Object.freeze(this);
};

/**
 * View identifiers.
 * @enum {number}
 */
camera.Router.ViewIdentifier = {
  CAMERA: 0,
  ALBUM: 1,
  BROWSER: 2,
  DIALOG: 3
};

/**
 * Switches to the specified view.
 *
 * @param {camera.Router.ViewIdentifier} viewIdentifier View identifier.
 * @param {Object=} opt_arguments Optional arguments for the new view.
 * @param {function(Object=)=} opt_callback Optional result callback.
 */
camera.Router.prototype.navigate = function(
    viewIdentifier, opt_arguments, opt_callback) {
  this.navigateCallback_(viewIdentifier, opt_arguments, opt_callback);
};

/**
 * Closes the current view and returns an optional return value to the previous
 * view.
 * @param {Object=} opt_result Optional result.
 */
camera.Router.prototype.back = function(opt_result) {
  this.backCallback_(opt_result);
};

