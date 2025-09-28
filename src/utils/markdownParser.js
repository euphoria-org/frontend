import { marked } from "marked";

marked.setOptions({
  breaks: true,
  gfm: true,
});

const renderer = new marked.Renderer();

renderer.paragraph = (text) => {
  return `<p class="mb-2 last:mb-0">${text}</p>`;
};

renderer.list = (body, ordered) => {
  const tag = ordered ? "ol" : "ul";
  return `<${tag} class="ml-4 mb-2 space-y-1 ${
    ordered ? "list-decimal" : "list-disc"
  }">${body}</${tag}>`;
};

renderer.listitem = (text) => {
  return `<li class="text-sm">${text}</li>`;
};

renderer.strong = (text) => {
  return `<strong class="font-semibold text-white/95">${text}</strong>`;
};

renderer.em = (text) => {
  return `<em class="italic text-white/90">${text}</em>`;
};

marked.use({ renderer });

/**
 * Parse markdown text and return safe HTML
 * @param {string} text - Raw markdown text
 * @returns {string} - Parsed HTML string
 */
export const parseMarkdown = (text) => {
  if (!text || typeof text !== "string") {
    return "";
  }

  try {
    const html = marked(text);
    return html;
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return text;
  }
};

/**
 * Clean and format text for better readability
 * @param {string} text - Raw text
 * @returns {string} - Cleaned text
 */
export const formatChatText = (text) => {
  if (!text) return "";

  let formatted = text
    .replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold text-white/95">$1</strong>'
    )
    .replace(/\*([^*]+)\*/g, '<em class="italic text-white/90">$1</em>') // Italic
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-white/10 px-1 py-0.5 rounded text-xs font-mono">$1</code>'
    )
    .replace(/\n\*/g, "\n•")
    .replace(/\n/g, "<br>");

  return formatted;
};
