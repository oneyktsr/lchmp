import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // savedPosition (Geri butonu hafızası) gelse bile yoksayıyoruz.
    // Her durumda sayfanın en tepesine (0,0) git.
    // behavior: 'auto' diyerek animasyonsuz, anında orada olmasını sağlıyoruz
    // (böylece GSAP tetikleyicileri doğru hesaplanır).
    return { top: 0, left: 0, behavior: "auto" };
  },
};
