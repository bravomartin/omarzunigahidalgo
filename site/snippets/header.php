<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="<?= $site->description() ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title><?= $site->title() ?></title>
    
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="<?= $site->twitter() ?>" />
    <meta name="twitter:title" content="<?= $site->title() ?>" />
    <meta name="twitter:description" content="<?= $site->description() ?>" />
    <meta name="twitter:image" content="<?=$pages->find('bio')->image()->url()?>" />

    <meta property="og:title" content="<?= $site->title() ?>" />
    <meta property="og:site_name" content="My Favorite News"/>
    <meta property="og:url" content="<?= $site->url() ?>" />
    <meta property="og:description" content="<?= $site->description() ?>" />
    <meta property="og:type" content="profile" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:locale:alternate" content="es_ES" />

    
    <?php echo js('/assets/scripts/lib/modernizr.custom.95367.js') ?>
    <?php echo css('/assets/styles/main.min.css') ?>

  </head>
  <body>
  <!--[if lt IE 10]> 
    <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
 <![endif]-->    
    
  
    <nav>
      <ul class="row">
        <li><h1><a href="#intro"><?= $site->title() ?></a></h1></li>
        <?php snippet('menu') ?>
      </ul>
      <div id="lang">
        <a href="#es">ES</a>
        <a href="#en" class="current">EN</a>
      </div>
    </nav>
  