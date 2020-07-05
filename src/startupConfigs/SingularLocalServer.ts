import { InstanceManager } from "../lib/instanceManager";
import { LocalContainerManager } from "../lib/LocalContainerManager";

const options = {
  serverConfig: {
    port: 8002,
    MATH_PROGRAM: "Singular",
    MATH_PROGRAM_COMMAND: "Singular",
    CONTAINERS(): InstanceManager {
      return new LocalContainerManager();
    },
  },
};

export { options };
