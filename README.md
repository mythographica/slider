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

put your **.mdx**, **.md**, **.json** slides there

# 4. generate necessary slides list file

for example what it is look inside of **gen.sh**

```sh

$ cat ./gen.sh

```

# 5. start your presentation

```sh

$ npm start

```