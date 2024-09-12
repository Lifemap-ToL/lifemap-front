import { Component, Vue } from 'vue-facing-decorator';
import { XIconVue } from '@/primary/homepage/navbar/x-icon';
import { GithubIconVue } from '@/primary/homepage/navbar/github-icon';

@Component({ components: { XIconVue, GithubIconVue } })
export default class NavSidebarComponent extends Vue {}
