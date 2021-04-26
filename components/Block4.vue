<template>
  <v-main>
    <div id="bg-img">
      <div class="title">Fourth image</div>
    </div>

    <section>
      <h2>Section Four</h2>
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
  </v-main>
</template>

<script>
export default {}
</script>

<style>
#bg-img {
  height: 30vh;
  background-attachment: fixed;
  position: relative;
  margin: 0px 10vw 0px 10vw;
  background-image: url('https://picsum.photos/2000/3000?random=4');
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
</style>
