<template>
  <footer id="va_sidebar_footer" class="flex justify-between items-center gap-6 mt-16">
    <ul id="va_sidebar_footer_links" class="flex gap-3">
      <li v-for="(link, linkIdx) in links" :key="linkIdx">
        <a
          v-if="link.external"
          :href="link.path"
          target="_blank"
          rel="noopener noreferrer"
          class="flex w-8 h-8 items-center justify-center duration-75 text-mono-5 dark:text-mono-8 hover:text-mono-1 dark:hover:text-mono-11 hover:bg-mono-10 dark:hover:bg-mono-2 rounded-lg"
        >
          <component :is="link.icon" class="w-6" />
        </a>
        <n-link
          v-else
          :to="link.path"
          class="flex w-8 h-8 items-center justify-center duration-75 text-mono-5 dark:text-mono-8 hover:text-mono-1 dark:hover:text-mono-11 hover:bg-mono-10 dark:hover:bg-mono-2 rounded-lg"
        >
          <component :is="link.icon" class="w-6" />
        </n-link>
      </li>
    </ul>
    <span class="text-mono-7" v-text="version" />
  </footer>
</template>

<script>
import appPkg from '~/package.json'

export default {
  name: 'SidebarSectionsFooter',
  data () {
    return {
      links: [
        { name: 'GitHub', path: 'https://github.com/saektide/voila', icon: 'solid-code-icon', external: true },
        { name: 'Acerca', path: '/about', icon: 'solid-information-circle-icon' }
      ],
      version: appPkg.version
    }
  }
}
</script>
