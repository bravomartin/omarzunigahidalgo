<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

c::set('license', 'K2-PERSONAL-eb7bf51a27b65d278e9dbc4ef161a343');

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/
c::set('url', 'http://bravomartin.local:8000');

c::set('cdn.assets', false);
c::set('cdn.content', false);
c::set('cdn.thumbs', false);
// c::set('cdn.assets', "dhdyz5j1r0dai.cloudfront.net");
// c::set('cdn.content', "dhdyz5j1r0dai.cloudfront.net");

// c::set('cachebuster', true);

c::set('routes', array(
  array(
    'pattern' => '(en|es)',
    'action' => function () {
      return site()->visit('/');
    }
  )
));