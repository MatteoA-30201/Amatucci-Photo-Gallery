// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(GalleryImage) {
	return function(e) {
		GalleryImage.img = e.target;
		mImages.push(GalleryImage);
	}
};

function iterateJson(item, index, arr) {
  mJson.images.forEach(createGalleryImageObjects);
  function createGalleryImageObjects(item, index, arr) {
    let galleryImageObjects = new GalleryImage('imgLocation', 'description', 'date', 'imgPath');;
    GalleryImage.imgLocation = mJson.images[index].imgLocation;
    GalleryImage.description = mJson.images[index].description;
    GalleryImage.date = mJson.images[index].date;
    GalleryImage.imgPath = mJson.images[index].imgPath;
    mImages.push(galleryImageObjects);
  };

  console.log(mImages)
};

function fetchJSON() {
  mRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       mJson = JSON.parse(mRequest.responseText);
      iterateJson();
    }
};
mRequest.open("GET", mUrl, true);
mRequest.send();
};

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	fetchJSON();
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

class GalleryImage {
  constructor(location, description, date, img) {

    this.location = location;
    this.description = description;
    this.date = date;
    this.img = img;

    //implement me as an object to hold the following data about an image:
    //1. location where photo was taken
    //2. description of photo
    //3. the date when the photo was taken
    //4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  }
}
