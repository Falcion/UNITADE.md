@echo off

SET "FILE_PATH=clone.bat"

FOR /F "tokens=*" %%i IN ('git ls-files -v %FILE_PATH%') DO SET "CURRENT_STATUS=%%i"

IF "%CURRENT_STATUS:~0,1%"=="S" (
    ECHO Currently, the file %FILE_PATH% is skipped.
    ECHO Turning file tracking back ON...
    git update-index --no-skip-worktree "%FILE_PATH%"
    IF ERRORLEVEL 0 (
        ECHO File tracking turned on successfully.
    ) ELSE (
        ECHO Error: Could not turn file tracking on.
    )
) ELSE (
    ECHO Currently, the file %FILE_PATH% is being tracked.
    ECHO Turning file tracking OFF...
    git update-index --skip-worktree "%FILE_PATH%"
    IF ERRORLEVEL 0 (
        ECHO File tracking turned off successfully.
    ) ELSE (
        ECHO Error: Could not turn file tracking off.
    )
)

EXIT /B 0
