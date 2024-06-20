
    <figure id="video-background" >
    </figure>

    <div id="player">
      <a class="close" href="#close">Close</a>
      <figure class="tall"></figure>
    </div>

    <script>
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
      e=o.createElement(i);r=o.getElementsByTagName(i)[0];
      e.src='//www.google-analytics.com/analytics.js';
      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
      ga('create','UA-29285295-1');ga('send','pageview');
    </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>
      window.jQuery || document.write('<script src="/assets/scripts/lib/jquery-1.11.3.min.js"><\/script>')
    </script>

    <?php echo js(array(
      '/assets/scripts/lib/underscore-1.7.0.min.js',
      'assets/scripts/main.min.js'
    )) ?>

  </body>
</html>