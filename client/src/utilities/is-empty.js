function isEmpty(data) {
  return (
    typeof data === undefined ||
    typeof data === null ||
    (typeof data === "object" && Object.keys(data).length === 0) ||
    (typeof data === "string" && data.trim().length === 0)
  );
}
export default isEmpty;
