export class ArrayHelper {
    public static sort<T>(array: T[], itemValue: (item: T) => any): T[] {
        return array.sort((item1, item2) => {
            const propertyItem1: T = itemValue(item1);
            const propertyItem2: T = itemValue(item2);
            if (propertyItem1 > propertyItem2) {
                return 1;
            }
            if (propertyItem1 < propertyItem2) {
                return -1;
            }
            return 0;
        });
    }

  public groupByObject(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  public groupByArray(xs, key) {
    return xs.reduce(function (rv, x) {
      // tslint:disable-next-line: prefer-const
      let v = key instanceof Function ? key(x) : x[key];
      // tslint:disable-next-line: prefer-const
      let el = rv.find((r) => r && r.key === v);
      if (el) {
        el.values.push(x);
      } else {
        rv.push({ key: v, values: [x] });
      } return rv;
    }, []);
  }
}
