set PATH_TO_EXT=c:\code\dist
taskkill /im chrome.exe /f
taskkill /im node.exe /f
taskkill /im webdriver.exe /f
del /S /Q %tmp%
mocha