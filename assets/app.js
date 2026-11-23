
let fighters = [];

async function load() {
    try {
        const response = await fetch('data/fighters.json');
        fighters = await response.json();

        renderFighters();
        renderProfile();
    } catch (error) {
        console.error('Error loading fighters:', error);
    }
}

function renderFighters() {
    const box = document.getElementById('fighter-list');
    if (!box) return;

    const search = (
        document.getElementById('search')?.value || ''
    ).toLowerCase();

    box.innerHTML = fighters
        .filter(f => f.name.toLowerCase().includes(search))
        .map(f => `
            <a class="fighter-card"
               href="fighter.html?id=${encodeURIComponent(f.id)}">

                ${f.image ? `
                    <img src="${f.image}"
                         alt="${f.name}"
                         style="width:100px;height:100px;object-fit:cover;border-radius:15px;margin-bottom:15px;">
                ` : ''}

                <h2>${f.name}</h2>

                <p>${f.country}</p>

                <div class="record">
                    ${f.record.wins}-${f.record.losses}-${f.record.draws}
                </div>

            </a>
        `).join('') || '<p>No fighters found.</p>';
}

function renderProfile() {
    const box = document.getElementById('profile');
    if (!box) return;

    const id = new URLSearchParams(location.search).get('id');
    const fighter = fighters.find(f => f.id === id);

    if (!fighter) {
        box.innerHTML = '<p>Fighter not found.</p>';
        return;
    }

    document.title = fighter.name + ' | MMA Records India';

    box.innerHTML = `
        <p class="eyebrow">FIGHTER PROFILE · INDIA</p>

        ${fighter.image ? `
            <img src="${fighter.image}"
                 alt="${fighter.name}"
                 style="width:180px;height:180px;object-fit:cover;border-radius:15px;">
        ` : ''}

        <h1>${fighter.name}</h1>

        <p>${fighter.country}</p>

        <div class="fighter-card">
            <h2 class="record">
                ${fighter.record.wins}-${fighter.record.losses}-${fighter.record.draws}
            </h2>
        </div>

        <p><a href="fighters.html">← Back to fighters</a></p>
    `;
}

document.addEventListener('input', event => {
    if (event.target.id === 'search') {
        renderFighters();
    }
});

load();
