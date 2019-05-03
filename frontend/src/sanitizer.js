
const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    "`": '&#96;',
    "/": '&#47;',
    "\\": '&#92;',
};
export function Sanitize(unSafeString){
   return unSafeString.replace(/[&<>"'`/\\]/g, (match)=>(map[match]));
}