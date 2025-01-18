var prevDOM = null;

//mouse function
var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';

const GIF_URL = 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjJ1Zm03Yjk0ejdvMmlhdjVjOTUzb3U1bmRvN2hsNmcxZ3h0Yjk5MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jUwpNzg9IcyrK/giphy.gif';


// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;

// Mouse listener for any move event on the current document.
document.addEventListener('mousemove', function (e) {

  var srcElement = e.srcElement;

  // Lets check if our underlying element is a DIV.
  if (srcElement.nodeName == 'DIV') {

    // For NPE checking, we check safely. We need to remove the class name
    // Since we will be styling the new one after.
    if (prevDOM != null) {
      prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
      // Remove the previously added image
      const prevImage = prevDOM.querySelector('img');
      if (prevImage) {
        prevImage.remove();
      }
    }

    // Add a visited class name to the element. So we can style it.
    srcElement.classList.add(MOUSE_VISITED_CLASSNAME);
    
    // Create an image element
    const img = document.createElement('img');
    img.src = GIF_URL;
    img.alt = 'GIF Image';
    img.style.width = '100%';
    img.style.height = '100%';
    

    // Append the image to the DIV
    srcElement.appendChild(img);

    // The current element is now the previous. So we can remove the class
    // during the next iteration.
    prevDOM = srcElement;
  }
}, false);
