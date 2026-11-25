"use strict";

(function () {
  var checkboxKeys = [
    "stickyScroll",
    "middleClick",
    "ctrlClick",
    "sameSpeed",
    "shouldCap",
    "innerScroll",
    "scrollOnLinks"
  ];

  var numberKeys = [
    "dragThreshold",
    "moveThreshold",
    "moveSpeed",
    "capSpeed"
  ];

  var elements = {};
  var savedStatus = document.getElementById("savedStatus");
  var resetBtn = document.getElementById("resetBtn");
  var savedTimer = null;

  checkboxKeys.concat(numberKeys).forEach(function (key) {
    elements[key] = document.getElementById(key);
  });

  function showSaved() {
    savedStatus.classList.add("visible");
    clearTimeout(savedTimer);
    savedTimer = setTimeout(function () {
      savedStatus.classList.remove("visible");
    }, 1500);
  }

  function updateDisabledStates() {
    elements.dragThreshold.disabled = !elements.stickyScroll.checked;
    elements.capSpeed.disabled = !elements.shouldCap.checked;
  }

  function applyToUI(values) {
    checkboxKeys.forEach(function (key) {
      elements[key].checked = Boolean(values[key]);
    });
    numberKeys.forEach(function (key) {
      elements[key].value = values[key] === "" ? "" : String(values[key]);
    });
    updateDisabledStates();
  }

  function normalizeNumber(key, rawValue) {
    var trimmed = String(rawValue).trim();

    if (key === "capSpeed") {
      if (trimmed === "") {
        return "";
      }
      var cap = Number(trimmed);
      if (Number.isNaN(cap)) {
        return defaults.capSpeed;
      }
      return cap < 1 ? 1 : cap;
    }

    if (key === "moveSpeed") {
      if (trimmed === "") {
        return 1;
      }
      var speed = Number(trimmed);
      if (Number.isNaN(speed)) {
        return defaults.moveSpeed;
      }
      return speed <= 0 ? 1 : speed;
    }

    // dragThreshold / moveThreshold
    if (trimmed === "") {
      return defaults[key];
    }
    var num = Number(trimmed);
    if (Number.isNaN(num)) {
      return defaults[key];
    }
    return num < 0 ? 0 : num;
  }

  function saveOption(key, value) {
    if (value === defaults[key]) {
      chrome.storage.local.remove(key, showSaved);
    } else {
      var payload = {};
      payload[key] = value;
      chrome.storage.local.set(payload, showSaved);
    }
  }

  checkboxKeys.forEach(function (key) {
    elements[key].addEventListener("change", function () {
      updateDisabledStates();
      saveOption(key, elements[key].checked);
    });
  });

  numberKeys.forEach(function (key) {
    elements[key].addEventListener("change", function () {
      var normalized = normalizeNumber(key, elements[key].value);
      elements[key].value = normalized === "" ? "" : String(normalized);
      saveOption(key, normalized);
    });
  });

  resetBtn.addEventListener("click", function () {
    chrome.storage.local.clear(function () {
      applyToUI(defaults);
      showSaved();
    });
  });

  chrome.storage.onChanged.addListener(function (changes, area) {
    if (area !== "local") return;
    for (var key in changes) {
      if (!(key in elements)) continue;
      var change = changes[key];
      var value = "newValue" in change ? change.newValue : defaults[key];
      if (checkboxKeys.indexOf(key) !== -1) {
        elements[key].checked = Boolean(value);
      } else {
        elements[key].value = value === "" ? "" : String(value);
      }
    }
    updateDisabledStates();
  });

  chrome.storage.local.get(defaults, function (values) {
    applyToUI(values);
  });
})();
