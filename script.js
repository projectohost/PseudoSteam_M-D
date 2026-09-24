function getLibrary() {
    return JSON.parse(localStorage.getItem("library")) || [];
}

function saveLibrary(library) {
    localStorage.setItem("library", JSON.stringify(library));
}


function addToLibrary(button) {
    const card = button.closest(".game-card");

    const game = {
        title: card.querySelector("h3").textContent,
        description: card.querySelectorAll("p")[0].textContent,
        price: card.querySelectorAll("p")[1].textContent,
        image: card.querySelector("img").src
    };

    const library = getLibrary();

    const alreadyExists = library.some(
        item => item.title === game.title
    );

    if (alreadyExists) {
        alert("Ця гра вже є у твоїй бібліотеці!");
        return;
    }

    library.push(game);
    saveLibrary(library);

    button.textContent = "У бібліотеці ✓";
    button.disabled = true;

    updateLibraryCount();

    alert(`"${game.title}" додано до бібліотеки!`);
}


function updateButtons() {
    const library = getLibrary();

    document.querySelectorAll(".game-card").forEach(card => {
        const title = card.querySelector("h3").textContent;
        const button = card.querySelector("button");

        const exists = library.some(game => game.title === title);

        if (exists) {
            button.textContent = "У бібліотеці ✓";
            button.disabled = true;
        }
    });
}


function pluralGames(n) {
    const m10 = n % 10;
    const m100 = n % 100;

    if (m10 === 1 && m100 !== 11) return "гра";
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "гри";
    return "ігор";
}


function updateLibraryCount() {
    const count = getLibrary().length;

    // badge in the navigation
    document.querySelectorAll("[data-library-count]").forEach(el => {
        el.textContent = count;
        el.hidden = count === 0;
    });

    // status text on the home page
    const status = document.getElementById("library-status");

    if (status) {
        status.textContent = count === 0
            ? "Тут поки порожньо. Додай першу гру з крамниці."
            : `Зараз у ній ${count} ${pluralGames(count)}.`;
    }
}


function loadLibrary() {
    const container = document.getElementById("library");
    const emptyMessage = document.getElementById("empty-library");

    if (!container || !emptyMessage) {
        return;
    }

    const library = getLibrary();

    container.innerHTML = "";

    if (library.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    library.forEach((game, index) => {
        const card = document.createElement("article");
        card.className = "game-card";

        const priceClass =
            game.price === "Безкоштовно" ? "price free" : "price";

        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}">

            <h3>${game.title}</h3>

            <p class="desc">${game.description}</p>

            <p class="${priceClass}">${game.price}</p>

            <button class="remove-button" onclick="removeFromLibrary(${index})">
                Видалити з бібліотеки
            </button>
        `;

        container.appendChild(card);
    });
}


function removeFromLibrary(index) {
    const library = getLibrary();

    library.splice(index, 1);
    saveLibrary(library);

    loadLibrary();
    updateLibraryCount();
}


function confirmWarThunder(button) {
    const answer = confirm("Ти точно хочеш додати War Thunder до бібліотеки?\n\nЦе погана гра. Ти ще можеш передумати 😈");

    if (answer) {
        addToLibrary(button);
    }
}


document.addEventListener("DOMContentLoaded", function () {
    updateButtons();
    loadLibrary();
    updateLibraryCount();
});