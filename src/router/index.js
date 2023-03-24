import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import ContactView from "../views/LandingPages/ContactUs/ContactView.vue";
import AuthorView from "../views/LandingPages/Author/AuthorView.vue";
import SignInBasicView from "../views/LandingPages/SignIn/BasicView.vue";
import PageHeaders from "../layouts/sections/page-sections/page-headers/HeadersView.vue";
import PageFeatures from "../layouts/sections/page-sections/features/FeaturesView.vue";
import NavigationNavbars from "../layouts/sections/navigation/navbars/NavbarsView.vue";
import NavigationNavTabs from "../layouts/sections/navigation/nav-tabs/NavTabsView.vue";
import NavigationPagination from "../layouts/sections/navigation/pagination/PaginationView.vue";
import InputAreasInputs from "../layouts/sections/input-areas/inputs/InputsView.vue";
import InputAreasForms from "../layouts/sections/input-areas/forms/FormsView.vue";
import ACAlerts from "../layouts/sections/attention-catchers/alerts/AlertsView.vue";
import ACModals from "../layouts/sections/attention-catchers/modals/ModalsView.vue";
import ACTooltipsPopovers from "../layouts/sections/attention-catchers/tooltips-popovers/TooltipsPopoversView.vue";
import ElAvatars from "../layouts/sections/elements/avatars/AvatarsView.vue";
import ElBadges from "../layouts/sections/elements/badges/BadgesView.vue";
import ElBreadcrumbs from "../layouts/sections/elements/breadcrumbs/BreadcrumbsView.vue";
import ElButtons from "../layouts/sections/elements/buttons/ButtonsView.vue";
import ElButtonGroups from "../layouts/sections/elements/button-groups/ButtonGroupsView.vue";
import ElDropdowns from "../layouts/sections/elements/dropdowns/DropdownsView.vue";
import ElProgressBars from "../layouts/sections/elements/progress-bars/ProgressBarsView.vue";
import ElToggles from "../layouts/sections/elements/toggles/TogglesView.vue";
import ElTypography from "../layouts/sections/elements/typography/TypographyView.vue";
import RentRoomView from "../views/RoomGuide/RentRoomView.vue";
import RoomGuideView from "../views/RoomGuide/RoomGuideView.vue";
import CooperationView from "../views/Other/Cooperation/CooperationView.vue";
import QuestionsView from "../views/Other/Questions/QuestionsView.vue";
import CouponView from "../views/Other/Cooperation/Coupon/CouponVIew.vue";
import SupplierDetailsView from "../views/Suppliers/SupplierDetailsView.vue";
import SiteView from "../views/Suppliers/SiteView.vue";
import RoomView from "../views/Suppliers/RoomView.vue";
import AboutUsView from "../views/Other/AboutUs/AboutUsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/userview",
      name: "userview",
      component: () => import("../views/Other/UserTerms/UserView.vue"),
      children: [
        {
          path: "userterms",
          name: "userview-userterms",
          component: () => import('../views/Other/UserTerms/Section/userterms.vue'),
        },
        {
          path: "privacy",
          name: "userview-privacy",
          component: () => import('../views/Other/UserTerms/Section/privacy.vue'),
        },
      ]
    },
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/AboutUs",
      name: "AboutUs",
      component: AboutUsView,
    },
    {
      path: "/questions",
      name: "questions",
      component: QuestionsView,
    },
    {
      path: "/addSite",
      name: "addSite",
      component: SiteView,
    },
    {
      path: "/addRoom",
      name: "addRoom",
      component: RoomView,
    },
    {
      path: "/supplierDetails",
      name: "supplierDetails",
      component: SupplierDetailsView,
    },
    {
      path: "/cooperation",
      name: "cooperation",
      component: CooperationView,
    },
    {
      path: "/views/rentroomview",
      name: "rentroomView",
      component: RentRoomView,
    },
    {
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/pages/landing-pages/basic",
      name: "signin-basic",
      component: SignInBasicView,
    },
    {
      path: "/sections/page-sections/page-headers",
      name: "page-headers",
      component: PageHeaders,
    },
    {
      path: "/sections/page-sections/features",
      name: "page-features",
      component: PageFeatures,
    },
    {
      path: "/sections/navigation/navbars",
      name: "navigation-navbars",
      component: NavigationNavbars,
    },
    {
      path: "/sections/navigation/nav-tabs",
      name: "navigation-navtabs",
      component: NavigationNavTabs,
    },
    {
      path: "/sections/navigation/pagination",
      name: "navigation-pagination",
      component: NavigationPagination,
    },
    {
      path: "/sections/input-areas/inputs",
      name: "inputareas-inputs",
      component: InputAreasInputs,
    },
    {
      path: "/sections/input-areas/forms",
      name: "inputareas-forms",
      component: InputAreasForms,
    },
    {
      path: "/sections/attention-catchers/alerts",
      name: "ac-alerts",
      component: ACAlerts,
    },
    {
      path: "/sections/attention-catchers/modals",
      name: "ac-modals",
      component: ACModals,
    },
    {
      path: "/sections/attention-catchers/tooltips-popovers",
      name: "ac-tooltips-popovers",
      component: ACTooltipsPopovers,
    },
    {
      path: "/sections/elements/avatars",
      name: "el-avatars",
      component: ElAvatars,
    },
    {
      path: "/sections/elements/badges",
      name: "el-badges",
      component: ElBadges,
    },
    {
      path: "/sections/elements/breadcrumbs",
      name: "el-breadcrumbs",
      component: ElBreadcrumbs,
    },
    {
      path: "/sections/elements/buttons",
      name: "el-buttons",
      component: ElButtons,
    },
    {
      path: "/sections/elements/button-groups",
      name: "el-button-groups",
      component: ElButtonGroups,
    },
    {
      path: "/sections/elements/dropdowns",
      name: "el-dropdowns",
      component: ElDropdowns,
    },
    {
      path: "/sections/elements/progress-bars",
      name: "el-progress-bars",
      component: ElProgressBars,
    },
    {
      path: "/sections/elements/toggles",
      name: "el-toggles",
      component: ElToggles,
    },
    {
      path: "/sections/elements/typography",
      name: "el-typography",
      component: ElTypography,
    },
    {
      path: "/roomguide",
      name: "RoomGuideView",
      component: RoomGuideView,
    },
    {
      path: "/member/orders",
      name: "member-orders",
      component: () => import('../views/Members/Orders/OrdersView.vue'),
      children: [
        {
          path: "inprogress",
          name: "member-orders-inprogress",
          component: () => import('../views/Members/Orders/Sections/InProgress.vue'),
        },
        {
          path: "cancel",
          name: "member-orders-cancel",
          component: () => import('../views/Members/Orders/Sections/Cancel.vue'),
        },
        {
          path: "finish",
          name: "member-orders-finish",
          component: () => import('../views/Members/Orders/Sections/Finish.vue'),
        },
      ]
    },
    {
      path: "/member/memberdetail",
      name: "member-memberdetail",
      component: () => import('../views/Members/MemberDetail/MemberDetails.vue'),
      children: [
        {
          path: "information",
          name: "member-memberdetail-information",
          component: () => import('../views/Members/MemberDetail/Sections/Information.vue'),
        },
        {
          path: "point",
          name: "member-memberdetail-point",
          component: () => import('../views/Members/MemberDetail/Sections/Point.vue'),
        },
        {
          path: "creditcard",
          name: "member-memberdetail-creditcard",
          component: () => import('../views/Members/MemberDetail/Sections/CreditCard.vue'),
        },
      ]
    },
    {
      path: "/other/CouponView",
      name: "other-CouponView",
      component: CouponView,
      children: [
        {
          path: "pointstableView",
          name: "other-CouponView-pointstable",
          component: () => import('../views/Other/Cooperation/Coupon/pointstableView.vue'),
        },
        {
          path: "UseCouponView",
          name: "other-CouponView-UseCouponView",
          component: () => import('../views/Other/Cooperation/Coupon/UseCouponView.vue'),
        },
      ]
    },
  ],
});
export default router;
