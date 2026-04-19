class ProfilePanel {
    constructor({ panelId, backdropId, openButtonId, closeButtonId }) {
        this.panel = document.getElementById(panelId);
        this.backdrop = document.getElementById(backdropId);
        this.openButton = document.getElementById(openButtonId);
        this.closeButton = document.getElementById(closeButtonId);

        if (this.openButton) {
            this.openButton.addEventListener('click', () => this.open());
        }

        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }

        if (this.backdrop) {
            this.backdrop.addEventListener('click', () => this.close());
        }
    }

    render(profile) {
        if (!this.panel) return;

        this.panel.innerHTML = `
            <div class="profile-card">
                <section class="profile-hero">
                    <div class="profile-avatar-lg">${profile.initials}</div>
                    <p class="eyebrow">${profile.status}</p>
                    <h4>${profile.name}</h4>
                    <p>${profile.event}</p>
                </section>

                <div class="profile-field">
                    <span>Ticket ID</span>
                    <strong>${profile.ticketId}</strong>
                </div>

                <div class="profile-field">
                    <span>Zone / Seat</span>
                    <strong>${profile.zone} · ${profile.seat}</strong>
                </div>

                <div class="profile-field">
                    <span>AI route</span>
                    <strong>${profile.routeHint}</strong>
                </div>

                <div class="profile-actions">
                    <button class="action-button primary" data-action="ticket" type="button">View ticket</button>
                    <button class="action-button" data-action="logout" type="button">Logout</button>
                </div>
            </div>
        `;
    }

    open() {
        if (this.panel) {
            this.panel.classList.add('open');
            this.panel.setAttribute('aria-hidden', 'false');
        }

        if (this.backdrop) {
            this.backdrop.classList.add('visible');
        }
    }

    close() {
        if (this.panel) {
            this.panel.classList.remove('open');
            this.panel.setAttribute('aria-hidden', 'true');
        }

        if (this.backdrop) {
            this.backdrop.classList.remove('visible');
        }
    }
}

window.ProfilePanel = ProfilePanel;