function getYoutubeId (url, opts) {
    if (opts == undefined) {
      opts = {fuzzy: true};
    }

    if (/youtu\.?be/.test(url)) {

      // Look first for known patterns
      var i;
      var patterns = [
        /youtu\.be\/([^#\&\?]{11})/,  // youtu.be/<id>
        /\?v=([^#\&\?]{11})/,         // ?v=<id>
        /\&v=([^#\&\?]{11})/,         // &v=<id>
        /embed\/([^#\&\?]{11})/,      // embed/<id>
        /\/v\/([^#\&\?]{11})/         // /v/<id>
      ];

      // If any pattern matches, return the ID
      for (i = 0; i < patterns.length; ++i) {
        if (patterns[i].test(url)) {
          return patterns[i].exec(url)[1];
        }
      }

      if (opts.fuzzy) {
        // If that fails, break it apart by certain characters and look
        // for the 11 character key
        var tokens = url.split(/[\/\&\?=#\.\s]/g);
        for (i = 0; i < tokens.length; ++i) {
          if (/^[^#\&\?]{11}$/.test(tokens[i])) {
            return tokens[i];
          }
        }
      }
    }

    return null;
  }

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // console.log('TLDRTube Ready', location.href, getYoutubeId(location.href));

      setTimeout(() => {
        const parentElement = document.querySelector('#end');
        const linkElement = document.createElement('a');
        linkElement.href = 'https://tldr.tube/' + getYoutubeId(location.href);
        linkElement.style = 'filter: saturate(5)  hue-rotate(71deg); font-size: 22px; position: relative; left: -20px; top: 0px; text-decoration: none;';
        linkElement.textContent = '▶️';
        linkElement.target = '_blank';

        parentElement.insertBefore(linkElement, parentElement.firstChild);
      }, 555);
    }
  }, 10);
});
