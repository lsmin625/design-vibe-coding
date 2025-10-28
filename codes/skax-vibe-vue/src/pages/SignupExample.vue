<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="container" style="max-width: 400px;">
      <!-- Card -->
      <div class="card shadow-sm border-0">
        <div class="card-body p-4">

          <!-- Title -->
          <h1 class="h4 text-center mb-4 fw-semibold">회원가입</h1>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" novalidate>

            <!-- 이름 -->
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="inputName"
                placeholder="이름"
                v-model.trim="form.name"
                required
              />
              <label for="inputName">이름</label>
            </div>

            <!-- 이메일 -->
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="inputEmail"
                placeholder="name@example.com"
                v-model.trim="form.email"
                required
              />
              <label for="inputEmail">이메일</label>
            </div>

            <!-- 비밀번호 -->
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="비밀번호"
                v-model="form.password"
                required
                minlength="8"
              />
              <label for="inputPassword">비밀번호 (8자 이상)</label>
            </div>

            <!-- 비밀번호 확인 -->
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                :class="{
                  'is-invalid': showPasswordMismatch,
                  'is-valid': form.confirmPassword && !showPasswordMismatch
                }"
                id="inputConfirmPassword"
                placeholder="비밀번호 확인"
                v-model="form.confirmPassword"
                required
                minlength="8"
              />
              <label for="inputConfirmPassword">비밀번호 확인</label>
              <div class="invalid-feedback">
                비밀번호가 일치하지 않습니다.
              </div>
            </div>

            <!-- 생년월일 -->
            <div class="form-floating mb-3">
              <input
                type="date"
                class="form-control"
                id="inputBirth"
                placeholder="생년월일"
                v-model="form.birth"
                required
              />
              <label for="inputBirth">생년월일</label>
            </div>

            <!-- 전화번호 -->
            <div class="form-floating mb-4">
              <input
                type="tel"
                class="form-control"
                id="inputPhone"
                placeholder="010-1234-5678"
                v-model.trim="form.phone"
                required
              />
              <label for="inputPhone">전화번호</label>
            </div>

            <!-- Submit -->
            <button
              class="btn btn-primary w-100 py-2 fw-semibold"
              type="submit"
              :disabled="isSubmitting || showPasswordMismatch"
            >
              {{ isSubmitting ? '처리 중...' : '회원가입' }}
            </button>

          </form>

          <!-- Divider -->
          <div class="text-center my-3 text-muted small">
            ─ 또는 ─
          </div>

          <!-- Login link -->
          <div class="text-center">
            <span class="text-muted small">이미 계정이 있으신가요?</span>
            <a
              href="/login"
              class="ms-1 small text-decoration-none"
            >
              로그인하기
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  birth: '',
  phone: ''
})

const isSubmitting = ref(false)

const showPasswordMismatch = computed(() => {
  // 사용자가 확인란까지 뭔가 입력했는데 비번이 다르면 invalid
  return (
    form.confirmPassword !== '' &&
    form.password !== '' &&
    form.password !== form.confirmPassword
  )
})

function handleSubmit() {
  // 간단한 클라이언트 검증
  if (showPasswordMismatch.value) {
    // 부트스트랩 invalid 시각 효과는 이미 class 바인딩으로 처리됨
    return
  }

  // TODO: 실제 제출 처리 (예: axios.post 등)
  // 이 예제에서는 콘솔에만 찍고 버튼 로딩만 보여줌
  isSubmitting.value = true

  // 가짜 비동기 처리 시뮬레이션
  setTimeout(() => {
    console.log('회원가입 데이터:', { ...form })
    isSubmitting.value = false
    // 여기에 성공 후 라우팅(ex. this.$router.push('/welcome')) 붙이면 됨
  }, 800)
}
</script>

<style scoped>
/* 살짝 더 부드러운 카드 라운드와 폼 감각 */
.card {
  border-radius: 1rem;
}

/* 모바일에서 date input의 label이 겹치지 않도록 약간의 여백 */
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}
</style>
