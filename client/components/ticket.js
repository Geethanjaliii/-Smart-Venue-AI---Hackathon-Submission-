class TicketPass {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(profile) {
        if (!this.container) return;

        const qrCells = this._buildQrPattern(profile.ticketId);

        this.container.innerHTML = `
            <div class="ticket-shell">
                <section class="ticket-main">
                    <div class="ticket-top">
                        <div>
                            <p class="eyebrow">Admission pass</p>
                            <h4>${profile.event}</h4>
                        </div>
                        <span class="ticket-chip good">${profile.status}</span>
                    </div>

                    <div class="ticket-row">
                        <div class="ticket-stack">
                            <span>Attendee</span>
                            <strong>${profile.name}</strong>
                        </div>
                        <div class="ticket-stack">
                            <span>Ticket ID</span>
                            <strong>${profile.ticketId}</strong>
                        </div>
                    </div>

                    <div class="ticket-row">
                        <div class="ticket-stack">
                            <span>Zone</span>
                            <strong>${profile.zone}</strong>
                        </div>
                        <div class="ticket-stack">
                            <span>Seat / Entry</span>
                            <strong>${profile.seat}</strong>
                        </div>
                    </div>

                    <div class="ticket-row">
                        <div class="ticket-stack">
                            <span>AI route</span>
                            <strong>${profile.routeHint}</strong>
                        </div>
                    </div>
                </section>

                <aside class="ticket-qr" aria-label="QR code preview">
                    ${qrCells}
                </aside>
            </div>
        `;
    }

    _buildQrPattern(seed) {
        const hash = Array.from(seed).reduce((sum, character) => sum + character.charCodeAt(0), 0);

        return Array.from({ length: 49 }, (_, index) => {
            const row = Math.floor(index / 7);
            const col = index % 7;
            const inCorner = (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2);
            const filled = inCorner || ((hash + index * 13) % 3 === 0) || (row === 3 && col === 3);

            return `<span class="qr-cell ${filled ? 'filled' : ''}"></span>`;
        }).join('');
    }
}

window.TicketPass = TicketPass;