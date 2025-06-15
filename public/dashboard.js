document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const tableRows = document.querySelectorAll("tbody tr");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const program = button.dataset.program;

      tableRows.forEach((row) => {
        const programCell = row.children[2].textContent; // Program column

        if (program === "all" || programCell === program) {
          row.style.display = "";
          row.classList.add("fade-in");
        } else {
          row.style.display = "none";
        }
      });
    });
  });
});
