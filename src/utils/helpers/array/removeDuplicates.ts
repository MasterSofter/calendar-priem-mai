export function removeDuplicates(
  arr: any[] | undefined,
  key: string
): any[] {
  return arr?.reduce((unique, item) => {
    // Check if the current object has the specified key
    if (item.hasOwnProperty(key)) {
      // Check if there is no existing object with the same key value
      if (
        !unique.some(
          (obj : any) =>
            obj[key] === item[key]
        )
      ) {
        unique.push(item);
      }
    } else {
      // If the key doesn't exist in the current object, always include it in the unique array
      unique.push(item);
    }
    return unique;
  }, []);
}
