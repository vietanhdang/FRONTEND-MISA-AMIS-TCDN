<template>
    <transition name="fade">
        <div class="loading" v-if="!isLoaded">
            <div class="loading__content">
                <div class="loading__icon"></div>
                <!-- <div class="loading__text">Đang tải dữ liệu...</div> -->
            </div>
        </div>
    </transition>

</template>
  
<script>
// import { mapState } from "vuex";
export default {
    name: "BaseLoading",
    props: {
        isLoaded: {
            style: Boolean,
            default: false,
        }
    },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.loading {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.05);
    z-index: 1001;
}



.loading__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading__icon {
    box-sizing: content-box;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border-top: 8px solid #2ca01c;
    border-left: 8px solid #2ca01c;
    border-bottom: 8px solid #fff;
    border-right: 8px solid #fff;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 1s linear infinite;
}

.loading__text {
    color: #fff;
    font-size: 14px;
}

@-moz-keyframes spin {
    from {
        -moz-transform: rotate(0deg);
    }

    to {
        -moz-transform: rotate(360deg);
    }
}

@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
