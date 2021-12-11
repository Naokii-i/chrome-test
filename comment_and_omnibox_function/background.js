
//一応入れているが、下はなくても動くかもしれない
chrome.omnibox.onInputStarted.addListener(() => {
    console.log("User has started interacting with me.")
  });

//suggestionの一番上にくる文言
chrome.omnibox.setDefaultSuggestion({
  description: '<match>↓</match>あたま固くなってないかい？',
}); 

//こちらは見本から抜粋したREADMEを読んでください。ただ結果的にコメントアウトしました　最後は消していいです
// chrome.omnibox.onInputChanged.addListener(
//   function(text, suggest)
//   {
//       text = text.replace(" ", "");

//       // Add suggestions to an array
//       var suggestions = [];
//       suggestions.push({ content: text + " 違う意見をみてみる" , description: text + " 違う意見をみてみる" });

//       // Set first suggestion as the default suggestion
//       chrome.omnibox.setDefaultSuggestion({description:suggestions[0].description});

//       // Set first suggestion as the default suggestion
//       chrome.omnibox.setDefaultSuggestion({description: text + "違うオピニオンをみてみる"});

      
//       // Remove the first suggestion from the array since we just suggested it
//       suggestions.shift();

//       // Suggest the remaining suggestions
//       suggest(suggestions);
//   }
// );


//omniboxにテキストいれて第二言語のワードと一緒位検索できる。日本語部分は最後仕上げる
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log('inputChanged: ' + text);
  
  suggest([
    {content: text + " 違う意見", description: text + " さまざまな意見"},
    {content: text + " 思い込みに注意", description: text + " 思い込みに注意"}
  ]);
});

//READMEに乗っているomniboxの見本からコピペしたもの
chrome.omnibox.onInputEntered.addListener(
  function(text)
  {
      chrome.tabs.getSelected(null, function(tab)
      {
          var url;
          if (text.substr(0, 7) == 'http://') {
              url = text;

          // If text does not look like a URL, user probably selected the default suggestion, eg reddit.com for your example
          } else {
              url = 'https://www.google.com/search?q=' + text;
          }
          chrome.tabs.update(tab.id, {url: url});
      });
  }
);
