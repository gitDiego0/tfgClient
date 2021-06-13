import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";

const SEO = () => {
  const {
    contentfulMetadata: {
      siteTitle,
      shortDescription,
      facebookUrl,
      tripadvisorUrl,
      url,
    },
  } = useStaticQuery(medataQuery);

  return (
    <>
      <Helmet title={siteTitle}>
        <meta name="description" content={shortDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description " content={shortDescription} />
        <meta name="facebook:url" content={facebookUrl} />
        <meta name="tripadvisor:url" content={tripadvisorUrl} />
      </Helmet>
    </>
  );
};

const medataQuery = graphql`
  query metadataQuery {
    contentfulMetadata {
      facebookUrl
      id
      name
      shortDescription
      siteTitle
      url
      tripadvisorUrl
    }
  }
`;

export default SEO;
