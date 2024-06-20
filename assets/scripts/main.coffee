$.easing.easeOutCubic = (x, t, b, c, d) ->
  return c*((t=t/d-1)*t*t + 1) + b
    

class OZH

	@data:
		scroll:
			top: 0
			left: 0
		win:
			width: 0
			height: 0

	@hasInitialized = false
	@articles = $('#main').children()

	@init: ->
		@testMobile()
		@setLanguage()
		@setupTemplates()
		@setupListeners()
		@setupExtras()
		@updateCurrent()
		@hasInitialized = true
		return @

	@setupListeners: ->
		@helperListeners()
		@navListeners()
		@playerListeners()
		@keyboardNavigation()


	@helperListeners: ->
		$(window).on
			'scroll': (e)=>
				scrollTop = window.scrollY
				@data.scroll.direction = if scrollTop < @data.scroll.top then 'up' else 'down'
				@data.scroll.top = scrollTop
				@data.scroll.left = $('html, body').scrollLeft()
				@updateCurrent() if @hasInitialized

			'resize': (e)=>
				@data.win.width = $(window).width()
				@data.win.height = $(window).height()
				@data.win.ratio = @data.win.width / @data.win.height
				@data.margin = @data.win.height / 3
				@adjustArticles()
				@adjustBackground()
				@adjustPlayer()
		.trigger('resize').trigger('scroll')

	@addArrow: ->
		$arrow = $('.arrowDown')
		setTimeout ()->
			$arrow.addClass('active')
		, 3000
		$arrow.on 'mouseenter', =>
			$('body,html').animate
				scrollTop: @data.win.height
			, 1000, 'easeOutCubic'
			$arrow.removeClass('active')

	@adjustArticles: ->
		$('#main').css 'top', 0
		@articles.css 'min-height', @data.win.height
	
	@setLanguage: ()->
		lang = location.pathname.replace('/','')
		unless lang in ['es', 'en']
			lang =  if /es/.test navigator.language then 'es' else 'en'
		@switchLanguage(lang)

	@setupTemplates: ->
		t = @
		t.templates = {}

		_.templateSettings =
  		interpolate: /\{\{\s*(.+?)\s*\}\}/g
  	$('[type="text/x-template"]').each ->
  		id = $(@).attr('id')
  		t.templates[id] = _.template $(@).html()
		
		
	@setupExtras: ->
		t = @

		@articles.each ->
			$film = $(@)
			t.addToMenu($film)
			t.addToBackground($film, t)	
		$("#video-background video").each (i)->
			interval = null;
			update_loader= (t)->


			@addEventListener 'loadedmetadata', (e)->
				$(@).addClass('loadedmetadata')
				t.adjustBackground()
			@addEventListener 'canplaythrough', (e)->
				$(@).addClass('canplay')
		$('body').addClass('black')
		
	@testMobile: ->
		@isMobile = Modernizr.touch and Modernizr.mq('(max-device-width: 480px)')
		@isTablet = Modernizr.touch and Modernizr.mq('(min-device-width: 768px)and (max-device-width: 1024px)')

	@switchLanguage: (lang = '')->
		$doc = $('html')
		langs = ['es', 'en']
		hash = location.hash.replace('#','')
		unless lang in langs
			lang = _.find langs (l)-> l isnt $doc.attr('lang')

		$doc.attr('lang', lang)
		$("#lang a").removeClass('current')
		$("#lang a[href*='#{lang}']").addClass('current')
		
		history.replaceState
			lang: lang
			, $('h1').text()
			, "/#{ lang }##{hash}"

	@addToMenu: ($film)->
		$list = $('#filmlist')
		name = $film.find('h2').html()
		slug = $film.attr('id')
		
		name = "" if slug is 'intro'
			
		if slug is "bio"
				$list.append("<li>&nbsp;</li>")
				name = "Bio"
			$list.append("<li><a href='##{slug}'>#{name}</a></li>")


	@navListeners: ->
		t = @
		unless @isMobile
			$('nav .row > li').on 'mouseenter', (e)->
					$('#filmlist').addClass('expanded')
			$('nav .row').on
				'mouseleave': (e)->
					$('#filmlist').removeClass('expanded')
				'mouseover': (e)->
					$('#filmlist').removeClass('expanded') if $(e.target).is('nav .row')
			$('#filmlist').on(
				'mouseover': (e)->
					$('#filmlist li.current').addClass('disabled') unless $(@).parent().is('.current')
				'mouseout': (e)->
					$('#filmlist li.current').removeClass('disabled')
				,'a')


		$('#filmlist').on(
			'click': (e)->
				e.preventDefault()
				if $('#filmlist').is('.expanded')
					t.setCurrent $(@)
				else
					$('#filmlist').addClass('expanded')
				return false
			,'a')


		$('h1 a').on 'click', (e)->
			t.setCurrent $(@)
		
		$('#lang a').on 'click', (e)->
			lang = $(@).attr('href').replace(/\W/g,'')
			t.switchLanguage(lang)
			e.preventDefault()


	@keyboardNavigation: ->
		@keys =
			ARROW_UP: 38
			ARROW_DOWN: 40
			ARROW_LEFT: 37
			ARROW_RIGHT: 39

		$(window).on 'keydown', (e)=>
			e.preventDefault() if _.contains @keys, e.keycode

			switch e.keyCode
				when @keys.ARROW_UP then @setCurrentTo 'prev'
				when @keys.ARROW_LEFT then @setCurrentTo 'prev'
				when @keys.ARROW_DOWN then @setCurrentTo 'next'
				when @keys.ARROW_RIGHT then @setCurrentTo 'next'
	



	@isCurrent: ($el)->
		if @data.scroll.direction is 'up'
			top = ($el.offset().top + $el.height()) - (@data.scroll.top + @data.win.height)
			margin = @data.margin * 2
		else 
			top = $el.offset().top - @data.scroll.top
			margin = @data.margin
		margin = @data.win.height / 2 if @isMobile or @isTablet
		return Math.abs(top) < margin

	@updateCurrent: -> #based on the scroll position
		unless @hasInitialized
			hash = location.hash
			if hash.length and $(hash).length
				@setCurrent $(hash)
				return
			
				
		return if @current and @isCurrent @current
		t = @
		
		@articles.each ->
			$el = $(@)
			if t.isCurrent $el
				t.setCurrent $el 
				return false

	@setCurrentTo: (direction)->
		if direction is 'next'
			target = if @current.is(':last-child') then false else @current.next()
		else if direction is 'prev'
			target = if @current.is(':first-child') then false else @current.prev()
		else
			return
		@setCurrent(target, true) if target 



	@setCurrent: ($el, scroll)->
		# if we're coming from an article
		if @articles.is($el)
			return if @current and @current.is $el
			@current = $el

		# else we're clicking on a menu item
		else
			link = $el.attr('href')
			@current = $(link)
			return unless @current.length
			return if @current and @current.is $el
			scroll = true
			
		if  @hasInitialized and scroll
			$('body, html').animate
				'scrollTop': @current.offset().top
				, 500
				
		#update menu
		$('#filmlist li, h1', 'nav').removeClass('current')	
		$("nav [href='##{ @current.attr('id') }']").parent().addClass('current')
		# console.log $("nav [href='##{ @current.attr('id') }']").html()
		$('#filmlist').removeClass('expanded')
		if $('nav .current [href="#bio"]').length
			$('.current').addClass('dark');
		
		#update url
		id = if @current.attr('id') then @current.attr('id') else 'intro'
		history.replaceState
			section: id
			, @current.find('h2').text()
			, "##{ @current.attr('id') }"
		@updateBackground()
		
		# add arrow on home screen only
		if @current.is('#intro')
			@addArrow() 
		else
			$('.arrowDown').removeClass('active')



	@addToBackground: ($film, t)->
		files = $film.data('background').split(';')
		bg = {}
		_.each files, (f)->
			ff = f.split(',')
			if ff.length > 1
				bg[ff[0]] = ff[1]
		data=
			slug : $film.attr('id')
			background : bg
		
		bg = if @isMobile then t.templates.imgbg(data) else t.templates.videobg(data) 
		bg = "<div id='video-bio'></div>" if data.background is 'white'
		$("#video-background").append(bg)
		


	@adjustBackground: ->
		$current = $('#video-background .current')
		ratio = if $current.is('video.loadedmetadata') then $current[0].videoWidth / $current[0].videoHeight else 1.67
		if @data.win.ratio < ratio and not $current.hasClass('wide')
			$current.css
				width: 'auto'
				height: '100%'
			$current.addClass('wide').removeClass('tall')
		else if @data.win.ratio >= ratio and not $current.hasClass('tall')
			$current.css
				width: '100%'
				height: 'auto'
			$current.removeClass('wide').addClass('tall')


	@updateBackground: ()->
		id = @current.attr('id')
		$currentBg = $("#video-background #video-#{id}")
		$prevBg = $('#video-background .current')
		
		if $prevBg.length
			$prevBg.removeClass('current')
			$prevBg[0].pause() if $prevBg.is('video')
		
		if $currentBg.length
			$currentBg.addClass('current')
			@adjustBackground()
			@playIfReady $currentBg if $currentBg.is('video')
		else
			# console.log "no video! on #video-background #video-#{id}"
	
	@playIfReady: ($bg)->
		waitingToPlay = setInterval ->
			if $bg[0].buffered.length
				percentage = $bg[0].buffered.end(0) / $bg[0].duration * 100
				# console.log "NOT PLAYING YET #{percentage}"
			if $bg.hasClass('canplay')
				# console.log "PLAYING NOW"	
				$bg[0].play() 
				clearInterval(waitingToPlay) 
		, 100

	@playerListeners: ->
		t = @
		$player = $('#player')
		resetPlayer = (e)=>
			e.preventDefault()
			$('figure', $player).html ''
			$player.removeClass 'playing'
			t.updateCurrent()
		
		$('.close', $player).on 'click' , resetPlayer
			
		$(window).on 'keydown', (e)=>
			resetPlayer(e) if e.keyCode is 27 

		@articles.each ->
			$film = $(@)
			$film.find('.still [href^="#youtube="], .still [href^="#vimeo="]').on 'click', (e)->
				e.preventDefault()
				href = $(@).attr('href').replace('#', '').split('=')
				service = href[0]
				video_id = href[1]
				unless _.isEmpty(video_id) 
					$('#player').addClass 'playing'
					if service is 'vimeo'
						$('#player figure').html t.templates.vimeo
							vimeo_id : video_id
					else if service is 'youtube'
						$('#player figure').html t.templates.youtube
							youtube_id : video_id

	@adjustPlayer: ->
		$figure = $('#player figure')
		if @data.win.ratio < 1.77
			$figure.width(@data.win.width - 50 )
			$figure.height($figure.width() / 1.77 )
		else
			$figure.height(@data.win.height - 90 )
			$figure.width($figure.height() * 1.77 )


$(->
	window.OZH = OZH.init()
)