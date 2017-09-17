let MagicString = require( 'magic-string' );
let fs = require('fs');

(function main () {

  let code = `

module.exports = {
  "test2": function(param) {console.log('modcommonjs2 -> test2 -> _{param}');},
  "test3": function(param) {console.log('modcommonjs2 -> test3 -> _{param}');}
};


`;

  let s = new MagicString( `
  problems = 99
9ok = 88 
some SString;
`);

  s = new MagicString(code);

  let str = `var test2 = function(param) {console.log('modcommonjs2 -> test2 -> param');};
var test3 = function(param) {console.log('modcommonjs2 -> test3 -> param');};
`;

  let sss = new MagicString(str);

  //s.appendLeft(11, '(')

  s.overwrite( 2, 185, sss.trim().toString()).trim();
  console.log(s.toString());

  //console.log(s.toString().length);

  //s.overwrite( 0, 8, 'ans' );
  //s.overwrite( 11, 13, '22' );

  //prepend - Добавляет в начало строки
  // append - Добавляет в конец строки
  //s.prepend( 'var ' ).append( ';' );

  // generates a v3 sourcemap
  /*
  var map = s.generateMap({
    source: 'tools/testMagicString.js',
    file: 'converted.js.map',
    includeContent: true
  });

  fs.writeFile( 'tmp/converted.js', s.toString() );
  fs.writeFile( 'tmp/converted.js.map', map.toString() );
  */

  // addSourcemapLocation - добавляет index в sourcemap mappings
  //s.addSourcemapLocation(index);

  //s.appendLeft(11, '(');
  //s.appendLeft(13, ')');

  //s.prependLeft(11, '(');
  //s.prependLeft(13, ')');

  //s.appendRight(12, ')');


  // indent( prefix[, options] ) Добавляет отступ (префикс) к каждой строке, если не указан, будет взять таб
  // options = {'exclude': [10, 50]} - Исключить диапазон из делания отступов
  //s.indent('->', {'exclude': [10, 50]});

  // move( start, end, newIndex ) - Перемещает часть сроки в указанный индекс
  //s.move(14, 15, 20);

  // overwrite( start, end, content[, options] ) - Заменяет строку, строкой
  // Четвертый аргумент является необязательным.
  // Он может иметь свойство storeName - если true,
  // исходное имя будет сохранено для последующего включения в массив имен sourcemap
  // и свойство contentOnly, которое определяет, перезаписано ли только содержимое,
  // или что-либо, что было добавлено
  //s.overwrite(20, 22, '333');

  // remove( start, end ); Удаляет кусок строки
  //s.remove(29, 30);

  // slice( start, end ) Возвращает содержимое сгенерированной строки, соответствующее диапазону в строке источнике
  //console.log(s.slice(0, 13));

  // snip( start, end ) - тоже что и slice - только возвращает клон MagicString
  //console.log(s.snip(0, 13).toString());

  // trim([ charType ]) - Обрезает начала и конец строки пробелом, или указанной строкой
  // trimStart([ charType ]) - тоже, только в начала
  // trimEnd([ charType ]) - тоже, только в конце
  //s.trim(';');

  // trimLines() - удаляет пустые строки c начала и с конца
  //s.trimLines();

  // Сделать бандл
  /*
  var bundle = new MagicString.Bundle();

  bundle.addSource({
    filename: 'foo.js',
    content: new MagicString( 'var answer = 42;' )
  });

  bundle.addSource({
    filename: 'bar.js',
    content: new MagicString( 'console.log( answer )' )
  });

  console.log(bundle.toString());
  */



})();
