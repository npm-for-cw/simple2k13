
function objectToQuery(obj: { [params: string]: any }, prefix?: string):string {
  if (typeof obj !== "object") return "";
  const attrs = Object.keys(obj);
  return attrs.reduce((query, attr, index) => {
    const value = obj[attr];
    // 判断是否是第一层第一个循环
    if (index === 0 && !prefix) query += "?";
    if (typeof value === "object") {
      const subPrefix = prefix ? `${prefix}[${attr}]` : attr;
      query += objectToQuery(value, subPrefix);
    } else {
      if (prefix) {
        query += `${prefix}[${attr}]=${value}`;
      } else {
        query += `${attr}=${value}`;
      }
    }
    // 判断是否是第一层最后一个循环
    if (index !== attrs.length - 1) query += "&";
    return query;
  }, "");
}
export default objectToQuery