document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const tableBody = document.querySelector("#registrationsTable tbody");

  async function fetchAndRender(program = "all") {
    let url = "http://localhost:3001/api/form";
    if (program !== "all") {
      url += `?program_choice=${encodeURIComponent(program)}`;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      const registrations = result.data || [];

      // Clear existing rows
      tableBody.innerHTML = "";

      if (registrations.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.innerHTML = `<td colspan="7">Aucune inscription trouvée.</td>`;
        tableBody.appendChild(noDataRow);
        return;
      }

      registrations.forEach((entry) => {
        const children = JSON.parse(entry.children_info || "[]");
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${entry.parent_name}</td>
          <td>${children.map(c => `${c.name} (${c.age})`).join(", ")}</td>
          <td>${children.length}</td>
          <td>${entry.program_choice}</td>
          <td>${entry.email}</td>
          <td>${entry.phone_number}</td>
          <td>${new Date(entry.submitted_at).toLocaleDateString("fr-FR")}</td>
        `;

        tableBody.appendChild(row);
      });

    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  }

  // Attach click listeners to buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active state
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    
      const selectedProgram = button.dataset.program;
      fetchAndRender(selectedProgram);
    });
  });

  // Initial load
  fetchAndRender("all");
});

//loading stats 
async function loadStats() {
  try {
    const response = await fetch("http://localhost:3001/api/form");
    const result = await response.json();
    const registrations = result.data || [];

    // Update total registrations
    document.getElementById("total-registrations").textContent = registrations.length;

    // Total kids count
    let totalKids = 0;
    const campCounts = {
      nature: 0,
      tech: 0,
      arts: 0,
      sports: 0,
      science: 0,
    };

    registrations.forEach((entry) => {
      try {
        const children = JSON.parse(entry.children_info);
        totalKids += children.length;

        const program = entry.program_choice.toLowerCase();
        if (campCounts[program] !== undefined) {
          campCounts[program] += 1;
        }
      } catch (e) {
        console.warn("Error parsing children_info:", e);
      }
    });

    document.getElementById("total-kids").textContent = totalKids;
    document.getElementById("camp-nature").textContent = campCounts.nature;
    document.getElementById("camp-tech").textContent = campCounts.tech;
    document.getElementById("camp-arts").textContent = campCounts.arts;
    document.getElementById("camp-sports").textContent = campCounts.sports;
    document.getElementById("camp-science").textContent = campCounts.science;
  } catch (error) {
    console.error("Failed to load stats:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadStats();
});
