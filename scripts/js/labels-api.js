// 1. Go on you labels page:
// eg.: https://github.com/EbookFoundation/free-programming-books/labels
//
// 2. Paste this script in your console / save as browser bookmarklet, and then execute it
// 3. Copy the output / download files and now you can import it using https://github.com/popomore/github-labels !
//
// How to bookmark: https://gist.github.com/caseywatts/c0cec1f89ccdb8b469b1

// Taken from discussion of: https://gist.github.com/MoOx/93c2853fee760f42d97f
//eslint-ignore
function isValidGitHubURL(url) {
  const parsedURL = new URL(url);
  const allowedHosts = ["github.com"];

  return allowedHosts.includes(parsedURL.host);
}

(function(undefined) {

  var reposlug;
  try {
    // Incomplete URL substring sanitization
    // window.location.hostname.indexOf("github.com")
    // ->
    reposlug = window.location.pathname.match(/([^\/]+\/[^\/]+)\/labels/i)[1].toLowerCase().replace(/\//ig, "__");
  } catch(e) { }
  if (!reposlug) {
     throw "It seems that you are not in a github.com repo labels page: " + window.location;
  }

  var labels = [].slice.call(document.querySelectorAll(".js-label-link")).map(function(el) {
    var styles = window.getComputedStyle(el),
        form = el.closest('.js-labels-list-item').querySelector('.js-label-form');
    return {
      name: (el.textContent || el.innerText).trim(), /* required */
      description: el.getAttribute("title") || el.getAttribute("aria-label") || form['label[description]'].value || null, /* optional */
      color: rgba2hex(styles.getPropertyValue("background-color")), /* required */
    };
  });
  var json = JSON.stringify(labels, null, 2), yaml = labels2yml(labels);

  var exts = (window.prompt("Choice download formats to save " +labels.length+ " labels.\n\n Options: json,yml,yaml\n\nCancel or leave empty to ignore.", "json,yml")||"").split(/\s*,\s*/);
  (exts.includes("json")) && save(reposlug+"__labels.json", "application/json", json);
  (exts.includes("yaml") || exts.includes("yml")) && save(reposlug+"__labels.yml", "application/yaml", yaml);

  return {
    labels: labels,
    jsonText: json,
    yamlText: yaml,
  };


  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  function rgba2hex(rgba) {
    rgba = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.*\d+)?\)$/);
    return rgba.slice(1,4).reduce(function(s, x){ return s + hex(x); }, "");
  }
  function save(filename, type, content) {
    const blob = new Blob([content], { type: type });
    const e = document.createEvent("MouseEvents");
    const a = document.createElement("a");
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = [type, a.download, a.href].join(":");
    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  function labels2yml(labels) {
    return labels.reduce(function(s, l){
      return s +"  - name: \"" +(l.name)+ "\"\n    description: \"" +(l.description||"")+ "\"\n    color: \"" +(l.color)+ "\"\n";
    }, "labels:\n");
  }
  }());
