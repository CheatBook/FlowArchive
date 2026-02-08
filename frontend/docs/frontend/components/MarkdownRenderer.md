# MarkdownRenderer.tsx 超詳細解説

Markdown形式のテキストを、人間が読みやすいHTMLに変換し、コードに色をつける部品です。

```tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * 【MarkdownComponents】
 * Markdown内の特定の要素（今回はコードブロック）をどう描画するかを定義します。
 */
export const MarkdownComponents = {
  // code タグ（``` で囲まれた部分）が見つかった時に実行されます
  code({ node, inline, className, children, ...props }: any) {
    // クラス名（language-java など）から言語名を抽出します
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    // コード末尾の不要な改行を消します
    const codeString = String(children).replace(/\n$/, '');

    // インラインコード（文中の `code`）ではなく、言語指定があるブロックコードの場合
    if (!inline && language) {
      return (
        <SyntaxHighlighter
          style={vscDarkPlus} // VSCode風のダークテーマを適用
          language={language.toLowerCase()} // 言語（java, sqlなど）を指定
          PreTag="div" // コード全体を div で囲む
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      );
    }
    // 言語指定がない場合やインラインコードは、標準の <code> タグで表示します
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

/**
 * 【MarkdownRenderer】
 * content（Markdown文字列）を受け取り、変換して表示するメインの部品です。
 */
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]} // テーブルや打ち消し線などの拡張機能を有効化
      components={MarkdownComponents} // 上で定義したカスタム描画設定を適用
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
```
