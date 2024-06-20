<?php 

kirbytext::$pre[] = function($kirbytext, $value) {
  return preg_replace("/^([a-z 0-9]+?:)/mi", "<u>$1</u>", $value);
};