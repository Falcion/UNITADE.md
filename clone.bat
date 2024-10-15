@echo off

REM If you include quotes in path, it wouldn't work: keep path default without any external symbols
SET source_file=
SET target_file=

COPY "%source_file%" "%target_file%" /Y

IF ERRORLEVEL 0 (
    ECHO File copied successfully.
) ELSE (
    ECHO Error: File copy failed.
    EXIT /B 1
)
