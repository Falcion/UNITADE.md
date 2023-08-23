Issues are the lifeblood of UNITADE, they help us track, prioritize, and address bugs, feature requests, and other improvements, project appreciates your interest in contributing to our project by creating, commenting on, or managing issues.

To ensure that issues are handled effectively and that everyone in our community has a positive experience, team put together this issue policy (thereafter as “policy”): this document provides guidelines on how to create, manage, and interact with issues within our project repository.

Please take a moment to read and understand the principles outlined in this policy, they are designed to foster a welcoming and productive environment for all community members, regardless of their level of expertise or background.

Issue policy
============

Policy outlines the different categories of issues in the project's “github-ian” repository and provides guidelines and processes associated with each type of issue.

- For general support inquiries or questions (e.g., “How do I do "X"?”), please ask on special websites for it:
  https://stackoverflow.com/questions/

Before creating a new issue, please search for related issues and check if they address your concern.

### Issue categories

By default, issue categorization follows the following categories:

1. feature requests;
2. bug reports;
3. documentation issues;
4. questions, related to this project;

Often, each category has its own issue template, please avoid deleting the issue template unless you are certain your issue falls outside its scope.

#### Feature requests

Feature requests are a valuable part of project, they allow you to suggest enhancements or new capabilities that you believe would improve the project, team values your input and welcome your ideas to help make development even better.

1. **Guidelines.**\
   Feature requests that are more likely to be accepted:
   - are focused and minimal in scope, note, that it's usually easier to add additional functionality later than remove functionality;
   - are designed with extensibility in mind, e.g., if proposing an integration with a specific framework, consider the potential for similar integrations with other frameworks;
   - have clear user impact and value that justifies the maintenance effort required to support the feature in the long term, refer link below for excellent discussion about this topic:\
     https://contribute.jquery.org/open-source/#contributing-something-new/

2. **Lifecycle.**\
   Lifecycle of a feature request typically involves the following steps:
   1. submit a feature request GitHub issue, providing a high-level description of the proposal and its motivation, if it's possible, include an overview of the feature's implementation;
   2. the issue is triaged to determine if more information is needed from the author, assign a priority, and route it to the appropriate committers;
   3. the feature request is discussed with a committer. The committer may provide input on the implementation overview or request a more detailed design, if necessary;
   4. after discussing and reaching an agreement on the feature request and its implementation, an implementation owner is identified;
   5. implementation owner starts developing the feature and ultimately submits associated pull requests against the project;

### Bug reports

In ongoing commitment to excellence, team understands that identifying and addressing issues is a critical aspect of maintaining a robust and reliable platform: “bug report” category provides a structured avenue for our stakeholders to report any unexpected behaviors or technical glitches encountered during their interaction with project.

1. **Guidelines.**\
   To ensure that maintainers can effectively assist with reported bugs, please follow these guidelines:
   - fill out the bug report template completely, providing appropriate levels of detail, especially in the “Code to reproduce the issue” section;
   - verify that the bug meets one of the criterias[^1];
   - make a best effort to diagnose and troubleshoot the issue before filing a report;
   - ensure that the environment in which you are experiencing the bug is supported as defined in the documentation;
   - confirm that the project supports the functionality you are having an issue with. Note that the absence of a feature does not necessarily constitute a bug;
   - read the documentation related to the feature you are reporting on, if you are certain that you are following the documented guidelines, please file a bug report;

2. **Lifecycle.**\
   Lifecycle of a bug report typically involves the following steps:
   1. submit a bug report issue, providing a high-level description of the bug and all the information required to reproduce it;
   2. the bug report is triaged to determine if more information is needed from the author, assign a priority, and route it to the appropriate committers;
   3. project committer reproduces the bug and provides feedback on how to address it;
   4. once an approach is agreed upon, an owner for the fix is identified. For critical bugs, project committers may take ownership to ensure a timely resolution;
   5. the fix owner begins implementing the solution and ultimately submits associated pull requests;

### Documentation issues

Effective documentation is the backbone of any successful project, this category is dedicated to enhancing the clarity and completeness of our project's documentation.

Lifecycle of a documentation issue typically involves the following steps:

1. submit a documentation issue, describing the issue and indicating its locations in the project documentation;
2. the issue is triaged to determine if more information is needed from the author, assign a priority, and route it to the appropriate committers;
3. project committer confirms the documentation issue and provides feedback on how to address it;
4. once an approach is agreed upon, an owner for the fix is identified. For critical documentation issues, project committers may take ownership to ensure a timely resolution;
5. the fix owner begins implementing the solution and ultimately submits associated pull requests;

### Questions

If you have inquiries or require clarification regarding any aspect of project, this category is here to provide you with answers and guidance, feel free to engage and seek the information you need to make the most of your experience.

Questions should be relevant to the project and its scope. They can range from asking for clarification on specific features to seeking guidance on best practices:

1. use the “question” issue template when creating a new question;
2. provide a clear and concise description of your question, ensuring it is relevant to the project;
3. include any necessary context or background information to help others understand the question;
4. be respectful and considerate when interacting with others in the discussion;

### Conclusion

By adhering to the appropriate issue template and following these guidelines, you can help us efficiently address your concerns and contribute to the project's improvement.

[^1]: \- it's a regression, meaning that a recent release of the project no longer supports an operation that an earlier release did;<br/> - documented feature or functionality does not work properly when following the provided examples in the documentation;<br/> - any exceptions raised are directly related to the project and not the result of an underlying package's exception;<br/>