class CrowdManager {
    constructor() {
        this.listeners = [];
        this.zones = [];
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    _notify() {
        this.listeners.forEach(callback => callback(this.zones));
    }

    _statusFromDensity(densityLabel) {
        if (densityLabel === 'high') {
            return {
                label: 'Crowded',
                tone: 'bad',
                cssClass: 'status-bad',
                color: '#fb7185',
                score: 88
            };
        }

        if (densityLabel === 'medium') {
            return {
                label: 'Busy',
                tone: 'warn',
                cssClass: 'status-warn',
                color: '#fbbf24',
                score: 58
            };
        }

        return {
            label: 'Calm',
            tone: 'good',
            cssClass: 'status-good',
            color: '#34d399',
            score: 26
        };
    }

    _normalizeZone(zone, index) {
        const density = String(zone.density || 'low').toLowerCase();
        const status = this._statusFromDensity(density);
        const zoneKey = zone.zone || zone.id || ['A', 'B', 'C'][index % 3];
        const zoneName = zone.name || `Zone ${zoneKey}`;

        return {
            id: zone.id || `zone-${zoneKey.toLowerCase()}`,
            key: zoneKey,
            name: zoneName,
            density,
            status: status.tone,
            statusLabel: status.label,
            cssClass: status.cssClass,
            color: status.color,
            score: status.score,
            capacity: zone.capacity || (index === 0 ? 1000 : index === 1 ? 650 : 420),
            summary: density === 'high' ? 'Routing recommended' : density === 'medium' ? 'Monitor closely' : 'Open flow'
        };
    }

    async loadLiveZones() {
        const zones = await window.smartVenueApi.getCrowd();
        this.zones = zones.map((zone, index) => this._normalizeZone(zone, index));
        this._notify();
        return this.zones;
    }
}

window.CrowdManager = CrowdManager;
