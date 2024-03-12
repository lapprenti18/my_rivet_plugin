import type { RivetPluginInitializer } from '@ironclad/rivet-core';

const plugin: RivetPluginInitializer = (rivet) => ({
  id: 'my-plugin',
  name: 'My Plugin',
});

export default plugin;