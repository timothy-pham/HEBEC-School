export type Book = {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  thumbnail?: string;
  isOutOfStock?: boolean;
  page?: number;
  size?: string;
  publishDate?: '';
  finalPrice?: number;
  originPrice?: number;
  description?: string;
  name?: string;
  isHighlight?: boolean;
  authorName?: string;
  type?: string;
  isRemoved?: boolean;
  code?: string;
  kvId?: number;
  attribute1?: string;
  attribute2?: string;
  category?: {
    id?: number;
    createdAt?: number;
    updatedAt?: number;
    priority?: number;
    thumbnail?: string;
    name?: string;
    level?: number;
    isHighlight?: boolean;
    isShowInApp?: boolean;
    root?: undefined;
  };
  bookGalleries?: [
    {
      id?: number;
      createdAt?: number;
      updatedAt?: number;
      thumbnail?: string;
    },
  ];
};
