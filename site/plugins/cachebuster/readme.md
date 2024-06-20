# Kirby Cachebuster Plugin

This plugin will add modification timestamps to your css and js files, 
as long as they are embedded with the css() and js() helpers.

## htaccess rules for Apache

To make this plugin work on Apache you must add the following lines to your 
htaccess file:

```
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.+)\.(\d+)\.(js|css)$ $1.$3 [L]
```

Place them directly after the RewriteBase definition.

## Nginx rewrite rules

For Nginx you can add the following to your virtual host setup:

```
location /assets {
  if (!-e $request_filename) {
    rewrite ^/(.+)\.(\d+)\.(js|css)$ /$1.$3 break;
  }
}
```

## Author
Bastian Allgeier <bastian@getkirby.com>