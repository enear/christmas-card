const URL = '/checkEmotion';
const NO_IMAGE_RESPONSE = { success: false, message: "No image sent" };
const REQ_OPTIONS = {
	method: 'POST',
	headers: new Headers(),
	mode: 'cors',
	cache: 'default'
};

class FaceEmotion {

	constructor() {
		this._currentImage = null;
	}
	checkEmotion( image ) {
		if ( image ) {
			let options = { ...REQ_OPTIONS };
			let formData = new FormData();
			formData.append( 'image', image.src );
			options.headers.append( "Content-Length", image.size );
			options.body = formData;
			console.log(options);
			fetch( URL, options ).then( res => console.log( res ) );

		} else {
			return NO_IMAGE_RESPONSE;
		}
	}
}

export default new FaceEmotion;