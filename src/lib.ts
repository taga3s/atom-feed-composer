interface NodeDefinition {
  "feed": {
    xmlns: string;
  };
  "title": {
    value: string;
  };
  "author": Record<PropertyKey, never>;
  "name": {
    value: string;
  };
  "id": {
    value: string;
  };
  "updated": {
    value: string;
  };
  "entry": Record<PropertyKey, never>;
  "link": {
    href: string;
    type?: string;
    rel?: string;
  };
  "summary": {
    value: string;
  };
}

interface DeclarationNode {
  kind: "declaration";
  name: "xml";
  params: {
    version: "1.0";
    encoding: "UTF-8";
  };
}

type NodeName = keyof NodeDefinition;

interface AtomNode {
  kind: "atom";
  name: NodeName;
  params: NodeDefinition[NodeName];
  children: AtomNode[];
}

type ComposeNode = <N extends NodeName>(
  name: N,
  params: NodeDefinition[N],
  children?: AtomNode[],
) => AtomNode;

export const buildXmlRoot = (nodes: AtomNode[]): string => {
  const indentLevel = 0;
  return stringifyRootNode(nodes, indentLevel);
};

export const compose: ComposeNode = (name, params, children) => ({
  kind: "atom",
  name,
  params,
  children: children ?? [],
});

const stringifyRootNode = (nodes: AtomNode[], indentLevel: number): string => {
  const root: DeclarationNode = {
    kind: "declaration",
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
