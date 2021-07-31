<template>
  <div class="floating">
    <v-list-item v-for="social in socials" :key="social.i" dense class="px-0">
      <v-list-item-icon class="mx-0">
        <a :href="social.link" target="_blank">
          <v-icon left color="primary">
            {{ social.icon }}
          </v-icon>
        </a>
      </v-list-item-icon>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socials: [
        {
          icon: 'mdi-instagram',
          link: 'https://instagram.com',
        },
        {
          icon: 'mdi-twitter',
          link: 'https://twitter.com',
        },
        {
          icon: 'mdi-facebook',
          link: 'https://facebook.com',
        },
        {
          icon: 'mdi-youtube',
          link: 'https://youtube.com',
        },
      ],
    }
  },
}
</script>

<style scoped>
.floating {
  display: flex;
  flex-direction: column;
  float: right;
  position: fixed;
  right: 0;
  bottom: 5%;
}
a {
  text-decoration: none;
}
</style>
