
export function orgSchema(){
  return {
    "@context":"https://schema.org",
    "@type":"Organization",
    name: "USX",
    url: "",
    logo: ""
  };
}
export function websiteSchema(){
  return {
    "@context":"https://schema.org",
    "@type":"WebSite",
    name: "USX",
    url: ""
  };
}
export function articleSchema(input: { title: string; url: string; datePublished: string; author?: string; }){
  return {
    "@context":"https://schema.org",
    "@type":"Article",
    headline: input.title,
    url: input.url,
    datePublished: input.datePublished,
    author: input.author ? { "@type":"Person", name: input.author } : undefined
  };
}
