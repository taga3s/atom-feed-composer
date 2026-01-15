interface NodeCommonParams {
  "xml:lang"?: string;
  "xml:base"?: string;
}

interface NodeDefinition {
  // Person Constructs (RFC 4287 Section 3.2)
  "name": {
    value: string;
  };
  "uri": {
    value: string;
  };
  "email": {
    value: string;
  };
  // Container Elements (RFC 4287 Section 4.1)
  "feed": {
    xmlns: string;
  };
  "entry": Record<PropertyKey, never>;
  "content": {
    value?: string;
    type?: string;
    src?: string;
  };
  // Metadata Elements (RFC 4287 Section 4.2)
  "author": Record<PropertyKey, never>;
  "category": {
    term: string;
    scheme?: string;
    label?: string;
  };
  "contributor": Record<PropertyKey, never>;
  "generator": {
    value: string;
    uri?: string;
    version?: string;
  };
  "icon": {
    value: string;
  };
  "id": {
    value: string;
  };
  "link": {
    href: string;
    rel?: string;
    type?: string;
    hreflang?: string;
    title?: string;
    length?: string;
  };
  "logo": {
    value: string;
  };
  "published": {
    value: string;
  };
  "rights": {
    value: string;
    type?: "text" | "html" | "xhtml";
  };
  "source": Record<PropertyKey, never>;
  "subtitle": {
    value: string;
    type?: "text" | "html" | "xhtml";
  };
  "summary": {
    value: string;
    type?: "text" | "html" | "xhtml";
  };
  "title": {
    value: string;
    type?: "text" | "html" | "xhtml";
  };
  "updated": {
    value: string;
  };
}

enum NodeKind {
  Declaration = "declaration",
  Atom = "atom",
}

interface DeclarationNode {
  kind: NodeKind.Declaration;
  name: "xml";
  params: {
    version: "1.0";
    encoding: "UTF-8";
  };
}

type NodeName = keyof NodeDefinition;

interface AtomNode {
  kind: NodeKind.Atom;
  name: NodeName;
  params: NodeDefinition[NodeName] & NodeCommonParams;
  children: AtomNode[];
}

type ComposeNode = <N extends NodeName>(
  name: N,
  params: NodeDefinition[N] & NodeCommonParams,
  children?: AtomNode[],
) => AtomNode;

export const xmlRoot = (nodes: AtomNode[]): string => {
  const indentLevel = 0;
  return stringifyRootNode(nodes, indentLevel);
};

export const compose: ComposeNode = (name, params, children) => ({
  kind: NodeKind.Atom,
  name,
  params,
  children: children ?? [],
});

const stringifyRootNode = (nodes: AtomNode[], indentLevel: number): string => {
  const root: DeclarationNode = {
    kind: NodeKind.Declaration,
    name: "xml",
    params: {
      version: "1.0",
      encoding: "UTF-8",
    },
  };
  const stringified = nodes.map((n) => stringifyNode(n, indentLevel)).join(
    "\n",
  );
  return `<?${root.name} version="${root.params.version}" encoding="${root.params.encoding}"?>\n${stringified}`;
};

const stringifyNode = (node: AtomNode, indentLevel: number): string => {
  const indent = "  ".repeat(indentLevel);
  const attributes = node.params
    ? Object.entries(node.params)
      .filter(([key]) => key !== "value")
      .reduce((acc, [key, value]) => {
        return `${acc} ${key}="${value}"`;
      }, "")
    : "";

  if (node.params && "value" in node.params) {
    return `${indent}<${node.name}${attributes}>${node.params.value}</${node.name}>`;
  }

  if (node.children.length === 0) {
    return `${indent}<${node.name}${attributes} />`;
  }

  const stringified = node.children.map((n) =>
    stringifyNode(n, indentLevel + 1)
  ).join("\n");
  return `${indent}<${node.name}${attributes}>\n${stringified}\n${indent}</${node.name}>`;
};
