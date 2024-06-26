import os
import subprocess
import sys

from lib import get_buildtools_executable

# MIT License.
#
# Copyright (c) Electron contributors
# Copyright (c) 2013-2020 GitHub Inc.

SOURCE_ROOT = os.path.dirname(os.path.dirname(__file__))

# Helper to run gn format on multiple files
# (gn only formats a single file at a time)
def main():
  new_env = os.environ.copy()
  new_env['DEPOT_TOOLS_WIN_TOOLCHAIN'] = '0'
  new_env['CHROMIUM_BUILDTOOLS_PATH'] = os.path.realpath(
    os.path.join(SOURCE_ROOT, '..', 'buildtools')
  )

  gn_path = get_buildtools_executable('gn')
  for gn_file in sys.argv[1:]:
    subprocess.check_call(
      [gn_path, 'format', gn_file],
      env=new_env
    )

if __name__ == '__main__':
  sys.exit(main())
