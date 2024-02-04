document.addEventListener("DOMContentLoaded", () => {
    const catalogBtn = document.querySelectorAll('.sofa__btn');

    catalogBtn.forEach(elem => {
        elem.addEventListener('click', () => {
            catalogBtn.forEach(elAll => {
                elAll.classList.remove('sofa__btn--active'); 
            })
            elem.classList.add('sofa__btn--active'); 
        })
    })
})