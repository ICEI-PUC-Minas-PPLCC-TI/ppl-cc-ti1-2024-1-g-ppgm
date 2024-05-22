import { getCollections, read, remove, rules } from "./crud.js";

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
    setItems();
});

function populateSidebar() {
    const sidebarItems = getCollections();
    const sidebarContainer = document.getElementById('sidebar');

    sidebarItems.forEach(item => {
        const a = document.createElement('a');
        a.textContent = item;
        a.classList.add('sidebar-item');
        sidebarContainer.appendChild(a);
    });
}

function toggleSidebar(width) {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const button = document.getElementById("open-btn");

    if (sidebar.style.width === "0px" || sidebar.style.width === "") {
        sidebar.style.width = `${width}px`;
    } else {
        sidebar.style.width = "0";
    }
}

function setItems() {
    document.querySelectorAll(".sidebar-item").forEach((item) => {
        item.addEventListener('click', async (event) => {
            const collectionDiv = document.getElementById('collection-list');
            document.getElementById('collection-title').textContent = item.textContent;

            const createListItem = (item) => {
                const li = document.createElement('li');
                li.classList.add('collection-item');
                
                const itemId = document.createElement('span');
                itemId.textContent = `ID: ${item[rules[event.target.textContent].id]}`;
                itemId.classList.add('item-id');
        
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');
        
                const editButton = document.createElement('button');
                editButton.innerHTML = '✎';
                editButton.classList.add('edit-button');
                editButton.onclick = () => {
                    window.location.href = `editItem.html?id=${item[rules[event.target.textContent].id]}&collection=${event.target.textContent}`;
                };
        
                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '&times;';
                deleteButton.classList.add('delete-button');
                deleteButton.onclick = async () => {
                    try {
                        await remove(event.target.textContent, item[rules[event.target.textContent].id]);
                        li.remove();
                    } catch (error) {
                        console.error('Error removing item:', error);
                    }
                };
        
                buttonContainer.appendChild(editButton);
                buttonContainer.appendChild(deleteButton);
        
                li.appendChild(itemId);
                li.appendChild(buttonContainer);
        
                return li;
            };

            await read(event.target.textContent)
                .then((list) => {
                    collectionDiv.textContent = '';

                    const addButton = document.createElement('button');
                    addButton.innerHTML = '&plus;';
                    addButton.classList.add('add-button');
                    addButton.onclick = () => { 
                        window.location.href = `editItem.html?collection=${event.target.textContent}`;
                    }

                    list.forEach(item => {
                        const li = createListItem(item);
                        collectionDiv.appendChild(li);
                    });

                    collectionDiv.appendChild(addButton);
                })
        })
    })
}
