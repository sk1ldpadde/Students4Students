// Create the offcanvas navbar for the mobile view of the website (only for the frontend)
(() => {
  // Use for better error handling
  ("use strict");

  // Select the navbarSideCollapse button by its ID
  const navbarSideCollapse = document.querySelector<HTMLButtonElement>(
    "#navbarSideCollapse"
  );

  // Select the offcanvas-collapse div by its Class
  const offcanvasCollapse = document.querySelector<HTMLDivElement>(
    ".offcanvas-collapse"
  );

  // Check if both the navbarSideCollapse button and offcanvasCollapse div are found in the document
  if (navbarSideCollapse && offcanvasCollapse) {
    // Add a click event listener to the navbarSideCollapse button
    navbarSideCollapse.addEventListener("click", () => {
      // Toggle the "open" class on the offcanvasCollapse div, which controls its visibility
      offcanvasCollapse.classList.toggle("open");
    });
  }
})();
