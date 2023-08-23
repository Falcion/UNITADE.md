At UNITADE, project takes the security of its code, data, and the broader community seriously, this security policy (thereafter as “policy”) outlines the measures and expectations we have in place to safeguard our repository and its users from potential security threats.

Project's commitment to security encompasses not only the codebase itself but also the interactions, discussions, and contributions that occur within this repository, it is believe that a collective effort towards security enhances the overall experience for everyone involved.

Policy is intended to provide clear guidelines and procedures for addressing security-related issues, reporting vulnerabilities, and maintaining a safe and productive environment for all contributors and users, UNITADE wants to encourage you to read and adhere to these guidelines as you engage with this repository.

By working together to prioritize security, we can maintain the integrity of our codebase and protect the interests of our community.

Guidelines about security-issue reporting
=========================================

Creators, maintainers team take the security of their software, products, and services seriously, this commitment extends to all source code repositories managed under their control, including those belonging to organizations.

If you believe you have discovered a security vulnerability in any of their products or software (as defined by the MIT licensing), please follow the guidelines below to report it.

### Reporting security-issues

If you prefer to submit the report without logging in, you can send an email to the address specified in the code of conduct or the one provided below, if possible, encrypt your message using our PGP[^1] key.

- <a href="mailto: io.falcion@outlook.com">E-mail MAILTO</a>

> Please, refrain from reporting security vulnerabilities through public GitHub issues or pull requests.

When reporting a security vulnerability, please include the following information (as much as you can provide) to help us better understand the nature and scope of the issue:

- type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.);
- full paths of the source files related to the manifestation of the issue;
- location of the affected source code (tag, branch, commit or direct URL);
- any special configuration required to reproduce the issue;
- step-by-step instructions to reproduce the issue;
- proof-of-concept or exploit code, if it's possible;
- impact of the issue, including how an attacker might exploit it;

Providing this information will enable us to triage your report more efficiently.

Security policy
===============

Following the principle of “Coordinated vulnerability disclosure” (thereafter as “CDV”), researchers are encouraged to disclose newly discovered vulnerabilities in hardware, software, and services directly to the vendors of the affected product, alternatively, researchers can report the vulnerabilities to a national CERT or other coordinator, who will then report them to the vendor privately. 

Another option is to use a private service that will also report the vulnerabilities to the vendor privately.

By adhering to “CDV”, researchers allow the vendor the opportunity to diagnose and provide fully tested updates, workarounds, or other corrective measures before any party discloses detailed vulnerability or exploit information to the public, throughout the vulnerability investigation, the vendor maintains coordination with the researcher and provides updates on the progress of the case.

Any security-issue NOT related to this plugin directly, but to the Obsidian™ app itself, contact the developers of the app, not the team of this project:

- https://help.obsidian.md/help+and+support/

Once an update is released, the vendor may recognize the researcher for their research and privately reporting the issue, in cases where attacks are already underway in the wild, and the vendor is still working on the update, the researcher and vendor collaborate as closely as possible to provide early public vulnerability disclosure to protect customers: the objective is to offer timely and consistent guidance to customers in order to help them protect themselves.

For more information on “CDV”, please refer to the following resources:

- [ISO/IEC 29147:2018 on “Vulnerability Disclosure”](https://www.iso.org/standard/72311.html)
- [The CERT Guide to “CVD”](https://resources.sei.cmu.edu/asset_files/SpecialReport/2017_003_001_503340.pdf)

[^1]: [go and check public PGP key-file](./keys/public.asc)