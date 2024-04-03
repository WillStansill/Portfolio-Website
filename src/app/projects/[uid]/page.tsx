import { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

    return (
      <>
        <Button
          linkField={page.data.link} // Pass link field data as prop
          label={page.data.button_text} // Pass button label text as prop
          className="mx-auto" // Apply margin auto to center horizontally
        />
        <ContentBody page={page} />
      </>
    );
  }

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
