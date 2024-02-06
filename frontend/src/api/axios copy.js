import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // session 사용
});

// Response 인터셉터 - 응답 후에 수행
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // 401 에러가 발생하면 로그인 페이지 처리, 클라이언트 세션 초기화
      console.log("401 에러가 발생했습니다. 로그인 페이지로 이동합니다.");
      sessionStorage.clear();
      alert("로그인하세용");

      // 로그인 페이지로 리다이렉트
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
