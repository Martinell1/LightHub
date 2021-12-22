<template>
  <editor editor v-model="value" :preview="preview" @upload-img="onUploadImg"></editor>
</template>

<script setup lang="ts">
import { upload, toQiNiu } from '@/api/common'
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const props: any = defineProps({
  value: String,
  preview: Boolean
})


const onUploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
  let file = files[0]
  let { data: result } = await upload();
  if (result.code === 200) {
    const form = new FormData();
    form.append("token", result.data)
    form.append("file", file)
    let { data: res } = await toQiNiu(form);

    let url: any = []
    url.push("http://qiniu.kaijinx.top/" + res.key)
    callback(url);
  }
}
</script>
<style  scoped>
</style>