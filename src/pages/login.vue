<template>
    <div class="p-page_login l-content_maxWidth-md l-content_padding --sm">
        <div class="c-iframe_wrap">
            <iframe id="js-iframe" class="c-iframe" src="https://clp-inter.com/mypage/list.php"></iframe>
        </div> 
    </div> 
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            loading: false,
        };
    },
};
</script>
