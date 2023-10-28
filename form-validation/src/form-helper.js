function markVisited(input) {
    input.classList.add('visited');
}

function listenFormControlInteraction() {
    const inputs = document.querySelectorAll('input');
    for (const input of inputs) {
        input.addEventListener('blur', e => markVisited(input));
    }
}

export { listenFormControlInteraction };