var express = require( 'express' );
var router = express.Router();

/* GET home page. */
router.get( '/', function ( req, res, next ) {
	res.render( 'index', { title: 'Natal E.near 2016' } );
} );

router.post( '/checkEmotion', function ( req, res, next ) {

	console.log( req );

	res.status( 200 );
	res.end();

} );

module.exports = router;
