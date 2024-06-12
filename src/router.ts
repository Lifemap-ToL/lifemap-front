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

function extractExpertMode(queryString?: string): boolean {
  return queryString && queryString === 'true' ? true : false;
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
      path: '/tree',
      name: 'tree',
      component: () => import('@/primary/tree/Tree.vue'),
      props: route => ({
        ...route.query,
        ancestorRequest: extractAncestorDescendants(route.query.ancestor as string),
        subtree: extractNCBIIds(route.query.subtree as string),
        expertMode: extractExpertMode(route.query.expertMode as string),
      }),
    },
    {
      path: '/ncbi-tree',
      name: 'ncbi-tree',
      component: () => import('@/primary/ncbi-tree-map/NCBITreeMap.vue'),
      props: route => ({
        ...route.query,
        ancestorRequest: extractAncestorDescendants(route.query.ancestor as string),
        subtree: extractNCBIIds(route.query.subtree as string),
        expertMode: extractExpertMode(route.query.expertMode as string),
      }),
    },
  ],
});

export default router;
