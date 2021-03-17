function isEquivalent(a: object, b: object): boolean {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // @ts-ignore
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}
export default isEquivalent;
