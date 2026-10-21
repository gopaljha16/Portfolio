import { profile, skillGroups, toolbox, type Project } from "./data";

const personId = `${profile.url}/#person`;
const websiteId = `${profile.url}/#website`;

const person = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  alternateName: profile.github,
  jobTitle: "Full-Stack Engineer",
  description: profile.description,
  url: profile.url,
  image: profile.photo ? `${profile.url}${profile.photo}` : `${profile.url}/opengraph-image`,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.city,
    addressCountry: profile.countryCode,
  },
  sameAs: Object.values(profile.links),
  knowsAbout: [...new Set([...toolbox.flatMap((g) => g.tools.map((t) => t.name)), ...Object.values(skillGroups).flatMap((g) => g.skills)])],
};

/** Home page: who this is, and that this site is their profile. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: profile.url,
        name: profile.name,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${profile.url}/#profile`,
        url: profile.url,
        name: `${profile.name}, ${profile.role}`,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

/** Case study page: the product, who made it, and where it sits on the site. */
export function projectJsonLd(project: Project) {
  const pageUrl = `${profile.url}/work/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: project.name,
        description: project.summary,
        url: project.href ?? pageUrl,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        image: `${pageUrl}/opengraph-image`,
        dateCreated: String(project.year),
        author: { "@id": personId, "@type": "Person", name: profile.name, url: profile.url },
        ...(project.repo ? { codeRepository: project.repo } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: profile.name, item: profile.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${profile.url}/#work` },
          { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
        ],
      },
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
