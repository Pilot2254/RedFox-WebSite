const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('tableBody');
const originalRows = Array.from(tableBody.querySelectorAll('tr'));

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredRows = originalRows.filter(row => {
        const title = row.querySelector('td:first-child').textContent.toLowerCase();
        return title.includes(searchTerm);
    });

    tableBody.innerHTML = '';
    filteredRows.forEach(row => tableBody.appendChild(row.cloneNode(true)));
});