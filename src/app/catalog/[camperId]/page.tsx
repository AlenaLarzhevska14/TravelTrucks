type CamperDetailsPageProps = {
  params: Promise<{
    camperId: string;
  }>;
};

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;

  return <h1>Camper ID: {camperId}</h1>;
}
