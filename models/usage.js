// 常用函數，可以獨立成一個 JS 或是併入 Utility 中
var util=require('./Utility');
var pfcctr=require('./PFCCTR');
module.exports={
	HELPER_DecryptString:function (input, key){
		return util.UTILS_IntArrayToString(
			pfcctr.PFCCTR_Decrypt(util.UTILS_HexStringToIntArray(input), key, key.slice()));
	},
	HELPER_GenerateEncryptedRequest:function (object, key) {
		return util.UTILS_IntArrayToHexString(
			pfcctr.PFCCTR_Encrypt(util.UTILS_StringToIntArray(JSON.stringify(object)), key, key.slice()));
	},
	HELPER_GetRealFileKey : function(initKey, input) {
        var keys = input.split(",");
        var result = initKey;

        if (input.length > 0) {
            for (var i = 0; i < keys.length; ++i) {
                result = pfcctr.PFCCTR_Decrypt(util.UTILS_HexStringToIntArray(keys[i]), result, result.slice());
            }
        }
        return result;
    }
};
