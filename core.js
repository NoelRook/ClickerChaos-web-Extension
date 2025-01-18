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


//amits shit

let captchaCooldown = false;  // Flag to prevent multiple CAPTCHA popups in a short time
let captchaActive = false;  // Flag to track if a CAPTCHA is currently displayed

document.addEventListener("click", function (event) {
    if (captchaCooldown || captchaActive || event.target.id === 'captchaInput') {
        return;  // Prevent showing CAPTCHA if in cooldown period, CAPTCHA is already active, or if input field is clicked
    }
    event.preventDefault();  // Prevent the default click action
    showCaptcha();  // Show CAPTCHA when a click happens
}, true);

function getRandomLongWord() {
    const words = [
        "antidisestablishmentarianism",
        "floccinaucinihilipilification",
        "supercalifragilisticexpialidocious",
        "pneumonoultramicroscopicsilicovolcanoconiosis",
        "hippopotomonstrosesquipedaliophobia",
        "thyroparathyroidectomized",
        "incomprehensibilities",
        "uncharacteristically",
        "counterproductive",
        "overcompensations"
    ];

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function showCaptcha() {
    if (captchaCooldown || captchaActive) {
        return;  // Prevent showing CAPTCHA if we're in cooldown period or if a CAPTCHA is already active
    }

    captchaActive = true;  // Set CAPTCHA as active

    // Create CAPTCHA div
    const captchaDiv = document.createElement('div');
    captchaDiv.style.position = 'fixed';
    captchaDiv.style.padding = '20px';
    captchaDiv.style.backgroundColor = 'white';
    captchaDiv.style.zIndex = '10000';  // Ensure it's above everything else
    captchaDiv.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    captchaDiv.style.borderRadius = '8px';
    captchaDiv.style.display = 'flex';
    captchaDiv.style.flexDirection = 'column';
    captchaDiv.style.alignItems = 'center';

    // Generate random positions within the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const randomLeft = Math.floor(Math.random() * (viewportWidth - 250));  // Subtract width of the CAPTCHA box
    const randomTop = Math.floor(Math.random() * (viewportHeight - 200));  // Subtract height of the CAPTCHA box

    captchaDiv.style.left = `${randomLeft}px`;
    captchaDiv.style.top = `${randomTop}px`;

    // Create the CAPTCHA content with weird font and strikethrough effect
    const randomWord = getRandomLongWord();
    const wordContainer = document.createElement('p');
    wordContainer.innerHTML = `Type the word: <span class="weird-font">${randomWord}</span>`;
    wordContainer.style.marginBottom = '10px';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'captchaInput';
    input.style.padding = '10px';
    input.style.fontSize = '18px';
    input.style.width = '200px';
    input.style.marginBottom = '10px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';
    input.style.zIndex = '10001';  // Make sure the input is above everything else

    const submitButton = document.createElement('button');
    submitButton.id = 'submitCaptcha';
    submitButton.textContent = 'Submit';
    submitButton.style.padding = '10px 15px';
    submitButton.style.fontSize = '16px';
    submitButton.style.cursor = 'pointer';

    captchaDiv.appendChild(wordContainer);
    captchaDiv.appendChild(input);
    captchaDiv.appendChild(submitButton);
    document.body.appendChild(captchaDiv);

    // Add CSS for the weird font, wavy effect, and preventing selection (uncopyable)
    const style = document.createElement('style');
    style.innerHTML = `
        .weird-font {
            font-family: 'Comic Sans MS', 'Arial', sans-serif;
            font-weight: bold;
            font-size: 30px;
            color: black;
            text-decoration: line-through;
            user-select: none;  /* Prevent text selection */
            -webkit-user-select: none;  /* For Safari */
            -moz-user-select: none;  /* For Firefox */
            -ms-user-select: none;  /* For IE/Edge */
            display: inline-block;
            animation: wave 1.5s infinite linear;
            transform-origin: center;
        }

        @keyframes wave {
            0% {
                transform: rotate(0deg) translateX(0) translateY(0);
            }
            20% {
                transform: rotate(-10deg) translateX(-5px) translateY(3px);
            }
            40% {
                transform: rotate(10deg) translateX(5px) translateY(-3px);
            }
            60% {
                transform: rotate(-5deg) translateX(-5px) translateY(3px);
            }
            80% {
                transform: rotate(5deg) translateX(5px) translateY(-3px);
            }
            100% {
                transform: rotate(0deg) translateX(0) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Disable interactions with the rest of the page (add overlay)
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '9999';  // Ensure it sits above everything else but below the CAPTCHA
    overlay.style.pointerEvents = 'all';  // Block clicks on the overlay
    document.body.appendChild(overlay);

    // Focus on the input field for better user experience
    input.focus();

    // Handle Submit
    submitButton.addEventListener("click", function() {
        const inputValue = input.value;
        if (inputValue.toLowerCase() === randomWord.toLowerCase()) {
            // Correct answer: Remove the CAPTCHA and enter cooldown
            document.body.removeChild(captchaDiv);  // Remove CAPTCHA immediately
            document.body.removeChild(overlay);  // Remove the overlay to re-enable interactions
            alert("CAPTCHA passed!");

            // Start the cooldown to prevent further popups for 30 seconds
            captchaCooldown = true;
            setTimeout(() => {
                captchaCooldown = false;  // Re-enable CAPTCHA prompt after 30 seconds
            }, 30000);  // 30 seconds cooldown

            captchaActive = false;  // Mark CAPTCHA as inactive after it's solved
        } else {
            alert("Incorrect CAPTCHA!");
        }
    });
}

