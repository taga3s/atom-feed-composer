# atom-feed-composer

[![JSR badge](https://jsr.io/badges/@taga3s/atom-feed-composer)](https://jsr.io/@taga3s/atom-feed-composer)

## features

- Composes Atom feed XML declaratively (following
  [RFC 4287](https://datatracker.ietf.org/doc/html/rfc4287))
- Tag name and attributes can be specified with type-safe, inspired by
  [hastscript](https://github.com/wooorm/hastscript)

## usage

```typescript
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
    c("id", { value: "tag:example.com,2026:feed" }),
    c("updated", { value: "2026-01-15T01:55:15.576Z" }),
    c("entry", {}, [
      c("title", { value: "Hello World" }),
      c("link", { href: "https://example.com/hello-world", rel: "alternate" }),
      c("id", { value: "tag:example.com,2026:hello-world" }),
      c("updated", { value: "2026-01-14T01:55:15.576Z" }),
      c("summary", { value: "This is my first post." }),
    ]),
    c("entry", {}, [
      c("title", { value: "Another Post" }),
      c("link", { href: "https://example.com/another-post", rel: "alternate" }),
      c("id", { value: "tag:example.com,2026:another-post" }),
      c("updated", { value: "2026-01-15T01:55:15.576Z" }),
      c("summary", { value: "This is another post." }),
    ]),
  ])]);

  const data = new TextEncoder().encode(xml);
  await Deno.writeFile("rss.xml", data);
}
```

<details>

<summary>Generated Atom feed file</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
  <title>My Blog</title>
  <link href="https://example.com/atom.xml" rel="self" type="application/atom+xml" />
  <author>
    <name>john doe</name>
  </author>
  <id>tag:example.com,2026:feed</id>
  <updated>2026-01-15T01:55:15.576Z</updated>
  <entry>
    <title>Hello World</title>
    <link href="https://example.com/hello-world" rel="alternate" />
    <id>tag:example.com,2026:hello-world</id>
    <updated>2026-01-14T01:55:15.576Z</updated>
    <summary>This is my first post.</summary>
  </entry>
  <entry>
    <title>Another Post</title>
    <link href="https://example.com/another-post" rel="alternate" />
    <id>tag:example.com,2026:another-post</id>
    <updated>2026-01-15T01:55:15.576Z</updated>
    <summary>This is another post.</summary>
  </entry>
</feed>
```

</details>

> [!NOTE]
> You can validate the generated Atom file by using
> [W3C Feed Validation Service](https://validator.w3.org/feed/).

## license

[MIT](https://github.com/taga3s/atom-feed-composer/blob/main/LICENSE)

## author

- [taga3s](https://github.com/taga3s)
