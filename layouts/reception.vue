<template>
  <div id="voila_wrapper_reception" class="flex md:flex-col-reverse lg:flex-row bg-blue-0 w-full fixed h-full inset-y-0">
    <div class="fixed z-0 inset-0">
      <img class="w-full h-full object-cover" src="~/assets/reception/bg.jpg" alt="Photo by Milad Fakurian on Unsplash">
    </div>
    <div class="fixed z-10 inset-0 bg-gradient-to-b from-blue-2 to-blue-1 opacity-50" />
    <div id="voila_reception_left" class="sticky z-20 px-8 xl:px-14 bg-mono-12 text-mono-0 shadow-xl flex items-center justify-center py-8 w-full lg:w-96 xl:w-120 overflow-hidden">
      <nuxt />
    </div>
    <div id="voila_reception_right" class="hidden md:block relative z-20 flex-1">
      <div class="bg-blue-0 bg-opacity-75 text-mono-12 py-3 px-5 rounded-md absolute bottom-8 left-8">
        <p>
          Fondo creado por
          <a class="underline text-blue-5" :href="bgAuthorUrl" v-text="bgAuthorDisplayname" /> en
          <a class="underline text-blue-5" :href="unsplashUrl">Unsplash</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReceptionLayout',
  data () {
    return {
      bgAuthorUrl: 'https://unsplash.com/@fakurian',
      bgAuthorDisplayname: 'Milad Fakurian',
      unsplashUrl: 'https://unsplash.com/'
    }
  }
}
</script>
