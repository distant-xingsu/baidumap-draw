//rgba=>rgb
function rgbaToRgb( color ) {
    let rgbaAttr = color.match( /[\d.]+/g );
    if ( rgbaAttr.length >= 3 ) {
        var r, g, b;
        r = rgbaAttr[0];
        g = rgbaAttr[1];
        b = rgbaAttr[2];
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    return '';
}

//rgba=>16
function hexify( color ) {
    var values = color
    .replace( /rgba?\(/, '' )
    .replace( /\)/, '' )
    .replace( /[\s+]/g, '' )
    .split( ',' );
    var a = parseFloat( values[3] || 1 ),
        r = Math.floor( a * parseInt( values[0] ) + ( 1 - a ) * 255 ),
        g = Math.floor( a * parseInt( values[1] ) + ( 1 - a ) * 255 ),
        b = Math.floor( a * parseInt( values[2] ) + ( 1 - a ) * 255 );
    return "#" +
        ( "0" + r.toString( 16 ) ).slice( - 2 ) +
        ( "0" + g.toString( 16 ) ).slice( - 2 ) +
        ( "0" + b.toString( 16 ) ).slice( - 2 );
}

//获取透明度
function getRgbaAlp( color ) {
    let alp = 1;
    let rgbaReg = /rgba\([\d ]+(?:,([\d. ]+)){3}\)/;
    if ( rgbaReg.test( color ) ) {
        alp = color.replace( rgbaReg, '$1' );
    }
    if(Number(alp)===1){
        alp = 1.0
    }
    return alp;
}

export { rgbaToRgb, hexify, getRgbaAlp };
