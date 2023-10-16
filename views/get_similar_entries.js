(async () => {
    let similarEntries = null;
    const { entryId, workspaceId } = window.netHeroes;

    try {
        const response = await fetch(`/resources/similar_search.php?id=${entryId}&workspace_id=${workspaceId}`)

        if (!response.ok) {
            throw new Error('Bad fetch response')
        }

        similarEntries = await response.json()
    } catch (err) {
        // Handle the error
    }

    if (similarEntries.totalResults) {
        const ul = document.querySelector('#similar_entries ul');
        const fragment = document.createDocumentFragment();

        similarEntries.items.forEach(entry => {
            const list = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.setAttribute('href', entry.permalink);
            anchor.textContent = entry.title;
            list.appendChild(anchor);
            fragment.appendChild(list);
        });

        ul.appendChild(fragment);
        ul.parentElement.style.display = 'block';
    } else {
    }
})();