import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call showModal function
    const winnerObj = {
        title: fighter.name,
        bodyElement: 'Winner!!!',
        onClose: () => {
            document.location.href = '/';
        }
    };
    showModal(winnerObj);
}
