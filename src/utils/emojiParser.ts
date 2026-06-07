/**
 * Parse Telegram <tg-emoji> tags and extract the fallback Unicode emoji
 * Example: <tg-emoji emoji-id="5368324170671202286">✨</tg-emoji> → ✨
 */
export function parseTelegramEmojis(html: string): string {
  if (!html) return "";
  return html.replace(
    /<tg-emoji emoji-id="\d+">(.+?)<\/tg-emoji>/g,
    "$1"
  );
}

/**
 * Strip all HTML tags from a string
 */
export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Parse Telegram emojis and strip remaining HTML
 */
export function sanitizeTelegramHtml(html: string): string {
  const withEmojis = parseTelegramEmojis(html);
  return stripHtml(withEmojis);
}
