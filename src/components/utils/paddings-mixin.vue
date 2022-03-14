<script>
export default {
  props: {
    paddingTop: {
      type: String,
      default: "20",
      required: true,
    },
    paddingLeft: {
      type: String,
      default: "20",
      required: true,
    },
    paddingRight: {
      type: String,
      default: "20",
      required: true,
    },
    paddingBottom: {
      type: String,
      default: "20",
      required: true,
    },
  },
  computed: {
    paddings() {
      return {
        "padding-top": this.paddingTop,
        "padding-bottom": this.paddingBottom,
        "padding-left": this.paddingLeft,
        "padding-right": this.paddingRight,
      };
    },
  },
};
</script>