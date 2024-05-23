function applyAnimationOnElement(element, animationName) {
    if (element instanceof Element && typeof animationName === 'string') {
        try {
            element.classList.add('animate__animated', animationName);
            const animationEndHandler = () => {
                element.classList.remove('animate__animated', animationName);
                element.removeEventListener('animationend', animationEndHandler);
            };
            element.addEventListener('animationend', animationEndHandler);
        } catch (error) {
            throw new Error("Invalid parameters: 'element' must be a DOM element and 'animationName' must be a string.");
        }
    } else {
        throw new Error("Invalid parameters: 'element' must be a DOM element and 'animationName' must be a string.");
    }
}