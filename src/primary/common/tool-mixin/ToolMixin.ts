import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component
export class ToolMixin extends Vue {
  @Prop({ type: String, required: false })
  tool?: string;

  @Prop({ type: Boolean, default: false })
  expertMode!: boolean;

  public changeTool(tool: string) {
    const newTool = this.tool === tool ? undefined : tool;
    const routeQuery = { ...this.$router.currentRoute.value.query, tool: newTool };
    this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
  }
}
