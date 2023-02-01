import type { PropsWithChildren } from 'react';

export type ListProps = PropsWithChildren<{
  title: string;
}>;
export type CardProps = {
  title: string;
  description: string;
  link: string;
}

