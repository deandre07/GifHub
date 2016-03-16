export function toMarkdownImage({ uri, name }) {
    return `![${name}](${uri})`;
}

export function insertTextAtCursor(textarea, text) {
    const pos = textarea.selectionStart;
    const currentVal = textarea.value;
    const before = currentVal.substring(0, pos);
    const after = currentVal.substring(pos);
    textarea.value = `${before}${text}${after}`;
    $(textarea).change(); // compatibility with OctoPreview (GitHub)
}
