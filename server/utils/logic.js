const venueConfig = require('../data/data.json');

/**
 * Core logic for the Smart Venue AI.
 * Calculates optimal routing for an attendee based on current bottleneck data.
 */
exports.calculateOptimalRoute = (currentZoneId, destinationZoneId, realTimeDensityMap) => {
    // Pseudo-logic representing dynamic pathfinding (like A* adapted for crowd weights)
    
    // Check if the destination itself is at critical mass
    const destDensity = realTimeDensityMap[destinationZoneId] || 0;
    if (destDensity > 95) {
        return {
            status: 'BLOCKED',
            message: `The ${destinationZoneId} area is currently at maximum capacity. Please wait 10 minutes or visit an alternative area.`,
            recommendedAction: 'redirect'
        };
    }

    // Determine path based on predefined connections in data.json
    // Mock algorithm for now:
    if (destinationZoneId === 'zone-main' && currentZoneId === 'zone-gate-1') {
        const tunnelADensity = realTimeDensityMap['tunnel-a'] || 80;
        
        if (tunnelADensity > 70) {
            return {
                status: 'REROUTED',
                message: 'Tunnel A is highly congested. Use Tunnel B for 15m faster entry.',
                recommendedAction: 'route_b'
            };
        }
    }

    return {
        status: 'CLEAR',
        message: 'Proceed via the standard blue path markers.',
        recommendedAction: 'standard'
    };
};

/**
 * Analyzes crowd flow vs historical baselines to predict impending bottlenecks.
 */
exports.analyzePredictiveBottlenecks = (currentDensities) => {
    const alerts = [];
    const baselines = venueConfig.historicalBaselines;

    for (const [zoneId, density] of Object.entries(currentDensities)) {
        if (baselines[zoneId] && density > baselines[zoneId].averageDensity * 1.2) {
            alerts.push({
                zone: zoneId,
                level: 'WARNING',
                reason: `Density is 20% higher than historical average for this hour.`
            });
        }
    }

    return alerts;
};
