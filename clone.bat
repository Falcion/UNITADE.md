@echo off

REM Define the source and destination file paths
SET ""
SET ""

REM Copy the file
COPY "%source_file%" "%target_file%" /Y

REM Check if the copy operation was successful
IF ERRORLEVEL 0 (
    ECHO File copied successfully.
) ELSE (
    ECHO Error: File copy failed.
    EXIT /B 1
)
