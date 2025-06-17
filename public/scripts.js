
 const menuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Toggle menu on button click
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Change icon based on menu state
    const isOpen = navLinks.classList.contains("active");
    menuBtn.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

 








// bozi this part doesn't concern you
document.addEventListener("DOMContentLoaded", function () {
  const childName = document.getElementById("childName");
  const childAge = document.getElementById("childAge");
  const addButton = document.querySelector(".btn-add-child");
  const childrenContainer = document.getElementById("childrenContainer");

  // Store children data
  let children = [];

  addButton.addEventListener("click", () => {
    if (!childName.value || !childAge.value) {
      alert("Veuillez saisir le nom et l'âge");
      return;
    }

    const child = {
      name: childName.value.trim(),
      age: parseInt(childAge.value),
    };

    children.push(child);
    addChildToList(child);

    // Clear inputs
    childName.value = "";
    childAge.value = "";
    console.log(children);


  function addChildToList(child) {
    const childEntry = document.createElement("div");
    childEntry.className = "child-entry";
    childEntry.innerHTML = `
            <span class="child-info">${child.name} - ${child.age} ans</span>
            <button type="button" class="btn-remove">
                <i class="fas fa-times"></i>
            </button>
        `;

    const removeButton = childEntry.querySelector(".btn-remove");
    removeButton.addEventListener("click", () => {
      const index = children.findIndex(
        (c) => c.name === child.name && c.age === child.age
      );
      if (index > -1) {
        children.splice(index, 1);
      }
      childEntry.remove();
      console.log(children);
    });

    childrenContainer.appendChild(childEntry);
  }
});
//RETRIVE DATA FROM THE FORM
//do not touch this part
  // Handle form submission
  const form = document.getElementById("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add children data to the form data
    data.children_info = JSON.stringify(children);
    
    try {
      const response = await fetch("http://localhost:3001/api/form/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert(result.message);
      console.log(result.data);
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Une erreur s'est produite lors de l'envoi du formulaire.");
    }
  });
});