export const DEFAULT_INTERNATIONALIZE_EXPAND_REGEXES = [
  {
    regex: /[åäàáâã]/gi,
    alternate: 'a',
  },
  {
    regex: /[èéêë]/gi,
    alternate: 'e',
  },
  {
    regex: /[ìíîï]/gi,
    alternate: 'i',
  },
  {
    regex: /[òóôõö]/gi,
    alternate: 'o',
  },
  {
    regex: /[ùúûü]/gi,
    alternate: 'u',
  },
  {
    regex: /[æ]/gi,
    alternate: 'ae',
  },
];

const WORDS_MATCH_RE = /[\p{L}\p{M}\p{N}]+/gu;

export function normalizeTrieInput(input: string) {
  let output = input.toLowerCase().replace(/[ \t]+/g, ' ');
  DEFAULT_INTERNATIONALIZE_EXPAND_REGEXES.forEach(({ regex, alternate }) => {
    output = output.replace(regex, alternate);
  });
  return output;
}

export function splitWords(words: string) {
  return words.match(WORDS_MATCH_RE) ?? [];
}
