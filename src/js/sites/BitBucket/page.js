// brfs doesn't work with ES6 import syntax
// https://github.com/substack/brfs/issues/39
const fs = require('fs');
const btnTemplate = fs.readFileSync('src/js/sites/BitBucket/button.html', 'utf8');
const btnClass = '.js-giphy-btn';

export function addBtnToToolbars({ currentTarget: el }) {
    if (!el) {
        const cb = () => addBtnToToolbars(true);
        $(document).on('focus', '.bb-mention-input', cb);
    }

    const done = el && $(el).closest('.markItUpContainer').find(btnClass).length;
    const $targetSibling = $('.markItUpButton.image');
    $(btnTemplate).insertAfter($targetSibling);
    $targetSibling.removeClass('last');
}

export function onGiphyBtnClick(cb) {
    $(document).on('click', '.js-giphy-btn', ({ currentTarget: el }) => {
        cb({
            input: el
        });
    });
}
