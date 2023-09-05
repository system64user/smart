/**
 * js_encrypt 加密公共方法
 * @param str
 * @returns
 */
function encrypt(str) {
    var key = CryptoJS.enc.Utf8.parse("2357345235754321");//秘钥
    var iv= CryptoJS.enc.Utf8.parse('1234567890123412');//向量iv
    var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    return encrypted.toString();
}