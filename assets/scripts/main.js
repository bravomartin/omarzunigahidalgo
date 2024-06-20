(function() {
  var OZH,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $.easing.easeOutCubic = function(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  };

  OZH = (function() {
    function OZH() {}

    OZH.data = {
      scroll: {
        top: 0,
        left: 0
      },
      win: {
        width: 0,
        height: 0
      }
    };

    OZH.hasInitialized = false;

    OZH.articles = $('#main').children();

    OZH.init = function() {
      this.testMobile();
      this.setLanguage();
      this.setupTemplates();
      this.setupListeners();
      this.setupExtras();
      this.updateCurrent();
      this.hasInitialized = true;
      return this;
    };

    OZH.setupListeners = function() {
      this.helperListeners();
      this.navListeners();
      this.playerListeners();
      return this.keyboardNavigation();
    };

    OZH.helperListeners = function() {
      return $(window).on({
        'scroll': (function(_this) {
          return function(e) {
            var scrollTop;
            scrollTop = window.scrollY;
            _this.data.scroll.direction = scrollTop < _this.data.scroll.top ? 'up' : 'down';
            _this.data.scroll.top = scrollTop;
            _this.data.scroll.left = $('html, body').scrollLeft();
            if (_this.hasInitialized) {
              return _this.updateCurrent();
            }
          };
        })(this),
        'resize': (function(_this) {
          return function(e) {
            _this.data.win.width = $(window).width();
            _this.data.win.height = $(window).height();
            _this.data.win.ratio = _this.data.win.width / _this.data.win.height;
            _this.data.margin = _this.data.win.height / 3;
            _this.adjustArticles();
            _this.adjustBackground();
            return _this.adjustPlayer();
          };
        })(this)
      }).trigger('resize').trigger('scroll');
    };

    OZH.addArrow = function() {
      var $arrow;
      $arrow = $('.arrowDown');
      setTimeout(function() {
        return $arrow.addClass('active');
      }, 3000);
      return $arrow.on('mouseenter', (function(_this) {
        return function() {
          $('body,html').animate({
            scrollTop: _this.data.win.height
          }, 1000, 'easeOutCubic');
          return $arrow.removeClass('active');
        };
      })(this));
    };

    OZH.adjustArticles = function() {
      $('#main').css('top', 0);
      return this.articles.css('min-height', this.data.win.height);
    };

    OZH.setLanguage = function() {
      var lang;
      lang = location.pathname.replace('/', '');
      if (lang !== 'es' && lang !== 'en') {
        lang = /es/.test(navigator.language) ? 'es' : 'en';
      }
      return this.switchLanguage(lang);
    };

    OZH.setupTemplates = function() {
      var t;
      t = this;
      t.templates = {};
      _.templateSettings = {
        interpolate: /\{\{\s*(.+?)\s*\}\}/g
      };
      return $('[type="text/x-template"]').each(function() {
        var id;
        id = $(this).attr('id');
        return t.templates[id] = _.template($(this).html());
      });
    };

    OZH.setupExtras = function() {
      var t;
      t = this;
      this.articles.each(function() {
        var $film;
        $film = $(this);
        t.addToMenu($film);
        return t.addToBackground($film, t);
      });
      $("#video-background video").each(function(i) {
        var interval, update_loader;
        interval = null;
        update_loader = function(t) {};
        this.addEventListener('loadedmetadata', function(e) {
          $(this).addClass('loadedmetadata');
          return t.adjustBackground();
        });
        return this.addEventListener('canplaythrough', function(e) {
          return $(this).addClass('canplay');
        });
      });
      return $('body').addClass('black');
    };

    OZH.testMobile = function() {
      this.isMobile = Modernizr.touch && Modernizr.mq('(max-device-width: 480px)');
      return this.isTablet = Modernizr.touch && Modernizr.mq('(min-device-width: 768px)and (max-device-width: 1024px)');
    };

    OZH.switchLanguage = function(lang) {
      var $doc, hash, langs;
      if (lang == null) {
        lang = '';
      }
      $doc = $('html');
      langs = ['es', 'en'];
      hash = location.hash.replace('#', '');
      if (__indexOf.call(langs, lang) < 0) {
        lang = _.find(langs(function(l) {
          return l !== $doc.attr('lang');
        }));
      }
      $doc.attr('lang', lang);
      $("#lang a").removeClass('current');
      $("#lang a[href*='" + lang + "']").addClass('current');
      return history.replaceState({
        lang: lang
      }, $('h1').text(), "/" + lang + "#" + hash);
    };

    OZH.addToMenu = function($film) {
      var $list, name, slug;
      $list = $('#filmlist');
      name = $film.find('h2').html();
      slug = $film.attr('id');
      if (slug === 'intro') {
        name = "";
      }
      if (slug === "bio") {
        $list.append("<li>&nbsp;</li>");
        name = "Bio";
      }
      return $list.append("<li><a href='#" + slug + "'>" + name + "</a></li>");
    };

    OZH.navListeners = function() {
      var t;
      t = this;
      if (!this.isMobile) {
        $('nav .row > li').on('mouseenter', function(e) {
          return $('#filmlist').addClass('expanded');
        });
        $('nav .row').on({
          'mouseleave': function(e) {
            return $('#filmlist').removeClass('expanded');
          },
          'mouseover': function(e) {
            if ($(e.target).is('nav .row')) {
              return $('#filmlist').removeClass('expanded');
            }
          }
        });
        $('#filmlist').on({
          'mouseover': function(e) {
            if (!$(this).parent().is('.current')) {
              return $('#filmlist li.current').addClass('disabled');
            }
          },
          'mouseout': function(e) {
            return $('#filmlist li.current').removeClass('disabled');
          }
        }, 'a');
      }
      $('#filmlist').on({
        'click': function(e) {
          e.preventDefault();
          if ($('#filmlist').is('.expanded')) {
            t.setCurrent($(this));
          } else {
            $('#filmlist').addClass('expanded');
          }
          return false;
        }
      }, 'a');
      $('h1 a').on('click', function(e) {
        return t.setCurrent($(this));
      });
      return $('#lang a').on('click', function(e) {
        var lang;
        lang = $(this).attr('href').replace(/\W/g, '');
        t.switchLanguage(lang);
        return e.preventDefault();
      });
    };

    OZH.keyboardNavigation = function() {
      this.keys = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39
      };
      return $(window).on('keydown', (function(_this) {
        return function(e) {
          if (_.contains(_this.keys, e.keycode)) {
            e.preventDefault();
          }
          switch (e.keyCode) {
            case _this.keys.ARROW_UP:
              return _this.setCurrentTo('prev');
            case _this.keys.ARROW_LEFT:
              return _this.setCurrentTo('prev');
            case _this.keys.ARROW_DOWN:
              return _this.setCurrentTo('next');
            case _this.keys.ARROW_RIGHT:
              return _this.setCurrentTo('next');
          }
        };
      })(this));
    };

    OZH.isCurrent = function($el) {
      var margin, top;
      if (this.data.scroll.direction === 'up') {
        top = ($el.offset().top + $el.height()) - (this.data.scroll.top + this.data.win.height);
        margin = this.data.margin * 2;
      } else {
        top = $el.offset().top - this.data.scroll.top;
        margin = this.data.margin;
      }
      if (this.isMobile || this.isTablet) {
        margin = this.data.win.height / 2;
      }
      return Math.abs(top) < margin;
    };

    OZH.updateCurrent = function() {
      var hash, t;
      if (!this.hasInitialized) {
        hash = location.hash;
        if (hash.length && $(hash).length) {
          this.setCurrent($(hash));
          return;
        }
      }
      if (this.current && this.isCurrent(this.current)) {
        return;
      }
      t = this;
      return this.articles.each(function() {
        var $el;
        $el = $(this);
        if (t.isCurrent($el)) {
          t.setCurrent($el);
          return false;
        }
      });
    };

    OZH.setCurrentTo = function(direction) {
      var target;
      if (direction === 'next') {
        target = this.current.is(':last-child') ? false : this.current.next();
      } else if (direction === 'prev') {
        target = this.current.is(':first-child') ? false : this.current.prev();
      } else {
        return;
      }
      if (target) {
        return this.setCurrent(target, true);
      }
    };

    OZH.setCurrent = function($el, scroll) {
      var id, link;
      if (this.articles.is($el)) {
        if (this.current && this.current.is($el)) {
          return;
        }
        this.current = $el;
      } else {
        link = $el.attr('href');
        this.current = $(link);
        if (!this.current.length) {
          return;
        }
        if (this.current && this.current.is($el)) {
          return;
        }
        scroll = true;
      }
      if (this.hasInitialized && scroll) {
        $('body, html').animate({
          'scrollTop': this.current.offset().top
        }, 500);
      }
      $('#filmlist li, h1', 'nav').removeClass('current');
      $("nav [href='#" + (this.current.attr('id')) + "']").parent().addClass('current');
      $('#filmlist').removeClass('expanded');
      if ($('nav .current [href="#bio"]').length) {
        $('.current').addClass('dark');
      }
      id = this.current.attr('id') ? this.current.attr('id') : 'intro';
      history.replaceState({
        section: id
      }, this.current.find('h2').text(), "#" + (this.current.attr('id')));
      this.updateBackground();
      if (this.current.is('#intro')) {
        return this.addArrow();
      } else {
        return $('.arrowDown').removeClass('active');
      }
    };

    OZH.addToBackground = function($film, t) {
      var bg, data, files;
      files = $film.data('background').split(';');
      bg = {};
      _.each(files, function(f) {
        var ff;
        ff = f.split(',');
        if (ff.length > 1) {
          return bg[ff[0]] = ff[1];
        }
      });
      data = {
        slug: $film.attr('id'),
        background: bg
      };
      bg = this.isMobile ? t.templates.imgbg(data) : t.templates.videobg(data);
      if (data.background === 'white') {
        bg = "<div id='video-bio'></div>";
      }
      return $("#video-background").append(bg);
    };

    OZH.adjustBackground = function() {
      var $current, ratio;
      $current = $('#video-background .current');
      ratio = $current.is('video.loadedmetadata') ? $current[0].videoWidth / $current[0].videoHeight : 1.67;
      if (this.data.win.ratio < ratio && !$current.hasClass('wide')) {
        $current.css({
          width: 'auto',
          height: '100%'
        });
        return $current.addClass('wide').removeClass('tall');
      } else if (this.data.win.ratio >= ratio && !$current.hasClass('tall')) {
        $current.css({
          width: '100%',
          height: 'auto'
        });
        return $current.removeClass('wide').addClass('tall');
      }
    };

    OZH.updateBackground = function() {
      var $currentBg, $prevBg, id;
      id = this.current.attr('id');
      $currentBg = $("#video-background #video-" + id);
      $prevBg = $('#video-background .current');
      if ($prevBg.length) {
        $prevBg.removeClass('current');
        if ($prevBg.is('video')) {
          $prevBg[0].pause();
        }
      }
      if ($currentBg.length) {
        $currentBg.addClass('current');
        this.adjustBackground();
        if ($currentBg.is('video')) {
          return this.playIfReady($currentBg);
        }
      } else {

      }
    };

    OZH.playIfReady = function($bg) {
      var waitingToPlay;
      return waitingToPlay = setInterval(function() {
        var percentage;
        if ($bg[0].buffered.length) {
          percentage = $bg[0].buffered.end(0) / $bg[0].duration * 100;
        }
        if ($bg.hasClass('canplay')) {
          $bg[0].play();
          return clearInterval(waitingToPlay);
        }
      }, 100);
    };

    OZH.playerListeners = function() {
      var $player, resetPlayer, t;
      t = this;
      $player = $('#player');
      resetPlayer = (function(_this) {
        return function(e) {
          e.preventDefault();
          $('figure', $player).html('');
          $player.removeClass('playing');
          return t.updateCurrent();
        };
      })(this);
      $('.close', $player).on('click', resetPlayer);
      $(window).on('keydown', (function(_this) {
        return function(e) {
          if (e.keyCode === 27) {
            return resetPlayer(e);
          }
        };
      })(this));
      return this.articles.each(function() {
        var $film;
        $film = $(this);
        return $film.find('.still [href^="#youtube="], .still [href^="#vimeo="]').on('click', function(e) {
          var href, service, video_id;
          e.preventDefault();
          href = $(this).attr('href').replace('#', '').split('=');
          service = href[0];
          video_id = href[1];
          if (!_.isEmpty(video_id)) {
            $('#player').addClass('playing');
            if (service === 'vimeo') {
              return $('#player figure').html(t.templates.vimeo({
                vimeo_id: video_id
              }));
            } else if (service === 'youtube') {
              return $('#player figure').html(t.templates.youtube({
                youtube_id: video_id
              }));
            }
          }
        });
      });
    };

    OZH.adjustPlayer = function() {
      var $figure;
      $figure = $('#player figure');
      if (this.data.win.ratio < 1.77) {
        $figure.width(this.data.win.width - 50);
        return $figure.height($figure.width() / 1.77);
      } else {
        $figure.height(this.data.win.height - 90);
        return $figure.width($figure.height() * 1.77);
      }
    };

    return OZH;

  })();

  $(function() {
    return window.OZH = OZH.init();
  });

}).call(this);
