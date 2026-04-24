import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dynai Chemical',
  description: 'Jiangsu Dynai Chemical Co., Ltd.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
