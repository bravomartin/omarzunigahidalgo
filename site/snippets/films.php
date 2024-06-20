<?php foreach(page('films')->children()->visible() as $film): ?> 
  
  <?php $bg = $film->files()->filterBy( 'name', $film->backgroundVideo()) ?>  
  <article id="<?= $film-> slug()?>" data-background='<?php foreach ($bg as $a => $b) { echo $b->extension(),',', $b->url(),';'; }?>' >

    <figure class="still">
      <img href="#player" src="<?= $film->image()->url() ?>" >
      <figcaption lang="en">
        <?php echo $film->watchEn()->kirbytext() ?>  
      </figcaption>
      <figcaption lang="es">
        <?php echo $film->watchEs()->kirbytext() ?>  
      </figcaption>
    </figure>

    <section class="meta" lang="en">
      <h2><?php echo $film->titleEn() ?></h2>
      <?php echo $film->metaEn()->kirbytext() ?>
    </section>
    <section class="meta" lang="es">
      <h2><?php echo $film->titleEs() ?></h2>
      <?php echo $film->metaeEs()->kirbytext() ?>
    </section>
    
    <section class="synopsis" lang="en">
      <?php echo $film->synopsisEn()->kirbytext() ?>
      <?php if (! $film->moreEn()->empty()) { ?>
        <p><a target="_blank" href="<?php echo $film->moreEn() ?>">More Info</a></p>
      <?php } ?>  
    </section>
    <section class="synopsis" lang="es">
      <?php echo $film->synopsisEs()->kirbytext() ?>
      <?php if (!$film->moreEs()->empty()) { ?>
      <p><a target="_blank" href="<?php echo $film->moreEs() ?>">Más Info</a></p>
      <?php } ?>
    </section>
  </article>
<?php endforeach ?>
