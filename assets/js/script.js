
async function loadData(pageType) {
    const response = await fetch('data.json');
    const data = await response.json();
    const records = data[pageType];
    const container = document.getElementById("records");
    container.innerHTML = "";

    const audioSection = document.createElement("div");
    const videoSection = document.createElement("div");

    audioSection.innerHTML = "<h2>Audios</h2>";
    videoSection.innerHTML = "<h2>Videos</h2>";

    const groupedAudio = {};
    const groupedVideo = {};

    records.forEach(r => {
        const type = r["Audio / Video"].toLowerCase();
        const grouped = type.includes("video") ? groupedVideo : groupedAudio;

        if (!grouped[r.Show]) grouped[r.Show] = [];
        grouped[r.Show].push(r);
    });

    function renderGroup(grouped, section) {
        Object.keys(grouped).sort().forEach(show => {
            const title = document.createElement("div");
            title.className = "collapsible";
            title.textContent = show + " (" + grouped[show].length + ")";
            
            const content = document.createElement("div");
            content.className = "content";

            grouped[show].forEach(r => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <div><strong>Date:</strong> ${r.Date}</div>
                    <div><strong>City:</strong> ${r.City}</div>
                    <div><strong>Venue:</strong> ${r.Venue}</div>
                    <div><strong>Cast:</strong> ${r.Cast}</div>
                    <div><strong>Master:</strong> ${r.Master}</div>
                    <div><strong>Release:</strong> ${r["Release Format"]}</div>
                    <div><strong>Notes:</strong> ${r.Notes}</div>
                `;
                content.appendChild(card);
            });

            title.addEventListener("click", () => {
                content.style.display = content.style.display === "block" ? "none" : "block";
            });

            section.appendChild(title);
            section.appendChild(content);
        });
    }

    renderGroup(groupedAudio, audioSection);
    renderGroup(groupedVideo, videoSection);

    container.appendChild(audioSection);
    container.appendChild(videoSection);
}

function searchRecords() {
    const input = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(input) ? "block" : "none";
    });
}
