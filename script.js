function addToLibrary(button) {
    const card = button.closest(".game-card");

    const game = {
        title: card.querySelector("h3").textContent,
        description: card.querySelectorAll("p")[0].textContent,
        price: card.querySelectorAll("p")[1].textContent,
        image: card.querySelector("img").src
    };

    let library =
        JSON.parse(localStorage.getItem("library")) || [];

    const alreadyExists = library.some(
        item => item.title === game.title
    );

    if (alreadyExists) {
        alert("Ця гра вже є у твоїй бібліотеці!");
        return;
    }

    library.push(game);

    localStorage.setItem(
        "library",
        JSON.stringify(library)
    );

    button.textContent = "У бібліотеці ✓";
    button.disabled = true;

    alert(`"${game.title}" додано до бібліотеки!`);
}


function updateButtons() {
    const library =
        JSON.parse(localStorage.getItem("library")) || [];

    const cards =
        document.querySelectorAll(".game-card");

    cards.forEach(card => {
        const title =
            card.querySelector("h3").textContent;

        const button =
            card.querySelector("button");

        const exists = library.some(
            game => game.title === title
        );

        if (exists) {
            button.textContent = "У бібліотеці ✓";
            button.disabled = true;
        }
    });
}


function loadLibrary() {
    const container =
        document.getElementById("library");

    const emptyMessage =
        document.getElementById("empty-library");

    if (!container || !emptyMessage) {
        return;
    }

    const library =
        JSON.parse(localStorage.getItem("library")) || [];

    container.innerHTML = "";

    if (library.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    library.forEach((game, index) => {
        const card =
            document.createElement("article");

        card.className = "game-card";

        card.innerHTML = `
            <img
                src="${game.image}"
                alt="${game.title}"
            >

            <h3>${game.title}</h3>

            <p>${game.description}</p>

            <p>${game.price}</p>

            <button onclick="removeFromLibrary(${index})">
                Видалити з бібліотеки
            </button>
        `;

        container.appendChild(card);
    });
}


function removeFromLibrary(index) {
    let library =
        JSON.parse(localStorage.getItem("library")) || [];

    library.splice(index, 1);

    localStorage.setItem(
        "library",
        JSON.stringify(library)
    );

    loadLibrary();
}


document.addEventListener("DOMContentLoaded", function () {
    updateButtons();
    loadLibrary();
});