// @deno-types="./pkg/deno_rusty_markdown.d.ts"
import { parse as internalParse } from "./pkg/deno_rusty_markdown.js";

/**
 * Option object containing flags for enabling extra features that are not part
 * of the CommonMark spec.
 */
export interface Options {
  /** Enables Github flavored tables. */
  tables?: boolean;
  /**
   * Enables footnotes\[^1\].
   *
   * \[^1\]: Like this.
   */
  footnotes?: boolean;
  /** Enables strikethrough text, \~\~like this\~\~. */
  strikethrough?: boolean;
  /** Enables Github flavored task lists. */
  tasklists?: boolean;
  /** Enables smart punctuation (turns -- into –) */
  smartPunctuation?: boolean;
}

/**
 * Encodes options to pass them to WebAssembly
 *
 * @param options - Options to encode
 * @returns Encoded options
 */
function encodeOptions(options: Options): number {
  return (+(options.tables ?? false) << 1) +
    (+(options.footnotes ?? false) << 2) +
    (+(options.strikethrough ?? false) << 3) +
    (+(options.tasklists ?? false) << 4) +
    (+(options.smartPunctuation ?? false) << 5);
}

/**
 * Parses the given Markdown into HTML.
 *
 * @param text - Source Markdown text
 * @param options - Extra enabled features
 * @returns Parsed HTML
 */
export function parse(
  text: string,
  options: Options = {},
): string {
  return internalParse(text, encodeOptions(options));
}
