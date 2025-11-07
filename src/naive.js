import {
  create,
  NConfigProvider,
  NGlobalStyle,
  NCard,
  NButton,
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NSpace,
  NTag,
  NIcon,
  NSpin,
  NAlert,
  NStatistic
} from 'naive-ui'

export function createNaiveUi() {
  return create({
    components: [
      NConfigProvider,
      NGlobalStyle,
      NCard,
      NButton,
      NLayout,
      NLayoutSider,
      NLayoutContent,
      NSpace,
      NTag,
      NIcon,
      NSpin,
      NAlert,
      NStatistic
    ]
  })
}
