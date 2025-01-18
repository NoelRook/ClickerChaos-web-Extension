// Function to jumble the text
function jumbleText(text) {
    let jumbledText = text.split('');
    for (let i = jumbledText.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [jumbledText[i], jumbledText[j]] = [jumbledText[j], jumbledText[i]];
    }
    return jumbledText.join('');
  }
  
  // Listen for input events on all editable elements
  document.addEventListener('input', function(event) {
    if (event.target.tagName === 'TEXTAREA' || (event.target.tagName === 'INPUT' && event.target.type === 'text')) {
      const originalText = event.target.value;
      const jumbled = jumbleText(originalText);
      event.target.value = jumbled;
    }
  });
  