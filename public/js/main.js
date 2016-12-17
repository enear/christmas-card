import Camera from "./Camera";
import faceEmotion from "./FaceEmotion";

let app = {
	start(){
		this.camera = new Camera();
		this.camera.start();

		this._checkEmotionButton = document.getElementById( 'checkEmotionButton' );
		this._checkEmotionButton.addEventListener( 'click', (ev) => {
			ev.preventDefault();
			faceEmotion.checkEmotion( this.camera.getImage() );
		})
	}
};

app.start();