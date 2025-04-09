export function ellipsis(
    text: string,
    maxLength: number,
    ellipsisString = '...'
): string {
    if (text.length > maxLength) {
        return (
            text.slice(0, maxLength - ellipsisString.length) + ellipsisString
        );
    }
    return text;
}
