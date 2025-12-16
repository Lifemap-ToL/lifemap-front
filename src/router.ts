import { createRouter, createWebHistory } from 'vue-router';

function extractAncestorDescendants(queryString: string): number[] {
  const valid = /^\d+,\d+$/.test(queryString);
  return valid ? queryString.split(',').map(ncbiId => parseInt(ncbiId)) : [];
}

function extractNCBIIds(queryString?: string): number[] {
  const string = queryString || '';
  const valid = /^(\d+,)*\d+$/.test(string);
  const array = string.includes(',') ? string.split(',') : [queryString];
  return valid ? array.map(ncbiId => parseInt(ncbiId!)) : [];
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('./primary/homepage/Homepage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./primary/homepage/About.vue'),
    },
    {
      path: '/tree',
      name: 'tree',
      component: () => import('@/primary/tree/Tree.vue'),
      props: route => ({
        ...route.query,
        ancestorRequest: extractAncestorDescendants(route.query.ancestor as string),
        subtree: extractNCBIIds(route.query.subtree as string),
      }),
    },
  ],
});

export default router;
