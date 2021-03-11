document.addEventListener("turbolinks:load", function () {
  document.addEventListener(
    "focusin",
    function (event) {
      if (!event.target.classList.contains("textfield")) return;

      let { target: input } = event;

      input.placeholder = "";

      let label = input.previousElementSibling;
      label.style.visibility = "visible";
    },
    false
  );

  document.addEventListener(
    "focusout",
    function (event) {
      if (!event.target.classList.contains("textfield")) return;

      let { target: input } = event;

      let label = input.previousElementSibling;

      if (!input.value) label.style.visibility = "collapse";

      input.placeholder = label.innerHTML;
    },
    false
  );

  document.addEventListener(
    "change",
    function (event) {
      event.preventDefault();
      if (event.target.classList.contains("textfield")) showInputLabels();
    },
    false
  );

  document.addEventListener(
    "load",
    function (event) {
      event.preventDefault();
      showInputLabels();
    },
    false
  );

  const showInputLabels = () => {
    let textfields = document.getElementsByClassName("textfield");

    for (textfield of textfields) {
      let label = textfield.previousElementSibling;

      if (textfield.value) label.style.visibility = "visible";

      textfield.placeholder = label.innerHTML;
    }
  };
});
