<template>
  <div class="new-post">
    <h2>📝 새 글 작성</h2>
    <form @submit.prevent="submit">
      <textarea
        v-model="content"
        placeholder="내용을 입력하세요"
        rows="6"
        required
      ></textarea>
      <input type="file" multiple @change="handleFileChange" accept="image/*" />

      <div class="preview">
        <div
          v-for="(img, index) in previewUrls"
          :key="index"
          class="preview-img"
        >
          <img :src="img" />
          <button type="button" @click="removeImage(index)">삭제</button>
        </div>
      </div>

      <button type="submit">등록하기</button>
    </form>
  </div>
</template>

<script>
import { createPost } from "@/libs/PostService";
import { uploadImage } from "@/libs/uploadService";
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const content = ref("");
    const imageFiles = ref([]);
    const previewUrls = ref([]);
    const userStore = useUserStore();
    const router = useRouter();

    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      for (const file of files) {
        imageFiles.value.push(file);
        previewUrls.value.push(URL.createObjectURL(file));
      }
    };

    const removeImage = (index) => {
      imageFiles.value.splice(index, 1);
      previewUrls.value.splice(index, 1);
    };

    const submit = async () => {
      if (!content.value.trim()) return;

      const imageUrls = [];
      for (const file of imageFiles.value) {
        const url = await uploadImage(file);
        imageUrls.push(url);
      }

      await createPost(userStore.user, content.value, imageUrls);
      router.push("/posts");
    };

    return {
      content,
      previewUrls,
      imageFiles,
      submit,
      handleFileChange,
      removeImage
    };
  }
};
</script>

<style scoped lang="scss">
.new-post {
  max-width: 600px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;

  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    textarea {
      padding: 12px;
      font-size: 16px;
      resize: vertical;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    button {
      align-self: flex-end;
      padding: 10px 20px;
      background-color: #42b883;
      color: white;
      font-size: 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;

      &:hover {
        background-color: #36996e;
      }
    }
  }
}

.preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;

  .preview-img {
    position: relative;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 6px;
    }

    button {
      position: absolute;
      top: 4px;
      right: 4px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      border-radius: 50%;
      padding: 5px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
</style>
