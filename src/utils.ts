export module Utils {
    export function array_equals(a: number[], b: number[]) {
        if (!a) return false;
        if (!b) return false;
        // if the argument is the same array, we can be sure the contents are same as well
        if (a === b) return true;
        // compare lengths - can save a lot of time
        if (a.length != b.length) return false;

        for (var i = 0, l = a.length; i < l; i++) {
            if (a[i] != b[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
}
