import { InstanceManager } from "../lib/instanceManager";
import { SshDockerContainers } from "../lib/sshDockerContainers";

const options = {
  hostConfig: {
    dockerRunCmd: "",
    maxContainerNumber: 10,
    containerType: "singular_container",
    sshdCmd: "/usr/sbin/sshd -D",
    host: "localhost",
    username: "user",
    port: "22",
    sshKey: "/home/user/.ssh/id_rsa",
    dockerCmdPrefix: "",
  },
  serverConfig: {
    port: 8002,
    MATH_PROGRAM: "Singular",
    MATH_PROGRAM_COMMAND: "Singular",
    CONTAINERS(resources, hostConfig, guestInstance): InstanceManager {
      return new SshDockerContainers(resources, hostConfig, guestInstance);
    },
    resumeString:
      "Type 'listvar();' to print the list of " +
      "existing variables.\n" +
      "Type 'basering;' to print the currently active ring.\n> ",
  },
  startInstance: {
    host: "localhost",
    username: "singularUser",
    port: "5000",
    sshKey: "/home/user/InteractiveShell/Vagrant_singular/id_rsa",
    containerName: "singularContainer",
    lastActiveTime: 0,
  },
  help: require("./HelpSingular").help(),
};

export { options };
