const isHexChar = (c) => {
    if ((c >= 'A' && c <= 'F') ||
        (c >= 'a' && c <= 'f') ||
        (c >= '0' && c <= '9')) {
        return 1;
    }

    return 0;
}
const hexStr2byteArray = (str) => {
    const byteArray = Array();
    let d = 0;
    let j = 0;
    let k = 0;

    for (let i = 0; i < str.length; i++) {
        const c = str.charAt(i);

        if (isHexChar(c)) {
            d <<= 4;
            d += hexChar2byte(c);
            j++;

            if (0 === (j % 2)) {
                byteArray[k++] = d;
                d = 0;
            }
        }
    }

    return byteArray;
}

const hexChar2byte = (c) => {
    let d = 0;

    if (c >= 'A' && c <= 'F')
        d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    else if (c >= 'a' && c <= 'f')
        d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    else if (c >= '0' && c <= '9')
        d = c.charCodeAt(0) - '0'.charCodeAt(0);
        
    return d;
}

module.exports = {
    isHexChar,
    hexStr2byteArray,
    hexChar2byte
}