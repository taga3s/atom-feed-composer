import { assertSnapshot } from "@std/testing/snapshot";
import { c, xmlRoot } from "./mod.ts";

const fixture1 = (): string => {
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
    c("updated", { value: "2026-01-15T01:55:15.576Z" }),
    c("entry", {}, [
      c("title", { value: "Hello World" }),
      c("link", { href: "https://example.com/hello-world", rel: "alternate" }),
      c("id", { value: "https://example.com/hello-world" }),
      c("updated", { value: "2026-01-15T01:55:15.576Z" }),
      c("summary", { value: "This is my first post." }),
    ]),
    c("entry", {}, [
      c("title", { value: "Another Post" }),
      c("link", { href: "https://example.com/another-post", rel: "alternate" }),
      c("id", { value: "https://example.com/another-post" }),
      c("updated", { value: "2026-01-15T01:55:15.576Z" }),
      c("summary", { value: "This is another post." }),
    ]),
  ])]);
  return xml;
};

Deno.test("Correctly generates Atom feed", async (t) => {
  const xml = fixture1();
  await assertSnapshot(t, xml);
});

const fixture2 = (): string => {
  const xml = xmlRoot([c("feed", {
    xmlns: "http://www.w3.org/2005/Atom",
    "xml:lang": "ja",
  }, [
    c("title", { type: "html", value: "Less: <em> &lt; </em>" }),
  ])]);
  return xml;
};

Deno.test("Correctly generates Atom feed with escaped values", async (t) => {
  const xml = fixture2();
  await assertSnapshot(t, xml);
});
