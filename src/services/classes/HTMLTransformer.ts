import DomHandler, { Element, Text } from "domhandler";
import type { ChildNode } from "domhandler";
import { Parser } from "htmlparser2";
import { createElement, Fragment } from "react";
import type { ComponentProps, ElementType, ReactNode } from "react";
import styleProps from "style-to-js";

type TextReplacerCallback = (text: string) => ReactNode;

type TagReplacerCallback<T extends ElementType> = (
  properties: ComponentProps<T> & Record<string, unknown>,
) => ReactNode;

export class HTMLTransformer {
  private readonly attributes = new Set<string>();

  private readonly tags = new Map<string, Set<string>>();

  private readonly tagsReplacements = new Map<
    string,
    TagReplacerCallback<ComponentProps<ElementType>>
  >();

  private textReplacement: TextReplacerCallback | undefined;

  public static createDefault() {
    const transformer = new HTMLTransformer();

    transformer.allowAttributes(["style", "class"]);

    transformer.allowTag("a", ["href", "target"]);
    transformer.allowTag("img", ["src", "alt"]);
    transformer.allowTag("video", ["src"]);
    transformer.allowTag("iframe", ["src"]);
    transformer.allowTag("th", ["colspan", "rowspan"]);
    transformer.allowTag("td", ["colspan", "rowspan"]);
    transformer.allowTags([
      // Headers.
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",

      // Texts.
      "p",
      "span",
      "div",
      "blockquote",
      "pre",
      "code",
      "strong",
      "em",
      "u",
      "small",

      // Links.
      "figure",
      "figcaption",

      // Lists.
      "ul",
      "ol",
      "li",
      "br",

      // Tables.
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",

      // Others.
      "hr",
      "sub",
      "sup",
    ]);

    return transformer;
  }

  public allowTag(tagName: string, attributes?: string[]) {
    const tag = this.tags.get(tagName);

    if (tag) {
      if (attributes !== undefined) {
        for (const attribute of attributes) {
          tag.add(attribute);
        }
      }
    } else {
      this.tags.set(tagName, new Set(attributes));
    }
  }

  public allowTags(tagNames: string[]) {
    for (const tagName of tagNames) {
      this.allowTag(tagName);
    }
  }

  public allowAttributes(attributes: string[]) {
    for (const attribute of attributes) {
      this.attributes.add(attribute);
    }
  }

  public setTextReplacer(replacement: TextReplacerCallback) {
    this.textReplacement = replacement;
  }

  public setTagReplacer<T extends ElementType & string>(
    tagName: T,
    replacement: TagReplacerCallback<T>,
  ) {
    this.allowTag(tagName);
    this.tagsReplacements.set(tagName, replacement);
  }

  public transform(html: string) {
    const handler = new DomHandler();

    const parser = new Parser(handler);
    parser.write(html);
    parser.end();

    return this.processChildren(handler.dom);
  }

  private processAttributes(element: Element) {
    const tagAttributes: Record<string, unknown> = {};

    for (const [name, value] of Object.entries(element.attribs)) {
      if (this.attributes.has(name) || this.tags.get(element.tagName)?.has(name) === true) {
        if (name === "style") {
          tagAttributes["style"] = styleProps(value, { reactCompat: true });
        } else if (name === "class") {
          tagAttributes["className"] = value;
        } else {
          tagAttributes[name] = value;
        }
      }
    }

    return tagAttributes;
  }

  private processChild(child: ChildNode): ReactNode {
    if (child instanceof Text) {
      return this.textReplacement?.(child.data) ?? child.data;
    }

    if (child instanceof Element) {
      const replacement = this.tagsReplacements.get(child.tagName);

      if (replacement) {
        return replacement({
          ...this.processAttributes(child),
          children: this.processChildren(child.children),
        });
      }

      if (!this.tags.has(child.tagName)) {
        return null;
      }

      return createElement(
        child.tagName,
        this.processAttributes(child),
        child.children.length === 0 ? null : this.processChildren(child.children),
      );
    }

    return null;
  }

  private processChildren(children: ChildNode[]) {
    return children.map((child, key) => createElement(Fragment, { key }, this.processChild(child)));
  }
}
