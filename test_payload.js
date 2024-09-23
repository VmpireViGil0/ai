// Change all anchor links to point to YouTube
document.querySelectorAll('a').forEach(function(link) {
  link.href = 'https://youtube.com';
});

// Replace specific text in elements while preserving their design
var elements = document.body.querySelectorAll("*");
elements.forEach(function(element) {
  if (element.textContent.includes("Search Results") || 
      element.textContent.includes("3 results were found for the search for")) {
    element.textContent = element.textContent
      .replace("Search Results", "")
      .replace("3 results were found for the search for", "");
  }
});
