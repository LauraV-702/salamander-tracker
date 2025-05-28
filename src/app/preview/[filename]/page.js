import PreviewPage from "../../../components/PreviewPage";

export default async function PreviewRoute({ params }) {
  return <PreviewPage filename={(await params).filename} />;
}
