# slider

presentations framework


# 1. installation

**clone this repo, then configure it as shown:**

```sh

$ npm i

```

# 2. make slides dir inside of public folder

```sh

$ mkdir ./public/slides

```

# 3. add .env file

```sh

$ echo "REACT_APP_SLIDES_DIR=slides" > .env

```
put **.mdx**, **.md**, **.json** slides to that directory

# 4. generate necessary slides list file

for example what it is look inside of **gen.sh**

```sh

$ cat ./gen.sh

```

# 5. additional configuration

other availiable `REACT_APP_`'s of `.env` are:

```sh
# this is the first 
REACT_APP_SPEAKERNAME=some_nick_name

# starter slide index, for any cases
REACT_APP_STARTER_SLIDE=7

```

# 6. you can find more info

* [Advanced Configuration](https://create-react-app.dev/docs/advanced-configuration/)

* [MDX](https://mdxjs.com/)

* [D3.js - Data-Driven Documents](https://d3js.org/)

# 7. start presentation

```sh

$ npm start

```
