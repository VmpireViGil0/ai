// Select all h2 elements with the class "lead"
document.querySelectorAll('h2.lead').forEach(function(element) {
  // Check if the element has text content
  if (element.childNodes.length) {
    element.childNodes.forEach(function(node) {
      // Check if the node is a text node
      if (node.nodeType === Node.TEXT_NODE) {
        // Replace specific words
        const updatedText = node.textContent
          .replace(/Search Results/g, "")
          .replace(/3 results were found for the search for /g, ""); // Note the space at the end
        
        // Update the text content without affecting HTML tags
        if (updatedText !== node.textContent) {
          const newNode = document.createTextNode(updatedText);
          element.replaceChild(newNode, node);
        }
      }
    });
  }
});
