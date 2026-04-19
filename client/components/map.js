class VenueMap {
    constructor(containerId, summaryId) {
        this.container = document.getElementById(containerId);
        this.summary = document.getElementById(summaryId);
    }

    render(zones, activeZoneKey) {
        if (!this.container) return;

        const zoneLayout = {
            A: { className: 'zone-a', title: 'Zone A', position: 'North entrance' },
            B: { className: 'zone-b', title: 'Zone B', position: 'Central concourse' },
            C: { className: 'zone-c', title: 'Zone C', position: 'East plaza' }
        };

        this.container.innerHTML = `
            <div class="map-stage"></div>
            <div class="map-path path-main"></div>
            <div class="map-path path-left"></div>
            <div class="map-path path-right"></div>
            <div class="user-marker pulse"><i class="fa-solid fa-location-dot"></i></div>
            ${zones.map(zone => {
                const layout = zoneLayout[zone.key] || zoneLayout.A;
                const activeClass = zone.key === activeZoneKey ? 'active' : '';

                return `
                    <button class="zone-node ${layout.className} ${activeClass}" type="button">
                        <span class="zone-chip ${zone.cssClass}">${zone.statusLabel}</span>
                        <h4>${layout.title}</h4>
                        <small>${layout.position}</small>
                        <strong>${zone.score}%</strong>
                        <span class="zone-dot" style="background:${zone.color}"></span>
                    </button>
                `;
            }).join('')}
        `;

        if (this.summary) {
            this.summary.innerHTML = zones.map(zone => `
                <article class="zone-card">
                    <span class="zone-dot" style="background:${zone.color}"></span>
                    <h4>${zone.name}</h4>
                    <small>${zone.summary}</small>
                    <strong>${zone.score}%</strong>
                    <div class="progress"><span style="width:${zone.score}%; background:${zone.color}"></span></div>
                </article>
            `).join('');
        }
    }
}

window.VenueMap = VenueMap;
