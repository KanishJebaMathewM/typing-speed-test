document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.start-btn');
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const nameInput = document.querySelector('.input-field');

    // Set first button as active by default
    difficultyBtns[0].classList.add('active');

    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    startBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) {
            alert('Please enter your name');
            return;
        }

        const activeBtn = document.querySelector('.difficulty-btn.active');
        const difficulty = activeBtn.textContent;
        
        localStorage.setItem('playerName', name);
        localStorage.setItem('difficultyLevel', difficulty);
        window.location.href = '/game';
    });
});