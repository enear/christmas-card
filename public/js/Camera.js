const HEIGHT = 0;
const WIDTH = 320;

class Camera {
	constructor() {
		this._video = null;
		this._canvas = null;
		this._context = null;
		this._photo = null;
		this._startbutton = null;

		this._width = WIDTH;
		this._height = HEIGHT;
		this._isStreaming = false;

	}

	start() {
		this._video = document.getElementById( 'video' );
		this._canvas = document.createElement( 'canvas' );
		this._context = this._canvas.getContext( '2d' );
		this._photo = document.getElementById( 'photo' );
		this._startbutton = document.getElementById( 'startbutton' );

		let onStream = ( stream ) => {
			if ( navigator.mozGetUserMedia ) {
				this._video.mozSrcObject = stream;
			} else {
				var vendorURL = window.URL || window.webkitURL;
				this._video.src = vendorURL.createObjectURL( stream );
			}
			this._video.play();
		};
		let onError = ( err ) => console.log( "An error occured! " + err );
		let options = { video: true, audio: false };

		if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ){
			navigator.mediaDevices.getUserMedia( options ).then( onStream ).catch( onError );
		} else {
			navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia );
			navigator.getMedia( options, onStream, onError );
		}

		this._video.addEventListener( 'canplay', () => {
			if ( !this._isStreaming ) {
				this._height = this._video.videoHeight / ( this._video.videoWidth / this._width );

				// Firefox currently has a bug where the height can't be read from
				// the video, so we will make assumptions if this happens.

				if ( isNaN( this._height ) ) {
					this._height = this._width / ( 4 / 3 );
				}

				this._video.setAttribute( 'width', this._width );
				this._video.setAttribute( 'height', this._height );
				this._canvas.setAttribute( 'width', this._width );
				this._canvas.setAttribute( 'height', this._height );
				this._isStreaming = true;
			}
		}, false );

		this._startbutton.addEventListener( 'click', ( ev ) => {
			this._takePicture();
			ev.preventDefault();
		}, false );

		this._clearPhoto();
	}

	isStreaming() {
		return this._isStreaming;
	}

	_clearPhoto() {
		this._photo.setAttribute( 'src', '' );
	}

	_takePicture() {
		if ( this._width && this._height ) {
			this._canvas.width = this._width;
			this._canvas.height = this._height;
			this._context.drawImage( this._video, 0, 0, this._width, this._height );
			this._photo.setAttribute( 'src', this._canvas.toDataURL() );
		} else {
			this._clearPhoto();
		}
	}
}

export default Camera;
