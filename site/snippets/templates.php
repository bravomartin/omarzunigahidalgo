  <script id="videobg" type="text/x-template">
    <video id="video-{{slug}}" preload loop muted poster="{{background.jpg}}">
      
      <source src="{{background.mp4}}" type="video/mp4">
      
      <source src="{{background.webm}}" type="video/webm">
      <source src="{{background.ogv}}" type="video/ogg">
    </video>
  </script>
    <script id="imgbg" type="text/x-template">
    <img id="video-{{slug}}" src="{{background.jpg}}">
  </script>

  <script id="vimeo" type="text/x-template">
    <iframe src="//player.vimeo.com/video/{{vimeo_id}}?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1" 
    frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>
  </script>

  <script id="youtube" type="text/x-template">
    <iframe src="//www.youtube.com/embed/{{youtube_id}}?rel=0&amp;showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe>
  </script>

  <script id="movie-template" type="text/x-template">
    <article id="" 
    data-background="{{video}}" 
    data-vimeo="{{vimeo_id}}" >

    <figure class="still">
      <img src="images/.jpg">
    </figure>

    <section class="meta">
      <h2>{{title}}</h2>
      <p>{{cast}}</p>
    </section>
    <section class="synopsis">
      <p>{{synopsis}}</p>
      <p><a target="_blank">More Info</a></p>
    </section>
  </article>
</script>