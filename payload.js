document.querySelectorAll('a').forEach(function(link){
  link.href='https://youtube.com';
});
var elements = document.body.querySelectorAll("*");
elements.forEach(function(element){
  if (element.innerText.includes("Search Results") || 
      element.innerText.includes("3 results were found for the search for")) {
    element.innerText = element.innerText.replace("Search Results", "Hi there what's up").replace("3 results were found for the search for", "Definitely not CF");
  }
});
