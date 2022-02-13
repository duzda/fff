# About

It's common for schools and many other websites to enforce who comes first gets served first, I don't like this approach at all, because my fingers are very slow when it comes to clicking a link at appropriate time, if I even remember there's time competition going on.

This app exists to solve this problem, just set up what and when should be opened and it will get opened, highly increasing the chance of being first.

## Why fff?
Fuck fast fingers! :)

# Build instructions

`git clone https://github.com/duzda/fff`  
`npm install`  

For developement:

`npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`  

For production:

`npm export`  

manually edit index.html in prod folder to the correct minimized styles and javascript.  

`npm compress`

# License
This application is licensed under [GNU/GPL3 license](LICENSE)