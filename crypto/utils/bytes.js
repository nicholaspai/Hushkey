const byte2hexStr = (byte) =>{
    const hexByteMap = '0123456789ABCDEF';

    let str = '';
    str += hexByteMap.charAt(byte >> 4);
    str += hexByteMap.charAt(byte & 0x0f);

    return str;
}

const byteArray2hexStr = (byteArray) => {
    let str = '';

    for (let i = 0; i < (byteArray.length); i++)
        str += byte2hexStr(byteArray[i]);
        
    return str;
}

module.exports = {
    byteArray2hexStr,
    byte2hexStr
}