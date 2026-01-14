import { buildXmlRoot, c } from "../src/mod.ts";

if (import.meta.main) {
  const generated = buildXmlRoot([c("feed", {
    xmlns: "http://www.w3.org/2005/Atom",
  }, [
    c("title", { value: "My Blog" }),
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
  console.log(generated);
}
