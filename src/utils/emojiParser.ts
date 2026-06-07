export interface ParsedEmoji {
  emojiId: string | null;
  fallback: string;
}

export function parseTelegramEmojis(text: string): string {
  if (!text) return "";

  const emojiRegex = /<tg-emoji\s+emoji-id="(\d+)">([^<]+)<\/tg-emoji>/g;

  return text.replace(emojiRegex, (_match, _emojiId, fallback) => {
    return fallback;
  });
}

export function extractEmojis(text: string): ParsedEmoji[] {
  if (!text) return [];

  const emojiRegex = /<tg-emoji\s+emoji-id="(\d+)">([^<]+)<\/tg-emoji>/g;
  const results: ParsedEmoji[] = [];
  let match;

  while ((match = emojiRegex.exec(text)) !== null) {
    results.push({
      emojiId: match[1],
      fallback: match[2],
    });
  }

  return results;
}

export function renderWithEmojiClasses(
  text: string,
  emojiClassMap: Record<string, string> = {}
): string {
  if (!text) return "";

  const defaultClasses: Record<string, string> = {
    "⭐": "emoji-pulse",
    "🚀": "emoji-bounce",
    "💎": "emoji-spin",
    "👥": "emoji-pulse",
    ...emojiClassMap,
  };

  const emojiRegex = /<tg-emoji\s+emoji-id="(\d+)">([^<]+)<\/tg-emoji>/g;

  return text.replace(emojiRegex, (_match, _emojiId, fallback) => {
    const emojiChar = fallback.trim();
    const className = defaultClasses[emojiChar] || "emoji-pulse";
    return `<span class="${className}">${fallback}</span>`;
  });
}

export function stripXmlTags(text: string): string {
  if (!text) return "";
  return text.replace(/<[^>]+>/g, "");
}
