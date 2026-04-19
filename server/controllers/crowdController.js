/**
 * Generates dynamic crowd data.
 * @route GET /api/crowd
 */
exports.getCrowdData = async (req, res) => {
    try {
        // In a real app we'd fetch from MongoDB: `await CrowdModel.find();`
        // For this MVP, we simulate pulsing real-time crowd data.
        
        const generateDensity = (base, variance) => 
            Math.min(100, Math.max(0, base + Math.floor(Math.random() * variance - (variance / 2))));

        const mockZones = [
            { id: 'zone-main', name: 'Main Stage', density: generateDensity(88, 15), capacity: 15000 },
            { id: 'zone-food-n', name: 'North Food Court', density: generateDensity(65, 20), capacity: 800 },
            { id: 'zone-gate-1', name: 'Gate 1', density: generateDensity(30, 25), capacity: 2000 },
            { id: 'zone-restroom-c', name: 'Restroom Block C', density: generateDensity(95, 10), capacity: 150 }
        ];

        res.status(200).json({ success: true, count: mockZones.length, data: mockZones });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error handling crowd data.' });
    }
};
