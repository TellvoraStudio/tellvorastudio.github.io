document.addEventListener("DOMContentLoaded", function () {
  var forms = document.querySelectorAll('form[action="https://api.web3forms.com/submit"]');
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (e) {
      var form = e.currentTarget;
      var bot = form.querySelector('input[name="botcheck"]');
      if (bot && bot.checked) {
        e.preventDefault();
        return;
      }

      var fields = form.querySelectorAll("input, textarea, select");
      for (var j = 0; j < fields.length; j++) {
        var el = fields[j];
        if (typeof el.setCustomValidity === "function") el.setCustomValidity("");
        if (!el.name || el.name === "access_key" || el.name === "botcheck" || el.type === "hidden") continue;
        var max = el.getAttribute("maxlength");
        if (max && el.value && el.value.length > parseInt(max, 10)) {
          e.preventDefault();
          el.setCustomValidity("This field is too long.");
          el.reportValidity();
          return;
        }
      }

      if (typeof form.checkValidity === "function" && !form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      }
    });
  }
});
