document.addEventListener('DOMContentLoaded', () => {
    const helpBtn = document.querySelector('.help-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalContent = document.querySelector('.modal-content');

    helpBtn.addEventListener('click', () => {
        const helpText = `
            <h2>How to Play</h2>
            <p><b>Welcome to the game! Here are some instructions to get you started:</b></p>
            <br>
            <ul>
                <li>Select a difficulty level by clicking on the buttons.</li>
                <li>Enter your name in the input field.</li>
                <li>Click the <b>"Start Challenge"</b> button to begin.</li>
                <li>Type the given passage exactly as shown in the designated area before the timer runs out.</li>
                <li>You can't use the <b>backspace</b> key to correct mistakes, so type carefully!</li>
            </ul>
            <br>
            <p>Good luck and have fun!</p>
            <button class="close-btn">Close</button>
        `;

        modalContent.innerHTML = helpText;
        modalOverlay.classList.remove('hidden');

        const closeBtn = modalContent.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
        });
    });
});