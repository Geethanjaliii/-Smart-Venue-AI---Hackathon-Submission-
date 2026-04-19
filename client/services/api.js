(function () {
    async function request(path) {
        const response = await fetch(path, {
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed for ${path} with status ${response.status}`);
        }

        return response.json();
    }

    window.smartVenueApi = {
        getCrowd: () => request('/api/crowd'),
        getQueue: () => request('/api/queue'),
        getSuggestion: zone => request(`/api/suggest/${encodeURIComponent(zone)}`)
    };
})();