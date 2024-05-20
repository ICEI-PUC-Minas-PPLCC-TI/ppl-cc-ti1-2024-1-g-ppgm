import { getCollections } from "./crud.js";

document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');

    openBtn.addEventListener('click', function() {
        toggleSidebar(250);
    });

    closeBtn.addEventListener('click', function() {
        toggleSidebar(0);
    });

    populateSidebar();
});

function populateSidebar() {
    const sidebarItems = getCollections();
    console.log(sidebarItems)
    const sidebarContainer = document.getElementById('sidebar');

    sidebarItems.forEach(item => {
        const a = document.createElement('a');
        a.textContent = item;
        sidebarContainer.appendChild(a);
    });
}

function toggleSidebar(width) {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const button = document.getElementById("open-btn");

    // Check if sidebar is currently closed or not set (0 width)
    if (sidebar.style.width === "0px" || sidebar.style.width === "") {
        sidebar.style.width = `${width}px`;
        mainContent.style.marginLeft = `${width}px`;
        button.style.display = "none"; // Hide the open button
    } else {
        sidebar.style.width = "0";
        mainContent.style.marginLeft = "0";
        button.style.display = "block"; // Show the open button
    }
}
