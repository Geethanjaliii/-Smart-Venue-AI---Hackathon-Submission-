// Initialize real-time clock
function updateClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    const dateString = now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
    
    clockElement.innerHTML = `<i class="fa-regular fa-clock" style="margin-right:8px; color:var(--accent-blue);"></i>${dateString} • ${timeString} (LIVE)`;
}

setInterval(updateClock, 1000);
updateClock();

function setActiveNavItem(activeItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item === activeItem);
    });
}

function openSectionFromNav(item) {
    const targetId = item.dataset.target;
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveNavItem(item);
}

// Simulate dynamic heatmap spots
function initHeatmapSimulation() {
    const container = document.getElementById('venue-heatmap');
    if (!container) return;
    
    container.innerHTML = ''; // Clear loading text
    
    // Generate simulated hot zones
    const zones = [
        { x: 30, y: 40, size: 120, color: 'var(--status-danger)', pulse: true }, // Main bottleneck
        { x: 70, y: 60, size: 80, color: 'var(--status-warning)', pulse: false },
        { x: 20, y: 70, size: 90, color: 'var(--status-warning)', pulse: false },
        { x: 80, y: 30, size: 100, color: 'var(--accent-blue)', pulse: false }
    ];

    zones.forEach(zone => {
        const spot = document.createElement('div');
        spot.style.position = 'absolute';
        spot.style.left = `${zone.x}%`;
        spot.style.top = `${zone.y}%`;
        spot.style.width = `${zone.size}px`;
        spot.style.height = `${zone.size}px`;
        spot.style.background = `radial-gradient(circle, ${zone.color} 0%, transparent 70%)`;
        spot.style.transform = 'translate(-50%, -50%)';
        spot.style.opacity = '0.7';
        spot.style.borderRadius = '50%';
        spot.style.pointerEvents = 'none';
        
        if (zone.pulse) {
            spot.style.animation = 'pulse 2s infinite ease-in-out';
            spot.style.boxShadow = `0 0 40px ${zone.color}`;
        }

        // Slight breathing animation
        setInterval(() => {
            const currentScale = 1 + (Math.random() * 0.1 - 0.05); // +/- 5% scale
            spot.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
            spot.style.transition = 'transform 1s ease-in-out';
        }, 1000);

        container.appendChild(spot);
    });
}

//when DOM is ready initialise components
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            openSectionFromNav(item);
        });
    });

    setTimeout(initHeatmapSimulation, 800); // Slight delay for realistic "loading" feel
});
