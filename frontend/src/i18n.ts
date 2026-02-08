import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import jaJson from './locales/ja.json';

/**
 * 【i18n 設定】
 * 
 * 多言語対応（国際化）のためのライブラリ i18next の初期設定です。
 * 文字列を直接コードに書かず、JSON ファイルから読み込むようにします。
 */
i18n
  .use(LanguageDetector) // ブラウザの言語設定を自動で検出
  .use(initReactI18next) // react-i18next を初期化
  .init({
    resources: {
      ja: {
        translation: jaJson
      }
    },
    fallbackLng: 'ja', // 言語が見つからない場合のデフォルト
    interpolation: {
      escapeValue: false // React は XSS 対策済みなので false で OK
    }
  });

export default i18n;
