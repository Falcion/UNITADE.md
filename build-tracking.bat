SET "CLONESH=esbuild.config.mjs"

FOR /F "tokens=*" %%i IN ('git ls-files -v %CLONESH%') DO SET "CURRENT_STATUS=%%i"

IF "%CURRENT_STATUS:~0,1%"=="S" (
    ECHO Currently, the file %CLONESH% is skipped.
    ECHO Turning file tracking back ON...
    git update-index --no-skip-worktree "%CLONESH%"
    IF ERRORLEVEL 0 (
        ECHO File tracking turned on successfully.
    ) ELSE (
        ECHO Error: Could not turn file tracking on.
    )
) ELSE (
    ECHO Currently, the file %CLONESH% is being tracked.
    ECHO Turning file tracking OFF...
    git update-index --skip-worktree "%CLONESH%"
    IF ERRORLEVEL 0 (
        ECHO File tracking turned off successfully.
    ) ELSE (
        ECHO Error: Could not turn file tracking off.
    )
)

EXIT /B 0
