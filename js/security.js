(function () {
  if (window.top !== window.self) {
    try {
      window.top.location.replace(window.location.href);
    } catch (e) {
      window.location.replace("about:blank");
    }
  }

  function hardenBlankLinks() {
    var links = document.querySelectorAll('a[target="_blank"]');
    for (var i = 0; i < links.length; i++) {
      var parts = (links[i].getAttribute("rel") || "").toLowerCase().split(/\s+/);
      var rel = [];
      for (var j = 0; j < parts.length; j++) {
        if (parts[j] && rel.indexOf(parts[j]) === -1) rel.push(parts[j]);
      }
      if (rel.indexOf("noopener") === -1) rel.push("noopener");
      if (rel.indexOf("noreferrer") === -1) rel.push("noreferrer");
      links[i].setAttribute("rel", rel.join(" "));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hardenBlankLinks);
  } else {
    hardenBlankLinks();
  }
})();
