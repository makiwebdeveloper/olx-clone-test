import { FC } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export interface ISeo {
  title?: string;
  description?: string;
  image?: string;
}

export const titleMerge = (title: string) => `${title} | Olx Clone`;

const Meta: FC<ISeo> = ({ title, description, image }) => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.APP_URL}${asPath}}`;

  return (
    <Head>
      <title itemProp="headline">
        {title ? titleMerge(title) : "Olx Clone"}
      </title>
      {description ? (
        <>
          <meta
            itemProp="description"
            name="description"
            content={description}
          />
          <link rel="canonical" href={currentUrl} />
          <meta property="og:locale" content="en" />
          <meta
            property="og:title"
            content={title ? titleMerge(title) : "Olx Clone"}
          />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:image" content={image || "/favicon.svg"} />
          <meta property="og:description" content={description} />
        </>
      ) : (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Head>
  );
};

export default Meta;
