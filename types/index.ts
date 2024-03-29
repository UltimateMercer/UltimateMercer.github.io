export type Project = {
  title: string;
  description?: string | null;
  imageHeader: string | null;
  cover: string | null;
  date: string;
  modifiedDate?: string | null;
  channel: string;
  category: string;
  tags?: string[] | null;
  layout?: string | null;
  filter: string | null;
  draft?: boolean;
  authors?: any[];
  gallery?: string[] | null;
  slug?: URL | string;
  body?: any;
};
