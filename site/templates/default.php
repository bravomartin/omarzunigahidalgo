<?php snippet('header') ?>

  <main class="main" id="main" role="main">
      <?php $intro = $pages->find('home') ?>
      <?php $bg = $intro->files()->filterBy( 'name', $intro->backgroundVideo()) ?>  
  
      <div id="intro" data-background='<?php foreach ($bg as $a => $b) { echo $b->extension(),',', $b->url(),';'; }?>' >

        <section class="updates">
            <div lang="en"><?= $intro->TextEn()->kirbytext() ?></div>
            <div lang="es"><?= $intro->TextEs()->kirbytext() ?></div>
        </section>
        <i class="arrowDown"></i>
      </div>
      <?php snippet('films') ?>
      
    <?php if ($pages->has('bio')): ?>
    <? $bio = $pages->find('bio') ?>
    <article id="bio"
      data-background="white"
      >
      <h2><?= $site->title()?></h2>
      
      <figure>
        <img src="<?= $bio->image()->url() ?>" alt="Omar Zúñiga Hidalgo">
      </figure>
      <section lang="en">
        <?= $bio->textEn()->kirbytext() ?>
      </section>
      <section lang="es">
        <?= $bio->textEs()->kirbytext() ?>
      </section>
      
      <div class="by"><?=$site->copyright()->kirbytext() ?></div>

    </article>
    <?php endif ?>


  </main>

<?php snippet('templates') ?>
<?php snippet('footer') ?>
