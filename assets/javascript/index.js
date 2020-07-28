"use strict";

var anchorForId = function anchorForId(id) {
  var anchor = document.createElement("a");
  anchor.className = "header-link";
  anchor.href = "#" + id;
  anchor.innerHTML = "<span class=\"sr-only\">Permalink</span><svg class=\"octicon octicon-link\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg>";
  anchor.title = "Permalink";
  return anchor;
};

var linkifyAnchors = function linkifyAnchors(level, containingElement) {
  var headers = containingElement.getElementsByTagName("h" + level);

  for (var h = 0; h < headers.length; h++) {
    var header = headers[h];

    if (typeof header.id !== "undefined" && header.id !== "") {
      header.className += " header";
      header.appendChild(anchorForId(header.id));
    }
  }
};

var setupSidebarToggle = function setupSidebarToggle() {
  var toggleClass = " active";
  var toggler = document.querySelector("#toggler");
  var wrapper = document.querySelector("#wrapper");
  toggler.addEventListener("click", function (e) {
    e.preventDefault();

    if (wrapper.className.indexOf(toggleClass) > -1) {
      wrapper.className = wrapper.className.replace(toggleClass, "");
    } else {
      wrapper.className += toggleClass;
    }
  });

  if (window.location.pathname.indexOf("/software/api/runner.html") > -1) {
    toggler.style.display = 'none';
  }
};

window.addEventListener("DOMContentLoaded", function () {
  var contentBlock = document.querySelector("article");

  if (!contentBlock) {
    return;
  }

  for (var level = 2; level <= 3; level++) {
    linkifyAnchors(level, contentBlock);
  }

  setupSidebarToggle();
});

(function (document, history, location) {
  var HISTORY_SUPPORT = !!(history && history.pushState);
  var anchorScrolls = {
    ANCHOR_REGEX: /^#[^ ]+$/,
    OFFSET_HEIGHT_PX: 60,

    /**
     * Establish events, and fix initial scroll position if a hash is provided.
     */
    init: function init() {
      this.scrollToCurrent();
      window.addEventListener("hashchange", this.scrollToCurrent.bind(this));
      document.body.addEventListener("click", this.delegateAnchors.bind(this));
    },

    /**
     * Return the offset amount to deduct from the normal scroll position.
     * Modify as appropriate to allow for dynamic calculations
     */
    getFixedOffset: function getFixedOffset() {
      return this.OFFSET_HEIGHT_PX;
    },

    /**
     * If the provided href is an anchor which resolves to an element on the
     * page, scroll to it.
     * @param  {String} href
     * @return {Boolean} - Was the href an anchor.
     */
    scrollIfAnchor: function scrollIfAnchor(href, pushToHistory) {
      var match, rect, anchorOffset;

      if (!this.ANCHOR_REGEX.test(href)) {
        return false;
      }

      match = document.getElementById(href.slice(1));

      if (match) {
        rect = match.getBoundingClientRect();
        anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
        window.scrollTo(window.pageXOffset, anchorOffset); // Add the state to history as-per normal anchor links

        if (HISTORY_SUPPORT && pushToHistory) {
          history.pushState({}, document.title, location.pathname + href);
        }
      }

      return !!match;
    },

    /**
     * Attempt to scroll to the current location's hash.
     */
    scrollToCurrent: function scrollToCurrent() {
      this.scrollIfAnchor(window.location.hash);
    },

    /**
     * If the click event's target was an anchor, fix the scroll position.
     */
    delegateAnchors: function delegateAnchors(e) {
      var elem = e.target;

      if (elem.nodeName === "A" && this.scrollIfAnchor(elem.getAttribute("href"), true)) {
        e.preventDefault();
      }
    }
  };
  window.addEventListener("DOMContentLoaded", anchorScrolls.init.bind(anchorScrolls));
})(window.document, window.history, window.location);
//# sourceMappingURL=index.js.map
