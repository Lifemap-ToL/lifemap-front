import { Component, Inject, Vue } from 'vue-facing-decorator';
import { TemplateVue } from '@/primary/common/template';
import { NavbarVue } from '@/primary/homepage/navbar';
import { FooterVue } from '@/primary/homepage/footer';

@Component({
  components: { TemplateVue, NavbarVue, FooterVue },
})
export default class AboutComponent extends Vue {
  mobile = false;

  private mobileDevice() {
    this.mobile = window.document.body.clientWidth < 1024;
  }

  created() {
    this.mobileDevice();
  }
}
