<!-- 
 This is an example template for PRs of any repository, in case of need, it could be 
 changed for other direct purposes or project's and organization's infrastructure.
 -->

PRs: [TITLE OF PULL REQUEST]
============================

Before writing anything about your changes in this PR, checklist this items:

- [ ] Agreed with current version of [code of conduct](./../CODE_OF_CONDUCT.md).
- [ ] Read and followed current version of [“issue policy”](./../../docs/github/ISSUES/ISSUE_POLICY.md).
- [ ] Read and followed current version of [“commit convention”](./../../docs/github/COMMIT_CONVENTION.md).

By agreeding and following this project's documentation, you are reminded that your's commit and styling of changes must follow this project's documentation, in case of “de-followization”, there are two ways before you make sure to publishing your PR:

1. In case of “de-followization” of commit's styling convention, you can amend them (change their message and description signatures):

```powershell
git commit --amend -m "MESSAGE" -m "DESCRIPTION"
```

For amending old commit, see the stackoverflow question[^1], more about changing commits in official docs for github: \
https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/changing-a-commit-message/

[^1]: https://stackoverflow.com/questions/17338792/amending-old-commit/

2. In case of “de-followization” of coding, documentation and etc. files, you can just refactor everything you need by following styling guidelines of project.

### Changes with that PR
<!-- CHANGES BLOCK: 
 -->

Please, write below every changes you made:

...

### Process of testing for that PR
<!-- TESTING BLOCK: 
 -->

- Was testing process initiated via this PR?\
  answer (y/n): (n);
- If testing was done, type below the procedures you make: \
  ...

### Additional contenxt for that PR

...
