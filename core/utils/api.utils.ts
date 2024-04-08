export const extractCursorValueFromLink = (link: string) => {
    const lintParts = link.split('?');
    if (lintParts.length < 2) {
        return undefined;
    }
    const params = new URLSearchParams(lintParts[1]);
    return params.get('cursor');
};
