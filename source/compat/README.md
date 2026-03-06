Compat mod ("compatibility module") of UNITADE is a special subsystem designed for
comfortable migration for users between different versions of plugin. It tries to
convert/migrate configs from previous versions to last acceptable form.

### Version detection

Compat mod works on version converters data type which provides two anon functions:

- detectors
- converters themself

Detectors are key feature in compat mod, they use heuristic method of understanding what
version does user migratred from or provide manifest (either from plugin or config) parsing
feature: in any way, detectors try to define from which version we need to migrate and
provide converters with information how to do it (determine behaviour).
