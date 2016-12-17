/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Camera = __webpack_require__(1);
	
	var _Camera2 = _interopRequireDefault(_Camera);
	
	var _FaceEmotion = __webpack_require__(2);
	
	var _FaceEmotion2 = _interopRequireDefault(_FaceEmotion);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var app = {
		start: function start() {
			var _this = this;
	
			this.camera = new _Camera2.default();
			this.camera.start();
	
			this._checkEmotionButton = document.getElementById('checkEmotionButton');
			this._checkEmotionButton.addEventListener('click', function (ev) {
				ev.preventDefault();
				_FaceEmotion2.default.checkEmotion(_this.camera.getImage());
			});
		}
	};
	
	app.start();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HEIGHT = 0;
	var WIDTH = 320;
	
	var Camera = function () {
		function Camera() {
			_classCallCheck(this, Camera);
	
			this._video = null;
			this._canvas = null;
			this._context = null;
			this._photo = null;
			this._image = null;
			this._startbutton = null;
	
			this._width = WIDTH;
			this._height = HEIGHT;
			this._isStreaming = false;
		}
	
		_createClass(Camera, [{
			key: 'start',
			value: function start() {
				var _this = this;
	
				this._video = document.getElementById('video');
				this._canvas = document.createElement('canvas');
				this._context = this._canvas.getContext('2d');
				this._photo = document.getElementById('photo');
				this._startbutton = document.getElementById('startbutton');
	
				var onStream = function onStream(stream) {
					if (navigator.mozGetUserMedia) {
						_this._video.mozSrcObject = stream;
					} else {
						var vendorURL = window.URL || window.webkitURL;
						_this._video.src = vendorURL.createObjectURL(stream);
					}
					_this._video.play();
				};
				var onError = function onError(err) {
					return console.log("An error occured! " + err);
				};
				var options = { video: true, audio: false };
	
				if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
					navigator.mediaDevices.getUserMedia(options).then(onStream).catch(onError);
				} else {
					navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
					navigator.getMedia(options, onStream, onError);
				}
	
				this._video.addEventListener('canplay', function () {
					if (!_this._isStreaming) {
						_this._height = _this._video.videoHeight / (_this._video.videoWidth / _this._width);
	
						// Firefox currently has a bug where the height can't be read from
						// the video, so we will make assumptions if this happens.
	
						if (isNaN(_this._height)) {
							_this._height = _this._width / (4 / 3);
						}
	
						_this._video.setAttribute('width', _this._width);
						_this._video.setAttribute('height', _this._height);
						_this._canvas.setAttribute('width', _this._width);
						_this._canvas.setAttribute('height', _this._height);
						_this._isStreaming = true;
					}
				}, false);
	
				this._startbutton.addEventListener('click', function (ev) {
					_this._takePicture();
					ev.preventDefault();
				}, false);
	
				this._clearPhoto();
			}
		}, {
			key: 'isStreaming',
			value: function isStreaming() {
				return this._isStreaming;
			}
		}, {
			key: 'getImage',
			value: function getImage() {
				return this._image;
			}
		}, {
			key: '_clearPhoto',
			value: function _clearPhoto() {
				this._photo.setAttribute('src', '');
				this._image = null;
			}
		}, {
			key: '_takePicture',
			value: function _takePicture() {
				if (this._width && this._height) {
					this._canvas.width = this._width;
					this._canvas.height = this._height;
					this._context.drawImage(this._video, 0, 0, this._width, this._height);
	
					var url = this._canvas.toDataURL();
	
					this._image = new Image();
					this._image.src = url;
	
					this._photo.setAttribute('src', url);
				} else {
					this._clearPhoto();
				}
			}
		}]);
	
		return Camera;
	}();
	
	exports.default = Camera;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var URL = '/checkEmotion';
	var NO_IMAGE_RESPONSE = { success: false, message: "No image sent" };
	var REQ_OPTIONS = {
		method: 'POST',
		headers: new Headers(),
		mode: 'cors',
		cache: 'default'
	};
	
	var FaceEmotion = function () {
		function FaceEmotion() {
			_classCallCheck(this, FaceEmotion);
	
			this._currentImage = null;
		}
	
		_createClass(FaceEmotion, [{
			key: 'checkEmotion',
			value: function checkEmotion(image) {
				if (image) {
					var options = _extends({}, REQ_OPTIONS);
					var formData = new FormData();
					formData.append('image', image.src);
					options.headers.append("Content-Length", image.size);
					options.body = formData;
					console.log(options);
					fetch(URL, options).then(function (res) {
						return console.log(res);
					});
				} else {
					return NO_IMAGE_RESPONSE;
				}
			}
		}]);
	
		return FaceEmotion;
	}();
	
	exports.default = new FaceEmotion();

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map