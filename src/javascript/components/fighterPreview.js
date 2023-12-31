import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName =
        position === 'right' ? 'fighter-preview___right arena___right-fighter' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)

    function createFighterPreviewStats(fighter1) {
        const statsDivElement = createElement({
            tagName: 'div',
            className: 'fighter-preview___stats'
        });

        statsDivElement.insertAdjacentHTML(
            'afterbegin',
            `<p>health: <span>${fighter1?.health}</span></p>
            <p>attack: <span>${fighter1?.attack}</span></p>
            <p>defense: <span>${fighter1?.defense}</span></p>`
        );
        return statsDivElement;
    }

    function createFighterPreviewImage(fighter1 = {}) {
        const { source, name } = fighter1;
        const attributes = {
            src: source,
            title: name,
            alt: name
        };
        const imgElement = createElement({
            tagName: 'img',
            className: `fighter-preview___img ${positionClassName}`,
            attributes
        });

        return imgElement;
    }

    function createFighterPreviewName(fighter1) {
        const nameElement = createElement({
            tagName: 'p',
            className: 'arena___fighter-name'
        });
        nameElement.innerHTML = fighter1?.name;

        return nameElement;
    }

    const nameElement = createFighterPreviewName(fighter);
    const statsElement = createFighterPreviewStats(fighter);
    const imageElement = createFighterPreviewImage(fighter, position);

    fighterElement.append(nameElement);
    fighterElement.append(statsElement);
    fighterElement.append(imageElement);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
