<!-- ProductListView.vue -->
<template>
  <div class="container py-4 product-list-view bg-body">
    <!-- 3.1 페이지 헤더 -->
    <header class="mb-4">
      <h1 class="h4 fw-bold mb-1 text-primary">디자인 굿즈 탐색</h1>
      <p class="text-muted small mb-0">
        오픈소스 패러디 굿즈를 발견하고, 창작자와 프로젝트에 기여하세요.
      </p>
    </header>

    <!-- 3.2 필터/검색 영역 -->
    <section class="card shadow-sm mb-4 border-0">
      <div class="card-body">
        <form
          class="row gy-3 gx-3 align-items-end"
          @submit.prevent="applyFilters"
        >
          <!-- 검색어 -->
          <div class="col-12 col-md-4">
            <label
              for="searchKeyword"
              class="form-label small fw-semibold"
            >
              검색어
            </label>
            <input
              id="searchKeyword"
              type="text"
              class="form-control form-control-sm"
              v-model="searchKeyword"
              placeholder="예: kubernetes 밈 티셔츠"
              :style="{ fontSize: 'var(--token-font-size-body-sm)' }"
            />
          </div>

          <!-- 카테고리 -->
          <div class="col-6 col-md-2">
            <label
              for="categorySelect"
              class="form-label small fw-semibold"
            >
              카테고리
            </label>
            <select
              id="categorySelect"
              class="form-select form-select-sm"
              v-model="selectedCategory"
            >
              <option
                v-for="item in filters.categoryList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>

          <!-- 정렬 -->
          <div class="col-6 col-md-2">
            <label
              for="sortSelect"
              class="form-label small fw-semibold"
            >
              정렬
            </label>
            <select
              id="sortSelect"
              class="form-select form-select-sm"
              v-model="sortOption"
            >
              <option
                v-for="opt in filters.sortOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>

          <!-- 최소 가격 -->
          <div class="col-6 col-md-2">
            <label class="form-label small fw-semibold">
              최소 가격 (₩)
            </label>
            <input
              type="number"
              min="0"
              class="form-control form-control-sm"
              v-model.number="priceRange.min"
            />
          </div>

          <!-- 최대 가격 -->
          <div class="col-6 col-md-2">
            <label class="form-label small fw-semibold">
              최대 가격 (₩)
            </label>
            <input
              type="number"
              min="0"
              class="form-control form-control-sm"
              v-model.number="priceRange.max"
            />
          </div>

          <!-- 적용 버튼 -->
          <div class="col-12 col-md-12 text-end">
            <button
              type="submit"
              class="btn btn-primary btn-sm px-3 fw-semibold"
            >
              필터 적용
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- 3.3 상품 카드 그리드 -->
    <section class="row g-3">
      <div
        v-for="item in products"
        :key="item.id"
        class="col-6 col-md-4 col-lg-3"
      >
        <article
          class="card h-100 border-0 shadow-sm product-card"
          :style="{
            cursor: 'pointer',
            backgroundColor: 'var(--token-surface-card)'
          }"
          @click="$emit('selectProduct', item.id)"
        >
          <!-- 썸네일 -->
          <div
            class="ratio ratio-1x1 bg-light rounded-top"
            :style="{ backgroundColor: 'var(--token-surface-image-bg)' }"
          >
            <img
              class="w-100 h-100 object-fit-cover rounded-top"
              :src="item.thumbnailUrl"
              :alt="item.title"
            />
          </div>

          <!-- 카드 본문 -->
          <div class="card-body d-flex flex-column">
            <!-- 제목 -->
            <h2
              class="fs-6 fw-semibold mb-1 text-truncate product-title"
              :style="{ color: 'var(--token-text-strong)' }"
            >
              {{ item.title }}
            </h2>

            <!-- 짧은 설명 -->
            <p
              class="text-muted small mb-2 text-truncate-2 product-desc"
              :style="{ color: 'var(--token-text-secondary)' }"
            >
              {{ item.shortDesc }}
            </p>

            <!-- 디자이너 / 기부율 -->
            <div
              class="d-flex justify-content-between align-items-center mb-2 small"
            >
              <span
                class="text-muted text-truncate me-1"
                :style="{ color: 'var(--token-text-tertiary)' }"
              >
                {{ item.designer.nickname }}
              </span>

              <span
                class="badge rounded-pill bg-success-subtle text-success-emphasis donation-badge"
                :style="{
                  backgroundColor: 'var(--token-badge-donation-bg)',
                  color: 'var(--token-badge-donation-fg)'
                }"
              >
                {{ '기부 ' + item.donationRate + '%' }}
              </span>
            </div>

            <!-- 가격 / 인기지표 -->
            <div
              class="d-flex justify-content-between align-items-end mt-auto"
            >
              <div
                class="fw-bold price-label"
                :style="{ color: 'var(--token-text-price)' }"
              >
                ₩ {{ formatPrice(item.price) }}
              </div>

              <div
                class="text-muted small text-end"
                :style="{ color: 'var(--token-text-tertiary)' }"
              >
                {{ item.likes }} ❤️ / {{ item.salesCount }} sold
              </div>
            </div>

            <!-- 장바구니 버튼 -->
            <button
              type="button"
              class="btn btn-outline-primary btn-sm w-100 mt-3 add-cart-btn"
              @click.stop="$emit('addToCart', item.id)"
              :style="{
                borderColor: 'var(--token-action-primary)',
                color: 'var(--token-action-primary)'
              }"
            >
              장바구니 담기
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- 3.4 더 보기 -->
    <div class="text-center py-4">
      <button
        type="button"
        class="btn btn-light border btn-sm px-4"
        :disabled="isLoading || currentPage >= totalPages"
        @click="loadMore"
        :style="{
          backgroundColor: 'var(--token-surface-pagecontrol)',
          borderColor: 'var(--token-border-muted)'
        }"
      >
        {{ isLoading ? '불러오는 중...' : '더 보기' }}
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * ProductListView
 * - OSS 패러디 굿즈 탐색/검색 메인 화면
 * - 로그인 없이 접근 가능
 * - emits:
 *    - selectProduct(productId: string)
 *    - addToCart(productId: string)
 */

import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['selectProduct', 'addToCart'])

// ===========================
// 1. STATE
// ===========================
const searchKeyword = ref('')
const selectedCategory = ref('all')
const sortOption = ref('popularity')

const priceRange = reactive({
  min: 0,
  max: 0
})

const products = ref([
  // 초기 더미. 실제 구현 단계에서는 fetchProducts()로 교체
  {
    id: 'p001',
    thumbnailUrl: 'https://placehold.co/400x400?text=K8s+Meme',
    title: '쿠버네티스 혼돈 모드 티셔츠',
    shortDesc: '쿠버네티스가 밤새 죽고 살아나는 그 감정... 그대로 담았습니다.',
    price: 32000,
    likes: 128,
    salesCount: 57,
    donationRate: 10,
    designer: {
      id: 'd01',
      nickname: 'dev_panda'
    }
  },
  {
    id: 'p002',
    thumbnailUrl: 'https://placehold.co/400x400?text=Linux+Penguin',
    title: 'sudo rm -rf / 후회 머그컵',
    shortDesc: 'Tux가 멘붕 온 얼굴로 커피를 들고 있는 블랙유머 컵',
    price: 18000,
    likes: 412,
    salesCount: 230,
    donationRate: 7,
    designer: {
      id: 'd02',
      nickname: 'rootcoffee'
    }
  }
])

const isLoading = ref(false)
const currentPage = ref(1)
const totalPages = ref(5)

const filters = reactive({
  categoryList: [
    { value: 'all', label: '전체' },
    { value: 'tshirt', label: '티셔츠' },
    { value: 'sticker', label: '스티커' },
    { value: 'mug', label: '머그컵' }
  ],
  sortOptions: [
    { value: 'popularity', label: '인기순' },
    { value: 'newest', label: '신상품순' },
    { value: 'donation', label: '기부율높은순' }
  ]
})

// ===========================
// 2. ROUTER
// ===========================
const router = useRouter()
const route = useRoute()

// URL 쿼리를 기반으로 초기 필터 세팅 (ex. /products?category=tshirt&sort=newest)
onMounted(() => {
  if (route.query.category && typeof route.query.category === 'string') {
    selectedCategory.value = route.query.category
  }
  if (route.query.sort && typeof route.query.sort === 'string') {
    sortOption.value = route.query.sort
  }

  fetchProducts()
})

// ===========================
// 3. METHODS (Composition API)
// ===========================
function applyFilters() {
  // 1) 페이지 리셋
  currentPage.value = 1
  // 2) 상품 다시 가져오기
  fetchProducts()
  // 3) 라우터 쿼리 동기화 (검색 공유/북마크 가능하도록)
  router.replace({
    path: '/products',
    query: {
      category: selectedCategory.value,
      sort: sortOption.value,
      q: searchKeyword.value || undefined,
      min: priceRange.min || undefined,
      max: priceRange.max || undefined
    }
  })
}

async function fetchProducts() {
  // 실제 구현 시:
  // - API 호출 파라미터: searchKeyword, selectedCategory, sortOption, priceRange, currentPage
  // - 결과: products.value, totalPages.value 업데이트
  //
  // 여기서는 스케치 단계이므로 isLoading 토글/설명만 유지
  isLoading.value = true

  // TODO: axios/fetch 등으로 데이터 받아온다고 가정
  // products.value = [...]
  // totalPages.value = response.totalPages

  // 데모를 위해 약간의 상태 변화만
  // (실제 네트워크 호출 로직은 프로토타이핑 단계에서 구현)
  isLoading.value = false
}

async function loadMore() {
  if (currentPage.value >= totalPages.value) return

  isLoading.value = true
  currentPage.value = currentPage.value + 1

  // TODO: 다음 페이지 fetch 후 products 뒤에 push
  // const nextItems = await api(...)
  // products.value.push(...nextItems)

  isLoading.value = false
}

// 상세 이동 유틸 (현재 템플릿에선 card click에서 emit만 하지만,
// 라우터 이동을 직접 쓰고 싶을 때 사용 가능)
function goToDetail(productId) {
  emit('selectProduct', productId)
  router.push(`/products/${productId}`)
}

// ===========================
// 4. HELPERS
// ===========================
function formatPrice(value) {
  // "32000" -> "32,000"
  if (typeof value !== 'number') return value
  return value.toLocaleString()
}
</script>

<style scoped>
/* =========================
   Token variables (예: style-dictionary 결과물)
   실제 빌드에서는 :root 등에 존재한다고 가정
   여기서는 참조만 → 커스텀 CSS는 최소화
========================= */
/* 예시: 2줄 말줄임 */
.product-desc.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 카드 radius / hover 효과 */
.product-card {
  border-radius: var(--token-radius-card-radius);
  transition: box-shadow 0.15s ease;
}
.product-card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08);
}

/* 장바구니 버튼 타이포 */
.add-cart-btn {
  font-weight: 600;
}

/* 가격 라벨 강조 */
.price-label {
  font-size: 0.9rem;
}

/* 기부율 뱃지 사이즈 */
.donation-badge {
  font-size: 0.7rem;
  font-weight: 600;
}
</style>
