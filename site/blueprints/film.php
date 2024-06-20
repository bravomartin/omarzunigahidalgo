<?php if(!defined('KIRBY')) exit ?>

title: Film
pages: false
files: true
fields:
  title:
    label: Title
    type:  text
  titleEn:
    label: Title En
    type:  text
  titleEs:
    label: Title Es
    type:  text
  watchEn:
    label: Watch Links En
    type:  text
    help: "Links para video player deben seguir este formato: (link:#youtube=sk3k2211 text: Film)"
  watchEs:
    label: Watch Links Es
    type:  text
    help: "Links externos deben seguir este formato: (link:http://itunes.com/zzz text: Trailer popup:yes)"
  backgroundVideo: 
    label: Background Video Name
    type: text
    help: El nombre del video subido a AWS sin la terminación de archivo. (Debes subirlo en mp4, ogv y un thumbnail del primer frame en jpg ) 

  synopsisEn:
    label: Synopsis En
    type:  textarea
  synopsisEs:
    label: Synopsis Es
    type:  textarea
  moreEn:
    label: More Link En
    type:  url
  moreEs:
    label: More Link Es
    type:  url
  MetaEn:
    label: Meta En
    type:  textarea
  MetaEs:
    label: Meta Es
    type:  textarea