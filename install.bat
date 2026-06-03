@echo off
cd /d "c:\Users\Dhananjay Pandey\OneDrive\Documents\GitHub\talentstage"
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Installation failed!
    pause
    exit /b 1
)
echo.
echo Installation complete! 
echo Run 'npm run dev' to start the development server
pause
