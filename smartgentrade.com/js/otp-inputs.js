/*
 * OTP boxes (.otp-field): auto-advance on input, backspace/arrow navigation,
 * and paste / SMS autofill of the whole code into any box.
 */
(function () {
  function init() {
    var fields = Array.prototype.slice.call(document.querySelectorAll(".otp-field"));
    if (!fields.length) return;

    fields.forEach(function (f, i) {
      f.setAttribute("inputmode", "numeric");
      f.setAttribute("autocomplete", i === 0 ? "one-time-code" : "off");
      // Allow a multi-character value to arrive (paste/autofill); we spread it ourselves.
      f.maxLength = fields.length;
    });

    function fillFrom(start, text) {
      var digits = String(text || "").replace(/\D/g, "").split("");
      if (!digits.length) return;
      var i = start;
      while (digits.length && i < fields.length) {
        fields[i].value = digits.shift();
        i++;
      }
      var next = Math.min(i, fields.length - 1);
      fields[next].focus();
      fields[next].select && fields[next].select();
      if (i >= fields.length) fields[fields.length - 1].blur();
    }

    fields.forEach(function (f, idx) {
      f.addEventListener("input", function () {
        var v = f.value.replace(/\D/g, "");
        if (v.length > 1) {
          f.value = "";
          fillFrom(idx, v);
          return;
        }
        f.value = v;
        if (v && idx < fields.length - 1) fields[idx + 1].focus();
      });

      f.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !f.value && idx > 0) {
          e.preventDefault();
          fields[idx - 1].value = "";
          fields[idx - 1].focus();
        } else if (e.key === "ArrowLeft" && idx > 0) {
          e.preventDefault();
          fields[idx - 1].focus();
        } else if (e.key === "ArrowRight" && idx < fields.length - 1) {
          e.preventDefault();
          fields[idx + 1].focus();
        }
      });

      f.addEventListener("focus", function () {
        f.select && f.select();
      });

      f.addEventListener("paste", function (e) {
        var text = (e.clipboardData || window.clipboardData).getData("text");
        e.preventDefault();
        // A full code always fills from the first box; a partial one fills from here.
        var digits = String(text || "").replace(/\D/g, "");
        fillFrom(digits.length >= fields.length ? 0 : idx, digits);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
