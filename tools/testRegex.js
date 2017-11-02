"use strict";

(function main() {

    let s1 = '12ww  345';
    let s2 = '12';
    
    if (s1.search(new RegExp(`^${s2}[/d/w/s]*`)) != -1) {
        console.log('ok');
    } else {
        console.log('not');
    }
    

})();
