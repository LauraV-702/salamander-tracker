import PreviewPage from "../../../components/PreviewPage";

export default function PreviewRoute({ params }) {
  const { filename } = params;
  return <PreviewPage filename={filename} />;
}
