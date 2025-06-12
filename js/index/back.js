function confirmBack() {
    if (confirm('Are you sure you want to go back? Your progress will be lost.')) {
        history.back();
    }
}
