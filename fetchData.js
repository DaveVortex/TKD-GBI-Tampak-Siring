// Function to fetch congregation data from JSON file
async function fetchCongregationData() {
    const response = await fetch('data-jemaat.json');
    return await response.json();
}

// Function to render congregation list
async function renderCongregationList(congregations) {
    const listContainer = document.getElementById("congregationList");
    listContainer.innerHTML = ""; // Clear existing list

    congregations.forEach(congregation => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${congregation.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">${congregation.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${formatDate(congregation.dob)}</td>
            <td class="px-6 py-4 whitespace-nowrap">${formatBranch(congregation.branch)}</td>
            <td class="px-6 py-4 whitespace-nowrap">${congregation.baptized ? 'Sudah baptis' : ''}</td>
        `;
        listContainer.appendChild(row);
    });
}

// Function to format date (dd/mm/yyyy to dd Month yyyy)
function formatDate(dateString) {
    const [day, month, year] = dateString.split("/");
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
}

// Function to format branch enum
function formatBranch(branch) {
    return branch === "TAMPAK_SIRING" ? "GBI Tampak Siring" : "GBI Mall of Indonesia";
}

// Function to filter congregation list
function filterCongregationList(searchTerm, congregations) {
    const filteredCongregations = congregations.filter(congregation =>
        congregation.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderCongregationList(filteredCongregations);
}

// Initial rendering
async function initialize() {
    const congregations = await fetchCongregationData();
    renderCongregationList(congregations);

    // Event listener for search input
    document.getElementById("searchInput").addEventListener("input", function (event) {
        const searchTerm = event.target.value;
        filterCongregationList(searchTerm, congregations);
    });
}

function Menu(e) {
    let list = document.querySelector('ul');
    e.name === 'menu' ? (e.name = "close", list.classList.add('top-[80px]'), list.classList.add('opacity-100')) : (e.name = "menu", list.classList.remove('top-[80px]'), list.classList.remove('opacity-100'))
}

initialize();
