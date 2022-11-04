<script>
export default {
  props: {
    paddingTop: {
      type: String,
      default: '20',
      required: false,
    },
    paddingLeft: {
      type: String,
      default: '20',
      required: false,
    },
    paddingRight: {
      type: String,
      default: '20',
      required: false,
    },
    paddingBottom: {
      type: String,
      default: '20',
      required: false,
    },
  },
  computed: {
    paddings() {
      return {
        'padding-top': this.paddingTop,
        'padding-bottom': this.paddingBottom,
        'padding-left': this.paddingLeft,
        'padding-right': this.paddingRight,
      }
    },
  },
}
</script>
