import { useRef, useState } from 'react';
import CheckIcon from './svg/check-icon';
import CopyIcon from './svg/copy-icon';

type Props = {
  language: string;
  syntaxTokenizedHTMLString: string;
  title?: string;
};

// export default function CodeBlock({
//   language,
//   syntaxTokenizedHTMLString,
//   title
export default function CodeBlock(props: any) {
  const refCodeBlock = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const { language, syntaxTokenizedHTMLString, title } = props;

  async function copyClick() {
    navigator.clipboard.writeText(refCodeBlock.current.innerText).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  }

  return (
    <div className="lg:-mx-16">
      {title && <div className="remark-code-title">{title}</div>}
      <div className="relative">
        <button
          className="absolute right-2 top-2"
          aria-label="copy code block"
          title="Copy code block"
          onClick={copyClick}
        >
          {copied ? (
            <CheckIcon className="w-6 text-gray-600 text-opacity-70 transition-colors hover:text-gray-400" />
          ) : (
            <CopyIcon className="w-6 text-gray-600 text-opacity-70 transition-colors hover:text-gray-400" />
          )}
        </button>
        <pre className="remark-highlight">
          <code
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: syntaxTokenizedHTMLString }}
            ref={refCodeBlock}
          ></code>
        </pre>
      </div>
    </div>
  );
}
