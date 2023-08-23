Conventional commits specification is a lightweight convention on top of commit messages, it provides an easy set of rules for creating an explicit commit history, making it easier to write automated tools on top of it, this convention dovetails with semantic versioning[^1] by describing the features, fixes, and breaking changes made in commit messages, for origin document seek:

- https://www.conventionalcommits.org/en/v1.0.0/

Keep in mind, this is NOT the original document, for one-true version, seek the link.


Commit's message formatting
===========================

Each commit's message consist of a header, a body, and an optional footer (in “github-ian” case header is a “header” of commit, while footer and body are parts of message), for structure of commit's data, see below:

```html
<HEADER>
-------- (not everytime via “github-ian” case)
<BODY>
<FOOTER>
```

### Header of the message

Header of a commit message in any case is the first thing other contributors see about a commit, it has a specific format:\
"`<TYPE>(<SCOPE>): <SUMMARY>`"

1. The “\<TYPE>” string-value defines the category of the commit, each repository can have its own categories, for categories of THIS repository, seek the versions RC[^2].
2. The “\<SCOPE>” string-value, which MUST be written in paraphesis, is a custom parameter, by default, you write the package or the code-block affected by commit, it helps in categorizing the changes: in other case, write the sector which you affect or use an empty string for tests and/or refactor changes.
3. The “\<SUMMARY>” string-value defines the succinct description of changes, for this parameter, use the imperative, present tense and avoid capitalizing ONLY the first letter or adding the period at the end, for practical example:\
“update the SQLITE integration into the code and implement data”

> Keep in mind, that the headers are the most valued part of commit's data, because based on its right syntax and content, semantic versioning will update the changelog's file.

### Body of the message

Body is an optional parameter, you could not write it, but it explains the motivation behind the changes and the character (advanced context) of changes that were done, by default body is mandatory for code-commits, guidelines for body's formattings provided:

- it CAN start with capitalized letters;
- it CAN include periods at the end;
- it MUST use imperative and custom grammatics to describe the changes;
- it CAN provide comparison of the previous behavior with the new behavior can be included to illustrate the impact of the change.

### Footer of the message

Footer is the last and an free-optional parameter, they don't have any direct guidelines, except:

- footers other than “BREAKING CHANGE” may be provided and follow a convention simillar to:\
  [git's trailer format](https://git-scm.com/docs/git-interpret-trailers)

But, it is recommended to provide the same formatting for text as body.

## Default correlations and specification

Commit contains the following structural elements, to communicate intent to the consumers of your library:

- type of commit “FIX” or just "fix" patches a bug in your codebase: this correlates with [PATCH][SEMVER] in semantic versioning;
- type of commit “FEAT” or just "feat" introduces a new feature to the codebase: this correlates with [MINOR][SEMVER] in semantic versioning;
- there is a special type of commits, called “BREAKING CHANGES” — they're commits which have footer “BREAKING CHANGES: ,” or append special symbol "!" after the type/scope: it introduces a breaking API change correlating with [MAJOR][SEMVER] in semantic versioning.

> Keep in mind, “BREAKING CHANGES” type of commits can be a part of any type-commits.

### Provided specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119[^3]:

1. Commits MUST be prefixed with a type, which consists of a noun, feat, fix, etc., followed by the OPTIONAL "scope", OPTIONAL "!", and REQUIRED terminal colon and space;
2. The type “FEAT” or just "feat" MUST be used when a commit adds a new feature to your application or library;
3. The type “FIX” or just "fix" MUST be used when a commit represents a bug fix for your application;
4. A scope MAY be provided after a type, scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis;
5. A description MUST immediately follow the colon and space after the type/scope prefix, description is a short summary of the code changes;
6. Longer commit body MAY be provided after the short description, providing additional contextual information about the code changes, body MUST begin one blank line after the description;
7. Commit body is free-form and MAY consist of any number of newline separated paragraphs;
8. One or more footers MAY be provided one blank line after the body, each footer MUST consist of a word token, followed by either a ":" or "#" separator, followed by a string value — this is inspired by the git trailer convention;
9. Footer’s token MUST use — in place of whitespace characters, e.g., Acked-by (this helps differentiate the footer section from a multi-paragraph body), an exception is made for “BREAKING CHANGES”, which MAY also be used as a token;
10. Footer’s value MAY contain spaces and newlines, and parsing MUST terminate when the next valid footer token/separator pair is observed;
11. Breaking changes MUST be indicated in the type/scope prefix of a commit, or as an entry in the footer;
12. If included as a footer, a breaking change MUST consist of the uppercase text “BREAKING CHANGES”, followed by a colon, space, and description;
13. If included in the type/scope prefix, breaking changes MUST be indicated by a "!" immediately before the ":", if "!" is used, “BREAKING CHANGES” MAY be omitted from the footer section, and the commit description SHALL be used to describe the breaking change;
14. Any types other than “FEAT” and “FIX” MAY be used in your commit messages;
15. Any units of information that make up conventional commits MUST NOT be treated as case sensitive by implementors, with the exception of “BREAKING CHANGES” which MUST be uppercase.
16. “BREAKING CHANGES” MUST be synonymous with “BREAKING CHANGES”, when used as a token in a footer.

### Examples of usage and FAQ

For examples of any usage of this conventional commits formatting, see the:

- https://www.conventionalcommits.org/en/v1.0.0/#examples

For any questions provided, there is a FAQ and some other questions provided with answers:

- https://www.conventionalcommits.org/en/v1.0.0/#why-use-conventional-commits
- https://www.conventionalcommits.org/en/v1.0.0/#faq

[^1]: https://semver.org/
[^2]: [/.versionrc.json/](./../../.versionrc.json)
[^3]: https://www.ietf.org/rfc/rfc2119.txt

[SEMVER]: https://semver.org/#summary