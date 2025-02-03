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
  if(mCurrentIndex >= mImages.length)
    {
      mCurrentIndex = 0;
    }

	console.log('swap photo');

   var imgElement = $("#photo");
  imgElement.attr("src", mImages[mCurrentIndex].img);

  $(".location").text("Location: " + mImages[mCurrentIndex].location);
  $(".description").text("Description: " + mImages[mCurrentIndex].description);
  $(".date").text("Date: " + mImages[mCurrentIndex].date);

    mCurrentIndex++;
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
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
var mUrl;


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(GalleryImage) {
	return function(e) {
		GalleryImage.img = e.target;
		mImages.push(GalleryImage);
	}
};

function iterateJson() {
  mJson.images.forEach(element => {
  let galleryImageObjects = new GalleryImage(
    element.imgLocation,
    element.description,
    element.date,
    element.imgPath
  );
  
  mImages.push(galleryImageObjects);
 });
 console.log(mImages);
};

function fetchJSON() {
  decideJson();
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

console.log($("img.moreIndicator").hasClass("rot90"));

$(document).ready(function() {
  $("img.moreIndicator").click(function() {
    if ($("img.moreIndicator").hasClass("rot90")) {
      $("img.moreIndicator").removeClass("rot90");
      $("img.moreIndicator").addClass("rot270");
    } else {
      $("img.moreIndicator").removeClass("rot270");
      $("img.moreIndicator").addClass("rot90");
    }
    $("div.details").fadeToggle();
  });

  
  $("#nextPhoto").click(function() {
    if(mCurrentIndex >= mImages.length)
      {
        mCurrentIndex = 0;
      }
      
   var imgElement = $("#photo");
   imgElement.attr("src", mImages[mCurrentIndex].img);
 
   $(".location").text("Location: " + mImages[mCurrentIndex].location);
   $(".description").text("Description: " + mImages[mCurrentIndex].description);
   $(".date").text("Date: " + mImages[mCurrentIndex].date);
 
     mCurrentIndex++;
  });

  $("#prevPhoto").click(function() {
    if(mCurrentIndex > mImages.length)
      {
        mCurrentIndex = 0;
      }
      
   var imgElement = $("#photo");
   imgElement.attr("src", mImages[mCurrentIndex].img);
 
   $(".location").text("Location: " + mImages[mCurrentIndex].location);
   $(".description").text("Description: " + mImages[mCurrentIndex].description);
   $(".date").text("Date: " + mImages[mCurrentIndex].date);
 
     mCurrentIndex--;
  });
});


function decideJson() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const json = urlParams.get('json');
  
  if (json === "images-short.json") {
    mUrl = "images-short.json";
  } else {
    mUrl = "images.json";
  }
  
  console.log(mUrl);
};
