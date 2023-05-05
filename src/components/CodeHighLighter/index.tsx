import { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as hljsStyles from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeHighLighterProps {
  code: string;
  showLineNumbers?: boolean;
  showInlineLineNumbers?: string;
  language?: string;
  lineNumberStyle?: object;
}

export const CodeHighLighter: FC<CodeHighLighterProps> = ({
  code,
  showLineNumbers = true,
  showInlineLineNumbers = true,
  language = 'javascript',
  lineNumberStyle = { color: '#858585' },
}) => {
  return (
    <SyntaxHighlighter
      showLineNumbers={showLineNumbers}
      showInlineLineNumbers={showInlineLineNumbers}
      language={language}
      style={hljsStyles.a11yDark}
      lineNumberStyle={lineNumberStyle}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHighLighter;
