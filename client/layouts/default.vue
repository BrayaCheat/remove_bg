<script setup>
import Toaster from '~/components/ui/toast/Toaster.vue';
</script>

<template>
    <div class="md:container w-full mx-auto min-h-screen">
        <navbar_component/>
        <div class="pt-20 px-3">
            <NuxtPage />
        </div>
        <Toaster />
    </div>
</template>