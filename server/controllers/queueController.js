/**
 * Generates dynamic queue wait times.
 * @route GET /api/queue
 */
exports.getQueueTimes = async (req, res) => {
    try {
        const generateWait = (base) => Math.max(0, base + Math.floor(Math.random() * 10 - 5));

        const mockQueues = [
            { location: 'Main Entrance Gates', waitTimeMinutes: generateWait(14), trend: 'down' },
            { location: 'Merchandise Stand', waitTimeMinutes: generateWait(45), trend: 'up' },
            { location: 'VIP Lounge Entry', waitTimeMinutes: generateWait(2), trend: 'flat' }
        ];

        res.status(200).json({ success: true, data: mockQueues });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error handling queues.' });
    }
};
