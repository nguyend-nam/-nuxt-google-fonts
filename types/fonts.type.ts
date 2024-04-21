export interface BaseResponse<T> {
  data: T;
}

export interface FontItem {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: string;
  kind: string;
  menu: string;
}

export interface GetFontsResponse {
  kind: string;
  items: FontItem[];
}

export type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
