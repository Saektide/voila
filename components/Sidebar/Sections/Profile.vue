<template>
  <div id="va_skeleton_profile" class="flex items-center gap-3">
    <div class="w-10 h-10">
      <figure class="overflow-hidden flex relative rounded-full bg-blue-7 text-blue-2 w-full h-full">
        <img v-if="currentUser.contactPicture" class="w-full h-full object-cover" :src="currentUser.contactPicture" alt="User Avatar">
        <outline-user-icon v-else class="w-6 m-auto" />
      </figure>
    </div>
    <div class="flex flex-col gap-0.5 leading-none">
      <span class="capitalize font-medium" v-text="ninjaMode ? '••••••• •••••' : `${currentUser.contactFirstname} ${currentUser.contactLastname}`" />
      <span class="text-mono-7 text-sm" v-text="ninjaMode ? '••••••••••' : currentUser.username" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarSectionsProfile',
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    ...mapGetters({
      appSettings: 'settings/appSettings'
    }),
    ninjaMode () {
      return this.appSettings.ninjaMode
    }
  }
}
</script>
