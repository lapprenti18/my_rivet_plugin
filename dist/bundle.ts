import type { RivetPluginInitializer } from '@ironclad/rivet-core';

const plugin: RivetPluginInitializer = (rivet) => ({
  id: 'my-rivet-plugin',
  name: 'my rivet plugin',
});

export default plugin;