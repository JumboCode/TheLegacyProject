# The Legacy Project App

Welcome to The Legacy Project's JumboCode team! This is our repository where we will keep our code and track changes.

## Setup
The first part of setup is to get your machine set up to run the [Next.js](https://nextjs.org/docs) server and get a local copy of the codebase.

- On Windows, we recommend installing the [Windows Linux Subsystem](https://learn.microsoft.com/en-us/windows/wsl/install), and proceeding with the next steps in the WSL terminal instead of the default command line.
- Install [Node.js](https://nodejs.org/en/) so that you can run Javascript code from the command line ([Windows/WSL link](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)). We will be using the [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) package manager, so this needs to be installed as well (if you don't know what a package manager is, don't worry and feel free to ask Michael).
- Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), which is the tool we will be using for version management. If you have trouble with this or don't understand what is being asked of you, again feel free to ping Michael on Slack. *Note for WSL users:* Follow the Linux instructions here.

### Acquiring the code
Now that you have git installed, you need to get a local copy of the code. This is where git comes in. In your terminal, navigate to the folder where you want git to put your `TheLegacyProject` folder containing all the code. Then, run the following command: `git clone git@github.com:JumboCode/TheLegacyProject.git`. This will ask you for your github credentials, which is a pain to have to type every time. We have an explainer down below on how to avoid this.

### Setting up your environment
All projects which connect to other services need to have credentials to authenticate with those services. It is bad security practice to save these credentials directly in a code repository, so we prefer to keep them in a file which does not get checked into the codebase, called `.env` (for your *env*ironment variables). This file does not already exist, but there is a `.env-example`; copy this file (don't rename it, as we want to make sure it gets preserved), and rename the copy `.env`.

You may have noticed also that you didn't need to install any database software. This is because instead of running our databases locally, we will be using a service called [Railway](railway.app) to host our development databases. Sign into Railway with your github, then create a new MongoDB provision. After you've done this, click your new provision, go to the "Connect" tab, and copy the "Mongo Connection URL." You will be pasting this URL in your `.env` file as your `DATABASE_URL`.

By default, Railway creates a `test` database. This is totally fine for us to use. To point Prisma to this database, add `/test?authSource=admin` at the end of the url, after the port number. In general, if you want to use a different db name, change this to `/<db name>?authSource=admin`. To sync the database with your Prisma schema (defined in `prisma/schema.prisma`), use the command `yarn prisma db push`.

Finally, run `yarn install` in the `TheLegacyProject` directory to install the necessary packages.

## Running your code
To run the app, you first want to make sure your database is using the correct schema. Push your schema changes using the `yarn prisma db push` command. Then, you can run your local Next.js server, which will live update as you change files, using the `yarn dev` command.

## Making changes
We highly recommend that you read the first couple (three or four, if you're curious) chapters of [The Git Book](https://git-scm.com/book/en/v2) in order to figure out the general deal with git. In general, though, the process is:

- Make sure your codebase is up to date using `git pull`
- Create a branch for whatever changes you want to make, using `git branch -b <branch name>
- Make your changes, add them to the staging environment using `git add .`, and commit them using `git commit -m <commit message>`
- Push your changes using `git push`
- File a pull request on GitHub to get your changes merged into the main branch

In order to not have to sign in to Github every time you want to push or pull, follow the directions for [adding an ssh key](https://docs.github.com/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=linux). If you have trouble with this, ping Michael and he can help get you sorted!
