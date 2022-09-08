<template>
  <el-upload
    class="uploader"
    drag
    action="https://jsonplaceholder.typicode.com/posts/"
    :accept="accept"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :multiple="multiple"
    :on-change="handleChange"
    ref="upload"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      {{ uploadText }}<em>{{ uploadSecondaryText }}</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">{{ tip }}</div>
    </template>
  </el-upload>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      required: false,
      default: "",
    },
    uploadText: {
      type: String,
      required: false,
      default: "Drop file here or ",
    },
    uploadSecondaryText: {
      type: String,
      required: false,
      default: "click to upload",
    },
    multiple: {
      type: Boolean,
      required: true,
      default: false,
    },
    accept: {
      type: String,
      required: true,
      default: "",
    },
    handlePreview: {
      type: Function,
      required: true,
      default: () => {},
    },
    handleRemove: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
  methods: {
    handleChange(file, fileList) {
      this.$emit("onChange", { file, fileList });
    },
  },
};
</script>