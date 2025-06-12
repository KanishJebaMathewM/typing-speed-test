document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('click-effect');
            setTimeout(() => this.classList.remove('click-effect'), 200);
        });
    });
});