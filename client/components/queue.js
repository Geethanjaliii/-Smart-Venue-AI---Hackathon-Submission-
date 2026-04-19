class QueueManager {
    constructor(gridContainerId) {
        this.container = document.getElementById(gridContainerId);
        this.queueItems = [];
    }

    _statusFromTime(time) {
        if (time >= 30) {
            return { tone: 'bad', className: 'chip-bad', label: 'Long wait' };
        }

        if (time >= 12) {
            return { tone: 'warn', className: 'chip-warn', label: 'Busy' };
        }

        return { tone: 'good', className: 'chip-good', label: 'Quick' };
    }

    async loadQueueTimes() {
        if (!this.container) return [];

        const queueData = await window.smartVenueApi.getQueue();
        this.queueItems = queueData.map(item => {
            const status = this._statusFromTime(item.time);

            return {
                stall: item.stall,
                time: item.time,
                tone: status.tone,
                className: status.className,
                label: status.label
            };
        });

        this.render();
        return this.queueItems;
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = this.queueItems.map(item => `
            <article class="queue-card">
                <div class="ticket-row">
                    <div>
                        <h4>${item.stall}</h4>
                        <small>${item.label}</small>
                    </div>
                    <span class="chip ${item.className}">${item.time} min</span>
                </div>
                <strong>${item.time}</strong>
                <p>${item.time >= 30 ? 'Best to route guests elsewhere.' : 'Queue is moving at a healthy pace.'}</p>
            </article>
        `).join('');
    }
}

window.QueueManager = QueueManager;
