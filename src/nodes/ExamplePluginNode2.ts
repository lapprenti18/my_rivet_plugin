// **** IMPORTANT ****
// Make sure you do `import type` and do not pull in the entire Rivet core library here.
// Export a function that takes in a Rivet object, and you can access rivet library functionality
// from there.
import type {
  ChartNode,
  EditorDefinition,
  Inputs,
  InternalProcessContext,
  NodeBodySpec,
  NodeConnection,
  NodeId,
  NodeInputDefinition,
  NodeOutputDefinition,
  NodeUIData,
  Outputs,
  PluginNodeImpl,
  PortId,
  Project,
  Rivet,
} from "@ironclad/rivet-core";

// This defines your new type of node.
export type ExamplePluginNode2 = ChartNode<
  "examplePlugin2",
  ExamplePluginNodeData2
>;

// This defines the data that your new node will store.
export type ExamplePluginNodeData2 = {
  someData: string;

  // It is a good idea to include useXInput fields for any inputs you have, so that
  // the user can toggle whether or not to use an import port for them.
  useSomeDataInput?: boolean;
};

// Make sure you export functions that take in the Rivet library, so that you do not
// import the entire Rivet core library in your plugin.
export function examplePluginNode2(rivet: typeof Rivet) {
  // This is your main node implementation. It is an object that implements the PluginNodeImpl interface.
  const ExamplePluginNodeImpl2: PluginNodeImpl<ExamplePluginNode2> = {
    // This should create a new instance of your node type from scratch.
    create(): ExamplePluginNode2 {
      const node: ExamplePluginNode2 = {
        // Use rivet.newId to generate new IDs for your nodes.
        id: rivet.newId<NodeId>(),

        // This is the default data that your node will store
        data: {
          someData: "Hello World 2",
        },

        // This is the default title of your node.
        title: "Example Plugin Node 2",

        // This must match the type of your node.
        type: "examplePlugin2",

        // X and Y should be set to 0. Width should be set to a reasonable number so there is no overflow.
        visualData: {
          x: 0,
          y: 0,
          width: 200,
        },
      };
      return node;
    },

    // This function should return all input ports for your node, given its data, connections, all other nodes, and the project. The
    // connection, nodes, and project are for advanced use-cases and can usually be ignored.
    getInputDefinitions(
      data: ExamplePluginNodeData2,
      _connections: NodeConnection[],
      _nodes: Record<NodeId, ChartNode>,
      _project: Project
    ): NodeInputDefinition[] {
      const inputs: NodeInputDefinition[] = [];

      if (data.useSomeDataInput) {
        inputs.push({
          id: "someData" as PortId,
          dataType: "string",
          title: "Some Data ?",
        });
      }

      return inputs;
    },

    // This function should return all output ports for your node, given its data, connections, all other nodes, and the project. The
    // connection, nodes, and project are for advanced use-cases and can usually be ignored.
    getOutputDefinitions(
      _data: ExamplePluginNodeData2,
      _connections: NodeConnection[],
      _nodes: Record<NodeId, ChartNode>,
      _project: Project
    ): NodeOutputDefinition[] {
      return [
        {
          id: "someData" as PortId,
          dataType: "string",
          title: "Some Data ?",
        },
      ];
    },

    // This returns UI information for your node, such as how it appears in the context menu.
    getUIData(): NodeUIData {
      return {
        contextMenuTitle: "Example Plugin 2",
        group: "Example",
        infoBoxBody: "This is an example plugin node. 2",
        infoBoxTitle: "Example Plugin Node 2",
      };
    },

    // This function defines all editors that appear when you edit your node.
    getEditors(
      _data: ExamplePluginNodeData2
    ): EditorDefinition<ExamplePluginNode2>[] {
      return [
        {
          type: "string",
          dataKey: "someData",
          useInputToggleDataKey: "useSomeDataInput",
          label: "Some Data",
        },
      ];
    },

    // This function returns the body of the node when it is rendered on the graph. You should show
    // what the current data of the node is in some way that is useful at a glance.
    getBody(
      data: ExamplePluginNodeData2
    ): string | NodeBodySpec | NodeBodySpec[] | undefined {
      return rivet.dedent`
        Example Plugin Node 2
        Data: ${data.useSomeDataInput ? "(Using Input !)" : data.someData}
      `;
    },

    // This is the main processing function for your node. It can do whatever you like, but it must return
    // a valid Outputs object, which is a map of port IDs to DataValue objects. The return value of this function
    // must also correspond to the output definitions you defined in the getOutputDefinitions function.
    async process(
      data: ExamplePluginNodeData2,
      inputData: Inputs,
      _context: InternalProcessContext
    ): Promise<Outputs> {
      const someData = rivet.getInputOrData(
        data,
        inputData,
        "someData",
        "string"
      );

      return {
        ["someData" as PortId]: {
          type: "string",
          value: someData,
        },
      };
    },
  };

  // Once a node is defined, you must pass it to rivet.pluginNodeDefinition, which will return a valid
  // PluginNodeDefinition object.
  const examplePluginNode2 = rivet.pluginNodeDefinition(
    ExamplePluginNodeImpl2,
    "Example Plugin Node 2"
  );

  // This definition should then be used in the `register` function of your plugin definition.
  return examplePluginNode2;
}