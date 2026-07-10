globalThis.process ??= {};
globalThis.process.env ??= {};
import { ALLOWED_PERMISSIONS } from "./apps_DB2YNaub.mjs";
import { i as isVersionPinned } from "./cdn-allowlist_rKupC5M_.mjs";
import { G as GOOGLE_OP_IDS, a as GOOGLE_OPS, i as isGoogleOp, v as validateGoogleStep } from "./google-bridge_CxaeMFe4.mjs";
const unicodeLookup = ((compressed, lookup) => {
  const result = new Uint32Array(69632);
  let index = 0;
  let subIndex = 0;
  while (index < 2571) {
    const inst = compressed[index++];
    if (inst < 0) {
      subIndex -= inst;
    } else {
      let code = compressed[index++];
      if (inst & 2)
        code = lookup[code];
      if (inst & 1) {
        result.fill(code, subIndex, subIndex += compressed[index++]);
      } else {
        result[subIndex++] = code;
      }
    }
  }
  return result;
})([-1, 2, 26, 2, 27, 2, 5, -1, 0, 77595648, 3, 44, 2, 3, 0, 14, 2, 63, 2, 64, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 41, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 16, 2, 65, 2, 0, 0, 4294836735, 0, 3221225471, 0, 4294901942, 2, 66, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 18, 2, 0, 0, 4294961151, 3, 0, 2, 2, 19, 2, 0, 0, 608174079, 2, 0, 2, 60, 2, 7, 2, 6, 0, 4286611199, 3, 0, 2, 2, 1, 3, 0, 3, 0, 4294901711, 2, 40, 0, 4089839103, 0, 2961209759, 0, 1342439375, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2967484831, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 0, 65472, 2, 3, 0, 4093640191, 0, 660618719, 0, 65487, 0, 4294828015, 0, 4092591615, 0, 1616920031, 0, 982991, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247022, 2, 71, 0, 4284449919, 0, 851904, 2, 4, 2, 12, 0, 67076095, -1, 2, 72, 0, 1073741743, 0, 4093607775, -1, 0, 50331649, 0, 3265266687, 2, 33, 0, 4294844415, 0, 4278190047, 2, 20, 2, 137, -1, 3, 0, 2, 2, 23, 2, 0, 2, 10, 2, 0, 2, 15, 2, 22, 3, 0, 10, 2, 74, 2, 0, 2, 75, 2, 76, 2, 77, 2, 0, 2, 78, 2, 0, 2, 11, 0, 261632, 2, 25, 3, 0, 2, 2, 13, 2, 4, 3, 0, 18, 2, 79, 2, 5, 3, 0, 2, 2, 80, 0, 2151677951, 2, 29, 2, 9, 0, 909311, 3, 0, 2, 0, 814743551, 2, 49, 0, 67090432, 3, 0, 2, 2, 42, 2, 0, 2, 6, 2, 0, 2, 30, 2, 8, 0, 268374015, 2, 110, 2, 51, 2, 0, 2, 81, 0, 134153215, -1, 2, 7, 2, 0, 2, 8, 0, 2684354559, 0, 67044351, 0, 3221160064, 2, 17, -1, 3, 0, 2, 2, 53, 0, 1046528, 3, 0, 3, 2, 9, 2, 0, 2, 54, 0, 4294960127, 2, 10, 2, 6, 2, 11, 0, 4294377472, 2, 12, 3, 0, 16, 2, 13, 2, 0, 2, 82, 2, 10, 2, 0, 2, 83, 2, 84, 2, 85, 0, 12288, 2, 55, 0, 1048577, 2, 86, 2, 14, -1, 2, 14, 0, 131042, 2, 87, 2, 88, 2, 89, 2, 0, 2, 34, -83, 3, 0, 7, 0, 1046559, 2, 0, 2, 15, 2, 0, 0, 2147516671, 2, 21, 3, 90, 2, 2, 0, -16, 2, 91, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 3, 0, 2, 2, 28, 2, 16, 3, 0, 2, 2, 17, 2, 0, -1, 2, 18, -16, 3, 0, 206, -2, 3, 0, 692, 2, 73, -1, 2, 18, 2, 10, 3, 0, 8, 2, 93, 2, 133, 2, 0, 0, 3220242431, 3, 0, 3, 2, 19, 2, 94, 2, 95, 3, 0, 2, 2, 96, 2, 0, 2, 97, 2, 46, 2, 0, 0, 4351, 2, 0, 2, 9, 3, 0, 2, 0, 67043391, 0, 3909091327, 2, 0, 2, 24, 2, 9, 2, 20, 3, 0, 2, 0, 67076097, 2, 8, 2, 0, 2, 21, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 101, 2, 102, 2, 22, 2, 23, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 103, 2, 104, 2, 7, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 32, -1, 0, 3774349439, 2, 105, 2, 106, 3, 0, 2, 2, 19, 2, 107, 3, 0, 10, 2, 10, 2, 18, 2, 0, 2, 47, 2, 0, 2, 31, 2, 108, 2, 25, 0, 1638399, 0, 57344, 2, 109, 3, 0, 3, 2, 20, 2, 26, 2, 27, 2, 5, 2, 28, 2, 0, 2, 8, 2, 111, -1, 2, 112, 2, 113, 2, 114, -1, 3, 0, 3, 2, 12, -2, 2, 0, 2, 29, -3, 0, 536870912, -4, 2, 20, 2, 0, 2, 36, 0, 1, 2, 0, 2, 67, 2, 6, 2, 12, 2, 10, 2, 0, 2, 115, -1, 3, 0, 4, 2, 10, 2, 23, 2, 116, 2, 7, 2, 0, 2, 117, 2, 0, 2, 118, 2, 119, 2, 120, 2, 0, 2, 9, 3, 0, 9, 2, 21, 2, 30, 2, 31, 2, 121, 2, 122, -2, 2, 123, 2, 124, 2, 30, 2, 21, 2, 8, -2, 2, 125, 2, 30, 2, 32, -2, 2, 0, 2, 39, -2, 0, 4277137519, 0, 2269118463, -1, 3, 20, 2, -1, 2, 33, 2, 38, 2, 0, 3, 30, 2, 2, 35, 2, 19, -3, 3, 0, 2, 2, 34, -1, 2, 0, 2, 35, 2, 0, 2, 35, 2, 0, 2, 48, 2, 0, 0, 4294950463, 2, 37, -7, 2, 0, 0, 203775, 2, 57, 0, 4026531840, 2, 20, 2, 43, 2, 36, 2, 18, 2, 37, 2, 18, 2, 126, 2, 21, 3, 0, 2, 2, 38, 0, 2151677888, 2, 0, 2, 12, 0, 4294901764, 2, 144, 2, 0, 2, 58, 2, 56, 0, 5242879, 3, 0, 2, 0, 402644511, -1, 2, 128, 2, 39, 0, 3, -1, 2, 129, 2, 130, 2, 0, 0, 67045375, 2, 40, 0, 4226678271, 0, 3766565279, 0, 2039759, 2, 132, 2, 41, 0, 1046437, 0, 6, 3, 0, 2, 0, 3288270847, 0, 3, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 42, 2, 23, 2, 50, 2, 11, 2, 61, 2, 38, -5, 2, 0, 2, 12, -3, 3, 0, 2, 0, 2147484671, 2, 134, 0, 4190109695, 2, 52, -2, 2, 135, 0, 4244635647, 0, 27, 2, 0, 2, 8, 2, 43, 2, 0, 2, 68, 2, 18, 2, 0, 2, 42, -6, 2, 0, 2, 45, 2, 59, 2, 44, 2, 45, 2, 46, 2, 47, 0, 8388351, -2, 2, 136, 0, 3028287487, 2, 48, 2, 138, 0, 33259519, 2, 49, -9, 2, 21, 0, 4294836223, 0, 3355443199, 0, 134152199, -2, 2, 69, -2, 3, 0, 28, 2, 32, -3, 3, 0, 3, 2, 17, 3, 0, 6, 2, 50, -81, 2, 18, 3, 0, 2, 2, 36, 3, 0, 33, 2, 25, 2, 30, 3, 0, 124, 2, 12, 3, 0, 18, 2, 38, -213, 2, 0, 2, 32, -54, 3, 0, 17, 2, 42, 2, 8, 2, 23, 2, 0, 2, 8, 2, 23, 2, 51, 2, 0, 2, 21, 2, 52, 2, 139, 2, 25, -13, 2, 0, 2, 53, -6, 3, 0, 2, -4, 3, 0, 2, 0, 4294936575, 2, 0, 0, 4294934783, -2, 0, 196635, 3, 0, 191, 2, 54, 3, 0, 38, 2, 30, 2, 55, 2, 34, -278, 2, 140, 3, 0, 9, 2, 141, 2, 142, 2, 56, 3, 0, 11, 2, 7, -72, 3, 0, 3, 2, 143, 0, 1677656575, -130, 2, 26, -16, 2, 0, 2, 24, 2, 38, -16, 0, 4161266656, 0, 4071, 0, 15360, -4, 2, 57, -13, 3, 0, 2, 2, 58, 2, 0, 2, 145, 2, 146, 2, 62, 2, 0, 2, 147, 2, 148, 2, 149, 3, 0, 10, 2, 150, 2, 151, 2, 22, 3, 58, 2, 3, 152, 2, 3, 59, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 92, 2, 0, 0, 2105343, 0, 4160749584, 0, 65534, -34, 2, 8, 2, 154, -6, 0, 4194303871, 0, 4294903771, 2, 0, 2, 60, 2, 100, -3, 2, 0, 0, 1073684479, 0, 17407, -9, 2, 18, 2, 17, 2, 0, 2, 32, -14, 2, 18, 2, 32, -6, 2, 18, 2, 12, -15, 2, 155, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 61, -37, 2, 62, 2, 156, 2, 157, 2, 158, 2, 159, 2, 160, -105, 2, 26, -32, 3, 0, 1335, -1, 3, 0, 129, 2, 32, 3, 0, 6, 2, 10, 3, 0, 180, 2, 161, 3, 0, 233, 2, 162, 3, 0, 18, 2, 10, -77, 3, 0, 16, 2, 10, -47, 3, 0, 154, 2, 6, 3, 0, 130, 2, 25, -22250, 3, 0, 7, 2, 25, -6130, 3, 5, 2, -1, 0, 69207040, 3, 44, 2, 3, 0, 14, 2, 63, 2, 64, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 41, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 16, 2, 65, 2, 0, 2, 34, -1, 2, 18, 2, 66, -1, 2, 0, 0, 2047, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 25, 2, 67, 3, 0, 2, 0, 131135, 2, 98, 0, 70256639, 0, 71303167, 0, 272, 2, 42, 2, 6, 0, 32511, 2, 0, 2, 49, -1, 2, 99, 2, 68, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 70, 2, 69, 0, 33554435, 2, 131, 2, 70, 0, 2952790016, 0, 131075, 0, 3594373096, 0, 67094296, 2, 69, -1, 0, 4294828e3, 0, 603979263, 0, 654311424, 0, 3, 0, 4294828001, 0, 602930687, 0, 1610612736, 0, 393219, 0, 4294828016, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 71, 2, 38, -1, 2, 4, 0, 917503, 2, 38, -1, 2, 72, 0, 537788335, 0, 4026531935, -1, 0, 1, -1, 2, 33, 2, 73, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 15, 2, 22, 3, 0, 10, 2, 74, 2, 0, 2, 75, 2, 76, 2, 77, 2, 0, 2, 78, 2, 0, 2, 12, -1, 2, 25, 3, 0, 2, 2, 13, 2, 4, 3, 0, 18, 2, 79, 2, 5, 3, 0, 2, 2, 80, 0, 2147745791, 3, 19, 2, 0, 122879, 2, 0, 2, 9, 0, 276824064, -2, 3, 0, 2, 2, 42, 2, 0, 0, 4294903295, 2, 0, 2, 30, 2, 8, -1, 2, 18, 2, 51, 2, 0, 2, 81, 2, 49, -1, 2, 21, 2, 0, 2, 29, -2, 0, 128, -2, 2, 28, 2, 9, 0, 8160, -1, 2, 127, 0, 4227907585, 2, 0, 2, 37, 2, 0, 2, 50, 0, 4227915776, 2, 10, 2, 6, 2, 11, -1, 0, 74440192, 3, 0, 6, -2, 3, 0, 8, 2, 13, 2, 0, 2, 82, 2, 10, 2, 0, 2, 83, 2, 84, 2, 85, -3, 2, 86, 2, 14, -3, 2, 87, 2, 88, 2, 89, 2, 0, 2, 34, -83, 3, 0, 7, 0, 817183, 2, 0, 2, 15, 2, 0, 0, 33023, 2, 21, 3, 90, 2, -17, 2, 91, 0, 524157950, 2, 4, 2, 0, 2, 92, 2, 4, 2, 0, 2, 22, 2, 28, 2, 16, 3, 0, 2, 2, 17, 2, 0, -1, 2, 18, -16, 3, 0, 206, -2, 3, 0, 692, 2, 73, -1, 2, 18, 2, 10, 3, 0, 8, 2, 93, 0, 3072, 2, 0, 0, 2147516415, 2, 10, 3, 0, 2, 2, 25, 2, 94, 2, 95, 3, 0, 2, 2, 96, 2, 0, 2, 97, 2, 46, 0, 4294965179, 0, 7, 2, 0, 2, 9, 2, 95, 2, 9, -1, 0, 1761345536, 2, 98, 0, 4294901823, 2, 38, 2, 20, 2, 99, 2, 35, 2, 100, 0, 2080440287, 2, 0, 2, 34, 2, 153, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 101, 2, 102, 2, 22, 2, 23, 3, 0, 3, 0, 7, 3, 0, 349, 2, 103, 2, 104, 2, 7, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 32, -1, 0, 2700607615, 2, 105, 2, 106, 3, 0, 2, 2, 19, 2, 107, 3, 0, 10, 2, 10, 2, 18, 2, 0, 2, 47, 2, 0, 2, 31, 2, 108, -3, 2, 109, 3, 0, 3, 2, 20, -1, 3, 5, 2, 2, 110, 2, 0, 2, 8, 2, 111, -1, 2, 112, 2, 113, 2, 114, -1, 3, 0, 3, 2, 12, -2, 2, 0, 2, 29, -8, 2, 20, 2, 0, 2, 36, -1, 2, 0, 2, 67, 2, 6, 2, 30, 2, 10, 2, 0, 2, 115, -1, 3, 0, 4, 2, 10, 2, 18, 2, 116, 2, 7, 2, 0, 2, 117, 2, 0, 2, 118, 2, 119, 2, 120, 2, 0, 2, 9, 3, 0, 9, 2, 21, 2, 30, 2, 31, 2, 121, 2, 122, -2, 2, 123, 2, 124, 2, 30, 2, 21, 2, 8, -2, 2, 125, 2, 30, 2, 32, -2, 2, 0, 2, 39, -2, 0, 4277075969, 2, 30, -1, 3, 20, 2, -1, 2, 33, 2, 126, 2, 0, 3, 30, 2, 2, 35, 2, 19, -3, 3, 0, 2, 2, 34, -1, 2, 0, 2, 35, 2, 0, 2, 35, 2, 0, 2, 50, 2, 98, 0, 4294934591, 2, 37, -7, 2, 0, 0, 197631, 2, 57, -1, 2, 20, 2, 43, 2, 37, 2, 18, 0, 3, 2, 18, 2, 126, 2, 21, 2, 127, 2, 54, -1, 0, 2490368, 2, 127, 2, 25, 2, 18, 2, 34, 2, 127, 2, 38, 0, 4294901904, 0, 4718591, 2, 127, 2, 35, 0, 335544350, -1, 2, 128, 0, 2147487743, 0, 1, -1, 2, 129, 2, 130, 2, 8, -1, 2, 131, 2, 70, 0, 3758161920, 0, 3, 2, 132, 0, 12582911, 0, 655360, -1, 2, 0, 2, 29, 0, 2147485568, 0, 3, 2, 0, 2, 25, 0, 176, -5, 2, 0, 2, 17, 0, 251658240, -1, 2, 0, 2, 25, 0, 16, -1, 2, 0, 0, 16779263, -2, 2, 12, -1, 2, 38, -5, 2, 0, 2, 133, -3, 3, 0, 2, 2, 55, 2, 134, 0, 2147549183, 0, 2, -2, 2, 135, 2, 36, 0, 10, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 536871935, 2, 18, 2, 0, 2, 42, -6, 2, 0, 0, 1, 2, 59, 2, 17, 0, 1, 2, 46, 2, 25, -3, 2, 136, 2, 36, 2, 137, 2, 138, 0, 16778239, -10, 2, 35, 0, 4294836212, 2, 9, -3, 2, 69, -2, 3, 0, 28, 2, 32, -3, 3, 0, 3, 2, 17, 3, 0, 6, 2, 50, -81, 2, 18, 3, 0, 2, 2, 36, 3, 0, 33, 2, 25, 0, 126, 3, 0, 124, 2, 12, 3, 0, 18, 2, 38, -213, 2, 10, -55, 3, 0, 17, 2, 42, 2, 8, 2, 18, 2, 0, 2, 8, 2, 18, 2, 60, 2, 0, 2, 25, 2, 50, 2, 139, 2, 25, -13, 2, 0, 2, 73, -6, 3, 0, 2, -4, 3, 0, 2, 0, 67583, -1, 2, 107, -2, 0, 11, 3, 0, 191, 2, 54, 3, 0, 38, 2, 30, 2, 55, 2, 34, -278, 2, 140, 3, 0, 9, 2, 141, 2, 142, 2, 56, 3, 0, 11, 2, 7, -72, 3, 0, 3, 2, 143, 2, 144, -187, 3, 0, 2, 2, 58, 2, 0, 2, 145, 2, 146, 2, 62, 2, 0, 2, 147, 2, 148, 2, 149, 3, 0, 10, 2, 150, 2, 151, 2, 22, 3, 58, 2, 3, 152, 2, 3, 59, 2, 2, 153, -57, 2, 8, 2, 154, -7, 2, 18, 2, 0, 2, 60, -4, 2, 0, 0, 1065361407, 0, 16384, -9, 2, 18, 2, 60, 2, 0, 2, 133, -14, 2, 18, 2, 133, -6, 2, 18, 0, 81919, -15, 2, 155, 3, 0, 6, 2, 126, -1, 3, 0, 2, 0, 2063, -37, 2, 62, 2, 156, 2, 157, 2, 158, 2, 159, 2, 160, -138, 3, 0, 1335, -1, 3, 0, 129, 2, 32, 3, 0, 6, 2, 10, 3, 0, 180, 2, 161, 3, 0, 233, 2, 162, 3, 0, 18, 2, 10, -77, 3, 0, 16, 2, 10, -47, 3, 0, 154, 2, 6, 3, 0, 130, 2, 25, -28386], [4294967295, 4294967291, 4092460543, 4294828031, 4294967294, 134217726, 4294903807, 268435455, 2147483647, 1048575, 1073741823, 3892314111, 134217727, 1061158911, 536805376, 4294910143, 4294901759, 32767, 4294901760, 262143, 536870911, 8388607, 4160749567, 4294902783, 4294918143, 65535, 67043328, 2281701374, 4294967264, 2097151, 4194303, 255, 67108863, 4294967039, 511, 524287, 131071, 63, 127, 3238002687, 4294549487, 4290772991, 33554431, 4294901888, 4286578687, 67043329, 4294705152, 4294770687, 67043583, 1023, 15, 2047999, 67043343, 67051519, 16777215, 2147483648, 4294902e3, 28, 4292870143, 4294966783, 16383, 67047423, 4294967279, 262083, 20511, 41943039, 493567, 4294959104, 603979775, 65536, 602799615, 805044223, 4294965206, 8191, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294909951, 4286578688, 4294967292, 4294965759, 535511039, 4294966272, 4294967280, 32768, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 4294443008, 268369920, 4292804608, 4294967232, 486341884, 4294963199, 3087007615, 1073692671, 4128527, 4279238655, 4294902015, 4160684047, 4290246655, 469499899, 4294967231, 134086655, 4294966591, 2445279231, 3670015, 31, 4294967288, 4294705151, 3221208447, 4294902271, 4294549472, 4294921215, 4095, 4285526655, 4294966527, 4294966143, 64, 4294966719, 3774873592, 1877934080, 262151, 2555904, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4294934527, 4087, 2016, 2147446655, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 4294901761]);
const isIDContinue = (code) => (unicodeLookup[(code >>> 5) + 0] >>> code & 31 & 1) !== 0;
const isIDStart = (code) => (unicodeLookup[(code >>> 5) + 34816] >>> code & 31 & 1) !== 0;
function advanceChar(parser) {
  parser.column++;
  return parser.currentChar = parser.source.charCodeAt(++parser.index);
}
function consumePossibleSurrogatePair(parser) {
  const hi = parser.currentChar;
  if ((hi & 64512) !== 55296)
    return 0;
  const lo = parser.source.charCodeAt(parser.index + 1);
  if ((lo & 64512) !== 56320)
    return 0;
  return 65536 + ((hi & 1023) << 10) + (lo & 1023);
}
function consumeLineFeed(parser, state) {
  parser.currentChar = parser.source.charCodeAt(++parser.index);
  parser.flags |= 1;
  if ((state & 4) === 0) {
    parser.column = 0;
    parser.line++;
  }
}
function scanNewLine(parser) {
  parser.flags |= 1;
  parser.currentChar = parser.source.charCodeAt(++parser.index);
  parser.column = 0;
  parser.line++;
}
function isExoticECMAScriptWhitespace(ch) {
  return ch === 160 || ch === 65279 || ch === 133 || ch === 5760 || ch >= 8192 && ch <= 8203 || ch === 8239 || ch === 8287 || ch === 12288 || ch === 8201 || ch === 65519;
}
function toHex(code) {
  return code < 65 ? code - 48 : code - 65 + 10 & 15;
}
function convertTokenType(t) {
  switch (t) {
    case 134283266:
      return "NumericLiteral";
    case 134283267:
      return "StringLiteral";
    case 86021:
    case 86022:
      return "BooleanLiteral";
    case 86023:
      return "NullLiteral";
    case 65540:
      return "RegularExpression";
    case 67174408:
    case 67174409:
    case 131:
      return "TemplateLiteral";
    default:
      if ((t & 143360) === 143360)
        return "Identifier";
      if ((t & 4096) === 4096)
        return "Keyword";
      return "Punctuator";
  }
}
const CharTypes = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  8 | 1024,
  0,
  0,
  8 | 2048,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  8192,
  0,
  1 | 2,
  0,
  0,
  8192,
  0,
  0,
  0,
  256,
  0,
  256 | 32768,
  0,
  0,
  2 | 16 | 128 | 32 | 64,
  2 | 16 | 128 | 32 | 64,
  2 | 16 | 32 | 64,
  2 | 16 | 32 | 64,
  2 | 16 | 32 | 64,
  2 | 16 | 32 | 64,
  2 | 16 | 32 | 64,
  2 | 16 | 32 | 64,
  2 | 16 | 512 | 64,
  2 | 16 | 512 | 64,
  0,
  0,
  16384,
  0,
  0,
  0,
  0,
  1 | 2 | 64,
  1 | 2 | 64,
  1 | 2 | 64,
  1 | 2 | 64,
  1 | 2 | 64,
  1 | 2 | 64,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  1 | 2,
  0,
  1,
  0,
  0,
  1 | 2 | 4096,
  0,
  1 | 2 | 4 | 64,
  1 | 2 | 4 | 64,
  1 | 2 | 4 | 64,
  1 | 2 | 4 | 64,
  1 | 2 | 4 | 64,
  1 | 2 | 4 | 64,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  1 | 2 | 4,
  16384,
  0,
  0,
  0,
  0
];
const isIdStart = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0
];
const isIdPart = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  0
];
function isIdentifierStart(code) {
  return code <= 127 ? isIdStart[code] > 0 : isIDStart(code);
}
function isIdentifierPart(code) {
  return code <= 127 ? isIdPart[code] > 0 : isIDContinue(code) || (code === 8204 || code === 8205);
}
const CommentTypes = ["SingleLine", "MultiLine", "HTMLOpen", "HTMLClose", "HashbangComment"];
function skipHashBang(parser) {
  const { source } = parser;
  if (parser.currentChar === 35 && source.charCodeAt(parser.index + 1) === 33) {
    advanceChar(parser);
    advanceChar(parser);
    skipSingleLineComment(parser, source, 0, 4, parser.tokenStart);
  }
}
function skipSingleHTMLComment(parser, source, state, context, type, start) {
  if (context & 2)
    parser.report(0);
  return skipSingleLineComment(parser, source, state, type, start);
}
function skipSingleLineComment(parser, source, state, type, start) {
  const { index } = parser;
  parser.tokenIndex = parser.index;
  parser.tokenLine = parser.line;
  parser.tokenColumn = parser.column;
  while (parser.index < parser.end) {
    if (CharTypes[parser.currentChar] & 8) {
      const isCR = parser.currentChar === 13;
      scanNewLine(parser);
      if (isCR && parser.index < parser.end && parser.currentChar === 10)
        parser.currentChar = source.charCodeAt(++parser.index);
      break;
    } else if ((parser.currentChar ^ 8232) <= 1) {
      scanNewLine(parser);
      break;
    }
    advanceChar(parser);
    parser.tokenIndex = parser.index;
    parser.tokenLine = parser.line;
    parser.tokenColumn = parser.column;
  }
  if (parser.options.onComment) {
    const loc = {
      start: {
        line: start.line,
        column: start.column
      },
      end: {
        line: parser.tokenLine,
        column: parser.tokenColumn
      }
    };
    parser.options.onComment(CommentTypes[type & 255], source.slice(index, parser.tokenIndex), start.index, parser.tokenIndex, loc);
  }
  return state | 1;
}
function skipMultiLineComment(parser, source, state) {
  const { index } = parser;
  while (parser.index < parser.end) {
    if (parser.currentChar < 43) {
      let skippedOneAsterisk = false;
      while (parser.currentChar === 42) {
        if (!skippedOneAsterisk) {
          state &= -5;
          skippedOneAsterisk = true;
        }
        if (advanceChar(parser) === 47) {
          advanceChar(parser);
          if (parser.options.onComment) {
            const loc = {
              start: {
                line: parser.tokenLine,
                column: parser.tokenColumn
              },
              end: {
                line: parser.line,
                column: parser.column
              }
            };
            parser.options.onComment(CommentTypes[1 & 255], source.slice(index, parser.index - 2), index - 2, parser.index, loc);
          }
          parser.tokenIndex = parser.index;
          parser.tokenLine = parser.line;
          parser.tokenColumn = parser.column;
          return state;
        }
      }
      if (skippedOneAsterisk) {
        continue;
      }
      if (CharTypes[parser.currentChar] & 8) {
        if (parser.currentChar === 13) {
          state |= 1 | 4;
          scanNewLine(parser);
        } else {
          consumeLineFeed(parser, state);
          state = state & -5 | 1;
        }
      } else {
        advanceChar(parser);
      }
    } else if ((parser.currentChar ^ 8232) <= 1) {
      state = state & -5 | 1;
      scanNewLine(parser);
    } else {
      state &= -5;
      advanceChar(parser);
    }
  }
  parser.report(18);
}
var RegexState;
(function(RegexState2) {
  RegexState2[RegexState2["Empty"] = 0] = "Empty";
  RegexState2[RegexState2["Escape"] = 1] = "Escape";
  RegexState2[RegexState2["Class"] = 2] = "Class";
})(RegexState || (RegexState = {}));
var RegexFlags;
(function(RegexFlags2) {
  RegexFlags2[RegexFlags2["Empty"] = 0] = "Empty";
  RegexFlags2[RegexFlags2["IgnoreCase"] = 1] = "IgnoreCase";
  RegexFlags2[RegexFlags2["Global"] = 2] = "Global";
  RegexFlags2[RegexFlags2["Multiline"] = 4] = "Multiline";
  RegexFlags2[RegexFlags2["Unicode"] = 16] = "Unicode";
  RegexFlags2[RegexFlags2["Sticky"] = 8] = "Sticky";
  RegexFlags2[RegexFlags2["DotAll"] = 32] = "DotAll";
  RegexFlags2[RegexFlags2["Indices"] = 64] = "Indices";
  RegexFlags2[RegexFlags2["UnicodeSets"] = 128] = "UnicodeSets";
})(RegexFlags || (RegexFlags = {}));
function scanRegularExpression(parser) {
  const bodyStart = parser.index;
  let preparseState = RegexState.Empty;
  loop: while (true) {
    const ch = parser.currentChar;
    advanceChar(parser);
    if (preparseState & RegexState.Escape) {
      preparseState &= ~RegexState.Escape;
    } else {
      switch (ch) {
        case 47:
          if (!preparseState)
            break loop;
          else
            break;
        case 92:
          preparseState |= RegexState.Escape;
          break;
        case 91:
          preparseState |= RegexState.Class;
          break;
        case 93:
          preparseState &= RegexState.Escape;
          break;
      }
    }
    if (ch === 13 || ch === 10 || ch === 8232 || ch === 8233) {
      parser.report(34);
    }
    if (parser.index >= parser.source.length) {
      return parser.report(34);
    }
  }
  const bodyEnd = parser.index - 1;
  let mask = RegexFlags.Empty;
  let char = parser.currentChar;
  const { index: flagStart } = parser;
  while (isIdentifierPart(char)) {
    switch (char) {
      case 103:
        if (mask & RegexFlags.Global)
          parser.report(36, "g");
        mask |= RegexFlags.Global;
        break;
      case 105:
        if (mask & RegexFlags.IgnoreCase)
          parser.report(36, "i");
        mask |= RegexFlags.IgnoreCase;
        break;
      case 109:
        if (mask & RegexFlags.Multiline)
          parser.report(36, "m");
        mask |= RegexFlags.Multiline;
        break;
      case 117:
        if (mask & RegexFlags.Unicode)
          parser.report(36, "u");
        if (mask & RegexFlags.UnicodeSets)
          parser.report(36, "vu");
        mask |= RegexFlags.Unicode;
        break;
      case 118:
        if (mask & RegexFlags.Unicode)
          parser.report(36, "uv");
        if (mask & RegexFlags.UnicodeSets)
          parser.report(36, "v");
        mask |= RegexFlags.UnicodeSets;
        break;
      case 121:
        if (mask & RegexFlags.Sticky)
          parser.report(36, "y");
        mask |= RegexFlags.Sticky;
        break;
      case 115:
        if (mask & RegexFlags.DotAll)
          parser.report(36, "s");
        mask |= RegexFlags.DotAll;
        break;
      case 100:
        if (mask & RegexFlags.Indices)
          parser.report(36, "d");
        mask |= RegexFlags.Indices;
        break;
      default:
        parser.report(35);
    }
    char = advanceChar(parser);
  }
  const flags = parser.source.slice(flagStart, parser.index);
  const pattern = parser.source.slice(bodyStart, bodyEnd);
  parser.tokenRegExp = { pattern, flags };
  if (parser.options.raw)
    parser.tokenRaw = parser.source.slice(parser.tokenIndex, parser.index);
  parser.tokenValue = validate(parser, pattern, flags);
  return 65540;
}
function validate(parser, pattern, flags) {
  try {
    return new RegExp(pattern, flags);
  } catch {
    try {
      new RegExp(pattern, flags);
      return null;
    } catch {
      parser.report(34);
    }
  }
}
function scanString(parser, context, quote) {
  const { index: start } = parser;
  let ret = "";
  let char = advanceChar(parser);
  let marker = parser.index;
  while ((CharTypes[char] & 8) === 0) {
    if (char === quote) {
      ret += parser.source.slice(marker, parser.index);
      advanceChar(parser);
      if (parser.options.raw)
        parser.tokenRaw = parser.source.slice(start, parser.index);
      parser.tokenValue = ret;
      return 134283267;
    }
    if ((char & 8) === 8 && char === 92) {
      ret += parser.source.slice(marker, parser.index);
      char = advanceChar(parser);
      if (char < 127 || char === 8232 || char === 8233) {
        const code = parseEscape(parser, context, char);
        if (code >= 0)
          ret += String.fromCodePoint(code);
        else
          handleStringError(parser, code, 0);
      } else {
        ret += String.fromCodePoint(char);
      }
      marker = parser.index + 1;
    } else if (char === 8232 || char === 8233) {
      parser.column = -1;
      parser.line++;
    }
    if (parser.index >= parser.end)
      parser.report(16);
    char = advanceChar(parser);
  }
  parser.report(16);
}
function parseEscape(parser, context, first, isTemplate = 0) {
  switch (first) {
    case 98:
      return 8;
    case 102:
      return 12;
    case 114:
      return 13;
    case 110:
      return 10;
    case 116:
      return 9;
    case 118:
      return 11;
    case 13: {
      if (parser.index < parser.end) {
        const nextChar = parser.source.charCodeAt(parser.index + 1);
        if (nextChar === 10) {
          parser.index = parser.index + 1;
          parser.currentChar = nextChar;
        }
      }
    }
    case 10:
    case 8232:
    case 8233:
      parser.column = -1;
      parser.line++;
      return -1;
    case 48:
    case 49:
    case 50:
    case 51: {
      let code = first - 48;
      let index = parser.index + 1;
      let column = parser.column + 1;
      if (index < parser.end) {
        const next = parser.source.charCodeAt(index);
        if ((CharTypes[next] & 32) === 0) {
          if (code !== 0 || CharTypes[next] & 512) {
            if (context & 1 || isTemplate)
              return -2;
            parser.flags |= 64;
          }
        } else if (context & 1 || isTemplate) {
          return -2;
        } else {
          parser.currentChar = next;
          code = code << 3 | next - 48;
          index++;
          column++;
          if (index < parser.end) {
            const next2 = parser.source.charCodeAt(index);
            if (CharTypes[next2] & 32) {
              parser.currentChar = next2;
              code = code << 3 | next2 - 48;
              index++;
              column++;
            }
          }
          parser.flags |= 64;
        }
        parser.index = index - 1;
        parser.column = column - 1;
      }
      return code;
    }
    case 52:
    case 53:
    case 54:
    case 55: {
      if (isTemplate || context & 1)
        return -2;
      let code = first - 48;
      const index = parser.index + 1;
      const column = parser.column + 1;
      if (index < parser.end) {
        const next = parser.source.charCodeAt(index);
        if (CharTypes[next] & 32) {
          code = code << 3 | next - 48;
          parser.currentChar = next;
          parser.index = index;
          parser.column = column;
        }
      }
      parser.flags |= 64;
      return code;
    }
    case 120: {
      const ch1 = advanceChar(parser);
      if ((CharTypes[ch1] & 64) === 0)
        return -4;
      const hi = toHex(ch1);
      const ch2 = advanceChar(parser);
      if ((CharTypes[ch2] & 64) === 0)
        return -4;
      const lo = toHex(ch2);
      return hi << 4 | lo;
    }
    case 117: {
      const ch = advanceChar(parser);
      if (parser.currentChar === 123) {
        let code = 0;
        while ((CharTypes[advanceChar(parser)] & 64) !== 0) {
          code = code << 4 | toHex(parser.currentChar);
          if (code > 1114111)
            return -5;
        }
        if (parser.currentChar < 1 || parser.currentChar !== 125) {
          return -4;
        }
        return code;
      } else {
        if ((CharTypes[ch] & 64) === 0)
          return -4;
        const ch2 = parser.source.charCodeAt(parser.index + 1);
        if ((CharTypes[ch2] & 64) === 0)
          return -4;
        const ch3 = parser.source.charCodeAt(parser.index + 2);
        if ((CharTypes[ch3] & 64) === 0)
          return -4;
        const ch4 = parser.source.charCodeAt(parser.index + 3);
        if ((CharTypes[ch4] & 64) === 0)
          return -4;
        parser.index += 3;
        parser.column += 3;
        parser.currentChar = parser.source.charCodeAt(parser.index);
        return toHex(ch) << 12 | toHex(ch2) << 8 | toHex(ch3) << 4 | toHex(ch4);
      }
    }
    case 56:
    case 57:
      if (isTemplate || !parser.options.webcompat || context & 1)
        return -3;
      parser.flags |= 4096;
    default:
      return first;
  }
}
function handleStringError(parser, code, isTemplate) {
  switch (code) {
    case -1:
      return;
    case -2:
      parser.report(isTemplate ? 2 : 1);
    case -3:
      parser.report(isTemplate ? 3 : 14);
    case -4:
      parser.report(7);
    case -5:
      parser.report(104);
  }
}
function scanTemplate(parser, context) {
  const { index: start } = parser;
  let token = 67174409;
  let ret = "";
  let char = advanceChar(parser);
  while (char !== 96) {
    if (char === 36 && parser.source.charCodeAt(parser.index + 1) === 123) {
      advanceChar(parser);
      token = 67174408;
      break;
    } else if (char === 92) {
      char = advanceChar(parser);
      if (char > 126) {
        ret += String.fromCodePoint(char);
      } else {
        const { index, line, column } = parser;
        const code = parseEscape(parser, context | 1, char, 1);
        if (code >= 0) {
          ret += String.fromCodePoint(code);
        } else if (code !== -1 && context & 64) {
          parser.index = index;
          parser.line = line;
          parser.column = column;
          ret = null;
          char = scanBadTemplate(parser, char);
          if (char < 0)
            token = 67174408;
          break;
        } else {
          handleStringError(parser, code, 1);
        }
      }
    } else if (parser.index < parser.end) {
      if (char === 13 && parser.source.charCodeAt(parser.index) === 10) {
        ret += String.fromCodePoint(char);
        parser.currentChar = parser.source.charCodeAt(++parser.index);
      }
      if ((char & 83) < 3 && char === 10 || (char ^ 8232) <= 1) {
        parser.column = -1;
        parser.line++;
      }
      ret += String.fromCodePoint(char);
    }
    if (parser.index >= parser.end)
      parser.report(17);
    char = advanceChar(parser);
  }
  advanceChar(parser);
  parser.tokenValue = ret;
  parser.tokenRaw = parser.source.slice(start + 1, parser.index - (token === 67174409 ? 1 : 2));
  return token;
}
function scanBadTemplate(parser, ch) {
  while (ch !== 96) {
    switch (ch) {
      case 36: {
        const index = parser.index + 1;
        if (index < parser.end && parser.source.charCodeAt(index) === 123) {
          parser.index = index;
          parser.column++;
          return -ch;
        }
        break;
      }
      case 10:
      case 8232:
      case 8233:
        parser.column = -1;
        parser.line++;
    }
    if (parser.index >= parser.end)
      parser.report(17);
    ch = advanceChar(parser);
  }
  return ch;
}
function scanTemplateTail(parser, context) {
  if (parser.index >= parser.end)
    parser.report(0);
  parser.index--;
  parser.column--;
  return scanTemplate(parser, context);
}
const errorMessages = {
  [0]: "Unexpected token",
  [30]: "Unexpected token: '%0'",
  [1]: "Octal escape sequences are not allowed in strict mode",
  [2]: "Octal escape sequences are not allowed in template strings",
  [3]: "\\8 and \\9 are not allowed in template strings",
  [4]: "Private identifier #%0 is not defined",
  [5]: "Illegal Unicode escape sequence",
  [6]: "Invalid code point %0",
  [7]: "Invalid hexadecimal escape sequence",
  [9]: "Octal literals are not allowed in strict mode",
  [8]: "Decimal integer literals with a leading zero are forbidden in strict mode",
  [10]: "Expected number in radix %0",
  [151]: "Invalid left-hand side assignment to a destructible right-hand side",
  [11]: "Non-number found after exponent indicator",
  [12]: "Invalid BigIntLiteral",
  [13]: "No identifiers allowed directly after numeric literal",
  [14]: "Escapes \\8 or \\9 are not syntactically valid escapes",
  [15]: "Escapes \\8 or \\9 are not allowed in strict mode",
  [16]: "Unterminated string literal",
  [17]: "Unterminated template literal",
  [18]: "Multiline comment was not closed properly",
  [19]: "The identifier contained dynamic unicode escape that was not closed",
  [20]: "Illegal character '%0'",
  [21]: "Missing hexadecimal digits",
  [22]: "Invalid implicit octal",
  [23]: "Invalid line break in string literal",
  [24]: "Only unicode escapes are legal in identifier names",
  [25]: "Expected '%0'",
  [26]: "Invalid left-hand side in assignment",
  [27]: "Invalid left-hand side in async arrow",
  [28]: 'Calls to super must be in the "constructor" method of a class expression or class declaration that has a superclass',
  [29]: "Member access on super must be in a method",
  [31]: "Await expression not allowed in formal parameter",
  [32]: "Yield expression not allowed in formal parameter",
  [95]: "Unexpected token: 'escaped keyword'",
  [33]: "Unary expressions as the left operand of an exponentiation expression must be disambiguated with parentheses",
  [123]: "Async functions can only be declared at the top level or inside a block",
  [34]: "Unterminated regular expression",
  [35]: "Unexpected regular expression flag",
  [36]: "Duplicate regular expression flag '%0'",
  [37]: "%0 functions must have exactly %1 argument%2",
  [38]: "Setter function argument must not be a rest parameter",
  [39]: "%0 declaration must have a name in this context",
  [40]: "Function name may not contain any reserved words or be eval or arguments in strict mode",
  [41]: "The rest operator is missing an argument",
  [42]: "A getter cannot be a generator",
  [43]: "A setter cannot be a generator",
  [44]: "A computed property name must be followed by a colon or paren",
  [134]: "Object literal keys that are strings or numbers must be a method or have a colon",
  [46]: "Found `* async x(){}` but this should be `async * x(){}`",
  [45]: "Getters and setters can not be generators",
  [47]: "'%0' can not be generator method",
  [48]: "No line break is allowed after '=>'",
  [49]: "The left-hand side of the arrow can only be destructed through assignment",
  [50]: "The binding declaration is not destructible",
  [51]: "Async arrow can not be followed by new expression",
  [52]: "Classes may not have a static property named 'prototype'",
  [53]: "Class constructor may not be a %0",
  [54]: "Duplicate constructor method in class",
  [55]: "Invalid increment/decrement operand",
  [56]: "Invalid use of `new` keyword on an increment/decrement expression",
  [57]: "`=>` is an invalid assignment target",
  [58]: "Rest element may not have a trailing comma",
  [59]: "Missing initializer in %0 declaration",
  [60]: "'for-%0' loop head declarations can not have an initializer",
  [61]: "Invalid left-hand side in for-%0 loop: Must have a single binding",
  [62]: "Invalid shorthand property initializer",
  [63]: "Property name __proto__ appears more than once in object literal",
  [64]: "Let is disallowed as a lexically bound name",
  [65]: "Invalid use of '%0' inside new expression",
  [66]: "Illegal 'use strict' directive in function with non-simple parameter list",
  [67]: 'Identifier "let" disallowed as left-hand side expression in strict mode',
  [68]: "Illegal continue statement",
  [69]: "Illegal break statement",
  [70]: "Cannot have `let[...]` as a var name in strict mode",
  [71]: "Invalid destructuring assignment target",
  [72]: "Rest parameter may not have a default initializer",
  [73]: "The rest argument must the be last parameter",
  [74]: "Invalid rest argument",
  [76]: "In strict mode code, functions can only be declared at top level or inside a block",
  [77]: "In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement",
  [78]: "Without web compatibility enabled functions can not be declared at top level, inside a block, or as the body of an if statement",
  [79]: "Class declaration can't appear in single-statement context",
  [80]: "Invalid left-hand side in for-%0",
  [81]: "Invalid assignment in for-%0",
  [82]: "for await (... of ...) is only valid in async functions and async generators",
  [83]: "The first token after the template expression should be a continuation of the template",
  [85]: "`let` declaration not allowed here and `let` cannot be a regular var name in strict mode",
  [84]: "`let \n [` is a restricted production at the start of a statement",
  [86]: "Catch clause requires exactly one parameter, not more (and no trailing comma)",
  [87]: "Catch clause parameter does not support default values",
  [88]: "Missing catch or finally after try",
  [89]: "More than one default clause in switch statement",
  [90]: "Illegal newline after throw",
  [91]: "Strict mode code may not include a with statement",
  [92]: "Illegal return statement",
  [93]: "The left hand side of the for-header binding declaration is not destructible",
  [94]: "new.target only allowed within functions or static blocks",
  [96]: "'#' not followed by identifier",
  [102]: "Invalid keyword",
  [101]: "Can not use 'let' as a class name",
  [100]: "'A lexical declaration can't define a 'let' binding",
  [99]: "Can not use `let` as variable name in strict mode",
  [97]: "'%0' may not be used as an identifier in this context",
  [98]: "Await is only valid in async functions",
  [103]: "The %0 keyword can only be used with the module goal",
  [104]: "Unicode codepoint must not be greater than 0x10FFFF",
  [105]: "%0 source must be string",
  [106]: "Only a identifier or string can be used to indicate alias",
  [107]: "Only '*' or '{...}' can be imported after default",
  [108]: "Trailing decorator may be followed by method",
  [109]: "Decorators can't be used with a constructor",
  [110]: "Can not use `await` as identifier in module or async func",
  [111]: "Can not use `await` as identifier in module",
  [112]: "HTML comments are only allowed with web compatibility (Annex B)",
  [113]: "The identifier 'let' must not be in expression position in strict mode",
  [114]: "Cannot assign to `eval` and `arguments` in strict mode",
  [115]: "The left-hand side of a for-of loop may not start with 'let'",
  [116]: "Block body arrows can not be immediately invoked without a group",
  [117]: "Block body arrows can not be immediately accessed without a group",
  [118]: "Unexpected strict mode reserved word",
  [119]: "Unexpected eval or arguments in strict mode",
  [120]: "Decorators must not be followed by a semicolon",
  [121]: "Calling delete on expression not allowed in strict mode",
  [122]: "Pattern can not have a tail",
  [124]: "Can not have a `yield` expression on the left side of a ternary",
  [125]: "An arrow function can not have a postfix update operator",
  [126]: "Invalid object literal key character after generator star",
  [127]: "Private fields can not be deleted",
  [129]: "Classes may not have a field called constructor",
  [128]: "Classes may not have a private element named constructor",
  [130]: "A class field initializer or static block may not contain arguments",
  [131]: "Generators can only be declared at the top level or inside a block",
  [132]: "Async methods are a restricted production and cannot have a newline following it",
  [133]: "Unexpected character after object literal property name",
  [135]: "Invalid key token",
  [136]: "Label '%0' has already been declared",
  [137]: "continue statement must be nested within an iteration statement",
  [138]: "Undefined label '%0'",
  [139]: "Trailing comma is disallowed inside import(...) arguments",
  [140]: "Invalid binding in JSON import",
  [141]: "import() requires exactly one argument",
  [142]: "Cannot use new with import(...)",
  [143]: "... is not allowed in import()",
  [144]: "Expected '=>'",
  [145]: "Duplicate binding '%0'",
  [146]: "Duplicate private identifier #%0",
  [147]: "Cannot export a duplicate name '%0'",
  [150]: "Duplicate %0 for-binding",
  [148]: "Exported binding '%0' needs to refer to a top-level declared variable",
  [149]: "Unexpected private field",
  [153]: "Numeric separators are not allowed at the end of numeric literals",
  [152]: "Only one underscore is allowed as numeric separator",
  [154]: "JSX value should be either an expression or a quoted JSX text",
  [155]: "Expected corresponding JSX closing tag for %0",
  [156]: "Adjacent JSX elements must be wrapped in an enclosing tag",
  [157]: "JSX attributes must only be assigned a non-empty 'expression'",
  [158]: "'%0' has already been declared",
  [159]: "'%0' shadowed a catch clause binding",
  [160]: "Dot property must be an identifier",
  [161]: "Encountered invalid input after spread/rest argument",
  [162]: "Catch without try",
  [163]: "Finally without try",
  [164]: "Expected corresponding closing tag for JSX fragment",
  [165]: "Coalescing and logical operators used together in the same expression must be disambiguated with parentheses",
  [166]: "Invalid tagged template on optional chain",
  [167]: "Invalid optional chain from super property",
  [168]: "Invalid optional chain from new expression",
  [169]: 'Cannot use "import.meta" outside a module',
  [170]: "Leading decorators must be attached to a class declaration",
  [171]: "An export name cannot include a lone surrogate, found %0",
  [172]: "A string literal cannot be used as an exported binding without `from`",
  [173]: "Private fields can't be accessed on super",
  [174]: "The only valid meta property for import is 'import.meta'",
  [175]: "'import.meta' must not contain escaped characters",
  [176]: 'cannot use "await" as identifier inside an async function',
  [177]: 'cannot use "await" in static blocks'
};
class ParseError extends SyntaxError {
  start;
  end;
  range;
  loc;
  description;
  constructor(start, end, type, ...params) {
    const description = errorMessages[type].replace(/%(\d+)/g, (_, i) => params[i]);
    const message = "[" + start.line + ":" + start.column + "-" + end.line + ":" + end.column + "]: " + description;
    super(message);
    this.start = start.index;
    this.end = end.index;
    this.range = [start.index, end.index];
    this.loc = {
      start: { line: start.line, column: start.column },
      end: { line: end.line, column: end.column }
    };
    this.description = description;
  }
}
function scanNumber(parser, context, kind) {
  let char = parser.currentChar;
  let value = 0;
  let digit = 9;
  let atStart = kind & 64 ? 0 : 1;
  let digits = 0;
  let allowSeparator = 0;
  if (kind & 64) {
    value = "." + scanDecimalDigitsOrSeparator(parser, char);
    char = parser.currentChar;
    if (char === 110)
      parser.report(12);
  } else {
    if (char === 48) {
      char = advanceChar(parser);
      if ((char | 32) === 120) {
        kind = 8 | 128;
        char = advanceChar(parser);
        while (CharTypes[char] & (64 | 4096)) {
          if (char === 95) {
            if (!allowSeparator)
              parser.report(152);
            allowSeparator = 0;
            char = advanceChar(parser);
            continue;
          }
          allowSeparator = 1;
          value = value * 16 + toHex(char);
          digits++;
          char = advanceChar(parser);
        }
        if (digits === 0 || !allowSeparator) {
          parser.report(digits === 0 ? 21 : 153);
        }
      } else if ((char | 32) === 111) {
        kind = 4 | 128;
        char = advanceChar(parser);
        while (CharTypes[char] & (32 | 4096)) {
          if (char === 95) {
            if (!allowSeparator) {
              parser.report(152);
            }
            allowSeparator = 0;
            char = advanceChar(parser);
            continue;
          }
          allowSeparator = 1;
          value = value * 8 + (char - 48);
          digits++;
          char = advanceChar(parser);
        }
        if (digits === 0 || !allowSeparator) {
          parser.report(digits === 0 ? 0 : 153);
        }
      } else if ((char | 32) === 98) {
        kind = 2 | 128;
        char = advanceChar(parser);
        while (CharTypes[char] & (128 | 4096)) {
          if (char === 95) {
            if (!allowSeparator) {
              parser.report(152);
            }
            allowSeparator = 0;
            char = advanceChar(parser);
            continue;
          }
          allowSeparator = 1;
          value = value * 2 + (char - 48);
          digits++;
          char = advanceChar(parser);
        }
        if (digits === 0 || !allowSeparator) {
          parser.report(digits === 0 ? 0 : 153);
        }
      } else if (CharTypes[char] & 32) {
        if (context & 1)
          parser.report(1);
        kind = 1;
        while (CharTypes[char] & 16) {
          if (CharTypes[char] & 512) {
            kind = 32;
            atStart = 0;
            break;
          }
          value = value * 8 + (char - 48);
          char = advanceChar(parser);
        }
      } else if (CharTypes[char] & 512) {
        if (context & 1)
          parser.report(1);
        parser.flags |= 64;
        kind = 32;
      } else if (char === 95) {
        parser.report(0);
      }
    }
    if (kind & 48) {
      if (atStart) {
        while (digit >= 0 && CharTypes[char] & (16 | 4096)) {
          if (char === 95) {
            char = advanceChar(parser);
            if (char === 95 || kind & 32) {
              throw new ParseError(parser.currentLocation, { index: parser.index + 1, line: parser.line, column: parser.column }, 152);
            }
            allowSeparator = 1;
            continue;
          }
          allowSeparator = 0;
          value = 10 * value + (char - 48);
          char = advanceChar(parser);
          --digit;
        }
        if (allowSeparator) {
          throw new ParseError(parser.currentLocation, { index: parser.index + 1, line: parser.line, column: parser.column }, 153);
        }
        if (digit >= 0 && !isIdentifierStart(char) && char !== 46) {
          parser.tokenValue = value;
          if (parser.options.raw)
            parser.tokenRaw = parser.source.slice(parser.tokenIndex, parser.index);
          return 134283266;
        }
      }
      value += scanDecimalDigitsOrSeparator(parser, char);
      char = parser.currentChar;
      if (char === 46) {
        if (advanceChar(parser) === 95)
          parser.report(0);
        kind = 64;
        value += "." + scanDecimalDigitsOrSeparator(parser, parser.currentChar);
        char = parser.currentChar;
      }
    }
  }
  const end = parser.index;
  let isBigInt = 0;
  if (char === 110 && kind & 128) {
    isBigInt = 1;
    char = advanceChar(parser);
  } else {
    if ((char | 32) === 101) {
      char = advanceChar(parser);
      if (CharTypes[char] & 256)
        char = advanceChar(parser);
      const { index } = parser;
      if ((CharTypes[char] & 16) === 0)
        parser.report(11);
      value += parser.source.substring(end, index) + scanDecimalDigitsOrSeparator(parser, char);
      char = parser.currentChar;
    }
  }
  if (parser.index < parser.end && CharTypes[char] & 16 || isIdentifierStart(char)) {
    parser.report(13);
  }
  if (isBigInt) {
    parser.tokenRaw = parser.source.slice(parser.tokenIndex, parser.index);
    parser.tokenValue = BigInt(parser.tokenRaw.slice(0, -1).replaceAll("_", ""));
    return 134283388;
  }
  parser.tokenValue = kind & (1 | 2 | 8 | 4) ? value : kind & 32 ? parseFloat(parser.source.substring(parser.tokenIndex, parser.index)) : +value;
  if (parser.options.raw)
    parser.tokenRaw = parser.source.slice(parser.tokenIndex, parser.index);
  return 134283266;
}
function scanDecimalDigitsOrSeparator(parser, char) {
  let allowSeparator = 0;
  let start = parser.index;
  let ret = "";
  while (CharTypes[char] & (16 | 4096)) {
    if (char === 95) {
      const { index } = parser;
      char = advanceChar(parser);
      if (char === 95) {
        throw new ParseError(parser.currentLocation, { index: parser.index + 1, line: parser.line, column: parser.column }, 152);
      }
      allowSeparator = 1;
      ret += parser.source.substring(start, index);
      start = parser.index;
      continue;
    }
    allowSeparator = 0;
    char = advanceChar(parser);
  }
  if (allowSeparator) {
    throw new ParseError(parser.currentLocation, { index: parser.index + 1, line: parser.line, column: parser.column }, 153);
  }
  return ret + parser.source.substring(start, parser.index);
}
const KeywordDescTable = [
  "end of source",
  "identifier",
  "number",
  "string",
  "regular expression",
  "false",
  "true",
  "null",
  "template continuation",
  "template tail",
  "=>",
  "(",
  "{",
  ".",
  "...",
  "}",
  ")",
  ";",
  ",",
  "[",
  "]",
  ":",
  "?",
  "'",
  '"',
  "++",
  "--",
  "=",
  "<<=",
  ">>=",
  ">>>=",
  "**=",
  "+=",
  "-=",
  "*=",
  "/=",
  "%=",
  "^=",
  "|=",
  "&=",
  "||=",
  "&&=",
  "??=",
  "typeof",
  "delete",
  "void",
  "!",
  "~",
  "+",
  "-",
  "in",
  "instanceof",
  "*",
  "%",
  "/",
  "**",
  "&&",
  "||",
  "===",
  "!==",
  "==",
  "!=",
  "<=",
  ">=",
  "<",
  ">",
  "<<",
  ">>",
  ">>>",
  "&",
  "|",
  "^",
  "var",
  "let",
  "const",
  "break",
  "case",
  "catch",
  "class",
  "continue",
  "debugger",
  "default",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "new",
  "return",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "while",
  "with",
  "implements",
  "interface",
  "package",
  "private",
  "protected",
  "public",
  "static",
  "yield",
  "as",
  "async",
  "await",
  "constructor",
  "get",
  "set",
  "accessor",
  "from",
  "of",
  "enum",
  "eval",
  "arguments",
  "escaped keyword",
  "escaped future reserved keyword",
  "reserved if strict",
  "#",
  "BigIntLiteral",
  "??",
  "?.",
  "WhiteSpace",
  "Illegal",
  "LineTerminator",
  "PrivateField",
  "Template",
  "@",
  "target",
  "meta",
  "LineFeed",
  "Escaped",
  "JSXText"
];
const descKeywordTable = {
  this: 86111,
  function: 86104,
  if: 20569,
  return: 20572,
  var: 86088,
  else: 20563,
  for: 20567,
  new: 86107,
  in: 8673330,
  typeof: 16863275,
  while: 20578,
  case: 20556,
  break: 20555,
  try: 20577,
  catch: 20557,
  delete: 16863276,
  throw: 86112,
  switch: 86110,
  continue: 20559,
  default: 20561,
  instanceof: 8411187,
  do: 20562,
  void: 16863277,
  finally: 20566,
  async: 209005,
  await: 209006,
  class: 86094,
  const: 86090,
  constructor: 12399,
  debugger: 20560,
  export: 20564,
  extends: 20565,
  false: 86021,
  from: 209011,
  get: 209008,
  implements: 36964,
  import: 86106,
  interface: 36965,
  let: 241737,
  null: 86023,
  of: 471156,
  package: 36966,
  private: 36967,
  protected: 36968,
  public: 36969,
  set: 209009,
  static: 36970,
  super: 86109,
  true: 86022,
  with: 20579,
  yield: 241771,
  enum: 86133,
  eval: 537079926,
  as: 77932,
  arguments: 537079927,
  target: 209029,
  meta: 209030,
  accessor: 12402
};
function matchOrInsertSemicolon(parser, context) {
  if ((parser.flags & 1) === 0 && (parser.getToken() & 1048576) !== 1048576) {
    parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  }
  if (!consumeOpt(parser, context, 1074790417)) {
    parser.options.onInsertedSemicolon?.(parser.startIndex);
  }
}
function isValidStrictMode(parser, index, tokenIndex, tokenValue) {
  if (index - tokenIndex < 13 && tokenValue === "use strict") {
    if ((parser.getToken() & 1048576) === 1048576 || parser.flags & 1) {
      return 1;
    }
  }
  return 0;
}
function optionalBit(parser, context, t) {
  if (parser.getToken() !== t)
    return 0;
  nextToken(parser, context);
  return 1;
}
function consumeOpt(parser, context, t) {
  if (parser.getToken() !== t)
    return false;
  nextToken(parser, context);
  return true;
}
function consume(parser, context, t) {
  if (parser.getToken() !== t)
    parser.report(25, KeywordDescTable[t & 255]);
  nextToken(parser, context);
}
function reinterpretToPattern(parser, node) {
  switch (node.type) {
    case "ArrayExpression": {
      node.type = "ArrayPattern";
      const { elements } = node;
      for (let i = 0, n = elements.length; i < n; ++i) {
        const element = elements[i];
        if (element)
          reinterpretToPattern(parser, element);
      }
      return;
    }
    case "ObjectExpression": {
      node.type = "ObjectPattern";
      const { properties } = node;
      for (let i = 0, n = properties.length; i < n; ++i) {
        reinterpretToPattern(parser, properties[i]);
      }
      return;
    }
    case "AssignmentExpression":
      node.type = "AssignmentPattern";
      if (node.operator !== "=")
        parser.report(71);
      delete node.operator;
      reinterpretToPattern(parser, node.left);
      return;
    case "Property":
      reinterpretToPattern(parser, node.value);
      return;
    case "SpreadElement":
      node.type = "RestElement";
      reinterpretToPattern(parser, node.argument);
  }
}
function validateBindingIdentifier(parser, context, kind, t, skipEvalArgCheck) {
  if (context & 1) {
    if ((t & 36864) === 36864) {
      parser.report(118);
    }
    if (!skipEvalArgCheck && (t & 537079808) === 537079808) {
      parser.report(119);
    }
  }
  if ((t & 20480) === 20480 || t === -2147483528) {
    parser.report(102);
  }
  if (kind & (8 | 16) && (t & 255) === (241737 & 255)) {
    parser.report(100);
  }
  if (context & (2048 | 2) && t === 209006) {
    parser.report(110);
  }
  if (context & (1024 | 1) && t === 241771) {
    parser.report(97, "yield");
  }
}
function validateFunctionName(parser, context, t) {
  if (context & 1) {
    if ((t & 36864) === 36864) {
      parser.report(118);
    }
    if ((t & 537079808) === 537079808) {
      parser.report(119);
    }
    if (t === -2147483527) {
      parser.report(95);
    }
    if (t === -2147483528) {
      parser.report(95);
    }
  }
  if ((t & 20480) === 20480) {
    parser.report(102);
  }
  if (context & (2048 | 2) && t === 209006) {
    parser.report(110);
  }
  if (context & (1024 | 1) && t === 241771) {
    parser.report(97, "yield");
  }
}
function isStrictReservedWord(parser, context, t) {
  if (t === 209006) {
    if (context & (2048 | 2))
      parser.report(110);
    parser.destructible |= 128;
  }
  if (t === 241771 && context & 1024)
    parser.report(97, "yield");
  return (t & 20480) === 20480 || (t & 36864) === 36864 || t == -2147483527;
}
function isPropertyWithPrivateFieldKey(expr) {
  return !expr.property ? false : expr.property.type === "PrivateIdentifier";
}
function isValidLabel(parser, labels, name, isIterationStatement) {
  while (labels) {
    if (labels["$" + name]) {
      if (isIterationStatement)
        parser.report(137);
      return 1;
    }
    if (isIterationStatement && labels.loop)
      isIterationStatement = 0;
    labels = labels["$"];
  }
  return 0;
}
function validateAndDeclareLabel(parser, labels, name) {
  let set = labels;
  while (set) {
    if (set["$" + name])
      parser.report(136, name);
    set = set["$"];
  }
  labels["$" + name] = 1;
}
function isEqualTagName(elementName) {
  switch (elementName.type) {
    case "JSXIdentifier":
      return elementName.name;
    case "JSXNamespacedName":
      return elementName.namespace + ":" + elementName.name;
    case "JSXMemberExpression":
      return isEqualTagName(elementName.object) + "." + isEqualTagName(elementName.property);
  }
}
function isValidIdentifier(context, t) {
  if (context & (1 | 1024)) {
    if (context & 2 && t === 209006)
      return false;
    if (context & 1024 && t === 241771)
      return false;
    return (t & 12288) === 12288;
  }
  return (t & 12288) === 12288 || (t & 36864) === 36864;
}
function classifyIdentifier(parser, context, t) {
  if ((t & 537079808) === 537079808) {
    if (context & 1)
      parser.report(119);
    parser.flags |= 512;
  }
  if (!isValidIdentifier(context, t))
    parser.report(0);
}
function getOwnProperty(object, key) {
  return Object.hasOwn(object, key) ? object[key] : void 0;
}
function scanIdentifier(parser, context, isValidAsKeyword) {
  while (isIdPart[advanceChar(parser)])
    ;
  parser.tokenValue = parser.source.slice(parser.tokenIndex, parser.index);
  return parser.currentChar !== 92 && parser.currentChar <= 126 ? getOwnProperty(descKeywordTable, parser.tokenValue) ?? 208897 : scanIdentifierSlowCase(parser, context, 0, isValidAsKeyword);
}
function scanUnicodeIdentifier(parser, context) {
  const cookedChar = scanIdentifierUnicodeEscape(parser);
  if (!isIdentifierStart(cookedChar))
    parser.report(5);
  parser.tokenValue = String.fromCodePoint(cookedChar);
  return scanIdentifierSlowCase(parser, context, 1, CharTypes[cookedChar] & 4);
}
function scanIdentifierSlowCase(parser, context, hasEscape, isValidAsKeyword) {
  let start = parser.index;
  while (parser.index < parser.end) {
    if (parser.currentChar === 92) {
      parser.tokenValue += parser.source.slice(start, parser.index);
      hasEscape = 1;
      const code = scanIdentifierUnicodeEscape(parser);
      if (!isIdentifierPart(code))
        parser.report(5);
      isValidAsKeyword = isValidAsKeyword && CharTypes[code] & 4;
      parser.tokenValue += String.fromCodePoint(code);
      start = parser.index;
    } else {
      const merged = consumePossibleSurrogatePair(parser);
      if (merged > 0) {
        if (!isIdentifierPart(merged)) {
          parser.report(20, String.fromCodePoint(merged));
        }
        parser.currentChar = merged;
        parser.index++;
        parser.column++;
      } else if (!isIdentifierPart(parser.currentChar)) {
        break;
      }
      advanceChar(parser);
    }
  }
  if (parser.index <= parser.end) {
    parser.tokenValue += parser.source.slice(start, parser.index);
  }
  const { length } = parser.tokenValue;
  if (isValidAsKeyword && length >= 2 && length <= 11) {
    const token = getOwnProperty(descKeywordTable, parser.tokenValue);
    if (token === void 0)
      return 208897 | (hasEscape ? -2147483648 : 0);
    if (!hasEscape)
      return token;
    if (token === 209006) {
      if ((context & (2 | 2048)) === 0) {
        return token | -2147483648;
      }
      return -2147483528;
    }
    if (context & 1) {
      if (token === 36970) {
        return -2147483527;
      }
      if ((token & 36864) === 36864) {
        return -2147483527;
      }
      if ((token & 20480) === 20480) {
        if (context & 262144 && (context & 8) === 0) {
          return token | -2147483648;
        } else {
          return -2147483528;
        }
      }
      return 209018 | -2147483648;
    }
    if (context & 262144 && (context & 8) === 0 && (token & 20480) === 20480) {
      return token | -2147483648;
    }
    if (token === 241771) {
      return context & 262144 ? 209018 | -2147483648 : context & 1024 ? -2147483528 : token | -2147483648;
    }
    if (token === 209005) {
      return 209018 | -2147483648;
    }
    if ((token & 36864) === 36864) {
      return token | 12288 | -2147483648;
    }
    return -2147483528;
  }
  return 208897 | (hasEscape ? -2147483648 : 0);
}
function scanPrivateIdentifier(parser) {
  let char = advanceChar(parser);
  if (char === 92)
    return 130;
  const merged = consumePossibleSurrogatePair(parser);
  if (merged)
    char = merged;
  if (!isIdentifierStart(char))
    parser.report(96);
  return 130;
}
function scanIdentifierUnicodeEscape(parser) {
  if (parser.source.charCodeAt(parser.index + 1) !== 117) {
    parser.report(5);
  }
  parser.currentChar = parser.source.charCodeAt(parser.index += 2);
  parser.column += 2;
  return scanUnicodeEscape(parser);
}
function scanUnicodeEscape(parser) {
  let codePoint = 0;
  const char = parser.currentChar;
  if (char === 123) {
    const begin = parser.index - 2;
    while (CharTypes[advanceChar(parser)] & 64) {
      codePoint = codePoint << 4 | toHex(parser.currentChar);
      if (codePoint > 1114111)
        throw new ParseError({ index: begin, line: parser.line, column: parser.column }, parser.currentLocation, 104);
    }
    if (parser.currentChar !== 125) {
      throw new ParseError({ index: begin, line: parser.line, column: parser.column }, parser.currentLocation, 7);
    }
    advanceChar(parser);
    return codePoint;
  }
  if ((CharTypes[char] & 64) === 0)
    parser.report(7);
  const char2 = parser.source.charCodeAt(parser.index + 1);
  if ((CharTypes[char2] & 64) === 0)
    parser.report(7);
  const char3 = parser.source.charCodeAt(parser.index + 2);
  if ((CharTypes[char3] & 64) === 0)
    parser.report(7);
  const char4 = parser.source.charCodeAt(parser.index + 3);
  if ((CharTypes[char4] & 64) === 0)
    parser.report(7);
  codePoint = toHex(char) << 12 | toHex(char2) << 8 | toHex(char3) << 4 | toHex(char4);
  parser.currentChar = parser.source.charCodeAt(parser.index += 4);
  parser.column += 4;
  return codePoint;
}
const TokenLookup = [
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  127,
  135,
  127,
  127,
  129,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  128,
  127,
  16842798,
  134283267,
  130,
  208897,
  8391477,
  8390213,
  134283267,
  67174411,
  16,
  8391476,
  25233968,
  18,
  25233969,
  67108877,
  8457014,
  134283266,
  134283266,
  134283266,
  134283266,
  134283266,
  134283266,
  134283266,
  134283266,
  134283266,
  134283266,
  21,
  1074790417,
  8456256,
  1077936155,
  8390721,
  22,
  132,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  208897,
  69271571,
  136,
  20,
  8389959,
  208897,
  131,
  4096,
  4096,
  4096,
  4096,
  4096,
  4096,
  4096,
  208897,
  4096,
  208897,
  208897,
  4096,
  208897,
  4096,
  208897,
  4096,
  208897,
  4096,
  4096,
  4096,
  208897,
  4096,
  4096,
  208897,
  4096,
  4096,
  2162700,
  8389702,
  1074790415,
  16842799,
  128
];
function nextToken(parser, context) {
  parser.flags = (parser.flags | 1) ^ 1;
  parser.startIndex = parser.index;
  parser.startColumn = parser.column;
  parser.startLine = parser.line;
  parser.setToken(scanSingleToken(parser, context, 0));
}
function scanSingleToken(parser, context, state) {
  const isStartOfLine = parser.index === 0;
  const { source } = parser;
  let start = parser.currentLocation;
  while (parser.index < parser.end) {
    parser.tokenIndex = parser.index;
    parser.tokenColumn = parser.column;
    parser.tokenLine = parser.line;
    let char = parser.currentChar;
    if (char <= 126) {
      const token = TokenLookup[char];
      switch (token) {
        case 67174411:
        case 16:
        case 2162700:
        case 1074790415:
        case 69271571:
        case 20:
        case 21:
        case 1074790417:
        case 18:
        case 16842799:
        case 132:
        case 128:
          advanceChar(parser);
          return token;
        case 208897:
          return scanIdentifier(parser, context, 0);
        case 4096:
          return scanIdentifier(parser, context, 1);
        case 134283266:
          return scanNumber(parser, context, 16 | 128);
        case 134283267:
          return scanString(parser, context, char);
        case 131:
          return scanTemplate(parser, context);
        case 136:
          return scanUnicodeIdentifier(parser, context);
        case 130:
          return scanPrivateIdentifier(parser);
        case 127:
          advanceChar(parser);
          break;
        case 129:
          state |= 1 | 4;
          scanNewLine(parser);
          break;
        case 135:
          consumeLineFeed(parser, state);
          state = state & -5 | 1;
          break;
        case 8456256: {
          const ch = advanceChar(parser);
          if (parser.index < parser.end) {
            if (ch === 60) {
              if (parser.index < parser.end && advanceChar(parser) === 61) {
                advanceChar(parser);
                return 4194332;
              }
              return 8390978;
            } else if (ch === 61) {
              advanceChar(parser);
              return 8390718;
            }
            if (ch === 33) {
              const index = parser.index + 1;
              if (index + 1 < parser.end && source.charCodeAt(index) === 45 && source.charCodeAt(index + 1) == 45) {
                parser.column += 3;
                parser.currentChar = source.charCodeAt(parser.index += 3);
                state = skipSingleHTMLComment(parser, source, state, context, 2, parser.tokenStart);
                start = parser.tokenStart;
                continue;
              }
              return 8456256;
            }
          }
          return 8456256;
        }
        case 1077936155: {
          advanceChar(parser);
          const ch = parser.currentChar;
          if (ch === 61) {
            if (advanceChar(parser) === 61) {
              advanceChar(parser);
              return 8390458;
            }
            return 8390460;
          }
          if (ch === 62) {
            advanceChar(parser);
            return 10;
          }
          return 1077936155;
        }
        case 16842798:
          if (advanceChar(parser) !== 61) {
            return 16842798;
          }
          if (advanceChar(parser) !== 61) {
            return 8390461;
          }
          advanceChar(parser);
          return 8390459;
        case 8391477:
          if (advanceChar(parser) !== 61)
            return 8391477;
          advanceChar(parser);
          return 4194340;
        case 8391476: {
          advanceChar(parser);
          if (parser.index >= parser.end)
            return 8391476;
          const ch = parser.currentChar;
          if (ch === 61) {
            advanceChar(parser);
            return 4194338;
          }
          if (ch !== 42)
            return 8391476;
          if (advanceChar(parser) !== 61)
            return 8391735;
          advanceChar(parser);
          return 4194335;
        }
        case 8389959:
          if (advanceChar(parser) !== 61)
            return 8389959;
          advanceChar(parser);
          return 4194341;
        case 25233968: {
          advanceChar(parser);
          const ch = parser.currentChar;
          if (ch === 43) {
            advanceChar(parser);
            return 33619993;
          }
          if (ch === 61) {
            advanceChar(parser);
            return 4194336;
          }
          return 25233968;
        }
        case 25233969: {
          advanceChar(parser);
          const ch = parser.currentChar;
          if (ch === 45) {
            advanceChar(parser);
            if ((state & 1 || isStartOfLine) && parser.currentChar === 62) {
              if (!parser.options.webcompat)
                parser.report(112);
              advanceChar(parser);
              state = skipSingleHTMLComment(parser, source, state, context, 3, start);
              start = parser.tokenStart;
              continue;
            }
            return 33619994;
          }
          if (ch === 61) {
            advanceChar(parser);
            return 4194337;
          }
          return 25233969;
        }
        case 8457014: {
          advanceChar(parser);
          if (parser.index < parser.end) {
            const ch = parser.currentChar;
            if (ch === 47) {
              advanceChar(parser);
              state = skipSingleLineComment(parser, source, state, 0, parser.tokenStart);
              start = parser.tokenStart;
              continue;
            }
            if (ch === 42) {
              advanceChar(parser);
              state = skipMultiLineComment(parser, source, state);
              start = parser.tokenStart;
              continue;
            }
            if (context & 32) {
              return scanRegularExpression(parser);
            }
            if (ch === 61) {
              advanceChar(parser);
              return 4259875;
            }
          }
          return 8457014;
        }
        case 67108877: {
          const next = advanceChar(parser);
          if (next >= 48 && next <= 57)
            return scanNumber(parser, context, 64 | 16);
          if (next === 46) {
            const index = parser.index + 1;
            if (index < parser.end && source.charCodeAt(index) === 46) {
              parser.column += 2;
              parser.currentChar = source.charCodeAt(parser.index += 2);
              return 14;
            }
          }
          return 67108877;
        }
        case 8389702: {
          advanceChar(parser);
          const ch = parser.currentChar;
          if (ch === 124) {
            advanceChar(parser);
            if (parser.currentChar === 61) {
              advanceChar(parser);
              return 4194344;
            }
            return 8913465;
          }
          if (ch === 61) {
            advanceChar(parser);
            return 4194342;
          }
          return 8389702;
        }
        case 8390721: {
          advanceChar(parser);
          const ch = parser.currentChar;
          if (ch === 61) {
            advanceChar(parser);
            return 8390719;
          }
          if (ch !== 62)
            return 8390721;
          advanceChar(parser);
          if (parser.index < parser.end) {
            const ch2 = parser.currentChar;
            if (ch2 === 62) {
              if (advanceChar(parser) === 61) {
                advanceChar(parser);
                return 4194334;
              }
              return 8390980;
            }
            if (ch2 === 61) {
              advanceChar(parser);
              return 4194333;
            }
          }
          return 8390979;
        }
        case 8390213: {
          advanceChar(parser);
          const ch = parser.currentChar;
          if (ch === 38) {
            advanceChar(parser);
            if (parser.currentChar === 61) {
              advanceChar(parser);
              return 4194345;
            }
            return 8913720;
          }
          if (ch === 61) {
            advanceChar(parser);
            return 4194343;
          }
          return 8390213;
        }
        case 22: {
          let ch = advanceChar(parser);
          if (ch === 63) {
            advanceChar(parser);
            if (parser.currentChar === 61) {
              advanceChar(parser);
              return 4194346;
            }
            return 276824445;
          }
          if (ch === 46) {
            const index = parser.index + 1;
            if (index < parser.end) {
              ch = source.charCodeAt(index);
              if (!(ch >= 48 && ch <= 57)) {
                advanceChar(parser);
                return 67108990;
              }
            }
          }
          return 22;
        }
      }
    } else {
      if ((char ^ 8232) <= 1) {
        state = state & -5 | 1;
        scanNewLine(parser);
        continue;
      }
      const merged = consumePossibleSurrogatePair(parser);
      if (merged > 0)
        char = merged;
      if (isIDStart(char)) {
        parser.tokenValue = "";
        return scanIdentifierSlowCase(parser, context, 0, 0);
      }
      if (isExoticECMAScriptWhitespace(char)) {
        advanceChar(parser);
        continue;
      }
      parser.report(20, String.fromCodePoint(char));
    }
  }
  return 1048576;
}
const entities = {
  AElig: "Æ",
  AMP: "&",
  Aacute: "Á",
  Abreve: "Ă",
  Acirc: "Â",
  Acy: "А",
  Afr: "𝔄",
  Agrave: "À",
  Alpha: "Α",
  Amacr: "Ā",
  And: "⩓",
  Aogon: "Ą",
  Aopf: "𝔸",
  ApplyFunction: "⁡",
  Aring: "Å",
  Ascr: "𝒜",
  Assign: "≔",
  Atilde: "Ã",
  Auml: "Ä",
  Backslash: "∖",
  Barv: "⫧",
  Barwed: "⌆",
  Bcy: "Б",
  Because: "∵",
  Bernoullis: "ℬ",
  Beta: "Β",
  Bfr: "𝔅",
  Bopf: "𝔹",
  Breve: "˘",
  Bscr: "ℬ",
  Bumpeq: "≎",
  CHcy: "Ч",
  COPY: "©",
  Cacute: "Ć",
  Cap: "⋒",
  CapitalDifferentialD: "ⅅ",
  Cayleys: "ℭ",
  Ccaron: "Č",
  Ccedil: "Ç",
  Ccirc: "Ĉ",
  Cconint: "∰",
  Cdot: "Ċ",
  Cedilla: "¸",
  CenterDot: "·",
  Cfr: "ℭ",
  Chi: "Χ",
  CircleDot: "⊙",
  CircleMinus: "⊖",
  CirclePlus: "⊕",
  CircleTimes: "⊗",
  ClockwiseContourIntegral: "∲",
  CloseCurlyDoubleQuote: "”",
  CloseCurlyQuote: "’",
  Colon: "∷",
  Colone: "⩴",
  Congruent: "≡",
  Conint: "∯",
  ContourIntegral: "∮",
  Copf: "ℂ",
  Coproduct: "∐",
  CounterClockwiseContourIntegral: "∳",
  Cross: "⨯",
  Cscr: "𝒞",
  Cup: "⋓",
  CupCap: "≍",
  DD: "ⅅ",
  DDotrahd: "⤑",
  DJcy: "Ђ",
  DScy: "Ѕ",
  DZcy: "Џ",
  Dagger: "‡",
  Darr: "↡",
  Dashv: "⫤",
  Dcaron: "Ď",
  Dcy: "Д",
  Del: "∇",
  Delta: "Δ",
  Dfr: "𝔇",
  DiacriticalAcute: "´",
  DiacriticalDot: "˙",
  DiacriticalDoubleAcute: "˝",
  DiacriticalGrave: "`",
  DiacriticalTilde: "˜",
  Diamond: "⋄",
  DifferentialD: "ⅆ",
  Dopf: "𝔻",
  Dot: "¨",
  DotDot: "⃜",
  DotEqual: "≐",
  DoubleContourIntegral: "∯",
  DoubleDot: "¨",
  DoubleDownArrow: "⇓",
  DoubleLeftArrow: "⇐",
  DoubleLeftRightArrow: "⇔",
  DoubleLeftTee: "⫤",
  DoubleLongLeftArrow: "⟸",
  DoubleLongLeftRightArrow: "⟺",
  DoubleLongRightArrow: "⟹",
  DoubleRightArrow: "⇒",
  DoubleRightTee: "⊨",
  DoubleUpArrow: "⇑",
  DoubleUpDownArrow: "⇕",
  DoubleVerticalBar: "∥",
  DownArrow: "↓",
  DownArrowBar: "⤓",
  DownArrowUpArrow: "⇵",
  DownBreve: "̑",
  DownLeftRightVector: "⥐",
  DownLeftTeeVector: "⥞",
  DownLeftVector: "↽",
  DownLeftVectorBar: "⥖",
  DownRightTeeVector: "⥟",
  DownRightVector: "⇁",
  DownRightVectorBar: "⥗",
  DownTee: "⊤",
  DownTeeArrow: "↧",
  Downarrow: "⇓",
  Dscr: "𝒟",
  Dstrok: "Đ",
  ENG: "Ŋ",
  ETH: "Ð",
  Eacute: "É",
  Ecaron: "Ě",
  Ecirc: "Ê",
  Ecy: "Э",
  Edot: "Ė",
  Efr: "𝔈",
  Egrave: "È",
  Element: "∈",
  Emacr: "Ē",
  EmptySmallSquare: "◻",
  EmptyVerySmallSquare: "▫",
  Eogon: "Ę",
  Eopf: "𝔼",
  Epsilon: "Ε",
  Equal: "⩵",
  EqualTilde: "≂",
  Equilibrium: "⇌",
  Escr: "ℰ",
  Esim: "⩳",
  Eta: "Η",
  Euml: "Ë",
  Exists: "∃",
  ExponentialE: "ⅇ",
  Fcy: "Ф",
  Ffr: "𝔉",
  FilledSmallSquare: "◼",
  FilledVerySmallSquare: "▪",
  Fopf: "𝔽",
  ForAll: "∀",
  Fouriertrf: "ℱ",
  Fscr: "ℱ",
  GJcy: "Ѓ",
  GT: ">",
  Gamma: "Γ",
  Gammad: "Ϝ",
  Gbreve: "Ğ",
  Gcedil: "Ģ",
  Gcirc: "Ĝ",
  Gcy: "Г",
  Gdot: "Ġ",
  Gfr: "𝔊",
  Gg: "⋙",
  Gopf: "𝔾",
  GreaterEqual: "≥",
  GreaterEqualLess: "⋛",
  GreaterFullEqual: "≧",
  GreaterGreater: "⪢",
  GreaterLess: "≷",
  GreaterSlantEqual: "⩾",
  GreaterTilde: "≳",
  Gscr: "𝒢",
  Gt: "≫",
  HARDcy: "Ъ",
  Hacek: "ˇ",
  Hat: "^",
  Hcirc: "Ĥ",
  Hfr: "ℌ",
  HilbertSpace: "ℋ",
  Hopf: "ℍ",
  HorizontalLine: "─",
  Hscr: "ℋ",
  Hstrok: "Ħ",
  HumpDownHump: "≎",
  HumpEqual: "≏",
  IEcy: "Е",
  IJlig: "Ĳ",
  IOcy: "Ё",
  Iacute: "Í",
  Icirc: "Î",
  Icy: "И",
  Idot: "İ",
  Ifr: "ℑ",
  Igrave: "Ì",
  Im: "ℑ",
  Imacr: "Ī",
  ImaginaryI: "ⅈ",
  Implies: "⇒",
  Int: "∬",
  Integral: "∫",
  Intersection: "⋂",
  InvisibleComma: "⁣",
  InvisibleTimes: "⁢",
  Iogon: "Į",
  Iopf: "𝕀",
  Iota: "Ι",
  Iscr: "ℐ",
  Itilde: "Ĩ",
  Iukcy: "І",
  Iuml: "Ï",
  Jcirc: "Ĵ",
  Jcy: "Й",
  Jfr: "𝔍",
  Jopf: "𝕁",
  Jscr: "𝒥",
  Jsercy: "Ј",
  Jukcy: "Є",
  KHcy: "Х",
  KJcy: "Ќ",
  Kappa: "Κ",
  Kcedil: "Ķ",
  Kcy: "К",
  Kfr: "𝔎",
  Kopf: "𝕂",
  Kscr: "𝒦",
  LJcy: "Љ",
  LT: "<",
  Lacute: "Ĺ",
  Lambda: "Λ",
  Lang: "⟪",
  Laplacetrf: "ℒ",
  Larr: "↞",
  Lcaron: "Ľ",
  Lcedil: "Ļ",
  Lcy: "Л",
  LeftAngleBracket: "⟨",
  LeftArrow: "←",
  LeftArrowBar: "⇤",
  LeftArrowRightArrow: "⇆",
  LeftCeiling: "⌈",
  LeftDoubleBracket: "⟦",
  LeftDownTeeVector: "⥡",
  LeftDownVector: "⇃",
  LeftDownVectorBar: "⥙",
  LeftFloor: "⌊",
  LeftRightArrow: "↔",
  LeftRightVector: "⥎",
  LeftTee: "⊣",
  LeftTeeArrow: "↤",
  LeftTeeVector: "⥚",
  LeftTriangle: "⊲",
  LeftTriangleBar: "⧏",
  LeftTriangleEqual: "⊴",
  LeftUpDownVector: "⥑",
  LeftUpTeeVector: "⥠",
  LeftUpVector: "↿",
  LeftUpVectorBar: "⥘",
  LeftVector: "↼",
  LeftVectorBar: "⥒",
  Leftarrow: "⇐",
  Leftrightarrow: "⇔",
  LessEqualGreater: "⋚",
  LessFullEqual: "≦",
  LessGreater: "≶",
  LessLess: "⪡",
  LessSlantEqual: "⩽",
  LessTilde: "≲",
  Lfr: "𝔏",
  Ll: "⋘",
  Lleftarrow: "⇚",
  Lmidot: "Ŀ",
  LongLeftArrow: "⟵",
  LongLeftRightArrow: "⟷",
  LongRightArrow: "⟶",
  Longleftarrow: "⟸",
  Longleftrightarrow: "⟺",
  Longrightarrow: "⟹",
  Lopf: "𝕃",
  LowerLeftArrow: "↙",
  LowerRightArrow: "↘",
  Lscr: "ℒ",
  Lsh: "↰",
  Lstrok: "Ł",
  Lt: "≪",
  Map: "⤅",
  Mcy: "М",
  MediumSpace: " ",
  Mellintrf: "ℳ",
  Mfr: "𝔐",
  MinusPlus: "∓",
  Mopf: "𝕄",
  Mscr: "ℳ",
  Mu: "Μ",
  NJcy: "Њ",
  Nacute: "Ń",
  Ncaron: "Ň",
  Ncedil: "Ņ",
  Ncy: "Н",
  NegativeMediumSpace: "​",
  NegativeThickSpace: "​",
  NegativeThinSpace: "​",
  NegativeVeryThinSpace: "​",
  NestedGreaterGreater: "≫",
  NestedLessLess: "≪",
  NewLine: "\n",
  Nfr: "𝔑",
  NoBreak: "⁠",
  NonBreakingSpace: " ",
  Nopf: "ℕ",
  Not: "⫬",
  NotCongruent: "≢",
  NotCupCap: "≭",
  NotDoubleVerticalBar: "∦",
  NotElement: "∉",
  NotEqual: "≠",
  NotEqualTilde: "≂̸",
  NotExists: "∄",
  NotGreater: "≯",
  NotGreaterEqual: "≱",
  NotGreaterFullEqual: "≧̸",
  NotGreaterGreater: "≫̸",
  NotGreaterLess: "≹",
  NotGreaterSlantEqual: "⩾̸",
  NotGreaterTilde: "≵",
  NotHumpDownHump: "≎̸",
  NotHumpEqual: "≏̸",
  NotLeftTriangle: "⋪",
  NotLeftTriangleBar: "⧏̸",
  NotLeftTriangleEqual: "⋬",
  NotLess: "≮",
  NotLessEqual: "≰",
  NotLessGreater: "≸",
  NotLessLess: "≪̸",
  NotLessSlantEqual: "⩽̸",
  NotLessTilde: "≴",
  NotNestedGreaterGreater: "⪢̸",
  NotNestedLessLess: "⪡̸",
  NotPrecedes: "⊀",
  NotPrecedesEqual: "⪯̸",
  NotPrecedesSlantEqual: "⋠",
  NotReverseElement: "∌",
  NotRightTriangle: "⋫",
  NotRightTriangleBar: "⧐̸",
  NotRightTriangleEqual: "⋭",
  NotSquareSubset: "⊏̸",
  NotSquareSubsetEqual: "⋢",
  NotSquareSuperset: "⊐̸",
  NotSquareSupersetEqual: "⋣",
  NotSubset: "⊂⃒",
  NotSubsetEqual: "⊈",
  NotSucceeds: "⊁",
  NotSucceedsEqual: "⪰̸",
  NotSucceedsSlantEqual: "⋡",
  NotSucceedsTilde: "≿̸",
  NotSuperset: "⊃⃒",
  NotSupersetEqual: "⊉",
  NotTilde: "≁",
  NotTildeEqual: "≄",
  NotTildeFullEqual: "≇",
  NotTildeTilde: "≉",
  NotVerticalBar: "∤",
  Nscr: "𝒩",
  Ntilde: "Ñ",
  Nu: "Ν",
  OElig: "Œ",
  Oacute: "Ó",
  Ocirc: "Ô",
  Ocy: "О",
  Odblac: "Ő",
  Ofr: "𝔒",
  Ograve: "Ò",
  Omacr: "Ō",
  Omega: "Ω",
  Omicron: "Ο",
  Oopf: "𝕆",
  OpenCurlyDoubleQuote: "“",
  OpenCurlyQuote: "‘",
  Or: "⩔",
  Oscr: "𝒪",
  Oslash: "Ø",
  Otilde: "Õ",
  Otimes: "⨷",
  Ouml: "Ö",
  OverBar: "‾",
  OverBrace: "⏞",
  OverBracket: "⎴",
  OverParenthesis: "⏜",
  PartialD: "∂",
  Pcy: "П",
  Pfr: "𝔓",
  Phi: "Φ",
  Pi: "Π",
  PlusMinus: "±",
  Poincareplane: "ℌ",
  Popf: "ℙ",
  Pr: "⪻",
  Precedes: "≺",
  PrecedesEqual: "⪯",
  PrecedesSlantEqual: "≼",
  PrecedesTilde: "≾",
  Prime: "″",
  Product: "∏",
  Proportion: "∷",
  Proportional: "∝",
  Pscr: "𝒫",
  Psi: "Ψ",
  QUOT: '"',
  Qfr: "𝔔",
  Qopf: "ℚ",
  Qscr: "𝒬",
  RBarr: "⤐",
  REG: "®",
  Racute: "Ŕ",
  Rang: "⟫",
  Rarr: "↠",
  Rarrtl: "⤖",
  Rcaron: "Ř",
  Rcedil: "Ŗ",
  Rcy: "Р",
  Re: "ℜ",
  ReverseElement: "∋",
  ReverseEquilibrium: "⇋",
  ReverseUpEquilibrium: "⥯",
  Rfr: "ℜ",
  Rho: "Ρ",
  RightAngleBracket: "⟩",
  RightArrow: "→",
  RightArrowBar: "⇥",
  RightArrowLeftArrow: "⇄",
  RightCeiling: "⌉",
  RightDoubleBracket: "⟧",
  RightDownTeeVector: "⥝",
  RightDownVector: "⇂",
  RightDownVectorBar: "⥕",
  RightFloor: "⌋",
  RightTee: "⊢",
  RightTeeArrow: "↦",
  RightTeeVector: "⥛",
  RightTriangle: "⊳",
  RightTriangleBar: "⧐",
  RightTriangleEqual: "⊵",
  RightUpDownVector: "⥏",
  RightUpTeeVector: "⥜",
  RightUpVector: "↾",
  RightUpVectorBar: "⥔",
  RightVector: "⇀",
  RightVectorBar: "⥓",
  Rightarrow: "⇒",
  Ropf: "ℝ",
  RoundImplies: "⥰",
  Rrightarrow: "⇛",
  Rscr: "ℛ",
  Rsh: "↱",
  RuleDelayed: "⧴",
  SHCHcy: "Щ",
  SHcy: "Ш",
  SOFTcy: "Ь",
  Sacute: "Ś",
  Sc: "⪼",
  Scaron: "Š",
  Scedil: "Ş",
  Scirc: "Ŝ",
  Scy: "С",
  Sfr: "𝔖",
  ShortDownArrow: "↓",
  ShortLeftArrow: "←",
  ShortRightArrow: "→",
  ShortUpArrow: "↑",
  Sigma: "Σ",
  SmallCircle: "∘",
  Sopf: "𝕊",
  Sqrt: "√",
  Square: "□",
  SquareIntersection: "⊓",
  SquareSubset: "⊏",
  SquareSubsetEqual: "⊑",
  SquareSuperset: "⊐",
  SquareSupersetEqual: "⊒",
  SquareUnion: "⊔",
  Sscr: "𝒮",
  Star: "⋆",
  Sub: "⋐",
  Subset: "⋐",
  SubsetEqual: "⊆",
  Succeeds: "≻",
  SucceedsEqual: "⪰",
  SucceedsSlantEqual: "≽",
  SucceedsTilde: "≿",
  SuchThat: "∋",
  Sum: "∑",
  Sup: "⋑",
  Superset: "⊃",
  SupersetEqual: "⊇",
  Supset: "⋑",
  THORN: "Þ",
  TRADE: "™",
  TSHcy: "Ћ",
  TScy: "Ц",
  Tab: "	",
  Tau: "Τ",
  Tcaron: "Ť",
  Tcedil: "Ţ",
  Tcy: "Т",
  Tfr: "𝔗",
  Therefore: "∴",
  Theta: "Θ",
  ThickSpace: "  ",
  ThinSpace: " ",
  Tilde: "∼",
  TildeEqual: "≃",
  TildeFullEqual: "≅",
  TildeTilde: "≈",
  Topf: "𝕋",
  TripleDot: "⃛",
  Tscr: "𝒯",
  Tstrok: "Ŧ",
  Uacute: "Ú",
  Uarr: "↟",
  Uarrocir: "⥉",
  Ubrcy: "Ў",
  Ubreve: "Ŭ",
  Ucirc: "Û",
  Ucy: "У",
  Udblac: "Ű",
  Ufr: "𝔘",
  Ugrave: "Ù",
  Umacr: "Ū",
  UnderBar: "_",
  UnderBrace: "⏟",
  UnderBracket: "⎵",
  UnderParenthesis: "⏝",
  Union: "⋃",
  UnionPlus: "⊎",
  Uogon: "Ų",
  Uopf: "𝕌",
  UpArrow: "↑",
  UpArrowBar: "⤒",
  UpArrowDownArrow: "⇅",
  UpDownArrow: "↕",
  UpEquilibrium: "⥮",
  UpTee: "⊥",
  UpTeeArrow: "↥",
  Uparrow: "⇑",
  Updownarrow: "⇕",
  UpperLeftArrow: "↖",
  UpperRightArrow: "↗",
  Upsi: "ϒ",
  Upsilon: "Υ",
  Uring: "Ů",
  Uscr: "𝒰",
  Utilde: "Ũ",
  Uuml: "Ü",
  VDash: "⊫",
  Vbar: "⫫",
  Vcy: "В",
  Vdash: "⊩",
  Vdashl: "⫦",
  Vee: "⋁",
  Verbar: "‖",
  Vert: "‖",
  VerticalBar: "∣",
  VerticalLine: "|",
  VerticalSeparator: "❘",
  VerticalTilde: "≀",
  VeryThinSpace: " ",
  Vfr: "𝔙",
  Vopf: "𝕍",
  Vscr: "𝒱",
  Vvdash: "⊪",
  Wcirc: "Ŵ",
  Wedge: "⋀",
  Wfr: "𝔚",
  Wopf: "𝕎",
  Wscr: "𝒲",
  Xfr: "𝔛",
  Xi: "Ξ",
  Xopf: "𝕏",
  Xscr: "𝒳",
  YAcy: "Я",
  YIcy: "Ї",
  YUcy: "Ю",
  Yacute: "Ý",
  Ycirc: "Ŷ",
  Ycy: "Ы",
  Yfr: "𝔜",
  Yopf: "𝕐",
  Yscr: "𝒴",
  Yuml: "Ÿ",
  ZHcy: "Ж",
  Zacute: "Ź",
  Zcaron: "Ž",
  Zcy: "З",
  Zdot: "Ż",
  ZeroWidthSpace: "​",
  Zeta: "Ζ",
  Zfr: "ℨ",
  Zopf: "ℤ",
  Zscr: "𝒵",
  aacute: "á",
  abreve: "ă",
  ac: "∾",
  acE: "∾̳",
  acd: "∿",
  acirc: "â",
  acute: "´",
  acy: "а",
  aelig: "æ",
  af: "⁡",
  afr: "𝔞",
  agrave: "à",
  alefsym: "ℵ",
  aleph: "ℵ",
  alpha: "α",
  amacr: "ā",
  amalg: "⨿",
  amp: "&",
  and: "∧",
  andand: "⩕",
  andd: "⩜",
  andslope: "⩘",
  andv: "⩚",
  ang: "∠",
  ange: "⦤",
  angle: "∠",
  angmsd: "∡",
  angmsdaa: "⦨",
  angmsdab: "⦩",
  angmsdac: "⦪",
  angmsdad: "⦫",
  angmsdae: "⦬",
  angmsdaf: "⦭",
  angmsdag: "⦮",
  angmsdah: "⦯",
  angrt: "∟",
  angrtvb: "⊾",
  angrtvbd: "⦝",
  angsph: "∢",
  angst: "Å",
  angzarr: "⍼",
  aogon: "ą",
  aopf: "𝕒",
  ap: "≈",
  apE: "⩰",
  apacir: "⩯",
  ape: "≊",
  apid: "≋",
  apos: "'",
  approx: "≈",
  approxeq: "≊",
  aring: "å",
  ascr: "𝒶",
  ast: "*",
  asymp: "≈",
  asympeq: "≍",
  atilde: "ã",
  auml: "ä",
  awconint: "∳",
  awint: "⨑",
  bNot: "⫭",
  backcong: "≌",
  backepsilon: "϶",
  backprime: "‵",
  backsim: "∽",
  backsimeq: "⋍",
  barvee: "⊽",
  barwed: "⌅",
  barwedge: "⌅",
  bbrk: "⎵",
  bbrktbrk: "⎶",
  bcong: "≌",
  bcy: "б",
  bdquo: "„",
  becaus: "∵",
  because: "∵",
  bemptyv: "⦰",
  bepsi: "϶",
  bernou: "ℬ",
  beta: "β",
  beth: "ℶ",
  between: "≬",
  bfr: "𝔟",
  bigcap: "⋂",
  bigcirc: "◯",
  bigcup: "⋃",
  bigodot: "⨀",
  bigoplus: "⨁",
  bigotimes: "⨂",
  bigsqcup: "⨆",
  bigstar: "★",
  bigtriangledown: "▽",
  bigtriangleup: "△",
  biguplus: "⨄",
  bigvee: "⋁",
  bigwedge: "⋀",
  bkarow: "⤍",
  blacklozenge: "⧫",
  blacksquare: "▪",
  blacktriangle: "▴",
  blacktriangledown: "▾",
  blacktriangleleft: "◂",
  blacktriangleright: "▸",
  blank: "␣",
  blk12: "▒",
  blk14: "░",
  blk34: "▓",
  block: "█",
  bne: "=⃥",
  bnequiv: "≡⃥",
  bnot: "⌐",
  bopf: "𝕓",
  bot: "⊥",
  bottom: "⊥",
  bowtie: "⋈",
  boxDL: "╗",
  boxDR: "╔",
  boxDl: "╖",
  boxDr: "╓",
  boxH: "═",
  boxHD: "╦",
  boxHU: "╩",
  boxHd: "╤",
  boxHu: "╧",
  boxUL: "╝",
  boxUR: "╚",
  boxUl: "╜",
  boxUr: "╙",
  boxV: "║",
  boxVH: "╬",
  boxVL: "╣",
  boxVR: "╠",
  boxVh: "╫",
  boxVl: "╢",
  boxVr: "╟",
  boxbox: "⧉",
  boxdL: "╕",
  boxdR: "╒",
  boxdl: "┐",
  boxdr: "┌",
  boxh: "─",
  boxhD: "╥",
  boxhU: "╨",
  boxhd: "┬",
  boxhu: "┴",
  boxminus: "⊟",
  boxplus: "⊞",
  boxtimes: "⊠",
  boxuL: "╛",
  boxuR: "╘",
  boxul: "┘",
  boxur: "└",
  boxv: "│",
  boxvH: "╪",
  boxvL: "╡",
  boxvR: "╞",
  boxvh: "┼",
  boxvl: "┤",
  boxvr: "├",
  bprime: "‵",
  breve: "˘",
  brvbar: "¦",
  bscr: "𝒷",
  bsemi: "⁏",
  bsim: "∽",
  bsime: "⋍",
  bsol: "\\",
  bsolb: "⧅",
  bsolhsub: "⟈",
  bull: "•",
  bullet: "•",
  bump: "≎",
  bumpE: "⪮",
  bumpe: "≏",
  bumpeq: "≏",
  cacute: "ć",
  cap: "∩",
  capand: "⩄",
  capbrcup: "⩉",
  capcap: "⩋",
  capcup: "⩇",
  capdot: "⩀",
  caps: "∩︀",
  caret: "⁁",
  caron: "ˇ",
  ccaps: "⩍",
  ccaron: "č",
  ccedil: "ç",
  ccirc: "ĉ",
  ccups: "⩌",
  ccupssm: "⩐",
  cdot: "ċ",
  cedil: "¸",
  cemptyv: "⦲",
  cent: "¢",
  centerdot: "·",
  cfr: "𝔠",
  chcy: "ч",
  check: "✓",
  checkmark: "✓",
  chi: "χ",
  cir: "○",
  cirE: "⧃",
  circ: "ˆ",
  circeq: "≗",
  circlearrowleft: "↺",
  circlearrowright: "↻",
  circledR: "®",
  circledS: "Ⓢ",
  circledast: "⊛",
  circledcirc: "⊚",
  circleddash: "⊝",
  cire: "≗",
  cirfnint: "⨐",
  cirmid: "⫯",
  cirscir: "⧂",
  clubs: "♣",
  clubsuit: "♣",
  colon: ":",
  colone: "≔",
  coloneq: "≔",
  comma: ",",
  commat: "@",
  comp: "∁",
  compfn: "∘",
  complement: "∁",
  complexes: "ℂ",
  cong: "≅",
  congdot: "⩭",
  conint: "∮",
  copf: "𝕔",
  coprod: "∐",
  copy: "©",
  copysr: "℗",
  crarr: "↵",
  cross: "✗",
  cscr: "𝒸",
  csub: "⫏",
  csube: "⫑",
  csup: "⫐",
  csupe: "⫒",
  ctdot: "⋯",
  cudarrl: "⤸",
  cudarrr: "⤵",
  cuepr: "⋞",
  cuesc: "⋟",
  cularr: "↶",
  cularrp: "⤽",
  cup: "∪",
  cupbrcap: "⩈",
  cupcap: "⩆",
  cupcup: "⩊",
  cupdot: "⊍",
  cupor: "⩅",
  cups: "∪︀",
  curarr: "↷",
  curarrm: "⤼",
  curlyeqprec: "⋞",
  curlyeqsucc: "⋟",
  curlyvee: "⋎",
  curlywedge: "⋏",
  curren: "¤",
  curvearrowleft: "↶",
  curvearrowright: "↷",
  cuvee: "⋎",
  cuwed: "⋏",
  cwconint: "∲",
  cwint: "∱",
  cylcty: "⌭",
  dArr: "⇓",
  dHar: "⥥",
  dagger: "†",
  daleth: "ℸ",
  darr: "↓",
  dash: "‐",
  dashv: "⊣",
  dbkarow: "⤏",
  dblac: "˝",
  dcaron: "ď",
  dcy: "д",
  dd: "ⅆ",
  ddagger: "‡",
  ddarr: "⇊",
  ddotseq: "⩷",
  deg: "°",
  delta: "δ",
  demptyv: "⦱",
  dfisht: "⥿",
  dfr: "𝔡",
  dharl: "⇃",
  dharr: "⇂",
  diam: "⋄",
  diamond: "⋄",
  diamondsuit: "♦",
  diams: "♦",
  die: "¨",
  digamma: "ϝ",
  disin: "⋲",
  div: "÷",
  divide: "÷",
  divideontimes: "⋇",
  divonx: "⋇",
  djcy: "ђ",
  dlcorn: "⌞",
  dlcrop: "⌍",
  dollar: "$",
  dopf: "𝕕",
  dot: "˙",
  doteq: "≐",
  doteqdot: "≑",
  dotminus: "∸",
  dotplus: "∔",
  dotsquare: "⊡",
  doublebarwedge: "⌆",
  downarrow: "↓",
  downdownarrows: "⇊",
  downharpoonleft: "⇃",
  downharpoonright: "⇂",
  drbkarow: "⤐",
  drcorn: "⌟",
  drcrop: "⌌",
  dscr: "𝒹",
  dscy: "ѕ",
  dsol: "⧶",
  dstrok: "đ",
  dtdot: "⋱",
  dtri: "▿",
  dtrif: "▾",
  duarr: "⇵",
  duhar: "⥯",
  dwangle: "⦦",
  dzcy: "џ",
  dzigrarr: "⟿",
  eDDot: "⩷",
  eDot: "≑",
  eacute: "é",
  easter: "⩮",
  ecaron: "ě",
  ecir: "≖",
  ecirc: "ê",
  ecolon: "≕",
  ecy: "э",
  edot: "ė",
  ee: "ⅇ",
  efDot: "≒",
  efr: "𝔢",
  eg: "⪚",
  egrave: "è",
  egs: "⪖",
  egsdot: "⪘",
  el: "⪙",
  elinters: "⏧",
  ell: "ℓ",
  els: "⪕",
  elsdot: "⪗",
  emacr: "ē",
  empty: "∅",
  emptyset: "∅",
  emptyv: "∅",
  emsp13: " ",
  emsp14: " ",
  emsp: " ",
  eng: "ŋ",
  ensp: " ",
  eogon: "ę",
  eopf: "𝕖",
  epar: "⋕",
  eparsl: "⧣",
  eplus: "⩱",
  epsi: "ε",
  epsilon: "ε",
  epsiv: "ϵ",
  eqcirc: "≖",
  eqcolon: "≕",
  eqsim: "≂",
  eqslantgtr: "⪖",
  eqslantless: "⪕",
  equals: "=",
  equest: "≟",
  equiv: "≡",
  equivDD: "⩸",
  eqvparsl: "⧥",
  erDot: "≓",
  erarr: "⥱",
  escr: "ℯ",
  esdot: "≐",
  esim: "≂",
  eta: "η",
  eth: "ð",
  euml: "ë",
  euro: "€",
  excl: "!",
  exist: "∃",
  expectation: "ℰ",
  exponentiale: "ⅇ",
  fallingdotseq: "≒",
  fcy: "ф",
  female: "♀",
  ffilig: "ﬃ",
  fflig: "ﬀ",
  ffllig: "ﬄ",
  ffr: "𝔣",
  filig: "ﬁ",
  fjlig: "fj",
  flat: "♭",
  fllig: "ﬂ",
  fltns: "▱",
  fnof: "ƒ",
  fopf: "𝕗",
  forall: "∀",
  fork: "⋔",
  forkv: "⫙",
  fpartint: "⨍",
  frac12: "½",
  frac13: "⅓",
  frac14: "¼",
  frac15: "⅕",
  frac16: "⅙",
  frac18: "⅛",
  frac23: "⅔",
  frac25: "⅖",
  frac34: "¾",
  frac35: "⅗",
  frac38: "⅜",
  frac45: "⅘",
  frac56: "⅚",
  frac58: "⅝",
  frac78: "⅞",
  frasl: "⁄",
  frown: "⌢",
  fscr: "𝒻",
  gE: "≧",
  gEl: "⪌",
  gacute: "ǵ",
  gamma: "γ",
  gammad: "ϝ",
  gap: "⪆",
  gbreve: "ğ",
  gcirc: "ĝ",
  gcy: "г",
  gdot: "ġ",
  ge: "≥",
  gel: "⋛",
  geq: "≥",
  geqq: "≧",
  geqslant: "⩾",
  ges: "⩾",
  gescc: "⪩",
  gesdot: "⪀",
  gesdoto: "⪂",
  gesdotol: "⪄",
  gesl: "⋛︀",
  gesles: "⪔",
  gfr: "𝔤",
  gg: "≫",
  ggg: "⋙",
  gimel: "ℷ",
  gjcy: "ѓ",
  gl: "≷",
  glE: "⪒",
  gla: "⪥",
  glj: "⪤",
  gnE: "≩",
  gnap: "⪊",
  gnapprox: "⪊",
  gne: "⪈",
  gneq: "⪈",
  gneqq: "≩",
  gnsim: "⋧",
  gopf: "𝕘",
  grave: "`",
  gscr: "ℊ",
  gsim: "≳",
  gsime: "⪎",
  gsiml: "⪐",
  gt: ">",
  gtcc: "⪧",
  gtcir: "⩺",
  gtdot: "⋗",
  gtlPar: "⦕",
  gtquest: "⩼",
  gtrapprox: "⪆",
  gtrarr: "⥸",
  gtrdot: "⋗",
  gtreqless: "⋛",
  gtreqqless: "⪌",
  gtrless: "≷",
  gtrsim: "≳",
  gvertneqq: "≩︀",
  gvnE: "≩︀",
  hArr: "⇔",
  hairsp: " ",
  half: "½",
  hamilt: "ℋ",
  hardcy: "ъ",
  harr: "↔",
  harrcir: "⥈",
  harrw: "↭",
  hbar: "ℏ",
  hcirc: "ĥ",
  hearts: "♥",
  heartsuit: "♥",
  hellip: "…",
  hercon: "⊹",
  hfr: "𝔥",
  hksearow: "⤥",
  hkswarow: "⤦",
  hoarr: "⇿",
  homtht: "∻",
  hookleftarrow: "↩",
  hookrightarrow: "↪",
  hopf: "𝕙",
  horbar: "―",
  hscr: "𝒽",
  hslash: "ℏ",
  hstrok: "ħ",
  hybull: "⁃",
  hyphen: "‐",
  iacute: "í",
  ic: "⁣",
  icirc: "î",
  icy: "и",
  iecy: "е",
  iexcl: "¡",
  iff: "⇔",
  ifr: "𝔦",
  igrave: "ì",
  ii: "ⅈ",
  iiiint: "⨌",
  iiint: "∭",
  iinfin: "⧜",
  iiota: "℩",
  ijlig: "ĳ",
  imacr: "ī",
  image: "ℑ",
  imagline: "ℐ",
  imagpart: "ℑ",
  imath: "ı",
  imof: "⊷",
  imped: "Ƶ",
  in: "∈",
  incare: "℅",
  infin: "∞",
  infintie: "⧝",
  inodot: "ı",
  int: "∫",
  intcal: "⊺",
  integers: "ℤ",
  intercal: "⊺",
  intlarhk: "⨗",
  intprod: "⨼",
  iocy: "ё",
  iogon: "į",
  iopf: "𝕚",
  iota: "ι",
  iprod: "⨼",
  iquest: "¿",
  iscr: "𝒾",
  isin: "∈",
  isinE: "⋹",
  isindot: "⋵",
  isins: "⋴",
  isinsv: "⋳",
  isinv: "∈",
  it: "⁢",
  itilde: "ĩ",
  iukcy: "і",
  iuml: "ï",
  jcirc: "ĵ",
  jcy: "й",
  jfr: "𝔧",
  jmath: "ȷ",
  jopf: "𝕛",
  jscr: "𝒿",
  jsercy: "ј",
  jukcy: "є",
  kappa: "κ",
  kappav: "ϰ",
  kcedil: "ķ",
  kcy: "к",
  kfr: "𝔨",
  kgreen: "ĸ",
  khcy: "х",
  kjcy: "ќ",
  kopf: "𝕜",
  kscr: "𝓀",
  lAarr: "⇚",
  lArr: "⇐",
  lAtail: "⤛",
  lBarr: "⤎",
  lE: "≦",
  lEg: "⪋",
  lHar: "⥢",
  lacute: "ĺ",
  laemptyv: "⦴",
  lagran: "ℒ",
  lambda: "λ",
  lang: "⟨",
  langd: "⦑",
  langle: "⟨",
  lap: "⪅",
  laquo: "«",
  larr: "←",
  larrb: "⇤",
  larrbfs: "⤟",
  larrfs: "⤝",
  larrhk: "↩",
  larrlp: "↫",
  larrpl: "⤹",
  larrsim: "⥳",
  larrtl: "↢",
  lat: "⪫",
  latail: "⤙",
  late: "⪭",
  lates: "⪭︀",
  lbarr: "⤌",
  lbbrk: "❲",
  lbrace: "{",
  lbrack: "[",
  lbrke: "⦋",
  lbrksld: "⦏",
  lbrkslu: "⦍",
  lcaron: "ľ",
  lcedil: "ļ",
  lceil: "⌈",
  lcub: "{",
  lcy: "л",
  ldca: "⤶",
  ldquo: "“",
  ldquor: "„",
  ldrdhar: "⥧",
  ldrushar: "⥋",
  ldsh: "↲",
  le: "≤",
  leftarrow: "←",
  leftarrowtail: "↢",
  leftharpoondown: "↽",
  leftharpoonup: "↼",
  leftleftarrows: "⇇",
  leftrightarrow: "↔",
  leftrightarrows: "⇆",
  leftrightharpoons: "⇋",
  leftrightsquigarrow: "↭",
  leftthreetimes: "⋋",
  leg: "⋚",
  leq: "≤",
  leqq: "≦",
  leqslant: "⩽",
  les: "⩽",
  lescc: "⪨",
  lesdot: "⩿",
  lesdoto: "⪁",
  lesdotor: "⪃",
  lesg: "⋚︀",
  lesges: "⪓",
  lessapprox: "⪅",
  lessdot: "⋖",
  lesseqgtr: "⋚",
  lesseqqgtr: "⪋",
  lessgtr: "≶",
  lesssim: "≲",
  lfisht: "⥼",
  lfloor: "⌊",
  lfr: "𝔩",
  lg: "≶",
  lgE: "⪑",
  lhard: "↽",
  lharu: "↼",
  lharul: "⥪",
  lhblk: "▄",
  ljcy: "љ",
  ll: "≪",
  llarr: "⇇",
  llcorner: "⌞",
  llhard: "⥫",
  lltri: "◺",
  lmidot: "ŀ",
  lmoust: "⎰",
  lmoustache: "⎰",
  lnE: "≨",
  lnap: "⪉",
  lnapprox: "⪉",
  lne: "⪇",
  lneq: "⪇",
  lneqq: "≨",
  lnsim: "⋦",
  loang: "⟬",
  loarr: "⇽",
  lobrk: "⟦",
  longleftarrow: "⟵",
  longleftrightarrow: "⟷",
  longmapsto: "⟼",
  longrightarrow: "⟶",
  looparrowleft: "↫",
  looparrowright: "↬",
  lopar: "⦅",
  lopf: "𝕝",
  loplus: "⨭",
  lotimes: "⨴",
  lowast: "∗",
  lowbar: "_",
  loz: "◊",
  lozenge: "◊",
  lozf: "⧫",
  lpar: "(",
  lparlt: "⦓",
  lrarr: "⇆",
  lrcorner: "⌟",
  lrhar: "⇋",
  lrhard: "⥭",
  lrm: "‎",
  lrtri: "⊿",
  lsaquo: "‹",
  lscr: "𝓁",
  lsh: "↰",
  lsim: "≲",
  lsime: "⪍",
  lsimg: "⪏",
  lsqb: "[",
  lsquo: "‘",
  lsquor: "‚",
  lstrok: "ł",
  lt: "<",
  ltcc: "⪦",
  ltcir: "⩹",
  ltdot: "⋖",
  lthree: "⋋",
  ltimes: "⋉",
  ltlarr: "⥶",
  ltquest: "⩻",
  ltrPar: "⦖",
  ltri: "◃",
  ltrie: "⊴",
  ltrif: "◂",
  lurdshar: "⥊",
  luruhar: "⥦",
  lvertneqq: "≨︀",
  lvnE: "≨︀",
  mDDot: "∺",
  macr: "¯",
  male: "♂",
  malt: "✠",
  maltese: "✠",
  map: "↦",
  mapsto: "↦",
  mapstodown: "↧",
  mapstoleft: "↤",
  mapstoup: "↥",
  marker: "▮",
  mcomma: "⨩",
  mcy: "м",
  mdash: "—",
  measuredangle: "∡",
  mfr: "𝔪",
  mho: "℧",
  micro: "µ",
  mid: "∣",
  midast: "*",
  midcir: "⫰",
  middot: "·",
  minus: "−",
  minusb: "⊟",
  minusd: "∸",
  minusdu: "⨪",
  mlcp: "⫛",
  mldr: "…",
  mnplus: "∓",
  models: "⊧",
  mopf: "𝕞",
  mp: "∓",
  mscr: "𝓂",
  mstpos: "∾",
  mu: "μ",
  multimap: "⊸",
  mumap: "⊸",
  nGg: "⋙̸",
  nGt: "≫⃒",
  nGtv: "≫̸",
  nLeftarrow: "⇍",
  nLeftrightarrow: "⇎",
  nLl: "⋘̸",
  nLt: "≪⃒",
  nLtv: "≪̸",
  nRightarrow: "⇏",
  nVDash: "⊯",
  nVdash: "⊮",
  nabla: "∇",
  nacute: "ń",
  nang: "∠⃒",
  nap: "≉",
  napE: "⩰̸",
  napid: "≋̸",
  napos: "ŉ",
  napprox: "≉",
  natur: "♮",
  natural: "♮",
  naturals: "ℕ",
  nbsp: " ",
  nbump: "≎̸",
  nbumpe: "≏̸",
  ncap: "⩃",
  ncaron: "ň",
  ncedil: "ņ",
  ncong: "≇",
  ncongdot: "⩭̸",
  ncup: "⩂",
  ncy: "н",
  ndash: "–",
  ne: "≠",
  neArr: "⇗",
  nearhk: "⤤",
  nearr: "↗",
  nearrow: "↗",
  nedot: "≐̸",
  nequiv: "≢",
  nesear: "⤨",
  nesim: "≂̸",
  nexist: "∄",
  nexists: "∄",
  nfr: "𝔫",
  ngE: "≧̸",
  nge: "≱",
  ngeq: "≱",
  ngeqq: "≧̸",
  ngeqslant: "⩾̸",
  nges: "⩾̸",
  ngsim: "≵",
  ngt: "≯",
  ngtr: "≯",
  nhArr: "⇎",
  nharr: "↮",
  nhpar: "⫲",
  ni: "∋",
  nis: "⋼",
  nisd: "⋺",
  niv: "∋",
  njcy: "њ",
  nlArr: "⇍",
  nlE: "≦̸",
  nlarr: "↚",
  nldr: "‥",
  nle: "≰",
  nleftarrow: "↚",
  nleftrightarrow: "↮",
  nleq: "≰",
  nleqq: "≦̸",
  nleqslant: "⩽̸",
  nles: "⩽̸",
  nless: "≮",
  nlsim: "≴",
  nlt: "≮",
  nltri: "⋪",
  nltrie: "⋬",
  nmid: "∤",
  nopf: "𝕟",
  not: "¬",
  notin: "∉",
  notinE: "⋹̸",
  notindot: "⋵̸",
  notinva: "∉",
  notinvb: "⋷",
  notinvc: "⋶",
  notni: "∌",
  notniva: "∌",
  notnivb: "⋾",
  notnivc: "⋽",
  npar: "∦",
  nparallel: "∦",
  nparsl: "⫽⃥",
  npart: "∂̸",
  npolint: "⨔",
  npr: "⊀",
  nprcue: "⋠",
  npre: "⪯̸",
  nprec: "⊀",
  npreceq: "⪯̸",
  nrArr: "⇏",
  nrarr: "↛",
  nrarrc: "⤳̸",
  nrarrw: "↝̸",
  nrightarrow: "↛",
  nrtri: "⋫",
  nrtrie: "⋭",
  nsc: "⊁",
  nsccue: "⋡",
  nsce: "⪰̸",
  nscr: "𝓃",
  nshortmid: "∤",
  nshortparallel: "∦",
  nsim: "≁",
  nsime: "≄",
  nsimeq: "≄",
  nsmid: "∤",
  nspar: "∦",
  nsqsube: "⋢",
  nsqsupe: "⋣",
  nsub: "⊄",
  nsubE: "⫅̸",
  nsube: "⊈",
  nsubset: "⊂⃒",
  nsubseteq: "⊈",
  nsubseteqq: "⫅̸",
  nsucc: "⊁",
  nsucceq: "⪰̸",
  nsup: "⊅",
  nsupE: "⫆̸",
  nsupe: "⊉",
  nsupset: "⊃⃒",
  nsupseteq: "⊉",
  nsupseteqq: "⫆̸",
  ntgl: "≹",
  ntilde: "ñ",
  ntlg: "≸",
  ntriangleleft: "⋪",
  ntrianglelefteq: "⋬",
  ntriangleright: "⋫",
  ntrianglerighteq: "⋭",
  nu: "ν",
  num: "#",
  numero: "№",
  numsp: " ",
  nvDash: "⊭",
  nvHarr: "⤄",
  nvap: "≍⃒",
  nvdash: "⊬",
  nvge: "≥⃒",
  nvgt: ">⃒",
  nvinfin: "⧞",
  nvlArr: "⤂",
  nvle: "≤⃒",
  nvlt: "<⃒",
  nvltrie: "⊴⃒",
  nvrArr: "⤃",
  nvrtrie: "⊵⃒",
  nvsim: "∼⃒",
  nwArr: "⇖",
  nwarhk: "⤣",
  nwarr: "↖",
  nwarrow: "↖",
  nwnear: "⤧",
  oS: "Ⓢ",
  oacute: "ó",
  oast: "⊛",
  ocir: "⊚",
  ocirc: "ô",
  ocy: "о",
  odash: "⊝",
  odblac: "ő",
  odiv: "⨸",
  odot: "⊙",
  odsold: "⦼",
  oelig: "œ",
  ofcir: "⦿",
  ofr: "𝔬",
  ogon: "˛",
  ograve: "ò",
  ogt: "⧁",
  ohbar: "⦵",
  ohm: "Ω",
  oint: "∮",
  olarr: "↺",
  olcir: "⦾",
  olcross: "⦻",
  oline: "‾",
  olt: "⧀",
  omacr: "ō",
  omega: "ω",
  omicron: "ο",
  omid: "⦶",
  ominus: "⊖",
  oopf: "𝕠",
  opar: "⦷",
  operp: "⦹",
  oplus: "⊕",
  or: "∨",
  orarr: "↻",
  ord: "⩝",
  order: "ℴ",
  orderof: "ℴ",
  ordf: "ª",
  ordm: "º",
  origof: "⊶",
  oror: "⩖",
  orslope: "⩗",
  orv: "⩛",
  oscr: "ℴ",
  oslash: "ø",
  osol: "⊘",
  otilde: "õ",
  otimes: "⊗",
  otimesas: "⨶",
  ouml: "ö",
  ovbar: "⌽",
  par: "∥",
  para: "¶",
  parallel: "∥",
  parsim: "⫳",
  parsl: "⫽",
  part: "∂",
  pcy: "п",
  percnt: "%",
  period: ".",
  permil: "‰",
  perp: "⊥",
  pertenk: "‱",
  pfr: "𝔭",
  phi: "φ",
  phiv: "ϕ",
  phmmat: "ℳ",
  phone: "☎",
  pi: "π",
  pitchfork: "⋔",
  piv: "ϖ",
  planck: "ℏ",
  planckh: "ℎ",
  plankv: "ℏ",
  plus: "+",
  plusacir: "⨣",
  plusb: "⊞",
  pluscir: "⨢",
  plusdo: "∔",
  plusdu: "⨥",
  pluse: "⩲",
  plusmn: "±",
  plussim: "⨦",
  plustwo: "⨧",
  pm: "±",
  pointint: "⨕",
  popf: "𝕡",
  pound: "£",
  pr: "≺",
  prE: "⪳",
  prap: "⪷",
  prcue: "≼",
  pre: "⪯",
  prec: "≺",
  precapprox: "⪷",
  preccurlyeq: "≼",
  preceq: "⪯",
  precnapprox: "⪹",
  precneqq: "⪵",
  precnsim: "⋨",
  precsim: "≾",
  prime: "′",
  primes: "ℙ",
  prnE: "⪵",
  prnap: "⪹",
  prnsim: "⋨",
  prod: "∏",
  profalar: "⌮",
  profline: "⌒",
  profsurf: "⌓",
  prop: "∝",
  propto: "∝",
  prsim: "≾",
  prurel: "⊰",
  pscr: "𝓅",
  psi: "ψ",
  puncsp: " ",
  qfr: "𝔮",
  qint: "⨌",
  qopf: "𝕢",
  qprime: "⁗",
  qscr: "𝓆",
  quaternions: "ℍ",
  quatint: "⨖",
  quest: "?",
  questeq: "≟",
  quot: '"',
  rAarr: "⇛",
  rArr: "⇒",
  rAtail: "⤜",
  rBarr: "⤏",
  rHar: "⥤",
  race: "∽̱",
  racute: "ŕ",
  radic: "√",
  raemptyv: "⦳",
  rang: "⟩",
  rangd: "⦒",
  range: "⦥",
  rangle: "⟩",
  raquo: "»",
  rarr: "→",
  rarrap: "⥵",
  rarrb: "⇥",
  rarrbfs: "⤠",
  rarrc: "⤳",
  rarrfs: "⤞",
  rarrhk: "↪",
  rarrlp: "↬",
  rarrpl: "⥅",
  rarrsim: "⥴",
  rarrtl: "↣",
  rarrw: "↝",
  ratail: "⤚",
  ratio: "∶",
  rationals: "ℚ",
  rbarr: "⤍",
  rbbrk: "❳",
  rbrace: "}",
  rbrack: "]",
  rbrke: "⦌",
  rbrksld: "⦎",
  rbrkslu: "⦐",
  rcaron: "ř",
  rcedil: "ŗ",
  rceil: "⌉",
  rcub: "}",
  rcy: "р",
  rdca: "⤷",
  rdldhar: "⥩",
  rdquo: "”",
  rdquor: "”",
  rdsh: "↳",
  real: "ℜ",
  realine: "ℛ",
  realpart: "ℜ",
  reals: "ℝ",
  rect: "▭",
  reg: "®",
  rfisht: "⥽",
  rfloor: "⌋",
  rfr: "𝔯",
  rhard: "⇁",
  rharu: "⇀",
  rharul: "⥬",
  rho: "ρ",
  rhov: "ϱ",
  rightarrow: "→",
  rightarrowtail: "↣",
  rightharpoondown: "⇁",
  rightharpoonup: "⇀",
  rightleftarrows: "⇄",
  rightleftharpoons: "⇌",
  rightrightarrows: "⇉",
  rightsquigarrow: "↝",
  rightthreetimes: "⋌",
  ring: "˚",
  risingdotseq: "≓",
  rlarr: "⇄",
  rlhar: "⇌",
  rlm: "‏",
  rmoust: "⎱",
  rmoustache: "⎱",
  rnmid: "⫮",
  roang: "⟭",
  roarr: "⇾",
  robrk: "⟧",
  ropar: "⦆",
  ropf: "𝕣",
  roplus: "⨮",
  rotimes: "⨵",
  rpar: ")",
  rpargt: "⦔",
  rppolint: "⨒",
  rrarr: "⇉",
  rsaquo: "›",
  rscr: "𝓇",
  rsh: "↱",
  rsqb: "]",
  rsquo: "’",
  rsquor: "’",
  rthree: "⋌",
  rtimes: "⋊",
  rtri: "▹",
  rtrie: "⊵",
  rtrif: "▸",
  rtriltri: "⧎",
  ruluhar: "⥨",
  rx: "℞",
  sacute: "ś",
  sbquo: "‚",
  sc: "≻",
  scE: "⪴",
  scap: "⪸",
  scaron: "š",
  sccue: "≽",
  sce: "⪰",
  scedil: "ş",
  scirc: "ŝ",
  scnE: "⪶",
  scnap: "⪺",
  scnsim: "⋩",
  scpolint: "⨓",
  scsim: "≿",
  scy: "с",
  sdot: "⋅",
  sdotb: "⊡",
  sdote: "⩦",
  seArr: "⇘",
  searhk: "⤥",
  searr: "↘",
  searrow: "↘",
  sect: "§",
  semi: ";",
  seswar: "⤩",
  setminus: "∖",
  setmn: "∖",
  sext: "✶",
  sfr: "𝔰",
  sfrown: "⌢",
  sharp: "♯",
  shchcy: "щ",
  shcy: "ш",
  shortmid: "∣",
  shortparallel: "∥",
  shy: "­",
  sigma: "σ",
  sigmaf: "ς",
  sigmav: "ς",
  sim: "∼",
  simdot: "⩪",
  sime: "≃",
  simeq: "≃",
  simg: "⪞",
  simgE: "⪠",
  siml: "⪝",
  simlE: "⪟",
  simne: "≆",
  simplus: "⨤",
  simrarr: "⥲",
  slarr: "←",
  smallsetminus: "∖",
  smashp: "⨳",
  smeparsl: "⧤",
  smid: "∣",
  smile: "⌣",
  smt: "⪪",
  smte: "⪬",
  smtes: "⪬︀",
  softcy: "ь",
  sol: "/",
  solb: "⧄",
  solbar: "⌿",
  sopf: "𝕤",
  spades: "♠",
  spadesuit: "♠",
  spar: "∥",
  sqcap: "⊓",
  sqcaps: "⊓︀",
  sqcup: "⊔",
  sqcups: "⊔︀",
  sqsub: "⊏",
  sqsube: "⊑",
  sqsubset: "⊏",
  sqsubseteq: "⊑",
  sqsup: "⊐",
  sqsupe: "⊒",
  sqsupset: "⊐",
  sqsupseteq: "⊒",
  squ: "□",
  square: "□",
  squarf: "▪",
  squf: "▪",
  srarr: "→",
  sscr: "𝓈",
  ssetmn: "∖",
  ssmile: "⌣",
  sstarf: "⋆",
  star: "☆",
  starf: "★",
  straightepsilon: "ϵ",
  straightphi: "ϕ",
  strns: "¯",
  sub: "⊂",
  subE: "⫅",
  subdot: "⪽",
  sube: "⊆",
  subedot: "⫃",
  submult: "⫁",
  subnE: "⫋",
  subne: "⊊",
  subplus: "⪿",
  subrarr: "⥹",
  subset: "⊂",
  subseteq: "⊆",
  subseteqq: "⫅",
  subsetneq: "⊊",
  subsetneqq: "⫋",
  subsim: "⫇",
  subsub: "⫕",
  subsup: "⫓",
  succ: "≻",
  succapprox: "⪸",
  succcurlyeq: "≽",
  succeq: "⪰",
  succnapprox: "⪺",
  succneqq: "⪶",
  succnsim: "⋩",
  succsim: "≿",
  sum: "∑",
  sung: "♪",
  sup1: "¹",
  sup2: "²",
  sup3: "³",
  sup: "⊃",
  supE: "⫆",
  supdot: "⪾",
  supdsub: "⫘",
  supe: "⊇",
  supedot: "⫄",
  suphsol: "⟉",
  suphsub: "⫗",
  suplarr: "⥻",
  supmult: "⫂",
  supnE: "⫌",
  supne: "⊋",
  supplus: "⫀",
  supset: "⊃",
  supseteq: "⊇",
  supseteqq: "⫆",
  supsetneq: "⊋",
  supsetneqq: "⫌",
  supsim: "⫈",
  supsub: "⫔",
  supsup: "⫖",
  swArr: "⇙",
  swarhk: "⤦",
  swarr: "↙",
  swarrow: "↙",
  swnwar: "⤪",
  szlig: "ß",
  target: "⌖",
  tau: "τ",
  tbrk: "⎴",
  tcaron: "ť",
  tcedil: "ţ",
  tcy: "т",
  tdot: "⃛",
  telrec: "⌕",
  tfr: "𝔱",
  there4: "∴",
  therefore: "∴",
  theta: "θ",
  thetasym: "ϑ",
  thetav: "ϑ",
  thickapprox: "≈",
  thicksim: "∼",
  thinsp: " ",
  thkap: "≈",
  thksim: "∼",
  thorn: "þ",
  tilde: "˜",
  times: "×",
  timesb: "⊠",
  timesbar: "⨱",
  timesd: "⨰",
  tint: "∭",
  toea: "⤨",
  top: "⊤",
  topbot: "⌶",
  topcir: "⫱",
  topf: "𝕥",
  topfork: "⫚",
  tosa: "⤩",
  tprime: "‴",
  trade: "™",
  triangle: "▵",
  triangledown: "▿",
  triangleleft: "◃",
  trianglelefteq: "⊴",
  triangleq: "≜",
  triangleright: "▹",
  trianglerighteq: "⊵",
  tridot: "◬",
  trie: "≜",
  triminus: "⨺",
  triplus: "⨹",
  trisb: "⧍",
  tritime: "⨻",
  trpezium: "⏢",
  tscr: "𝓉",
  tscy: "ц",
  tshcy: "ћ",
  tstrok: "ŧ",
  twixt: "≬",
  twoheadleftarrow: "↞",
  twoheadrightarrow: "↠",
  uArr: "⇑",
  uHar: "⥣",
  uacute: "ú",
  uarr: "↑",
  ubrcy: "ў",
  ubreve: "ŭ",
  ucirc: "û",
  ucy: "у",
  udarr: "⇅",
  udblac: "ű",
  udhar: "⥮",
  ufisht: "⥾",
  ufr: "𝔲",
  ugrave: "ù",
  uharl: "↿",
  uharr: "↾",
  uhblk: "▀",
  ulcorn: "⌜",
  ulcorner: "⌜",
  ulcrop: "⌏",
  ultri: "◸",
  umacr: "ū",
  uml: "¨",
  uogon: "ų",
  uopf: "𝕦",
  uparrow: "↑",
  updownarrow: "↕",
  upharpoonleft: "↿",
  upharpoonright: "↾",
  uplus: "⊎",
  upsi: "υ",
  upsih: "ϒ",
  upsilon: "υ",
  upuparrows: "⇈",
  urcorn: "⌝",
  urcorner: "⌝",
  urcrop: "⌎",
  uring: "ů",
  urtri: "◹",
  uscr: "𝓊",
  utdot: "⋰",
  utilde: "ũ",
  utri: "▵",
  utrif: "▴",
  uuarr: "⇈",
  uuml: "ü",
  uwangle: "⦧",
  vArr: "⇕",
  vBar: "⫨",
  vBarv: "⫩",
  vDash: "⊨",
  vangrt: "⦜",
  varepsilon: "ϵ",
  varkappa: "ϰ",
  varnothing: "∅",
  varphi: "ϕ",
  varpi: "ϖ",
  varpropto: "∝",
  varr: "↕",
  varrho: "ϱ",
  varsigma: "ς",
  varsubsetneq: "⊊︀",
  varsubsetneqq: "⫋︀",
  varsupsetneq: "⊋︀",
  varsupsetneqq: "⫌︀",
  vartheta: "ϑ",
  vartriangleleft: "⊲",
  vartriangleright: "⊳",
  vcy: "в",
  vdash: "⊢",
  vee: "∨",
  veebar: "⊻",
  veeeq: "≚",
  vellip: "⋮",
  verbar: "|",
  vert: "|",
  vfr: "𝔳",
  vltri: "⊲",
  vnsub: "⊂⃒",
  vnsup: "⊃⃒",
  vopf: "𝕧",
  vprop: "∝",
  vrtri: "⊳",
  vscr: "𝓋",
  vsubnE: "⫋︀",
  vsubne: "⊊︀",
  vsupnE: "⫌︀",
  vsupne: "⊋︀",
  vzigzag: "⦚",
  wcirc: "ŵ",
  wedbar: "⩟",
  wedge: "∧",
  wedgeq: "≙",
  weierp: "℘",
  wfr: "𝔴",
  wopf: "𝕨",
  wp: "℘",
  wr: "≀",
  wreath: "≀",
  wscr: "𝓌",
  xcap: "⋂",
  xcirc: "◯",
  xcup: "⋃",
  xdtri: "▽",
  xfr: "𝔵",
  xhArr: "⟺",
  xharr: "⟷",
  xi: "ξ",
  xlArr: "⟸",
  xlarr: "⟵",
  xmap: "⟼",
  xnis: "⋻",
  xodot: "⨀",
  xopf: "𝕩",
  xoplus: "⨁",
  xotime: "⨂",
  xrArr: "⟹",
  xrarr: "⟶",
  xscr: "𝓍",
  xsqcup: "⨆",
  xuplus: "⨄",
  xutri: "△",
  xvee: "⋁",
  xwedge: "⋀",
  yacute: "ý",
  yacy: "я",
  ycirc: "ŷ",
  ycy: "ы",
  yen: "¥",
  yfr: "𝔶",
  yicy: "ї",
  yopf: "𝕪",
  yscr: "𝓎",
  yucy: "ю",
  yuml: "ÿ",
  zacute: "ź",
  zcaron: "ž",
  zcy: "з",
  zdot: "ż",
  zeetrf: "ℨ",
  zeta: "ζ",
  zfr: "𝔷",
  zhcy: "ж",
  zigrarr: "⇝",
  zopf: "𝕫",
  zscr: "𝓏",
  zwj: "‍",
  zwnj: "‌"
};
const decodeMap = {
  "0": 65533,
  "128": 8364,
  "130": 8218,
  "131": 402,
  "132": 8222,
  "133": 8230,
  "134": 8224,
  "135": 8225,
  "136": 710,
  "137": 8240,
  "138": 352,
  "139": 8249,
  "140": 338,
  "142": 381,
  "145": 8216,
  "146": 8217,
  "147": 8220,
  "148": 8221,
  "149": 8226,
  "150": 8211,
  "151": 8212,
  "152": 732,
  "153": 8482,
  "154": 353,
  "155": 8250,
  "156": 339,
  "158": 382,
  "159": 376
};
function decodeHTMLStrict(text) {
  return text.replace(/&(?:[a-zA-Z]+|#[xX][\da-fA-F]+|#\d+);/g, (key) => {
    if (key.charAt(1) === "#") {
      const secondChar = key.charAt(2);
      const codePoint = secondChar === "X" || secondChar === "x" ? parseInt(key.slice(3), 16) : parseInt(key.slice(2), 10);
      return decodeCodePoint(codePoint);
    }
    return getOwnProperty(entities, key.slice(1, -1)) ?? key;
  });
}
function decodeCodePoint(codePoint) {
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return "�";
  }
  return String.fromCodePoint(getOwnProperty(decodeMap, codePoint) ?? codePoint);
}
function scanJSXAttributeValue(parser, context) {
  parser.startIndex = parser.tokenIndex = parser.index;
  parser.startColumn = parser.tokenColumn = parser.column;
  parser.startLine = parser.tokenLine = parser.line;
  parser.setToken(CharTypes[parser.currentChar] & 8192 ? scanJSXString(parser) : scanSingleToken(parser, context, 0));
  return parser.getToken();
}
function scanJSXString(parser) {
  const quote = parser.currentChar;
  let char = advanceChar(parser);
  const start = parser.index;
  while (char !== quote) {
    if (parser.index >= parser.end)
      parser.report(16);
    char = advanceChar(parser);
  }
  if (char !== quote)
    parser.report(16);
  parser.tokenValue = parser.source.slice(start, parser.index);
  advanceChar(parser);
  if (parser.options.raw)
    parser.tokenRaw = parser.source.slice(parser.tokenIndex, parser.index);
  return 134283267;
}
function nextJSXToken(parser) {
  parser.startIndex = parser.tokenIndex = parser.index;
  parser.startColumn = parser.tokenColumn = parser.column;
  parser.startLine = parser.tokenLine = parser.line;
  if (parser.index >= parser.end) {
    parser.setToken(1048576);
    return;
  }
  if (parser.currentChar === 60) {
    advanceChar(parser);
    parser.setToken(8456256);
    return;
  }
  if (parser.currentChar === 123) {
    advanceChar(parser);
    parser.setToken(2162700);
    return;
  }
  let state = 0;
  while (parser.index < parser.end) {
    const type = CharTypes[parser.source.charCodeAt(parser.index)];
    if (type & 1024) {
      state |= 1 | 4;
      scanNewLine(parser);
    } else if (type & 2048) {
      consumeLineFeed(parser, state);
      state = state & -5 | 1;
    } else {
      advanceChar(parser);
    }
    if (CharTypes[parser.currentChar] & 16384)
      break;
  }
  if (parser.tokenIndex === parser.index)
    parser.report(0);
  const raw = parser.source.slice(parser.tokenIndex, parser.index);
  if (parser.options.raw)
    parser.tokenRaw = raw;
  parser.tokenValue = decodeHTMLStrict(raw);
  parser.setToken(137);
}
function rescanJSXIdentifier(parser) {
  if ((parser.getToken() & 143360) === 143360) {
    const { index } = parser;
    let char = parser.currentChar;
    while (CharTypes[char] & (32768 | 2)) {
      char = advanceChar(parser);
    }
    parser.tokenValue += parser.source.slice(index, parser.index);
    parser.setToken(208897, true);
  }
  return parser.getToken();
}
class Scope {
  parser;
  type;
  parent;
  scopeError;
  variableBindings = /* @__PURE__ */ new Map();
  constructor(parser, type = 2, parent) {
    this.parser = parser;
    this.type = type;
    this.parent = parent;
  }
  createChildScope(type) {
    return new Scope(this.parser, type, this);
  }
  addVarOrBlock(context, name, kind, origin) {
    if (kind & 4) {
      this.addVarName(context, name, kind);
    } else {
      this.addBlockName(context, name, kind, origin);
    }
    if (origin & 64) {
      this.parser.declareUnboundVariable(name);
    }
  }
  addVarName(context, name, kind) {
    const { parser } = this;
    let currentScope = this;
    while (currentScope && (currentScope.type & 128) === 0) {
      const { variableBindings } = currentScope;
      const value = variableBindings.get(name);
      if (value && value & 248) {
        if (parser.options.webcompat && (context & 1) === 0 && (kind & 128 && value & 68 || value & 128 && kind & 68)) ;
        else {
          parser.report(145, name);
        }
      }
      if (currentScope === this) {
        if (value && value & 1 && kind & 1) {
          currentScope.recordScopeError(145, name);
        }
      }
      if (value && (value & 256 || value & 512 && !parser.options.webcompat)) {
        parser.report(145, name);
      }
      currentScope.variableBindings.set(name, kind);
      currentScope = currentScope.parent;
    }
  }
  hasVariable(name) {
    return this.variableBindings.has(name);
  }
  addBlockName(context, name, kind, origin) {
    const { parser } = this;
    const value = this.variableBindings.get(name);
    if (value && (value & 2) === 0) {
      if (kind & 1) {
        this.recordScopeError(145, name);
      } else if (parser.options.webcompat && (context & 1) === 0 && origin & 2 && value === 64 && kind === 64) ;
      else {
        parser.report(145, name);
      }
    }
    if (this.type & 64 && this.parent?.hasVariable(name) && (this.parent.variableBindings.get(name) & 2) === 0) {
      parser.report(145, name);
    }
    if (this.type & 512 && value && (value & 2) === 0) {
      if (kind & 1) {
        this.recordScopeError(145, name);
      }
    }
    if (this.type & 32) {
      if (this.parent.variableBindings.get(name) & 768)
        parser.report(159, name);
    }
    this.variableBindings.set(name, kind);
  }
  recordScopeError(type, ...params) {
    this.scopeError = {
      type,
      params,
      start: this.parser.tokenStart,
      end: this.parser.currentLocation
    };
  }
  reportScopeError() {
    const { scopeError } = this;
    if (!scopeError) {
      return;
    }
    throw new ParseError(scopeError.start, scopeError.end, scopeError.type, ...scopeError.params);
  }
}
function createArrowHeadParsingScope(parser, context, value) {
  const scope = parser.createScope().createChildScope(512);
  scope.addBlockName(context, value, 1, 0);
  return scope;
}
class PrivateScope {
  parser;
  parent;
  refs = /* @__PURE__ */ Object.create(null);
  privateIdentifiers = /* @__PURE__ */ new Map();
  constructor(parser, parent) {
    this.parser = parser;
    this.parent = parent;
  }
  addPrivateIdentifier(name, kind) {
    const { privateIdentifiers } = this;
    let focusKind = kind & (32 | 768);
    if (!(focusKind & 768))
      focusKind |= 768;
    const value = privateIdentifiers.get(name);
    if (this.hasPrivateIdentifier(name) && ((value & 32) !== (focusKind & 32) || value & focusKind & 768)) {
      this.parser.report(146, name);
    }
    privateIdentifiers.set(name, this.hasPrivateIdentifier(name) ? value | focusKind : focusKind);
  }
  addPrivateIdentifierRef(name) {
    this.refs[name] ??= [];
    this.refs[name].push(this.parser.tokenStart);
  }
  isPrivateIdentifierDefined(name) {
    return this.hasPrivateIdentifier(name) || Boolean(this.parent?.isPrivateIdentifierDefined(name));
  }
  validatePrivateIdentifierRefs() {
    for (const name in this.refs) {
      if (!this.isPrivateIdentifierDefined(name)) {
        const { index, line, column } = this.refs[name][0];
        throw new ParseError({ index, line, column }, { index: index + name.length, line, column: column + name.length }, 4, name);
      }
    }
  }
  hasPrivateIdentifier(name) {
    return this.privateIdentifiers.has(name);
  }
}
class Parser {
  source;
  options;
  lastOnToken = null;
  token = 1048576;
  flags = 0;
  index = 0;
  line = 1;
  column = 0;
  startIndex = 0;
  end = 0;
  tokenIndex = 0;
  startColumn = 0;
  tokenColumn = 0;
  tokenLine = 1;
  startLine = 1;
  tokenValue = "";
  tokenRaw = "";
  tokenRegExp = void 0;
  currentChar = 0;
  exportedNames = /* @__PURE__ */ new Set();
  exportedBindings = /* @__PURE__ */ new Set();
  assignable = 1;
  destructible = 0;
  leadingDecorators = { decorators: [] };
  constructor(source, options = {}) {
    this.source = source;
    this.options = options;
    this.end = source.length;
    this.currentChar = source.charCodeAt(0);
  }
  getToken() {
    return this.token;
  }
  setToken(value, replaceLast = false) {
    this.token = value;
    const { onToken } = this.options;
    if (onToken) {
      if (value !== 1048576) {
        const loc = {
          start: {
            line: this.tokenLine,
            column: this.tokenColumn
          },
          end: {
            line: this.line,
            column: this.column
          }
        };
        if (!replaceLast && this.lastOnToken) {
          onToken(...this.lastOnToken);
        }
        this.lastOnToken = [convertTokenType(value), this.tokenIndex, this.index, loc];
      } else {
        if (this.lastOnToken) {
          onToken(...this.lastOnToken);
          this.lastOnToken = null;
        }
      }
    }
    return value;
  }
  get tokenStart() {
    return {
      index: this.tokenIndex,
      line: this.tokenLine,
      column: this.tokenColumn
    };
  }
  get currentLocation() {
    return { index: this.index, line: this.line, column: this.column };
  }
  finishNode(node, start, end) {
    if (this.options.ranges) {
      node.start = start.index;
      const endIndex = end ? end.index : this.startIndex;
      node.end = endIndex;
      node.range = [start.index, endIndex];
    }
    if (this.options.loc) {
      node.loc = {
        start: {
          line: start.line,
          column: start.column
        },
        end: end ? { line: end.line, column: end.column } : { line: this.startLine, column: this.startColumn }
      };
      if (this.options.source) {
        node.loc.source = this.options.source;
      }
    }
    return node;
  }
  addBindingToExports(name) {
    this.exportedBindings.add(name);
  }
  declareUnboundVariable(name) {
    const { exportedNames } = this;
    if (exportedNames.has(name)) {
      this.report(147, name);
    }
    exportedNames.add(name);
  }
  report(type, ...params) {
    throw new ParseError(this.tokenStart, this.currentLocation, type, ...params);
  }
  createScopeIfLexical(type, parent) {
    if (this.options.lexical) {
      return this.createScope(type, parent);
    }
    return void 0;
  }
  createScope(type, parent) {
    return new Scope(this, type, parent);
  }
  createPrivateScopeIfLexical(parent) {
    if (this.options.lexical) {
      return new PrivateScope(this, parent);
    }
    return void 0;
  }
}
function pushComment(comments, options) {
  return function(type, value, start, end, loc) {
    const comment = {
      type,
      value
    };
    if (options.ranges) {
      comment.start = start;
      comment.end = end;
      comment.range = [start, end];
    }
    if (options.loc) {
      comment.loc = loc;
    }
    comments.push(comment);
  };
}
function pushToken(tokens, options) {
  return function(type, start, end, loc) {
    const token = {
      token: type
    };
    if (options.ranges) {
      token.start = start;
      token.end = end;
      token.range = [start, end];
    }
    if (options.loc) {
      token.loc = loc;
    }
    tokens.push(token);
  };
}
function normalizeOptions(rawOptions) {
  const options = { ...rawOptions };
  if (options.onComment) {
    options.onComment = Array.isArray(options.onComment) ? pushComment(options.onComment, options) : options.onComment;
  }
  if (options.onToken) {
    options.onToken = Array.isArray(options.onToken) ? pushToken(options.onToken, options) : options.onToken;
  }
  return options;
}
function parseSource(source, rawOptions = {}, context = 0) {
  const options = normalizeOptions(rawOptions);
  if (options.module)
    context |= 2 | 1;
  if (options.globalReturn)
    context |= 4096;
  if (options.impliedStrict)
    context |= 1;
  const parser = new Parser(source, options);
  skipHashBang(parser);
  const scope = parser.createScopeIfLexical();
  let body = [];
  let sourceType = "script";
  if (context & 2) {
    sourceType = "module";
    body = parseModuleItemList(parser, context | 8, scope);
    if (scope) {
      for (const name of parser.exportedBindings) {
        if (!scope.hasVariable(name))
          parser.report(148, name);
      }
    }
  } else {
    body = parseStatementList(parser, context | 8, scope);
  }
  return parser.finishNode({
    type: "Program",
    sourceType,
    body
  }, { index: 0, line: 1, column: 0 }, parser.currentLocation);
}
function parseStatementList(parser, context, scope) {
  nextToken(parser, context | 32 | 262144);
  const statements = [];
  while (parser.getToken() === 134283267) {
    const { index, tokenValue, tokenStart, tokenIndex } = parser;
    const token = parser.getToken();
    const expr = parseLiteral(parser, context);
    if (isValidStrictMode(parser, index, tokenIndex, tokenValue)) {
      context |= 1;
      if (parser.flags & 64) {
        throw new ParseError(parser.tokenStart, parser.currentLocation, 9);
      }
      if (parser.flags & 4096) {
        throw new ParseError(parser.tokenStart, parser.currentLocation, 15);
      }
    }
    statements.push(parseDirective(parser, context, expr, token, tokenStart));
  }
  while (parser.getToken() !== 1048576) {
    statements.push(parseStatementListItem(parser, context, scope, void 0, 4, {}));
  }
  return statements;
}
function parseModuleItemList(parser, context, scope) {
  nextToken(parser, context | 32);
  const statements = [];
  while (parser.getToken() === 134283267) {
    const { tokenStart } = parser;
    const token = parser.getToken();
    statements.push(parseDirective(parser, context, parseLiteral(parser, context), token, tokenStart));
  }
  while (parser.getToken() !== 1048576) {
    statements.push(parseModuleItem(parser, context, scope));
  }
  return statements;
}
function parseModuleItem(parser, context, scope) {
  if (parser.getToken() === 132) {
    Object.assign(parser.leadingDecorators, {
      start: parser.tokenStart,
      decorators: parseDecorators(parser, context, void 0)
    });
  }
  let moduleItem;
  switch (parser.getToken()) {
    case 20564:
      moduleItem = parseExportDeclaration(parser, context, scope);
      break;
    case 86106:
      moduleItem = parseImportDeclaration(parser, context, scope);
      break;
    default:
      moduleItem = parseStatementListItem(parser, context, scope, void 0, 4, {});
  }
  if (parser.leadingDecorators?.decorators.length) {
    parser.report(170);
  }
  return moduleItem;
}
function parseStatementListItem(parser, context, scope, privateScope, origin, labels) {
  const start = parser.tokenStart;
  switch (parser.getToken()) {
    case 86104:
      return parseFunctionDeclaration(parser, context, scope, privateScope, origin, 1, 0, 0, start);
    case 132:
    case 86094:
      return parseClassDeclaration(parser, context, scope, privateScope, 0);
    case 86090:
      return parseLexicalDeclaration(parser, context, scope, privateScope, 16, 0);
    case 241737:
      return parseLetIdentOrVarDeclarationStatement(parser, context, scope, privateScope, origin);
    case 20564:
      parser.report(103, "export");
    case 86106:
      nextToken(parser, context);
      switch (parser.getToken()) {
        case 67174411:
          return parseImportCallDeclaration(parser, context, privateScope, start);
        case 67108877:
          return parseImportMetaDeclaration(parser, context, start);
        default:
          parser.report(103, "import");
      }
    case 209005:
      return parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, privateScope, origin, labels, 1);
    default:
      return parseStatement(parser, context, scope, privateScope, origin, labels, 1);
  }
}
function parseStatement(parser, context, scope, privateScope, origin, labels, allowFuncDecl) {
  switch (parser.getToken()) {
    case 86088:
      return parseVariableStatement(parser, context, scope, privateScope, 0);
    case 20572:
      return parseReturnStatement(parser, context, privateScope);
    case 20569:
      return parseIfStatement(parser, context, scope, privateScope, labels);
    case 20567:
      return parseForStatement(parser, context, scope, privateScope, labels);
    case 20562:
      return parseDoWhileStatement(parser, context, scope, privateScope, labels);
    case 20578:
      return parseWhileStatement(parser, context, scope, privateScope, labels);
    case 86110:
      return parseSwitchStatement(parser, context, scope, privateScope, labels);
    case 1074790417:
      return parseEmptyStatement(parser, context);
    case 2162700:
      return parseBlock(parser, context, scope?.createChildScope(), privateScope, labels, parser.tokenStart);
    case 86112:
      return parseThrowStatement(parser, context, privateScope);
    case 20555:
      return parseBreakStatement(parser, context, labels);
    case 20559:
      return parseContinueStatement(parser, context, labels);
    case 20577:
      return parseTryStatement(parser, context, scope, privateScope, labels);
    case 20579:
      return parseWithStatement(parser, context, scope, privateScope, labels);
    case 20560:
      return parseDebuggerStatement(parser, context);
    case 209005:
      return parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, privateScope, origin, labels, 0);
    case 20557:
      parser.report(162);
    case 20566:
      parser.report(163);
    case 86104:
      parser.report(context & 1 ? 76 : !parser.options.webcompat ? 78 : 77);
    case 86094:
      parser.report(79);
    default:
      return parseExpressionOrLabelledStatement(parser, context, scope, privateScope, origin, labels, allowFuncDecl);
  }
}
function parseExpressionOrLabelledStatement(parser, context, scope, privateScope, origin, labels, allowFuncDecl) {
  const { tokenValue, tokenStart } = parser;
  const token = parser.getToken();
  let expr;
  switch (token) {
    case 241737:
      expr = parseIdentifier(parser, context);
      if (context & 1)
        parser.report(85);
      if (parser.getToken() === 69271571)
        parser.report(84);
      break;
    default:
      expr = parsePrimaryExpression(parser, context, privateScope, 2, 0, 1, 0, 1, parser.tokenStart);
  }
  if (token & 143360 && parser.getToken() === 21) {
    return parseLabelledStatement(parser, context, scope, privateScope, origin, labels, tokenValue, expr, token, allowFuncDecl, tokenStart);
  }
  expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 0, 0, tokenStart);
  expr = parseAssignmentExpression(parser, context, privateScope, 0, 0, tokenStart, expr);
  if (parser.getToken() === 18) {
    expr = parseSequenceExpression(parser, context, privateScope, 0, tokenStart, expr);
  }
  return parseExpressionStatement(parser, context, expr, tokenStart);
}
function parseBlock(parser, context, scope, privateScope, labels, start = parser.tokenStart, type = "BlockStatement") {
  const body = [];
  consume(parser, context | 32, 2162700);
  while (parser.getToken() !== 1074790415) {
    body.push(parseStatementListItem(parser, context, scope, privateScope, 2, { $: labels }));
  }
  consume(parser, context | 32, 1074790415);
  return parser.finishNode({
    type,
    body
  }, start);
}
function parseReturnStatement(parser, context, privateScope) {
  if ((context & 4096) === 0)
    parser.report(92);
  const start = parser.tokenStart;
  nextToken(parser, context | 32);
  const argument = parser.flags & 1 || parser.getToken() & 1048576 ? null : parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode({
    type: "ReturnStatement",
    argument
  }, start);
}
function parseExpressionStatement(parser, context, expression, start) {
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode({
    type: "ExpressionStatement",
    expression
  }, start);
}
function parseLabelledStatement(parser, context, scope, privateScope, origin, labels, value, expr, token, allowFuncDecl, start) {
  validateBindingIdentifier(parser, context, 0, token, 1);
  validateAndDeclareLabel(parser, labels, value);
  nextToken(parser, context | 32);
  const body = allowFuncDecl && (context & 1) === 0 && parser.options.webcompat && parser.getToken() === 86104 ? parseFunctionDeclaration(parser, context, scope?.createChildScope(), privateScope, origin, 0, 0, 0, parser.tokenStart) : parseStatement(parser, context, scope, privateScope, origin, labels, allowFuncDecl);
  return parser.finishNode({
    type: "LabeledStatement",
    label: expr,
    body
  }, start);
}
function parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, privateScope, origin, labels, allowFuncDecl) {
  const { tokenValue, tokenStart: start } = parser;
  const token = parser.getToken();
  let expr = parseIdentifier(parser, context);
  if (parser.getToken() === 21) {
    return parseLabelledStatement(parser, context, scope, privateScope, origin, labels, tokenValue, expr, token, 1, start);
  }
  const asyncNewLine = parser.flags & 1;
  if (!asyncNewLine) {
    if (parser.getToken() === 86104) {
      if (!allowFuncDecl)
        parser.report(123);
      return parseFunctionDeclaration(parser, context, scope, privateScope, origin, 1, 0, 1, start);
    }
    if (isValidIdentifier(context, parser.getToken())) {
      expr = parseAsyncArrowAfterIdent(parser, context, privateScope, 1, start);
      if (parser.getToken() === 18)
        expr = parseSequenceExpression(parser, context, privateScope, 0, start, expr);
      return parseExpressionStatement(parser, context, expr, start);
    }
  }
  if (parser.getToken() === 67174411) {
    expr = parseAsyncArrowOrCallExpression(parser, context, privateScope, expr, 1, 1, 0, asyncNewLine, start);
  } else {
    if (parser.getToken() === 10) {
      classifyIdentifier(parser, context, token);
      if ((token & 36864) === 36864) {
        parser.flags |= 256;
      }
      expr = parseArrowFromIdentifier(parser, context | 2048, privateScope, parser.tokenValue, expr, 0, 1, 0, start);
    }
    parser.assignable = 1;
  }
  expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 0, 0, start);
  expr = parseAssignmentExpression(parser, context, privateScope, 0, 0, start, expr);
  parser.assignable = 1;
  if (parser.getToken() === 18) {
    expr = parseSequenceExpression(parser, context, privateScope, 0, start, expr);
  }
  return parseExpressionStatement(parser, context, expr, start);
}
function parseDirective(parser, context, expression, token, start) {
  const endIndex = parser.startIndex;
  if (token !== 1074790417) {
    parser.assignable = 2;
    expression = parseMemberOrUpdateExpression(parser, context, void 0, expression, 0, 0, start);
    if (parser.getToken() !== 1074790417) {
      expression = parseAssignmentExpression(parser, context, void 0, 0, 0, start, expression);
      if (parser.getToken() === 18) {
        expression = parseSequenceExpression(parser, context, void 0, 0, start, expression);
      }
    }
    matchOrInsertSemicolon(parser, context | 32);
  }
  const node = {
    type: "ExpressionStatement",
    expression
  };
  if (expression.type === "Literal" && typeof expression.value === "string") {
    node.directive = parser.source.slice(start.index + 1, endIndex - 1);
  }
  return parser.finishNode(node, start);
}
function parseEmptyStatement(parser, context) {
  const start = parser.tokenStart;
  nextToken(parser, context | 32);
  return parser.finishNode({
    type: "EmptyStatement"
  }, start);
}
function parseThrowStatement(parser, context, privateScope) {
  const start = parser.tokenStart;
  nextToken(parser, context | 32);
  if (parser.flags & 1)
    parser.report(90);
  const argument = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode({
    type: "ThrowStatement",
    argument
  }, start);
}
function parseIfStatement(parser, context, scope, privateScope, labels) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  consume(parser, context | 32, 67174411);
  parser.assignable = 1;
  const test = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  consume(parser, context | 32, 16);
  const consequent = parseConsequentOrAlternative(parser, context, scope, privateScope, labels);
  let alternate = null;
  if (parser.getToken() === 20563) {
    nextToken(parser, context | 32);
    alternate = parseConsequentOrAlternative(parser, context, scope, privateScope, labels);
  }
  return parser.finishNode({
    type: "IfStatement",
    test,
    consequent,
    alternate
  }, start);
}
function parseConsequentOrAlternative(parser, context, scope, privateScope, labels) {
  const { tokenStart } = parser;
  return context & 1 || !parser.options.webcompat || parser.getToken() !== 86104 ? parseStatement(parser, context, scope, privateScope, 0, { $: labels }, 0) : parseFunctionDeclaration(parser, context, scope?.createChildScope(), privateScope, 0, 0, 0, 0, tokenStart);
}
function parseSwitchStatement(parser, context, scope, privateScope, labels) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  consume(parser, context | 32, 67174411);
  const discriminant = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  consume(parser, context, 16);
  consume(parser, context, 2162700);
  const cases = [];
  let seenDefault = 0;
  scope = scope?.createChildScope(8);
  while (parser.getToken() !== 1074790415) {
    const { tokenStart } = parser;
    let test = null;
    const consequent = [];
    if (consumeOpt(parser, context | 32, 20556)) {
      test = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
    } else {
      consume(parser, context | 32, 20561);
      if (seenDefault)
        parser.report(89);
      seenDefault = 1;
    }
    consume(parser, context | 32, 21);
    while (parser.getToken() !== 20556 && parser.getToken() !== 1074790415 && parser.getToken() !== 20561) {
      consequent.push(parseStatementListItem(parser, context | 4, scope, privateScope, 2, {
        $: labels
      }));
    }
    cases.push(parser.finishNode({
      type: "SwitchCase",
      test,
      consequent
    }, tokenStart));
  }
  consume(parser, context | 32, 1074790415);
  return parser.finishNode({
    type: "SwitchStatement",
    discriminant,
    cases
  }, start);
}
function parseWhileStatement(parser, context, scope, privateScope, labels) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  consume(parser, context | 32, 67174411);
  const test = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  consume(parser, context | 32, 16);
  const body = parseIterationStatementBody(parser, context, scope, privateScope, labels);
  return parser.finishNode({
    type: "WhileStatement",
    test,
    body
  }, start);
}
function parseIterationStatementBody(parser, context, scope, privateScope, labels) {
  return parseStatement(parser, (context | 131072) ^ 131072 | 128, scope, privateScope, 0, { loop: 1, $: labels }, 0);
}
function parseContinueStatement(parser, context, labels) {
  if ((context & 128) === 0)
    parser.report(68);
  const start = parser.tokenStart;
  nextToken(parser, context);
  let label = null;
  if ((parser.flags & 1) === 0 && parser.getToken() & 143360) {
    const { tokenValue } = parser;
    label = parseIdentifier(parser, context | 32);
    if (!isValidLabel(parser, labels, tokenValue, 1))
      parser.report(138, tokenValue);
  }
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode({
    type: "ContinueStatement",
    label
  }, start);
}
function parseBreakStatement(parser, context, labels) {
  const start = parser.tokenStart;
  nextToken(parser, context | 32);
  let label = null;
  if ((parser.flags & 1) === 0 && parser.getToken() & 143360) {
    const { tokenValue } = parser;
    label = parseIdentifier(parser, context | 32);
    if (!isValidLabel(parser, labels, tokenValue, 0))
      parser.report(138, tokenValue);
  } else if ((context & (4 | 128)) === 0) {
    parser.report(69);
  }
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode({
    type: "BreakStatement",
    label
  }, start);
}
function parseWithStatement(parser, context, scope, privateScope, labels) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  if (context & 1)
    parser.report(91);
  consume(parser, context | 32, 67174411);
  const object = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  consume(parser, context | 32, 16);
  const body = parseStatement(parser, context, scope, privateScope, 2, labels, 0);
  return parser.finishNode({
    type: "WithStatement",
    object,
    body
  }, start);
}
function parseDebuggerStatement(parser, context) {
  const start = parser.tokenStart;
  nextToken(parser, context | 32);
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode({
    type: "DebuggerStatement"
  }, start);
}
function parseTryStatement(parser, context, scope, privateScope, labels) {
  const start = parser.tokenStart;
  nextToken(parser, context | 32);
  const firstScope = scope?.createChildScope(16);
  const block = parseBlock(parser, context, firstScope, privateScope, { $: labels });
  const { tokenStart } = parser;
  const handler = consumeOpt(parser, context | 32, 20557) ? parseCatchBlock(parser, context, scope, privateScope, labels, tokenStart) : null;
  let finalizer = null;
  if (parser.getToken() === 20566) {
    nextToken(parser, context | 32);
    const finalizerScope = scope?.createChildScope(4);
    const block2 = parseBlock(parser, context, finalizerScope, privateScope, { $: labels });
    finalizer = block2;
  }
  if (!handler && !finalizer) {
    parser.report(88);
  }
  return parser.finishNode({
    type: "TryStatement",
    block,
    handler,
    finalizer
  }, start);
}
function parseCatchBlock(parser, context, scope, privateScope, labels, start) {
  let param = null;
  let additionalScope = scope;
  if (consumeOpt(parser, context, 67174411)) {
    scope = scope?.createChildScope(4);
    param = parseBindingPattern(parser, context, scope, privateScope, (parser.getToken() & 2097152) === 2097152 ? 256 : 512, 0);
    if (parser.getToken() === 18) {
      parser.report(86);
    } else if (parser.getToken() === 1077936155) {
      parser.report(87);
    }
    consume(parser, context | 32, 16);
  }
  additionalScope = scope?.createChildScope(32);
  const body = parseBlock(parser, context, additionalScope, privateScope, { $: labels });
  return parser.finishNode({
    type: "CatchClause",
    param,
    body
  }, start);
}
function parseStaticBlock(parser, context, scope, privateScope, start) {
  scope = scope?.createChildScope();
  const ctorContext = 512 | 4096 | 1024 | 4 | 128;
  context = (context | ctorContext) ^ ctorContext | 256 | 2048 | 524288 | 65536;
  return parseBlock(parser, context, scope, privateScope, {}, start, "StaticBlock");
}
function parseDoWhileStatement(parser, context, scope, privateScope, labels) {
  const start = parser.tokenStart;
  nextToken(parser, context | 32);
  const body = parseIterationStatementBody(parser, context, scope, privateScope, labels);
  consume(parser, context, 20578);
  consume(parser, context | 32, 67174411);
  const test = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  consume(parser, context | 32, 16);
  consumeOpt(parser, context | 32, 1074790417);
  return parser.finishNode({
    type: "DoWhileStatement",
    body,
    test
  }, start);
}
function parseLetIdentOrVarDeclarationStatement(parser, context, scope, privateScope, origin) {
  const { tokenValue, tokenStart } = parser;
  const token = parser.getToken();
  let expr = parseIdentifier(parser, context);
  if (parser.getToken() & (143360 | 2097152)) {
    const declarations = parseVariableDeclarationList(parser, context, scope, privateScope, 8, 0);
    matchOrInsertSemicolon(parser, context | 32);
    return parser.finishNode({
      type: "VariableDeclaration",
      kind: "let",
      declarations
    }, tokenStart);
  }
  parser.assignable = 1;
  if (context & 1)
    parser.report(85);
  if (parser.getToken() === 21) {
    return parseLabelledStatement(parser, context, scope, privateScope, origin, {}, tokenValue, expr, token, 0, tokenStart);
  }
  if (parser.getToken() === 10) {
    let scope2 = void 0;
    if (parser.options.lexical)
      scope2 = createArrowHeadParsingScope(parser, context, tokenValue);
    parser.flags = (parser.flags | 128) ^ 128;
    expr = parseArrowFunctionExpression(parser, context, scope2, privateScope, [expr], 0, tokenStart);
  } else {
    expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 0, 0, tokenStart);
    expr = parseAssignmentExpression(parser, context, privateScope, 0, 0, tokenStart, expr);
  }
  if (parser.getToken() === 18) {
    expr = parseSequenceExpression(parser, context, privateScope, 0, tokenStart, expr);
  }
  return parseExpressionStatement(parser, context, expr, tokenStart);
}
function parseLexicalDeclaration(parser, context, scope, privateScope, kind, origin) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  const declarations = parseVariableDeclarationList(parser, context, scope, privateScope, kind, origin);
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode({
    type: "VariableDeclaration",
    kind: kind & 8 ? "let" : "const",
    declarations
  }, start);
}
function parseVariableStatement(parser, context, scope, privateScope, origin) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  const declarations = parseVariableDeclarationList(parser, context, scope, privateScope, 4, origin);
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode({
    type: "VariableDeclaration",
    kind: "var",
    declarations
  }, start);
}
function parseVariableDeclarationList(parser, context, scope, privateScope, kind, origin) {
  let bindingCount = 1;
  const list = [
    parseVariableDeclaration(parser, context, scope, privateScope, kind, origin)
  ];
  while (consumeOpt(parser, context, 18)) {
    bindingCount++;
    list.push(parseVariableDeclaration(parser, context, scope, privateScope, kind, origin));
  }
  if (bindingCount > 1 && origin & 32 && parser.getToken() & 262144) {
    parser.report(61, KeywordDescTable[parser.getToken() & 255]);
  }
  return list;
}
function parseVariableDeclaration(parser, context, scope, privateScope, kind, origin) {
  const { tokenStart } = parser;
  const token = parser.getToken();
  let init = null;
  const id = parseBindingPattern(parser, context, scope, privateScope, kind, origin);
  if (parser.getToken() === 1077936155) {
    nextToken(parser, context | 32);
    init = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
    if (origin & 32 || (token & 2097152) === 0) {
      if (parser.getToken() === 471156 || parser.getToken() === 8673330 && (token & 2097152 || (kind & 4) === 0 || context & 1)) {
        throw new ParseError(tokenStart, parser.currentLocation, 60, parser.getToken() === 471156 ? "of" : "in");
      }
    }
  } else if ((kind & 16 || (token & 2097152) > 0) && (parser.getToken() & 262144) !== 262144) {
    parser.report(59, kind & 16 ? "const" : "destructuring");
  }
  return parser.finishNode({
    type: "VariableDeclarator",
    id,
    init
  }, tokenStart);
}
function parseForStatement(parser, context, scope, privateScope, labels) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  const forAwait = ((context & 2048) > 0 || (context & 2) > 0 && (context & 8) > 0) && consumeOpt(parser, context, 209006);
  consume(parser, context | 32, 67174411);
  scope = scope?.createChildScope(1);
  let test = null;
  let update = null;
  let destructible = 0;
  let init = null;
  let isVarDecl = parser.getToken() === 86088 || parser.getToken() === 241737 || parser.getToken() === 86090;
  let right;
  const { tokenStart } = parser;
  const token = parser.getToken();
  if (isVarDecl) {
    if (token === 241737) {
      init = parseIdentifier(parser, context);
      if (parser.getToken() & (143360 | 2097152)) {
        if (parser.getToken() === 8673330) {
          if (context & 1)
            parser.report(67);
        } else {
          init = parser.finishNode({
            type: "VariableDeclaration",
            kind: "let",
            declarations: parseVariableDeclarationList(parser, context | 131072, scope, privateScope, 8, 32)
          }, tokenStart);
        }
        parser.assignable = 1;
      } else if (context & 1) {
        parser.report(67);
      } else {
        isVarDecl = false;
        parser.assignable = 1;
        init = parseMemberOrUpdateExpression(parser, context, privateScope, init, 0, 0, tokenStart);
        if (parser.getToken() === 471156)
          parser.report(115);
      }
    } else {
      nextToken(parser, context);
      init = parser.finishNode(token === 86088 ? {
        type: "VariableDeclaration",
        kind: "var",
        declarations: parseVariableDeclarationList(parser, context | 131072, scope, privateScope, 4, 32)
      } : {
        type: "VariableDeclaration",
        kind: "const",
        declarations: parseVariableDeclarationList(parser, context | 131072, scope, privateScope, 16, 32)
      }, tokenStart);
      parser.assignable = 1;
    }
  } else if (token === 1074790417) {
    if (forAwait)
      parser.report(82);
  } else if ((token & 2097152) === 2097152) {
    const patternStart = parser.tokenStart;
    init = token === 2162700 ? parseObjectLiteralOrPattern(parser, context, void 0, privateScope, 1, 0, 0, 2, 32) : parseArrayExpressionOrPattern(parser, context, void 0, privateScope, 1, 0, 0, 2, 32);
    destructible = parser.destructible;
    if (destructible & 64) {
      parser.report(63);
    }
    parser.assignable = destructible & 16 ? 2 : 1;
    init = parseMemberOrUpdateExpression(parser, context | 131072, privateScope, init, 0, 0, patternStart);
  } else {
    init = parseLeftHandSideExpression(parser, context | 131072, privateScope, 1, 0, 1);
  }
  if ((parser.getToken() & 262144) === 262144) {
    if (parser.getToken() === 471156) {
      if (parser.assignable & 2)
        parser.report(80, forAwait ? "await" : "of");
      reinterpretToPattern(parser, init);
      nextToken(parser, context | 32);
      right = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
      consume(parser, context | 32, 16);
      const body3 = parseIterationStatementBody(parser, context, scope, privateScope, labels);
      return parser.finishNode({
        type: "ForOfStatement",
        left: init,
        right,
        body: body3,
        await: forAwait
      }, start);
    }
    if (parser.assignable & 2)
      parser.report(80, "in");
    reinterpretToPattern(parser, init);
    nextToken(parser, context | 32);
    if (forAwait)
      parser.report(82);
    right = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
    consume(parser, context | 32, 16);
    const body2 = parseIterationStatementBody(parser, context, scope, privateScope, labels);
    return parser.finishNode({
      type: "ForInStatement",
      body: body2,
      left: init,
      right
    }, start);
  }
  if (forAwait)
    parser.report(82);
  if (!isVarDecl) {
    if (destructible & 8 && parser.getToken() !== 1077936155) {
      parser.report(80, "loop");
    }
    init = parseAssignmentExpression(parser, context | 131072, privateScope, 0, 0, tokenStart, init);
  }
  if (parser.getToken() === 18)
    init = parseSequenceExpression(parser, context, privateScope, 0, tokenStart, init);
  consume(parser, context | 32, 1074790417);
  if (parser.getToken() !== 1074790417)
    test = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  consume(parser, context | 32, 1074790417);
  if (parser.getToken() !== 16)
    update = parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart);
  consume(parser, context | 32, 16);
  const body = parseIterationStatementBody(parser, context, scope, privateScope, labels);
  return parser.finishNode({
    type: "ForStatement",
    init,
    test,
    update,
    body
  }, start);
}
function parseRestrictedIdentifier(parser, context, scope) {
  if (!isValidIdentifier(context, parser.getToken()))
    parser.report(118);
  if ((parser.getToken() & 537079808) === 537079808)
    parser.report(119);
  scope?.addBlockName(context, parser.tokenValue, 8, 0);
  return parseIdentifier(parser, context);
}
function parseImportDeclaration(parser, context, scope) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  let source = null;
  const { tokenStart } = parser;
  let specifiers = [];
  if (parser.getToken() === 134283267) {
    source = parseLiteral(parser, context);
  } else {
    if (parser.getToken() & 143360) {
      const local = parseRestrictedIdentifier(parser, context, scope);
      specifiers = [
        parser.finishNode({
          type: "ImportDefaultSpecifier",
          local
        }, tokenStart)
      ];
      if (consumeOpt(parser, context, 18)) {
        switch (parser.getToken()) {
          case 8391476:
            specifiers.push(parseImportNamespaceSpecifier(parser, context, scope));
            break;
          case 2162700:
            parseImportSpecifierOrNamedImports(parser, context, scope, specifiers);
            break;
          default:
            parser.report(107);
        }
      }
    } else {
      switch (parser.getToken()) {
        case 8391476:
          specifiers = [parseImportNamespaceSpecifier(parser, context, scope)];
          break;
        case 2162700:
          parseImportSpecifierOrNamedImports(parser, context, scope, specifiers);
          break;
        case 67174411:
          return parseImportCallDeclaration(parser, context, void 0, start);
        case 67108877:
          return parseImportMetaDeclaration(parser, context, start);
        default:
          parser.report(30, KeywordDescTable[parser.getToken() & 255]);
      }
    }
    source = parseModuleSpecifier(parser, context);
  }
  const attributes = parseImportAttributes(parser, context);
  const node = {
    type: "ImportDeclaration",
    specifiers,
    source,
    attributes
  };
  matchOrInsertSemicolon(parser, context | 32);
  return parser.finishNode(node, start);
}
function parseImportNamespaceSpecifier(parser, context, scope) {
  const { tokenStart } = parser;
  nextToken(parser, context);
  consume(parser, context, 77932);
  if ((parser.getToken() & 134217728) === 134217728) {
    throw new ParseError(tokenStart, parser.currentLocation, 30, KeywordDescTable[parser.getToken() & 255]);
  }
  return parser.finishNode({
    type: "ImportNamespaceSpecifier",
    local: parseRestrictedIdentifier(parser, context, scope)
  }, tokenStart);
}
function parseModuleSpecifier(parser, context) {
  consume(parser, context, 209011);
  if (parser.getToken() !== 134283267)
    parser.report(105, "Import");
  return parseLiteral(parser, context);
}
function parseImportSpecifierOrNamedImports(parser, context, scope, specifiers) {
  nextToken(parser, context);
  while (parser.getToken() & 143360 || parser.getToken() === 134283267) {
    let { tokenValue, tokenStart } = parser;
    const token = parser.getToken();
    const imported = parseModuleExportName(parser, context);
    let local;
    if (consumeOpt(parser, context, 77932)) {
      if ((parser.getToken() & 134217728) === 134217728 || parser.getToken() === 18) {
        parser.report(106);
      } else {
        validateBindingIdentifier(parser, context, 16, parser.getToken(), 0);
      }
      tokenValue = parser.tokenValue;
      local = parseIdentifier(parser, context);
    } else if (imported.type === "Identifier") {
      validateBindingIdentifier(parser, context, 16, token, 0);
      local = imported;
    } else {
      parser.report(25, KeywordDescTable[77932 & 255]);
    }
    scope?.addBlockName(context, tokenValue, 8, 0);
    specifiers.push(parser.finishNode({
      type: "ImportSpecifier",
      local,
      imported
    }, tokenStart));
    if (parser.getToken() !== 1074790415)
      consume(parser, context, 18);
  }
  consume(parser, context, 1074790415);
  return specifiers;
}
function parseImportMetaDeclaration(parser, context, start) {
  let expr = parseImportMetaExpression(parser, context, parser.finishNode({
    type: "Identifier",
    name: "import"
  }, start), start);
  expr = parseMemberOrUpdateExpression(parser, context, void 0, expr, 0, 0, start);
  expr = parseAssignmentExpression(parser, context, void 0, 0, 0, start, expr);
  if (parser.getToken() === 18) {
    expr = parseSequenceExpression(parser, context, void 0, 0, start, expr);
  }
  return parseExpressionStatement(parser, context, expr, start);
}
function parseImportCallDeclaration(parser, context, privateScope, start) {
  let expr = parseImportExpression(parser, context, privateScope, 0, start);
  expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 0, 0, start);
  if (parser.getToken() === 18) {
    expr = parseSequenceExpression(parser, context, privateScope, 0, start, expr);
  }
  return parseExpressionStatement(parser, context, expr, start);
}
function parseExportDeclaration(parser, context, scope) {
  const start = parser.leadingDecorators.decorators.length ? parser.leadingDecorators.start : parser.tokenStart;
  nextToken(parser, context | 32);
  const specifiers = [];
  let declaration = null;
  let source = null;
  let attributes = [];
  if (consumeOpt(parser, context | 32, 20561)) {
    switch (parser.getToken()) {
      case 86104: {
        declaration = parseFunctionDeclaration(parser, context, scope, void 0, 4, 1, 1, 0, parser.tokenStart);
        break;
      }
      case 132:
      case 86094:
        declaration = parseClassDeclaration(parser, context, scope, void 0, 1);
        break;
      case 209005: {
        const { tokenStart } = parser;
        declaration = parseIdentifier(parser, context);
        const { flags } = parser;
        if ((flags & 1) === 0) {
          if (parser.getToken() === 86104) {
            declaration = parseFunctionDeclaration(parser, context, scope, void 0, 4, 1, 1, 1, tokenStart);
          } else {
            if (parser.getToken() === 67174411) {
              declaration = parseAsyncArrowOrCallExpression(parser, context, void 0, declaration, 1, 1, 0, flags, tokenStart);
              declaration = parseMemberOrUpdateExpression(parser, context, void 0, declaration, 0, 0, tokenStart);
              declaration = parseAssignmentExpression(parser, context, void 0, 0, 0, tokenStart, declaration);
            } else if (parser.getToken() & 143360) {
              if (scope)
                scope = createArrowHeadParsingScope(parser, context, parser.tokenValue);
              declaration = parseIdentifier(parser, context);
              declaration = parseArrowFunctionExpression(parser, context, scope, void 0, [declaration], 1, tokenStart);
            }
          }
        }
        break;
      }
      default:
        declaration = parseExpression(parser, context, void 0, 1, 0, parser.tokenStart);
        matchOrInsertSemicolon(parser, context | 32);
    }
    if (scope)
      parser.declareUnboundVariable("default");
    return parser.finishNode({
      type: "ExportDefaultDeclaration",
      declaration
    }, start);
  }
  switch (parser.getToken()) {
    case 8391476: {
      nextToken(parser, context);
      let exported = null;
      const isNamedDeclaration = consumeOpt(parser, context, 77932);
      if (isNamedDeclaration) {
        if (scope)
          parser.declareUnboundVariable(parser.tokenValue);
        exported = parseModuleExportName(parser, context);
      }
      consume(parser, context, 209011);
      if (parser.getToken() !== 134283267)
        parser.report(105, "Export");
      source = parseLiteral(parser, context);
      const attributes2 = parseImportAttributes(parser, context);
      const node2 = {
        type: "ExportAllDeclaration",
        source,
        exported,
        attributes: attributes2
      };
      matchOrInsertSemicolon(parser, context | 32);
      return parser.finishNode(node2, start);
    }
    case 2162700: {
      nextToken(parser, context);
      const tmpExportedNames = [];
      const tmpExportedBindings = [];
      let hasLiteralLocal = 0;
      while (parser.getToken() & 143360 || parser.getToken() === 134283267) {
        const { tokenStart, tokenValue } = parser;
        const local = parseModuleExportName(parser, context);
        if (local.type === "Literal") {
          hasLiteralLocal = 1;
        }
        let exported;
        if (parser.getToken() === 77932) {
          nextToken(parser, context);
          if ((parser.getToken() & 143360) === 0 && parser.getToken() !== 134283267) {
            parser.report(106);
          }
          if (scope) {
            tmpExportedNames.push(parser.tokenValue);
            tmpExportedBindings.push(tokenValue);
          }
          exported = parseModuleExportName(parser, context);
        } else {
          if (scope) {
            tmpExportedNames.push(parser.tokenValue);
            tmpExportedBindings.push(parser.tokenValue);
          }
          exported = local;
        }
        specifiers.push(parser.finishNode({
          type: "ExportSpecifier",
          local,
          exported
        }, tokenStart));
        if (parser.getToken() !== 1074790415)
          consume(parser, context, 18);
      }
      consume(parser, context, 1074790415);
      if (consumeOpt(parser, context, 209011)) {
        if (parser.getToken() !== 134283267)
          parser.report(105, "Export");
        source = parseLiteral(parser, context);
        attributes = parseImportAttributes(parser, context);
        if (scope) {
          tmpExportedNames.forEach((n) => parser.declareUnboundVariable(n));
        }
      } else {
        if (hasLiteralLocal) {
          parser.report(172);
        }
        if (scope) {
          tmpExportedNames.forEach((n) => parser.declareUnboundVariable(n));
          tmpExportedBindings.forEach((b) => parser.addBindingToExports(b));
        }
      }
      matchOrInsertSemicolon(parser, context | 32);
      break;
    }
    case 132:
    case 86094:
      declaration = parseClassDeclaration(parser, context, scope, void 0, 2);
      break;
    case 86104:
      declaration = parseFunctionDeclaration(parser, context, scope, void 0, 4, 1, 2, 0, parser.tokenStart);
      break;
    case 241737:
      declaration = parseLexicalDeclaration(parser, context, scope, void 0, 8, 64);
      break;
    case 86090:
      declaration = parseLexicalDeclaration(parser, context, scope, void 0, 16, 64);
      break;
    case 86088:
      declaration = parseVariableStatement(parser, context, scope, void 0, 64);
      break;
    case 209005: {
      const { tokenStart } = parser;
      nextToken(parser, context);
      if ((parser.flags & 1) === 0 && parser.getToken() === 86104) {
        declaration = parseFunctionDeclaration(parser, context, scope, void 0, 4, 1, 2, 1, tokenStart);
        break;
      }
    }
    default:
      parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  }
  const node = {
    type: "ExportNamedDeclaration",
    declaration,
    specifiers,
    source,
    attributes
  };
  return parser.finishNode(node, start);
}
function parseExpression(parser, context, privateScope, canAssign, inGroup, start) {
  let expr = parsePrimaryExpression(parser, context, privateScope, 2, 0, canAssign, inGroup, 1, start);
  expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, inGroup, 0, start);
  return parseAssignmentExpression(parser, context, privateScope, inGroup, 0, start, expr);
}
function parseSequenceExpression(parser, context, privateScope, inGroup, start, expr) {
  const expressions = [expr];
  while (consumeOpt(parser, context | 32, 18)) {
    expressions.push(parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart));
  }
  return parser.finishNode({
    type: "SequenceExpression",
    expressions
  }, start);
}
function parseExpressions(parser, context, privateScope, inGroup, canAssign, start) {
  const expr = parseExpression(parser, context, privateScope, canAssign, inGroup, start);
  return parser.getToken() === 18 ? parseSequenceExpression(parser, context, privateScope, inGroup, start, expr) : expr;
}
function parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, start, left) {
  const token = parser.getToken();
  if ((token & 4194304) === 4194304) {
    if (parser.assignable & 2)
      parser.report(26);
    if (!isPattern && token === 1077936155 && left.type === "ArrayExpression" || left.type === "ObjectExpression") {
      reinterpretToPattern(parser, left);
    }
    nextToken(parser, context | 32);
    const right = parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart);
    parser.assignable = 2;
    return parser.finishNode(isPattern ? {
      type: "AssignmentPattern",
      left,
      right
    } : {
      type: "AssignmentExpression",
      left,
      operator: KeywordDescTable[token & 255],
      right
    }, start);
  }
  if ((token & 8388608) === 8388608) {
    left = parseBinaryExpression(parser, context, privateScope, inGroup, start, 4, token, left);
  }
  if (consumeOpt(parser, context | 32, 22)) {
    left = parseConditionalExpression(parser, context, privateScope, left, start);
  }
  return left;
}
function parseAssignmentExpressionOrPattern(parser, context, privateScope, inGroup, isPattern, start, left) {
  const token = parser.getToken();
  nextToken(parser, context | 32);
  const right = parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart);
  left = parser.finishNode(isPattern ? {
    type: "AssignmentPattern",
    left,
    right
  } : {
    type: "AssignmentExpression",
    left,
    operator: KeywordDescTable[token & 255],
    right
  }, start);
  parser.assignable = 2;
  return left;
}
function parseConditionalExpression(parser, context, privateScope, test, start) {
  const consequent = parseExpression(parser, (context | 131072) ^ 131072, privateScope, 1, 0, parser.tokenStart);
  consume(parser, context | 32, 21);
  parser.assignable = 1;
  const alternate = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
  parser.assignable = 2;
  return parser.finishNode({
    type: "ConditionalExpression",
    test,
    consequent,
    alternate
  }, start);
}
function parseBinaryExpression(parser, context, privateScope, inGroup, start, minPrecedence, operator, left) {
  const bit = -((context & 131072) > 0) & 8673330;
  let t;
  let precedence;
  parser.assignable = 2;
  while (parser.getToken() & 8388608) {
    t = parser.getToken();
    precedence = t & 3840;
    if (t & 524288 && operator & 268435456 || operator & 524288 && t & 268435456) {
      parser.report(165);
    }
    if (precedence + ((t === 8391735) << 8) - ((bit === t) << 12) <= minPrecedence)
      break;
    nextToken(parser, context | 32);
    left = parser.finishNode({
      type: t & 524288 || t & 268435456 ? "LogicalExpression" : "BinaryExpression",
      left,
      right: parseBinaryExpression(parser, context, privateScope, inGroup, parser.tokenStart, precedence, t, parseLeftHandSideExpression(parser, context, privateScope, 0, inGroup, 1)),
      operator: KeywordDescTable[t & 255]
    }, start);
  }
  if (parser.getToken() === 1077936155)
    parser.report(26);
  return left;
}
function parseUnaryExpression(parser, context, privateScope, isLHS, inGroup) {
  if (!isLHS)
    parser.report(0);
  const { tokenStart } = parser;
  const unaryOperator = parser.getToken();
  nextToken(parser, context | 32);
  const arg = parseLeftHandSideExpression(parser, context, privateScope, 0, inGroup, 1);
  if (parser.getToken() === 8391735)
    parser.report(33);
  if (context & 1 && unaryOperator === 16863276) {
    if (arg.type === "Identifier") {
      parser.report(121);
    } else if (isPropertyWithPrivateFieldKey(arg)) {
      parser.report(127);
    }
  }
  parser.assignable = 2;
  return parser.finishNode({
    type: "UnaryExpression",
    operator: KeywordDescTable[unaryOperator & 255],
    argument: arg,
    prefix: true
  }, tokenStart);
}
function parseAsyncExpression(parser, context, privateScope, inGroup, isLHS, canAssign, inNew, start) {
  const token = parser.getToken();
  const expr = parseIdentifier(parser, context);
  const { flags } = parser;
  if ((flags & 1) === 0) {
    if (parser.getToken() === 86104) {
      return parseFunctionExpression(parser, context, privateScope, 1, inGroup, start);
    }
    if (isValidIdentifier(context, parser.getToken())) {
      if (!isLHS)
        parser.report(0);
      if ((parser.getToken() & 36864) === 36864) {
        parser.flags |= 256;
      }
      return parseAsyncArrowAfterIdent(parser, context, privateScope, canAssign, start);
    }
  }
  if (!inNew && parser.getToken() === 67174411) {
    return parseAsyncArrowOrCallExpression(parser, context, privateScope, expr, canAssign, 1, 0, flags, start);
  }
  if (parser.getToken() === 10) {
    classifyIdentifier(parser, context, token);
    if (inNew)
      parser.report(51);
    if ((token & 36864) === 36864) {
      parser.flags |= 256;
    }
    return parseArrowFromIdentifier(parser, context, privateScope, parser.tokenValue, expr, inNew, canAssign, 0, start);
  }
  parser.assignable = 1;
  return expr;
}
function parseYieldExpressionOrIdentifier(parser, context, privateScope, inGroup, canAssign, start) {
  if (inGroup)
    parser.destructible |= 256;
  if (context & 1024) {
    nextToken(parser, context | 32);
    if (context & 8192)
      parser.report(32);
    if (!canAssign)
      parser.report(26);
    if (parser.getToken() === 22)
      parser.report(124);
    let argument = null;
    let delegate = false;
    if ((parser.flags & 1) === 0) {
      delegate = consumeOpt(parser, context | 32, 8391476);
      if (parser.getToken() & (12288 | 65536) || delegate) {
        argument = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
      }
    } else if (parser.getToken() === 8391476) {
      parser.report(30, KeywordDescTable[parser.getToken() & 255]);
    }
    parser.assignable = 2;
    return parser.finishNode({
      type: "YieldExpression",
      argument,
      delegate
    }, start);
  }
  if (context & 1)
    parser.report(97, "yield");
  return parseIdentifierOrArrow(parser, context, privateScope);
}
function parseAwaitExpressionOrIdentifier(parser, context, privateScope, inNew, inGroup, start) {
  if (inGroup)
    parser.destructible |= 128;
  if (context & 524288)
    parser.report(177);
  const possibleIdentifierOrArrowFunc = parseIdentifierOrArrow(parser, context, privateScope);
  const isIdentifier = possibleIdentifierOrArrowFunc.type === "ArrowFunctionExpression" || (parser.getToken() & 65536) === 0;
  if (isIdentifier) {
    if (context & 2048)
      throw new ParseError(start, { index: parser.startIndex, line: parser.startLine, column: parser.startColumn }, 176);
    if (context & 2)
      throw new ParseError(start, { index: parser.startIndex, line: parser.startLine, column: parser.startColumn }, 110);
    if (context & 8192 && context & 2048)
      throw new ParseError(start, { index: parser.startIndex, line: parser.startLine, column: parser.startColumn }, 110);
    return possibleIdentifierOrArrowFunc;
  }
  if (context & 8192) {
    throw new ParseError(start, { index: parser.startIndex, line: parser.startLine, column: parser.startColumn }, 31);
  }
  if (context & 2048 || context & 2 && context & 8) {
    if (inNew)
      throw new ParseError(start, { index: parser.startIndex, line: parser.startLine, column: parser.startColumn }, 0);
    const argument = parseLeftHandSideExpression(parser, context, privateScope, 0, 0, 1);
    if (parser.getToken() === 8391735)
      parser.report(33);
    parser.assignable = 2;
    return parser.finishNode({
      type: "AwaitExpression",
      argument
    }, start);
  }
  if (context & 2)
    throw new ParseError(start, { index: parser.startIndex, line: parser.startLine, column: parser.startColumn }, 98);
  return possibleIdentifierOrArrowFunc;
}
function parseFunctionBody(parser, context, scope, privateScope, origin, funcNameToken, functionScope) {
  const { tokenStart } = parser;
  consume(parser, context | 32, 2162700);
  const body = [];
  if (parser.getToken() !== 1074790415) {
    while (parser.getToken() === 134283267) {
      const { index, tokenStart: tokenStart2, tokenIndex, tokenValue } = parser;
      const token = parser.getToken();
      const expr = parseLiteral(parser, context);
      if (isValidStrictMode(parser, index, tokenIndex, tokenValue)) {
        context |= 1;
        if (parser.flags & 128) {
          throw new ParseError(tokenStart2, parser.currentLocation, 66);
        }
        if (parser.flags & 64) {
          throw new ParseError(tokenStart2, parser.currentLocation, 9);
        }
        if (parser.flags & 4096) {
          throw new ParseError(tokenStart2, parser.currentLocation, 15);
        }
        functionScope?.reportScopeError();
      }
      body.push(parseDirective(parser, context, expr, token, tokenStart2));
    }
    if (context & 1) {
      if (funcNameToken) {
        if ((funcNameToken & 537079808) === 537079808) {
          parser.report(119);
        }
        if ((funcNameToken & 36864) === 36864) {
          parser.report(40);
        }
      }
      if (parser.flags & 512)
        parser.report(119);
      if (parser.flags & 256)
        parser.report(118);
    }
  }
  parser.flags = (parser.flags | 512 | 256 | 64 | 4096) ^ (512 | 256 | 64 | 4096);
  parser.destructible = (parser.destructible | 256) ^ 256;
  while (parser.getToken() !== 1074790415) {
    body.push(parseStatementListItem(parser, context, scope, privateScope, 4, {}));
  }
  consume(parser, origin & (16 | 8) ? context | 32 : context, 1074790415);
  parser.flags &= -4289;
  if (parser.getToken() === 1077936155)
    parser.report(26);
  return parser.finishNode({
    type: "BlockStatement",
    body
  }, tokenStart);
}
function parseSuperExpression(parser, context) {
  const { tokenStart } = parser;
  nextToken(parser, context);
  switch (parser.getToken()) {
    case 67108990:
      parser.report(167);
    case 67174411: {
      if ((context & 512) === 0)
        parser.report(28);
      parser.assignable = 2;
      break;
    }
    case 69271571:
    case 67108877: {
      if ((context & 256) === 0)
        parser.report(29);
      parser.assignable = 1;
      break;
    }
    default:
      parser.report(30, "super");
  }
  return parser.finishNode({ type: "Super" }, tokenStart);
}
function parseLeftHandSideExpression(parser, context, privateScope, canAssign, inGroup, isLHS) {
  const start = parser.tokenStart;
  const expression = parsePrimaryExpression(parser, context, privateScope, 2, 0, canAssign, inGroup, isLHS, start);
  return parseMemberOrUpdateExpression(parser, context, privateScope, expression, inGroup, 0, start);
}
function parseUpdateExpression(parser, context, expr, start) {
  if (parser.assignable & 2)
    parser.report(55);
  const token = parser.getToken();
  nextToken(parser, context);
  parser.assignable = 2;
  return parser.finishNode({
    type: "UpdateExpression",
    argument: expr,
    operator: KeywordDescTable[token & 255],
    prefix: false
  }, start);
}
function parseMemberOrUpdateExpression(parser, context, privateScope, expr, inGroup, inChain, start) {
  if ((parser.getToken() & 33619968) === 33619968 && (parser.flags & 1) === 0) {
    expr = parseUpdateExpression(parser, context, expr, start);
  } else if ((parser.getToken() & 67108864) === 67108864) {
    context = (context | 131072) ^ 131072;
    switch (parser.getToken()) {
      case 67108877: {
        nextToken(parser, (context | 262144 | 8) ^ 8);
        if (context & 16 && parser.getToken() === 130 && parser.tokenValue === "super") {
          parser.report(173);
        }
        parser.assignable = 1;
        const property = parsePropertyOrPrivatePropertyName(parser, context | 64, privateScope);
        expr = parser.finishNode({
          type: "MemberExpression",
          object: expr,
          computed: false,
          property,
          optional: false
        }, start);
        break;
      }
      case 69271571: {
        let restoreHasOptionalChaining = false;
        if ((parser.flags & 2048) === 2048) {
          restoreHasOptionalChaining = true;
          parser.flags = (parser.flags | 2048) ^ 2048;
        }
        nextToken(parser, context | 32);
        const { tokenStart } = parser;
        const property = parseExpressions(parser, context, privateScope, inGroup, 1, tokenStart);
        consume(parser, context, 20);
        parser.assignable = 1;
        expr = parser.finishNode({
          type: "MemberExpression",
          object: expr,
          computed: true,
          property,
          optional: false
        }, start);
        if (restoreHasOptionalChaining) {
          parser.flags |= 2048;
        }
        break;
      }
      case 67174411: {
        if ((parser.flags & 1024) === 1024) {
          parser.flags = (parser.flags | 1024) ^ 1024;
          return expr;
        }
        let restoreHasOptionalChaining = false;
        if ((parser.flags & 2048) === 2048) {
          restoreHasOptionalChaining = true;
          parser.flags = (parser.flags | 2048) ^ 2048;
        }
        const args = parseArguments(parser, context, privateScope, inGroup);
        parser.assignable = 2;
        expr = parser.finishNode({
          type: "CallExpression",
          callee: expr,
          arguments: args,
          optional: false
        }, start);
        if (restoreHasOptionalChaining) {
          parser.flags |= 2048;
        }
        break;
      }
      case 67108990: {
        nextToken(parser, (context | 262144 | 8) ^ 8);
        parser.flags |= 2048;
        parser.assignable = 2;
        expr = parseOptionalChain(parser, context, privateScope, expr, start);
        break;
      }
      default:
        if ((parser.flags & 2048) === 2048) {
          parser.report(166);
        }
        parser.assignable = 2;
        expr = parser.finishNode({
          type: "TaggedTemplateExpression",
          tag: expr,
          quasi: parser.getToken() === 67174408 ? parseTemplate(parser, context | 64, privateScope) : parseTemplateLiteral(parser, context)
        }, start);
    }
    expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 0, 1, start);
  }
  if (inChain === 0 && (parser.flags & 2048) === 2048) {
    parser.flags = (parser.flags | 2048) ^ 2048;
    expr = parser.finishNode({
      type: "ChainExpression",
      expression: expr
    }, start);
  }
  return expr;
}
function parseOptionalChain(parser, context, privateScope, expr, start) {
  let restoreHasOptionalChaining = false;
  let node;
  if (parser.getToken() === 69271571 || parser.getToken() === 67174411) {
    if ((parser.flags & 2048) === 2048) {
      restoreHasOptionalChaining = true;
      parser.flags = (parser.flags | 2048) ^ 2048;
    }
  }
  if (parser.getToken() === 69271571) {
    nextToken(parser, context | 32);
    const { tokenStart } = parser;
    const property = parseExpressions(parser, context, privateScope, 0, 1, tokenStart);
    consume(parser, context, 20);
    parser.assignable = 2;
    node = parser.finishNode({
      type: "MemberExpression",
      object: expr,
      computed: true,
      optional: true,
      property
    }, start);
  } else if (parser.getToken() === 67174411) {
    const args = parseArguments(parser, context, privateScope, 0);
    parser.assignable = 2;
    node = parser.finishNode({
      type: "CallExpression",
      callee: expr,
      arguments: args,
      optional: true
    }, start);
  } else {
    const property = parsePropertyOrPrivatePropertyName(parser, context, privateScope);
    parser.assignable = 2;
    node = parser.finishNode({
      type: "MemberExpression",
      object: expr,
      computed: false,
      optional: true,
      property
    }, start);
  }
  if (restoreHasOptionalChaining) {
    parser.flags |= 2048;
  }
  return node;
}
function parsePropertyOrPrivatePropertyName(parser, context, privateScope) {
  if ((parser.getToken() & 143360) === 0 && parser.getToken() !== -2147483528 && parser.getToken() !== -2147483527 && parser.getToken() !== 130) {
    parser.report(160);
  }
  return parser.getToken() === 130 ? parsePrivateIdentifier(parser, context, privateScope, 0) : parseIdentifier(parser, context);
}
function parseUpdateExpressionPrefixed(parser, context, privateScope, inNew, isLHS, start) {
  if (inNew)
    parser.report(56);
  if (!isLHS)
    parser.report(0);
  const token = parser.getToken();
  nextToken(parser, context | 32);
  const arg = parseLeftHandSideExpression(parser, context, privateScope, 0, 0, 1);
  if (parser.assignable & 2) {
    parser.report(55);
  }
  parser.assignable = 2;
  return parser.finishNode({
    type: "UpdateExpression",
    argument: arg,
    operator: KeywordDescTable[token & 255],
    prefix: true
  }, start);
}
function parsePrimaryExpression(parser, context, privateScope, kind, inNew, canAssign, inGroup, isLHS, start) {
  if ((parser.getToken() & 143360) === 143360) {
    switch (parser.getToken()) {
      case 209006:
        return parseAwaitExpressionOrIdentifier(parser, context, privateScope, inNew, inGroup, start);
      case 241771:
        return parseYieldExpressionOrIdentifier(parser, context, privateScope, inGroup, canAssign, start);
      case 209005:
        return parseAsyncExpression(parser, context, privateScope, inGroup, isLHS, canAssign, inNew, start);
    }
    const { tokenValue } = parser;
    const token = parser.getToken();
    const expr = parseIdentifier(parser, context | 64);
    if (parser.getToken() === 10) {
      if (!isLHS)
        parser.report(0);
      classifyIdentifier(parser, context, token);
      if ((token & 36864) === 36864) {
        parser.flags |= 256;
      }
      return parseArrowFromIdentifier(parser, context, privateScope, tokenValue, expr, inNew, canAssign, 0, start);
    }
    if (context & 16 && !(context & 32768) && !(context & 8192) && parser.tokenValue === "arguments")
      parser.report(130);
    if ((token & 255) === (241737 & 255)) {
      if (context & 1)
        parser.report(113);
      if (kind & (8 | 16))
        parser.report(100);
    }
    parser.assignable = context & 1 && (token & 537079808) === 537079808 ? 2 : 1;
    return expr;
  }
  if ((parser.getToken() & 134217728) === 134217728) {
    return parseLiteral(parser, context);
  }
  switch (parser.getToken()) {
    case 33619993:
    case 33619994:
      return parseUpdateExpressionPrefixed(parser, context, privateScope, inNew, isLHS, start);
    case 16863276:
    case 16842798:
    case 16842799:
    case 25233968:
    case 25233969:
    case 16863275:
    case 16863277:
      return parseUnaryExpression(parser, context, privateScope, isLHS, inGroup);
    case 86104:
      return parseFunctionExpression(parser, context, privateScope, 0, inGroup, start);
    case 2162700:
      return parseObjectLiteral(parser, context, privateScope, canAssign ? 0 : 1, inGroup);
    case 69271571:
      return parseArrayLiteral(parser, context, privateScope, canAssign ? 0 : 1, inGroup);
    case 67174411:
      return parseParenthesizedExpression(parser, context | 64, privateScope, canAssign, 1, 0, start);
    case 86021:
    case 86022:
    case 86023:
      return parseNullOrTrueOrFalseLiteral(parser, context);
    case 86111:
      return parseThisExpression(parser, context);
    case 65540:
      return parseRegExpLiteral(parser, context);
    case 132:
    case 86094:
      return parseClassExpression(parser, context, privateScope, inGroup, start);
    case 86109:
      return parseSuperExpression(parser, context);
    case 67174409:
      return parseTemplateLiteral(parser, context);
    case 67174408:
      return parseTemplate(parser, context, privateScope);
    case 86107:
      return parseNewExpression(parser, context, privateScope, inGroup);
    case 134283388:
      return parseBigIntLiteral(parser, context);
    case 130:
      return parsePrivateIdentifier(parser, context, privateScope, 0);
    case 86106:
      return parseImportCallOrMetaExpression(parser, context, privateScope, inNew, inGroup, start);
    case 8456256:
      if (parser.options.jsx)
        return parseJSXRootElementOrFragment(parser, context, privateScope, 0, parser.tokenStart);
    default:
      if (isValidIdentifier(context, parser.getToken()))
        return parseIdentifierOrArrow(parser, context, privateScope);
      parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  }
}
function parseImportCallOrMetaExpression(parser, context, privateScope, inNew, inGroup, start) {
  let expr = parseIdentifier(parser, context);
  if (parser.getToken() === 67108877) {
    return parseImportMetaExpression(parser, context, expr, start);
  }
  if (inNew)
    parser.report(142);
  expr = parseImportExpression(parser, context, privateScope, inGroup, start);
  parser.assignable = 2;
  return parseMemberOrUpdateExpression(parser, context, privateScope, expr, inGroup, 0, start);
}
function parseImportMetaExpression(parser, context, meta, start) {
  if ((context & 2) === 0)
    parser.report(169);
  nextToken(parser, context);
  const token = parser.getToken();
  if (token !== 209030 && parser.tokenValue !== "meta") {
    parser.report(174);
  } else if (token & -2147483648) {
    parser.report(175);
  }
  parser.assignable = 2;
  return parser.finishNode({
    type: "MetaProperty",
    meta,
    property: parseIdentifier(parser, context)
  }, start);
}
function parseImportExpression(parser, context, privateScope, inGroup, start) {
  consume(parser, context | 32, 67174411);
  if (parser.getToken() === 14)
    parser.report(143);
  const source = parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart);
  let options = null;
  if (parser.getToken() === 18) {
    consume(parser, context, 18);
    if (parser.getToken() !== 16) {
      const expContext = (context | 131072) ^ 131072;
      options = parseExpression(parser, expContext, privateScope, 1, inGroup, parser.tokenStart);
    }
    consumeOpt(parser, context, 18);
  }
  const node = {
    type: "ImportExpression",
    source,
    options
  };
  consume(parser, context, 16);
  return parser.finishNode(node, start);
}
function parseImportAttributes(parser, context) {
  if (!consumeOpt(parser, context, 20579))
    return [];
  consume(parser, context, 2162700);
  const attributes = [];
  const keysContent = /* @__PURE__ */ new Set();
  while (parser.getToken() !== 1074790415) {
    const start = parser.tokenStart;
    const key = parseIdentifierOrStringLiteral(parser, context);
    consume(parser, context, 21);
    const value = parseStringLiteral(parser, context);
    const keyContent = key.type === "Literal" ? key.value : key.name;
    if (keysContent.has(keyContent)) {
      parser.report(145, `${keyContent}`);
    }
    keysContent.add(keyContent);
    attributes.push(parser.finishNode({
      type: "ImportAttribute",
      key,
      value
    }, start));
    if (parser.getToken() !== 1074790415) {
      consume(parser, context, 18);
    }
  }
  consume(parser, context, 1074790415);
  return attributes;
}
function parseStringLiteral(parser, context) {
  if (parser.getToken() === 134283267) {
    return parseLiteral(parser, context);
  } else {
    parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  }
}
function parseIdentifierOrStringLiteral(parser, context) {
  if (parser.getToken() === 134283267) {
    return parseLiteral(parser, context);
  } else if (parser.getToken() & 143360) {
    return parseIdentifier(parser, context);
  } else {
    parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  }
}
function validateStringWellFormed(parser, str) {
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const code = str.charCodeAt(i);
    if ((code & 64512) !== 55296)
      continue;
    if (code > 56319 || ++i >= len || (str.charCodeAt(i) & 64512) !== 56320) {
      parser.report(171, JSON.stringify(str.charAt(i--)));
    }
  }
}
function parseModuleExportName(parser, context) {
  if (parser.getToken() === 134283267) {
    validateStringWellFormed(parser, parser.tokenValue);
    return parseLiteral(parser, context);
  } else if (parser.getToken() & 143360) {
    return parseIdentifier(parser, context);
  } else {
    parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  }
}
function parseBigIntLiteral(parser, context) {
  const { tokenRaw, tokenValue, tokenStart } = parser;
  nextToken(parser, context);
  parser.assignable = 2;
  const node = {
    type: "Literal",
    value: tokenValue,
    bigint: String(tokenValue)
  };
  if (parser.options.raw) {
    node.raw = tokenRaw;
  }
  return parser.finishNode(node, tokenStart);
}
function parseTemplateLiteral(parser, context) {
  parser.assignable = 2;
  const { tokenValue, tokenRaw, tokenStart } = parser;
  consume(parser, context, 67174409);
  const quasis = [parseTemplateElement(parser, tokenValue, tokenRaw, tokenStart, true)];
  return parser.finishNode({
    type: "TemplateLiteral",
    expressions: [],
    quasis
  }, tokenStart);
}
function parseTemplate(parser, context, privateScope) {
  context = (context | 131072) ^ 131072;
  const { tokenValue, tokenRaw, tokenStart } = parser;
  consume(parser, context & -65 | 32, 67174408);
  const quasis = [parseTemplateElement(parser, tokenValue, tokenRaw, tokenStart, false)];
  const expressions = [
    parseExpressions(parser, context & -65, privateScope, 0, 1, parser.tokenStart)
  ];
  if (parser.getToken() !== 1074790415)
    parser.report(83);
  while (parser.setToken(scanTemplateTail(parser, context), true) !== 67174409) {
    const { tokenValue: tokenValue2, tokenRaw: tokenRaw2, tokenStart: tokenStart2 } = parser;
    consume(parser, context & -65 | 32, 67174408);
    quasis.push(parseTemplateElement(parser, tokenValue2, tokenRaw2, tokenStart2, false));
    expressions.push(parseExpressions(parser, context, privateScope, 0, 1, parser.tokenStart));
    if (parser.getToken() !== 1074790415)
      parser.report(83);
  }
  {
    const { tokenValue: tokenValue2, tokenRaw: tokenRaw2, tokenStart: tokenStart2 } = parser;
    consume(parser, context, 67174409);
    quasis.push(parseTemplateElement(parser, tokenValue2, tokenRaw2, tokenStart2, true));
  }
  return parser.finishNode({
    type: "TemplateLiteral",
    expressions,
    quasis
  }, tokenStart);
}
function parseTemplateElement(parser, cooked, raw, start, tail) {
  const node = parser.finishNode({
    type: "TemplateElement",
    value: {
      cooked,
      raw
    },
    tail
  }, start);
  const tailSize = tail ? 1 : 2;
  if (parser.options.ranges) {
    node.start += 1;
    node.range[0] += 1;
    node.end -= tailSize;
    node.range[1] -= tailSize;
  }
  if (parser.options.loc) {
    node.loc.start.column += 1;
    node.loc.end.column -= tailSize;
  }
  return node;
}
function parseSpreadElement(parser, context, privateScope) {
  const start = parser.tokenStart;
  context = (context | 131072) ^ 131072;
  consume(parser, context | 32, 14);
  const argument = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
  parser.assignable = 1;
  return parser.finishNode({
    type: "SpreadElement",
    argument
  }, start);
}
function parseArguments(parser, context, privateScope, inGroup) {
  nextToken(parser, context | 32);
  const args = [];
  if (parser.getToken() === 16) {
    nextToken(parser, context | 64);
    return args;
  }
  while (parser.getToken() !== 16) {
    if (parser.getToken() === 14) {
      args.push(parseSpreadElement(parser, context, privateScope));
    } else {
      args.push(parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart));
    }
    if (parser.getToken() !== 18)
      break;
    nextToken(parser, context | 32);
    if (parser.getToken() === 16)
      break;
  }
  consume(parser, context | 64, 16);
  return args;
}
function parseIdentifier(parser, context) {
  const { tokenValue, tokenStart } = parser;
  const allowRegex = tokenValue === "await" && (parser.getToken() & -2147483648) === 0;
  nextToken(parser, context | (allowRegex ? 32 : 0));
  return parser.finishNode({
    type: "Identifier",
    name: tokenValue
  }, tokenStart);
}
function parseLiteral(parser, context) {
  const { tokenValue, tokenRaw, tokenStart } = parser;
  if (parser.getToken() === 134283388) {
    return parseBigIntLiteral(parser, context);
  }
  nextToken(parser, context);
  parser.assignable = 2;
  return parser.finishNode(parser.options.raw ? {
    type: "Literal",
    value: tokenValue,
    raw: tokenRaw
  } : {
    type: "Literal",
    value: tokenValue
  }, tokenStart);
}
function parseNullOrTrueOrFalseLiteral(parser, context) {
  const start = parser.tokenStart;
  const raw = KeywordDescTable[parser.getToken() & 255];
  const value = parser.getToken() === 86023 ? null : raw === "true";
  nextToken(parser, context);
  parser.assignable = 2;
  return parser.finishNode(parser.options.raw ? {
    type: "Literal",
    value,
    raw
  } : {
    type: "Literal",
    value
  }, start);
}
function parseThisExpression(parser, context) {
  const { tokenStart } = parser;
  nextToken(parser, context);
  parser.assignable = 2;
  return parser.finishNode({
    type: "ThisExpression"
  }, tokenStart);
}
function parseFunctionDeclaration(parser, context, scope, privateScope, origin, allowGen, flags, isAsync, start) {
  nextToken(parser, context | 32);
  const isGenerator = allowGen ? optionalBit(parser, context, 8391476) : 0;
  let id = null;
  let funcNameToken;
  let functionScope = scope ? parser.createScope() : void 0;
  if (parser.getToken() === 67174411) {
    if ((flags & 1) === 0)
      parser.report(39, "Function");
  } else {
    const kind = origin & 4 && ((context & 8) === 0 || (context & 2) === 0) ? 4 : 64 | (isAsync ? 1024 : 0) | (isGenerator ? 1024 : 0);
    validateFunctionName(parser, context, parser.getToken());
    if (scope) {
      if (kind & 4) {
        scope.addVarName(context, parser.tokenValue, kind);
      } else {
        scope.addBlockName(context, parser.tokenValue, kind, origin);
      }
      functionScope = functionScope?.createChildScope(128);
      if (flags) {
        if (flags & 2) {
          parser.declareUnboundVariable(parser.tokenValue);
        }
      }
    }
    funcNameToken = parser.getToken();
    if (parser.getToken() & 143360) {
      id = parseIdentifier(parser, context);
    } else {
      parser.report(30, KeywordDescTable[parser.getToken() & 255]);
    }
  }
  {
    const modifierFlags2 = 256 | 512 | 1024 | 2048 | 8192 | 16384;
    context = (context | modifierFlags2) ^ modifierFlags2 | 65536 | (isAsync ? 2048 : 0) | (isGenerator ? 1024 : 0) | (isGenerator ? 0 : 262144);
  }
  functionScope = functionScope?.createChildScope(256);
  const params = parseFormalParametersOrFormalList(parser, (context | 8192) & -524289, functionScope, privateScope, 0, 1);
  const modifierFlags = 8 | 4 | 128 | 524288;
  const body = parseFunctionBody(parser, (context | modifierFlags) ^ modifierFlags | 32768 | 4096, functionScope?.createChildScope(64), privateScope, 8, funcNameToken, functionScope);
  return parser.finishNode({
    type: "FunctionDeclaration",
    id,
    params,
    body,
    async: isAsync === 1,
    generator: isGenerator === 1
  }, start);
}
function parseFunctionExpression(parser, context, privateScope, isAsync, inGroup, start) {
  nextToken(parser, context | 32);
  const isGenerator = optionalBit(parser, context, 8391476);
  const generatorAndAsyncFlags = (isAsync ? 2048 : 0) | (isGenerator ? 1024 : 0);
  let id = null;
  let funcNameToken;
  let scope = parser.createScopeIfLexical();
  const modifierFlags = 256 | 512 | 1024 | 2048 | 8192 | 16384 | 524288;
  if (parser.getToken() & 143360) {
    validateFunctionName(parser, (context | modifierFlags) ^ modifierFlags | generatorAndAsyncFlags, parser.getToken());
    scope = scope?.createChildScope(128);
    funcNameToken = parser.getToken();
    id = parseIdentifier(parser, context);
  }
  context = (context | modifierFlags) ^ modifierFlags | 65536 | generatorAndAsyncFlags | (isGenerator ? 0 : 262144);
  scope = scope?.createChildScope(256);
  const params = parseFormalParametersOrFormalList(parser, (context | 8192) & -524289, scope, privateScope, inGroup, 1);
  const body = parseFunctionBody(parser, context & -131229 | 32768 | 4096, scope?.createChildScope(64), privateScope, 0, funcNameToken, scope);
  parser.assignable = 2;
  return parser.finishNode({
    type: "FunctionExpression",
    id,
    params,
    body,
    async: isAsync === 1,
    generator: isGenerator === 1
  }, start);
}
function parseArrayLiteral(parser, context, privateScope, skipInitializer, inGroup) {
  const expr = parseArrayExpressionOrPattern(parser, context, void 0, privateScope, skipInitializer, inGroup, 0, 2, 0);
  if (parser.destructible & 64) {
    parser.report(63);
  }
  if (parser.destructible & 8) {
    parser.report(62);
  }
  return expr;
}
function parseArrayExpressionOrPattern(parser, context, scope, privateScope, skipInitializer, inGroup, isPattern, kind, origin) {
  const { tokenStart: start } = parser;
  nextToken(parser, context | 32);
  const elements = [];
  let destructible = 0;
  context = (context | 131072) ^ 131072;
  while (parser.getToken() !== 20) {
    if (consumeOpt(parser, context | 32, 18)) {
      elements.push(null);
    } else {
      let left;
      const { tokenStart, tokenValue } = parser;
      const token = parser.getToken();
      if (token & 143360) {
        left = parsePrimaryExpression(parser, context, privateScope, kind, 0, 1, inGroup, 1, tokenStart);
        if (parser.getToken() === 1077936155) {
          if (parser.assignable & 2)
            parser.report(26);
          nextToken(parser, context | 32);
          scope?.addVarOrBlock(context, tokenValue, kind, origin);
          const right = parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart);
          left = parser.finishNode(isPattern ? {
            type: "AssignmentPattern",
            left,
            right
          } : {
            type: "AssignmentExpression",
            operator: "=",
            left,
            right
          }, tokenStart);
          destructible |= parser.destructible & 256 ? 256 : 0 | parser.destructible & 128 ? 128 : 0;
        } else if (parser.getToken() === 18 || parser.getToken() === 20) {
          if (parser.assignable & 2) {
            destructible |= 16;
          } else {
            scope?.addVarOrBlock(context, tokenValue, kind, origin);
          }
          destructible |= parser.destructible & 256 ? 256 : 0 | parser.destructible & 128 ? 128 : 0;
        } else {
          destructible |= kind & 1 ? 32 : (kind & 2) === 0 ? 16 : 0;
          left = parseMemberOrUpdateExpression(parser, context, privateScope, left, inGroup, 0, tokenStart);
          if (parser.getToken() !== 18 && parser.getToken() !== 20) {
            if (parser.getToken() !== 1077936155)
              destructible |= 16;
            left = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart, left);
          } else if (parser.getToken() !== 1077936155) {
            destructible |= parser.assignable & 2 ? 16 : 32;
          }
        }
      } else if (token & 2097152) {
        left = parser.getToken() === 2162700 ? parseObjectLiteralOrPattern(parser, context, scope, privateScope, 0, inGroup, isPattern, kind, origin) : parseArrayExpressionOrPattern(parser, context, scope, privateScope, 0, inGroup, isPattern, kind, origin);
        destructible |= parser.destructible;
        parser.assignable = parser.destructible & 16 ? 2 : 1;
        if (parser.getToken() === 18 || parser.getToken() === 20) {
          if (parser.assignable & 2) {
            destructible |= 16;
          }
        } else if (parser.destructible & 8) {
          parser.report(71);
        } else {
          left = parseMemberOrUpdateExpression(parser, context, privateScope, left, inGroup, 0, tokenStart);
          destructible = parser.assignable & 2 ? 16 : 0;
          if (parser.getToken() !== 18 && parser.getToken() !== 20) {
            left = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart, left);
          } else if (parser.getToken() !== 1077936155) {
            destructible |= parser.assignable & 2 ? 16 : 32;
          }
        }
      } else if (token === 14) {
        left = parseSpreadOrRestElement(parser, context, scope, privateScope, 20, kind, origin, 0, inGroup, isPattern);
        destructible |= parser.destructible;
        if (parser.getToken() !== 18 && parser.getToken() !== 20)
          parser.report(30, KeywordDescTable[parser.getToken() & 255]);
      } else {
        left = parseLeftHandSideExpression(parser, context, privateScope, 1, 0, 1);
        if (parser.getToken() !== 18 && parser.getToken() !== 20) {
          left = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart, left);
          if ((kind & (2 | 1)) === 0 && token === 67174411)
            destructible |= 16;
        } else if (parser.assignable & 2) {
          destructible |= 16;
        } else if (token === 67174411) {
          destructible |= parser.assignable & 1 && kind & (2 | 1) ? 32 : 16;
        }
      }
      elements.push(left);
      if (consumeOpt(parser, context | 32, 18)) {
        if (parser.getToken() === 20)
          break;
      } else
        break;
    }
  }
  consume(parser, context, 20);
  const node = parser.finishNode({
    type: isPattern ? "ArrayPattern" : "ArrayExpression",
    elements
  }, start);
  if (!skipInitializer && parser.getToken() & 4194304) {
    return parseArrayOrObjectAssignmentPattern(parser, context, privateScope, destructible, inGroup, isPattern, start, node);
  }
  parser.destructible = destructible;
  return node;
}
function parseArrayOrObjectAssignmentPattern(parser, context, privateScope, destructible, inGroup, isPattern, start, node) {
  if (parser.getToken() !== 1077936155)
    parser.report(26);
  nextToken(parser, context | 32);
  if (destructible & 16)
    parser.report(26);
  if (!isPattern)
    reinterpretToPattern(parser, node);
  const { tokenStart } = parser;
  const right = parseExpression(parser, context, privateScope, 1, inGroup, tokenStart);
  parser.destructible = (destructible | 64 | 8) ^ (8 | 64) | (parser.destructible & 128 ? 128 : 0) | (parser.destructible & 256 ? 256 : 0);
  return parser.finishNode(isPattern ? {
    type: "AssignmentPattern",
    left: node,
    right
  } : {
    type: "AssignmentExpression",
    left: node,
    operator: "=",
    right
  }, start);
}
function parseSpreadOrRestElement(parser, context, scope, privateScope, closingToken, kind, origin, isAsync, inGroup, isPattern) {
  const { tokenStart: start } = parser;
  nextToken(parser, context | 32);
  let argument = null;
  let destructible = 0;
  const { tokenValue, tokenStart } = parser;
  let token = parser.getToken();
  if (token & 143360) {
    parser.assignable = 1;
    argument = parsePrimaryExpression(parser, context, privateScope, kind, 0, 1, inGroup, 1, tokenStart);
    token = parser.getToken();
    argument = parseMemberOrUpdateExpression(parser, context, privateScope, argument, inGroup, 0, tokenStart);
    if (parser.getToken() !== 18 && parser.getToken() !== closingToken) {
      if (parser.assignable & 2 && parser.getToken() === 1077936155)
        parser.report(71);
      destructible |= 16;
      argument = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart, argument);
    }
    if (parser.assignable & 2) {
      destructible |= 16;
    } else if (token === closingToken || token === 18) {
      scope?.addVarOrBlock(context, tokenValue, kind, origin);
    } else {
      destructible |= 32;
    }
    destructible |= parser.destructible & 128 ? 128 : 0;
  } else if (token === closingToken) {
    parser.report(41);
  } else if (token & 2097152) {
    argument = parser.getToken() === 2162700 ? parseObjectLiteralOrPattern(parser, context, scope, privateScope, 1, inGroup, isPattern, kind, origin) : parseArrayExpressionOrPattern(parser, context, scope, privateScope, 1, inGroup, isPattern, kind, origin);
    token = parser.getToken();
    if (token !== 1077936155 && token !== closingToken && token !== 18) {
      if (parser.destructible & 8)
        parser.report(71);
      argument = parseMemberOrUpdateExpression(parser, context, privateScope, argument, inGroup, 0, tokenStart);
      destructible |= parser.assignable & 2 ? 16 : 0;
      if ((parser.getToken() & 4194304) === 4194304) {
        if (parser.getToken() !== 1077936155)
          destructible |= 16;
        argument = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart, argument);
      } else {
        if ((parser.getToken() & 8388608) === 8388608) {
          argument = parseBinaryExpression(parser, context, privateScope, 1, tokenStart, 4, token, argument);
        }
        if (consumeOpt(parser, context | 32, 22)) {
          argument = parseConditionalExpression(parser, context, privateScope, argument, tokenStart);
        }
        destructible |= parser.assignable & 2 ? 16 : 32;
      }
    } else {
      destructible |= closingToken === 1074790415 && token !== 1077936155 ? 16 : parser.destructible;
    }
  } else {
    destructible |= 32;
    argument = parseLeftHandSideExpression(parser, context, privateScope, 1, inGroup, 1);
    const { tokenStart: tokenStart2 } = parser;
    const token2 = parser.getToken();
    if (token2 === 1077936155) {
      if (parser.assignable & 2)
        parser.report(26);
      argument = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, argument);
      destructible |= 16;
    } else {
      if (token2 === 18) {
        destructible |= 16;
      } else if (token2 !== closingToken) {
        argument = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, argument);
      }
      destructible |= parser.assignable & 1 ? 32 : 16;
    }
    parser.destructible = destructible;
    if (parser.getToken() !== closingToken && parser.getToken() !== 18)
      parser.report(161);
    return parser.finishNode({
      type: isPattern ? "RestElement" : "SpreadElement",
      argument
    }, start);
  }
  if (parser.getToken() !== closingToken) {
    if (kind & 1)
      destructible |= isAsync ? 16 : 32;
    if (consumeOpt(parser, context | 32, 1077936155)) {
      if (destructible & 16)
        parser.report(26);
      reinterpretToPattern(parser, argument);
      const right = parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart);
      argument = parser.finishNode(isPattern ? {
        type: "AssignmentPattern",
        left: argument,
        right
      } : {
        type: "AssignmentExpression",
        left: argument,
        operator: "=",
        right
      }, tokenStart);
      destructible = 16;
    } else {
      destructible |= 16;
    }
  }
  parser.destructible = destructible;
  return parser.finishNode({
    type: isPattern ? "RestElement" : "SpreadElement",
    argument
  }, start);
}
function parseMethodDefinition(parser, context, privateScope, kind, inGroup, start) {
  const modifierFlags = 1024 | 2048 | 8192 | ((kind & 64) === 0 ? 512 | 16384 : 0);
  context = (context | modifierFlags) ^ modifierFlags | (kind & 8 ? 1024 : 0) | (kind & 16 ? 2048 : 0) | (kind & 64 ? 16384 : 0) | 256 | 32768 | 65536;
  let scope = parser.createScopeIfLexical(256);
  const params = parseMethodFormals(parser, (context | 8192) & -524289, scope, privateScope, kind, 1, inGroup);
  scope = scope?.createChildScope(64);
  const body = parseFunctionBody(parser, context & -655373 | 32768 | 4096, scope, privateScope, 0, void 0, scope?.parent);
  return parser.finishNode({
    type: "FunctionExpression",
    params,
    body,
    async: (kind & 16) > 0,
    generator: (kind & 8) > 0,
    id: null
  }, start);
}
function parseObjectLiteral(parser, context, privateScope, skipInitializer, inGroup) {
  const expr = parseObjectLiteralOrPattern(parser, context, void 0, privateScope, skipInitializer, inGroup, 0, 2, 0);
  if (parser.destructible & 64) {
    parser.report(63);
  }
  if (parser.destructible & 8) {
    parser.report(62);
  }
  return expr;
}
function parseObjectLiteralOrPattern(parser, context, scope, privateScope, skipInitializer, inGroup, isPattern, kind, origin) {
  const { tokenStart: start } = parser;
  nextToken(parser, context);
  const properties = [];
  let destructible = 0;
  let prototypeCount = 0;
  context = (context | 131072) ^ 131072;
  while (parser.getToken() !== 1074790415) {
    const { tokenValue, tokenStart } = parser;
    const token = parser.getToken();
    if (token === 14) {
      properties.push(parseSpreadOrRestElement(parser, context, scope, privateScope, 1074790415, kind, origin, 0, inGroup, isPattern));
    } else {
      let state = 0;
      let key = null;
      let value;
      if (parser.getToken() & 143360 || parser.getToken() === -2147483528 || parser.getToken() === -2147483527) {
        if (parser.getToken() === -2147483527)
          destructible |= 16;
        key = parseIdentifier(parser, context);
        if (parser.getToken() === 18 || parser.getToken() === 1074790415 || parser.getToken() === 1077936155) {
          state |= 4;
          if (context & 1 && (token & 537079808) === 537079808) {
            destructible |= 16;
          } else {
            validateBindingIdentifier(parser, context, kind, token, 0);
          }
          scope?.addVarOrBlock(context, tokenValue, kind, origin);
          if (consumeOpt(parser, context | 32, 1077936155)) {
            destructible |= 8;
            const right = parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart);
            destructible |= parser.destructible & 256 ? 256 : 0 | parser.destructible & 128 ? 128 : 0;
            value = parser.finishNode({
              type: "AssignmentPattern",
              left: parser.options.uniqueKeyInPattern ? Object.assign({}, key) : key,
              right
            }, tokenStart);
          } else {
            destructible |= (token === 209006 ? 128 : 0) | (token === -2147483528 ? 16 : 0);
            value = parser.options.uniqueKeyInPattern ? Object.assign({}, key) : key;
          }
        } else if (consumeOpt(parser, context | 32, 21)) {
          const { tokenStart: tokenStart2 } = parser;
          if (tokenValue === "__proto__")
            prototypeCount++;
          if (parser.getToken() & 143360) {
            const tokenAfterColon = parser.getToken();
            const valueAfterColon = parser.tokenValue;
            value = parsePrimaryExpression(parser, context, privateScope, kind, 0, 1, inGroup, 1, tokenStart2);
            const token2 = parser.getToken();
            value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
            if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (token2 === 1077936155 || token2 === 1074790415 || token2 === 18) {
                destructible |= parser.destructible & 128 ? 128 : 0;
                if (parser.assignable & 2) {
                  destructible |= 16;
                } else if ((tokenAfterColon & 143360) === 143360) {
                  scope?.addVarOrBlock(context, valueAfterColon, kind, origin);
                }
              } else {
                destructible |= parser.assignable & 1 ? 32 : 16;
              }
            } else if ((parser.getToken() & 4194304) === 4194304) {
              if (parser.assignable & 2) {
                destructible |= 16;
              } else if (token2 !== 1077936155) {
                destructible |= 32;
              } else {
                scope?.addVarOrBlock(context, valueAfterColon, kind, origin);
              }
              value = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
            } else {
              destructible |= 16;
              if ((parser.getToken() & 8388608) === 8388608) {
                value = parseBinaryExpression(parser, context, privateScope, 1, tokenStart2, 4, token2, value);
              }
              if (consumeOpt(parser, context | 32, 22)) {
                value = parseConditionalExpression(parser, context, privateScope, value, tokenStart2);
              }
            }
          } else if ((parser.getToken() & 2097152) === 2097152) {
            value = parser.getToken() === 69271571 ? parseArrayExpressionOrPattern(parser, context, scope, privateScope, 0, inGroup, isPattern, kind, origin) : parseObjectLiteralOrPattern(parser, context, scope, privateScope, 0, inGroup, isPattern, kind, origin);
            destructible = parser.destructible;
            parser.assignable = destructible & 16 ? 2 : 1;
            if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (parser.assignable & 2)
                destructible |= 16;
            } else if (parser.destructible & 8) {
              parser.report(71);
            } else {
              value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
              destructible = parser.assignable & 2 ? 16 : 0;
              if ((parser.getToken() & 4194304) === 4194304) {
                value = parseAssignmentExpressionOrPattern(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
              } else {
                if ((parser.getToken() & 8388608) === 8388608) {
                  value = parseBinaryExpression(parser, context, privateScope, 1, tokenStart2, 4, token, value);
                }
                if (consumeOpt(parser, context | 32, 22)) {
                  value = parseConditionalExpression(parser, context, privateScope, value, tokenStart2);
                }
                destructible |= parser.assignable & 2 ? 16 : 32;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, privateScope, 1, inGroup, 1);
            destructible |= parser.assignable & 1 ? 32 : 16;
            if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (parser.assignable & 2)
                destructible |= 16;
            } else {
              value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
              destructible = parser.assignable & 2 ? 16 : 0;
              if (parser.getToken() !== 18 && token !== 1074790415) {
                if (parser.getToken() !== 1077936155)
                  destructible |= 16;
                value = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
              }
            }
          }
        } else if (parser.getToken() === 69271571) {
          destructible |= 16;
          if (token === 209005)
            state |= 16;
          state |= (token === 209008 ? 256 : token === 209009 ? 512 : 1) | 2;
          key = parseComputedPropertyName(parser, context, privateScope, inGroup);
          destructible |= parser.assignable;
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
        } else if (parser.getToken() & 143360) {
          destructible |= 16;
          if (token === -2147483528)
            parser.report(95);
          if (token === 209005) {
            if (parser.flags & 1)
              parser.report(132);
            state |= 16 | 1;
          } else if (token === 209008) {
            state |= 256;
          } else if (token === 209009) {
            state |= 512;
          } else {
            parser.report(0);
          }
          key = parseIdentifier(parser, context);
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
        } else if (parser.getToken() === 67174411) {
          destructible |= 16;
          state |= 1;
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
        } else if (parser.getToken() === 8391476) {
          destructible |= 16;
          if (token === 209008) {
            parser.report(42);
          } else if (token === 209009) {
            parser.report(43);
          } else if (token !== 209005) {
            parser.report(30, KeywordDescTable[8391476 & 255]);
          }
          nextToken(parser, context);
          state |= 8 | 1 | (token === 209005 ? 16 : 0);
          if (parser.getToken() & 143360) {
            key = parseIdentifier(parser, context);
          } else if ((parser.getToken() & 134217728) === 134217728) {
            key = parseLiteral(parser, context);
          } else if (parser.getToken() === 69271571) {
            state |= 2;
            key = parseComputedPropertyName(parser, context, privateScope, inGroup);
            destructible |= parser.assignable;
          } else {
            parser.report(30, KeywordDescTable[parser.getToken() & 255]);
          }
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
        } else if ((parser.getToken() & 134217728) === 134217728) {
          if (token === 209005)
            state |= 16;
          state |= token === 209008 ? 256 : token === 209009 ? 512 : 1;
          destructible |= 16;
          key = parseLiteral(parser, context);
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
        } else {
          parser.report(133);
        }
      } else if ((parser.getToken() & 134217728) === 134217728) {
        key = parseLiteral(parser, context);
        if (parser.getToken() === 21) {
          consume(parser, context | 32, 21);
          const { tokenStart: tokenStart2 } = parser;
          if (tokenValue === "__proto__")
            prototypeCount++;
          if (parser.getToken() & 143360) {
            value = parsePrimaryExpression(parser, context, privateScope, kind, 0, 1, inGroup, 1, tokenStart2);
            const { tokenValue: valueAfterColon } = parser;
            const token2 = parser.getToken();
            value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
            if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (token2 === 1077936155 || token2 === 1074790415 || token2 === 18) {
                if (parser.assignable & 2) {
                  destructible |= 16;
                } else {
                  scope?.addVarOrBlock(context, valueAfterColon, kind, origin);
                }
              } else {
                destructible |= parser.assignable & 1 ? 32 : 16;
              }
            } else if (parser.getToken() === 1077936155) {
              if (parser.assignable & 2)
                destructible |= 16;
              value = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
            } else {
              destructible |= 16;
              value = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
            }
          } else if ((parser.getToken() & 2097152) === 2097152) {
            value = parser.getToken() === 69271571 ? parseArrayExpressionOrPattern(parser, context, scope, privateScope, 0, inGroup, isPattern, kind, origin) : parseObjectLiteralOrPattern(parser, context, scope, privateScope, 0, inGroup, isPattern, kind, origin);
            destructible = parser.destructible;
            parser.assignable = destructible & 16 ? 2 : 1;
            if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (parser.assignable & 2) {
                destructible |= 16;
              }
            } else if ((parser.destructible & 8) !== 8) {
              value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
              destructible = parser.assignable & 2 ? 16 : 0;
              if ((parser.getToken() & 4194304) === 4194304) {
                value = parseAssignmentExpressionOrPattern(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
              } else {
                if ((parser.getToken() & 8388608) === 8388608) {
                  value = parseBinaryExpression(parser, context, privateScope, 1, tokenStart2, 4, token, value);
                }
                if (consumeOpt(parser, context | 32, 22)) {
                  value = parseConditionalExpression(parser, context, privateScope, value, tokenStart2);
                }
                destructible |= parser.assignable & 2 ? 16 : 32;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, privateScope, 1, 0, 1);
            destructible |= parser.assignable & 1 ? 32 : 16;
            if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (parser.assignable & 2) {
                destructible |= 16;
              }
            } else {
              value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
              destructible = parser.assignable & 1 ? 0 : 16;
              if (parser.getToken() !== 18 && parser.getToken() !== 1074790415) {
                if (parser.getToken() !== 1077936155)
                  destructible |= 16;
                value = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
              }
            }
          }
        } else if (parser.getToken() === 67174411) {
          state |= 1;
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
          destructible = parser.assignable | 16;
        } else {
          parser.report(134);
        }
      } else if (parser.getToken() === 69271571) {
        key = parseComputedPropertyName(parser, context, privateScope, inGroup);
        destructible |= parser.destructible & 256 ? 256 : 0;
        state |= 2;
        if (parser.getToken() === 21) {
          nextToken(parser, context | 32);
          const { tokenStart: tokenStart2, tokenValue: tokenValue2 } = parser;
          const tokenAfterColon = parser.getToken();
          if (parser.getToken() & 143360) {
            value = parsePrimaryExpression(parser, context, privateScope, kind, 0, 1, inGroup, 1, tokenStart2);
            const token2 = parser.getToken();
            value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
            if ((parser.getToken() & 4194304) === 4194304) {
              destructible |= parser.assignable & 2 ? 16 : token2 === 1077936155 ? 0 : 32;
              value = parseAssignmentExpressionOrPattern(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
            } else if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (token2 === 1077936155 || token2 === 1074790415 || token2 === 18) {
                if (parser.assignable & 2) {
                  destructible |= 16;
                } else if ((tokenAfterColon & 143360) === 143360) {
                  scope?.addVarOrBlock(context, tokenValue2, kind, origin);
                }
              } else {
                destructible |= parser.assignable & 1 ? 32 : 16;
              }
            } else {
              destructible |= 16;
              value = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
            }
          } else if ((parser.getToken() & 2097152) === 2097152) {
            value = parser.getToken() === 69271571 ? parseArrayExpressionOrPattern(parser, context, scope, privateScope, 0, inGroup, isPattern, kind, origin) : parseObjectLiteralOrPattern(parser, context, scope, privateScope, 0, inGroup, isPattern, kind, origin);
            destructible = parser.destructible;
            parser.assignable = destructible & 16 ? 2 : 1;
            if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (parser.assignable & 2)
                destructible |= 16;
            } else if (destructible & 8) {
              parser.report(62);
            } else {
              value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
              destructible = parser.assignable & 2 ? destructible | 16 : 0;
              if ((parser.getToken() & 4194304) === 4194304) {
                if (parser.getToken() !== 1077936155)
                  destructible |= 16;
                value = parseAssignmentExpressionOrPattern(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
              } else {
                if ((parser.getToken() & 8388608) === 8388608) {
                  value = parseBinaryExpression(parser, context, privateScope, 1, tokenStart2, 4, token, value);
                }
                if (consumeOpt(parser, context | 32, 22)) {
                  value = parseConditionalExpression(parser, context, privateScope, value, tokenStart2);
                }
                destructible |= parser.assignable & 2 ? 16 : 32;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, privateScope, 1, 0, 1);
            destructible |= parser.assignable & 1 ? 32 : 16;
            if (parser.getToken() === 18 || parser.getToken() === 1074790415) {
              if (parser.assignable & 2)
                destructible |= 16;
            } else {
              value = parseMemberOrUpdateExpression(parser, context, privateScope, value, inGroup, 0, tokenStart2);
              destructible = parser.assignable & 1 ? 0 : 16;
              if (parser.getToken() !== 18 && parser.getToken() !== 1074790415) {
                if (parser.getToken() !== 1077936155)
                  destructible |= 16;
                value = parseAssignmentExpression(parser, context, privateScope, inGroup, isPattern, tokenStart2, value);
              }
            }
          }
        } else if (parser.getToken() === 67174411) {
          state |= 1;
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
          destructible = 16;
        } else {
          parser.report(44);
        }
      } else if (token === 8391476) {
        consume(parser, context | 32, 8391476);
        state |= 8;
        if (parser.getToken() & 143360) {
          const token2 = parser.getToken();
          key = parseIdentifier(parser, context);
          state |= 1;
          if (parser.getToken() === 67174411) {
            destructible |= 16;
            value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
          } else {
            throw new ParseError(parser.tokenStart, parser.currentLocation, token2 === 209005 ? 46 : token2 === 209008 || parser.getToken() === 209009 ? 45 : 47, KeywordDescTable[token2 & 255]);
          }
        } else if ((parser.getToken() & 134217728) === 134217728) {
          destructible |= 16;
          key = parseLiteral(parser, context);
          state |= 1;
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
        } else if (parser.getToken() === 69271571) {
          destructible |= 16;
          state |= 2 | 1;
          key = parseComputedPropertyName(parser, context, privateScope, inGroup);
          value = parseMethodDefinition(parser, context, privateScope, state, inGroup, parser.tokenStart);
        } else {
          parser.report(126);
        }
      } else {
        parser.report(30, KeywordDescTable[token & 255]);
      }
      destructible |= parser.destructible & 128 ? 128 : 0;
      parser.destructible = destructible;
      properties.push(parser.finishNode({
        type: "Property",
        key,
        value,
        kind: !(state & 768) ? "init" : state & 512 ? "set" : "get",
        computed: (state & 2) > 0,
        method: (state & 1) > 0,
        shorthand: (state & 4) > 0
      }, tokenStart));
    }
    destructible |= parser.destructible;
    if (parser.getToken() !== 18)
      break;
    nextToken(parser, context);
  }
  consume(parser, context, 1074790415);
  if (prototypeCount > 1)
    destructible |= 64;
  const node = parser.finishNode({
    type: isPattern ? "ObjectPattern" : "ObjectExpression",
    properties
  }, start);
  if (!skipInitializer && parser.getToken() & 4194304) {
    return parseArrayOrObjectAssignmentPattern(parser, context, privateScope, destructible, inGroup, isPattern, start, node);
  }
  parser.destructible = destructible;
  return node;
}
function parseMethodFormals(parser, context, scope, privateScope, kind, type, inGroup) {
  consume(parser, context, 67174411);
  const params = [];
  parser.flags = (parser.flags | 128) ^ 128;
  if (parser.getToken() === 16) {
    if (kind & 512) {
      parser.report(37, "Setter", "one", "");
    }
    nextToken(parser, context);
    return params;
  }
  if (kind & 256) {
    parser.report(37, "Getter", "no", "s");
  }
  if (kind & 512 && parser.getToken() === 14) {
    parser.report(38);
  }
  context = (context | 131072) ^ 131072;
  let setterArgs = 0;
  let isNonSimpleParameterList = 0;
  while (parser.getToken() !== 18) {
    let left = null;
    const { tokenStart } = parser;
    if (parser.getToken() & 143360) {
      if ((context & 1) === 0) {
        if ((parser.getToken() & 36864) === 36864) {
          parser.flags |= 256;
        }
        if ((parser.getToken() & 537079808) === 537079808) {
          parser.flags |= 512;
        }
      }
      left = parseAndClassifyIdentifier(parser, context, scope, kind | 1, 0);
    } else {
      if (parser.getToken() === 2162700) {
        left = parseObjectLiteralOrPattern(parser, context, scope, privateScope, 1, inGroup, 1, type, 0);
      } else if (parser.getToken() === 69271571) {
        left = parseArrayExpressionOrPattern(parser, context, scope, privateScope, 1, inGroup, 1, type, 0);
      } else if (parser.getToken() === 14) {
        left = parseSpreadOrRestElement(parser, context, scope, privateScope, 16, type, 0, 0, inGroup, 1);
      }
      isNonSimpleParameterList = 1;
      if (parser.destructible & (32 | 16))
        parser.report(50);
    }
    if (parser.getToken() === 1077936155) {
      nextToken(parser, context | 32);
      isNonSimpleParameterList = 1;
      const right = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
      left = parser.finishNode({
        type: "AssignmentPattern",
        left,
        right
      }, tokenStart);
    }
    setterArgs++;
    params.push(left);
    if (!consumeOpt(parser, context, 18))
      break;
    if (parser.getToken() === 16) {
      break;
    }
  }
  if (kind & 512 && setterArgs !== 1) {
    parser.report(37, "Setter", "one", "");
  }
  scope?.reportScopeError();
  if (isNonSimpleParameterList)
    parser.flags |= 128;
  consume(parser, context, 16);
  return params;
}
function parseComputedPropertyName(parser, context, privateScope, inGroup) {
  nextToken(parser, context | 32);
  const key = parseExpression(parser, (context | 131072) ^ 131072, privateScope, 1, inGroup, parser.tokenStart);
  consume(parser, context, 20);
  return key;
}
function parseParenthesizedExpression(parser, context, privateScope, canAssign, kind, origin, start) {
  parser.flags = (parser.flags | 128) ^ 128;
  const parenthesesStart = parser.tokenStart;
  nextToken(parser, context | 32 | 262144);
  const scope = parser.createScopeIfLexical()?.createChildScope(512);
  context = (context | 131072) ^ 131072;
  if (consumeOpt(parser, context, 16)) {
    return parseParenthesizedArrow(parser, context, scope, privateScope, [], canAssign, 0, start);
  }
  let destructible = 0;
  parser.destructible &= -385;
  let expr;
  let expressions = [];
  let isSequence = 0;
  let isNonSimpleParameterList = 0;
  let hasStrictReserved = 0;
  const tokenAfterParenthesesStart = parser.tokenStart;
  parser.assignable = 1;
  while (parser.getToken() !== 16) {
    const { tokenStart } = parser;
    const token = parser.getToken();
    if (token & 143360) {
      scope?.addBlockName(context, parser.tokenValue, 1, 0);
      if ((token & 537079808) === 537079808) {
        isNonSimpleParameterList = 1;
      } else if ((token & 36864) === 36864) {
        hasStrictReserved = 1;
      }
      expr = parsePrimaryExpression(parser, context, privateScope, kind, 0, 1, 1, 1, tokenStart);
      if (parser.getToken() === 16 || parser.getToken() === 18) {
        if (parser.assignable & 2) {
          destructible |= 16;
          isNonSimpleParameterList = 1;
        }
      } else {
        if (parser.getToken() === 1077936155) {
          isNonSimpleParameterList = 1;
        } else {
          destructible |= 16;
        }
        expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 1, 0, tokenStart);
        if (parser.getToken() !== 16 && parser.getToken() !== 18) {
          expr = parseAssignmentExpression(parser, context, privateScope, 1, 0, tokenStart, expr);
        }
      }
    } else if ((token & 2097152) === 2097152) {
      expr = token === 2162700 ? parseObjectLiteralOrPattern(parser, context | 262144, scope, privateScope, 0, 1, 0, kind, origin) : parseArrayExpressionOrPattern(parser, context | 262144, scope, privateScope, 0, 1, 0, kind, origin);
      destructible |= parser.destructible;
      isNonSimpleParameterList = 1;
      parser.assignable = 2;
      if (parser.getToken() !== 16 && parser.getToken() !== 18) {
        if (destructible & 8)
          parser.report(122);
        expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 0, 0, tokenStart);
        destructible |= 16;
        if (parser.getToken() !== 16 && parser.getToken() !== 18) {
          expr = parseAssignmentExpression(parser, context, privateScope, 0, 0, tokenStart, expr);
        }
      }
    } else if (token === 14) {
      expr = parseSpreadOrRestElement(parser, context, scope, privateScope, 16, kind, origin, 0, 1, 0);
      if (parser.destructible & 16)
        parser.report(74);
      isNonSimpleParameterList = 1;
      if (isSequence && (parser.getToken() === 16 || parser.getToken() === 18)) {
        expressions.push(expr);
      }
      destructible |= 8;
      break;
    } else {
      destructible |= 16;
      expr = parseExpression(parser, context, privateScope, 1, 1, tokenStart);
      if (isSequence && (parser.getToken() === 16 || parser.getToken() === 18)) {
        expressions.push(expr);
      }
      if (parser.getToken() === 18) {
        if (!isSequence) {
          isSequence = 1;
          expressions = [expr];
        }
      }
      if (isSequence) {
        while (consumeOpt(parser, context | 32, 18)) {
          expressions.push(parseExpression(parser, context, privateScope, 1, 1, parser.tokenStart));
        }
        parser.assignable = 2;
        expr = parser.finishNode({
          type: "SequenceExpression",
          expressions
        }, tokenAfterParenthesesStart);
      }
      consume(parser, context, 16);
      parser.destructible = destructible;
      return parser.options.preserveParens ? parser.finishNode({
        type: "ParenthesizedExpression",
        expression: expr
      }, parenthesesStart) : expr;
    }
    if (isSequence && (parser.getToken() === 16 || parser.getToken() === 18)) {
      expressions.push(expr);
    }
    if (!consumeOpt(parser, context | 32, 18))
      break;
    if (!isSequence) {
      isSequence = 1;
      expressions = [expr];
    }
    if (parser.getToken() === 16) {
      destructible |= 8;
      break;
    }
  }
  if (isSequence) {
    parser.assignable = 2;
    expr = parser.finishNode({
      type: "SequenceExpression",
      expressions
    }, tokenAfterParenthesesStart);
  }
  consume(parser, context, 16);
  if (destructible & 16 && destructible & 8)
    parser.report(151);
  destructible |= parser.destructible & 256 ? 256 : 0 | parser.destructible & 128 ? 128 : 0;
  if (parser.getToken() === 10) {
    if (destructible & (32 | 16))
      parser.report(49);
    if (context & (2048 | 2) && destructible & 128)
      parser.report(31);
    if (context & (1 | 1024) && destructible & 256) {
      parser.report(32);
    }
    if (isNonSimpleParameterList)
      parser.flags |= 128;
    if (hasStrictReserved)
      parser.flags |= 256;
    return parseParenthesizedArrow(parser, context, scope, privateScope, isSequence ? expressions : [expr], canAssign, 0, start);
  }
  if (destructible & 64) {
    parser.report(63);
  }
  if (destructible & 8) {
    parser.report(144);
  }
  parser.destructible = (parser.destructible | 256) ^ 256 | destructible;
  return parser.options.preserveParens ? parser.finishNode({
    type: "ParenthesizedExpression",
    expression: expr
  }, parenthesesStart) : expr;
}
function parseIdentifierOrArrow(parser, context, privateScope) {
  const { tokenStart: start } = parser;
  const { tokenValue } = parser;
  let isNonSimpleParameterList = 0;
  let hasStrictReserved = 0;
  if ((parser.getToken() & 537079808) === 537079808) {
    isNonSimpleParameterList = 1;
  } else if ((parser.getToken() & 36864) === 36864) {
    hasStrictReserved = 1;
  }
  const expr = parseIdentifier(parser, context);
  parser.assignable = 1;
  if (parser.getToken() === 10) {
    const scope = parser.options.lexical ? createArrowHeadParsingScope(parser, context, tokenValue) : void 0;
    if (isNonSimpleParameterList)
      parser.flags |= 128;
    if (hasStrictReserved)
      parser.flags |= 256;
    return parseArrowFunctionExpression(parser, context, scope, privateScope, [expr], 0, start);
  }
  return expr;
}
function parseArrowFromIdentifier(parser, context, privateScope, value, expr, inNew, canAssign, isAsync, start) {
  if (!canAssign)
    parser.report(57);
  if (inNew)
    parser.report(51);
  parser.flags &= -129;
  const scope = parser.options.lexical ? createArrowHeadParsingScope(parser, context, value) : void 0;
  return parseArrowFunctionExpression(parser, context, scope, privateScope, [expr], isAsync, start);
}
function parseParenthesizedArrow(parser, context, scope, privateScope, params, canAssign, isAsync, start) {
  if (!canAssign)
    parser.report(57);
  for (let i = 0; i < params.length; ++i)
    reinterpretToPattern(parser, params[i]);
  return parseArrowFunctionExpression(parser, context, scope, privateScope, params, isAsync, start);
}
function parseArrowFunctionExpression(parser, context, scope, privateScope, params, isAsync, start) {
  if (parser.flags & 1)
    parser.report(48);
  consume(parser, context | 32, 10);
  const modifierFlags = 1024 | 2048 | 8192 | 524288;
  context = (context | modifierFlags) ^ modifierFlags | (isAsync ? 2048 : 0);
  const expression = parser.getToken() !== 2162700;
  let body;
  scope?.reportScopeError();
  if (expression) {
    parser.flags = (parser.flags | 512 | 256 | 64 | 4096) ^ (512 | 256 | 64 | 4096);
    body = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
  } else {
    scope = scope?.createChildScope(64);
    const modifierFlags2 = 4 | 131072 | 8;
    body = parseFunctionBody(parser, (context | modifierFlags2) ^ modifierFlags2 | 4096, scope, privateScope, 16, void 0, void 0);
    switch (parser.getToken()) {
      case 69271571:
        if ((parser.flags & 1) === 0) {
          parser.report(116);
        }
        break;
      case 67108877:
      case 67174409:
      case 22:
        parser.report(117);
      case 67174411:
        if ((parser.flags & 1) === 0) {
          parser.report(116);
        }
        parser.flags |= 1024;
        break;
    }
    if ((parser.getToken() & 8388608) === 8388608 && (parser.flags & 1) === 0)
      parser.report(30, KeywordDescTable[parser.getToken() & 255]);
    if ((parser.getToken() & 33619968) === 33619968)
      parser.report(125);
  }
  parser.assignable = 2;
  return parser.finishNode({
    type: "ArrowFunctionExpression",
    params,
    body,
    async: isAsync === 1,
    expression,
    generator: false
  }, start);
}
function parseFormalParametersOrFormalList(parser, context, scope, privateScope, inGroup, kind) {
  consume(parser, context, 67174411);
  parser.flags = (parser.flags | 128) ^ 128;
  const params = [];
  if (consumeOpt(parser, context, 16))
    return params;
  context = (context | 131072) ^ 131072;
  let isNonSimpleParameterList = 0;
  while (parser.getToken() !== 18) {
    let left;
    const { tokenStart } = parser;
    const token = parser.getToken();
    if (token & 143360) {
      if ((context & 1) === 0) {
        if ((token & 36864) === 36864) {
          parser.flags |= 256;
        }
        if ((token & 537079808) === 537079808) {
          parser.flags |= 512;
        }
      }
      left = parseAndClassifyIdentifier(parser, context, scope, kind | 1, 0);
    } else {
      if (token === 2162700) {
        left = parseObjectLiteralOrPattern(parser, context, scope, privateScope, 1, inGroup, 1, kind, 0);
      } else if (token === 69271571) {
        left = parseArrayExpressionOrPattern(parser, context, scope, privateScope, 1, inGroup, 1, kind, 0);
      } else if (token === 14) {
        left = parseSpreadOrRestElement(parser, context, scope, privateScope, 16, kind, 0, 0, inGroup, 1);
      } else {
        parser.report(30, KeywordDescTable[token & 255]);
      }
      isNonSimpleParameterList = 1;
      if (parser.destructible & (32 | 16)) {
        parser.report(50);
      }
    }
    if (parser.getToken() === 1077936155) {
      nextToken(parser, context | 32);
      isNonSimpleParameterList = 1;
      const right = parseExpression(parser, context, privateScope, 1, inGroup, parser.tokenStart);
      left = parser.finishNode({
        type: "AssignmentPattern",
        left,
        right
      }, tokenStart);
    }
    params.push(left);
    if (!consumeOpt(parser, context, 18))
      break;
    if (parser.getToken() === 16) {
      break;
    }
  }
  if (isNonSimpleParameterList)
    parser.flags |= 128;
  if (isNonSimpleParameterList || context & 1) {
    scope?.reportScopeError();
  }
  consume(parser, context, 16);
  return params;
}
function parseMemberExpressionNoCall(parser, context, privateScope, expr, inGroup, start) {
  const token = parser.getToken();
  if (token & 67108864) {
    if (token === 67108877) {
      nextToken(parser, context | 262144);
      parser.assignable = 1;
      const property = parsePropertyOrPrivatePropertyName(parser, context, privateScope);
      return parseMemberExpressionNoCall(parser, context, privateScope, parser.finishNode({
        type: "MemberExpression",
        object: expr,
        computed: false,
        property,
        optional: false
      }, start), 0, start);
    } else if (token === 69271571) {
      nextToken(parser, context | 32);
      const { tokenStart } = parser;
      const property = parseExpressions(parser, context, privateScope, inGroup, 1, tokenStart);
      consume(parser, context, 20);
      parser.assignable = 1;
      return parseMemberExpressionNoCall(parser, context, privateScope, parser.finishNode({
        type: "MemberExpression",
        object: expr,
        computed: true,
        property,
        optional: false
      }, start), 0, start);
    } else if (token === 67174408 || token === 67174409) {
      parser.assignable = 2;
      return parseMemberExpressionNoCall(parser, context, privateScope, parser.finishNode({
        type: "TaggedTemplateExpression",
        tag: expr,
        quasi: parser.getToken() === 67174408 ? parseTemplate(parser, context | 64, privateScope) : parseTemplateLiteral(parser, context | 64)
      }, start), 0, start);
    }
  }
  return expr;
}
function parseNewExpression(parser, context, privateScope, inGroup) {
  const { tokenStart: start } = parser;
  const id = parseIdentifier(parser, context | 32);
  const { tokenStart } = parser;
  if (consumeOpt(parser, context, 67108877)) {
    if (context & 65536 && parser.getToken() === 209029) {
      parser.assignable = 2;
      return parseMetaProperty(parser, context, id, start);
    }
    parser.report(94);
  }
  parser.assignable = 2;
  if ((parser.getToken() & 16842752) === 16842752) {
    parser.report(65, KeywordDescTable[parser.getToken() & 255]);
  }
  const expr = parsePrimaryExpression(parser, context, privateScope, 2, 1, 0, inGroup, 1, tokenStart);
  context = (context | 131072) ^ 131072;
  if (parser.getToken() === 67108990)
    parser.report(168);
  const callee = parseMemberExpressionNoCall(parser, context, privateScope, expr, inGroup, tokenStart);
  parser.assignable = 2;
  return parser.finishNode({
    type: "NewExpression",
    callee,
    arguments: parser.getToken() === 67174411 ? parseArguments(parser, context, privateScope, inGroup) : []
  }, start);
}
function parseMetaProperty(parser, context, meta, start) {
  const property = parseIdentifier(parser, context);
  return parser.finishNode({
    type: "MetaProperty",
    meta,
    property
  }, start);
}
function parseAsyncArrowAfterIdent(parser, context, privateScope, canAssign, start) {
  if (parser.getToken() === 209006)
    parser.report(31);
  if (context & (1 | 1024) && parser.getToken() === 241771) {
    parser.report(32);
  }
  classifyIdentifier(parser, context, parser.getToken());
  if ((parser.getToken() & 36864) === 36864) {
    parser.flags |= 256;
  }
  return parseArrowFromIdentifier(parser, context & -524289 | 2048, privateScope, parser.tokenValue, parseIdentifier(parser, context), 0, canAssign, 1, start);
}
function parseAsyncArrowOrCallExpression(parser, context, privateScope, callee, canAssign, kind, origin, flags, start) {
  nextToken(parser, context | 32);
  const scope = parser.createScopeIfLexical()?.createChildScope(512);
  context = (context | 131072) ^ 131072;
  if (consumeOpt(parser, context, 16)) {
    if (parser.getToken() === 10) {
      if (flags & 1)
        parser.report(48);
      return parseParenthesizedArrow(parser, context, scope, privateScope, [], canAssign, 1, start);
    }
    return parser.finishNode({
      type: "CallExpression",
      callee,
      arguments: [],
      optional: false
    }, start);
  }
  let destructible = 0;
  let expr = null;
  let isNonSimpleParameterList = 0;
  parser.destructible = (parser.destructible | 256 | 128) ^ (256 | 128);
  const params = [];
  while (parser.getToken() !== 16) {
    const { tokenStart } = parser;
    const token = parser.getToken();
    if (token & 143360) {
      scope?.addBlockName(context, parser.tokenValue, kind, 0);
      if ((token & 537079808) === 537079808) {
        parser.flags |= 512;
      } else if ((token & 36864) === 36864) {
        parser.flags |= 256;
      }
      expr = parsePrimaryExpression(parser, context, privateScope, kind, 0, 1, 1, 1, tokenStart);
      if (parser.getToken() === 16 || parser.getToken() === 18) {
        if (parser.assignable & 2) {
          destructible |= 16;
          isNonSimpleParameterList = 1;
        }
      } else {
        if (parser.getToken() === 1077936155) {
          isNonSimpleParameterList = 1;
        } else {
          destructible |= 16;
        }
        expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 1, 0, tokenStart);
        if (parser.getToken() !== 16 && parser.getToken() !== 18) {
          expr = parseAssignmentExpression(parser, context, privateScope, 1, 0, tokenStart, expr);
        }
      }
    } else if (token & 2097152) {
      expr = token === 2162700 ? parseObjectLiteralOrPattern(parser, context, scope, privateScope, 0, 1, 0, kind, origin) : parseArrayExpressionOrPattern(parser, context, scope, privateScope, 0, 1, 0, kind, origin);
      destructible |= parser.destructible;
      isNonSimpleParameterList = 1;
      if (parser.getToken() !== 16 && parser.getToken() !== 18) {
        if (destructible & 8)
          parser.report(122);
        expr = parseMemberOrUpdateExpression(parser, context, privateScope, expr, 0, 0, tokenStart);
        destructible |= 16;
        if ((parser.getToken() & 8388608) === 8388608) {
          expr = parseBinaryExpression(parser, context, privateScope, 1, start, 4, token, expr);
        }
        if (consumeOpt(parser, context | 32, 22)) {
          expr = parseConditionalExpression(parser, context, privateScope, expr, start);
        }
      }
    } else if (token === 14) {
      expr = parseSpreadOrRestElement(parser, context, scope, privateScope, 16, kind, origin, 1, 1, 0);
      destructible |= (parser.getToken() === 16 ? 0 : 16) | parser.destructible;
      isNonSimpleParameterList = 1;
    } else {
      expr = parseExpression(parser, context, privateScope, 1, 0, tokenStart);
      destructible = parser.assignable;
      params.push(expr);
      while (consumeOpt(parser, context | 32, 18)) {
        params.push(parseExpression(parser, context, privateScope, 1, 0, tokenStart));
      }
      destructible |= parser.assignable;
      consume(parser, context, 16);
      parser.destructible = destructible | 16;
      parser.assignable = 2;
      return parser.finishNode({
        type: "CallExpression",
        callee,
        arguments: params,
        optional: false
      }, start);
    }
    params.push(expr);
    if (!consumeOpt(parser, context | 32, 18))
      break;
  }
  consume(parser, context, 16);
  destructible |= parser.destructible & 256 ? 256 : 0 | parser.destructible & 128 ? 128 : 0;
  if (parser.getToken() === 10) {
    if (destructible & (32 | 16))
      parser.report(27);
    if (parser.flags & 1 || flags & 1)
      parser.report(48);
    if (destructible & 128)
      parser.report(31);
    if (context & (1 | 1024) && destructible & 256)
      parser.report(32);
    if (isNonSimpleParameterList)
      parser.flags |= 128;
    return parseParenthesizedArrow(parser, context | 2048, scope, privateScope, params, canAssign, 1, start);
  }
  if (destructible & 64) {
    parser.report(63);
  }
  if (destructible & 8) {
    parser.report(62);
  }
  parser.assignable = 2;
  return parser.finishNode({
    type: "CallExpression",
    callee,
    arguments: params,
    optional: false
  }, start);
}
function parseRegExpLiteral(parser, context) {
  const { tokenRaw, tokenRegExp, tokenValue, tokenStart } = parser;
  nextToken(parser, context);
  parser.assignable = 2;
  const node = {
    type: "Literal",
    value: tokenValue,
    regex: tokenRegExp
  };
  if (parser.options.raw) {
    node.raw = tokenRaw;
  }
  return parser.finishNode(node, tokenStart);
}
function parseClassDeclaration(parser, context, scope, privateScope, flags) {
  let start;
  let decorators;
  if (parser.leadingDecorators.decorators.length) {
    if (parser.getToken() === 132) {
      parser.report(30, "@");
    }
    start = parser.leadingDecorators.start;
    decorators = [...parser.leadingDecorators.decorators];
    parser.leadingDecorators.decorators.length = 0;
  } else {
    start = parser.tokenStart;
    decorators = parseDecorators(parser, context, privateScope);
  }
  context = (context | 16384 | 1) ^ 16384;
  nextToken(parser, context);
  let id = null;
  let superClass = null;
  const { tokenValue } = parser;
  if (parser.getToken() & 4096 && parser.getToken() !== 20565) {
    if (isStrictReservedWord(parser, context, parser.getToken())) {
      parser.report(118);
    }
    if ((parser.getToken() & 537079808) === 537079808) {
      parser.report(119);
    }
    if (scope) {
      scope.addBlockName(context, tokenValue, 32, 0);
      if (flags) {
        if (flags & 2) {
          parser.declareUnboundVariable(tokenValue);
        }
      }
    }
    id = parseIdentifier(parser, context);
  } else {
    if ((flags & 1) === 0)
      parser.report(39, "Class");
  }
  let inheritedContext = context;
  if (consumeOpt(parser, context | 32, 20565)) {
    superClass = parseLeftHandSideExpression(parser, context, privateScope, 0, 0, 0);
    inheritedContext |= 512;
  } else {
    inheritedContext = (inheritedContext | 512) ^ 512;
  }
  const body = parseClassBody(parser, inheritedContext, context, scope, privateScope, 2, 8, 0);
  return parser.finishNode({
    type: "ClassDeclaration",
    id,
    superClass,
    body,
    ...parser.options.next ? { decorators } : null
  }, start);
}
function parseClassExpression(parser, context, privateScope, inGroup, start) {
  let id = null;
  let superClass = null;
  const decorators = parseDecorators(parser, context, privateScope);
  context = (context | 1 | 16384) ^ 16384;
  nextToken(parser, context);
  if (parser.getToken() & 4096 && parser.getToken() !== 20565) {
    if (isStrictReservedWord(parser, context, parser.getToken()))
      parser.report(118);
    if ((parser.getToken() & 537079808) === 537079808) {
      parser.report(119);
    }
    id = parseIdentifier(parser, context);
  }
  let inheritedContext = context;
  if (consumeOpt(parser, context | 32, 20565)) {
    superClass = parseLeftHandSideExpression(parser, context, privateScope, 0, inGroup, 0);
    inheritedContext |= 512;
  } else {
    inheritedContext = (inheritedContext | 512) ^ 512;
  }
  const body = parseClassBody(parser, inheritedContext, context, void 0, privateScope, 2, 0, inGroup);
  parser.assignable = 2;
  return parser.finishNode({
    type: "ClassExpression",
    id,
    superClass,
    body,
    ...parser.options.next ? { decorators } : null
  }, start);
}
function parseDecorators(parser, context, privateScope) {
  const list = [];
  if (parser.options.next) {
    while (parser.getToken() === 132) {
      list.push(parseDecoratorList(parser, context, privateScope));
    }
  }
  return list;
}
function parseDecoratorList(parser, context, privateScope) {
  const start = parser.tokenStart;
  nextToken(parser, context | 32);
  let expression = parsePrimaryExpression(parser, context, privateScope, 2, 0, 1, 0, 1, start);
  expression = parseMemberOrUpdateExpression(parser, context, privateScope, expression, 0, 0, parser.tokenStart);
  return parser.finishNode({
    type: "Decorator",
    expression
  }, start);
}
function parseClassBody(parser, context, inheritedContext, scope, parentScope, kind, origin, inGroup) {
  const { tokenStart } = parser;
  const privateScope = parser.createPrivateScopeIfLexical(parentScope);
  consume(parser, context | 32, 2162700);
  const modifierFlags = 131072 | 524288;
  context = (context | modifierFlags) ^ modifierFlags;
  const hasConstr = parser.flags & 32;
  parser.flags = (parser.flags | 32) ^ 32;
  const body = [];
  while (parser.getToken() !== 1074790415) {
    const decoratorStart = parser.tokenStart;
    const decorators = parseDecorators(parser, context, privateScope);
    if (decorators.length > 0 && parser.tokenValue === "constructor") {
      parser.report(109);
    }
    if (parser.getToken() === 1074790415)
      parser.report(108);
    if (consumeOpt(parser, context, 1074790417)) {
      if (decorators.length > 0)
        parser.report(120);
      continue;
    }
    body.push(parseClassElementList(parser, context, scope, privateScope, inheritedContext, kind, decorators, 0, inGroup, decorators.length > 0 ? decoratorStart : parser.tokenStart));
  }
  consume(parser, origin & 8 ? context | 32 : context, 1074790415);
  privateScope?.validatePrivateIdentifierRefs();
  parser.flags = parser.flags & -33 | hasConstr;
  return parser.finishNode({
    type: "ClassBody",
    body
  }, tokenStart);
}
function parseClassElementList(parser, context, scope, privateScope, inheritedContext, type, decorators, isStatic, inGroup, start) {
  let kind = isStatic ? 32 : 0;
  let key = null;
  const token = parser.getToken();
  if (token & (143360 | 36864) || token === -2147483528) {
    key = parseIdentifier(parser, context);
    switch (token) {
      case 36970:
        if (!isStatic && parser.getToken() !== 67174411 && (parser.getToken() & 1048576) !== 1048576 && parser.getToken() !== 1077936155) {
          return parseClassElementList(parser, context, scope, privateScope, inheritedContext, type, decorators, 1, inGroup, start);
        }
        break;
      case 209005:
        if (parser.getToken() !== 67174411 && (parser.flags & 1) === 0) {
          if ((parser.getToken() & 1073741824) === 1073741824) {
            return parsePropertyDefinition(parser, context, privateScope, key, kind, decorators, start);
          }
          kind |= 16 | (optionalBit(parser, context, 8391476) ? 8 : 0);
        }
        break;
      case 209008:
        if (parser.getToken() !== 67174411) {
          if ((parser.getToken() & 1073741824) === 1073741824) {
            return parsePropertyDefinition(parser, context, privateScope, key, kind, decorators, start);
          }
          kind |= 256;
        }
        break;
      case 209009:
        if (parser.getToken() !== 67174411) {
          if ((parser.getToken() & 1073741824) === 1073741824) {
            return parsePropertyDefinition(parser, context, privateScope, key, kind, decorators, start);
          }
          kind |= 512;
        }
        break;
      case 12402:
        if (parser.getToken() !== 67174411 && (parser.flags & 1) === 0) {
          if ((parser.getToken() & 1073741824) === 1073741824) {
            return parsePropertyDefinition(parser, context, privateScope, key, kind, decorators, start);
          }
          if (parser.options.next)
            kind |= 1024;
        }
        break;
    }
  } else if (token === 69271571) {
    kind |= 2;
    key = parseComputedPropertyName(parser, inheritedContext, privateScope, inGroup);
  } else if ((token & 134217728) === 134217728) {
    key = parseLiteral(parser, context);
  } else if (token === 8391476) {
    kind |= 8;
    nextToken(parser, context);
  } else if (parser.getToken() === 130) {
    kind |= 8192;
    key = parsePrivateIdentifier(parser, context | 16, privateScope, 768);
  } else if ((parser.getToken() & 1073741824) === 1073741824) {
    kind |= 128;
  } else if (isStatic && token === 2162700) {
    return parseStaticBlock(parser, context | 16, scope, privateScope, start);
  } else if (token === -2147483527) {
    key = parseIdentifier(parser, context);
    if (parser.getToken() !== 67174411)
      parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  } else {
    parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  }
  if (kind & (8 | 16 | 768 | 1024)) {
    if (parser.getToken() & 143360 || parser.getToken() === -2147483528 || parser.getToken() === -2147483527) {
      key = parseIdentifier(parser, context);
    } else if ((parser.getToken() & 134217728) === 134217728) {
      key = parseLiteral(parser, context);
    } else if (parser.getToken() === 69271571) {
      kind |= 2;
      key = parseComputedPropertyName(parser, context, privateScope, 0);
    } else if (parser.getToken() === 130) {
      kind |= 8192;
      key = parsePrivateIdentifier(parser, context, privateScope, kind);
    } else
      parser.report(135);
  }
  if ((kind & 2) === 0) {
    if (parser.tokenValue === "constructor") {
      if ((parser.getToken() & 1073741824) === 1073741824) {
        parser.report(129);
      } else if ((kind & 32) === 0 && parser.getToken() === 67174411) {
        if (kind & (768 | 16 | 128 | 8)) {
          parser.report(53, "accessor");
        } else if ((context & 512) === 0) {
          if (parser.flags & 32)
            parser.report(54);
          else
            parser.flags |= 32;
        }
      }
      kind |= 64;
    } else if ((kind & 8192) === 0 && kind & 32 && parser.tokenValue === "prototype") {
      parser.report(52);
    }
  }
  if (kind & 1024 || parser.getToken() !== 67174411 && (kind & 768) === 0) {
    return parsePropertyDefinition(parser, context, privateScope, key, kind, decorators, start);
  }
  const value = parseMethodDefinition(parser, context | 16, privateScope, kind, inGroup, parser.tokenStart);
  return parser.finishNode({
    type: "MethodDefinition",
    kind: (kind & 32) === 0 && kind & 64 ? "constructor" : kind & 256 ? "get" : kind & 512 ? "set" : "method",
    static: (kind & 32) > 0,
    computed: (kind & 2) > 0,
    key,
    value,
    ...parser.options.next ? { decorators } : null
  }, start);
}
function parsePrivateIdentifier(parser, context, privateScope, kind) {
  const { tokenStart } = parser;
  nextToken(parser, context);
  const { tokenValue } = parser;
  if (tokenValue === "constructor")
    parser.report(128);
  if (parser.options.lexical) {
    if (!privateScope)
      parser.report(4, tokenValue);
    if (kind) {
      privateScope.addPrivateIdentifier(tokenValue, kind);
    } else {
      privateScope.addPrivateIdentifierRef(tokenValue);
    }
  }
  nextToken(parser, context);
  return parser.finishNode({
    type: "PrivateIdentifier",
    name: tokenValue
  }, tokenStart);
}
function parsePropertyDefinition(parser, context, privateScope, key, state, decorators, start) {
  let value = null;
  if (state & 8)
    parser.report(0);
  if (parser.getToken() === 1077936155) {
    nextToken(parser, context | 32);
    const { tokenStart } = parser;
    if (parser.getToken() === 537079927)
      parser.report(119);
    const modifierFlags = 1024 | 2048 | 8192 | ((state & 64) === 0 ? 512 | 16384 : 0);
    context = (context | modifierFlags) ^ modifierFlags | (state & 8 ? 1024 : 0) | (state & 16 ? 2048 : 0) | (state & 64 ? 16384 : 0) | 256 | 65536;
    value = parsePrimaryExpression(parser, context | 16, privateScope, 2, 0, 1, 0, 1, tokenStart);
    if ((parser.getToken() & 1073741824) !== 1073741824 || (parser.getToken() & 4194304) === 4194304) {
      value = parseMemberOrUpdateExpression(parser, context | 16, privateScope, value, 0, 0, tokenStart);
      value = parseAssignmentExpression(parser, context | 16, privateScope, 0, 0, tokenStart, value);
    }
  }
  matchOrInsertSemicolon(parser, context);
  return parser.finishNode({
    type: state & 1024 ? "AccessorProperty" : "PropertyDefinition",
    key,
    value,
    static: (state & 32) > 0,
    computed: (state & 2) > 0,
    ...parser.options.next ? { decorators } : null
  }, start);
}
function parseBindingPattern(parser, context, scope, privateScope, type, origin) {
  if (parser.getToken() & 143360 || (context & 1) === 0 && parser.getToken() === -2147483527)
    return parseAndClassifyIdentifier(parser, context, scope, type, origin);
  if ((parser.getToken() & 2097152) !== 2097152)
    parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  const left = parser.getToken() === 69271571 ? parseArrayExpressionOrPattern(parser, context, scope, privateScope, 1, 0, 1, type, origin) : parseObjectLiteralOrPattern(parser, context, scope, privateScope, 1, 0, 1, type, origin);
  if (parser.destructible & 16)
    parser.report(50);
  if (parser.destructible & 32)
    parser.report(50);
  return left;
}
function parseAndClassifyIdentifier(parser, context, scope, kind, origin) {
  const token = parser.getToken();
  if (context & 1) {
    if ((token & 537079808) === 537079808) {
      parser.report(119);
    } else if ((token & 36864) === 36864 || token === -2147483527) {
      parser.report(118);
    }
  }
  if ((token & 20480) === 20480) {
    parser.report(102);
  }
  if (token === 241771) {
    if (context & 1024)
      parser.report(32);
    if (context & 2)
      parser.report(111);
  }
  if ((token & 255) === (241737 & 255)) {
    if (kind & (8 | 16))
      parser.report(100);
  }
  if (token === 209006) {
    if (context & 2048)
      parser.report(176);
    if (context & 2)
      parser.report(110);
  }
  const { tokenValue, tokenStart: start } = parser;
  nextToken(parser, context);
  scope?.addVarOrBlock(context, tokenValue, kind, origin);
  return parser.finishNode({
    type: "Identifier",
    name: tokenValue
  }, start);
}
function parseJSXRootElementOrFragment(parser, context, privateScope, inJSXChild, start) {
  if (!inJSXChild)
    consume(parser, context, 8456256);
  if (parser.getToken() === 8390721) {
    const openingFragment = parseJSXOpeningFragment(parser, start);
    const [children2, closingFragment] = parseJSXChildrenAndClosingFragment(parser, context, privateScope, inJSXChild);
    return parser.finishNode({
      type: "JSXFragment",
      openingFragment,
      children: children2,
      closingFragment
    }, start);
  }
  if (parser.getToken() === 8457014)
    parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  let closingElement = null;
  let children = [];
  const openingElement = parseJSXOpeningElementOrSelfCloseElement(parser, context, privateScope, inJSXChild, start);
  if (!openingElement.selfClosing) {
    [children, closingElement] = parseJSXChildrenAndClosingElement(parser, context, privateScope, inJSXChild);
    const close = isEqualTagName(closingElement.name);
    if (isEqualTagName(openingElement.name) !== close)
      parser.report(155, close);
  }
  return parser.finishNode({
    type: "JSXElement",
    children,
    openingElement,
    closingElement
  }, start);
}
function parseJSXOpeningFragment(parser, start) {
  nextJSXToken(parser);
  return parser.finishNode({
    type: "JSXOpeningFragment"
  }, start);
}
function parseJSXClosingElement(parser, context, inJSXChild, start) {
  consume(parser, context, 8457014);
  const name = parseJSXElementName(parser, context);
  if (parser.getToken() !== 8390721) {
    parser.report(25, KeywordDescTable[8390721 & 255]);
  }
  if (inJSXChild) {
    nextJSXToken(parser);
  } else {
    nextToken(parser, context);
  }
  return parser.finishNode({
    type: "JSXClosingElement",
    name
  }, start);
}
function parseJSXClosingFragment(parser, context, inJSXChild, start) {
  consume(parser, context, 8457014);
  if (parser.getToken() !== 8390721) {
    parser.report(25, KeywordDescTable[8390721 & 255]);
  }
  if (inJSXChild) {
    nextJSXToken(parser);
  } else {
    nextToken(parser, context);
  }
  return parser.finishNode({
    type: "JSXClosingFragment"
  }, start);
}
function parseJSXChildrenAndClosingElement(parser, context, privateScope, inJSXChild) {
  const children = [];
  while (true) {
    const child = parseJSXChildOrClosingElement(parser, context, privateScope, inJSXChild);
    if (child.type === "JSXClosingElement") {
      return [children, child];
    }
    children.push(child);
  }
}
function parseJSXChildrenAndClosingFragment(parser, context, privateScope, inJSXChild) {
  const children = [];
  while (true) {
    const child = parseJSXChildOrClosingFragment(parser, context, privateScope, inJSXChild);
    if (child.type === "JSXClosingFragment") {
      return [children, child];
    }
    children.push(child);
  }
}
function parseJSXChildOrClosingElement(parser, context, privateScope, inJSXChild) {
  if (parser.getToken() === 137)
    return parseJSXText(parser, context);
  if (parser.getToken() === 2162700)
    return parseJSXExpressionContainer(parser, context, privateScope, 1, 0);
  if (parser.getToken() === 8456256) {
    const { tokenStart } = parser;
    nextToken(parser, context);
    if (parser.getToken() === 8457014)
      return parseJSXClosingElement(parser, context, inJSXChild, tokenStart);
    return parseJSXRootElementOrFragment(parser, context, privateScope, 1, tokenStart);
  }
  parser.report(0);
}
function parseJSXChildOrClosingFragment(parser, context, privateScope, inJSXChild) {
  if (parser.getToken() === 137)
    return parseJSXText(parser, context);
  if (parser.getToken() === 2162700)
    return parseJSXExpressionContainer(parser, context, privateScope, 1, 0);
  if (parser.getToken() === 8456256) {
    const { tokenStart } = parser;
    nextToken(parser, context);
    if (parser.getToken() === 8457014)
      return parseJSXClosingFragment(parser, context, inJSXChild, tokenStart);
    return parseJSXRootElementOrFragment(parser, context, privateScope, 1, tokenStart);
  }
  parser.report(0);
}
function parseJSXText(parser, context) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  const node = {
    type: "JSXText",
    value: parser.tokenValue
  };
  if (parser.options.raw) {
    node.raw = parser.tokenRaw;
  }
  return parser.finishNode(node, start);
}
function parseJSXOpeningElementOrSelfCloseElement(parser, context, privateScope, inJSXChild, start) {
  if ((parser.getToken() & 143360) !== 143360 && (parser.getToken() & 4096) !== 4096)
    parser.report(0);
  const tagName = parseJSXElementName(parser, context);
  const attributes = parseJSXAttributes(parser, context, privateScope);
  const selfClosing = parser.getToken() === 8457014;
  if (selfClosing)
    consume(parser, context, 8457014);
  if (parser.getToken() !== 8390721) {
    parser.report(25, KeywordDescTable[8390721 & 255]);
  }
  if (inJSXChild || !selfClosing) {
    nextJSXToken(parser);
  } else {
    nextToken(parser, context);
  }
  return parser.finishNode({
    type: "JSXOpeningElement",
    name: tagName,
    attributes,
    selfClosing
  }, start);
}
function parseJSXElementName(parser, context) {
  const { tokenStart } = parser;
  rescanJSXIdentifier(parser);
  let key = parseJSXIdentifier(parser, context);
  if (parser.getToken() === 21)
    return parseJSXNamespacedName(parser, context, key, tokenStart);
  while (consumeOpt(parser, context, 67108877)) {
    rescanJSXIdentifier(parser);
    key = parseJSXMemberExpression(parser, context, key, tokenStart);
  }
  return key;
}
function parseJSXMemberExpression(parser, context, object, start) {
  const property = parseJSXIdentifier(parser, context);
  return parser.finishNode({
    type: "JSXMemberExpression",
    object,
    property
  }, start);
}
function parseJSXAttributes(parser, context, privateScope) {
  const attributes = [];
  while (parser.getToken() !== 8457014 && parser.getToken() !== 8390721 && parser.getToken() !== 1048576) {
    attributes.push(parseJsxAttribute(parser, context, privateScope));
  }
  return attributes;
}
function parseJSXSpreadAttribute(parser, context, privateScope) {
  const start = parser.tokenStart;
  nextToken(parser, context);
  consume(parser, context, 14);
  const expression = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
  consume(parser, context, 1074790415);
  return parser.finishNode({
    type: "JSXSpreadAttribute",
    argument: expression
  }, start);
}
function parseJsxAttribute(parser, context, privateScope) {
  const { tokenStart } = parser;
  if (parser.getToken() === 2162700)
    return parseJSXSpreadAttribute(parser, context, privateScope);
  rescanJSXIdentifier(parser);
  let value = null;
  let name = parseJSXIdentifier(parser, context);
  if (parser.getToken() === 21) {
    name = parseJSXNamespacedName(parser, context, name, tokenStart);
  }
  if (parser.getToken() === 1077936155) {
    const token = scanJSXAttributeValue(parser, context);
    switch (token) {
      case 134283267:
        value = parseLiteral(parser, context);
        break;
      case 8456256:
        value = parseJSXRootElementOrFragment(parser, context, privateScope, 0, parser.tokenStart);
        break;
      case 2162700:
        value = parseJSXExpressionContainer(parser, context, privateScope, 0, 1);
        break;
      default:
        parser.report(154);
    }
  }
  return parser.finishNode({
    type: "JSXAttribute",
    value,
    name
  }, tokenStart);
}
function parseJSXNamespacedName(parser, context, namespace, start) {
  consume(parser, context, 21);
  const name = parseJSXIdentifier(parser, context);
  return parser.finishNode({
    type: "JSXNamespacedName",
    namespace,
    name
  }, start);
}
function parseJSXExpressionContainer(parser, context, privateScope, inJSXChild, isAttr) {
  const { tokenStart: start } = parser;
  nextToken(parser, context | 32);
  const { tokenStart } = parser;
  if (parser.getToken() === 14)
    return parseJSXSpreadChild(parser, context, privateScope, start);
  let expression = null;
  if (parser.getToken() === 1074790415) {
    if (isAttr)
      parser.report(157);
    expression = parseJSXEmptyExpression(parser, {
      index: parser.startIndex,
      line: parser.startLine,
      column: parser.startColumn
    });
  } else {
    expression = parseExpression(parser, context, privateScope, 1, 0, tokenStart);
  }
  if (parser.getToken() !== 1074790415) {
    parser.report(25, KeywordDescTable[1074790415 & 255]);
  }
  if (inJSXChild) {
    nextJSXToken(parser);
  } else {
    nextToken(parser, context);
  }
  return parser.finishNode({
    type: "JSXExpressionContainer",
    expression
  }, start);
}
function parseJSXSpreadChild(parser, context, privateScope, start) {
  consume(parser, context, 14);
  const expression = parseExpression(parser, context, privateScope, 1, 0, parser.tokenStart);
  consume(parser, context, 1074790415);
  return parser.finishNode({
    type: "JSXSpreadChild",
    expression
  }, start);
}
function parseJSXEmptyExpression(parser, start) {
  return parser.finishNode({
    type: "JSXEmptyExpression"
  }, start, parser.tokenStart);
}
function parseJSXIdentifier(parser, context) {
  const start = parser.tokenStart;
  if (!(parser.getToken() & 143360)) {
    parser.report(30, KeywordDescTable[parser.getToken() & 255]);
  }
  const { tokenValue } = parser;
  nextToken(parser, context);
  return parser.finishNode({
    type: "JSXIdentifier",
    name: tokenValue
  }, start);
}
function parseScript(source, options) {
  return parseSource(source, options);
}
function parseModule(source, options) {
  return parseSource(source, options, 1 | 2);
}
const APP_ROLES = ["admin", "developer", "accounting", "clerical", "other", "member", "guest"];
const APP_SCHEMA = "baku.app/1";
const OPTION_INPUT_TYPES = ["select", "radio", "checkboxes", "scale"];
const MESSAGING_CONNECTORS = ["line", "discord", "slack"];
const MESSAGING_TRIGGER_EVENTS = ["text", "image", "file", "message"];
const GOOGLE_TRIGGER_SERVICES = ["gmail", "calendar", "drive", "sheets", "docs", "slides", "forms", "tasks", "contacts", "meet"];
const RENDER_HTML_MAX = 256 * 1024;
function sanitizeRenderHtml(html) {
  if (typeof html !== "string") return html;
  let h = html.trim();
  const fence = h.match(/```(?:html)?\s*([\s\S]*?)```/i);
  if (fence) h = fence[1].trim();
  const m = h.match(/<(?:!doctype\b|html\b|head\b|body\b|div\b|section\b|main\b|style\b|header\b|h1\b)/i);
  if (m && (m.index ?? 0) > 0) h = h.slice(m.index);
  return h.trim();
}
const OP_PERMISSION = {
  "ai.infer": "ai",
  "transform": null,
  "file.save": "storage:write",
  "file.read": "storage:read",
  "db.query": "db:read",
  "db.write": "db:write",
  // db.delete は任意SQLを取らず、app_records を id＋app_id＋owner でスコープ削除する固定op（CRUDの削除・B1）。
  "db.delete": "db:write",
  // data.* は生SQLを取らない構造化データ op。実行時に app_records へ app_id＋owner を強制（生成アプリ用）。
  "data.list": "db:read",
  "data.get": "db:read",
  "data.create": "db:write",
  "data.update": "db:write",
  "data.remove": "db:write",
  // data.upsert：keyFields 一致で更新・無ければ新規を1 op で。生SQLは取らず app_id＋owner を強制（data.* と同じ信頼境界）。
  "data.upsert": "db:write",
  "http.fetch": "net",
  // 通知・メール送信（B2）。アプリ内通知＝notify、メール送信も notify（実行時に組織のGmail連携を要求）。
  "notify": "notify",
  // LINE/Discord/Slack への送信。連携済み論理チャンネル経由で送信（宛先/トークンはサーバ側で解決）。
  "message.send": "messaging:send",
  // 組織ナレッジ検索（RAG・B5）。社内文書を根拠に ai.infer を接地する。
  "knowledge.search": "knowledge",
  // 承認ワークフロー（B10）。レコードの status を遷移（申請→承認/却下）。app_id スコープで更新。
  "record.status": "db:write",
  // Google連携 op（google.*）。各 op の必要権限は GOOGLE_OPS が single source（drift 防止）。
  ...Object.fromEntries(GOOGLE_OP_IDS.map((op) => [op, GOOGLE_OPS[op].perm]))
};
const ALL_OPS = Object.keys(OP_PERMISSION);
const RAW_SQL_OPS = ["db.query", "db.write"];
const GENERATED_OPS = ALL_OPS.filter((op) => !RAW_SQL_OPS.includes(op));
const INPUT_TYPES = ["text", "textarea", "number", "boolean", "select", "radio", "checkboxes", "scale", "date", "time", "email", "tel", "file", "signature"];
const IDENT = /^[a-zA-Z][a-zA-Z0-9_]*$/;
const opCatalogText = () => GENERATED_OPS.filter((op) => !isGoogleOp(op)).map((op) => `${op}${OP_PERMISSION[op] ? `（要 ${OP_PERMISSION[op]}）` : "（権限不要）"}`).join("、");
const googleOpCatalogText = () => "【Google連携op｜生成アプリのボタンから Google を直接操作（実処理はサーバ側 googleFetch・アクセストークンはアプリに渡らない）】使う op の権限を permissions に宣言（read=Plus/write=Pro・書込/削除/送信は承認ゲート対象）。引数は step の google:{...} に入れる（例 {op:'google.sheets.append',google:{id:'$sheetId',values:'$rows'}}）。値は $参照/{{テンプレート}}可。利用可能：" + Object.values(GOOGLE_OPS).map((m) => m.desc).join("／");
function hostOf(url) {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}
function isBlockedHost(host) {
  const h = host.toLowerCase().replace(/:\d+$/, "").replace(/^\[|\]$/g, "");
  if (h === "localhost" || h === "::1" || h === "0.0.0.0" || h === "metadata.google.internal") return true;
  if (h.endsWith(".local") || h.endsWith(".internal") || h.endsWith(".localhost")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (/^\d+$/.test(h) || /^0x[0-9a-f]+$/.test(h)) return true;
  if (h.includes(":") && (h.startsWith("::ffff:") || h === "::" || /^f[cd][0-9a-f]{2}:/.test(h) || /^fe[89ab][0-9a-f]:/.test(h))) return true;
  return false;
}
function scanJsSyntax(code) {
  const n = code.length;
  let i = 0;
  let prevSig = "";
  const snip = (p) => JSON.stringify(code.slice(p, Math.min(n, p + 40)));
  const skipString = (q, start) => {
    let j = start + 1;
    while (j < n) {
      const d = code[j];
      if (d === "\\") {
        j += 2;
        continue;
      }
      if (d === "\n") return { j, err: `文字列(${q})が改行で途切れています: ${snip(start)}` };
      if (d === q) return { j: j + 1 };
      j++;
    }
    return { j, err: `文字列(${q})が閉じていません（末尾まで未終端）: ${snip(start)}` };
  };
  const skipTemplate = (start) => {
    let j = start + 1;
    while (j < n) {
      const d = code[j];
      if (d === "\\") {
        j += 2;
        continue;
      }
      if (d === "`") return { j: j + 1 };
      if (d === "$" && code[j + 1] === "{") {
        j += 2;
        let depth = 1;
        while (j < n && depth > 0) {
          const e = code[j];
          if (e === "'" || e === '"') {
            const r = skipString(e, j);
            if (r.err) return r;
            j = r.j;
            continue;
          }
          if (e === "`") {
            const r = skipTemplate(j);
            if (r.err) return r;
            j = r.j;
            continue;
          }
          if (e === "{") depth++;
          else if (e === "}") depth--;
          j++;
        }
        continue;
      }
      j++;
    }
    return { j, err: "テンプレート文字列(`)が閉じていません（末尾まで未終端）" };
  };
  const regexAllowedAfter = /* @__PURE__ */ new Set(["", "(", ",", "=", ":", "[", "!", "&", "|", "?", "{", "}", ";", "+", "-", "*", "%", "<", ">", "~", "^", "\n"]);
  while (i < n) {
    const c = code[i];
    if (c === "/" && code[i + 1] === "/") {
      i += 2;
      while (i < n && code[i] !== "\n") i++;
      continue;
    }
    if (c === "/" && code[i + 1] === "*") {
      i += 2;
      while (i < n && !(code[i] === "*" && code[i + 1] === "/")) i++;
      if (i >= n) return "ブロックコメント(/* */)が閉じていません";
      i += 2;
      continue;
    }
    if (c === "'" || c === '"') {
      const r = skipString(c, i);
      if (r.err) return r.err;
      i = r.j;
      prevSig = c;
      continue;
    }
    if (c === "`") {
      const r = skipTemplate(i);
      if (r.err) return r.err;
      i = r.j;
      prevSig = "`";
      continue;
    }
    if (c === "/" && regexAllowedAfter.has(prevSig)) {
      let j = i + 1;
      let inClass = false;
      while (j < n) {
        const d = code[j];
        if (d === "\\") {
          j += 2;
          continue;
        }
        if (d === "\n") break;
        if (d === "[") inClass = true;
        else if (d === "]") inClass = false;
        else if (d === "/" && !inClass) {
          j++;
          break;
        }
        j++;
      }
      i = j;
      prevSig = "/";
      continue;
    }
    if (!/\s/.test(c)) prevSig = c;
    i++;
  }
  return null;
}
function checkRenderScripts(html) {
  if (typeof html !== "string") return null;
  const opens = (html.match(/<script\b[^>]*>/gi) ?? []).length;
  const closes = (html.match(/<\/script\s*>/gi) ?? []).length;
  if (opens > closes) return "<script> が閉じられていません（生成が途中で切れた可能性）。スクリプト全体が無効になり、ボタン等が動きません。";
  for (const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)(?:<\/script\s*>|$)/gi)) {
    const err = scanJsSyntax(m[1]);
    if (err) return err;
  }
  return null;
}
function checkRenderScriptsParsed(html) {
  if (typeof html !== "string" || !html) return null;
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)(?:<\/script\s*>|$)/gi)) {
    const attrs = m[1] ?? "";
    const code = m[2] ?? "";
    if (!code.trim()) continue;
    const typeM = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs);
    const type = (typeM?.[1] ?? "").toLowerCase();
    const isModule = type === "module";
    if (type && !isModule && !/^(text|application)\/(java|ecma)script$/.test(type)) continue;
    try {
      if (isModule) parseModule(code, { webcompat: true });
      else parseScript(code, { webcompat: true });
    } catch (e) {
      const msg = e?.message ?? String(e);
      return `JS構文エラー（実パース）：${msg.slice(0, 200)}`;
    }
  }
  return null;
}
function checkRenderBusReachability(html) {
  if (typeof html !== "string" || !html) return null;
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)(?:<\/script\s*>|$)/gi)].map((m) => m[1]).join("\n");
  if (!scripts || !/__app/.test(scripts)) return null;
  if (/__app\s*\.\s*emit\s*\(\s*[^"')\s]/.test(scripts)) return null;
  const ons = /* @__PURE__ */ new Set();
  for (const m of scripts.matchAll(/__app\s*\.\s*on\s*\(\s*["']([^"']+)["']/g)) ons.add(m[1]);
  if (!ons.size) return null;
  const emits = /* @__PURE__ */ new Set(["ready"]);
  for (const m of scripts.matchAll(/__app\s*\.\s*emit\s*\(\s*["']([^"']+)["']/g)) emits.add(m[1]);
  const orphan = [...ons].filter((e) => !emits.has(e));
  if (!orphan.length) return null;
  return `イベント ${orphan.slice(0, 3).map((e) => `'${e}'`).join(", ")} を window.__app.on で購読していますが、どこからも emit されていません（購読中の初期化/切替/再読込が永久に発火せず、そのボタンや画面が動きません）。対応する window.__app.emit を発火側に追加してください。`;
}
const HANDLER_KEYWORDS = /* @__PURE__ */ new Set(["if", "for", "while", "switch", "catch", "return", "typeof", "function", "do", "else", "new", "delete", "void", "await", "throw", "in", "of", "instanceof", "case", "with", "yield", "super", "var", "let", "const"]);
const HANDLER_BUILTINS = /* @__PURE__ */ new Set(["alert", "confirm", "prompt", "setTimeout", "setInterval", "clearTimeout", "clearInterval", "parseInt", "parseFloat", "isNaN", "isFinite", "encodeURIComponent", "decodeURIComponent", "requestAnimationFrame", "Number", "String", "Boolean", "Array", "Object", "JSON", "Math", "Date", "RegExp", "Map", "Set", "Promise", "fetch", "print", "focus", "blur", "alert", "open", "postMessage", "structuredClone"]);
function checkRenderHandlers(html) {
  if (typeof html !== "string" || !html) return null;
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)(?:<\/script\s*>|$)/gi)].map((m) => m[1]).join("\n");
  if (!scripts) return null;
  const isDefined = (name) => {
    const e = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`function\\s+${e}\\b|\\b(?:const|let|var)\\s+${e}\\b|window\\.${e}\\s*=|\\b${e}\\s*=\\s*(?:function|async|\\()|\\b${e}\\s*:\\s*(?:function|async|\\()`).test(scripts);
  };
  const EVENTS = /\bon(?:click|change|input|submit|keyup|keydown|keypress|mousedown|mouseup|mouseover|mouseout|dblclick|touchstart|touchend|toggle)\s*=\s*("([^"]*)"|'([^']*)')/gi;
  const missing = /* @__PURE__ */ new Set();
  for (const m of html.matchAll(EVENTS)) {
    const code = m[2] ?? m[3] ?? "";
    for (const c of code.matchAll(/(^|[^.\w$])([A-Za-z_$][\w$]*)\s*\(/g)) {
      const name = c[2];
      if (HANDLER_KEYWORDS.has(name) || HANDLER_BUILTINS.has(name)) continue;
      if (!isDefined(name)) missing.add(name);
    }
  }
  if (missing.size) {
    const list = [...missing].slice(0, 3).join("()・") + "()";
    return `イベント属性（onclick 等）が未定義の関数を呼んでいます：${list}。ボタン等を押しても動作しません。該当関数を <script> 内に定義するか、呼び出し名を既存の関数に合わせてください。`;
  }
  return null;
}
function checkRenderScreens(def) {
  const d = def;
  const html = typeof d?.render?.html === "string" ? d.render.html : "";
  if (!html) return null;
  const called = /* @__PURE__ */ new Set();
  for (const m of html.matchAll(/\bbo\s*\.\s*run\s*\(\s*['"`]([^'"`]+)['"`]/g)) called.add(m[1]);
  if (!called.size) return null;
  const defined = new Set((Array.isArray(d.screens) ? d.screens : []).map((s) => String(s?.id ?? "")).filter(Boolean));
  const missing = [...called].filter((id) => !defined.has(id));
  if (!missing.length) return null;
  return `カスタムUIが呼ぶ画面「${missing.slice(0, 3).join("・")}」が未定義です（bo.run はこのIDの画面を実行しますが screens[] にありません＝保存/一覧が失敗します）。該当の画面（kind=screen）を定義するか、bo.run の呼び出しIDを定義済み画面のIDに合わせてください。`;
}
function checkRenderDomRefs(def) {
  const d = def;
  const html = typeof d?.render?.html === "string" ? d.render.html : "";
  if (!html) return null;
  const definedIds = /* @__PURE__ */ new Set();
  for (const m of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) definedIds.add(m[1]);
  const refs = /* @__PURE__ */ new Set();
  for (const m of html.matchAll(/getElementById\(\s*['"]([A-Za-z_][\w-]*)['"]/g)) refs.add(m[1]);
  for (const m of html.matchAll(/querySelector(?:All)?\(\s*['"]#([A-Za-z_][\w-]*)['"]/g)) refs.add(m[1]);
  const withoutRefs = html.replace(/getElementById\(\s*['"][A-Za-z_][\w-]*['"]/g, "").replace(/querySelector(?:All)?\(\s*['"]#[A-Za-z_][\w-]*['"]/g, "");
  const missing = [];
  for (const id of refs) {
    if (definedIds.has(id)) continue;
    if (!withoutRefs.includes(id)) missing.push(id);
  }
  if (!missing.length) return null;
  return `カスタムUIが存在しない要素「${missing.slice(0, 3).join("・")}」を getElementById/querySelector で参照しています（実行時に null エラーとなり、以降のボタン配線が全て無効になります）。該当 id を持つ要素を HTML に追加するか、参照先を実在の id に直してください。`;
}
function checkRenderDataKeys(def) {
  if (!def || typeof def !== "object") return null;
  const d = def;
  const html = d.render?.html;
  if (typeof html !== "string" || !html) return null;
  const screens = Array.isArray(d.screens) ? d.screens : [];
  if (!screens.length) return null;
  const screenInfo = /* @__PURE__ */ new Map();
  for (const s of screens) {
    if (!s || typeof s !== "object") continue;
    const ss = s;
    const id = typeof ss.id === "string" ? ss.id : "";
    if (!id) continue;
    const hasCreate = Array.isArray(ss.steps) && ss.steps.some((st) => st != null && typeof st === "object" && (st.op === "data.create" || st.op === "data.upsert"));
    const required = /* @__PURE__ */ new Set();
    if (Array.isArray(ss.inputs)) for (const inp of ss.inputs) {
      if (inp != null && typeof inp === "object") {
        const ii = inp;
        if (ii.required === true && typeof ii.name === "string") required.add(ii.name);
      }
    }
    screenInfo.set(id, { required, hasCreate });
  }
  const callKeys = /* @__PURE__ */ new Map();
  for (const m of html.matchAll(/bo\.run\(\s*['"]([A-Za-z0-9_]+)['"]\s*,\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g)) {
    const id = m[1];
    const body = m[2] ?? "";
    const keys = callKeys.get(id) ?? /* @__PURE__ */ new Set();
    for (const k of body.matchAll(/(?:^|[,{])\s*['"]?([A-Za-z_$][\w$]*)['"]?\s*(?=[:,}]|$)/g)) keys.add(k[1]);
    callKeys.set(id, keys);
  }
  for (const [id, info] of screenInfo) {
    if (!info.hasCreate || info.required.size === 0) continue;
    const provided = callKeys.get(id);
    if (!provided) continue;
    const missing = [...info.required].filter((r) => !provided.has(r));
    if (missing.length) {
      return `保存処理（画面「${id}」）に必要な項目「${missing.slice(0, 3).join("・")}」が bo.run の入力キーに渡されていません。入力欄の name と bo.run({…}) のキー名を一致させてください（不一致だと保存が空になります）。`;
    }
  }
  return null;
}
function checkOrphanDataScreens(def) {
  const d = def;
  const html = typeof d?.render?.html === "string" ? d.render.html : "";
  if (!html) return null;
  if (/\bbo\s*\.\s*run\s*\(\s*[^'"`)\s]/.test(html)) return null;
  const screens = Array.isArray(d.screens) ? d.screens : [];
  if (!screens.length) return null;
  const called = /* @__PURE__ */ new Set();
  for (const m of html.matchAll(/\bbo\s*\.\s*run\s*\(\s*['"`]([^'"`${}]+)['"`]/g)) called.add(m[1]);
  const orphans = [];
  for (const s of screens) {
    if (!s || typeof s !== "object") continue;
    const ss = s;
    const id = typeof ss.id === "string" ? ss.id : "";
    if (!id) continue;
    const writes = Array.isArray(ss.steps) && ss.steps.some((st) => st != null && typeof st === "object" && (st.op === "data.create" || st.op === "data.update" || st.op === "data.upsert"));
    if (writes && !called.has(id)) orphans.push(id);
  }
  if (!orphans.length) return null;
  return `カスタムUIから呼ばれていない保存画面「${orphans.slice(0, 3).join("・")}」があります（bo.run の呼び出しが無く、この画面の保存・更新は実行されません）。UIのボタンから bo.run('${orphans[0]}', {…}) で呼ぶか、不要なら画面を削除してください。`;
}
function findDeadSaveButton(html, s) {
  const stem = (s.writeCol && s.writeCol !== "__default__" ? s.writeCol : s.id).replace(/s$/, "").toLowerCase();
  const wired = new RegExp(`bo\\s*\\.\\s*run\\s*\\(\\s*['"\`]${s.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
  for (const m of html.matchAll(/id\s*=\s*['"]([A-Za-z0-9_-]*(?:save|add|register|submit|create)[A-Za-z0-9_-]*)['"]/gi)) {
    const bid = m[1];
    if (stem && bid.toLowerCase().includes(stem) && !wired.test(html)) return bid;
  }
  return void 0;
}
function unwiredRenderWriteScreens(def) {
  const d = def;
  const html = typeof d?.render?.html === "string" ? d.render.html : "";
  if (!html) return [];
  const screens = Array.isArray(d.screens) ? d.screens : [];
  if (!screens.length) return [];
  if (/\bbo\s*\.\s*run\s*\(\s*[^'"`)\s]/.test(html)) return [];
  const WRITE = /* @__PURE__ */ new Set(["data.create", "data.update", "data.upsert"]);
  const READ = /* @__PURE__ */ new Set(["data.list", "data.get"]);
  const norm = (c) => typeof c === "string" && c ? c : "__default__";
  const called = /* @__PURE__ */ new Set();
  for (const m of html.matchAll(/\bbo\s*\.\s*run\s*\(\s*['"`]([^'"`${}]+)['"`]/g)) called.add(m[1]);
  const list = [];
  for (const s of screens) {
    if (!s || typeof s !== "object") continue;
    const ss = s;
    const id = typeof ss.id === "string" ? ss.id : "";
    if (!id) continue;
    let writeCol = null;
    const readCols = /* @__PURE__ */ new Set();
    for (const st of Array.isArray(ss.steps) ? ss.steps : []) {
      if (!st || typeof st !== "object") continue;
      const op = st.op;
      if (typeof op !== "string") continue;
      const col = norm(st.collection);
      if (WRITE.has(op)) writeCol = col;
      else if (READ.has(op)) readCols.add(col);
    }
    const inputs = (Array.isArray(ss.inputs) ? ss.inputs : []).map((i) => i?.name).filter((n) => typeof n === "string" && !!n);
    list.push({ id, writeCol, readCols, inputs });
  }
  const listedCols = /* @__PURE__ */ new Set();
  for (const s of list) if (called.has(s.id)) for (const c of s.readCols) listedCols.add(c);
  const out = [];
  for (const s of list) {
    if (!s.writeCol) continue;
    if (called.has(s.id)) continue;
    if (!listedCols.has(s.writeCol)) continue;
    out.push({ id: s.id, inputs: s.inputs, collection: s.writeCol === "__default__" ? "" : s.writeCol, deadButtonId: findDeadSaveButton(html, s) });
  }
  return out;
}
function objectLiteralKeys(obj) {
  return new Set([...obj.matchAll(/(?:^|[{,\s])['"]?([A-Za-z_$][\w$]*)['"]?\s*:/g)].map((x) => x[1]));
}
function resolveLiteralPayloadVars(html) {
  const cand = /* @__PURE__ */ new Map();
  for (const m of html.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(\{[^{}]{0,600}\})/g)) {
    const name = m[1];
    const prev = cand.get(name);
    cand.set(name, { keys: objectLiteralKeys(m[2]), decls: (prev?.decls ?? 0) + 1 });
  }
  const out = /* @__PURE__ */ new Map();
  for (const [name, info] of cand) {
    if (info.decls !== 1) continue;
    const esc = name.replace(/[$]/g, "\\$&");
    const assigns = (html.match(new RegExp(`\\b${esc}\\s*=(?!=)`, "g")) || []).length;
    const mutate = new RegExp(`\\b${esc}\\s*(?:\\.[\\w$]+|\\[[^\\]]*\\])\\s*=(?!=)|Object\\.assign\\s*\\(\\s*${esc}\\b|\\.\\.\\.\\s*${esc}\\b`);
    if (assigns > 1 || mutate.test(html)) continue;
    out.set(name, info.keys);
  }
  return out;
}
function checkWriteScreenEmptyBoRun(def) {
  const d = def;
  const html = typeof d?.render?.html === "string" ? d.render.html : "";
  if (!html) return null;
  const screens = Array.isArray(d.screens) ? d.screens : [];
  const writeInputs = /* @__PURE__ */ new Map();
  for (const s of screens) {
    if (!s || typeof s !== "object") continue;
    const ss = s;
    const id = typeof ss.id === "string" ? ss.id : "";
    if (!id || ss.aiCallable === true) continue;
    const writes = Array.isArray(ss.steps) && ss.steps.some((st) => st != null && typeof st === "object" && (st.op === "data.create" || st.op === "data.update" || st.op === "data.upsert"));
    if (!writes) continue;
    const names = /* @__PURE__ */ new Set();
    for (const i of Array.isArray(ss.inputs) ? ss.inputs : []) {
      const n = i?.name;
      if (typeof n === "string" && n) names.add(n);
    }
    if (names.size) writeInputs.set(id, names);
  }
  if (!writeInputs.size) return null;
  const bad = /* @__PURE__ */ new Set();
  for (const m of html.matchAll(/\bbo\s*\.\s*run\s*\(\s*['"`]([^'"`]+)['"`]\s*(?:,\s*(\{[^{}]{0,300}\}))?\s*\)/g)) {
    const id = m[1], argStr = m[2];
    const inputs = writeInputs.get(id);
    if (!inputs) continue;
    if (argStr === void 0 || /^\{\s*\}$/.test(argStr)) {
      bad.add(id);
      continue;
    }
    const keys = [...objectLiteralKeys(argStr)];
    if (keys.length && !keys.some((k) => inputs.has(k))) bad.add(id);
  }
  const vars = resolveLiteralPayloadVars(html);
  for (const m of html.matchAll(/\bbo\s*\.\s*run\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*([A-Za-z_$][\w$]*)\s*\)/g)) {
    const inputs = writeInputs.get(m[1]);
    const keys = vars.get(m[2]);
    if (!inputs || !keys) continue;
    if (keys.size === 0) {
      bad.add(m[1]);
      continue;
    }
    if (![...keys].some((k) => inputs.has(k))) bad.add(m[1]);
  }
  if (!bad.size) return null;
  const first = [...bad][0];
  return `保存/更新画面「${[...bad].slice(0, 3).join("・")}」を一覧・読み取り目的で呼んでいます（空引数や {__list:true} 等の偽フラグ＝中身の無い/壊れた行が作られます）。一覧・表示は data.list の一覧用画面を使い、保存は入力フォームの値を渡してください（bo.run("${first}", {各入力名: 値})）。`;
}
function checkWriteScreenArgKeyMismatch(def) {
  const d = def;
  const html = typeof d?.render?.html === "string" ? d.render.html : "";
  if (!html) return null;
  const screens = Array.isArray(d.screens) ? d.screens : [];
  const writeInputs = /* @__PURE__ */ new Map();
  for (const s of screens) {
    if (!s || typeof s !== "object") continue;
    const ss = s;
    const id = typeof ss.id === "string" ? ss.id : "";
    if (!id) continue;
    const writes = Array.isArray(ss.steps) && ss.steps.some((st) => st != null && typeof st === "object" && (st.op === "data.create" || st.op === "data.update" || st.op === "data.upsert"));
    if (!writes) continue;
    const names = /* @__PURE__ */ new Set();
    for (const i of Array.isArray(ss.inputs) ? ss.inputs : []) {
      const n = i?.name;
      if (typeof n === "string" && n) names.add(n);
    }
    if (names.size) writeInputs.set(id, names);
  }
  if (!writeInputs.size) return null;
  const bad = [];
  const evalCall = (id, keys) => {
    const inputs = writeInputs.get(id);
    if (!inputs || !keys.size) return;
    const unknown = [...keys].filter((k) => !inputs.has(k));
    if (unknown.length && unknown.length < keys.size) bad.push(`${id}（${unknown.slice(0, 4).join("・")}）`);
  };
  for (const m of html.matchAll(/\bbo\s*\.\s*run\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*(\{[^{}]{1,400}\})\s*\)/g)) evalCall(m[1], objectLiteralKeys(m[2]));
  const vars = resolveLiteralPayloadVars(html);
  for (const m of html.matchAll(/\bbo\s*\.\s*run\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*([A-Za-z_$][\w$]*)\s*\)/g)) {
    const keys = vars.get(m[2]);
    if (keys) evalCall(m[1], keys);
  }
  if (!bad.length) return null;
  const uniq = [...new Set(bad)];
  return `保存/更新画面を、その画面の入力名に無いキーで呼んでいます：${uniq.slice(0, 3).join("／")}。bo.run の引数キーは画面の入力（inputs[].name）と完全一致させてください＝一致しないキーは無視され値が渡らず保存が壊れます（例：storeId を store_id と綴らない）。`;
}
function collectionsNeedingWriter(def, opts) {
  const suppress = opts?.suppressWhenNoWriters ?? true;
  const d = def;
  const readers = /* @__PURE__ */ new Set();
  const writers = /* @__PURE__ */ new Set();
  const WRITE = /* @__PURE__ */ new Set(["data.create", "data.update", "data.upsert"]);
  const READ = /* @__PURE__ */ new Set(["data.list", "data.get"]);
  const norm = (c) => typeof c === "string" && c ? c : "__default__";
  const scan = (steps) => {
    if (!Array.isArray(steps)) return;
    for (const st of steps) {
      if (!st || typeof st !== "object") continue;
      const op = st.op;
      if (typeof op !== "string") continue;
      const col = norm(st.collection);
      if (WRITE.has(op)) writers.add(col);
      else if (READ.has(op)) readers.add(col);
    }
  };
  const screens = Array.isArray(d.screens) ? d.screens : [];
  for (const s of screens) if (s && typeof s === "object") scan(s.steps);
  scan(d.steps);
  if (suppress && !writers.size) return [];
  return [...readers].filter((c) => !writers.has(c));
}
function checkReadOnlyCollections(def) {
  const dead = collectionsNeedingWriter(def);
  if (!dead.length) return null;
  const shown = dead.map((c) => c === "__default__" ? "(既定)" : c);
  return `一覧/取得はあるのに保存する画面が無いデータ種別「${shown.slice(0, 3).join("・")}」があります（このデータを追加する手段が無く一覧が常に空になります）。保存/更新画面（data.create か data.upsert）を作ってこのデータを登録できるようにするか、不要ならその一覧を削除してください。`;
}
const RECON_VERB_TOKENS = /* @__PURE__ */ new Set(["list", "view", "index", "all", "save", "create", "add", "new", "edit", "update", "upsert", "get", "detail", "show", "fetch", "read", "delete", "remove", "search", "find", "form", "manage", "input", "data", "screen", "page"]);
function reconTokenize(id) {
  const spaced = id.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[^A-Za-z0-9]+/g, " ").toLowerCase();
  const nouns = /* @__PURE__ */ new Set();
  const verbs = /* @__PURE__ */ new Set();
  for (let t of spaced.split(/\s+/)) {
    if (!t) continue;
    if (t.length > 3 && t.endsWith("s")) t = t.slice(0, -1);
    if (RECON_VERB_TOKENS.has(t)) verbs.add(t);
    else nouns.add(t);
  }
  return { nouns, verbs };
}
const reconIsIdLike = (s) => /^id$|_id$|Id$|record_?id/i.test(s);
function reconcileDataCollections(def) {
  const changes = [];
  try {
    if (!def || typeof def !== "object") return changes;
    const d = def;
    const screens = Array.isArray(d.screens) ? d.screens : [d];
    const ops = [];
    for (const s of screens) {
      const steps = s && typeof s === "object" && Array.isArray(s.steps) ? s.steps : [];
      for (const st of steps) if (st && typeof st === "object" && /^data\.(create|list|get|update|remove|upsert)$/.test(String(st.op ?? ""))) ops.push(st);
    }
    if (!ops.length) return changes;
    const named = /* @__PURE__ */ new Set();
    for (const o of ops) {
      const c = o.collection;
      if (typeof c === "string" && c.trim()) named.add(c.trim());
    }
    if (named.size !== 1) return changes;
    const C = [...named][0];
    for (const o of ops) {
      const c = o.collection;
      if (c == null || typeof c === "string" && !c.trim()) {
        o.collection = C;
        changes.push(`${o.op} の collection を '${C}' に整合（保存と一覧の不一致で一覧が空になるのを防止）`);
      }
    }
  } catch {
  }
  return changes;
}
function reconcileWriteFormToReadScreen(def) {
  const changes = [];
  try {
    if (!def || typeof def !== "object") return changes;
    const d = def;
    let html = typeof d.render?.html === "string" ? d.render.html : "";
    const screens = Array.isArray(d.screens) ? d.screens : [];
    if (!html || !screens.length) return changes;
    const WRITE = /* @__PURE__ */ new Set(["data.create", "data.update", "data.upsert"]);
    const READ = /* @__PURE__ */ new Set(["data.list", "data.get"]);
    const norm = (c) => typeof c === "string" && c ? c : "__default__";
    const readOnly = /* @__PURE__ */ new Map();
    const writerByCol = /* @__PURE__ */ new Map();
    for (const s of screens) {
      if (!s || typeof s !== "object") continue;
      const ss = s;
      const id = typeof ss.id === "string" ? ss.id : "";
      if (!id) continue;
      let writes = false, writeCol = null, readCol = null;
      for (const st of Array.isArray(ss.steps) ? ss.steps : []) {
        if (!st || typeof st !== "object") continue;
        const op = st.op;
        if (typeof op !== "string") continue;
        const col = norm(st.collection);
        if (WRITE.has(op)) {
          writes = true;
          writeCol = col;
        } else if (READ.has(op) && readCol == null) readCol = col;
      }
      if (writes) {
        if (writeCol && !writerByCol.has(writeCol)) writerByCol.set(writeCol, id);
      } else if (readCol != null) readOnly.set(id, readCol);
    }
    if (!readOnly.size || !writerByCol.size) return changes;
    const isIdName = (k) => /^(id|record_?id)$/i.test(k);
    for (const mm of [...html.matchAll(/\bbo\s*\.\s*run\s*\(\s*(['"`])([A-Za-z0-9_]+)\1\s*,\s*([^);]*)/g)]) {
      const sid = mm[2];
      const arg = (mm[3] || "").trim();
      const readCol = readOnly.get(sid);
      if (readCol == null) continue;
      if (!arg || arg === "{}") continue;
      let saveIntent = false;
      if (arg.startsWith("{")) {
        const keys = [...arg.matchAll(/(?:^|[{,\s])['"]?([A-Za-z_$][\w$]*)['"]?\s*:/g)].map((x) => x[1]);
        saveIntent = keys.filter((k) => !isIdName(k)).length >= 2;
      } else if (/^[A-Za-z_$][\w$]*$/.test(arg)) {
        saveIntent = !isIdName(arg);
      }
      if (!saveIntent) continue;
      const writer = writerByCol.get(readCol);
      if (!writer || writer === sid) continue;
      const esc = sid.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rep = new RegExp(`(\\bbo\\s*\\.\\s*run\\s*\\(\\s*['"\`])${esc}(['"\`]\\s*,\\s*(?!\\s*\\{\\s*\\}))`, "g");
      const before = html;
      html = html.replace(rep, `$1${writer}$2`);
      if (html !== before) changes.push(`保存フォームの送信先を read画面「${sid}」→ 書込画面「${writer}」へ張り替え（一覧画面に保存していたため保存されなかった）`);
    }
    if (changes.length && d.render && typeof d.render === "object") d.render.html = html;
  } catch {
  }
  return changes;
}
function checkDataCollections(def) {
  try {
    if (!def || typeof def !== "object") return null;
    const d = def;
    const screens = Array.isArray(d.screens) ? d.screens : [d];
    const key = (c) => typeof c === "string" && c.trim() ? c.trim() : "«既定»";
    const writes = /* @__PURE__ */ new Set();
    const reads = /* @__PURE__ */ new Set();
    for (const s of screens) {
      const steps = s && typeof s === "object" && Array.isArray(s.steps) ? s.steps : [];
      for (const st of steps) {
        if (!st || typeof st !== "object") continue;
        const op = String(st.op ?? "");
        const k = key(st.collection);
        if (op === "data.create" || op === "data.upsert") writes.add(k);
        else if (op === "data.list" || op === "data.get") reads.add(k);
      }
    }
    if (!reads.size || !writes.size) return null;
    const orphan = [...reads].filter((r) => !writes.has(r));
    if (orphan.length) return `一覧/取得が参照する保存先 ${orphan.map((o) => `'${o}'`).join(", ")} に対応する保存(data.create)がありません（data.create と data.list の collection 不一致＝一覧が常に空になります）。両者の collection を一致させてください。`;
    return null;
  } catch {
    return null;
  }
}
function reconcileRenderScreenRefs(def) {
  const changes = [];
  try {
    if (!def || typeof def !== "object") return changes;
    const d = def;
    let html = typeof d.render?.html === "string" ? d.render.html : "";
    const screens = Array.isArray(d.screens) ? d.screens : [];
    if (!html || !screens.length) return changes;
    const ids = screens.map((s) => s && typeof s === "object" ? String(s.id ?? "") : "").filter(Boolean);
    const idSet = new Set(ids);
    const tokById = new Map(ids.map((id) => [id, reconTokenize(id)]));
    const called = /* @__PURE__ */ new Set();
    for (const m of html.matchAll(/\bbo\s*\.\s*run\s*\(\s*['"`]([^'"`]+)['"`]/g)) called.add(m[1]);
    for (const ref of called) {
      if (idSet.has(ref)) continue;
      const rt = reconTokenize(ref);
      let best = null;
      let tie = false;
      for (const id of ids) {
        const st = tokById.get(id);
        let nounHits = 0;
        let verbHits = 0;
        for (const n of rt.nouns) if (st.nouns.has(n)) nounHits++;
        for (const v of rt.verbs) if (st.verbs.has(v)) verbHits++;
        const score = nounHits * 2 + verbHits;
        if (score <= 0) continue;
        if (!best || score > best.score) {
          best = { id, score, nounHits };
          tie = false;
        } else if (score === best.score) tie = true;
      }
      if (best && !tie && best.nounHits >= 1) {
        const winner = best.id;
        const esc = ref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp("(bo\\s*\\.\\s*run\\s*\\(\\s*)(['\"`])" + esc + "\\2", "g");
        const nextHtml = html.replace(re, (_m, p1, q) => p1 + q + winner + q);
        if (nextHtml !== html) {
          html = nextHtml;
          changes.push(`bo.run 参照「${ref}」→「${winner}」に整合`);
        }
      }
    }
    if (changes.length && d.render) d.render.html = html;
    const provided = /* @__PURE__ */ new Map();
    for (const m of html.matchAll(/bo\.run\(\s*['"]([A-Za-z0-9_]+)['"]\s*,\s*\{((?:[^{}]|\{[^{}]*\})*)\}/g)) {
      const id = m[1];
      const body = m[2] ?? "";
      const keys = provided.get(id) ?? /* @__PURE__ */ new Set();
      for (const k of body.matchAll(/(?:^|[,{])\s*['"]?([A-Za-z_$][\w$]*)['"]?\s*(?=[:,}]|$)/g)) keys.add(k[1]);
      provided.set(id, keys);
    }
    for (const s of screens) {
      if (!s || typeof s !== "object") continue;
      const sid = String(s.id ?? "");
      const prov = sid ? provided.get(sid) : void 0;
      if (!prov) continue;
      const inputs = Array.isArray(s.inputs) ? s.inputs : [];
      const idInputs = inputs.filter((i) => i && typeof i === "object" && typeof i.name === "string" && reconIsIdLike(i.name));
      if (idInputs.length !== 1) continue;
      const old = String(idInputs[0].name);
      if (prov.has(old)) continue;
      const provIdKeys = [...prov].filter(reconIsIdLike);
      if (provIdKeys.length !== 1) continue;
      const next = provIdKeys[0];
      if (next === old || inputs.some((i) => i && typeof i === "object" && i.name === next)) continue;
      idInputs[0].name = next;
      const reRef = new RegExp("\\$" + old + "(?![A-Za-z0-9_])", "g");
      for (const key of ["steps", "output"]) {
        const v = s[key];
        if (v != null) s[key] = JSON.parse(JSON.stringify(v).replace(reRef, () => "$" + next));
      }
      changes.push(`画面「${sid}」の入力キー「${old}」→「${next}」に整合（UI送信キーへ）`);
    }
  } catch {
  }
  return changes;
}
function validateDefinition(input) {
  const issues = [];
  const required = /* @__PURE__ */ new Set();
  const add = (path, message) => issues.push({ path, message });
  if (typeof input !== "object" || input === null) {
    return { ok: false, issues: [{ path: "", message: "定義がオブジェクトではありません。" }], requiredPermissions: [] };
  }
  const d = input;
  if (d.schema !== APP_SCHEMA) add("schema", `schema は "${APP_SCHEMA}" である必要があります。`);
  if (typeof d.id !== "string" || !d.id.trim()) add("id", "id が必要です。");
  if (typeof d.name !== "string" || !d.name.trim()) add("name", "name が必要です。");
  if (typeof d.version !== "string" || !/^\d+\.\d+\.\d+$/.test(d.version ?? "")) add("version", "version は semver（例 0.1.0）で指定してください。");
  const declared = Array.isArray(d.permissions) ? d.permissions : [];
  for (const p of declared) if (!ALLOWED_PERMISSIONS.has(p)) add("permissions", `未知/不許可の権限：${p}`);
  const validateUnit = (inputsArr, stepsArr, output, prefix, optionalOutput = false) => {
    const inputNames = /* @__PURE__ */ new Set();
    const fileProducers = /* @__PURE__ */ new Set();
    if (!Array.isArray(inputsArr)) add(`${prefix}inputs`, "inputs は配列である必要があります。");
    else inputsArr.forEach((inp, i) => {
      if (!inp || typeof inp !== "object") {
        add(`${prefix}inputs[${i}]`, "入力定義が不正です。");
        return;
      }
      if (typeof inp.name !== "string" || !IDENT.test(inp.name)) add(`${prefix}inputs[${i}].name`, "name は識別子（英字始まり）で指定してください。");
      else {
        inputNames.add(inp.name);
        if (inp.type === "file" || inp.type === "signature") fileProducers.add(inp.name);
      }
      if (!INPUT_TYPES.includes(inp.type)) add(`${prefix}inputs[${i}].type`, `type は ${INPUT_TYPES.join("/")} のいずれか。`);
      if (OPTION_INPUT_TYPES.includes(inp.type) && (!Array.isArray(inp.options) || inp.options.length === 0)) add(`${prefix}inputs[${i}].options`, `${inp.type} には options（選択肢）が必要です。`);
    });
    const bound = new Set(inputNames);
    bound.add("rec");
    const refOk = (ref) => typeof ref === "string" && (!ref.startsWith("$") || bound.has(ref.slice(1)));
    const refNonEmpty = (ref) => refOk(ref) && ref.trim().length > 0;
    if (!Array.isArray(stepsArr) || stepsArr.length === 0) add(`${prefix}steps`, "steps は1つ以上必要です。");
    else stepsArr.forEach((s, i) => {
      const at = `${prefix}steps[${i}]`;
      if (!s || typeof s !== "object" || !ALL_OPS.includes(s.op)) {
        add(at, `op は次のいずれか：${ALL_OPS.join("/")}`);
        return;
      }
      const perm = OP_PERMISSION[s.op];
      if (perm) {
        required.add(perm);
        if (!declared.includes(perm)) add(`${at}.op`, `op ${s.op} には権限 ${perm} の宣言が必要です。`);
      }
      if (isGoogleOp(s.op)) {
        const gErr = validateGoogleStep(s.op, s.google);
        if (gErr) add(`${at}.google`, gErr);
        else for (const v of Object.values(s.google)) {
          if (typeof v === "string" && v.startsWith("$") && !refOk(v)) add(`${at}.google`, `未定義の参照：${v}`);
        }
      }
      switch (s.op) {
        case "ai.infer":
          if (typeof s.prompt !== "string" || !s.prompt.trim()) add(`${at}.prompt`, "ai.infer には prompt が必要です。");
          for (const a of s.attach ?? []) if (!refOk(a)) add(`${at}.attach`, `未定義の参照：${a}`);
          break;
        case "transform":
          if (typeof s.template !== "string" && s.from === void 0) add(at, "transform は template（{{}}展開）か from（値の参照）が必要です。");
          if (typeof s.path === "string" && s.from === void 0) add(`${at}.from`, "path 抽出には from（抽出元の参照）が必要です。");
          if (s.from !== void 0 && !refOk(s.from)) add(`${at}.from`, `未定義の参照：${s.from}`);
          break;
        case "file.save":
          if (!refOk(s.from)) add(`${at}.from`, "file.save には保存元 from（参照）が必要です。");
          if (typeof s.filename !== "string" || !s.filename.trim()) add(`${at}.filename`, "file.save には filename が必要です。");
          break;
        case "file.read":
          if (!refOk(s.fileId)) add(`${at}.fileId`, "file.read には fileId（参照）が必要です。");
          break;
        case "db.query":
        case "db.write":
          add(`${at}.op`, `${s.op}（生SQL）は使用できません。保存=data.create／一覧=data.list／取得=data.get／更新=data.update／削除=data.remove を使ってください。`);
          break;
        case "db.delete":
          if (!refNonEmpty(s.from)) add(`${at}.from`, 'db.delete には削除するレコードの id 参照（from）が必要です。例：from を "$id"。');
          break;
        case "data.create":
          if (!refOk(s.from)) add(`${at}.from`, 'data.create には保存する内容の参照（from）が必要です。例：from を "$rec"。');
          if (s.collection !== void 0 && !IDENT.test(s.collection)) add(`${at}.collection`, "collection は識別子（英字始まり）で指定してください。");
          break;
        case "data.upsert":
          if (!refNonEmpty(s.from)) add(`${at}.from`, 'data.upsert には保存する内容（オブジェクト）の参照 from が必要です。例：from を "$rec"。');
          if (s.collection !== void 0 && !IDENT.test(s.collection)) add(`${at}.collection`, "collection は識別子（英字始まり）で指定してください。");
          if (!Array.isArray(s.keyFields) || s.keyFields.length === 0) add(`${at}.keyFields`, 'data.upsert には一致キー keyFields（1つ以上）が必要です＝同一組合せを更新する条件（例 ["store_id","keyword_id","year_month"]）。無いと毎回新規作成になり重複します。');
          else if (s.keyFields.some((k) => typeof k !== "string" || !IDENT.test(k))) add(`${at}.keyFields`, "keyFields は一致キー名（英字始まりの識別子）の配列で指定してください。");
          break;
        case "data.update":
          if (!refNonEmpty(s.recordId)) add(`${at}.recordId`, 'data.update には対象レコードの id 参照（recordId）が必要です。例：recordId を "$id"。');
          if (s.from === void 0 && s.status === void 0) add(`${at}`, "data.update には from（更新内容のオブジェクト）か status（状態）のどちらかが必要です。");
          else if (s.from !== void 0 && !refOk(s.from)) add(`${at}.from`, 'data.update の from は steps の as を "$名" で参照します。');
          else if (s.status === void 0 && typeof s.from === "string" && s.from.startsWith("$")) {
            const fromName = s.from.slice(1);
            const prod = Array.isArray(stepsArr) ? stepsArr.slice(0, i).reverse().find((x) => x && typeof x === "object" && x.as === fromName) : void 0;
            const stripped = prod && typeof prod.template === "string" ? prod.template.replace(/\{\{[^}]*\}\}/g, "").trim() : "";
            const scalarTemplate = !!prod && prod.op === "transform" && (prod.path !== void 0 || typeof prod.template === "string" && !/^[[{]/.test(stripped));
            if (scalarTemplate) add(`${at}.from`, `data.update の from が単一値（オブジェクトでない）を指しています＝レコード全体がその値で置換され他の項目が消えます。状態だけ変えるなら status:'$status'（または record.status）、一部フィールドの更新は {"フィールド":"{{値}}"} の部分オブジェクトを transform で作って from に渡してください。`);
          }
          if (s.collection !== void 0 && !IDENT.test(s.collection)) add(`${at}.collection`, "collection は識別子（英字始まり）で指定してください。");
          break;
        case "data.get":
        case "data.remove":
          if (!refNonEmpty(s.recordId)) add(`${at}.recordId`, `${s.op} には対象レコードの id 参照（recordId）が必要です。例：recordId を "$id"。`);
          if (s.collection !== void 0 && !IDENT.test(s.collection)) add(`${at}.collection`, "collection は識別子（英字始まり）で指定してください。");
          break;
        case "data.list":
          if (s.collection !== void 0 && !IDENT.test(s.collection)) add(`${at}.collection`, "collection は識別子（英字始まり）で指定してください。");
          break;
        case "knowledge.search":
          if (!refOk(s.from)) add(`${at}.from`, 'knowledge.search には検索クエリの参照（from）が必要です。例：from を "$question"。');
          break;
        case "record.status":
          if (!refNonEmpty(s.from)) add(`${at}.from`, 'record.status には対象レコードの id 参照（from）が必要です。例：from を "$id"。');
          if (typeof s.to !== "string" || !s.to.trim()) add(`${at}.to`, 'record.status には遷移先の状態 to が必要です（例 "approved"）。');
          if (!Array.isArray(s.requiredRoles) || s.requiredRoles.length === 0) add(`${at}.requiredRoles`, 'record.status には実行できるロール requiredRoles（1つ以上）が必要です（例 ["admin"]）。承認操作の権限は省略できません。');
          else if (s.requiredRoles.some((r) => !APP_ROLES.includes(r))) add(`${at}.requiredRoles`, `requiredRoles は ${APP_ROLES.join("/")} の配列で指定してください。`);
          if (typeof s.fromStatus !== "string" || !s.fromStatus.trim()) add(`${at}.fromStatus`, 'record.status には遷移元の状態 fromStatus が必要です（例 "pending"）。未定義の状態遷移を防ぎます。');
          break;
        case "notify":
          if (s.channel !== "inapp" && s.channel !== "email") add(`${at}.channel`, "notify の channel は inapp か email を指定してください。");
          if (typeof s.message !== "string" || !s.message.trim()) add(`${at}.message`, "notify には message（本文）が必要です。");
          if (s.channel === "email") {
            if (typeof s.to !== "string" || !s.to.trim()) add(`${at}.to`, "メール通知には宛先 to が必要です。");
            if (typeof s.subject !== "string" || !s.subject.trim()) add(`${at}.subject`, "メール通知には subject（件名）が必要です。");
          }
          break;
        case "message.send":
          if (typeof s.channel !== "string" || !s.channel.trim()) add(`${at}.channel`, "message.send には送信先チャンネル channel（連携済みチャンネルid）が必要です。");
          else if (s.channel === "inapp" || s.channel === "email") add(`${at}.channel`, "message.send の channel は LINE/Discord/Slack の連携チャンネルidを指定してください（inapp/email はアプリ内通知 notify 用です）。");
          if (typeof s.message !== "string" || !s.message.trim()) add(`${at}.message`, "message.send には message（本文）が必要です。");
          break;
        case "http.fetch": {
          if (typeof s.url !== "string" || !/^https:\/\//.test(s.url)) add(`${at}.url`, "http.fetch の url は https のみ許可されます。");
          else {
            const host = hostOf(s.url);
            const allow = Array.isArray(d.allowHosts) ? d.allowHosts : [];
            if (!host || !allow.includes(host)) add(`${at}.url`, `送信先 ${host ?? s.url} は allowHosts に未登録です。`);
            else if (isBlockedHost(host)) add(`${at}.url`, `内部/ローカルのホストへは送信できません：${host}`);
          }
          break;
        }
      }
      if (typeof s.as === "string") {
        if (!IDENT.test(s.as)) add(`${at}.as`, "as は識別子で指定してください。");
        else {
          bound.add(s.as);
          if (s.op === "file.save") fileProducers.add(s.as);
        }
      }
    });
    if (output === void 0 || output === null) {
      if (!optionalOutput) add(`${prefix}output`, "output が必要です。");
    } else if (typeof output !== "object") {
      add(`${prefix}output`, "output が必要です。");
    } else {
      const o = output;
      if (!["text", "file", "table", "chart"].includes(o.type)) add(`${prefix}output.type`, "output.type は text/file/table/chart のいずれか。");
      if (!refOk(o.from)) add(`${prefix}output.from`, `未定義の参照：${o.from}`);
      else if (o.type === "file") {
        const fromName = typeof o.from === "string" && o.from.startsWith("$") ? o.from.slice(1) : "";
        if (!fileProducers.has(fromName)) add(`${prefix}output.from`, `output.type=file には、ファイル入力（file/signature）か file.save の結果（as）を from に指定してください。テキスト等の結果は file 出力にできません（参照：${o.from}）。`);
      }
    }
  };
  const hasRender = d.render !== void 0 && d.render !== null;
  if (hasRender) {
    const r = d.render;
    const html = r.html;
    if (typeof html !== "string" || !html.trim()) add("render.html", "render.html（HTML文字列）が必要です。");
    else if (html.length > RENDER_HTML_MAX) add("render.html", `render.html が大きすぎます（上限 ${Math.floor(RENDER_HTML_MAX / 1024)}KB）。`);
    else {
      const jsErr = checkRenderScripts(html);
      if (jsErr) add("render.html", `カスタムUIのスクリプトに構文エラーがあり全ボタンが動かなくなります（要修正）：${jsErr}`);
      else {
        const hErr = checkRenderHandlers(html);
        if (hErr) add("render.html", hErr);
      }
    }
    if (r.isolation !== void 0 && r.isolation !== "sandboxed" && r.isolation !== "relaxed") add("render.isolation", 'render.isolation は "sandboxed" か "relaxed" を指定してください。');
    const rHosts = Array.isArray(r.allowHosts) ? r.allowHosts.filter((h) => typeof h === "string") : [];
    for (const ah of rHosts) if (isBlockedHost(ah)) add("render.allowHosts", `内部/ローカルのホストは許可できません：${ah}`);
    const cHosts = Array.isArray(r.connectHosts) ? r.connectHosts.filter((h) => typeof h === "string") : [];
    for (const ch of cHosts) if (isBlockedHost(ch)) add("render.connectHosts", `内部/ローカルのホストは許可できません：${ch}`);
    if (r.isolation === "relaxed" && typeof html === "string") {
      for (const m of html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["'](https?:\/\/([^/"'?#]+)[^"']*)["']/gi)) {
        const url = m[1];
        const host = m[2].toLowerCase();
        if (!rHosts.some((h) => h.toLowerCase() === host)) add("render.allowHosts", `外部スクリプト ${host} を読み込むには render.allowHosts に ${host} を宣言してください。`);
        if (!isVersionPinned(url)) add("render.html", `外部スクリプトは版を固定してください（${host} の URL に @1.2.3 等のバージョンが必要・/latest/ は不可）。`);
      }
      for (const m of html.matchAll(/<link\b[^>]*\bhref\s*=\s*["'](https?:\/\/([^/"'?#]+)[^"']*)["'][^>]*>/gi)) {
        if (!/\brel\s*=\s*["'][^"']*\bstylesheet\b/i.test(m[0])) continue;
        const url = m[1];
        const host = m[2].toLowerCase();
        if (!rHosts.some((h) => h.toLowerCase() === host)) add("render.allowHosts", `外部スタイルシート ${host} を読み込むには render.allowHosts に ${host} を宣言してください。`);
        if (!isVersionPinned(url)) add("render.html", `外部スタイルシートは版を固定してください（${host} の URL に版が必要・/latest/ は不可）。`);
      }
    }
  }
  const uiOnly = hasRender && (!Array.isArray(d.screens) || d.screens.length === 0) && (!Array.isArray(d.steps) || d.steps.length === 0);
  if (Array.isArray(d.screens) && d.screens.length > 0) {
    const ids = /* @__PURE__ */ new Set();
    d.screens.forEach((sc, i) => {
      if (!sc || typeof sc !== "object") {
        add(`screens[${i}]`, "画面定義が不正です。");
        return;
      }
      if (typeof sc.id !== "string" || !IDENT.test(sc.id)) add(`screens[${i}].id`, "画面の id は識別子（英字始まり）で指定してください。");
      else if (ids.has(sc.id)) add(`screens[${i}].id`, `画面の id が重複しています：${sc.id}`);
      else ids.add(sc.id);
      if (!hasRender && (typeof sc.title !== "string" || !sc.title.trim())) add(`screens[${i}].title`, "画面の title が必要です。");
      if (sc.requiredRoles !== void 0 && (!Array.isArray(sc.requiredRoles) || sc.requiredRoles.some((r) => !APP_ROLES.includes(r)))) add(`screens[${i}].requiredRoles`, `requiredRoles は ${APP_ROLES.join("/")} の配列で指定してください。`);
      validateUnit(sc.inputs, sc.steps, sc.output, `screens[${i}].`, hasRender);
    });
  } else if (!uiOnly) {
    validateUnit(d.inputs, d.steps, d.output, "");
  }
  if (d.triggers !== void 0) {
    if (!Array.isArray(d.triggers)) add("triggers", "triggers は配列である必要があります。");
    else {
      const screenIds = new Set(
        (Array.isArray(d.screens) ? d.screens : []).map((s) => s && typeof s === "object" ? String(s.id ?? "") : "").filter(Boolean)
      );
      const tIds = /* @__PURE__ */ new Set();
      d.triggers.forEach((t, i) => {
        const at = `triggers[${i}]`;
        if (!t || typeof t !== "object") {
          add(at, "トリガ定義が不正です。");
          return;
        }
        if (typeof t.id !== "string" || !t.id.trim()) add(`${at}.id`, "トリガには id が必要です。");
        else if (tIds.has(t.id)) add(`${at}.id`, `トリガの id が重複しています：${t.id}`);
        else tIds.add(t.id);
        if (typeof t.screenId !== "string" || !screenIds.has(t.screenId)) add(`${at}.screenId`, `screenId は screens[] に存在する画面を指定してください：${String(t.screenId ?? "")}`);
        if (t.requiredRoles !== void 0 && (!Array.isArray(t.requiredRoles) || t.requiredRoles.some((r) => !APP_ROLES.includes(r)))) add(`${at}.requiredRoles`, `requiredRoles は ${APP_ROLES.join("/")} の配列で指定してください。`);
        if (t.inputMap !== void 0 && (typeof t.inputMap !== "object" || t.inputMap === null || Array.isArray(t.inputMap))) add(`${at}.inputMap`, "inputMap はオブジェクト（イベント値→画面入力名）で指定してください。");
        if (t.source === "messaging") {
          if (!MESSAGING_TRIGGER_EVENTS.includes(t.event)) add(`${at}.event`, `messaging トリガの event は ${MESSAGING_TRIGGER_EVENTS.join("/")} のいずれかです。`);
          if (t.connectors !== void 0) {
            if (!Array.isArray(t.connectors)) add(`${at}.connectors`, `connectors は ${MESSAGING_CONNECTORS.join("/")} の配列です。`);
            else for (const c of t.connectors) if (!MESSAGING_CONNECTORS.includes(c)) add(`${at}.connectors`, `connectors は ${MESSAGING_CONNECTORS.join("/")} のいずれかです：${String(c)}`);
          }
          if ((t.event === "text" || t.event === "message") && (typeof t.match !== "string" || !t.match.trim())) add(`${at}.match`, "text/message トリガには match（本文に含むキーワード）が必要です（全メッセージの誤取り込みを防ぎます）。");
          required.add("messaging:receive");
          if (!declared.includes("messaging:receive")) add(`${at}.source`, "messaging トリガには権限 messaging:receive の宣言が必要です。");
        } else if (t.source === "google") {
          if (!GOOGLE_TRIGGER_SERVICES.includes(t.service)) add(`${at}.service`, `google トリガの service は ${GOOGLE_TRIGGER_SERVICES.join("/")} のいずれかです。`);
          if (typeof t.event !== "string" || !t.event.trim()) add(`${at}.event`, "google トリガには event が必要です。");
          const perm = `google:${t.service}:read`;
          if (ALLOWED_PERMISSIONS.has(perm)) {
            required.add(perm);
            if (!declared.includes(perm)) add(`${at}.source`, `google トリガ（${t.service}）には権限 ${perm} の宣言が必要です。`);
          } else add(`${at}.service`, `google トリガの service には対応する読み取り権限がありません：${String(t.service ?? "")}`);
        } else {
          add(`${at}.source`, "source は messaging か google を指定してください。");
        }
      });
    }
  }
  if (d.dataScope !== void 0 && d.dataScope !== "personal" && d.dataScope !== "shared") add("dataScope", "dataScope は personal か shared を指定してください。");
  if (required.has("net") && (!Array.isArray(d.allowHosts) || d.allowHosts.length === 0)) add("allowHosts", "http.fetch（net）を使うには allowHosts の宣言が必要です。");
  for (const ah of d.allowHosts ?? []) if (isBlockedHost(ah)) add("allowHosts", `内部/ローカルのホストは許可できません：${ah}`);
  if (hasRender) {
    const html = d.render.html;
    if (typeof html === "string") {
      const defined = new Set(
        (Array.isArray(d.screens) ? d.screens : []).map((s) => s && typeof s === "object" ? String(s.id ?? "") : "").filter(Boolean)
      );
      const refs = /* @__PURE__ */ new Set();
      for (const m of html.matchAll(/\bbo\s*\.\s*run\(\s*['"]([^'"]+)['"]/g)) refs.add(m[1]);
      for (const r of refs) if (!defined.has(r)) add("render.html", `カスタムUIが呼び出す画面「${r}」が screens[] に定義されていません（bo.run の呼び先が無く動作しません）。`);
    }
  }
  return { ok: issues.length === 0, issues, requiredPermissions: [...required] };
}
function stepsForEffects(def, screenId) {
  if (Array.isArray(def.screens) && def.screens.length > 0) {
    const sc = screenId !== void 0 && screenId !== "" ? def.screens.find((s) => s.id === screenId) : def.screens[0];
    return Array.isArray(sc?.steps) ? sc.steps : [];
  }
  return Array.isArray(def.steps) ? def.steps : [];
}
function appApprovalEffects(def, screenId) {
  let external = false;
  let irreversible = false;
  const ops = /* @__PURE__ */ new Set();
  const hosts = /* @__PURE__ */ new Set();
  const emailTo = /* @__PURE__ */ new Set();
  for (const s of stepsForEffects(def, screenId)) {
    switch (s.op) {
      case "http.fetch":
        external = true;
        ops.add("外部HTTP送信");
        try {
          if (s.url) hosts.add(new URL(s.url).host);
        } catch {
        }
        break;
      case "notify":
        if (s.channel === "email") {
          external = true;
          ops.add("メール送信");
          if (s.to) emailTo.add(s.to);
        }
        break;
      case "message.send":
        external = true;
        ops.add(s.channel ? `外部メッセージ送信（${s.channel}）` : "外部メッセージ送信");
        break;
      case "data.remove":
      case "db.delete":
        irreversible = true;
        ops.add("データ削除");
        break;
      case "record.status":
        irreversible = true;
        ops.add("承認状態の変更");
        break;
      default:
        if (isGoogleOp(s.op)) {
          const eff = GOOGLE_OPS[s.op].effect;
          if (eff === "send") {
            external = true;
            ops.add("Gmail送信");
            const to = s.google?.to;
            if (typeof to === "string") emailTo.add(to);
          } else if (eff === "write" || eff === "delete") {
            irreversible = true;
            ops.add(eff === "delete" ? "Google データ削除" : "Google への書き込み");
          }
        }
        break;
    }
  }
  return { external, irreversible, ops: [...ops], hosts: [...hosts], emailTo: [...emailTo] };
}
function stepNeedsApproval(s, approvalOn) {
  switch (s.op) {
    case "http.fetch":
    case "message.send":
      return true;
    case "notify":
      return s.channel === "email";
    // inapp（アプリ内通知）は対象外
    case "data.remove":
    case "db.delete":
    case "record.status":
      return approvalOn;
    default:
      if (isGoogleOp(s.op)) {
        const eff = GOOGLE_OPS[s.op].effect;
        if (eff === "send") return true;
        if (eff === "write" || eff === "delete") return approvalOn;
      }
      return false;
  }
}
function isRenderable(input) {
  const vr = validateDefinition(input);
  if (vr.ok) return true;
  return vr.issues.every((i) => i.path === "render.html" && (i.message.includes("screens[] に定義されていません") || i.message.includes("カスタムUIのスクリプトに構文エラー") || i.message.includes("未定義の関数を呼んでいます")));
}
function roleCanOpenScreen(role, requiredRoles) {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  if (role === "admin" || role === "developer") return true;
  return !!role && requiredRoles.includes(role);
}
function normalizeInput(raw) {
  const i = raw && typeof raw === "object" ? raw : {};
  const known = INPUT_TYPES.includes(i.type);
  const name = typeof i.name === "string" ? i.name : "";
  return {
    name,
    type: known ? i.type : "text",
    label: typeof i.label === "string" && i.label ? i.label : name,
    required: i.required === true,
    options: Array.isArray(i.options) ? i.options.filter((o) => typeof o === "string") : [],
    accept: typeof i.accept === "string" ? i.accept : "",
    placeholder: typeof i.placeholder === "string" ? i.placeholder : "",
    degraded: !known && i.type !== void 0,
    originalType: known ? void 0 : typeof i.type === "string" ? i.type : void 0
  };
}
const normalizeInputs = (arr) => Array.isArray(arr) ? arr.map(normalizeInput).filter((x) => x.name) : [];
function normalizeScreens(def) {
  const d = def && typeof def === "object" ? def : {};
  if (Array.isArray(d.screens) && d.screens.length > 0) {
    return d.screens.map((s, idx) => {
      const sc = s && typeof s === "object" ? s : {};
      return {
        id: typeof sc.id === "string" ? sc.id : `screen${idx}`,
        title: typeof sc.title === "string" && sc.title ? sc.title : `画面${idx + 1}`,
        inputs: normalizeInputs(sc.inputs),
        submitLabel: sc.ui?.submitLabel ?? "実行する",
        requiredRoles: Array.isArray(sc.requiredRoles) ? sc.requiredRoles.filter((r) => APP_ROLES.includes(r)) : []
      };
    });
  }
  return [{ id: "", title: "", inputs: normalizeInputs(d.inputs), submitLabel: d.ui?.submitLabel ?? "実行する", requiredRoles: [] }];
}
export {
  ALL_OPS,
  APP_ROLES,
  APP_SCHEMA,
  GENERATED_OPS,
  GOOGLE_TRIGGER_SERVICES,
  MESSAGING_CONNECTORS,
  MESSAGING_TRIGGER_EVENTS,
  OPTION_INPUT_TYPES,
  OP_PERMISSION,
  RENDER_HTML_MAX,
  appApprovalEffects,
  checkDataCollections,
  checkOrphanDataScreens,
  checkReadOnlyCollections,
  checkRenderBusReachability,
  checkRenderDataKeys,
  checkRenderDomRefs,
  checkRenderHandlers,
  checkRenderScreens,
  checkRenderScripts,
  checkRenderScriptsParsed,
  checkWriteScreenArgKeyMismatch,
  checkWriteScreenEmptyBoRun,
  collectionsNeedingWriter,
  googleOpCatalogText,
  isBlockedHost,
  isRenderable,
  normalizeScreens,
  opCatalogText,
  reconcileDataCollections,
  reconcileRenderScreenRefs,
  reconcileWriteFormToReadScreen,
  roleCanOpenScreen,
  sanitizeRenderHtml,
  stepNeedsApproval,
  unwiredRenderWriteScreens,
  validateDefinition
};
