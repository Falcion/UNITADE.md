@echo off

SET ""
SET ""

COPY "%source_file%" "%target_file%" /Y

IF ERRORLEVEL 0 (
    ECHO File copied successfully.
) ELSE (
    ECHO Error: File copy failed.
    EXIT /B 1
)
