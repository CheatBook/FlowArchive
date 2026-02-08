import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * 【MarkdownComponents】
 * 
 * Markdown 内の特定の要素（コードブロック、リンク、画像など）を
 * React コンポーネントとしてどう描画するかを定義します。
 */
export const MarkdownComponents = {
  /**
   * コードブロック (```lang ... ```) の描画設定
   * 
   * @param node ノード情報
   * @param inline インラインコード（`code`）かブロックコード（```）か
   * @param className 言語指定（language-java など）
   * @param children コードの中身
   */
  code({ node, inline, className, children, ...props }: any) {
    // クラス名から言語（例: "language-java" -> "java"）を抽出します
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    // コードの末尾の余計な改行を削除
    const codeString = String(children).replace(/\n$/, '');

    /**
     * ブロックコード（言語指定あり）の場合は、SyntaxHighlighter を使って
     * 色付け（シンタックスハイライト）を行います。
     */
    if (!inline && language) {
      return (
        <SyntaxHighlighter
          style={vscDarkPlus} // VSCode のダークテーマ風の配色を適用
          language={language.toLowerCase()} // 言語（java, javascript, sql など）
          PreTag="div" // コードを囲むタグ
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      );
    }

    /**
     * 言語指定がない場合や、文中の `inline code` の場合は、
     * 標準の <code> タグでそのまま表示します。
     */
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

interface MarkdownRendererProps {
  content: string;
}

/**
 * 【MarkdownRenderer コンポーネント】
 * 
 * Markdown 文字列を HTML に変換して表示するための共通コンポーネントです。
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      /**
       * remarkGfm: 
       * GitHub Flavored Markdown の略。
       * これを入れることで、テーブル、打ち消し線、タスクリストなどが使えるようになります。
       */
      remarkPlugins={[remarkGfm]}
      /**
       * components: 
       * 上で定義したカスタム描画設定（コードブロックのハイライトなど）を適用します。
       */
      components={MarkdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
