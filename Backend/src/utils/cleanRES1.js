export const cleanHtml = (text) => {
    if (!text) return "";
    return text.replace(/<[^>]*>/g, "").trim();
};