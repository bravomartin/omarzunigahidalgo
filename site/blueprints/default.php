<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: true
files: true
fields:
  title:
    label: Title
    type:  text
  textEn:
    label: Text En
    type:  textarea
  textEs:
    label: Text Es
    type:  textarea
  backgroundVideo: 
    label: Background Video Name
    type: text
    help: El nombre del video subido a AWS sin la terminación de archivo. (Debes subirlo en mp4, ogv y un thumbnail del primer frame en jpg ) 
