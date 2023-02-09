export type TextContainerContent = string | TextContainer;

export interface TextContainer {
  match: string;
  content: TextContainerContent[];
}

export type Matcher = RegExp | Matcher[];

export const textToContainers = (
  text: string,
  matcher: Matcher[]
): TextContainerContent[] => {
  if (!matcher.length) return [text];

  const matches: [number, Matcher, string][] = [];
  const checkMatches = (re: RegExp, matcher: Matcher) => {
    let match: RegExpExecArray | null = null;
    while ((match = re.exec(text)) != null)
      matches.push([match.index, matcher, match[0]]);
  };

  matcher.map(m => {
    if (!Array.isArray(m)) return checkMatches(m, m);
    if (m.length === 0) throw Error('Empty mather subarray');
    if (m.length > 0 && !(m[0] instanceof RegExp))
      throw Error('Empty mather subarray');
    return checkMatches(m[0] as RegExp, m);
  });
  matches.sort((a, b) => a[0] - b[0]);
  if (matches.length === 0) return [text];

  const containers: TextContainerContent[] = [];
  if (matches[0][0] !== 0) containers.push(text.substring(0, matches[0][0]));

  matches
    .map(([inx, matcher, match], i, self) => {
      if (!Array.isArray(matcher)) return text.substring(inx, self[i + 1]?.[0]);
      const subContentInx = inx + match.length;
      const subContent = text.substring(subContentInx, self[i + 1]?.[0]);
      return {
        match: match.trim(),
        content: textToContainers(subContent, matcher.slice(1)),
      } as TextContainer;
    })
    .forEach(m => containers.push(m));

  return containers;
};
