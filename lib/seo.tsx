import { caseStudies, experience, faq, profile, skillGroups, toolbox, type Project } from "./data";

const personId = `${profile.url}/#person`;
const websiteId = `${profile.url}/#website`;
const profilePageId = `${profile.url}/#profile`;

// Set at build time; the page rebuilds daily, so this stays current.
const modified = new Date().toISOString();

const internship = experience.find((r) => r.certificate);

const person = {
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  givenName: "Gopal",
  familyName: "Jha",
  alternateName: profile.github,
  jobTitle: "Full-Stack Engineer",
  description: profile.description,
  url: profile.url,
  mainEntityOfPage: { "@id": profilePageId },
  image: profile.photo ? `${profile.url}${profile.photo}` : `${profile.url}/opengraph-image`,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.city,
    addressRegion: "Telangana",
    addressCountry: profile.countryCode,
  },
  homeLocation: { "@type": "Place", name: `${profile.city}, ${profile.country}` },
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Engineer",
    occupationLocation: { "@type": "City", name: profile.city },
    skills: toolbox.flatMap((g) => g.tools.map((t) => t.name)).join(", "),
  },
  ...(internship
    ? {
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "Full Stack Developer Internship Certificate",
          credentialCategory: "certificate",
          recognizedBy: { "@type": "Organization", name: internship.company },
          dateCreated: "2026-10-01",
        },
      }
    : {}),
  sameAs: Object.values(profile.links),
  knowsAbout: [
    ...new Set([...toolbox.flatMap((g) => g.tools.map((t) => t.name)), ...Object.values(skillGroups).flatMap((g) => g.skills)]),
  ],
};

/** Home page: who this is, that this site is their profile, what they've made, and the common questions. */
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
        description: profile.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: profile.url,
        name: `${profile.name}, ${profile.role}`,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        dateModified: modified,
      },
      {
        "@type": "ItemList",
        name: `Products built by ${profile.name}`,
        itemListElement: caseStudies.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${profile.url}/work/${p.slug}`,
          name: p.name,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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
        "@type": "WebPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: `${project.name} case study`,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        dateModified: modified,
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
