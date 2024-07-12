const baseUrl = ref("");
if (process.client) {
  baseUrl.value = useRuntimeConfig().public.apiBase;
}

export default {
  getProducts() {
    return $fetch(`${baseUrl.value}/products`);
  },
  getDetailProduct(id) {
    return $fetch(`${baseUrl.value}/products/${id}`);
  },
  search(s) {
    return $fetch(`${baseUrl.value}/products/search?1q=${s}`);
  },
  getCategorys() {
    return $fetch(`${baseUrl.value}/products/categories`);
  },
  getCategorysDetail(slug, limit) {
    return $fetch(`${baseUrl.value}/products/category/${slug}/?limit=${limit.value}`);
  },
};
