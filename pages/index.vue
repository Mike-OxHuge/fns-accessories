<template>
  <v-main class="my-4">
    <div id="main">
      <div id="bg-img1">
        <div class="title">First image</div>
      </div>

      <section id="section-one">
        <h2>Section One</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt,
          laudantium, quibusdam? Nobis, delectus, commodi, fugit amet tempora
          facere dolores nisi facilis consequatur, odio hic minima nostrum.
          Perferendis eos earum praesentium, blanditiis sapiente labore aliquam
          ipsa architecto vitae. Minima soluta temporibus voluptates inventore
          commodi cumque esse suscipit optio aliquam et, dolorem a cupiditate
          nihil fuga laboriosam fugiat placeat dignissimos! Unde eveniet placeat
          quisquam blanditiis voluptatem doloremque fugiat dolor repellendus
          ratione in. Distinctio provident dolorem modi cumque illo enim quidem
          tempora deserunt nostrum voluptate labore repellat quisquam quasi cum
          suscipit dolore ab consequuntur, ad porro earum temporibus. Laborum ad
          temporibus ex, omnis!
        </p>
      </section>

      <div id="bg-img2">
        <div class="title">
          <span>
            <span>Second Image</span>
          </span>
        </div>
      </div>

      <section id="section-two">
        <h2>Section Two</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt,
          laudantium, quibusdam? Nobis, delectus, commodi, fugit amet tempora
          facere dolores nisi facilis consequatur, odio hic minima nostrum.
          Perferendis eos earum praesentium, blanditiis sapiente labore aliquam
          ipsa architecto vitae. Minima soluta temporibus voluptates inventore
          commodi cumque esse suscipit optio aliquam et, dolorem a cupiditate
          nihil fuga laboriosam fugiat placeat dignissimos! Unde eveniet placeat
          quisquam blanditiis voluptatem doloremque fugiat dolor repellendus
          ratione in.
        </p>
      </section>

      <div id="bg-img3">
        <div class="title">
          <span class="border trans"> Third Image </span>
        </div>
      </div>

      <section id="section-three">
        <h2>Section Three</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt,
          laudantium, quibusdam? Nobis, delectus, commodi, fugit amet tempora
          facere dolores nisi facilis consequatur, odio hic minima nostrum.
          Perferendis eos earum praesentium, blanditiis sapiente labore aliquam
          ipsa architecto vitae. Minima soluta temporibus voluptates inventore
          commodi cumque esse suscipit optio aliquam et, dolorem a cupiditate
          nihil fuga laboriosam fugiat placeat dignissimos! Unde eveniet placeat
          quisquam blanditiis voluptatem doloremque fugiat dolor repellendus
          ratione in.
        </p>
      </section>

      <div id="bg-img4">
        <div class="title">One more image</div>
      </div>
    </div>

    <Social />
  </v-main>
</template>

<script>
import Social from '~/components/Social.vue'

export default {
  components: {
    Social,
  },
  data() {
    return {
      images: [
        { url: 'https://picsum.photos/2000/3000?random=1' },
        { url: 'https://picsum.photos/2000/3000?random=2' },
        { url: 'https://picsum.photos/2000/3000?random=3' },
        { url: 'https://picsum.photos/2000/3000?random=4' },
      ],
    }
  },
}
</script>

<style>
#bg-img1,
#bg-img2,
#bg-img3,
#bg-img4 {
  height: 30vh;
  background-attachment: fixed;
  position: relative;
  margin: 0px 10vw 0px 10vw;
}

#bg-img1 {
  background-image: url('https://picsum.photos/1920/1080');
}

#bg-img2 {
  background-image: url('https://picsum.photos/1920/1070');
}

#bg-img3 {
  background-image: url('https://picsum.photos/1910/1080');
}

#bg-img4 {
  background-image: url('https://picsum.photos/1910/1070');
}

.title {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #141414;
  width: 50%;
  left: 25%;
  text-align: center;
  padding: 2vh 0px;
  text-transform: uppercase;
}
p {
  padding: 0px 7vw 0px 7vw;
}
h2 {
  text-align: center;
}
</style>
