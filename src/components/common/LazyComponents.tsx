import { lazy } from 'react';

// Lazy loading de componentes pesados
export const AllBlogPosts = lazy(() =>
	import('../../screens/AllBlogPosts').then((m) => ({ default: m.AllBlogPosts }))
);
export const AllCertificates = lazy(() => import('../../screens/AllCertificates'));
export const AllGoals = lazy(() => import('../../screens/AllGoals'));
export const AllNotionNotes = lazy(() => import('../data/AllNotionNotes'));
