// バックエンドのナレッジエンティティに対応するフロント側の型定義
export interface Knowledge {
  id?: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

// ページングされたAPIレスポンスの共通的な型定義
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
