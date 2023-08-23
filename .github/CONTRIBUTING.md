Before you jump into contributing code, documentation, bug reports, or any other form of participation, we'd like to provide you with some guidelines to ensure a smooth and productive collaboration, these guidelines aim to create a welcoming and inclusive environment for everyone, regardless of their experience level or background.

This document outlines our expectations for contributors and offers information on how to get started, what to work on, and how to interact with the community, please take a moment to familiarize yourself with these guidelines to help team maintain a positive and productive atmosphere for all.

- Before making any contributions or reading this document, make yourself familliar with code of conduct of this project:\
[“Code-doc” of UNITADE's community](./CODE_OF_CONDUCT.md)

Contribution guidelines
=======================

Project greatly appreciates the contributions from our diverse community of developers who have come together from around the world to build the amazing contributor world we know today. 

Project is fortunate to be part of such a beautiful community, to ensure a smooth experience for everyone involved, we have established some conventions and guidelines that all foreign developers must adhere to before making any changes. These guidelines will help us maintain a collaborative and welcoming environment.

### Guidelines for contributions

When contributing to software or documentation of this project, please keep the following guidelines in mind:

- **Don't surprise with large pull requests.**\
  Instead, start a discussion by filing an issue so we can agree on the direction before investing a significant amount of time.
- **Avoid including sample code inline in your push.**\
  Instead, use a snippet project with code that can be embedded in the article.
- follow the terms of “flow”:\
  https://guides.github.com/introduction/flow/
- use the forked repository as the starting point for your work;
- create a separate branch on your fork before working on the project;

Following these guidelines will ensure a better experience for you and for us.

### Guidelines for submitting

The infrastructure of repository provides various tools for open-source communication, project pledges to make the most of these tools for effective collaboration.

#### Submitting the issue

Before submitting an issue, please search the issue tracker to see if a similar issue already exists, the discussion in existing issues may provide you with valuable information and workarounds.

While project aims to fix issues promptly, it is crucial that team can reproduce and confirm them first, to help us with this process, we require that you provide a minimal reproducible scenario, which should contain the essential information to reproduce the issue, saving us time and ensuring we can fix the problem effectively: team understand that extracting essential bits of code from a larger codebase can be challenging, but isolating the problem is necessary for project to address it.

Please, note that the organization are unable to investigate or fix bugs without a minimal reproduction, if issue-tracker do not receive enough information to reproduce the issue, project may have to close it.

#### Submitting the pull request (PR)

Before submitting pull request, please consider the following guidelines:

1. search for repository for open or closed PRs related to your submission to avoid duplicating existing efforts;
2. make sure the issue you are fixing is described or that the feature you want to add is documented in an issue: discussing the design upfront helps ensure that we are ready to accept your work;
3. if it's asked, sign the CLA before sending PRs: organization cannot accept code without a signed CLA, make sure your commits are associated with the e-mail address used in your CLA signature.
4. fork the repository;
5. in your forked repository, create a new git branch for your changes;
6. make your changes, including appropriate checks and testing;
7. follow the coding conventions or adhere to the existing conventions;
8. commit your changes using a descriptive commit message that follows “commits convention”[^1]: adhering to this convention is necessary because release notes are automatically generated from these messages;
9. push your branch to the repository;
10. on this website-service, send a pull request to the main production branch;

```powershell
git checkout -b <BRANCH>
git commit --all
git push origin <BRANCH>
```

#### Reviewing the PRs

As maintainers, we reserve the right not to accept pull requests from community members who have not been good citizens of our community, this includes not following the code of conduct (COC) within or outside of organization's managed channels.

Via working with PRs (aka pull requests), there are some cases which may occure and for which we created guidelines:

1. **Addressing review feedback:**\
   if we ask for changes through code reviews:

   1. make the required updates to the code;
   2. re-run the CLI tests and build with no-traverse your version to ensure tests are still passing;
   3. create a fixup commit and push it to your forked repository, this will update your pull request;
    <br/>
    
    ```powershell
    git commit --all --fixup HEAD
    git push
    ```

For more information on working with fixup commits, refer to the artcile in the “angular's” article:\
- https://github.com/angular/angular/blob/main/docs/FIXUP_COMMITS.md/
- https://thoughtbot.com/blog/autosquashing-git-commits/

2. **Updating the commit's message:**\
   Reviewers may suggest changes to a commit message, such as adding more context or adhering to commit message guidelines, to update the commit message of the last commit on your branch:

   1. checkout your branch;
   2. amend the last commit and modify the commit message;
   3. push to your forked repository;
    <br/>

    ```powershell
    git checkout <BRANCH>
    git commit --amend
    git push --force-with-lease
    ```

> If you need to update the commit message of an earlier commit, you can use interactive mode with “git rebase”.
>  
> Refer to the GIT's documentation for more details on this procedure:\
> https://git-scm.com/docs/git-rebase#_interactive_mode

3. **After your PR is merged:**
   If your pull request is merged, you can safely delete your branch and pull the changes from the main upstream repository, the same applies within your forked repository:

   1. delete the remote branch either through the web client UI or the local shell;
   2. checkout the main branch;
   3. delete your local branch;
   4. update your local branch of the upstream repository with the latest version from origin;
    <br/>

    ```powershell
    git push origin <BRANCH>
    git checkout main -f
    git branch -D <BRANCH>
    git pull -ff upstream master
    ```

### Commiting convention

For ensuring consistency throughout the source code, please keep the following rules in mind when working with our open-source project:

- Every feature or bug-fix must be tested (if possible);
- Every public API method, function, field and etc. must be documented by means of code;

> Last term is optional because of some temporal cases, for example, code that is directly in-built with other API like plugins, extensions and etc.

For advanced committing convention, refer to custom speficied documentation file[^1].

### Signing the “Contributor license agreement” (CLA)

Sometimes, you may be asked to sign the “Contributor license agreement” (CLA) before sending a pull request, signing the CLA is a quick and easy process, and it is required for any code changes to be accepted.

- For individuals:\
  https://cla.developers.google.com/about/google-individual/
- For corporations: print, sign, scan, and e-mail the provided form:\
  https://cla.developers.google.com/about/google-corporate/

If you have multiple accounts or multiple e-mail addresses associated with a single account, you must sign the CLA using the primary email address of the “github.com” account used to author git commits and send pull requests.

Following documents can help you sort out issues with accounts and multiple e-mail addresses:

- https://help.github.com/articles/setting-your-commit-email-address-in-git/
- https://help.github.com/articles/about-commit-email-addresses/
- https://help.github.com/articles/blocking-command-line-pushes-that-expose-your-personal-email-address/


[^1]: [“Commit's messages convention”](./../docs/github/COMMIT_CONVENTION.md)