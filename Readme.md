[![Build Status](https://travis-ci.org/fhinkel/InteractiveShell.svg?branch=master)](https://travis-ci.org/fhinkel/InteractiveShell)

# Interactive Shell - a Web App for Macaulay2

## Quickstart

Run the following commands in a terminal (`vagrant` might take a while):
```bash
git clone https://github.com/fhinkel/InteractiveShell.git
cd InteractiveShell/setups/basic
vagrant up
```
Point your broser to [localhost:8002](http://localhost:8002).

## Purpose

With Interactive Shell you can build a web app for interactive command-line tools.
We have developed Interactive Shell specifically for Macaulay2.
[Macaulay2](http://www.macaulay2.com) is a software system devoted to supporting research in algebraic geometry and
commutative algebra, whose creation and development have been funded by the National Science Foundation since 1992.
Interactive Shell has been used in courses at Cornell University, Harvard University, Georgia Tech,
and Free University of Berlin.

## See Interactive Shell in action
[http://web.macaulay2.com](http://web.macaulay2.com)

[https://www.singular.uni-kl.de:8003/](https://www.singular.uni-kl.de:8003/)

![Web App Screenshot](https://raw.githubusercontent.com/fhinkel/InteractiveShell/master/Readme/WebAppScreenshot-low.jpg "Interactive Shell with Macaulay2 running at http://web.macaulay2.com")

At its core, **the web app is a terminal emulator, giving you an interface to a Macaulay2
instance running remotely.** The main advantage of providing a web app rather than a native app is that you
do not need to download and install Macaulay2,
thus easing the entry barrier for new users. We have also found that users unfamiliar with unix-style
command-line tools are more comfortable using a web app than a terminal.

The web app contains **interactive tutorials** that explain how to use the web app, show some more advanced features
of the app, e.g., retrieving files generated by Macaulay2, and teach basic and advanced algebraic geometry. You can
create your own tutorials. If you teach a course, email your tutorial to your students,
they can then click *Load Tutorial* on the website and work through the tutorial. If you want to share tutorials
with the community, we would be happy to include them on the website!

When you write functions or whole packages,
you will probably want to use the *Editor* area on the left: edit your Macaulay2 code on the left as if it were a
text editor. At any time,
you can run your code by clicking *Evaluate*. Evaluate either evaluates the current line or any code selected.
This is inspired by traditional Macaulay2 usage, which
has been designed to work with Emacs where a plugin allows you to run code from within the editor.

## Usage

Anybody is welcome to use and direct their students to [http://web.macaulay2.com](http://web.macaulay2.com).
This works from any device, even mobile, all
you need is a network connection. We start a new Macaulay2 instance for every user and provide
them with an underlying linux system of their own. Thus you can use all the features of
a natively installed Macaulay2 such as
executing linux commands through Macaulay2's `get` command, accessing the file system to write and read
files, and installing third party Macaulay2 packages.

We identify you by cookies. If you run long computations, you can come back later and we will
have the results ready for you. Occasionally, we have to reboot the server or deploy a new version, this,
 unfortunately, will delete your session. Also, we have to restrict resources since you are on a shared machine.

## Installation

If you want to use the web app offline or run very intense computations that need more resources than we provide,
you can easily run the web app locally or set up your own server.

### With Docker Containers (Recommended)

We have a Vagrant file that configures a virtual machine with everything you need to run your own Server with Macaulay2.
You do not need to install Macaulay2 locally.

Make sure [VirtualBox](https://www.virtualbox.org/) and [Vagrant](https://www.vagrantup.com/) are installed. On Windows,
we recommend to run
Vagrant from within [Git BASH](https://msysgit.github.io/). Do the following inside a terminal or Git BASH:

```bash
git clone https://github.com/fhinkel/InteractiveShell.git
cd InteractiveShell/setups/basic
vagrant up
```

The web app is running at [http://localhost:8002](http://localhost:8002). Every Macaulay2 instance runs in a
separate Docker container with limited resources and does not have access to your
filesystem. Users can only access files inside their Docker container. You can manipulate the memory limits
of the server in the Vagrantfile and for the single users in the file {InteractiveShell/src/startupConfigs/default.js}.

If vagrant cannot mount due to a vboxfs not found error, do

```bash
vagrant plugin install vagrant-vbguest
```

### Without Virtualisation

If you do not want to run the web app within a virtual machine, you can run it locally. You need Macaulay2,
Node.js, npm, and Git. Furthermore you need to have a local ssh server running.
Try whether the following command works without prompting you for a password:

```bash
ssh -i ~/.ssh/id_rsa localhost
```

If not, please start an ssh server and include you public key in your authorized keys file.

Start the web app with the following commands:

```bash
git clone https://github.com/fhinkel/InteractiveShell.git
cd InteractiveShell
npm install
npm run local
```

This gives you an (unsecured!) Macaulay2 terminal emulator at [http://localhost:8002](http://localhost:8002).
That means users can access and modify your private data through Macaulay2's `get` command. Make sure you do not
allow web access to your machine to other users on the same network, i.e., make sure your laptop's firewall is on.
The port may be different, check the console output where you started the server for
 `Server running on [port]`.

### Scaling Up (Advanced)

With Vagrant it is easy to run the web app in the cloud, e.g., at AWS or DigitalOcean. You need to customize the file
 `Vagrantfile_aws` with your credentials.

When you teach large classes, the resources on one machine might not suffice. Remember, for every user we start a
Docker container with Macaulay2. The Docker containers and the server
that handles requests can be on remote machines because they communicate via ssh.
We have a vagrant configuration that starts server and containers on separate instances.

```bash
cd separate_machines
vagrant up
```


### Adjusting resource limits
You can manipulate the resource limits of the virtual machine in the Vagrantfile. Furthermore the startup files in the
dircectory
```
InteractiveShell/src/startupConfigs
```
contain several default values for the resource limits of the single container.

If you manipulate these files and want to manually restart, enter the directory of the setup you are using and
```bash
vagrant ssh
killall node
cd InteractiveShell
npm install
npm start
```


## Contributing
We welcome any contributions. Feel free to contact us if you want to provide a tutorial or have
any questions: [TryM2 Google group](https://groups.google.com/forum/#!forum/trym2).

### Tests
Install Docker, or boot2docker etc. Inside boot2docker, run the tests with
```bash
npm test
```
For linux systems that support Docker natively, please run
```bash
sudo npm test
```

### Linting
We use Eslint
```bash
npm run lint
```

### Running the server
We recommend developing locally and running
```bash
vagrant up developer
```
In this setup, the source code is symlinked between your host and guest system.
Allowing you to develop locally but having the complete setup with Docker and separate virtual machines for
server and Docker containers. To start different versions run

```bash
npm run local  ## insecure -  without Docker containers
npm start ## basic with Docker containers
npm run twoMachines ## Docker containers on different machine than server
```

### Continuous Integration
We use [Travis Ci](https://travis-ci.org) to check our builds. We recommend signing up for Travis Ci and enabling
our fork of this repository before sending a pull request.
[![Build Status](https://travis-ci.org/fhinkel/InteractiveShell.svg?branch=master)](https://travis-ci.org/fhinkel/InteractiveShell)

## file structure:
### server
* main file:
`dist/index.js`
produced by tsc:
```./node_modules/.bin/tsc w/ config file tsconfig.json```
from `src/index.ts`
* other files:
`dist/lib/*.js dist/startupConfigs/*.js`
from
`src/lib/*.ts src/startupConfigs/*.ts`

### client
* main file:
`public/public-common/index.js`
produced by `webpack` from `public-source/index.js`
called by
`public/public-Macaulay2/index.html`
* other files:
`dist/frontend/*.js`
produced by tsc:
```./node_modules/.bin/tsc -p src/frontend```
from `src/frontend/*.ts`