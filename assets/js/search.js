// JavaScript for search functionality, made for articles and updates
const searchInput = document.getElementById('search');
const tableRows = document.querySelectorAll('#contentTable tbody tr');

// Setting up the original content of the cells and storing it in a dataset attribute
tableRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    cells.forEach(cell => {
        cell.dataset.originalContent = cell.innerHTML; // Store original content
    });
});

searchInput.addEventListener('input', function() {
    const searchText = this.value.trim();

    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
            highlightTextInNode(cell, searchText);
        });
    });
});

function highlightTextInNode(node, searchText) {
    node.normalize(); // Combine adjacent text nodes

    if (node.nodeType === Node.TEXT_NODE) {
        const regex = searchText ? new RegExp(`\\b${searchText}\\b`, 'gi') : null;
        const text = node.textContent;
        if (regex && regex.test(text)) {
            const matches = text.match(regex);
            let newNode = document.createElement('span');
            let lastIndex = 0;
            matches.forEach(match => {
                const index = text.indexOf(match, lastIndex);
                const before = document.createTextNode(text.substring(lastIndex, index));
                newNode.appendChild(before);
                const span = document.createElement('span');
                span.className = 'highlight';
                span.textContent = match;
                newNode.appendChild(span);
                lastIndex = index + match.length;
            });
            const after = document.createTextNode(text.substring(lastIndex));
            newNode.appendChild(after);
            node.parentNode.replaceChild(newNode, node);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(childNode => {
            highlightTextInNode(childNode, searchText);
        });
    }
}

searchInput.addEventListener('input', function() {
    const searchText = this.value.trim();

    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
            highlightTextInNode(cell, searchText);
        });
    });

    // If the search input is empty, reset the highlighting immediately
    if (searchText === '') {
        resetHighlighting();
    }
});

function resetHighlighting() {
    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
            cell.normalize(); // Combine adjacent text nodes

            // Remove all spans with the 'highlight' class
            const spans = cell.querySelectorAll('span.highlight');
            spans.forEach(span => {
                const textNode = document.createTextNode(span.textContent);
                span.parentNode.replaceChild(textNode, span);
            });
        });
    });
}