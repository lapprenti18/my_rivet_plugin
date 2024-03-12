import type { ChartNode, PluginNodeDefinition, RivetPluginInitializer } from "@ironclad/rivet-core";
import {
  // examplePluginNode,
  // examplePluginNode2
  examplePluginNode3
} from "./nodes";

const plugin: RivetPluginInitializer = (rivet) => {
  const examplePlugin = {
    // The ID of your plugin should be unique across all plugins.
    id: "my rivet plugin",
    // The name of the plugin is what is displayed in the Rivet UI.
    name: "my rivet plugin",
    // Define all configuration settings in the configSpec object.
    configSpec: {
      exampleSetting: {
        type: "string",
        label: "Example Setting",
        description: "This is an example setting for the example plugin.",
        helperText: "This is an example setting for the example plugin.",
      },
    },
    // Define any additional context menu groups your plugin adds here.
    contextMenuGroups: [
      {
        id: "example",
        label: "Example",
      },
    ],

    register: (register: <T extends ChartNode>(definition: PluginNodeDefinition<T>) => void) => {
      // register(examplePluginNode(rivet))
      // register(examplePluginNode2(rivet))
      register(examplePluginNode3(rivet))
    },
  };

  return examplePlugin;
};

export default plugin;
