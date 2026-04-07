export default function ResponseBox({ data }) {
  return (
    <textarea
      value={JSON.stringify(data, null, 2)}
      readOnly
      style={{ width: "100%", height: "400px" }}
    />
  );
}
