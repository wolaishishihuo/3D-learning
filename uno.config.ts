import { createRemToPxProcessor } from '@unocss/preset-wind4/utils';

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss';

export default defineConfig({
  shortcuts: [['project-container', 'h-screen w-screen bg-#111111']],
  presets: [
    presetWind4({
      preflights: {
        theme: {
          process: createRemToPxProcessor()
        }
      }
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2
    })
  ],
  postprocess: [createRemToPxProcessor()],
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
