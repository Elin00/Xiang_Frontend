import { reactive, ref, computed } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("ModalData", () => {
    let LoginModal = null;
    let RegisterModal = null;
    const LoginModalOpen = () => {
        LoginModal.show();
    }
    const RegisterModalOpen = () => {
        RegisterModal.show();
    }
    const LoginModalHide = () => {
        if (LoginModal) {
          LoginModal.hide();
        }
      };
    const RegisterModalHide = () => {
        if (RegisterModal) {
            RegisterModal.hide();
          }
    }

    const Modalmaterial = () => {
        LoginModal = new bootstrap.Modal(document.getElementById('Login'));
        RegisterModal = new bootstrap.Modal(document.getElementById('Register'));
    };

    return { Modalmaterial,LoginModalOpen,RegisterModalOpen,LoginModalHide,RegisterModalHide}
})