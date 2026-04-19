document.addEventListener('DOMContentLoaded', () => {
    const state = createAppState();
    const crowdManager = new CrowdManager();
    const queueManager = new QueueManager('queue-grid');
    const mapRenderer = new VenueMap('venue-map', 'zone-summary');
    const ticketPass = new TicketPass('ticket-pass');
    const profilePanel = new ProfilePanel({
        panelId: 'profile-drawer',
        backdropId: 'profile-backdrop',
        openButtonId: 'profile-toggle',
        closeButtonId: 'profile-close'
    });

    wireNavigation();
    wireProfileActions(profilePanel);
    bindSuggestionAction();
    bootApplication();

    async function bootApplication() {
        setLoadingState(true);

        try {
            const [crowdZones, queueItems] = await Promise.all([
                crowdManager.loadLiveZones(),
                queueManager.loadQueueTimes()
            ]);

            state.crowdZones = crowdZones;
            state.queueItems = queueItems;
            state.profile = buildProfileData(crowdZones, queueItems);

            renderHomeSummary();
            renderInsightBanner();
            mapRenderer.render(crowdZones, state.profile.zone);
            profilePanel.render(state.profile);
            ticketPass.render(state.profile);

            document.getElementById('last-updated').textContent = new Intl.DateTimeFormat(undefined, {
                hour: 'numeric',
                minute: '2-digit'
            }).format(new Date());
        } catch (error) {
            console.error('Failed to load live data', error);
            renderOfflineState();
        } finally {
            setLoadingState(false);
        }
    }

    function createAppState() {
        return {
            crowdZones: [],
            queueItems: [],
            profile: null,
            activeView: 'view-home'
        };
    }

    function wireNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const views = document.querySelectorAll('.view');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');
                state.activeView = targetId;

                navButtons.forEach(item => item.classList.toggle('active', item === button));
                views.forEach(view => view.classList.toggle('active-view', view.id === targetId));

                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(35);
                }
            });
        });
    }

    function wireProfileActions(profilePanelInstance) {
        document.addEventListener('click', event => {
            const ticketButton = event.target.closest('[data-action="ticket"]');
            const logoutButton = event.target.closest('[data-action="logout"]');

            if (ticketButton) {
                const ticketTab = document.querySelector('.nav-btn[data-target="view-ticket"]');
                if (ticketTab) ticketTab.click();
                profilePanelInstance.close();
            }

            if (logoutButton) {
                profilePanelInstance.close();
            }
        });
    }

    function bindSuggestionAction() {
        const actionButton = document.getElementById('suggestion-action');

        if (!actionButton) return;

        actionButton.addEventListener('click', () => {
            const mapTab = document.querySelector('.nav-btn[data-target="view-map"]');
            if (mapTab) mapTab.click();
        });
    }

    function renderHomeSummary() {
        const summaryGrid = document.getElementById('summary-grid');
        if (!summaryGrid) return;

        const hottestZone = state.crowdZones.reduce((winner, zone) => (zone.score > (winner?.score ?? -1) ? zone : winner), null);
        const averageQueue = Math.round(state.queueItems.reduce((sum, item) => sum + item.time, 0) / Math.max(state.queueItems.length, 1));
        const nearestQueue = state.queueItems.reduce((winner, item) => (item.time < (winner?.time ?? Infinity) ? item : winner), null);
        const criticalZones = state.crowdZones.filter(zone => zone.status === 'bad').length;

        const cards = [
            {
                label: 'Busiest zone',
                value: hottestZone?.name ?? 'Zone A',
                detail: hottestZone ? `${hottestZone.score}% occupancy` : 'Awaiting live data'
            },
            {
                label: 'Average queue',
                value: `${averageQueue} min`,
                detail: nearestQueue ? `${nearestQueue.stall} is the fastest` : 'Waiting for queue data'
            },
            {
                label: 'Crowd pressure',
                value: `${criticalZones} hotspots`,
                detail: criticalZones ? 'Red areas need routing' : 'Current load is manageable'
            },
            {
                label: 'Best route',
                value: computeRouteHint(),
                detail: 'AI-selected path for this attendee'
            }
        ];

        summaryGrid.innerHTML = cards.map(card => `
            <article class="summary-card">
                <span>${card.label}</span>
                <strong>${card.value}</strong>
                <p>${card.detail}</p>
            </article>
        `).join('');

        document.getElementById('avg-entry').textContent = `${averageQueue} min`;
        document.getElementById('hot-zone').textContent = hottestZone ? hottestZone.name : 'Zone A';
        document.getElementById('venue-mood').textContent = criticalZones > 0 ? 'Needs attention' : 'Stable';
    }

    function renderInsightBanner() {
        const banner = document.getElementById('smart-suggestion-text');
        if (!banner) return;

        const criticalZone = state.crowdZones.find(zone => zone.status === 'bad');
        const busiestQueue = state.queueItems.reduce((winner, item) => (item.time > (winner?.time ?? -1) ? item : winner), null);

        if (criticalZone) {
            banner.textContent = `${criticalZone.name} is the hottest zone. Route guests through the opposite side of the venue.`;
            return;
        }

        if (busiestQueue && busiestQueue.time >= 30) {
            banner.textContent = `${busiestQueue.stall} is running long. Push attendees toward the north route and secondary concessions.`;
            return;
        }

        banner.textContent = 'Venue is flowing well. Keep guests on the shortest line and stage approach paths.';
    }

    function computeRouteHint() {
        const safeZone = state.crowdZones.find(zone => zone.status === 'good');
        return safeZone ? safeZone.name : 'Zone C';
    }

    function buildProfileData(crowdZones, queueItems) {
        const attendeeZone = crowdZones.find(zone => zone.status === 'good')?.name ?? 'Zone C';
        const seatLabel = queueItems[0]?.stall ?? 'Main Entry';

        return {
            name: 'Geethanjali',
            ticketId: 'SVA-2409-8841',
            event: 'Smart Venue AI Live',
            zone: attendeeZone,
            seat: seatLabel,
            status: 'Active',
            initials: 'G',
            routeHint: computeRouteHint()
        };
    }

    function setLoadingState(isLoading) {
        const queueGrid = document.getElementById('queue-grid');
        const ticketPass = document.getElementById('ticket-pass');
        if (queueGrid) queueGrid.classList.toggle('loading', isLoading && !state.queueItems.length);
        if (ticketPass) ticketPass.classList.toggle('loading', isLoading && !state.profile);
    }

    function renderOfflineState() {
        const queueGrid = document.getElementById('queue-grid');
        const summaryGrid = document.getElementById('summary-grid');
        const ticketPass = document.getElementById('ticket-pass');

        if (summaryGrid) {
            summaryGrid.innerHTML = `
                <article class="summary-card"><span>Status</span><strong>Offline</strong><p>Backend data could not be loaded.</p></article>
            `;
        }

        if (queueGrid) {
            queueGrid.innerHTML = `
                <div class="queue-card"><h4>Queue data unavailable</h4><p>Reload the server to restore live metrics.</p></div>
            `;
        }

        if (ticketPass) {
            ticketPass.innerHTML = `
                <div class="ticket-main">
                    <p class="eyebrow">Ticket unavailable</p>
                    <h4>Smart Venue AI</h4>
                    <p>The live pass could not be built because the API did not respond.</p>
                </div>
            `;
        }
    }
});
