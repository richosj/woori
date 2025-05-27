var body = document.body;
var header = document.getElementById("header");
var btnMobile = document.getElementById("btnMobile");
var gnb = document.getElementById("gnb");
var mobileMenuUL = document.querySelector("ul.mobile-menu");
var dropdownButtons = document.querySelectorAll(".dropdownButton");
var handleMobileButtonClick = function() {
  btnMobile.classList.toggle("active");
  body.classList.toggle("mobile-active");
};
var handleMobileMenuClick = function(event) {
  if (event.target && event.target.classList.contains("menuitem")) {
    event.preventDefault();
    var parentLi = event.target.parentElement;
    var siblings = parentLi.parentElement.children;
    Array.prototype.forEach.call(siblings, function(sibling) {
      if (sibling !== parentLi) {
        sibling.classList.remove("active");
      }
    });
    parentLi.classList.toggle("active");
  }
};
var handleGnbItemMouseOver = function() {
  header.classList.add("open");
};
var handleGnbItemMouseOut = function() {
  header.classList.remove("open");
};
var handleDropdownButtonClick = function(button, dropdownMenu, menuItems) {
  var isOpen = false;
  var toggleDropdown = function() {
    isOpen = !isOpen;
    button.setAttribute("aria-expanded", isOpen);
  };
  button.addEventListener("click", function(event) {
    event.stopPropagation();
    toggleDropdown();
  });
  button.addEventListener("keydown", function(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) toggleDropdown();
      menuItems[0].focus();
    }
  });
  menuItems.forEach(function(item, index) {
    item.addEventListener("keydown", function(event) {
      var actions = {
        ArrowDown: function() {
          event.preventDefault();
          menuItems[(index + 1) % menuItems.length].focus();
        },
        ArrowUp: function() {
          event.preventDefault();
          menuItems[(index - 1 + menuItems.length) % menuItems.length].focus();
        },
        Escape: function() {
          toggleDropdown();
          button.focus();
        }
      };
      if (actions[event.key]) actions[event.key]();
    });
    item.addEventListener("click", function() {
      button.textContent = item.textContent;
      toggleDropdown();
    });
  });
  document.addEventListener("click", function(event) {
    if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) {
      if (isOpen) toggleDropdown();
    }
  });
};
function headers() {
  var breadcrumb = document.querySelector(".breadcrumb");
  var breadcrumbTop = header.offsetHeight;
  var lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
  function updateScrollDirection() {
    var currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    var isScrollingDown = currentScrollY > lastScrollY;
    if (header.classList.contains("_sub") && breadcrumb) {
      if (currentScrollY >= breadcrumbTop) {
        if (isScrollingDown) {
          header.classList.add("hide");
          header.classList.remove("up");
        } else {
          header.classList.remove("hide");
          if (currentScrollY > 0) header.classList.add("up");
          else header.classList.remove("up");
        }
      } else {
        header.classList.remove("hide", "up");
      }
    } else {
      if (isScrollingDown) {
        header.classList.add("hide");
        header.classList.remove("up");
      } else {
        header.classList.remove("hide");
        if (currentScrollY > 0) header.classList.add("up");
        else header.classList.remove("up");
      }
    }
    lastScrollY = currentScrollY;
  }
  document.addEventListener("DOMContentLoaded", function() {
    lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (header.classList.contains("_sub") && breadcrumb) {
      var _breadcrumbTop = breadcrumb.getBoundingClientRect().top + window.scrollY;
      if (lastScrollY >= _breadcrumbTop) header.classList.add("up", "hide");
      else header.classList.remove("up", "hide");
    } else {
      if (lastScrollY > 50) header.classList.add("up", "hide");
      else header.classList.remove("up", "hide");
    }
  });
  window.addEventListener("scroll", updateScrollDirection);
}
function updateMobileMenu() {
  if (!gnb || !mobileMenuUL) return;
  mobileMenuUL.innerHTML = gnb.innerHTML;
  var gnbLiElements = document.querySelectorAll("#gnb .gnb--li1");
  var firstListUl = document.querySelector("ul.first-list");
  if (!firstListUl) return;
  gnbLiElements.forEach(function(gnbLi) {
    var firstATag = gnbLi.querySelector("a");
    if (firstATag) {
      var newLi = document.createElement("li");
      newLi.appendChild(firstATag.cloneNode(true));
      firstListUl.appendChild(newLi);
    }
  });
}
var smoothscroll = {
  passive: function() {
    var supportsPassive = false;
    try {
      document.addEventListener("test", null, {
        get passive() {
          supportsPassive = true;
        }
      });
    } catch (e) {
    }
    return supportsPassive;
  },
  init: function() {
    var userAgent = navigator.userAgent.toLowerCase();
    var isMobile = /iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    var isMac = /macintosh|mac os x/i.test(userAgent);
    if (isMobile || isMac) return;
    if (this.passive()) {
      window.addEventListener("wheel", this.scrolling, { passive: false });
    } else {
      window.addEventListener("mousewheel", this.scrolling);
      window.addEventListener("DOMMouseScroll", this.scrolling);
    }
  },
  destroy: function() {
    if (this.passive()) {
      window.removeEventListener("wheel", this.scrolling);
    } else {
      window.removeEventListener("mousewheel", this.scrolling);
      window.removeEventListener("DOMMouseScroll", this.scrolling);
    }
    gsap.killTweensOf(window, { scrollTo: true });
  },
  scrolling: function(event) {
    event.preventDefault();
    var scrollTime = 1;
    var distanceOffset = 4.5;
    var scrollDistance = window.innerHeight / distanceOffset;
    var delta = event.wheelDelta / 120 || -event.deltaY / 4;
    var scrollTop = document.documentElement.scrollTop;
    var finalScroll = scrollTop - parseInt(delta * scrollDistance);
    gsap.to(window, {
      duration: scrollTime,
      scrollTo: { y: finalScroll, autoKill: true },
      ease: "power3.out",
      overwrite: 5
    });
  }
};
var init = function() {
  smoothscroll.init();
  headers();
  updateMobileMenu();
  var btnTop = document.getElementById("btnTop");
  if (btnTop) {
    btnTop.addEventListener("click", function() {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0, autoKill: true }
      });
    });
  }
  if (btnMobile) {
    btnMobile.addEventListener("click", handleMobileButtonClick);
  }
  if (mobileMenuUL) {
    mobileMenuUL.addEventListener("click", handleMobileMenuClick);
  }
  var gnbItems = document.querySelectorAll("#gnb > li");
  gnbItems.forEach(function(item) {
    item.addEventListener("mouseover", handleGnbItemMouseOver);
    item.addEventListener("mouseout", handleGnbItemMouseOut);
  });
  dropdownButtons.forEach(function(button) {
    var dropdownMenu = document.getElementById(button.getAttribute("aria-controls"));
    if (dropdownMenu) {
      var menuItems = dropdownMenu.querySelectorAll('[role="menuitem"]');
      handleDropdownButtonClick(button, dropdownMenu, menuItems);
    }
  });
};
document.addEventListener("DOMContentLoaded", init);
