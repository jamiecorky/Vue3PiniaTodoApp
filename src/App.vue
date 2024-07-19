<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <div class="nav-container bg-white text-black">
            <nav class="p-4">
                <RouterLink to="/">Home</RouterLink>
            </nav>
        </div>
    </header>
    <div class="section-container p-4">
        <RouterView />
    </div>
</template>

<style scoped></style>
