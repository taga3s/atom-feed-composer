import { c, xmlRoot } from "../src/mod.ts";

if (import.meta.main) {
  const xml = xmlRoot([c("feed", {
    xmlns: "http://www.w3.org/2005/Atom",
    "xml:lang": "ja",
  }, [
    c("title", { value: "My Blog" }),
    c("link", {
      href: "https://example.com/atom.xml",
      rel: "self",
      type: "application/atom+xml",
    }),
    c("author", {}, [
      c("name", { value: "john doe" }),
    ]),
    c("id", { value: "https://example.com/" }),
    c("updated", { value: new Date().toISOString() }),
    c("entry", {}, [
      c("title", { value: "Hello World" }),
      c("link", { href: "https://example.com/hello-world", rel: "alternate" }),
      c("id", { value: "https://example.com/hello-world" }),
      c("updated", { value: new Date().toISOString() }),
      c("summary", { value: "This is my first post." }),
    ]),
    c("entry", {}, [
      c("title", { value: "Another Post" }),
      c("link", { href: "https://example.com/another-post", rel: "alternate" }),
      c("id", { value: "https://example.com/another-post" }),
      c("updated", { value: new Date().toISOString() }),
      c("summary", { value: "This is another post." }),
    ]),
  ])]);

  const data = new TextEncoder().encode(xml);
  await Deno.writeFile("rss.xml", data);
}
