/**
 * Simulated smart routing suggestions logic.
 * @route GET /api/suggestions
 */
exports.getSuggestions = async (req, res) => {
    try {
        // In real app, util/logic.js would calculate this based on user location via GPS
        const suggestions = [
            { type: 'routing', message: 'Use North Gate for 15m faster entry.', highlight: true },
            { type: 'promo', message: '20% off drinks at the East Bar to avoid crowds.', highlight: false }
        ];

        // Randomly return one dynamic suggestion
        const activeSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

        res.status(200).json({ success: true, data: activeSuggestion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error handling suggestions.' });
    }
};
